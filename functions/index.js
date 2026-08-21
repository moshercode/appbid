import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getDataConnect } from 'firebase-admin/data-connect';
import Stripe from 'stripe';
import {
  connectorConfig,
  getListingByUrl,
  createListing,
  placeBid,
} from '@appbid/dataconnect-admin';

initializeApp();

const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');

const MIN_BID = 1;
const DEFAULT_ORIGIN = 'https://appbid-69f5b.web.app';

function normalizeUrl(url) {
  let trimmed = String(url).trim();
  if (!/^https?:\/\//i.test(trimmed)) trimmed = `https://${trimmed}`;
  return trimmed.replace(/\/+$/, '');
}

function deriveNameFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function isDuplicateKeyError(err) {
  const message = String(err?.message || err);
  return /duplicate key|already exists|unique constraint/i.test(message);
}

export const createCheckoutSession = onRequest(
  { secrets: [stripeSecretKey], cors: true, invoker: 'public' },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { url: rawUrl, displayName, tagline, amount } = req.body || {};
      if (!rawUrl || typeof rawUrl !== 'string') {
        res.status(400).json({ error: 'Missing url' });
        return;
      }

      const url = normalizeUrl(rawUrl);
      const bidAmount = Math.round(Number(amount));
      if (!Number.isFinite(bidAmount) || bidAmount < MIN_BID) {
        res.status(400).json({ error: `Amount must be at least $${MIN_BID}` });
        return;
      }

      const dc = getDataConnect(connectorConfig);
      const { data } = await getListingByUrl(dc, { url });
      const existing = data.listings[0];
      const minBid = existing ? Math.floor(existing.currentBid) + 1 : MIN_BID;

      if (bidAmount < minBid) {
        res.status(400).json({ error: `Bid must be at least $${minBid}` });
        return;
      }

      const cleanDisplayName = displayName
        ? String(displayName).trim().slice(0, 60)
        : deriveNameFromUrl(url);
      if (!cleanDisplayName) {
        res.status(400).json({ error: 'Missing display name' });
        return;
      }

      const stripe = new Stripe(stripeSecretKey.value());
      const origin = req.get('origin') || DEFAULT_ORIGIN;
      const cleanTagline = tagline ? String(tagline).trim().slice(0, 120) : '';

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        managed_payments: { enabled: false },
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Claim a spot on appbid.lol for ${cleanDisplayName}`,
              },
              unit_amount: bidAmount * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/?paid=success`,
        cancel_url: `${origin}/?paid=cancel`,
        metadata: {
          url,
          displayName: cleanDisplayName,
          tagline: cleanTagline,
          amount: String(bidAmount),
        },
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error('createCheckoutSession failed', err);
      res.status(500).json({ error: 'Something went wrong. Try again.' });
    }
  }
);

export const stripeWebhook = onRequest(
  { secrets: [stripeSecretKey, stripeWebhookSecret], invoker: 'public' },
  async (req, res) => {
    const stripe = new Stripe(stripeSecretKey.value());

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'],
        stripeWebhookSecret.value()
      );
    } catch (err) {
      console.error('Webhook signature verification failed', err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type !== 'checkout.session.completed') {
      res.json({ received: true, skipped: event.type });
      return;
    }

    const session = event.data.object;
    const { url, displayName, tagline, amount } = session.metadata || {};
    const bidAmount = Number(amount);

    if (!url || !Number.isFinite(bidAmount)) {
      console.error('Webhook missing expected metadata', session.metadata);
      res.json({ received: true, skipped: 'missing metadata' });
      return;
    }

    try {
      const dc = getDataConnect(connectorConfig);
      const { data } = await getListingByUrl(dc, { url });
      const existing = data.listings[0];

      if (existing) {
        await placeBid(dc, {
          listingId: existing.id,
          amount: bidAmount,
          bidderName: null,
          displayName: displayName || existing.displayName,
          url: existing.url,
          tagline: tagline || existing.tagline || null,
          ownerEmail: null,
          stripeSessionId: session.id,
        });
      } else {
        await createListing(dc, {
          displayName: displayName || deriveNameFromUrl(url),
          url,
          tagline: tagline || null,
          ownerEmail: null,
          initialBid: bidAmount,
          stripeSessionId: session.id,
        });
      }

      res.json({ received: true });
    } catch (err) {
      if (isDuplicateKeyError(err)) {
        // Stripe already retried this exact session — the bid was already recorded. No-op.
        console.warn('Duplicate webhook delivery for session', session.id);
        res.json({ received: true, duplicate: true });
        return;
      }
      console.error('Failed to record bid after payment', session.id, err);
      // Non-2xx so Stripe retries with backoff — the session ID unique constraint
      // above makes a later retry safe once the underlying issue is fixed.
      res.status(500).json({ error: 'Failed to process payment confirmation' });
    }
  }
);
