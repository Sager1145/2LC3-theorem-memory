/* Bank update requests must report network failures instead of serving stale cache. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {test} = require('node:test');
const code = fs.readFileSync(require('node:path').join(__dirname, '..', 'sw.js'), 'utf8');

for (const request of [
  {url:'https://example.test/app/data/version.json',cache:'default'},
  {url:'https://example.test/app/data/theorems.json',cache:'default'},
  {url:'https://example.test/app/data/sources.json',cache:'default'},
  {url:'https://example.test/app/data/study.json',cache:'default'},
  {url:'https://example.test/app/file.json?tq-bank-update=123',cache:'default'},
  {url:'https://example.test/app/file.json',cache:'no-store'}
]) {
  test(`bank fetch bypasses stale cache: ${request.url} / ${request.cache}`, async () => {
    const handlers = {}, failure = new Error('offline');
    let cacheLookups = 0, response;
    vm.runInNewContext(code, {
      URL, Response,
      self:{location:{origin:'https://example.test'},addEventListener:(event, handler)=>{handlers[event]=handler;}},
      fetch:()=>Promise.reject(failure),
      caches:{match:()=>{cacheLookups++;return Promise.resolve('old bank');}}
    });
    handlers.fetch({request:{method:'GET',...request},respondWith:promise=>{response=promise;}});
    await assert.rejects(response, failure);
    assert.equal(cacheLookups, 0);
  });
}

function workerRequest(request, cached, fetch) {
  const handlers={},pending=[];
  let response;
  const cache={match:async key=>cached.get(typeof key==='string'?key:key.url),put:async(key,value)=>cached.set(key.url,value)};
  vm.runInNewContext(code,{
    URL,Response,fetch,
    self:{location:{origin:'https://example.test'},addEventListener:(event,handler)=>{handlers[event]=handler;}},
    caches:{open:async()=>cache}
  });
  handlers.fetch({request:{method:'GET',cache:'default',...request},respondWith:value=>{response=value;},waitUntil:value=>pending.push(value)});
  return {response,pending};
}

test('a cached versioned asset returns without waiting for the network',async()=>{
  const url='https://example.test/app/assets/data.js?v=existing';
  let calls=0;
  const {response}=workerRequest({url},new Map([[url,'bundled bank']]),()=>{calls++;return new Promise(()=>{});});
  assert.equal(await response,'bundled bank');
  assert.equal(calls,0);
});

test('a new asset version fetches and caches its exact URL',async()=>{
  const old='https://example.test/app/assets/data.js?v=old',url='https://example.test/app/assets/data.js?v=new';
  const cached=new Map([[old,'old bank']]);
  let calls=0;
  const {response,pending}=workerRequest({url},cached,async()=>{calls++;return new Response('new bank');});
  assert.equal(await (await response).text(),'new bank');
  await Promise.all(pending);
  assert.equal(calls,1);
  assert.equal(await cached.get(url).text(),'new bank');
  assert.equal(cached.get(old),'old bank');
});

test('offline requests never substitute a different asset version',async()=>{
  const failure=new Error('offline');
  const {response}=workerRequest({url:'https://example.test/app/assets/app.js?v=new'},
    new Map([['https://example.test/app/assets/app.js?v=old','old code']]),async()=>{throw failure;});
  await assert.rejects(response,failure);
});

test('navigation still discovers updated HTML and can fall back offline',async()=>{
  const request={url:'https://example.test/app/',mode:'navigate'};
  const cached=new Map([['./index.html','offline shell']]);
  const online=workerRequest(request,cached,async()=>new Response('new shell'));
  assert.equal(await (await online.response).text(),'new shell');
  await Promise.all(online.pending);
  const offline=workerRequest(request,new Map([['./index.html','offline shell']]),async()=>{throw new Error('offline');});
  assert.equal(await offline.response,'offline shell');
});
