const CACHE_NAME = 'smartcook-v1';
const ASSETS = [
  'index.html',
  'style.css',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
  // Sem přidej další html stránky, pokud je chceš mít offline (např. 'favourites.html')
];

// Instalace Service Workeru a nacachování souborů
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktivace a promazání staré cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Načítání obsahu (přednostně z cache, pokud jsme offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});