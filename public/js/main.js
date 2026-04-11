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
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
})();

/* ── Load site config and populate dynamic data ─ */
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

/* ── Cutoff banner countdown ──────────────────── */
async function initCutoffBanner() {
  const banner = document.getElementById('cutoff-banner');
  if (!banner) return;
  const config = await loadConfig();
  if (!config) return;
  banner.innerHTML = `<strong>Order cutoff:</strong> ${config.orderCutoffDay} at ${config.orderCutoffTime} &nbsp;·&nbsp; Baked fresh every Saturday morning`;
}

/* ── Weekend bake section (home page) ─────────── */
async function initWeekendBake() {
  const section = document.getElementById('weekend-bake');
  if (!section) return;
  const config = await loadConfig();
  if (!config) return;

  const nextSat = getNextSaturday();
  const weekend = config.weekends[nextSat] || {};
  const featuredIds = weekend.featuredItems || config.menu.filter(m => m.featured).map(m => m.id);
  const items = config.menu.filter(m => featuredIds.includes(m.id) && m.available);

  const grid = section.querySelector('.weekend-grid');
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div class="weekend-card">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="price">$${item.price} <span style="font-size:0.75rem;font-weight:400;color:rgba(240,232,216,0.5)">/ ${item.unit}</span></div>
    </div>
  `).join('');

  if (weekend.specialNote) {
    const note = section.querySelector('.special-note');
    if (note) { note.textContent = weekend.specialNote; note.style.display = 'block'; }
  }
}

/* ── Menu page ────────────────────────────────── */

// Real Unsplash photos mapped to each menu item ID
const MENU_PHOTOS = {
  'classic-country': {
    src: 'https://source.unsplash.com/Sum7k8hC9iA/800x600',
    alt: 'Close-up of a golden, freshly baked sourdough loaf with crackling crust',
  },
  'seeded-rye': {
    src: 'https://source.unsplash.com/uGopmYwL7TI/800x600',
    alt: 'Two dark rye sourdough loaves resting on a wooden cutting board',
  },
  'rosemary-olive': {
    src: 'https://source.unsplash.com/dUtGp6goa7A/800x600',
    alt: 'Rustic sourdough loaf with golden crust on a floured surface',
  },
  'cinnamon-raisin': {
    src: 'https://source.unsplash.com/xa_wxSzlWWQ/800x600',
    alt: 'Sliced sourdough loaf showing soft crumb texture next to the whole loaf',
  },
  'focaccia': {
    src: 'https://source.unsplash.com/Hx7xdwhj2AY/800x600',
    alt: 'Hands shaping dough on a floured wooden surface',
  },
  'starter-kit': {
    src: 'https://source.unsplash.com/0Oh1bChh2ao/800x600',
    alt: 'Close-up of freshly baked artisan bread with golden brown crust',
  },
};

// Fallback gradient classes if photo fails to load
const THUMB_FALLBACKS = ['bread-thumb-1','bread-thumb-2','bread-thumb-3','bread-thumb-4','bread-thumb-5','bread-thumb-6'];

async function initMenuPage() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const config = await loadConfig();
  if (!config) return;

  grid.innerHTML = config.menu.map((item, i) => {
    const photo = MENU_PHOTOS[item.id];
    const fallbackClass = THUMB_FALLBACKS[i % THUMB_FALLBACKS.length];
    const imgTag = photo
      ? `<img
           src="${photo.src}"
           alt="${photo.alt}"
           class="bread-photo"
           loading="lazy"
           onerror="this.parentElement.classList.add('${fallbackClass}');this.remove();"
         >`
      : '';
    return `
      <div class="menu-card">
        <div class="menu-card-img ${photo ? '' : fallbackClass}">
          ${imgTag}
          ${item.featured ? `<span class="featured-tag">Weekend Pick</span>` : ''}
          ${!item.available ? `<div class="sold-out-overlay"><span class="sold-out-tag">Sold Out</span></div>` : ''}
        </div>
        <div class="menu-card-body">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="menu-card-footer">
            <div>
              <div class="menu-price">$${item.price}</div>
              <div class="menu-unit">per ${item.unit}</div>
            </div>
            ${item.available
              ? `<a href="/order.html" class="btn btn-outline btn-sm">Order</a>`
              : `<span class="sold-out-tag">Sold Out</span>`}
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
  initCutoffBanner();
  initWeekendBake();
  initMenuPage();
});
