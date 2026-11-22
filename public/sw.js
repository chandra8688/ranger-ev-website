/* RANGER EV service worker — keeps outlet pages and directions usable on
 * patchy highway connections.
 *  - Pages: network-first, falling back to the last cached copy.
 *  - Hashed build assets & images: stale-while-revalidate.
 *  - Third-party requests (analytics, maps, forms) are never touched.
 * Bump VERSION to drop old caches.
 */
const VERSION = 'v1';
const PAGES = `ranger-pages-${VERSION}`;
const STATIC = `ranger-static-${VERSION}`;
const PRECACHE = ['/', '/outlets', '/outlets/outlet-01', '/contact'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGES).then((cache) => cache.addAll(PRECACHE)).catch(() => {}).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => ![PAGES, STATIC].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(PAGES).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match('/'))),
    );
    return;
  }

  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/images/') || url.pathname.endsWith('.woff2')) {
    event.respondWith(
      caches.open(STATIC).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      }),
    );
  }
});
