var CACHE_KEY = 'hexo-pwa-cache-' + (self.registration ? self.registration.scope : '');

function getCache(request) {
    return caches.match(request).then(function (response) {
        if (response) {
            return response;
        }
    });
}

function saveToCache(req, res) {
    caches.open(CACHE_KEY).then(function (cache) {
        cache.put(req, res);
    });
}

function fetchAndCache(request) {
    return fetch(request)
        .then(function (response) {

            // 远程数据获取失败
            if (!response) {
                return getCache(request);
            }

            var responseClone = response.clone();
            saveToCache(request, responseClone);
            return response;
        })
        .catch(function (err) {
            // 远程数据获取失败
            return getCache(request);
        });
}

// 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([

            // 更新客户端
            self.clients.claim(),

            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== CACHE_KEY) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});

self.addEventListener('fetch', function (evt) {
    var request = evt.request;
    // 网络优先（成功则缓存），失败才从缓存获取
    evt.respondWith(fetchAndCache(request));
});
