// ====================================================
//  Kids Adventure Game - Service Worker (PWA)
const CACHE_NAME = 'kids-adventure-v1';
const OFFLINE_URL = '/index.html';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/js/script.js',

  '/games/rekenen/index.html',
  '/games/rekenen/game.html',
  '/games/rekenen/style.css',
  '/games/memory/index.html',
  '/games/woorden/index.html',

  '/css/rekenen.css',
  '/css/memory_level.css',

  '/js/rekenen.js',
  '/js/memmory.js',
  '/js/woorden.js',

  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-144x144.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',

  '/assets/math.png',
  '/assets/memory.png',
  '/assets/star.png',
  '/assets/word.png',
];

// ==============================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching app shell and assets');
      // نحفظ الملفات بشكل فردي لتجنب فشل كامل عند خطأ واحد
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Failed to cache: ${url}`, err);
          })
        )
      );
    }).then(() => {
      console.log('[SW] Install complete!');
      return self.skipWaiting();
    })
  );
});

// ==============================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log(`[SW] Deleting old cache: ${name}`);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Active and ready!');
      return self.clients.claim();
    })
  );
});

// ==============================
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic'
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.destination === 'document') {
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});

// ==============================

// ==============================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
