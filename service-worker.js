
const filesToCache = [
  '/',
  'favicon.ico',
  'manifest.json',
  'index.html',
  'main.css',
  'main.js',
  'offline.html',
  '404.html',
  'README.md'
];

const staticCacheName = 'pages-cache-v3';

self.addEventListener('install', event => { 
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [staticCacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (response.status === 404) {
              return caches.match('404.html');
            }
            return caches.open(staticCacheName).then(cache => {
              cache.put(event.request.url, response.clone());
              return response;
            });
          });
      }).catch(error => {
        return caches.match('offline.html');
      })
  );
});

/*
const cacheName = 'page_cache_v2';

const urlsToCache = [
  '/',
  'favicon.ico',
  'manifest.json',
  'index.html',
  'main.css',
  'main.js',
  'offline.html',
  '404.html',
  'README.md'
];

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const jobs = keys.map(key => key !== cacheName ? caches.delete(key) : Promise.resolve());
    return Promise.all(jobs);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    try {
      const response = await fetch(event.request);
      return response;
    } catch (err) {
      const url = new URL(event.request.url);

      const pathname = url.pathname;
      const filename = pathname.substr(1 + pathname.lastIndexOf('/')).split(/\#|\?/g)[0];
      const extensions = ['.html', '.css', '.js', '.json', '.png', '.ico', '.svg', '.xml'];

      if (url.origin === location.origin && !extensions.some(ext => filename.endsWith(ext))) {
        const cachedIndex = await caches.match('/');
        if (cachedIndex) return cachedIndex;
      }

      throw err;
    }
  })());
});
*/