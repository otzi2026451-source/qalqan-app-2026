self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('qalqan-v1').then((cache) =>
      cache.addAll([
        './',
        './dashboard/',
        './academy/',
        './market/',
        './ai/',
        './manifest.webmanifest'
      ])
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

self.addEventListener('push', (event) => {
  const data = event.data?.json() || {
    title: 'QALQAN',
    body: 'Новое уведомление в экосистеме Академии.'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './icons/icon-192.svg'
    })
  );
});
