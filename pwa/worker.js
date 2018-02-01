var cacheName = 'ageTest';
var fileCache = [
  '/mydemo/pwa/index.html',
  '/mydemo/pwa/images/1.png',
  '/mydemo/pwa/images/2.png',
  '/mydemo/pwa/app.js'
];

self.addEventListener('install', function(e) {
  console.log('worker install 事件触发');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(fileCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('worker activate 事件触发');
  e.waitUntil(
    caches.keys().then(function(keylist) {
      console.log('keylist============>', keylist)
      keylist.map(function(key) {
        if (key !== cacheName) {
          caches.delete(key);
        }
      })
    })
  );
});

self.addEventListener('fetch', function(e) {
  // console.log('fetch====>', e);
  console.log('fetch====>', e.request.url);
  var url = 'https://yqc.im/mydemo/pwa/api.php';
  if (e.request.url.indexOf(url) !== -1) {
    caches.open(cacheName).then(function(cache) {
      return fetch(e.request).then(function(res) {
        cache.put(e.request.url, res.clone());
        return res;
      })
    })
  } else {
    e.respondWith(
      caches.match(e.request).then(function(res) {
        console.log('res======>', res);
        return res || fetch(e.request)
      })
    )
  }
});
