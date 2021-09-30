const CACHE_NAME = "vibgyor-main"; //increment this when updating website
const self = this;

// Install SW
self.addEventListener("install", () => {
  // start caching assets
  // console.log('Installing service worker...')
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  // console.log('Service Worker: Fetching...')
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Make a copy of the server request
        const resClone = response.clone();

        // Open Cache
        caches.open(CACHE_NAME).then((cache) => {
          // Add response to the cache
          cache.put(event.request, resClone).then((response) => response);
        });
        return response;
      })
      .catch(() => caches.match(event.request).then((response) => response))
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  // console.log('Service Worker Activated!!')

  event.waitUntil(
    // delete any other cache which is not the current version
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            // console.log('Service Worker: Clearing Old Cache...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
