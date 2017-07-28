var cacheKey = 'hexo-pwa-cache' + self.registration ? self.registration.scope : '';

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheKey).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/js/script.js'
            ]);
        })
    );
});
