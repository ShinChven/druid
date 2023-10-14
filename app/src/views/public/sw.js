const CACHE_NAME = 'my-cache-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/vite.svg'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (!self.caches) {
    console.log('Caches API not supported');
    return;
  }

  event.respondWith(
    self.caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request);
      });
    })
  );
});