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
    '\\intersection':'∩','\\cap':'∩','\\subseteq':'⊆','\\subset':'⊂','\\supseteq':'⊇','\\supset':'⊃',
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
  function shortcutSuggestions(prefix,limit=20) {
    if(typeof prefix!=='string'||!prefix.startsWith('\\')||prefix.length<2)return [];
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
    const keys = Object.keys(SHORTCUTS).sort((a,b)=>b.length-a.length);
    for (const key of keys) {
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      s = s.replace(new RegExp(escaped + (/[a-zA-Z]$/.test(key) ? '(?![a-zA-Z])' : ''),'g'), SHORTCUTS[key]);
    }
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
  function parse(text) {
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
        if(t==='⇐') {op='⇒'; args.reverse();}
        if(t==='≥') {op='≤'; args.reverse();}
        if(t==='>') {op='<'; args.reverse();}
        if(t==='⊇') {op='⊆';args.reverse();}
        if(t==='⊃') {op='⊂';args.reverse();}
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
  function compareFormula(expected,answer) {
    let a,b;
    try {a=tokenize(expected);b=tokenize(answer);} catch(e) {return {ok:false,kind:'invalid',message:e.message};}
    if(!b.length) return {ok:false,kind:'empty',message:'先输入你的答案。'};
    if(!balanced(b)) return {ok:false,kind:'syntax',message:'括号没有配对，请先检查括号。'};
    const direct=tokenAlpha(a,b);
    if(direct) return {ok:true,kind:'alpha',mapping:Object.fromEntries(direct),message:mapMessage(direct)};
    try {
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
  function normalizeName(s) {
    return normalizeInput(s).toLocaleLowerCase().replace(/[“”"'`‘’]/g,'').replace(/\s+/g,' ').trim();
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
  function label(r) { return `${r.displayRef} · ${r.name}`; }
  function nameGroup(records,record) {
    if(!record.numbers?.length||!record.name||record.name==='原文未命名')return [record];
    const name=normalizeName(record.name);
    return records.filter(r=>r.numbers?.length&&normalizeName(r.name)===name);
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
    const names=[target.name,...(target.aliases||[])];
    if(names.some(n=>normalizeName(n)===query))return {ok:true,kind:'name'};
    const refs=[target.displayRef,...(target.numbers||[]),...(target.numbers||[]).map(n=>`(${n})`)];
    if(refs.some(n=>normalizeName(n)===query)) {
      const matches=records.filter(r=>[r.displayRef,...(r.numbers||[]),...(r.numbers||[]).map(n=>`(${n})`)].some(v=>normalizeName(v)===query));
      return {ok:matches.length>0&&matches.every(r=>compareFormula(r.formula,target.formula).ok),kind:'numbered'};
    }
    if(refs.some(ref=>names.some(name=>[
      `${ref} · ${name}`,`${ref} ${name}`,`${name} ${ref}`
    ].some(v=>normalizeName(v)===query))))return {ok:true,kind:'numbered'};
    return {ok:false,kind:'mismatch'};
  }
  function eligibleModes(r,modes) {
    const blanks=blankTemplate(r.formula).blanks.length;
    const symbols=symbolsInFormula(r.formula).length;
    return modes.filter(m=>(m!=='blanks'||blanks>0)&&(m!=='symbol'||symbols>0));
  }
  function modeWeight(r,mode) {
    if(mode!=='formula')return 1;
    const tokens=tokenize(r.formula);
    return tokens.length>35||tokens.filter(isVariable).length>8?0.2:1;
  }
  function shuffle(a,rng=Math.random) {
    const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;
  }
  function makeSession(records,modes,count=10,rng=Math.random) {
    if(!records.length)throw new Error('当前范围没有定理，请调整筛选。');
    if(!modes.length)throw new Error('至少选择一种题型。');
    const supported=records.filter(r=>eligibleModes(r,modes).length);
    if(!supported.length)throw new Error('当前范围没有适合所选题型的条目。');
    const queue=[];let bag=[];
    for(let i=0;i<count;i++) {
      if(!bag.length)bag=shuffle(supported,rng);
      const r=bag.pop(), options=eligibleModes(r,modes);
      const total=options.reduce((n,m)=>n+modeWeight(r,m),0);
      let choice=rng()*total,mode=options[options.length-1];
      for(const candidate of options){choice-=modeWeight(r,candidate);if(choice<0){mode=candidate;break;}}
      queue.push({id:r.id,mode,retry:0});
    }return queue;
  }
  function localDay(date=new Date()) {
    return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  }
  function freshProgress() {return {schemaVersion:1,records:{},xp:0,days:{},history:[],stars:[]};}
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
    const clean=freshProgress(), good=new Set(validIds), modes=new Set(['name','choice','blanks','formula','symbol']);
    const num=(v,max=1e8)=>Number.isFinite(v)?Math.max(0,Math.min(max,Math.floor(v))):0;
    clean.xp=num(obj.xp);
    for(const [id,v] of Object.entries(obj.records)) {
      if(!good.has(id)||!v||typeof v!=='object')continue;
      const r={attempts:num(v.attempts),correct:num(v.correct),wrong:num(v.wrong),streak:num(v.streak,1000),lastAt:num(v.lastAt,1e14),dueAt:num(v.dueAt,1e14),
        lastAnswer:String(v.lastAnswer||'').slice(0,2400),lastMode:modes.has(v.lastMode)?v.lastMode:'name',wrongModes:(Array.isArray(v.wrongModes)?v.wrongModes:[]).filter(m=>modes.has(m)),modeWins:{},log:[]};
      for(const m of modes)r.modeWins[m]=num(v.modeWins?.[m],1e4);
      r.active=r.wrongModes.length>0;
      if(Array.isArray(v.log))r.log=v.log.slice(0,12).filter(x=>x&&modes.has(x.mode)).map(x=>({at:num(x.at,1e14),mode:x.mode,ok:!!x.ok,assisted:!!x.assisted,answer:String(x.answer||'').slice(0,800)}));
      clean.records[id]=r;
    }
    for(const [d,n] of Object.entries(obj.days||{}))if(/^\d{4}-\d{2}-\d{2}$/.test(d))clean.days[d]=num(n);
    clean.stars=(Array.isArray(obj.stars)?obj.stars:[]).filter(id=>good.has(id));
    clean.history=(Array.isArray(obj.history)?obj.history:[]).slice(0,100).filter(x=>x&&Number.isFinite(x.at)).map(x=>({at:num(x.at,1e14),correct:num(x.correct),total:num(x.total),xp:num(x.xp)}));
    return clean;
  }
  return {SHORTCUTS,FIXED,shortcutSuggestions,shortcutPrefix,symbolsInFormula,normalizeInput,tokenize,isVariable,varsOf,balanced,tokenAlpha,parse,matchAST,compareFormula,blankTemplate,fillTemplate,compareRefs,referenceInRange,normalizeName,searchRecords,label,nameGroup,gradeName,eligibleModes,shuffle,makeSession,localDay,freshProgress,applyAttempt,validateProgress};
});
