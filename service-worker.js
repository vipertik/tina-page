const CACHE_NAME = 'tina-site-v1';
const ASSETS = [
  './',
  './index.html',
  './tina1.jpg',
  './favicon.png',
  './icon-192.png',
  './i_love_you.mp3',
  './instagram.png',
  './instagram1.png',
  './email.png',
  './manifest.json'
];

// نصب و کش کردن فایل‌ها
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// فعال‌سازی و حذف کش‌های قدیمی
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// واکشی فایل‌ها
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
