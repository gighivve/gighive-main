// simple service worker to redirect CanvasKit CDN requests to local files
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  const url = event.request.url;
  if (url.startsWith('https://www.gstatic.com/flutter-canvaskit/')) {
    const parts = url.split('/');
    const file = parts[parts.length - 1];
    event.respondWith(fetch('/canvaskit/' + file));
  }
});