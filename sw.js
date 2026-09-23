// Dragon Dash — Service Worker
const CACHE = 'dragon-dash-v1';

const ASSETS = [
  '/midra/',
  '/midra/index.html',
  '/midra/style.css',
  '/midra/game.js',
  '/midra/config.json',
  '/midra/manifest.json',
  '/midra/icons/icon-192x192.png',
  '/midra/icons/icon-512x512.png',
  '/midra/icons/apple-touch-icon.png'
];

// Instalar y cachear archivos del juego
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(ASSETS).catch(err => {
        console.warn('[SW] Error cacheando activos:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activar y limpiar caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia: Cache first, luego red (offline-first)
self.addEventListener('fetch', e => {
  // Solo manejar peticiones GET del mismo origen
  if (e.request.method !== 'GET') return;
  
  // Para CDN de Three.js: red primero
  if (e.request.url.includes('jsdelivr') || e.request.url.includes('cdn')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Para archivos del juego: cache first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      });
    })
  );
});
