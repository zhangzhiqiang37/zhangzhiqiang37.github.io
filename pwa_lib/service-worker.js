var cacheKey = 'hexo-pwa-cache-' + self.registration ? self.registration.scope : '';

function getCache(request) {
    return caches.match(request).then(function (response) {
        if (response) {
            return response;
        }
    });
}

self.addEventListener('fetch', function (evt) {
    var request = evt.request;
    evt.respondWith(
        fetch(request)
            .then(function (response) {

                // 远程数据获取失败
                if (!response || response.status !== 200) {
                    return getCache(request);
                }

                var responseClone = response.clone();
                caches.open(cacheKey).then(function (cache) {
                    cache.put(request, responseClone);
                });
                return response;
            })
            .catch(function (err) {
                return getCache(request);
            })
    );
});
