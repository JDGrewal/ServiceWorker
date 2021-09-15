const _cacheName = 'mycache-V.1030';

const _cacheAssets = [
    
    'index.html',
    'list.html',
    '/js/index.js',
    '/js/list.js',
    '/js/jquery.min.js',
    '/js/jquery-ui.min.js',
    '/js/jstorage.js',
    'main.js',
    //'/fonts/fontawesome-webfont.eot',
    //'/fonts/fontawesome-webfont.svg',
    //'/fonts/fontawesome-webfont.ttf',
    //'/fonts/fontawesome-webfont.woff',
    //'/fonts/fontawesome-webfont.woff2',
    //'/fonts/FontAwesome.otf',
    //'/fonts/iconFont.eot',
    //'/fonts/iconFont.svg',
    //'/fonts/iconFont.ttf',
    //'/fonts/iconFont.woff',
    '/css/bootstrap.min.css',
    '/css/bootstrap-theme.min.css',
    '/css/font-awesome.min.css',
    '/css/style.css',
    '/images/Preloader.gif'
];

/*If all the files are successfully cached, then the service worker will be installed.
 * If any of the files fail to download, then the install step will fail.
 * This allows you to rely on having all the assets that you defined,
 * but does mean you need to be careful with the list of files you decide to cache in the install step.Defining a long list of files will increase the chance that one file may fail to cache,
 * leading to your service worker not getting installed.*/

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
/*One common task that will occur in the activate callback is cache management.
 * The reason you'll want to do this in the activate callback is because if you were to wipe out any old caches in the install step, 
 * any old service worker, which keeps control of all the current pages, will suddenly stop being able to serve files from that cache.*/

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


