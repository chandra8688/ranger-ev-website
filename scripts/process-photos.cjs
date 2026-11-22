/**
 * Generates responsive, metadata-stripped AVIF + WebP variants of the
 * real RANGER Outlet #01 photos, a right-sized navbar logo, and an
 * exactly-1200x630 Open Graph image.
 *
 * Usage: node scripts/process-photos.cjs "<folder with original WhatsApp photos>"
 * Sharp strips EXIF (incl. GPS) by default, so no location metadata ships.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const SRC = path.join(ROOT, 'assets-src'); // originals — not deployed
const srcDir = process.argv[2];

const WIDTHS = [640, 1280];

async function variants(input, outBase) {
  fs.mkdirSync(path.dirname(outBase), { recursive: true });
  const meta = await sharp(input).rotate().metadata();
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width);
    const pipeline = sharp(input).rotate().resize({ width, withoutEnlargement: true });
    await pipeline.clone().webp({ quality: 74 }).toFile(`${outBase}-${w}.webp`);
    await pipeline.clone().avif({ quality: 52 }).toFile(`${outBase}-${w}.avif`);
  }
  console.log('✓', path.relative(ROOT, outBase), `${meta.width}x${meta.height}`);
}

(async () => {
  const outlet = path.join(PUB, 'images', 'outlets', 'outlet-01');

  // Originals kept in assets-src/
  await variants(path.join(SRC, 'outlets/outlet-01-night-totem.jpeg'), path.join(outlet, 'totem-night'));
  await variants(path.join(SRC, 'outlets/outlet-01-totem-design.jpeg'), path.join(outlet, 'totem-design'));
  await variants(path.join(SRC, 'chargers/ranger-60kw-dc-charger.jpeg'), path.join(outlet, 'charger-unit'));

  // Original site photos supplied by the owner (outside the repo)
  if (srcDir) {
    const map = {
      'WhatsApp Image 2026-08-08 at 10.28.34 PM.jpeg': 'cafe-front',
      'WhatsApp Image 2026-08-08 at 10.28.35 PM (1).jpeg': 'site-parking',
      'WhatsApp Image 2026-08-08 at 10.28.35 PM (2).jpeg': 'site-overview',
      'WhatsApp Image 2026-08-08 at 10.28.35 PM (3).jpeg': 'site-approach',
      'WhatsApp Image 2026-08-08 at 10.28.35 PM.jpeg': 'cafe-seating',
    };
    for (const [file, name] of Object.entries(map)) {
      const input = path.join(srcDir, file);
      if (fs.existsSync(input)) await variants(input, path.join(outlet, name));
      else console.warn('! missing', file);
    }
  }

  // Navbar / footer logo: 880px PNG -> 96px & 192px WebP (1x / 2x of 48px)
  const logo = path.join(SRC, 'brand/ranger-logo-navbar.png');
  for (const s of [96, 192]) {
    await sharp(logo).resize(s, s).webp({ quality: 90 }).toFile(path.join(PUB, `images/brand/ranger-logo-${s}.webp`));
  }
  console.log('✓ logo 96/192');

  // Open Graph image at exactly the declared 1200x630
  await sharp(path.join(SRC, 'og-image-opt.jpg'))
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(PUB, 'og-image-1200x630.jpg'));
  console.log('✓ og-image-1200x630.jpg');
})().catch((e) => { console.error(e); process.exit(1); });
