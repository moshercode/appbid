import { dataConnect } from './firebase.js';
import { listLeaderboard, listRecentBids, getListingByUrl } from './generated/esm/index.esm.js';

const MIN_BID = 1;
const POLL_INTERVAL_MS = 8000;
const SERVER_ONLY = { fetchPolicy: 'SERVER_ONLY' };
const CHECKOUT_ENDPOINT = '/api/create-checkout-session';

const leaderboardEl = document.getElementById('leaderboard-body');
const activityEl = document.getElementById('activity-feed');
const themeToggleBtn = document.getElementById('theme-toggle');

const bidInput = document.getElementById('bid-amount-input');
const bidMinusBtn = document.getElementById('bid-minus');
const bidPlusBtn = document.getElementById('bid-plus');
const outbidForm = document.getElementById('outbid-form');
const outbidUrlInput = document.getElementById('outbid-url');
const outbidDisplayNameInput = document.getElementById('outbid-display-name');
const outbidTaglineInput = document.getElementById('outbid-tagline');
const outbidSubmitBtn = document.getElementById('outbid-submit');
const outbidMsg = document.getElementById('outbid-msg');

let minBid = MIN_BID;
let userAdjustedBid = false;

function applyThemeIcon() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  themeToggleBtn.textContent = isLight ? '🌙' : '☀️';
  themeToggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
}

themeToggleBtn.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
  applyThemeIcon();
});

applyThemeIcon();

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

function normalizeUrl(url) {
  let trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) trimmed = `https://${trimmed}`;
  return trimmed.replace(/\/+$/, '');
}

function formatMoney(n) {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

function timeAgo(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 10) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function setBidAmount(value) {
  const clamped = Math.max(minBid, Math.round(value));
  bidInput.value = clamped;
  bidInput.style.width = `${String(clamped).length + 0.5}ch`;
}

function getBidAmount() {
  return Math.max(minBid, Math.round(Number(bidInput.value) || minBid));
}

bidMinusBtn.addEventListener('click', () => {
  userAdjustedBid = true;
  setBidAmount(getBidAmount() - 1);
});
bidPlusBtn.addEventListener('click', () => {
  userAdjustedBid = true;
  setBidAmount(getBidAmount() + 1);
});
bidInput.addEventListener('input', () => {
  userAdjustedBid = true;
});
bidInput.addEventListener('blur', () => {
  setBidAmount(getBidAmount());
});

function renderLeaderboard(listings) {
  if (!listings.length) {
    leaderboardEl.innerHTML = `<div class="empty-state">No listings yet — be the first to claim #1.</div>`;
    updateMinBid(0);
    return;
  }

  leaderboardEl.innerHTML = listings
    .map((l, i) => {
      const rank = i + 1;
      return `
        <div class="rank-card rank-${rank}">
          <div class="rank-badge">#${rank}</div>
          <div class="rank-info">
            <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(l.displayName)}</a>
            ${l.tagline ? `<div class="rank-tagline">${escapeHtml(l.tagline)}</div>` : ''}
            <div class="rank-meta">${timeAgo(l.updatedAt)}</div>
          </div>
          <div class="rank-price">${formatMoney(l.currentBid)}</div>
        </div>
      `;
    })
    .join('');

  updateMinBid(listings[0]?.currentBid ?? 0);
}

function updateMinBid(topBid) {
  minBid = topBid > 0 ? Math.floor(topBid) + 1 : MIN_BID;
  bidInput.min = String(minBid);
  if (!userAdjustedBid || getBidAmount() < minBid) {
    setBidAmount(minBid);
  }
}

function renderActivity(bids) {
  if (!bids.length) {
    activityEl.innerHTML = `<li class="empty">No bids yet — be the first.</li>`;
    return;
  }
  activityEl.innerHTML = bids
    .map(
      (b) => `
        <li>
          <span class="activity-time">${timeAgo(b.createdAt)}</span>
          <a href="${escapeHtml(b.url)}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(b.displayName)}</a>
          claimed for <span class="activity-amount">${formatMoney(b.amount)}</span>
        </li>
      `
    )
    .join('');
}

function setOutbidMsg(text, kind) {
  outbidMsg.textContent = text;
  outbidMsg.className = 'outbid-msg' + (kind ? ` ${kind}` : '');
}

outbidForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const rawUrl = outbidUrlInput.value.trim();
  const displayName = outbidDisplayNameInput.value.trim();
  if (!rawUrl || !displayName) return;

  const url = normalizeUrl(rawUrl);
  const tagline = outbidTaglineInput.value.trim() || null;
  const amount = getBidAmount();

  setOutbidMsg('');
  outbidSubmitBtn.disabled = true;
  outbidSubmitBtn.textContent = 'Checking...';

  try {
    const { data } = await getListingByUrl(dataConnect, { url }, SERVER_ONLY);
    const existing = data.listings[0];

    if (existing && amount <= existing.currentBid) {
      setOutbidMsg(`You're already on the list at ${formatMoney(existing.currentBid)}. Bid higher to climb.`, 'err');
      return;
    }

    outbidSubmitBtn.textContent = 'Redirecting to payment...';

    const res = await fetch(CHECKOUT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, displayName, tagline, amount }),
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok || !body.url) {
      setOutbidMsg(body.error || 'Something went wrong. Try again.', 'err');
      return;
    }

    window.location.href = body.url;
  } catch (err) {
    console.error(err);
    setOutbidMsg('Something went wrong. Try again.', 'err');
  } finally {
    outbidSubmitBtn.disabled = false;
    outbidSubmitBtn.textContent = 'Outbid';
  }
});

async function refreshLeaderboard() {
  const { data } = await listLeaderboard(dataConnect, { limit: 50 }, SERVER_ONLY);
  renderLeaderboard(data.listings);
}

async function refreshActivity() {
  const { data } = await listRecentBids(dataConnect, { limit: 15 }, SERVER_ONLY);
  renderActivity(data.bids);
}

async function refreshAll() {
  await Promise.all([refreshLeaderboard(), refreshActivity()]);
}

function handlePaymentRedirect() {
  const params = new URLSearchParams(window.location.search);
  const paid = params.get('paid');
  if (paid === 'success') {
    setOutbidMsg("Payment received! Your bid should appear below within a few seconds.", 'ok');
  } else if (paid === 'cancel') {
    setOutbidMsg('Payment canceled — no charge was made.', 'err');
  }
  if (paid) {
    window.history.replaceState({}, '', window.location.pathname);
  }
}

handlePaymentRedirect();

refreshAll().catch((err) => {
  console.error(err);
  leaderboardEl.innerHTML = `<div class="empty-state">Couldn't load the leaderboard. Refresh to try again.</div>`;
});

setInterval(() => {
  if (
    document.activeElement === bidInput ||
    document.activeElement === outbidUrlInput ||
    document.activeElement === outbidDisplayNameInput ||
    document.activeElement === outbidTaglineInput
  ) {
    return;
  }
  refreshAll().catch((err) => console.error(err));
}, POLL_INTERVAL_MS);
