const _cacheName = 'mycache-V123sss';

const _cacheAssets = [
    
    'index.html',
    '/js/main.js',
    '/css/bootstrap.min.css',
    '/css/bootstrap-theme.min.css',
    '/css/font-awesome.min.css',
    '/css/style.css'
];


self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');

    //### moved to fetch
    //event.waitUntil(
    //    caches
    //        .open(_cacheName)
    //        .then((cache) => {
    //            console.log('Service Worker: Caching Files');
    //            cache.addAll(_cacheAssets);
    //        })
    //        .then(() => self.skipWaiting())
    //);
});

//clean any old cache
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (_cacheName !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })        
    );
});

//call fetch event
self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
        fetch(fetchEvent.request)
            .then(res => {
                //make copy/clone of response
                const cacheRes = res.clone();
                caches
                    .open(_cacheName)
                    .then(cache => cache.put(fetchEvent.request, cacheRes));
           
            return res;
        }).catch(() => caches.match(fetchEvent.request).then(res => res))
    );
});

////## fetch when adding cache from install
//self.addEventListener('fetch', (fetchEvent) => {
//    fetchEvent.respondWith(
//        fetch(fetchEvent.request).catch(() => caches.match(fetchEvent.request)));
//});



//https://www.youtube.com/watch?v=ksXwaWHCW6k