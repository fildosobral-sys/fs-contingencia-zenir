
const cacheName='fs-cache-v1';
const files=['index.html','vendas.html','crediario.html'];

self.addEventListener('install',e=>{
e.waitUntil(
caches.open(cacheName).then(cache=>cache.addAll(files))
);
});

self.addEventListener('fetch',e=>{
e.respondWith(
caches.match(e.request).then(r=>r||fetch(e.request))
);
});
