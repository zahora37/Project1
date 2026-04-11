require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;
const CONFIG_FILE = path.join(__dirname, 'config.json');
const IMAGES_DIR = path.join(__dirname, 'public', 'images');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

// ─── Image sources (Pexels free license) ──────────────────────────────────
const IMAGE_SOURCES = {
  'hero-kitchen.jpg':  'https://images.pexels.com/photos/6996205/pexels-photo-6996205.jpeg?auto=compress&cs=tinysrgb&w=1920&h=900&dpr=1',
  'story-loaves.jpg':  'https://images.pexels.com/photos/1383908/pexels-photo-1383908.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&dpr=1',
  'menu-classic.jpg':  'https://images.pexels.com/photos/7541727/pexels-photo-7541727.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'menu-rye.jpg':      'https://images.pexels.com/photos/105861/pexels-photo-105861.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'menu-rosemary.jpg': 'https://images.pexels.com/photos/1079020/pexels-photo-1079020.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'menu-cinnamon.jpg': 'https://images.pexels.com/photos/1383908/pexels-photo-1383908.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'menu-focaccia.jpg': 'https://images.pexels.com/photos/12335533/pexels-photo-12335533.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'menu-starter.jpg':  'https://images.pexels.com/photos/209180/pexels-photo-209180.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'hero-menu.jpg':     'https://images.pexels.com/photos/7541727/pexels-photo-7541727.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&dpr=1',
  'hero-order.jpg':    'https://images.pexels.com/photos/209180/pexels-photo-209180.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&dpr=1',
  'hero-contact.jpg':  'https://images.pexels.com/photos/7175448/pexels-photo-7175448.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&dpr=1',
};

// ─── Image proxy — fetches from Pexels server-side, caches to disk ─────────
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const chunks = [];
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WeekendLoaf/1.0)',
        'Accept': 'image/jpeg,image/*',
      },
    }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] || 'image/jpeg' }));
    });
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.on('error', reject);
  });
}

app.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;
  const localPath = path.join(IMAGES_DIR, filename);

  // Serve from disk cache if available
  if (fs.existsSync(localPath) && fs.statSync(localPath).size > 5000) {
    return res.sendFile(localPath);
  }

  const sourceUrl = IMAGE_SOURCES[filename];
  if (!sourceUrl) return res.status(404).send('Image not found');

  try {
    const { buffer, contentType } = await fetchUrl(sourceUrl);
    // Cache to disk for next time
    fs.writeFile(localPath, buffer, () => console.log(`[images] cached ${filename}`));
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=604800');
    res.send(buffer);
  } catch (err) {
    console.error(`[images] failed to fetch ${filename}:`, err.message);
    res.status(502).send('Could not load image');
  }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Helpers ───────────────────────────────────────────────────────────────

function getConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function getNextSaturday() {
  const today = new Date();
  const day = today.getDay(); // 0=Sun, 6=Sat
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  const sat = new Date(today);
  sat.setDate(today.getDate() + daysUntilSat);
  return sat.toISOString().split('T')[0];
}

function createTransporter() {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function formatCurrency(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

// ─── API Routes ────────────────────────────────────────────────────────────

// GET /api/config — public-safe config for the frontend
app.get('/api/config', (req, res) => {
  const config = getConfig();
  res.json({
    businessName: config.businessName,
    tagline: config.tagline,
    instagramUrl: config.instagramUrl,
    orderCutoffDay: config.orderCutoffDay,
    orderCutoffTime: config.orderCutoffTime,
    menu: config.menu,
    weekends: config.weekends,
  });
});

// GET /api/availability?date=YYYY-MM-DD
app.get('/api/availability', (req, res) => {
  const config = getConfig();
  const date = req.query.date || getNextSaturday();
  const weekend = config.weekends[date];

  if (!weekend) {
    // Default: open, using global limit
    return res.json({
      date,
      available: true,
      soldOut: false,
      ordersPlaced: 0,
      limit: config.maxOrdersPerWeekend,
      remaining: config.maxOrdersPerWeekend,
      specialNote: null,
    });
  }

  const remaining = weekend.limit - (weekend.ordersPlaced || 0);
  res.json({
    date,
    available: !weekend.soldOut && remaining > 0,
    soldOut: weekend.soldOut || remaining <= 0,
    ordersPlaced: weekend.ordersPlaced || 0,
    limit: weekend.limit,
    remaining: Math.max(0, remaining),
    specialNote: weekend.specialNote || null,
    featuredItems: weekend.featuredItems || [],
  });
});

// POST /api/order
app.post('/api/order', async (req, res) => {
  const {
    name, email, phone,
    items, // [{ id, name, quantity, price }]
    fulfillment, // 'pickup' | 'delivery'
    deliveryAddress,
    preferredDate,
    notes,
  } = req.body;

  // Validation
  if (!name || !email || !phone || !items?.length || !fulfillment || !preferredDate) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const config = getConfig();
  const date = preferredDate;

  // Check availability
  const weekend = config.weekends[date] || {
    soldOut: false,
    ordersPlaced: 0,
    limit: config.maxOrdersPerWeekend,
  };

  if (weekend.soldOut || (weekend.ordersPlaced || 0) >= weekend.limit) {
    return res.status(409).json({ error: 'Sorry, this weekend is fully booked. Please choose another date.' });
  }

  // Record order
  if (!config.weekends[date]) {
    config.weekends[date] = { soldOut: false, ordersPlaced: 0, limit: config.maxOrdersPerWeekend };
  }
  config.weekends[date].ordersPlaced = (config.weekends[date].ordersPlaced || 0) + 1;
  saveConfig(config);

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderRef = `WL-${Date.now().toString(36).toUpperCase()}`;

  // Build item list HTML
  const itemsHtml = items.map(item =>
    `<tr>
      <td style="padding:6px 12px;">${item.name}</td>
      <td style="padding:6px 12px;text-align:center;">×${item.quantity}</td>
      <td style="padding:6px 12px;text-align:right;">${formatCurrency(item.price * item.quantity)}</td>
    </tr>`
  ).join('');

  // ── Customer confirmation email ──
  const customerHtml = `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:#FAF5EE;font-family:Georgia,serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF5EE;">
      <tr><td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.08);">
          <tr><td style="background:#8B2635;padding:40px;text-align:center;">
            <h1 style="margin:0;color:#FAF5EE;font-family:Georgia,serif;font-size:28px;letter-spacing:1px;">The Weekend Loaf</h1>
            <p style="margin:8px 0 0;color:#F0C4B0;font-family:Arial,sans-serif;font-size:14px;">Baked fresh every Saturday morning</p>
          </td></tr>
          <tr><td style="padding:40px;">
            <h2 style="color:#8B2635;font-family:Georgia,serif;margin:0 0 8px;">Order Confirmed!</h2>
            <p style="color:#2C1810;font-family:Arial,sans-serif;font-size:15px;">Hi ${name}, thank you for your order. We're so excited to bake for you!</p>
            <table width="100%" style="margin:24px 0;border:1px solid #F0E8D8;border-radius:6px;border-collapse:collapse;">
              <thead>
                <tr style="background:#FAF5EE;">
                  <th style="padding:10px 12px;text-align:left;color:#8B6355;font-family:Arial,sans-serif;font-size:13px;font-weight:600;">Item</th>
                  <th style="padding:10px 12px;text-align:center;color:#8B6355;font-family:Arial,sans-serif;font-size:13px;font-weight:600;">Qty</th>
                  <th style="padding:10px 12px;text-align:right;color:#8B6355;font-family:Arial,sans-serif;font-size:13px;font-weight:600;">Price</th>
                </tr>
              </thead>
              <tbody style="color:#2C1810;font-family:Arial,sans-serif;font-size:14px;">
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr style="border-top:2px solid #F0E8D8;">
                  <td colspan="2" style="padding:10px 12px;font-family:Arial,sans-serif;font-weight:bold;color:#2C1810;">Total</td>
                  <td style="padding:10px 12px;text-align:right;font-family:Arial,sans-serif;font-weight:bold;color:#8B2635;">${formatCurrency(total)}</td>
                </tr>
              </tfoot>
            </table>
            <table width="100%" style="background:#FAF5EE;border-radius:6px;padding:20px;margin:0 0 24px;" cellpadding="0" cellspacing="0">
              <tr><td style="font-family:Arial,sans-serif;font-size:14px;color:#2C1810;padding:4px 0;">
                <strong>Order Reference:</strong> ${orderRef}
              </td></tr>
              <tr><td style="font-family:Arial,sans-serif;font-size:14px;color:#2C1810;padding:4px 0;">
                <strong>Pickup/Delivery Date:</strong> ${new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </td></tr>
              <tr><td style="font-family:Arial,sans-serif;font-size:14px;color:#2C1810;padding:4px 0;">
                <strong>Fulfillment:</strong> ${fulfillment === 'pickup' ? 'Pickup' : `Delivery to: ${deliveryAddress}`}
              </td></tr>
              ${notes ? `<tr><td style="font-family:Arial,sans-serif;font-size:14px;color:#2C1810;padding:4px 0;"><strong>Notes:</strong> ${notes}</td></tr>` : ''}
            </table>
            <p style="color:#8B6355;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;">
              You'll receive a reminder the day before your order is ready. If you need to make any changes, just reply to this email.
            </p>
            <p style="color:#8B6355;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;">
              With love from our kitchen,<br><strong style="color:#8B2635;">The Weekend Loaf</strong>
            </p>
          </td></tr>
          <tr><td style="background:#F0E8D8;padding:20px;text-align:center;">
            <p style="margin:0;color:#8B6355;font-family:Arial,sans-serif;font-size:12px;">${config.businessEmail} · ${config.phone} · ${config.location}</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>`;

  // ── Owner notification email ──
  const ownerHtml = `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">
    <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:8px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
      <h2 style="color:#8B2635;margin:0 0 20px;">New Order Received</h2>
      <p style="color:#666;font-size:13px;">Reference: <strong>${orderRef}</strong></p>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
      <h3 style="color:#2C1810;font-size:15px;margin:0 0 12px;">Customer Details</h3>
      <p style="margin:4px 0;font-size:14px;color:#333;"><strong>Name:</strong> ${name}</p>
      <p style="margin:4px 0;font-size:14px;color:#333;"><strong>Email:</strong> ${email}</p>
      <p style="margin:4px 0;font-size:14px;color:#333;"><strong>Phone:</strong> ${phone}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
      <h3 style="color:#2C1810;font-size:15px;margin:0 0 12px;">Order Details</h3>
      <table width="100%" style="border-collapse:collapse;font-size:14px;">
        ${itemsHtml}
        <tr style="border-top:2px solid #eee;">
          <td colspan="2" style="padding:8px 12px;font-weight:bold;">Total</td>
          <td style="padding:8px 12px;text-align:right;font-weight:bold;color:#8B2635;">${formatCurrency(total)}</td>
        </tr>
      </table>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
      <p style="margin:4px 0;font-size:14px;color:#333;"><strong>Date:</strong> ${date}</p>
      <p style="margin:4px 0;font-size:14px;color:#333;"><strong>Fulfillment:</strong> ${fulfillment === 'pickup' ? 'Pickup' : `Delivery → ${deliveryAddress}`}</p>
      ${notes ? `<p style="margin:4px 0;font-size:14px;color:#333;"><strong>Notes:</strong> ${notes}</p>` : ''}
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
      <p style="font-size:13px;color:#999;">Orders this weekend: ${config.weekends[date].ordersPlaced} / ${config.weekends[date].limit}</p>
    </div>
  </body>
  </html>`;

  // Send emails
  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"${config.businessName}" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Order Confirmed – ${config.businessName} (${orderRef})`,
        html: customerHtml,
      });
      await transporter.sendMail({
        from: `"${config.businessName} Orders" <${process.env.SMTP_USER}>`,
        to: process.env.OWNER_EMAIL || config.ownerEmail,
        subject: `New Order: ${name} – ${orderRef}`,
        html: ownerHtml,
      });
    } else {
      console.log('[Email] SMTP not configured. Skipping email send.');
      console.log('[Order]', { orderRef, name, email, items, fulfillment, date, total });
    }
  } catch (err) {
    console.error('[Email Error]', err.message);
    // Don't fail the request — order is already recorded
  }

  res.json({ success: true, orderRef, total });
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const config = getConfig();
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"${config.businessName} Contact" <${process.env.SMTP_USER}>`,
        to: process.env.OWNER_EMAIL || config.ownerEmail,
        replyTo: email,
        subject: `Contact Form: ${subject || 'New message'} – from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;padding:24px;">
            <h2 style="color:#8B2635;">New Contact Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject || '—'}</p>
            <hr>
            <p style="white-space:pre-wrap;">${message}</p>
          </div>`,
      });
    } else {
      console.log('[Contact]', { name, email, subject, message });
    }
  } catch (err) {
    console.error('[Email Error]', err.message);
  }

  res.json({ success: true });
});

// Serve all HTML pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🍞  The Weekend Loaf server running at http://localhost:${PORT}\n`);
});
