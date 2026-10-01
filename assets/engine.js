/* Theorem Quest — local, deterministic schema matching; no eval, no network.
 * A theorem is NOT recognised by testing whether its whole formula is true.
 * Renaming must be bijective. The matcher preserves the law's operator structure.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TQEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const SHORTCUTS = Object.freeze({
    '\\equiv':'≡','\\==':'≡','\\nequiv':'≢','\\neq':'≠','\\ne':'≠',
    '\\land':'∧','\\wedge':'∧','\\and':'∧','\\lor':'∨','\\vee':'∨','\\or':'∨',
    '\\lnot':'¬','\\neg':'¬','\\not':'¬','\\implies':'⇒','\\=>':'⇒','\\Rightarrow':'⇒',
    '\\follows':'⇐','\\<==':'⇐','\\Leftarrow':'⇐','\\cdot':'·','\\.':'·',
    '\\leq':'≤','\\le':'≤','\\geq':'≥','\\ge':'≥','\\becomes':'≔','\\:=':'≔',
    '\\forall':'∀','\\exists':'∃','\\sum':'∑','\\product':'∏','\\prod':'∏',
    '\\lambda':'λ','\\Gl':'λ','\\with':'❙','\\spot':'•','\\bullet':'•',
    '\\min':'↓','\\max':'↑','\\[-':'⁅','\\]-':'⁆','\\;_':'⍮',
    '\\langle':'⟨','\\rangle':'⟩','\\<':'⟨','\\>':'⟩','\\beginhint':'⟨','\\endhint':'⟩',
    '\\<<':'⟪','\\>>':'⟫','\\in':'∈','\\notin':'∉','\\union':'∪','\\cup':'∪',
    '\\intersection':'∩','\\cap':'∩','\\setminus':'∖','\\subseteq':'⊆','\\subset':'⊂','\\supseteq':'⊇','\\supset':'⊃',
    '\\BB':'𝔹','\\bool':'𝔹','\\NN':'ℕ','\\nat':'ℕ','\\ZZ':'ℤ','\\int':'ℤ','\\RR':'ℝ','\\real':'ℝ',
    '\\QQ':'ℚ','\\rat':'ℚ','\\PP':'ℙ','\\powerset':'ℙ','\\universe':'𝐔','\\times':'×',
    '\\rel':'↔','\\lrel':'⦗','\\rrel':'⦘','\\rcomp':'⨾','\\fcomp':'⨾','\\;;':'⨾',
    '\\converse':'˘','\\lres':'／','\\rres':'＼','\\emptyseq':'𝜖','\\eps':'𝜖',
    '\\cons':'◃','\\snoc':'▹','\\catenate':'⌢','\\vdash':'⊦','\\emptyset':'∅',
    '\\alpha':'α','\\beta':'β','\\gamma':'γ','\\delta':'δ','\\theta':'θ',
    '\\ldquo':'“','\\rdquo':'”'
  });
  const SHORTCUT_KEYS=Object.keys(SHORTCUTS).sort((a,b)=>a.localeCompare(b));
  const SHORTCUT_SYMBOLS=new Set(Object.values(SHORTCUTS));
  const SHORTCUT_REPLACEMENTS=Object.keys(SHORTCUTS).sort((a,b)=>b.length-a.length).map(key=>{
    const escaped=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    return [new RegExp(escaped+(/[a-zA-Z]$/.test(key)?'(?![a-zA-Z])':''),'g'),SHORTCUTS[key]];
  });
  function shortcutSuggestions(prefix,limit=20) {
    if(typeof prefix!=='string'||!prefix.startsWith('\\'))return [];
    const query=prefix.toLocaleLowerCase();
    return SHORTCUT_KEYS.filter(key=>key.toLocaleLowerCase().startsWith(query)).slice(0,limit)
      .map(key=>({key,symbol:SHORTCUTS[key]}));
  }
  function shortcutPrefix(text,caret=text.length) {
    const head=String(text).slice(0,caret),start=head.lastIndexOf('\\');
    if(start<0)return null;
    const prefix=head.slice(start);
    return shortcutSuggestions(prefix,1).length?{start,prefix}:null;
  }
  function symbolsInFormula(formula) {
    return [...new Set(tokenize(formula).filter(token=>SHORTCUT_SYMBOLS.has(token)))];
  }
  const FIXED = new Set(('true false suc pred double even odd mod div max min abs gcd lcm sqrt sin cos ' +
    'is-knight is-knave says skip abort while do od if then else fi fst snd head tail length ' +
    'ℕ ℤ ℚ ℝ ℙ 𝔹 𝐔 𝜖 eps emptyseq nil Nat Bool Int Real set bag seq rel ' +
    'dom ran domain range id inv pow card rev take drop concat map filter').split(' '));
  const WORD = /^[\p{L}_][\p{L}\p{N}_'′]*$/u;
  const VARIABLE = /^(?:[a-zA-Zα-ωΑ-Ω][\p{N}_'′]*|[A-Z][a-z]?[\p{N}_'′]*)$/u;
  function normalizeInput(text) {
    if (typeof text !== 'string') return '';
    let s = text.normalize('NFC').replace(/[\u00a0\u2007\u202f]/g,' ').replace(/[−–]/g,'-')
      .replace(/⋅/g,'·').replace(/′/g,"'").replace(/\/≡/g,'≢').replace(/\/=/g,'≠');
    // Longest-first replacement with a boundary: \in must not consume \int.
    if(s.includes('\\'))for(const [pattern,symbol] of SHORTCUT_REPLACEMENTS)s=s.replace(pattern,symbol);
    return s.replace(/<=>|<==>/g,'≡').replace(/==>/g,'⇒').replace(/=>/g,'⇒').replace(/<==/g,'⇐')
      .replace(/\/\\/g,'∧').replace(/\\\//g,'∨').replace(/!=/g,'≠')
      .replace(/<=/g,'≤').replace(/>=/g,'≥').replace(/&&/g,'∧').replace(/\|\|/g,'∨')
      .replace(/\bNOT\b/g,'¬').replace(/\bAND\b/g,'∧').replace(/\bOR\b/g,'∨')
      .replace(/\s+/g,' ').trim();
  }
  function tokenize(text) {
    const s = normalizeInput(text);
    if (s.length > 2400) throw new Error('公式过长（上限 2400 字符）。');
    const tokens = [];
    let i = 0;
    while (i < s.length) {
      if (/\s/.test(s[i])) { i++; continue; }
      const rest = s.slice(i);
      let m = rest.match(/^(?:is-knight|is-knave|says)(?![a-zA-Z])/);
      if (!m) m = rest.match(/^(?:[\p{L}_][\p{L}\p{N}_'′]*|\d+(?:\.\d+)?)/u);
      if (m) { tokens.push(m[0]); i += m[0].length; }
      else if (rest.startsWith(':=')) { tokens.push(':='); i+=2; }
      else { const c = Array.from(rest)[0]; tokens.push(c); i+=c.length; }
      if (tokens.length > 700) throw new Error('公式包含过多符号。');
    }
    return tokens;
  }
  function isVariable(token) { return VARIABLE.test(token) && !FIXED.has(token); }
  function varsOf(tokens) { return [...new Set(tokens.filter(isVariable))]; }
  function balanced(tokens) {
    const opens = {'(':')','[':']','{':'}','⟨':'⟩','⟪':'⟫','⁅':'⁆','⦗':'⦘'};
    const closes = new Set(Object.values(opens)); const stack=[];
    for (const t of tokens) {
      if (opens[t]) stack.push(opens[t]);
      else if (closes.has(t) && stack.pop() !== t) return false;
    }
    return !stack.length;
  }
  function tokenAlpha(a,b) {
    if (a.length!==b.length) return null;
    const map=new Map(), rev=new Map();
    for (let i=0;i<a.length;i++) {
      if (isVariable(a[i])) {
        if (!isVariable(b[i]) || (map.has(a[i]) && map.get(a[i])!==b[i]) || (rev.has(b[i]) && rev.get(b[i])!==a[i])) return null;
        map.set(a[i],b[i]);rev.set(b[i],a[i]);
      } else if (a[i]!==b[i]) return null;
    }
    return map;
  }
  const PRE = {'≡':10,'≢':10,'⇒':20,'⇐':20,'∨':30,'∧':40,'=':50,'≠':50,'<':50,'≤':50,'>':50,'≥':50,'∈':50,'∉':50,'⊆':50,'⊂':50,'⊇':50,'⊃':50,
    '+':60,'-':60,'↑':60,'↓':60,'∪':60,'∩':65,'∖':60,'⊕':60,'⌢':60,'·':70,'*':70,'/':70,'÷':70,'mod':70,'div':70,'⨾':70,'∘':70,'^':90};
  const RIGHT = new Set(['⇒','⇐','^']);
  const COMM = new Set(['≡','≢','∨','∧','+','·','∪','∩','↑','↓']);
  const ASSOC = new Set([...COMM,'⨾','∘','⊕','⌢']);
  const SYM = new Set(['=','≠']);
  function parse(text,normalizeReverse=true) {
    const ts=Array.isArray(text)?text:tokenize(text); let i=0, depth=0;
    function atomStart(t) { return !!t && (t==='(' || WORD.test(t) || /^\d/.test(t)) && !(t in PRE); }
    function expr(min=0) {
      if (++depth>100) throw new Error('嵌套过深。');
      let t=ts[i++], left;
      if (t==='(') { left=expr(0); if(ts[i++]!==')') throw new Error('缺少右括号。'); }
      else if(t==='¬'||t==='-') left={op:t==='-'?'neg':'¬',args:[expr(80)]};
      else if (t && (WORD.test(t)||/^\d+(?:\.\d+)?$/.test(t))) left={op:isVariable(t)?'var':'const',value:t};
      else throw new Error('此公式使用结构模板判题。');
      while(i<ts.length) {
        t=ts[i];
        if(t===')') break;
        // Function application, including suc (n + m).
        if(atomStart(t) && 95 >= min) {
          left={op:'apply',args:[left,expr(96)]}; continue;
        }
        const p=PRE[t]; if(p===undefined || p<min) break;
        i++; const right=expr(p+(RIGHT.has(t)?0:1));
        let op=t==='*'?'·':t, args=[left,right];
        if(normalizeReverse&&t==='⇐') {op='⇒'; args.reverse();}
        if(normalizeReverse&&t==='≥') {op='≤'; args.reverse();}
        if(normalizeReverse&&t==='>') {op='<'; args.reverse();}
        if(normalizeReverse&&t==='⊇') {op='⊆';args.reverse();}
        if(normalizeReverse&&t==='⊃') {op='⊂';args.reverse();}
        left={op,args};
      }
      depth--;return left;
    }
    if(!ts.length) throw new Error('请输入公式。');
    const tree=expr(); if(i!==ts.length) throw new Error('此公式使用结构模板判题。');
    return tree;
  }
  function flatten(tree,op) {
    return tree.op===op && ASSOC.has(op) ? tree.args.flatMap(n=>flatten(n,op)) : [tree];
  }
  function shape(n) {
    if(n.op==='var') return '$';
    if(n.op==='const') return '#'+n.value;
    let a=ASSOC.has(n.op)?flatten(n,n.op):n.args;
    let v=a.map(shape); if(COMM.has(n.op)||SYM.has(n.op)) v.sort();
    return n.op+'('+v.join(',')+')';
  }
  function cloneState(s) {return {map:new Map(s.map),rev:new Map(s.rev)};}
  function matchAST(expected,actual) {
    let budget=45000;
    // Lazy backtracking across nested AC subtrees is essential. A locally valid
    // renaming may contradict a variable used in a later subtree.
    function* match(a,b,state) {
      if(--budget<0||a.op!==b.op)return;
      if(a.op==='const'){if(a.value===b.value)yield state;return;}
      if(a.op==='var'){
        if((state.map.has(a.value)&&state.map.get(a.value)!==b.value)||(state.rev.has(b.value)&&state.rev.get(b.value)!==a.value))return;
        const n=cloneState(state);n.map.set(a.value,b.value);n.rev.set(b.value,a.value);yield n;return;
      }
      const assoc=ASSOC.has(a.op),comm=COMM.has(a.op),sym=SYM.has(a.op);
      const aa=assoc?flatten(a,a.op):a.args,bb=assoc?flatten(b,b.op):b.args;
      if(aa.length!==bb.length)return;
      if(comm||sym){
        const order=aa.map(n=>({n,s:shape(n)})).sort((x,y)=>y.s.length-x.s.length);
        function* visit(k,remaining,st){
          if(--budget<0)return;
          if(k===order.length){yield st;return;}
          const wanted=order[k];
          for(let j=0;j<remaining.length;j++){
            if(shape(remaining[j])!==wanted.s)continue;
            for(const next of match(wanted.n,remaining[j],st))
              yield* visit(k+1,remaining.filter((_,i)=>i!==j),next);
          }
        }
        yield* visit(0,bb,state);
      }else{
        function* seq(k,st){
          if(k===aa.length){yield st;return;}
          for(const next of match(aa[k],bb[k],st))yield* seq(k+1,next);
        }
        yield* seq(0,state);
      }
    }
    const result=match(expected,actual,{map:new Map(),rev:new Map()}).next();
    return result.done?null:result.value.map;
  }
  function stripTruth(t) {
    if(t.op==='≡' && t.args[1].op==='const' && t.args[1].value==='true') return t.args[0];
    if(t.op==='≡' && t.args[0].op==='const' && t.args[0].value==='true') return t.args[1];
    return t;
  }
  function mapMessage(map) {
    const changes=[...map.entries()].filter(([a,b])=>a!==b);
    return changes.length ? '变量改名一致：'+changes.map(([a,b])=>a+' → '+b).join('，') : '公式结构与原定理一致。';
  }
  function identicalAST(a,b) {
    return a.op===b.op && (a.value===b.value) &&
      (!a.args || a.args.length===b.args?.length && a.args.every((part,i)=>identicalAST(part,b.args[i])));
  }
  function copiedRelation(expected,answer) {
    const relations=new Set(['≡','≢','=','≠','≤','<','≥','>','⊆','⊂','⊇','⊃']);
    const x=parse(expected,false),y=parse(answer,false);
    return x.op===y.op && relations.has(x.op) &&
      !identicalAST(x.args[0],x.args[1]) && identicalAST(y.args[0],y.args[1]);
  }
  function compareFormula(expected,answer) {
    let a,b;
    try {a=tokenize(expected);b=tokenize(answer);} catch(e) {return {ok:false,kind:'invalid',message:e.message};}
    if(!b.length) return {ok:false,kind:'empty',message:'先输入你的答案。'};
    if(!balanced(b)) return {ok:false,kind:'syntax',message:'括号没有配对，请先检查括号。'};
    const direct=tokenAlpha(a,b);
    if(direct) return {ok:true,kind:'alpha',mapping:Object.fromEntries(direct),message:mapMessage(direct)};
    try {
      if(copiedRelation(a,b))return {ok:false,kind:'copied',message:'左右两边写成同一个式子，不能代替原定理的变形关系。'};
      const x=parse(a),y=parse(b);
      const map=matchAST(x,y)||matchAST(stripTruth(x),stripTruth(y));
      if(map) return {ok:true,kind:'structural',mapping:Object.fromEntries(map),message:mapMessage(map)+' 已接受交换、结合或反向关系写法。'};
    } catch(_) { /* Higher-order, quantifier and command syntax: never guess validity. */ }
    const av=varsOf(a), bv=varsOf(b);
    if(av.length!==bv.length) return {ok:false,kind:'variables',message:`这条定理需要 ${av.length} 个不同变量；你的答案有 ${bv.length} 个。不同变量不能被合并。`};
    return {ok:false,kind:'mismatch',message:'检查同一个字母是否始终代表同一个变量，以及逻辑符号、括号和常量。不能用另一条恒真式替代这条定理。'};
  }
  function blankTemplate(formula) {
    const tokens=tokenize(formula), blanks=[];
    tokens.forEach((t,i)=>{if(isVariable(t))blanks.push({index:i,variable:t});});
    return {tokens,blanks,variables:varsOf(tokens)};
  }
  const CLOZE_GROUPS = [
    ['≡','≢','⇒','⇐'], ['∧','∨','¬'], ['=','≠','<','≤','>','≥'],
    ['+','-','·','/'], ['∈','∉','⊆','⊂','⊇','⊃'], ['∪','∩','∖'], ['∀','∃']
  ];
  const CLOZE_TOKENS = new Set(CLOZE_GROUPS.flat());
  function clozeTemplate(formula,rng=Math.random,difficulty=2) {
    const tokens=tokenize(formula);
    let depth=0;
    const candidates=tokens.map((token,index)=>{
      if([')',']','}','⁆','⟩','⟫','⦘'].includes(token))depth--;
      const candidate={token,index,depth};
      if(['(','[','{','⁅','⟨','⟪','⦗'].includes(token))depth++;
      return candidate;
    }).filter(x=>CLOZE_TOKENS.has(x.token));
    if(candidates.length<2)return null;
    // Keep the main equality/equivalence visible, including wrapped statements.
    const relations=candidates.filter(x=>x.token==='='||x.token==='≡');
    relations.sort((a,b)=>a.depth-b.depth||(a.token===b.token?0:a.token==='≡'?-1:1)||a.index-b.index);
    const anchor=relations[0]?.index;
    const hideable=candidates.filter(x=>x.index!==anchor);
    const count=difficulty===1?1:difficulty===3?hideable.length:Math.ceil(hideable.length/2);
    const blanks=shuffle(hideable,rng).slice(0,count).sort((a,b)=>a.index-b.index).map(({token,index})=>({index,correct:token}));
    const groups=CLOZE_GROUPS.filter(group=>candidates.some(x=>group.includes(x.token)));
    return {tokens,blanks,options:shuffle([...new Set(groups.flat())],rng)};
  }
  function fillCloze(template,values) {
    if(values.length!==template.blanks.length||template.blanks.some((_,i)=>!values[i]))return null;
    const tokens=template.tokens.slice();
    template.blanks.forEach((blank,i)=>tokens[blank.index]=values[i]);
    return tokens.join(' ');
  }
  function gradeCloze(template,values) {
    return values.length===template.blanks.length&&template.blanks.every((blank,i)=>values[i]===blank.correct);
  }
  function fillTemplate(template,values) {
    if(values.length!==template.blanks.length||values.some(x=>!isVariable(normalizeInput(x)))) return null;
    const t=template.tokens.slice(); template.blanks.forEach((b,i)=>t[b.index]=normalizeInput(values[i]));return t.join(' ');
  }
  function referenceParts(s) {
    return String(s).replace(/[()\s]/g,'').match(/\d+|[^\d.]+/g)?.map(x=>/^\d+$/.test(x)?Number(x):x) || [];
  }
  function compareRefs(a,b) {
    const x=referenceParts(a),y=referenceParts(b);
    for(let i=0;i<Math.max(x.length,y.length);i++) {
      if(x[i]===undefined)return -1;if(y[i]===undefined)return 1;
      if(x[i]===y[i])continue;
      if(typeof x[i]===typeof y[i])return x[i]<y[i]?-1:1;
      return typeof x[i]==='number'?-1:1;
    }return 0;
  }
  function referenceInRange(numbers,raw) {
    if(!raw.trim())return true;
    const chunks=raw.replace(/[（(]/g,'').replace(/[）)]/g,'').split(/[,，;；\n]+/).map(x=>x.trim()).filter(Boolean);
    return numbers.some(num=>chunks.some(chunk=>{
      const pair=chunk.split(/\s*(?:-|–|—|~|～|至)\s*/);
      if(pair.some(p=>!/^\d+(?:\.\d+)*(?:[a-z≡=]+)?$/.test(p)))return false;
      if(pair.length===1) return num===pair[0]||num.startsWith(pair[0]+'.')||new RegExp('^'+pair[0].replace(/\./g,'\\.')+'[a-z≡=]+$').test(num);
      return pair.length===2&&compareRefs(num,pair[0])>=0&&compareRefs(num,pair[1])<=0;
    }));
  }
  function gradeBlanks(template,values) {
    const answer=fillTemplate(template,values);
    if(!answer)return {ok:false,kind:'invalid',message:'每个空只能填一个字母变量。'};
    const mapping=tokenAlpha(template.tokens,tokenize(answer));
    return {ok:!!mapping,kind:'blanks',message:mapping?'变量关系正确。':'同一个变量须保持一致，不同变量不能合并。'};
  }
  function normalizeName(s) {
    // Names contain ordinary words such as "and" and "not". Uppercasing a
    // name must not reinterpret those words as formula input operators.
    const words=typeof s==='string'?s.replace(/\b(?:NOT|AND|OR)\b/g,word=>word.toLowerCase()):s;
    return normalizeInput(words).toLocaleLowerCase().replace(/[“”"'`‘’]/g,'').replace(/\s+/g,' ').trim();
  }
  function searchRecords(records,query) {
    const q=normalizeName(query); if(!q)return records.slice();
    const exact=[],prefix=[],rest=[];
    for(const r of records) {
      const labels=[r.name,...(r.aliases||[]),r.displayRef,...(r.numbers||[])].map(normalizeName);
      if(labels.some(s=>s===q))exact.push(r);
      else if(labels.some(s=>s.startsWith(q)))prefix.push(r);
      else if(labels.some(s=>s.includes(q))||normalizeName(r.formula).includes(q))rest.push(r);
    }return [...exact,...prefix,...rest];
  }
  function nameCompletions(records,query,limit=80) {
    if(typeof query!=='string'||Array.from(query).length<3)return [];
    const normalized=normalizeName(query);if(!normalized)return [];
    const ranked=[[],[]],seen=new Set();
    const isName=name=>typeof name==='string'&&name.trim()&&name!=='原文未命名'&&!/^[\s\d().·-]+$/.test(name);
    for(const record of records){
      // Missing names and reference metadata cannot become completions.
      if(!isName(record.name))continue;
      for(const name of [record.name,...(record.aliases||[])]){
        if(!isName(name))continue;
        const text=normalizeName(name);if(!text||seen.has(text)||!text.startsWith(normalized))continue;
        seen.add(text);
        ranked[text===normalized?0:1].push(name.trim());
      }
    }
    return ranked.flat().slice(0,limit);
  }
  function hintLocations(r, sources, weekBySource = {}) {
    const sourceMap = new Map(sources.map(s => [s.id, s])), locations = new Map();
    for (const origin of r.sources || []) {
      const source = sourceMap.get(origin.sourceId);
      if (!source) continue;
      if (!locations.has(source.id)) locations.set(source.id, {
        sourceId: source.id, name: source.name, url: source.url,
        year: source.year || (source.id.startsWith('calc-2026-') ? 2026 : 2025),
        weeks: [...new Set(weekBySource[source.id] ?? source.weeks ?? [])].sort((a,b) => a-b),
        lines: [], sections: []
      });
      const location = locations.get(source.id), locator = origin.locator || {};
      if (Number.isInteger(locator.line) && !location.lines.includes(locator.line)) location.lines.push(locator.line);
      if (locator.section && !location.sections.includes(locator.section)) location.sections.push(locator.section);
    }
    return [...locations.values()].map(location => ({...location, lines: location.lines.sort((a,b) => a-b)}))
      .sort((a,b) => b.year-a.year || (a.weeks[0] ?? Infinity)-(b.weeks[0] ?? Infinity) || a.name.localeCompare(b.name));
  }
  function label(r) { return `${r.displayRef} · ${r.name}`; }
  // Rank real cards by the visible name and formula structure, ignoring variable spelling.
  function overlap(a,b) {
    const x=new Set(a),y=new Set(b),union=new Set([...x,...y]);
    return union.size?[...x].filter(t=>y.has(t)).length/union.size:0;
  }
  function nameFeatures(name) {
    const s=normalizeName(name).replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    const chars=Array.from(s.replace(/ /g,''));
    return {text:s,words:s.split(' ').filter(Boolean),pairs:chars.slice(1).map((c,i)=>chars[i]+c)};
  }
  const choiceFeatureCache=new WeakMap();
  function choiceFeatures(r) {
    const aliases=JSON.stringify(r.aliases||[]),cached=choiceFeatureCache.get(r);
    if(cached&&cached.formula===r.formula&&cached.name===r.name&&cached.aliases===aliases)return cached.features;
    const variables=new Map();
    const tokens=tokenize(r.formula).map(t=>{
      if(!isVariable(t))return t;
      if(!variables.has(t))variables.set(t,variables.size);
      return '$'+variables.get(t);
    });
    const features={names:[r.name,...(r.aliases||[])].filter(n=>n&&n!=='原文未命名').map(nameFeatures),
      tokens,pairs:tokens.slice(1).map((t,i)=>tokens[i]+' '+t),
      operators:tokens.filter(t=>!t.startsWith('$')&&!['(',')','[',']','{','}'].includes(t))};
    choiceFeatureCache.set(r,{formula:r.formula,name:r.name,aliases,features});
    return features;
  }
  function featureSimilarity(a,b,sameTopic) {
    let name=0;
    for(const x of a.names)for(const y of b.names)
      name=Math.max(name,x.text===y.text?1:0.55*overlap(x.words,y.words)+0.45*overlap(x.pairs,y.pairs));
    const formula=0.65*overlap(a.pairs,b.pairs)+0.35*overlap(a.operators,b.operators);
    return 0.6*name+0.35*formula+(sameTopic?0.05:0);
  }
  function choiceSimilarity(a,b) {
    return featureSimilarity(choiceFeatures(a),choiceFeatures(b),!!a.topic&&a.topic===b.topic);
  }
  function isFoundationalTheorem(r) {
    return [r.name,...(r.aliases||[])].filter(Boolean).some(name=>
      /\b(?:asso|associativity|associative|symmetry|symmetric|reflexivity|reflexive|reflextivity)\b|结合律|对称(?:性|律)|自反(?:性|律)/iu.test(normalizeName(name)));
  }
  function choiceOptions(records,target,difficulty=2,rng=Math.random) {
    const level=[1,2,3].includes(difficulty)?difficulty:2,targetFeatures=choiceFeatures(target);
    const ranked=shuffle(records.filter(r=>isQuestionCard(r)&&(level!==3||!isFoundationalTheorem(r))&&r.id!==target.id&&label(r)!==label(target)),rng)
      .map(r=>({r,score:featureSimilarity(targetFeatures,choiceFeatures(r),!!target.topic&&r.topic===target.topic)}))
      .sort((a,b)=>a.score-b.score);
    // The middle level draws from the middle of the similarity ranking.
    const midpoint=(ranked.length-1)*0.5;
    const ordered=level===3?ranked.reverse():level===1?ranked:ranked.map((x,i)=>({...x,distance:Math.abs(i-midpoint)})).sort((a,b)=>a.distance-b.distance);
    const options=[target],seen=new Set([label(target)]);
    const variants=r=>[r.formula,...(r.formulaVariants||[])];
    for(const {r} of ordered) {
      if(seen.has(label(r))||variants(target).some(a=>variants(r).some(b=>compareFormula(a,b).ok)))continue;
      seen.add(label(r));options.push(r);
      if(options.length===4)break;
    }
    return shuffle(options,rng);
  }
  function nameGroup(records,record) {
    if(!record.numbers?.length||!record.name||record.name==='原文未命名')return [record];
    const name=normalizeName(record.name);
    return records.filter(r=>r.numbers?.length&&normalizeName(r.name)===name);
  }
  function answerVariants(records,record) {
    const group=nameGroup(records,record);
    return [record,...group.filter(r=>r.id!==record.id)].map(r=>({
      id:r.id,
      names:[...new Set([r.name,...(r.aliases||[])].filter(Boolean))],
      references:[...new Set([r.displayRef,...(r.numbers||[]).map(n=>`(${n})`)].filter(Boolean))],
      formulas:[...new Set([r.formula,...(r.formulaVariants||[])].filter(Boolean))],
      variantLabel:r.variantLabel||'',
      sideCondition:r.sideCondition||''
    }));
  }
  function gradeName(records,target,{selectedId=null,groupSelected=false,typed=''}) {
    if(selectedId){
      const selected=records.find(r=>r.id===selectedId);
      return {ok:!!selected&&(selected.id===target.id||!!target.numbers?.length&&selected.displayRef===target.displayRef&&normalizeName(selected.name)===normalizeName(target.name)),kind:'numbered'};
    }
    const group=nameGroup(records,target);
    if(groupSelected)return {ok:group.length>1,kind:'group'};
    const query=normalizeName(typed);
    if(!query)return {ok:false,kind:'empty'};
    // A bare shared name denotes the group. A reference always denotes one card.
    if(group.length>1&&query===normalizeName(target.name))return {ok:true,kind:'group'};
    // The source's lack of a name is metadata, never a correct recalled name.
    const names=target.name==='原文未命名'?[]:[target.name,...(target.aliases||[])];
    if(names.some(n=>normalizeName(n)===query))return {ok:true,kind:'name'};
    const refs=[target.displayRef,...(target.numbers||[]),...(target.numbers||[]).map(n=>`(${n})`)];
    if(refs.some(n=>normalizeName(n)===query)) {
      return {ok:true,kind:'numbered'};
    }
    if(refs.some(ref=>names.some(name=>[
      `${ref} · ${name}`,`${ref} ${name}`,`${name} ${ref}`
    ].some(v=>normalizeName(v)===query))))return {ok:true,kind:'numbered'};
    return {ok:false,kind:'mismatch'};
  }
  function gradeProofName(record, answer) {
    const query=normalizeName(String(answer||'').trim());
    return !!query && !!record.proof && record.proof.answers.some(name=>normalizeName(name)===query);
  }
  function eligibleModes(r,modes,choiceDifficulty=2) {
    if(r.proof)return modes.filter(m=>m==='proof');
    modes=modes.filter(m=>m!=='proof');
    const blanks=blankTemplate(r.formula).blanks.length;
    const symbols=symbolsInFormula(r.formula).length;
    const cloze=clozeTemplate(r.formula,()=>0);
    return modes.filter(m=>(m!=='choice'||choiceDifficulty!==3||!isFoundationalTheorem(r))&&(m!=='blanks'||blanks>0)&&(m!=='symbol'||symbols>0)&&(m!=='cloze'||!!cloze));
  }
  function isQuestionCard(r) { return !!r && !/inference rule/i.test(r.kind || ''); }
  function modeWeight(r,mode) {
    if(mode!=='formula')return 1;
    const tokens=tokenize(r.formula);
    return tokens.length>35||tokens.filter(isVariable).length>8?0.2:1;
  }
  function shuffle(a,rng=Math.random) {
    const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;
  }
  function makeSession(records,modes,count=10,rng=Math.random,choiceDifficulty=2,options={}) {
    if(!records.length)throw new Error('当前范围没有定理，请调整筛选。');
    if(!modes.length)throw new Error('至少选择一种题型。');
    // Desktop rotates all modes; mobile favors choice and short fill questions.
    const pools=new Map([...new Set(modes)].map(mode=>[mode,[]]));
    const supported=records.filter(r=>{
      if(!isQuestionCard(r))return false;
      const allowed=options.modesForRecord?options.modesForRecord(r):modes;
      const eligible=eligibleModes(r,modes.filter(mode=>allowed.includes(mode)),choiceDifficulty);
      eligible.forEach(mode=>pools.get(mode).push(r));
      return eligible.length>0;
    });
    if(!supported.length)throw new Error('当前范围没有适合所选题型的条目。');
    const available=[...pools.keys()].filter(mode=>pools.get(mode).length);
    // Category shares are 50/40/10; missing categories share their turns proportionally.
    const mobileGroups=[
      {key:'choice',weight:5,modes:['choice']},
      {key:'fill',weight:4,modes:['blanks','cloze']},
      {key:'input',weight:1,modes:available.filter(mode=>!['choice','blanks','cloze'].includes(mode))}
    ];
    const groupScores=new Map(mobileGroups.map(group=>[group.key,0]));
    const weights=new Map(available.map(mode=>[mode,pools.get(mode).reduce((sum,r)=>sum+modeWeight(r,mode),0)/pools.get(mode).length]));
    const queue=[],bags=new Map(),appearances=new Map(),modeBags=new Map();let unused=new Set(supported.map(r=>r.id));
    const hasRoom=r=>(appearances.get(canonicalId(r.id))||0)<2;
    function nextMode(active,key='all'){
      let modeBag=(modeBags.get(key)||[]).filter(mode=>active.includes(mode));
      if(!modeBag.length)modeBag=active.slice();
      const previous=queue.at(-1)?.mode;
      const candidates=modeBag.length>1?modeBag.filter(mode=>mode!==previous):modeBag;
      let choice=rng()*candidates.reduce((sum,mode)=>sum+weights.get(mode),0),mode=candidates.at(-1);
      for(const candidate of candidates){choice-=weights.get(candidate);if(choice<0){mode=candidate;break;}}
      modeBag.splice(modeBag.indexOf(mode),1);modeBags.set(key,modeBag);return mode;
    }
    for(let i=0;i<count;i++) {
      const active=available.filter(mode=>pools.get(mode).some(hasRoom));
      if(!active.length)break;
      let mode;
      if(options.mobile){
        const groups=mobileGroups.filter(group=>group.modes.some(mode=>active.includes(mode)));
        const totalWeight=groups.reduce((sum,group)=>sum+group.weight,0);
        let selected=groups[0];
        for(const group of groups){
          groupScores.set(group.key,groupScores.get(group.key)+group.weight/totalWeight);
          if(groupScores.get(group.key)>groupScores.get(selected.key))selected=group;
        }
        groupScores.set(selected.key,groupScores.get(selected.key)-1);
        mode=nextMode(active.filter(mode=>selected.modes.includes(mode)),selected.key);
      }else mode=nextMode(active);
      const pool=pools.get(mode).filter(hasRoom);
      if(!unused.size)unused=new Set(supported.map(r=>r.id));
      let bag=(bags.get(mode)||[]).filter(hasRoom);
      if(!bag.length||!bag.some(r=>unused.has(r.id)))bag=shuffle(pool,rng);
      let index=bag.findLastIndex(r=>unused.has(r.id)&&r.id!==queue.at(-1)?.id);
      if(index<0)index=bag.findLastIndex(r=>r.id!==queue.at(-1)?.id);
      if(index<0)index=bag.length-1;
      const [r]=bag.splice(index,1);bags.set(mode,bag);unused.delete(r.id);
      const id=canonicalId(r.id);appearances.set(id,(appearances.get(id)||0)+1);
      queue.push({id:r.id,mode,retry:0});
    }return queue;
  }
  function limitSessionOccurrences(session) {
    const counts=new Map();let keptCurrent=false;
    const queue=session.queue.filter((q,i)=>{
      const id=canonicalId(q.id),seen=counts.get(id)||0;
      // Completed questions and visible feedback belong to the saved history.
      const keep=i<session.index||(i===session.index&&session.state?.checked)||seen<2;
      if(keep){counts.set(id,seen+1);if(i===session.index)keptCurrent=true;}
      return keep;
    });
    return {...session,queue,state:keptCurrent?session.state:null};
  }
  function retryQuestion(queue,index) {
    const current=queue[index],id=canonicalId(current.id);
    const seen=queue.slice(0,index+1).filter(q=>canonicalId(q.id)===id).length;
    const remaining=queue.filter((q,i)=>i<=index||canonicalId(q.id)!==id);
    if(seen<2)remaining.splice(Math.min(index+4,remaining.length),0,{...current,retry:1});
    return remaining;
  }
  function localDay(date=new Date()) {
    return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  }
  function freshProgress() {return {schemaVersion:1,records:{},xp:0,days:{},history:[],stars:[]};}
  const mergedCardIds={
    'p-b1df9f7082d5':'t-d212aba8ab10',
    'p-2d263565f9b0':'t-e06bc0f878a5',
    'p-ac9634bfb530':'t-5edb0ccb8b07'
  };
  function canonicalId(id) {return mergedCardIds[id]||id;}
  function applyAttempt(progress,id,mode,ok,answer='',assisted=false,now=Date.now()) {
    const old=progress.records[id]||{attempts:0,correct:0,wrong:0,streak:0,wrongModes:[],modeWins:{},log:[]};
    const r={...old,wrongModes:[...(old.wrongModes||[])],modeWins:{...(old.modeWins||{})},log:[...(old.log||[])]};
    r.attempts++;r.lastAt=now;r.lastMode=mode;r.lastAnswer=answer.slice(0,2400);
    if(ok&&!assisted) {
      r.correct++;r.streak++;r.modeWins[mode]=(r.modeWins[mode]||0)+1;
      if(r.modeWins[mode]>=2)r.wrongModes=r.wrongModes.filter(m=>m!==mode);
      r.dueAt=now+[0,4*3600e3,86400e3,3*86400e3,7*86400e3,14*86400e3][Math.min(r.streak,5)];
    } else {
      r.wrong++;r.streak=0;r.modeWins[mode]=0;r.dueAt=now;
      if(!r.wrongModes.includes(mode))r.wrongModes.push(mode);
    }
    r.active=r.wrongModes.length>0;
    r.log.unshift({at:now,mode,ok:ok&&!assisted,assisted,answer:answer.slice(0,800)});r.log=r.log.slice(0,12);
    progress.records[id]=r;
    const day=localDay(new Date(now));progress.days[day]=(progress.days[day]||0)+1;
    const xp=ok&&!assisted?10:0;progress.xp+=xp;return {record:r,xp};
  }
  function validateProgress(obj,validIds) {
    if(!obj||obj.schemaVersion!==1||!obj.records||typeof obj.records!=='object'||Array.isArray(obj.records))throw new Error('不是有效的 Theorem Quest 学习备份。');
    const clean=freshProgress(), good=new Set(validIds), modes=new Set(['name','choice','blanks','cloze','formula','symbol','proof']);
    const num=(v,max=1e8)=>Number.isFinite(v)?Math.max(0,Math.min(max,Math.floor(v))):0;
    clean.xp=num(obj.xp);
    for(const [oldId,v] of Object.entries(obj.records)) {
      const id=canonicalId(oldId);
      if(!good.has(id)||!v||typeof v!=='object')continue;
      const r={attempts:num(v.attempts),correct:num(v.correct),wrong:num(v.wrong),streak:num(v.streak,1000),lastAt:num(v.lastAt,1e14),dueAt:num(v.dueAt,1e14),
        lastAnswer:String(v.lastAnswer||'').slice(0,2400),lastMode:modes.has(v.lastMode)?v.lastMode:'name',wrongModes:(Array.isArray(v.wrongModes)?v.wrongModes:[]).filter(m=>modes.has(m)),modeWins:{},log:[]};
      for(const m of modes)r.modeWins[m]=num(v.modeWins?.[m],1e4);
      r.active=r.wrongModes.length>0;
      if(Array.isArray(v.log))r.log=v.log.slice(0,12).filter(x=>x&&modes.has(x.mode)).map(x=>({at:num(x.at,1e14),mode:x.mode,ok:!!x.ok,assisted:!!x.assisted,answer:String(x.answer||'').slice(0,800)}));
      const previous=clean.records[id];
      if(previous){
        const latest=r.lastAt>=previous.lastAt?r:previous;
        latest.attempts+=r===latest?previous.attempts:r.attempts;
        latest.correct+=r===latest?previous.correct:r.correct;
        latest.wrong+=r===latest?previous.wrong:r.wrong;
        latest.wrongModes=[...new Set([...previous.wrongModes,...r.wrongModes])];
        latest.active=latest.wrongModes.length>0;
        latest.log=[...previous.log,...r.log].sort((a,b)=>b.at-a.at).slice(0,12);
        clean.records[id]=latest;
      }else clean.records[id]=r;
    }
    for(const [d,n] of Object.entries(obj.days||{}))if(/^\d{4}-\d{2}-\d{2}$/.test(d))clean.days[d]=num(n);
    clean.stars=[...new Set((Array.isArray(obj.stars)?obj.stars:[]).map(canonicalId).filter(id=>good.has(id)))];
    clean.history=(Array.isArray(obj.history)?obj.history:[]).slice(0,100).filter(x=>x&&Number.isFinite(x.at)).map(x=>({at:num(x.at,1e14),correct:num(x.correct),total:num(x.total),xp:num(x.xp)}));
    return clean;
  }
  function notebookMatchesScope(notebook, scope={}) {
    if(scope.era&&scope.era!=='all'&&String(notebook.year)!==scope.era)return false;
    if(scope.notebook&&String(notebook.port)!==scope.notebook&&notebook.sourceId!==scope.notebook)return false;
    return !scope.week||(notebook.weeks||[]).some(w=>w===Number(scope.week)||(scope.weekMode==='through'&&w<Number(scope.week)));
  }
  function notebookHintRows(data, scope={}) {
    const notebooks=(data?.notebooks||[]).filter(n=>notebookMatchesScope(n,scope));
    return (data?.groups||[]).map(group=>{
      const matches=notebooks.filter(n=>(n.groupCounts?.[group.id]||0)>0);
      const uses=matches.flatMap(n=>(n.hintUses||[]).filter(u=>u.groups.some(g=>g.id===group.id)).map(u=>({...u,notebook:n})));
      return {...group,hintCount:matches.reduce((sum,n)=>sum+(n.groupCounts[group.id]||0),0),notebookCount:matches.length,uses};
    }).filter(g=>g.hintCount>0).sort((a,b)=>b.hintCount-a.hintCount||a.label.localeCompare(b.label));
  }
  function notebookHintCardCounts(data, scope={}) {
    const counts=new Map();
    for(const notebook of data?.notebooks||[]){
      if(!notebookMatchesScope(notebook,scope))continue;
      for(const [id,count] of Object.entries(notebook.theoremCounts||{}))counts.set(id,(counts.get(id)||0)+count);
    }
    return counts;
  }
  function validateStudyData(study) {
    const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
    const strings=x=>Array.isArray(x)&&x.every(v=>typeof v==='string');
    if(study?.schemaVersion!==1||!object(study.bank)||'theorems' in study.bank||'sources' in study.bank||!object(study.bank.coverage)||!object(study.bank.weekBySource)||!Array.isArray(study.proofQuestions)||!Array.isArray(study.proofSources)||!Array.isArray(study.notebookHints?.notebooks)||!Array.isArray(study.notebookHints?.groups))throw new Error('学习资料格式无效。');
    const sourceIDs=new Set();
    for(const s of study.proofSources){
      if(!s||typeof s.id!=='string'||!s.id||sourceIDs.has(s.id)||typeof s.name!=='string'||typeof s.url!=='string'||!Array.isArray(s.weeks))throw new Error('Proof 来源格式无效。');
      sourceIDs.add(s.id);
    }
    const ids=new Set();
    for(const r of study.proofQuestions){
      if(!r||typeof r.id!=='string'||!r.id||ids.has(r.id)||['name','formula','kind','topic','displayRef'].some(k=>typeof r[k]!=='string')||!strings(r.aliases)||!strings(r.numbers)||!Array.isArray(r.sources)||!r.sources.length||r.sources.some(s=>!sourceIDs.has(s.sourceId)||typeof s.excerpt!=='string')||!object(r.proof)||['start','end','relation','hint','hintTemplate','notebook','proofLabel'].some(k=>typeof r.proof[k]!=='string')||!strings(r.proof.answers)||!r.proof.answers.length)throw new Error('Proof 题目格式无效。');
      ids.add(r.id);
    }
    for(const n of study.notebookHints.notebooks)if(!n||typeof n.sourceId!=='string'||typeof n.name!=='string'||typeof n.url!=='string'||!Array.isArray(n.weeks)||!Array.isArray(n.hintUses)||!object(n.theoremCounts)||!object(n.groupCounts)||n.hintUses.some(u=>!Array.isArray(u.groups)))throw new Error('证明引用格式无效。');
    for(const g of study.notebookHints.groups)if(!g||typeof g.id!=='string'||typeof g.label!=='string'||!strings(g.names)||!strings(g.references)||!strings(g.theoremIds)||!strings(g.candidateTheoremIds))throw new Error('证明引用分组格式无效。');
    return study;
  }
  function bankWithStudy(bundled, theorems, sources, study, legacy=false) {
    const bank={...bundled,...study.bank,theorems:retainDocumentStudy(theorems,bundled.theorems),sources,study};
    bank.weekBySource={...bank.weekBySource,...Object.fromEntries(sources.map(s=>[s.id,s.weeks||bank.weekBySource?.[s.id]||[]]))};
    bank.coverage={...bank.coverage,current2026PracticeCount:theorems.filter(r=>(r.preloaded2026?.length||r.notebook2026?.length)&&isQuestionCard(r)).length,current2026NotebookCount:sources.filter(s=>s.id.startsWith('calc-2026-')).length,preloadedUniqueCount:theorems.filter(r=>r.preloaded2025?.length).length};
    if(legacy)bank.coverage.nativeNote='旧版更新仅包含定理与来源；Proof、证明引用和资料审计使用随附版本。';
    else delete bank.coverage.nativeNote;
    return bank;
  }
  // Keep verified local evidence when an older update has the identical card.
  function retainDocumentStudy(records, bundledRecords) {
    const bundled=new Map(bundledRecords.map(r=>[r.id,r]));
    return records.map(r=>{
      const local=bundled.get(r.id);
      return !r.documentStudy&&local?.documentStudy&&local.formula===r.formula
        ? {...r,documentStudy:local.documentStudy} : r;
    });
  }
  // Document study counts are distinct from notebook preloaded availability.
  function documentFocusMatches(record, focus='all') {
    const study=record.documentStudy;
    const important=!!study?.important;
    const repeated=!!study?.repeated;
    if(focus==='important')return important;
    if(focus==='repeated')return repeated;
    if(focus==='priority')return important||repeated;
    if(focus==='both')return important&&repeated;
    return true;
  }
  return {validateStudyData,bankWithStudy,notebookMatchesScope,notebookHintRows,notebookHintCardCounts,gradeProofName,retainDocumentStudy,documentFocusMatches,SHORTCUTS,FIXED,shortcutSuggestions,shortcutPrefix,symbolsInFormula,normalizeInput,tokenize,isVariable,varsOf,balanced,tokenAlpha,parse,matchAST,compareFormula,blankTemplate,clozeTemplate,fillCloze,gradeCloze,fillTemplate,gradeBlanks,compareRefs,referenceInRange,normalizeName,searchRecords,nameCompletions,hintLocations,label,choiceSimilarity,choiceOptions,isFoundationalTheorem,nameGroup,answerVariants,gradeName,isQuestionCard,eligibleModes,shuffle,makeSession,limitSessionOccurrences,retryQuestion,localDay,canonicalId,freshProgress,applyAttempt,validateProgress};
});
