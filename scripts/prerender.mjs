/**
 * Build-time "head prerender".
 *
 * After `vite build`, writes one static HTML file per route
 * (dist/about.html, dist/outlets/outlet-01.html, … served at /about etc. via
 * vercel.json cleanUrls) whose <head>
 * already contains that route's title, description, canonical URL, Open Graph
 * / Twitter tags, JSON-LD and LCP image preload. Crawlers and WhatsApp /
 * LinkedIn / X link previews therefore see correct metadata without running JS.
 *
 * Also writes dist/404.html (noindex) and dist/sitemap.xml from the same data,
 * so unknown URLs get a real HTTP 404 on Vercel instead of a soft 200.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allRoutes, notFoundMeta, DEFAULT_OG_IMAGE } from '../src/data/seo.js';
import { outletsData } from '../src/data/outlets.js';
import { BASE_URL } from '../src/config.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const HEAD_RE = /<!-- %ROUTE_HEAD%[\s\S]*?<!-- \/%ROUTE_HEAD% -->/;
if (!HEAD_RE.test(template)) {
  console.error('prerender: %ROUTE_HEAD% markers not found in dist/index.html');
  process.exit(1);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (u) => (u.startsWith('/') ? `${BASE_URL}${u}` : u);
const jsonForHtml = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function preloadFor(routePath) {
  if (routePath === '/') {
    return '<link rel="preload" as="image" href="/images/cinematic/hero_cinematic_highway_v2_1786922470899.webp" type="image/webp" fetchpriority="high" />';
  }
  const outlet = outletsData.find((o) => routePath === `/outlets/${o.id}`);
  if (outlet) {
    const hero = outlet.photos.find((p) => p.src === outlet.images.hero);
    const w640 = Math.min(640, hero.width);
    const wMax = Math.min(1280, hero.width);
    return `<link rel="preload" as="image" type="image/avif" imagesrcset="${hero.src}-640.avif ${w640}w, ${hero.src}-1280.avif ${wMax}w" imagesizes="100vw" fetchpriority="high" />`;
  }
  return '';
}

function headFor({ path: routePath, title, description, ogImage, jsonLd, noindex }) {
  const url = `${BASE_URL}${routePath === '/' ? '/' : routePath}`;
  const image = abs(ogImage || DEFAULT_OG_IMAGE);
  const isDefaultImage = !ogImage || ogImage === DEFAULT_OG_IMAGE || ogImage.includes('1200x630');
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    noindex ? '<meta name="robots" content="noindex, follow" />' : `<link rel="canonical" href="${esc(url)}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="RANGER EV" />',
    '<meta property="og:locale" content="en_IN" />',
    noindex ? '' : `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    isDefaultImage ? '<meta property="og:image:width" content="1200" />' : '',
    isDefaultImage ? '<meta property="og:image:height" content="630" />' : '',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    jsonLd ? `<script type="application/ld+json" id="json-ld-structured-data">${jsonForHtml(jsonLd)}</script>` : '',
    noindex ? '' : preloadFor(routePath),
  ];
  return tags.filter(Boolean).join('\n    ');
}

const routes = allRoutes();
for (const route of routes) {
  const html = template.replace(HEAD_RE, headFor(route));
  // '/about' -> dist/about.html, served at /about by Vercel's cleanUrls.
  const outFile = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.path.slice(1)}.html`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
}

fs.writeFileSync(
  path.join(dist, '404.html'),
  template.replace(HEAD_RE, headFor({ path: '/404', ...notFoundMeta, noindex: true })),
);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url>
    <loc>${BASE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

console.log(`prerender: wrote ${routes.length} routes + 404.html + sitemap.xml`);
