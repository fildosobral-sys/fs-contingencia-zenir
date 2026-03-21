const VERSION = 'fs-cache-v7-deploy-fix';
const CORE_CACHE = `${VERSION}-core`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const IMAGE_CACHE = `${VERSION}-images`;

const OFFLINE_FALLBACKS = {
  root: './index.html',
  mobile: './index-mobile.html',
  desktop: './index-desktop.html'
};

const CORE_ASSETS = [
  './',
  './index.html',
  './index-mobile.html',
  './index-desktop.html',
  './manifest.json',
  './service-worker.js',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './file_00000000c73c71f58c92d4b660989472.png',
  './file_0000000010cc720e9b2db5d429c8af46.png',
  './IMG-20260313-WA0007.jpg',
  './file_000000004d1c720ea4a64950929c6e11.png',
  './vendas.html',
  './crediario.html',
  './parcelamento_planos.html',
  './orcamentos.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE_CACHE);
    await Promise.allSettled(
      CORE_ASSETS.map(async (asset) => {
        try {
          const request = new Request(asset, { cache: 'reload' });
          const response = await fetch(request);
          if (response && response.ok) {
            await cache.put(asset, response.clone());
          }
        } catch (_) {}
      })
    );
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => ![CORE_CACHE, RUNTIME_CACHE, IMAGE_CACHE].includes(key))
        .map((key) => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CLEAR_RUNTIME') {
    event.waitUntil((async () => {
      await caches.delete(RUNTIME_CACHE);
      await caches.delete(IMAGE_CACHE);
    })());
  }
});

function isSameOrigin(requestUrl) {
  return new URL(requestUrl).origin === self.location.origin;
}

function isAllowedRemote(requestUrl) {
  try {
    const u = new URL(requestUrl);
    return ['images.unsplash.com'].includes(u.hostname);
  } catch (e) {
    return false;
  }
}

function getOfflineFallback(url) {
  const path = url.pathname.toLowerCase();

  if (path.endsWith('/index-mobile.html') || path.endsWith('index-mobile.html')) {
    return OFFLINE_FALLBACKS.mobile;
  }

  if (path.endsWith('/index-desktop.html') || path.endsWith('index-desktop.html')) {
    return OFFLINE_FALLBACKS.desktop;
  }

  return OFFLINE_FALLBACKS.root;
}

async function cacheFirst(request, cacheName = RUNTIME_CACHE) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;

  const response = await fetch(request, { cache: 'no-cache' });
  if (response && response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, cacheName = RUNTIME_CACHE) {
  const cache = await caches.open(cacheName);

  try {
    const fresh = await fetch(request, { cache: 'no-cache' });
    if (fresh && fresh.ok) {
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (error) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;

    const fallback = getOfflineFallback(new URL(request.url));
    const offline = await caches.match(fallback, { ignoreSearch: true });
    if (offline) return offline;

    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName = RUNTIME_CACHE) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: true });

  const fetchPromise = fetch(request, { cache: 'no-cache' })
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached || fetchPromise;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;
  if (!isSameOrigin(request.url) && !isAllowedRemote(request.url)) return;

  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(
      networkFirst(request, RUNTIME_CACHE).catch(async () => {
        const fallback = getOfflineFallback(url);
        return caches.match(fallback, { ignoreSearch: true });
      })
    );
    return;
  }

  if (
    request.destination === 'image' ||
    /\.(png|jpg|jpeg|webp|gif|svg|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(
      cacheFirst(request, IMAGE_CACHE).catch(() => caches.match('./icon-192.png'))
    );
    return;
  }

  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    /\.(css|js|woff2?|ttf)$/i.test(url.pathname)
  ) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    return;
  }

  if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
    event.respondWith(
      networkFirst(request, RUNTIME_CACHE).catch(async () => {
        const fallback = getOfflineFallback(url);
        return caches.match(fallback, { ignoreSearch: true });
      })
    );
  }
});
