var cacheName = 'js13kPWA-v1';
var appShellFiles = [
    'icons/icon-192x192.png',
    'icons/icon-512x512.png',
    'index.html'
];

self.addEventListener('install', function(event) {
    console.log('sw event: install called');

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('sw event: fetch called');

    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response ? response : fetch(event.request);
        })
    );
});

self.addEventListener('push', function(event) {
    console.log('sw event: push called');

    var notificationDataObj = event.data.json();
    var content = {
        body: notificationDataObj.body,
    };
    event.waitUntil(
        self.registration.showNotification(notificationDataObj.title, content)
    );
});