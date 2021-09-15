const _cacheName = 'mycache-V.1509';

const _cacheAssets = [
    
    'index.html',
    'list.html',
    '/js/index.js',
    '/js/list.js',
    '/js/jquery.min.js',
    '/js/jquery-ui.min.js',
    '/js/jstorage.js',
    'main.js',
    '/fonts/fontawesome-webfont.eot',
    '/fonts/fontawesome-webfont.svg',
    '/fonts/fontawesome-webfont.ttf',
    '/fonts/fontawesome-webfont.woff',
    '/fonts/fontawesome-webfont.woff2',
    '/fonts/FontAwesome.otf',
    '/fonts/iconFont.eot',
    '/fonts/iconFont.svg',
    '/fonts/iconFont.ttf',
    '/fonts/iconFont.woff',
    '/css/bootstrap.min.css',
    '/css/bootstrap-theme.min.css',
    '/css/font-awesome.min.css',
    '/css/style.css',
    '/images/Preloader.gif'
];


self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');

    ////### move to fetch
    event.waitUntil(
        caches
            .open(_cacheName)
            .then((cache) => {
                console.log('Service Worker: Caching Files');
                cache.addAll(_cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
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

//## fetch when adding cache from install
self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
        fetch(fetchEvent.request).catch(() => caches.match(fetchEvent.request)));
});

//call fetch event
//self.addEventListener('fetch', (fetchEvent) => {
//    fetchEvent.respondWith(
//        fetch(fetchEvent.request)
//            .then(res => {
//                //make copy/clone of response
//                const cacheRes = res.clone();
//                caches
//                    .open(_cacheName)
//                    .then(cache => cache.put(fetchEvent.request, cacheRes));
           
//            return res;
//        }).catch(() => caches.match(fetchEvent.request).then(res => res))
//    );
//});


