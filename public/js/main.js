/* ── Nav active state & mobile toggle ─────────── */
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '/' && href === '/index.html')) {
      link.classList.add('active');
    }
  });

  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const open = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
})();

/* ── Load site config ─────────────────────────── */
let siteConfig = null;

async function loadConfig() {
  if (siteConfig) return siteConfig;
  try {
    const res = await fetch('/api/config');
    siteConfig = await res.json();
    return siteConfig;
  } catch {
    return null;
  }
}

/* ── Top bar (cutoff + instagram) ─────────────── */
async function initTopBar() {
  const bar = document.getElementById('top-bar');
  if (!bar) return;
  const config = await loadConfig();
  if (!config) return;
  bar.innerHTML = `
    <span><strong>Order cutoff:</strong> ${config.orderCutoffDay} at ${config.orderCutoffTime} &nbsp;·&nbsp; Baked fresh every Saturday morning</span>
    <a href="${config.instagramUrl || '#'}" class="top-bar-instagram" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      @theweekendloaf
    </a>
  `;
}

/* ── Weekend bake section (home page) ─────────── */
const MENU_EMOJIS = {
  'classic-country': '🍞',
  'seeded-rye':      '🌾',
  'rosemary-olive':  '🫒',
  'cinnamon-raisin': '🍂',
  'focaccia':        '🫓',
  'starter-kit':     '🧑‍🍳',
};

async function initWeekendBake() {
  const section = document.getElementById('weekend-bake');
  if (!section) return;
  const config = await loadConfig();
  if (!config) return;

  const nextSat = getNextSaturday();
  const weekend = config.weekends?.[nextSat] || {};
  const featuredIds = weekend.featuredItems || config.menu.filter(m => m.featured).map(m => m.id);
  const items = config.menu.filter(m => featuredIds.includes(m.id) && m.available);

  const grid = section.querySelector('.weekend-cards');
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div class="weekend-card">
      <div class="wc-emoji">${MENU_EMOJIS[item.id] || '🍞'}</div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="wc-price">$${item.price} <span style="font-size:0.75rem;font-weight:400;opacity:.55">/ ${item.unit}</span></div>
    </div>
  `).join('');

  if (weekend.specialNote) {
    const note = section.querySelector('.special-note');
    if (note) { note.textContent = weekend.specialNote; note.style.display = 'block'; }
  }
}

/* ── Menu page ────────────────────────────────── */
const CARD_COLORS = ['card-color-1','card-color-2','card-color-3','card-color-4','card-color-5','card-color-6'];

async function initMenuPage() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const config = await loadConfig();
  if (!config) return;

  grid.innerHTML = config.menu.map((item, i) => {
    const color = CARD_COLORS[i % CARD_COLORS.length];
    const emoji = MENU_EMOJIS[item.id] || '🍞';
    return `
      <div class="bread-card">
        <div class="bread-card-top ${color}">
          <span class="card-emoji">${emoji}</span>
          ${item.featured ? `<span class="featured-tag">Weekend Pick</span>` : ''}
          ${!item.available ? `<div class="sold-badge"><span class="sold-badge-text">Sold Out</span></div>` : ''}
        </div>
        <div class="bread-card-body">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="bread-card-footer">
            <div>
              <div class="card-price">$${item.price}</div>
              <div class="card-unit">per ${item.unit}</div>
            </div>
            ${item.available
              ? `<a href="/order.html" class="btn btn-outline btn-sm">Order</a>`
              : `<span class="sold-badge-text">Sold Out</span>`}
          </div>
        </div>
      </div>`;
  }).join('');
}

/* ── Helpers ──────────────────────────────────── */
function getNextSaturday() {
  const today = new Date();
  const day = today.getDay();
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  const sat = new Date(today);
  sat.setDate(today.getDate() + daysUntilSat);
  return sat.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/* ── Init all ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTopBar();
  initWeekendBake();
  initMenuPage();
});
