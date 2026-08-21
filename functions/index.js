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

function googleFaviconFallback(pageUrl) {
  try {
    const hostname = new URL(pageUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
  } catch {
    return null;
  }
}

function resolveMaybeRelativeUrl(maybeRelative, base) {
  try {
    return new URL(maybeRelative, base).href;
  } catch {
    return null;
  }
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function extractMetaContent(html, propertyValue) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const relRe = new RegExp(`(?:property|name)=["']${propertyValue}["']`, 'i');
  for (const tag of tags) {
    if (relRe.test(tag)) {
      const m = tag.match(/content=["']([^"']+)["']/i);
      if (m) return decodeHtmlEntities(m[1]);
    }
  }
  return null;
}

function extractLinkHref(html, relValues) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const relMatch = tag.match(/rel=["']([^"']+)["']/i);
    if (relMatch && relValues.includes(relMatch[1].toLowerCase())) {
      const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
      if (hrefMatch) return decodeHtmlEntities(hrefMatch[1]);
    }
  }
  return null;
}

function safeHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 4000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

// The App Store's own page markup (favicon, apple-touch-icon) is Apple's site
// icon, not the app's — the official lookup API is the reliable source for
// the app-specific artwork.
async function fetchAppleArtwork(appId) {
  try {
    const res = await fetchWithTimeout(`https://itunes.apple.com/lookup?id=${appId}`);
    if (!res.ok) return null;
    const json = await res.json();
    const result = json.results?.[0];
    return result?.artworkUrl512 || result?.artworkUrl100 || result?.artworkUrl60 || null;
  } catch {
    return null;
  }
}

// Captures a display icon for a listing. Regular sites: favicon/apple-touch-icon
// (page-independent, logo-like) beats og:image (often a wide banner). App store
// product pages: og:image IS the per-app artwork there, since the site's own
// favicon would just be the store's logo, not the individual app's icon.
async function resolveIconUrl(pageUrl) {
  const hostname = safeHostname(pageUrl);
  const isAppleStore = hostname?.includes('apps.apple.com');
  const isPlayStore = hostname?.includes('play.google.com');

  if (isAppleStore) {
    const appId = pageUrl.match(/\/id(\d+)/)?.[1];
    if (appId) {
      const artwork = await fetchAppleArtwork(appId);
      if (artwork) return artwork;
    }
  }

  try {
    const res = await fetchWithTimeout(
      pageUrl,
      {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; appbidBot/1.0; +https://appbid.lol)' },
      },
      8000
    );
    if (!res.ok) return googleFaviconFallback(pageUrl);

    const html = await res.text();
    const finalUrl = res.url || pageUrl;

    if (isAppleStore || isPlayStore) {
      const ogImage = extractMetaContent(html, 'og:image');
      if (ogImage) return resolveMaybeRelativeUrl(ogImage, finalUrl);
    } else {
      const appleIcon = extractLinkHref(html, ['apple-touch-icon', 'apple-touch-icon-precomposed']);
      if (appleIcon) return resolveMaybeRelativeUrl(appleIcon, finalUrl);

      const icon = extractLinkHref(html, ['icon', 'shortcut icon']);
      if (icon) return resolveMaybeRelativeUrl(icon, finalUrl);

      const ogImage = extractMetaContent(html, 'og:image');
      if (ogImage) return resolveMaybeRelativeUrl(ogImage, finalUrl);
    }

    return googleFaviconFallback(pageUrl);
  } catch (err) {
    console.warn('resolveIconUrl failed for', pageUrl, err.message);
    return googleFaviconFallback(pageUrl);
  }
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
      // What the user pays now. Bidding is free-form — no minimum relative to
      // an existing listing — this amount is charged as-is and ADDED on top
      // of whatever that listing already had (see stripeWebhook).
      const payAmount = Math.round(Number(amount));
      if (!Number.isFinite(payAmount) || payAmount < MIN_BID) {
        res.status(400).json({ error: `Amount must be at least $${MIN_BID}` });
        return;
      }

      const dc = getDataConnect(connectorConfig);
      const { data } = await getListingByUrl(dc, { url });
      const existing = data.listings[0];

      const cleanDisplayName = displayName
        ? String(displayName).trim().slice(0, 60)
        : deriveNameFromUrl(url);
      if (!cleanDisplayName) {
        res.status(400).json({ error: 'Missing display name' });
        return;
      }

      const productName = existing
        ? `Add $${payAmount} to your bid on appbid.lol for ${cleanDisplayName}`
        : `Claim a spot on appbid.lol for ${cleanDisplayName}`;

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
                name: productName,
              },
              unit_amount: payAmount * 100,
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
          amount: String(payAmount),
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
    const paidAmount = Number(amount);

    if (!url || !Number.isFinite(paidAmount)) {
      console.error('Webhook missing expected metadata', session.metadata);
      res.json({ received: true, skipped: 'missing metadata' });
      return;
    }

    try {
      const dc = getDataConnect(connectorConfig);
      const { data } = await getListingByUrl(dc, { url });
      const existing = data.listings[0];
      const iconUrl = await resolveIconUrl(url);

      if (existing) {
        // Additive: this payment stacks on top of whatever the listing already had.
        const newTotal = existing.currentBid + paidAmount;
        await placeBid(dc, {
          listingId: existing.id,
          amount: newTotal,
          bidderName: null,
          displayName: displayName || existing.displayName,
          url: existing.url,
          tagline: tagline || existing.tagline || null,
          iconUrl,
          ownerEmail: null,
          stripeSessionId: session.id,
        });
      } else {
        await createListing(dc, {
          displayName: displayName || deriveNameFromUrl(url),
          url,
          tagline: tagline || null,
          iconUrl,
          ownerEmail: null,
          initialBid: paidAmount,
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
