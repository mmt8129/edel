const CACHE_NAME = 'tezgah-panosu-v1';
const REPO_PATH = '/edel';  // kendi repo adınla değiştir

const urlsToCache = [
  REPO_PATH + '/',
  REPO_PATH + '/index.html',
  REPO_PATH + '/manifest.json',
  REPO_PATH + '/icon-192.png',
  REPO_PATH + '/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});
