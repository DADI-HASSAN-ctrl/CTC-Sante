// CTC Santé Service Worker - Offline Support + Caching
const CACHE_NAME = 'ctc-sante-v1';
const RUNTIME_CACHE = 'ctc-sante-runtime-v1';
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Mise en cache des assets critiques');
      return cache.addAll(CRITICAL_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activation...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[ServiceWorker] Suppression du cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Strategy: Network First pour les API, Cache First pour les assets
  if (request.url.includes('/api/')) {
    // API: Network first, fallback to cache
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Mettre en cache les réponses réussies
          if (response.status === 200) {
            const clonedResponse = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback au cache si pas de réseau
          return caches.match(request).then((response) => {
            return response || new Response('Offline - Veuillez vérifier votre connexion', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
        })
    );
  } else {
    // Assets: Cache first, fallback to network
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          // Mettre en cache les assets réussis
          if (response.status === 200 && !request.url.includes('chrome-extension')) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        }).catch(() => {
          // Offline response
          return new Response('Ressource indisponible (offline)', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    tag: data.tag || 'notification',
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-courses') {
    event.waitUntil(
      fetch('/api/sync-courses', { method: 'POST' })
        .then(() => {
          console.log('[ServiceWorker] Sync réussi');
        })
        .catch((error) => {
          console.error('[ServiceWorker] Sync échoué:', error);
          throw error;
        })
    );
  }
});
