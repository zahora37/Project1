/**
 * download-images.js
 * Run once: node download-images.js
 * Downloads all bread/kitchen photos and saves them to public/images/
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

// Confirmed free Pexels photos (Pexels License — free for commercial use)
const IMAGES = [
  {
    filename: 'hero-kitchen.jpg',
    url: 'https://images.pexels.com/photos/6996205/pexels-photo-6996205.jpeg?auto=compress&cs=tinysrgb&w=1920&h=900&dpr=1',
    description: 'Hero: Woman kneading dough in warm kitchen',
  },
  {
    filename: 'story-loaves.jpg',
    url: 'https://images.pexels.com/photos/1383908/pexels-photo-1383908.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&dpr=1',
    description: 'Story: Pile of rustic sourdough loaves',
  },
  {
    filename: 'menu-classic.jpg',
    url: 'https://images.pexels.com/photos/7541727/pexels-photo-7541727.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Menu: Classic country loaf',
  },
  {
    filename: 'menu-rye.jpg',
    url: 'https://images.pexels.com/photos/105861/pexels-photo-105861.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Menu: Dark seeded rye',
  },
  {
    filename: 'menu-rosemary.jpg',
    url: 'https://images.pexels.com/photos/1079020/pexels-photo-1079020.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Menu: Rosemary & olive oil loaf',
  },
  {
    filename: 'menu-cinnamon.jpg',
    url: 'https://images.pexels.com/photos/7175448/pexels-photo-7175448.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Menu: Cinnamon raisin bread',
  },
  {
    filename: 'menu-focaccia.jpg',
    url: 'https://images.pexels.com/photos/12335533/pexels-photo-12335533.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Menu: Sourdough focaccia',
  },
  {
    filename: 'menu-starter.jpg',
    url: 'https://images.pexels.com/photos/209180/pexels-photo-209180.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Menu: Starter kit (bread making hands)',
  },
  {
    filename: 'hero-menu.jpg',
    url: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&dpr=1',
    description: 'Menu page hero: artisan bread on board',
  },
  {
    filename: 'hero-order.jpg',
    url: 'https://images.pexels.com/photos/209180/pexels-photo-209180.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&dpr=1',
    description: 'Order page hero: hands shaping dough',
  },
  {
    filename: 'hero-contact.jpg',
    url: 'https://images.pexels.com/photos/7175448/pexels-photo-7175448.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&dpr=1',
    description: 'Contact page hero: woman with bread',
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });

    req.on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  console.log('\n🍞  Downloading bread photos...\n');
  let ok = 0, fail = 0;

  for (const img of IMAGES) {
    const dest = path.join(IMAGES_DIR, img.filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`  ✓  ${img.filename} (already exists)`);
      ok++;
      continue;
    }
    process.stdout.write(`  ↓  ${img.filename}  —  ${img.description}... `);
    try {
      await download(img.url, dest);
      const kb = Math.round(fs.statSync(dest).size / 1024);
      console.log(`done (${kb} KB)`);
      ok++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      fail++;
    }
  }

  console.log(`\n  ${ok} downloaded, ${fail} failed.`);
  if (ok > 0) console.log('  Run "npm start" and open http://localhost:3000\n');
  if (fail > 0) console.log('  ⚠  Failed images will show warm gradient fallbacks.\n');
}

main();
