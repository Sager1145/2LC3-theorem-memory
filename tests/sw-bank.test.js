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
