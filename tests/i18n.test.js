const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(require.resolve('../assets/i18n.js'),'utf8'),context);
const {translate} = context.window.TQI18n;
test('language choices translate display settings and leave Chinese unchanged',()=>{
  assert.equal(translate('练习设置','en'),'Practice settings');
  assert.equal(translate('跟随系统','en'),'System');
  assert.equal(translate('练习设置','zh-CN'),'练习设置');
  assert.equal(translate('未知原文','en'),'未知原文');
});
test('dynamic challenge counts and mathematical content retain their values',()=>{
  assert.equal(translate('开始 10 题挑战','en'),'Start a 10-question quest');
  assert.equal(translate('p ∧ q ≡ q ∧ p','en'),'p ∧ q ≡ q ∧ p');
  assert.equal(translate('输入 \\ 命令，可用字符补全','en'),'Enter a \\ command; character completion is available');
});
