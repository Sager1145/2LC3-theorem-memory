/* Offline static assets. Update CACHE for each release. No cross-origin fetches. */
const CACHE='theorem-quest-preloaded-20261002-v46-page-transitions';
const ASSETS=['./','./index.html','./assets/style.css?v=20261002-page-transitions','./assets/engine.js?v=20261002-name-completions','./assets/data.js?v=20260930-qwerty','./assets/proofs.js?v=20260930-proof','./assets/notebook-hints.js?v=20260930-hint-usage','./assets/i18n.js?v=20261002-declaration-status','./assets/app.js?v=20261002-page-transitions','./favicon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('theorem-quest-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  const url=new URL(req.url);
  // Explicit bank checks must never fall back to an offline cached manifest or bank.
  if(req.cache==='no-store'||url.searchParams.has('tq-bank-update')||/\/data\/(version|theorems|sources|study)\.json$/.test(url.pathname)){event.respondWith(fetch(req));return;}
  async function network(){
    const res=await fetch(req);
    if(res.ok){const copy=res.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)));}
    return res;
  }
  // Built asset URLs contain a content hash. Match that exact URL, so a new
  // deployment never receives an older script while the worker is updating.
  if(url.pathname.includes('/assets/')||/\/(favicon\.svg|manifest\.webmanifest)$/.test(url.pathname)){
    event.respondWith(caches.open(CACHE).then(c=>c.match(req)).then(cached=>cached||network()));return;
  }
  // HTML stays network first so it discovers the new deployment's asset URLs.
  event.respondWith(network().catch(()=>caches.open(CACHE).then(async c=>await c.match(req)||(req.mode==='navigate'?await c.match('./index.html'):Response.error()))));
});
