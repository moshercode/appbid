import { dataConnect } from './firebase.js';
import {
  listWeeklyLeaderboard,
  listMonthlyLeaderboard,
  listAnnualLeaderboard,
  listRecentBids,
  logVisit,
  getVisitorStats,
  incrementClickCount,
} from './generated/esm/index.esm.js';

const MIN_BID = 1;
const POLL_INTERVAL_MS = 8000;
const STATS_INTERVAL_MS = 60000;
const SERVER_ONLY = { fetchPolicy: 'SERVER_ONLY' };
const CHECKOUT_ENDPOINT = '/api/create-checkout-session';

// Weekly is the only bindable window (drives the hero mechanic below);
// monthly/annual are read-only views over the same bid data, refreshed less
// often since they don't need to feel as "live" as the active competition.
const WINDOW_QUERY = {
  week: listWeeklyLeaderboard,
  month: listMonthlyLeaderboard,
  year: listAnnualLeaderboard,
};
const WINDOW_FIELD = {
  week: 'weeklyLeaderboardEntries',
  month: 'monthlyLeaderboardEntries',
  year: 'annualLeaderboardEntries',
};

const leaderboardEl = document.getElementById('leaderboard-body');
const leaderboardTabsEl = document.getElementById('leaderboard-tabs');
const activityEl = document.getElementById('activity-feed');
const themeToggleBtn = document.getElementById('theme-toggle');
const visitors1hEl = document.getElementById('visitors-1h');
const visitors24hEl = document.getElementById('visitors-24h');

const bidInput = document.getElementById('bid-amount-input');
const bidMinusBtn = document.getElementById('bid-minus');
const bidPlusBtn = document.getElementById('bid-plus');
const outbidForm = document.getElementById('outbid-form');
const outbidUrlInput = document.getElementById('outbid-url');
const outbidDisplayNameInput = document.getElementById('outbid-display-name');
const outbidTaglineInput = document.getElementById('outbid-tagline');
const outbidSubmitBtn = document.getElementById('outbid-submit');
const outbidMsg = document.getElementById('outbid-msg');
const claimRankEl = document.getElementById('claim-rank');

let suggestedBid = MIN_BID;
let userAdjustedBid = false;
let activeWindow = 'week';
const aggregatesByWindow = { week: [], month: [], year: [] };

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

function computeRankForAmount(amount) {
  // Always ranks against the weekly board, regardless of which tab is visible —
  // that's the board you're actually bidding into.
  const higherCount = aggregatesByWindow.week.filter((l) => l.periodTotal > amount).length;
  return higherCount + 1;
}

function updateClaimRank() {
  if (claimRankEl) claimRankEl.textContent = computeRankForAmount(getBidAmount());
}

function setBidAmount(value) {
  const clamped = Math.max(MIN_BID, Math.round(value));
  bidInput.value = clamped;
  bidInput.style.width = `${String(clamped).length + 0.5}ch`;
  updateClaimRank();
}

function getBidAmount() {
  return Math.max(MIN_BID, Math.round(Number(bidInput.value) || MIN_BID));
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
  updateClaimRank();
});
bidInput.addEventListener('blur', () => {
  setBidAmount(getBidAmount());
});

const WINDOW_EMPTY_MESSAGE = {
  week: 'No bids yet this week — be the first to claim #1.',
  month: 'No bids yet this month.',
  year: 'No bids yet this year.',
};

function renderLeaderboard(listings, windowKey) {
  if (!listings.length) {
    leaderboardEl.innerHTML = `<div class="empty-state">${WINDOW_EMPTY_MESSAGE[windowKey] || WINDOW_EMPTY_MESSAGE.week}</div>`;
    return;
  }

  leaderboardEl.innerHTML = listings
    .map((l, i) => {
      const rank = i + 1;
      const badgeContent = l.iconUrl
        ? `<img src="${escapeHtml(l.iconUrl)}" alt="" class="rank-badge-img" onerror="this.parentElement.classList.remove('has-icon'); this.parentElement.textContent='#${rank}'">`
        : `#${rank}`;
      const badgeClass = l.iconUrl ? 'rank-badge has-icon' : 'rank-badge';
      return `
        <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer nofollow" class="rank-card rank-${rank}" data-listing-id="${l.listingId}">
          <div class="${badgeClass}">${badgeContent}</div>
          <div class="rank-info">
            <span class="rank-name">${escapeHtml(l.displayName)}</span>
            ${l.tagline ? `<div class="rank-tagline">${escapeHtml(l.tagline)}</div>` : ''}
            <div class="rank-meta">${l.lastBidAt ? timeAgo(l.lastBidAt) : ''}</div>
          </div>
          <div class="rank-stats">
            <div class="rank-price">${formatMoney(l.periodTotal)}</div>
            <div class="rank-clicks">${(l.periodClicks ?? 0).toLocaleString('en-US')} clicks</div>
          </div>
        </a>
      `;
    })
    .join('');
}

// The "Claim #1 for $X" headline suggests what it'd take to top the WEEKLY
// board (the board resets every Monday), but that's only a starting
// suggestion — any bid from $1 up is valid and simply lands wherever that
// amount ranks this week.
function updateSuggestedBid(topBid) {
  suggestedBid = topBid > 0 ? Math.floor(topBid) + 1 : MIN_BID;
  if (!userAdjustedBid) {
    setBidAmount(suggestedBid); // also updates the claim-rank label
  } else {
    updateClaimRank(); // the amount didn't change, but the field of competitors just did
  }
}

function setActiveWindow(key) {
  activeWindow = key;
  leaderboardTabsEl.querySelectorAll('.board-tab').forEach((btn) => {
    const isActive = btn.dataset.window === key;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
  renderLeaderboard(aggregatesByWindow[key], key); // already cached — instant, no fetch
}

leaderboardTabsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.board-tab');
  if (!btn || btn.dataset.window === activeWindow) return;
  setActiveWindow(btn.dataset.window);
});

// Event delegation: rows are replaced wholesale on every refresh, so a single
// listener on the (stable) container beats re-attaching one per row.
leaderboardEl.addEventListener('click', (e) => {
  const card = e.target.closest('.rank-card');
  if (!card) return;
  const listingId = card.dataset.listingId;
  if (!listingId) return;
  incrementClickCount(dataConnect, { listingId }).catch((err) => console.error(err));
});

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
          claimed for <span class="activity-amount">${formatMoney(b.deltaAmount)}</span>
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
  outbidSubmitBtn.textContent = 'Redirecting to payment...';

  try {
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

async function refreshLeaderboardWindow(key) {
  const { data } = await WINDOW_QUERY[key](dataConnect, { limit: 50 }, SERVER_ONLY);
  const entries = data[WINDOW_FIELD[key]];
  aggregatesByWindow[key] = entries;

  if (key === 'week') {
    updateSuggestedBid(entries[0]?.periodTotal ?? 0);
  }
  if (key === activeWindow) {
    renderLeaderboard(entries, key);
  }
}

async function refreshActivity() {
  const { data } = await listRecentBids(dataConnect, { limit: 5 }, SERVER_ONLY);
  renderActivity(data.bids);
}

async function refreshAll() {
  await Promise.all([refreshLeaderboardWindow('week'), refreshActivity()]);
}

async function refreshSlowWindows() {
  await Promise.all([refreshLeaderboardWindow('month'), refreshLeaderboardWindow('year')]);
}

async function refreshVisitorStats() {
  const { data } = await getVisitorStats(dataConnect, SERVER_ONLY);
  const stats = data.visitStats[0];
  visitors1hEl.textContent = (stats?.lastHour ?? 0).toLocaleString('en-US');
  visitors24hEl.textContent = (stats?.last24h ?? 0).toLocaleString('en-US');
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
refreshSlowWindows().catch((err) => console.error(err));

logVisit(dataConnect).catch((err) => console.error(err));
refreshVisitorStats().catch((err) => console.error(err));

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

setInterval(() => {
  refreshVisitorStats().catch((err) => console.error(err));
  refreshSlowWindows().catch((err) => console.error(err));
}, STATS_INTERVAL_MS);
