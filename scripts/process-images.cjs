/**
 * Builds the site's imagery from high-resolution originals in assets-src/:
 *  - public/images/scenes/<name>-{640,1280}.{avif,webp}  (cinematic scenes)
 *  - public/images/brand/ranger-logo-{96,192}.webp        (right-sized logo)
 *  - public/og-image-1200x630.jpg + per-outlet OG images   (exact 1200x630)
 *
 * Usage: npm run process-images
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const SRC = path.join(ROOT, 'assets-src');
const OUT = path.join(PUB, 'images', 'scenes');

/** Keep in sync with src/data/scenes.js */
const SCENES = {
  'hub-night': 'ranger_hero_highway_1786916153322.jpg',
  'charging-hub': 'vision_charging_hub_1786922492514.jpg',
  'charging-bay': 'amenity_charging_1786922724004.jpg',
  'highway-journey': 'vision_highway_journey_1786922522954.jpg',
  'highway-network': 'network_highway_scene_1786922800043.jpg',
  'charger-product': 'tech_charger_product_1786922543295.jpg',
  cafe: 'amenity_cafe_1786922734138.jpg',
  breakfast: 'amenity_breakfast_1786922747232.jpg',
  lounge: 'amenity_wifi_1786922760773.jpg',
  parking: 'amenity_parking.jpg',
  restrooms: 'amenity_toilets_1786922787166.jpg',
};

async function variants(input, name) {
  const meta = await sharp(input).metadata();
  for (const w of [640, 1280]) {
    const width = Math.min(w, meta.width);
    const base = sharp(input).resize({ width, withoutEnlargement: true });
    await base.clone().webp({ quality: 82, smartSubsample: true }).toFile(path.join(OUT, `${name}-${w}.webp`));
    await base.clone().avif({ quality: 58 }).toFile(path.join(OUT, `${name}-${w}.avif`));
  }
  console.log('✓', name, `${meta.width}x${meta.height}`);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [name, file] of Object.entries(SCENES)) {
    await variants(path.join(SRC, 'cinematic', file), name);
  }

  const logo = path.join(SRC, 'brand/ranger-logo-navbar.png');
  for (const s of [96, 192]) {
    await sharp(logo).resize(s, s).webp({ quality: 90 }).toFile(path.join(PUB, `images/brand/ranger-logo-${s}.webp`));
  }

  const og = (input, out, position = 'centre') =>
    sharp(input).resize(1200, 630, { fit: 'cover', position }).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  await og(path.join(SRC, 'og-image-opt.jpg'), path.join(PUB, 'og-image-1200x630.jpg'));
  fs.mkdirSync(path.join(PUB, 'images/outlets/outlet-01'), { recursive: true });
  await og(path.join(SRC, 'cinematic', SCENES['hub-night']), path.join(PUB, 'images/outlets/outlet-01/og-1200x630.jpg'), 'centre');
  console.log('✓ logo + OG images');
})().catch((e) => { console.error(e); process.exit(1); });
