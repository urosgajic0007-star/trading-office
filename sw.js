// Trading Office Web — omogoča namestitev kot aplikacija (podatki se vedno berejo v živo)
const C = 'to-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'index.html', 'icon-192.png']))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => { if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return; e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request))); });
