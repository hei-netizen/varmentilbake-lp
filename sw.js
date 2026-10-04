// Arcads kundeportal — nettverk først, lagret kopi når man er offline. Rører bare /portal/ og /oppstart/.
const C='arcads-portal-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(!/^\/(portal|oppstart|app)\//.test(u.pathname)&&u.pathname!=='/manifest.webmanifest')return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k))}return r})
    .catch(()=>caches.match(e.request).then(r=>r||caches.match('/portal/'))));
});
