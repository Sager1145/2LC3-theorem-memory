/* Theorem Quest — fully static app. All source strings are escaped before rendering. */
(async () => {
  'use strict';
  const E = window.TQEngine;
  let D = window.THEOREM_DATA;
  const app = document.querySelector('#app'), modalRoot = document.querySelector('#modal-root');
  if (!E || !D?.theorems?.length) { app.textContent = '题库没有载入。请保留 assets 文件夹，或使用随附的单文件版本。'; return; }
  const DEPLOYED_SITE='https://sager1145.github.io/2LC3-theorem-memory/';
  const canUpdateBank=()=>!window.TQ_PORTABLE&&/^https?:$/.test(location.protocol);
  let bankRevision=window.TQNativeData?.revision||'', bankBusy=false, bankMessage='检查当前网站发布的题库；校验通过后安装，保留学习记录。';
  const bundledBank=D;
  const bundledStudy={schemaVersion:1,bank:Object.fromEntries(Object.entries(D).filter(([key])=>!['theorems','sources'].includes(key))),proofQuestions:window.PROOF_QUESTIONS||[],proofSources:window.PROOF_SOURCES||[],notebookHints:window.NOTEBOOK_HINTS||{notebooks:[],groups:[]}};
  D={...D,study:bundledStudy};
  if(window.TQ_NATIVE&&window.TQNativeData){
    const native=window.TQNativeData;
    D=E.bankWithStudy(bundledBank,native.theorems,native.sources,native.study?E.validateStudyData(native.study):bundledStudy,!!native.revision&&!native.study);
  }
  let bundledFingerprint='';
  async function bankHash(bytes){
    if(!window.crypto?.subtle)throw new Error('此浏览器无法校验题库，请使用 HTTPS 网站或新版浏览器。');
    return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(n=>n.toString(16).padStart(2,'0')).join('');
  }
  const textHash=text=>bankHash(new TextEncoder().encode(text));
  function bankStorage(value){return new Promise((resolve,reject)=>{
    if(!window.indexedDB){reject(new Error('此浏览器无法保存题库更新。'));return;}
    const request=indexedDB.open('theorem-quest-bank',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('snapshots');
    request.onerror=()=>reject(new Error('无法打开本地题库存储。'));
    request.onblocked=()=>reject(new Error('题库存储正在被其他窗口占用，请关闭其他窗口后重试。'));
    request.onsuccess=()=>{
      const db=request.result, transaction=db.transaction('snapshots',value===undefined?'readonly':'readwrite');
      const operation=value===undefined?transaction.objectStore('snapshots').get('installed'):transaction.objectStore('snapshots').put(value,'installed');
      transaction.oncomplete=()=>{db.close();resolve(operation.result);};
      transaction.onerror=transaction.onabort=()=>{db.close();reject(new Error('题库更新未保存；请检查浏览器存储空间或权限。'));};
    };
  });}
  function validateBankManifest(m){
    const hash=/^[a-f0-9]{64}$/;
    if(!m||m.schemaVersion!==1||!hash.test(m.revision)||!Number.isSafeInteger(m.theoremCount)||m.theoremCount<1||m.theoremCount>20000)throw new Error('题库版本清单无效或暂不支持。');
    for(const key of ['theorems','sources',...(m.files?.study?['study']:[])])if(m.files?.[key]?.path!==`data/${key}.json`||!hash.test(m.files[key].sha256))throw new Error('题库文件路径或校验值无效。');
  }
  async function checkedBank(snapshot){
    const m=snapshot.manifest;validateBankManifest(m);
    if(typeof snapshot.theoremText!=='string'||typeof snapshot.sourceText!=='string'||snapshot.theoremText.length>20000000||snapshot.sourceText.length>3000000)throw new Error('题库文件大小或格式无效。');
    if(m.files.study&&(typeof snapshot.studyText!=='string'||snapshot.studyText.length>20000000))throw new Error('学习资料大小或格式无效。');
    const hashes=await Promise.all([textHash(snapshot.theoremText),textHash(snapshot.sourceText),...(m.files.study?[textHash(snapshot.studyText)]:[])]);
    if(hashes[0]!==m.files.theorems.sha256||hashes[1]!==m.files.sources.sha256||(m.files.study&&hashes[2]!==m.files.study.sha256)||await textHash(hashes.join(':'))!==m.revision)throw new Error('下载内容未通过完整性校验，未安装。');
    const theorems=JSON.parse(snapshot.theoremText),sources=JSON.parse(snapshot.sourceText);
    if(!Array.isArray(theorems)||theorems.length!==m.theoremCount||!Array.isArray(sources)||!sources.length||sources.length>10000)throw new Error('题库条目数量与版本清单不一致。');
    const sourceIDs=new Set();
    for(const source of sources){
      if(!source||typeof source.id!=='string'||!source.id||sourceIDs.has(source.id)||typeof source.name!=='string'||typeof source.url!=='string'||(source.weeks!==undefined&&(!Array.isArray(source.weeks)||source.weeks.some(w=>!Number.isInteger(w)||w<1))))throw new Error('题库来源格式无效或 ID 重复。');
      sourceIDs.add(source.id);
    }
    const ids=new Set();
    for(const r of theorems){
      if(!r||typeof r.id!=='string'||!r.id||ids.has(r.id)||['name','formula','kind','topic','displayRef'].some(k=>typeof r[k]!=='string')||['aliases','numbers'].some(k=>!Array.isArray(r[k])||r[k].some(v=>typeof v!=='string'))||!Array.isArray(r.sources)||!r.sources.length||r.sources.some(o=>!o||!sourceIDs.has(o.sourceId)||typeof o.excerpt!=='string'))throw new Error('定理格式无效、来源缺失或 ID 重复。');
      for(const key of ['archiveWeeks','preloaded2026Weeks'])if(r[key]!==undefined&&(!Array.isArray(r[key])||r[key].some(w=>!Number.isInteger(w))))throw new Error('定理周次格式无效。');
      ids.add(r.id);
    }
    const study=m.files.study?E.validateStudyData(JSON.parse(snapshot.studyText)):bundledStudy;
    return E.bankWithStudy(bundledBank,theorems,sources,study,!m.files.study);
  }
  // Restore the last verified bank before validating progress against its IDs.
  // A changed bundled bank takes precedence over a snapshot from an older deployment.
  if(canUpdateBank()&&!window.TQ_NATIVE){
    try{
      bundledFingerprint=await textHash(JSON.stringify([bundledBank,bundledStudy]));
      const installed=await bankStorage();
      if(installed?.bundledFingerprint===bundledFingerprint){D=await checkedBank(installed);bankRevision=installed.manifest.revision;}
    }catch(error){bankMessage='使用随附题库。'+error.message;}
  }
  window.THEOREM_DATA=D;
  window.PROOF_QUESTIONS=D.study.proofQuestions;window.PROOF_SOURCES=D.study.proofSources;window.NOTEBOOK_HINTS=D.study.notebookHints;
  let proofRecords=window.PROOF_QUESTIONS;
  const studySources=()=>[...D.sources,...(window.PROOF_SOURCES||[]).filter(s=>!D.sources.some(existing=>existing.id===s.id))];
  let records = [...D.theorems,...proofRecords], quizRecords = D.theorems.filter(E.isQuestionCard), byId = new Map(records.map(r=>[r.id,r])), sourceMap = new Map(studySources().map(s=>[s.id,s]));
  const KEYS = {progress:'tq.progress.v1', settings:'tq.settings.v1', session:'tq.session.v1'};
  const MODE = {
    proof:{title:'Proof 定理填空',icon:'⟨ ⟩',prompt:'这一步用了哪条定理？',desc:'2026 已完成证明：起点 → 定理名称 → 终点，仅填名称'},
    name:{title:'名称回忆',icon:'Aa',prompt:'这条定理叫什么？',desc:'同名定理点选填空，其他条目输入名称'},
    choice:{title:'名称选择',icon:'☷',prompt:'为公式选择正确的定理',desc:'从名称与编号列表中选择'},
    blanks:{title:'字母填空',icon:'_p',prompt:'补上字母，还原这条定理',desc:'符号已给出，允许一致改名'},
    cloze:{title:'符号填空',icon:'_∧',prompt:'补上符号，还原这条定理',desc:'看名称，用系统键盘或符号按键填空'},
    formula:{title:'公式拼写',icon:'∧',prompt:'写出这条定理的内容',desc:'用反斜线代码输入并补全公式'},
    symbol:{title:'反斜线符号',icon:'\\',prompt:'这个符号的反斜线代码是什么？',desc:'输入 \\ 命令，可用字符补全'}
  };
  const FOCUS={all:'全部定理',important:'Important',repeated:'多次出现',priority:'重点与高频',hintUsed:'Hint 中用到',hintRepeated:'Hint 多次出现'};
  let hintData=window.NOTEBOOK_HINTS||{notebooks:[],groups:[]};
  const hintCardCounts=scope=>E.notebookHintCardCounts(hintData,scope);
  const defaults = {language:'zh-CN',appearance:'system',hintList:'used',hintQuery:'',modeDefaultsVersion:3,modes:['name','choice','blanks','cloze','formula','symbol','proof'],count:10,choiceDifficulty:2,goal:20,sound:false,retry:true,fullKeyboard:false,scope:{query:'',topic:'',source:'',range:'',era:'2026',notebook:'',week:'',weekMode:'current',archiveWeek:'',documentFocus:'all',important:false,repeated:false,starred:false,wrong:false,manual:false,selected:[]},presets:[]};
  let storageOK=true, toastTimer, activeInput=null, lastFocus=null, view='home', page=1, wrongTab='active', auditQuery='', auditPage=1, session=null, qState=null;
  const esc = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const attr=esc, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  function load(key,fallback){try{const x=localStorage.getItem(key);return x?JSON.parse(x):fallback;}catch(_){storageOK=false;return fallback;}}
  function write(key,obj){try{localStorage.setItem(key,JSON.stringify(obj));}catch(_){storageOK=false;$('#storage-warning').hidden=false;}}
  let progress;
  try {const stored=load(KEYS.progress,E.freshProgress());progress=E.validateProgress(stored,[...records.map(r=>r.id),...Object.keys(stored.records||{}).map(E.canonicalId),...(Array.isArray(stored.stars)?stored.stars.map(E.canonicalId):[])]);}catch(_){progress=E.freshProgress();}
  let settings=cleanSettings(load(KEYS.settings,defaults));
  const systemAppearance=window.matchMedia('(prefers-color-scheme: dark)');
  function applyAppearance(){
    const dark=settings.appearance==='dark'||settings.appearance==='system'&&systemAppearance.matches;
    document.documentElement.dataset.theme=dark?'dark':'light';
    document.documentElement.lang=settings.language;
    document.querySelector('meta[name=theme-color]')?.setAttribute('content',dark?'#192b3a':'#f7f8f2');
    window.webkit?.messageHandlers?.quest?.postMessage({action:'appearance',value:settings.appearance,language:settings.language});
  }
  function localizeUI(){window.TQI18n?.localize(document.body,settings.language);}
  const localizationObserver=new MutationObserver(()=>{
    localizationObserver.disconnect();prepareScreenInputs();localizeUI();watchLocalization();
  });
  function watchLocalization(){localizationObserver.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder']});}
  applyAppearance();watchLocalization();
  systemAppearance.addEventListener('change',applyAppearance);
  const storedSession=load(KEYS.session,null);
  if(window.TQ_NATIVE&&bankRevision){
    const previous=load('tq.bank.revision',null);
    if(previous&&previous!==bankRevision&&storedSession)storedSession.state=null;
    write('tq.bank.revision',bankRevision);
    if(storedSession)write(KEYS.session,storedSession);
  }
  let resume=cleanSession(storedSession);
  $('#storage-warning').hidden=storageOK;
  function cleanSettings(x){
    const o=JSON.parse(JSON.stringify(defaults));if(!x||typeof x!=='object')return o;
    o.language=['zh-CN','en'].includes(x.language)?x.language:'zh-CN';
    o.appearance=['system','light','dark'].includes(x.appearance)?x.appearance:'system';
    o.modes=Array.isArray(x.modes)?[...new Set(x.modes.filter(m=>MODE[m]))]:o.modes;
    const oldDefaults=[['name','choice','cloze'],['name','choice','blanks','formula','symbol']];
    if(x.modeDefaultsVersion!==3&&oldDefaults.some(modes=>o.modes.length===modes.length&&modes.every(m=>o.modes.includes(m))))o.modes=defaults.modes.slice();
    o.count=Number.isInteger(x.count)?Math.min(50,Math.max(1,x.count)):10;
    o.choiceDifficulty=[1,2,3].includes(x.choiceDifficulty)?x.choiceDifficulty:2;
    o.hintList=x.hintList==='repeated'?'repeated':'used';o.hintQuery=typeof x.hintQuery==='string'?x.hintQuery.slice(0,200):'';
    o.fullKeyboard=x.fullKeyboard===true;
    o.goal=[10,20,30,50].includes(x.goal)?x.goal:20;o.sound=!!x.sound;o.retry=x.retry!==false;
    const s=x.scope;if(s&&typeof s==='object'){
      for(const k of ['query','topic','source','range','era','notebook','week','archiveWeek'])if(typeof s[k]==='string')o.scope[k]=s[k].slice(0,200);
      o.scope.documentFocus=FOCUS[s.documentFocus]?s.documentFocus:'all';
      o.scope.weekMode=s.weekMode==='through'?'through':'current';
      if(!o.scope.week&&typeof s.exerciseSeries==='string')o.scope.week=s.exerciseSeries.slice(0,200);
      for(const k of ['important','repeated','starred','wrong','manual'])o.scope[k]=!!s[k];
      if(o.scope.era==='current')o.scope.era='2026';
      o.scope.selected=Array.isArray(s.selected)?[...new Set(s.selected.map(E.canonicalId).filter(id=>byId.has(id)))]:[];
    }
    if(Array.isArray(x.presets))o.presets=x.presets.slice(0,25).filter(p=>p&&typeof p.name==='string'&&p.scope).map(p=>({name:p.name.slice(0,50),scope:cleanSettings({scope:p.scope}).scope}));
    return o;
  }
  function cleanSession(x){
    if(!x||!Array.isArray(x.queue)||!x.queue.length||x.queue.length>300||!Number.isInteger(x.index)||x.index<0||x.index>x.queue.length)return null;
    if(x.queue.some(v=>!v||!E.isQuestionCard(byId.get(E.canonicalId(v.id)))||!MODE[v.mode]||!E.eligibleModes(byId.get(E.canonicalId(v.id)),[v.mode],x.choiceDifficulty||settings.choiceDifficulty).length))return null;
    return E.limitSessionOccurrences({...x,choiceDifficulty:[1,2,3].includes(x.choiceDifficulty)?x.choiceDifficulty:settings.choiceDifficulty,queue:x.queue.map(v=>({id:E.canonicalId(v.id),mode:v.mode,retry:Math.min(2,Math.max(0,v.retry||0)),symbol:v.mode==='symbol'&&E.symbolsInFormula(byId.get(E.canonicalId(v.id)).formula).includes(v.symbol)?v.symbol:null})),label:String(x.label||'自由练习').slice(0,100),results:Array.isArray(x.results)?x.results.slice(0,300).map(r=>({...r,id:E.canonicalId(r.id)})):[],combo:Number(x.combo)||0,bestCombo:Number(x.bestCombo)||0,xp:Number(x.xp)||0,state:x.state&&typeof x.state==='object'?x.state:null});
  }
  const save=()=>write(KEYS.progress,progress), saveSettings=()=>write(KEYS.settings,settings);
  function saveSession(){if(session){session.state=qState;write(KEYS.session,session);resume=session;}}
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  document.addEventListener('pointerdown',()=>{document.documentElement.dataset.input='pointer';},true);
  document.addEventListener('keydown',()=>{document.documentElement.dataset.input='keyboard';},true);
  function animateUI(el,frames,duration=200){
    if(!el?.animate||document.documentElement.dataset.input==='keyboard')return null;
    if(reducedMotion.matches)frames=frames.map(({transform,...frame})=>frame);
    if(frames.every(frame=>!Object.keys(frame).length))return null;
    return el.animate(frames,{duration:reducedMotion.matches?120:duration,easing:getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim()});
  }
  let quizFocusTimer;
  function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3300);}
  function titleHTML(r){return `<span class="record-ref">${esc(r.displayRef)}</span><span class="record-name">${esc(r.name)}</span>`;}
  const totalWrong=()=>records.filter(r=>progress.records[r.id]?.active).length;
  const mastered=()=>quizRecords.filter(r=>(progress.records[r.id]?.streak||0)>=3).length;
  function dateText(n){return n?new Date(n).toLocaleString(settings.language,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):'尚未练习';}
  function streakDays(){let n=0,d=new Date();if(!progress.days[E.localDay(d)])d.setDate(d.getDate()-1);while(progress.days[E.localDay(d)]&&n<10000){n++;d.setDate(d.getDate()-1);}return n;}
  const notebookNames={16001:'H1 · 入门与 CalcCheck',16002:'Ex1.1 · 简单计算',16003:'Ex1.2 · 整数等式',16004:'Ex1.3 · 替换',16005:'Ex1.4 · 严格匹配',16006:'Ex1.5 · 结合与对称',16007:'Ex1.6 · 高难度练习',16008:'Ex1.7 · 赋值命令',16009:'H2 · 表达式与计算',16010:'H3 · 赋值命令正确性',16011:'Ex2.1 · 命题演算入门',16012:'Ex2.2 · 析取',16013:'Ex2.3 · 合取',16014:'Ex2.4 · 蕴含',16015:'Ex2.5 · 骑士与骗子',16016:'Ex2.6 · 布尔变量赋值',16017:'H4 · 命题演算入门',16018:'H5 · 命题演算',16019:'A1.1 · 命题演算证明',16020:'A1.2 · 布尔赋值命令',16021:'H6 · 自然数与归纳',16022:'Ex3.1 · 加法与乘法',16023:'Ex3.2 · 截断减法',16024:'Ex3.3 · 相等与前驱',16025:'Ex3.4 · 分类证明',16026:'H7.1 · 单调性',16027:'H7.2 · 自然数的序',16028:'H8.1 · Leibniz 与替换',16029:'H8.2 · 结构化证明'};
  let archiveWeekNames=D.weekModuleLabels||{};
  const topicLabel=t=>archiveWeekNames[t]||t;
  let weekBySource=new Map(Object.entries(D.weekBySource||{}));
  function matchesStudySource(r,f){
    const selected=Number(f.week);
    return r.sources.some(origin=>{
      const source=sourceMap.get(origin.sourceId);
      if(!source || (f.era!=='all' && String(source.year || (source.id.startsWith('calc-2026-') ? 2026 : 2025))!==f.era))return false;
      if(f.notebook && source.url?.match(/:(\d+)\//)?.[1]!==f.notebook)return false;
      if(f.source && origin.sourceId!==f.source)return false;
      if(!f.week)return true;
      return (weekBySource.get(source.id)||source.weeks||[]).some(week=>week===selected || (f.weekMode==='through' && week<selected));
    });
  }
  function studyPicker(){
    const era=settings.scope.era;
    const hintFocus=['hintUsed','hintRepeated'].includes(settings.scope.documentFocus);
    const sources=(hintFocus?hintData.notebooks.map(n=>({id:n.sourceId,name:n.name,year:n.year,url:n.url,weeks:n.weeks})):settings.modes.includes('proof')?studySources():D.sources).filter(s=>era==='all'||String(s.year || (s.id.startsWith('calc-2026-') ? 2026 : 2025))===era);
    const weeks=[...new Set(records.flatMap(r=>era==='2026'?(r.preloaded2026Weeks||[]):era==='2025'?(r.archiveWeeks||[]):[...(r.archiveWeeks||[]),...(r.preloaded2026Weeks||[])]))].sort((a,b)=>a-b);
    const studyWeeks=[...new Set(sources.flatMap(s=>hintFocus?s.weeks||[]:weekBySource.get(s.id)||[]))].sort((a,b)=>a-b);
    return `<div class="study-picker"><label><span class="field-label">学期资料</span><select data-filter="era"><option value="2026" ${era==='2026'?'selected':''}>2026 定理与已完成证明</option><option value="all" ${era==='all'?'selected':''}>全部年份</option><option value="2025" ${era==='2025'?'selected':''}>2025i 已核对预载列表</option></select></label><label><span class="field-label">当前学习的 notebook</span><select data-filter="notebook"><option value="">全部已核对 notebook</option>${sources.filter((s,i,all)=>all.findIndex(other=>other.url===s.url)===i).map(s=>{const port=s.url.match(/:(\d+)\//)?.[1];return `<option value="${port}" ${settings.scope.notebook===port?'selected':''}>${esc(notebookNames[port]||shortSource(s.name))}</option>`;}).join('')}</select></label><label><span class="field-label">Week（Exercise 与 Homework）</span><select data-filter="week"><option value="">全部 Week</option>${studyWeeks.map(n=>`<option value="${n}" ${settings.scope.week===String(n)?'selected':''}>Week ${n}</option>`).join('')}</select></label><label><span class="field-label">资料 Week（原模块标签）</span><select data-filter="archiveWeek"><option value="">全部模块</option>${weeks.map(w=>`<option value="${w}" ${settings.scope.archiveWeek===String(w)?'selected':''}>模块 Week ${w}</option>`).join('')}</select></label>${settings.scope.week?`<label><span class="field-label">周次范围</span><select data-filter="weekMode"><option value="current" ${settings.scope.weekMode==="current"?"selected":""}>仅当周内容</option><option value="through" ${settings.scope.weekMode==="through"?"selected":""}>包含此前全部 Week</option></select></label>`:""}${documentFocusPicker()}<p class="study-picker-note">每周包含对应 Notebook 的预载定理与正文已证明定理；同一定理可出现在多个 Week。</p></div>`;
  }
  function documentFocusPicker(){return `<label><span class="field-label">专项复习</span><select data-filter="documentFocus" aria-label="专项复习">${Object.entries(FOCUS).map(([key,label])=>`<option value="${key}" ${settings.scope.documentFocus===key?'selected':''}>${label}</option>`).join('')}</select></label>`;}
  function badges(r,extra=true){
    const uses=hintCardCounts(settings.scope).get(r.id)||0;
    const p=progress.records[r.id];return `<div class="badge-row">${uses?`<span class="badge good" data-hint-used="${r.id}">Hint 使用 ${uses} 次</span>`:''}${E.documentFocusMatches(r,'important')?'<span class="badge important" title="课程文档明确标注 Important">★ IMPORTANT</span>':''}${r.emphasisEvidence?.length?'<span class="badge important" title="原资料感叹号强调，与 Important 标签分开">原文 !!</span>':''}${E.documentFocusMatches(r,'repeated')?`<span class="badge repeat" title="课程文档中匹配的定理声明或引用；同族导出副本不累加">↻ 文档出现 ${r.documentStudy?.occurrences??r.occurrences} 次</span>`:''}${p?.active?'<span class="badge wrong">待复练</span>':p?.streak>=3?'<span class="badge good">已熟悉</span>':''}${extra?`<span class="badge">${esc(topicLabel(r.topic))}</span>${r.notebook2026?.length?'<span class="badge good">2026 已证明</span>':r.preloaded2026?.length?'<span class="badge good">2026 预载</span>':'<span class="badge">2025 归档</span>'}`:''}${r.domain?`<span class="badge">${esc(r.domain)}</span>`:''}</div>`;
  }
  function visibleRecords(ignoreFocus=false){
    const f=settings.scope,hints=hintCardCounts(f),hintFocus=!ignoreFocus&&['hintUsed','hintRepeated'].includes(f.documentFocus);let rs=(settings.modes.length===1&&settings.modes[0]==='proof'?proofRecords:settings.modes.includes('proof')?[...quizRecords,...proofRecords]:quizRecords).filter(r=>(hintFocus?(hints.get(r.id)||0)>=(f.documentFocus==='hintRepeated'?2:1):matchesStudySource(r,f))&&(!f.archiveWeek||(f.era==='2026'?r.preloaded2026Weeks?.includes(Number(f.archiveWeek)):f.era==='2025'?r.archiveWeeks?.includes(Number(f.archiveWeek)):r.preloaded2026Weeks?.includes(Number(f.archiveWeek))||r.archiveWeeks?.includes(Number(f.archiveWeek))))&&(!f.topic||r.topic===f.topic)&&
      (ignoreFocus||hintFocus||E.documentFocusMatches(r,f.documentFocus))&&(ignoreFocus||!f.important||E.documentFocusMatches(r,'important'))&&(ignoreFocus||!f.repeated||E.documentFocusMatches(r,'repeated'))&&(!f.starred||progress.stars.includes(r.id))&&(!f.wrong||progress.records[r.id]?.active)&&E.referenceInRange(r.numbers,f.range));
    if(f.query)rs=E.searchRecords(rs,f.query);return rs;
  }
  function scopeRecords(){const rs=visibleRecords();return settings.scope.manual?rs.filter(r=>settings.scope.selected.includes(r.id)):rs;}
  function navigate(next){view=next;page=1;render();animateUI($('#main'),[{opacity:0},{opacity:1}],160);window.scrollTo({top:0});requestAnimationFrame(()=>$('#main')?.focus({preventScroll:true}));}
  function navIcon(id){
    const paths={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',library:'<path d="M12 5v16M3 4h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v15h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z"/>',hints:'<path d="M4 4h16v16H4ZM8 8h8M8 12h8M8 16h4"/>',focus:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z"/>',mistakes:'<path d="M4 9a8 8 0 1 1 0 7M4 4v5h5M12 8v5l3 2"/>',audit:'<path d="M14 3H5v18h14V8ZM14 3v5h5M8 12h8M8 16h5"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="15" cy="17" r="3"/>'};
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">${paths[id]}</svg>`;
  }
  function render(){
    releaseScreenSuggestions();
    document.body.dataset.view=view;
    document.documentElement.classList.remove('answer-feedback-open');
    if(view==='quiz'){renderQuiz();return;}if(view==='result'){renderResult();return;}
    const nav=[['home','闯关'],['library','定理库'],['focus','专项复习'],['hints','证明引用'],['mistakes','错题本'],['settings','设置']];
    const navView=view==='audit'?'settings':view;
    app.innerHTML=`<div class="app-shell"><aside class="sidebar"><button class="brand" data-action="nav" data-view="home" aria-label="Theorem Quest 首页"><span class="mark" aria-hidden="true">∴</span><span><strong>Theorem<br>Quest</strong><br><small>定理闯关</small></span></button><nav class="nav" aria-label="主要导航">${nav.map(([id,name])=>`<button class="nav-btn ${navView===id?'active':''}" data-action="nav" data-view="${id}" ${navView===id?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${navIcon(id)}</span><span>${name}</span>${id==='mistakes'&&totalWrong()?`<span class="nav-count">${totalWrong()}</span>`:''}</button>`).join('')}</nav><div class="sidebar-foot">COMPSCI 2LC3<br>一条定理，一次进步。<br><br>本地保存 · 无需登录<br>独立学习工具，非课程官方产品。</div></aside><main id="main" class="main-area" tabindex="-1"><header class="topbar"><div class="course-chip">COMPSCI 2LC3 <span aria-hidden="true">/</span> LOGICAL REASONING</div><div class="stats-line"><button class="btn small" data-action="bank-entrance">题库更新</button><span class="stat-gold" title="连续练习天数">ϟ ${streakDays()} 天</span><span class="stat-green" title="学习经验值">✦ ${progress.xp} XP</span></div></header>${({home:renderHome,library:renderLibrary,focus:renderFocus,hints:renderNotebookHints,mistakes:renderMistakes,audit:renderAudit,settings:renderSettings})[view]()}</main></div>`;
    prepareScreenInputs();queueMicrotask(refreshAccessory);
  }
  function renderHome(){
    const rs=scopeRecords(),today=progress.days[E.localDay()]||0;
    const units=[['等式与基本规则','整数与代数'],['等价、否定与异或','析取 ∨','合取 ∧','蕴含 ⇒'],['替换与 Leibniz','序与单调性','自然数与归纳','命令正确性','Knights & Knaves'],['量词与谓词逻辑','集合与关系','关系、序列与后期内容']];
    const unitNames=['先把基础搭牢','命题逻辑探险','从定理走向证明','扩展资料 · 自由探索'];
    const topics=[...new Set(rs.map(r=>r.topic))];let used=new Set();
    const corePath=units.map((arr,i)=>{
      const list=arr.filter(t=>topics.includes(t));list.forEach(t=>used.add(t));if(!list.length)return '';
      return `<section class="unit unit-tone-${i}"><div class="unit-title"><span class="unit-no">${String(i+1).padStart(2,'0')}</span><div><h3>${unitNames[i]}</h3><div class="unit-caption">自由选择 · 不锁关 · 每关 ${settings.count} 题</div></div></div><div class="path">${list.map((t,j)=>pathNode(t,i,j,rs)).join('')}</div></section>`;
    }).join('');
    const moduleWeeks=[...new Set(topics.map(t=>/^Week(\d+)[./]/.exec(t)?.[1]).filter(Boolean))].sort((a,b)=>Number(a)-Number(b));
    const weekPath=moduleWeeks.map(w=>{const list=topics.filter(t=>new RegExp(`^Week${w}[./]`).test(t)&&!used.has(t));list.forEach(t=>used.add(t));return list.length?`<section class="unit unit-tone-3"><div class="unit-title"><span class="unit-no">W${w}</span><div><h3>Week ${w} · 资料模块</h3><div class="unit-caption">原模块 Week 标签，不代表 2026 发布周次</div></div></div><div class="path">${list.map((t,j)=>pathNode(t,3,j,rs)).join('')}</div></section>`:'';}).join('');
    const path=corePath+weekPath+topics.filter(t=>!used.has(t)).map((t,j)=>pathNode(t,3,j,rs)).join('');
    const week=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));return `<span class="day ${progress.days[E.localDay(d)]?'done':''} ${i===6?'today':''}" title="${E.localDay(d)} · ${progress.days[E.localDay(d)]||0} 题">${(settings.language==='en'?['S','M','T','W','T','F','S']:['日','一','二','三','四','五','六'])[d.getDay()]}</span>`;}).join('');
    return `<div class="home-grid"><div><div class="heading-row"><div><div class="eyebrow">小步练习，记住大结构</div><h1>今天也来一小关。</h1><p class="subhead">不只认得名字，也能把公式写出来。</p></div><button class="btn small" data-action="configure">配置练习</button></div><section class="card hero"><span class="mark" aria-hidden="true">∴</span><div class="eyebrow">YOUR DAILY QUEST</div><h2>${rs.length?'把熟悉的定理，变成直觉。':'先选一组想记住的定理。'}</h2><p>${rs.length?`当前范围 ${rs.length} 条，${settings.modes.length} 种题型随机出题。答错没有惩罚，稍后再试一次。`:'当前筛选没有条目。调整章节、编号范围，或取消手选限制即可开始。'}</p><button class="btn primary" data-action="start" ${!rs.length||!settings.modes.length?'disabled':''}>开始 ${settings.count} 题挑战 <span aria-hidden="true">→</span></button>${resume?'<button class="btn small" data-action="resume" style="margin-left:8px">继续上次关卡</button>':''}</section>${studyPicker()}<div class="scope-summary"><span>${settings.scope.era==='2026'?'2026 预载与已证明定理':'归档与全部资料'} · ${settings.scope.manual?'手选范围':'筛选范围'}</span><button data-action="nav" data-view="library">调整记忆范围</button></div>${path||emptyHTML('范围里暂时没有定理','到定理库重设范围；你也可以一条一条勾选。','library','选择定理')}<div class="coverage-note">资料状态：2026 已核对 ${D.coverage.current2026PracticeCount} 条卡片 / ${D.coverage.current2026NotebookCount} 份 notebook；2025i 已核对 ${D.coverage.preloadedUniqueCount} 条不同声明。实际发布 Week 与 PPT 仍待课程资料核对。 <a data-action="nav" data-view="audit">查看覆盖与来源</a></div></div><aside class="home-side"><section class="card side-card"><div class="heading-row" style="margin-bottom:8px"><h3>每日练习目标</h3><span class="stat-gold">ϟ</span></div><p>坚持一点，比一次记很多更容易。</p><div class="week-strip">${week}</div><div class="meter"><span style="width:${Math.min(100,today/settings.goal*100)}%"></span></div><div class="metric-row"><span>${today} / ${settings.goal} 题</span><strong>${today>=settings.goal?'今日完成 ✓':'继续积累'}</strong></div></section><section class="card side-card"><h3>再给错题一次机会</h3><p>${totalWrong()?`${totalWrong()} 条定理等待复练。每种错题型连续答对 2 次后，就会移出待复练列表。`:'这里没有待复练的错题。遇到不熟悉的内容，我们会帮你留下来。'}</p><button class="btn wide ${totalWrong()?'primary':''}" data-action="review-all" style="margin-top:16px" ${!totalWrong()?'disabled':''}>错题复练 ${totalWrong()?'↺':''}</button></section><section class="card side-card"><h3>你的定理收藏</h3><div class="metric-row"><span>练习过</span><strong>${quizRecords.filter(r=>progress.records[r.id]).length} / ${quizRecords.length}</strong></div><div class="metric-row"><span>连续答对 ≥ 3 次</span><strong>${mastered()}</strong></div><div class="metric-row"><span>个人收藏</span><strong>${progress.stars.length}</strong></div><p style="margin-top:14px">★ IMPORTANT 来自原资料；↻ 表示重复预载；☆ 是你自己的收藏，三者分开记录。</p></section></aside></div>`;
  }
  function pathNode(topic,unit,index,rs){const rows=rs.filter(r=>r.topic===topic),done=rows.filter(r=>progress.records[r.id]?.streak>=3).length;return `<div class="path-node"><button class="path-circle ${done===rows.length?'mastered':unit===3?'secondary':''}" data-action="start-topic" data-topic="${attr(topic)}" aria-label="练习 ${attr(topicLabel(topic))}">${done===rows.length?'✓':['=','∧','⇒','∀'][unit]}</button><div class="path-text"><strong>${esc(topicLabel(topic))}</strong><small>${rows.length} 条定理 · ${done} 条已熟悉</small><div class="meter-slim"><span style="width:${rows.length?done/rows.length*100:0}%"></span></div></div></div>`;}
  function emptyHTML(title,text,target,button='返回闯关'){return `<div class="empty"><div class="empty-icon" aria-hidden="true">∴</div><h2>${esc(title)}</h2><p>${esc(text)}</p>${target?`<button class="btn primary" data-action="nav" data-view="${target}">${esc(button)}</button>`:''}</div>`;}
  function modeFields(){return `<div class="mode-grid">${Object.entries(MODE).map(([id,m])=>`<label class="mode-card"><input type="checkbox" data-setting-mode="${id}" ${settings.modes.includes(id)?'checked':''}><span><strong>${m.icon} ${m.title}</strong><small>${m.desc}</small></span></label>`).join('')}</div><div class="setting-row"><label for="question-count"><strong>每关题数</strong><p>所选题型交错出现；手机端优先选择题和按键填空，减少完整输入题，错题可在本轮加练。</p></label><select id="question-count" data-setting="count">${[1,5,10,15,20,30,50].map(n=>`<option ${settings.count===n?'selected':''} value="${n}">${n} 题</option>`).join('')}</select></div><div class="setting-row"><label for="choice-difficulty"><strong>练习难度</strong><p>选择题越难，干扰项越相似；困难档排除结合律、对称性、自反性。符号填空：简单 1 空、标准隐藏约一半、困难隐藏其余符号；左右连接的 = 或 ≡ 保留。</p></label><select id="choice-difficulty" data-setting="choiceDifficulty">${[[1,'简单'],[2,'标准'],[3,'困难']].map(([n,label])=>`<option value="${n}" ${settings.choiceDifficulty===n?'selected':''}>${label}</option>`).join('')}</select></div><label class="setting-row"><span><strong>完整键盘输入</strong><p>默认关闭：填空题只使用大按键；开启后可用 QWERTY 和反斜线代码填空。其他输入题始终使用 QWERTY。</p></span><input type="checkbox" data-setting="fullKeyboard" ${settings.fullKeyboard?'checked':''}></label><label class="setting-row"><span><strong>本轮错题再出现</strong><p>每题本轮最多出现 2 次；仍需复练的题目留在错题本，下轮再练。</p></span><input type="checkbox" data-setting="retry" ${settings.retry?'checked':''}></label>`;}
  function renderLibrary(){
    const rs=visibleRecords(),f=settings.scope,start=(page-1)*24,pages=Math.max(1,Math.ceil(rs.length/24));if(page>pages)page=pages;
    const topics=[...new Set(records.map(r=>r.topic))],ss=D.sources.filter(s=>records.some(r=>r.sources.some(p=>p.sourceId===s.id)));
    return `${studyPicker()}<div class="heading-row"><div><div class="eyebrow">建立自己的记忆范围</div><h1>定理库</h1><p class="subhead">编号、别名和所有不同公式变体都在这里。</p></div><button class="btn primary" data-action="start" ${!scopeRecords().length||!settings.modes.length?'disabled':''}>练习此范围</button></div><div class="filters"><label><span class="field-label">搜索名称、编号或公式</span><input id="library-query" class="input" data-filter="query" value="${attr(f.query)}" placeholder="例如 Golden、3.47、p ⇒ q" autocomplete="off"></label><label><span class="field-label">章节</span><select data-filter="topic"><option value="">全部章节</option>${topics.map(t=>`<option value="${attr(t)}" ${f.topic===t?'selected':''}>${esc(topicLabel(t))}</option>`).join('')}</select></label></div><div class="range-field"><label><span class="field-label">编号区间（逗号分隔多个范围）</span><input id="number-range" class="input" data-filter="range" value="${attr(f.range)}" placeholder="3.1-3.82.5, 15.1a-15.29" autocomplete="off"><small class="muted">3.47 包含 a–f 子项；区间筛选不包含原文未编号条目。局部题号请结合来源筛选。</small></label><button class="btn small" data-action="reset-filters">重设筛选</button></div><div class="filter-secondary">${[['important','★ Important'],['repeated','↻ 多次出现'],['starred','☆ 我的收藏'],['wrong','待复练'],['manual','仅练手选']].map(([k,n])=>`<label><input type="checkbox" data-filter="${k}" ${f[k]?'checked':''}>${n}</label>`).join('')}<select data-filter="source" aria-label="按来源文件筛选"><option value="">全部来源文件</option>${ss.map(s=>`<option value="${s.id}" ${f.source===s.id?'selected':''}>${esc(shortSource(s.name))}</option>`).join('')}</select></div><div class="toolbar"><span class="selected-counter">筛选 ${rs.length} 条 · 将练习 ${scopeRecords().length} 条 · 手选 ${f.selected.length} 条</span><div class="btn-row"><button class="btn small" data-action="select-filtered">全选筛选结果</button><button class="btn small" data-action="clear-selection">清空手选</button><button class="btn small" data-action="save-preset">保存范围</button><button class="btn small" data-action="configure">题型</button></div></div>${settings.presets.length?`<div class="filter-secondary"><label>已存范围 <select data-preset><option value="">选择一个范围…</option>${settings.presets.map((p,i)=>`<option value="${i}" data-i18n-ignore>${esc(p.name)}</option>`).join('')}</select></label></div>`:''}<div class="theorem-list">${rs.slice((page-1)*24,page*24).map(r=>recordRow(r)).join('')||emptyHTML('没有找到匹配的定理','试试放宽编号范围，或取消 Important、来源、手选限制。')}</div>${paginate(page,pages,'library-page')}`;
  }
  function renderFocus(){
    const base=visibleRecords(true), rs=visibleRecords();
    const pages=Math.max(1,Math.ceil(rs.length/24));page=Math.min(page,pages);
    return `<div class="heading-row"><div><div class="eyebrow">按课程文档集中复习</div><h1>专项复习</h1><p class="subhead">明确标注的重点，以及文档中反复出现的定理。</p></div><button class="btn small" data-action="configure">题型与难度</button></div>${studyPicker()}<div class="focus-grid">${['important','repeated','priority'].map(key=>{const count=base.filter(r=>E.documentFocusMatches(r,key)).length;return `<section class="card focus-card"><h2>${FOCUS[key]}</h2><strong class="focus-count">${count} 条</strong><p class="small muted">${key==='important'?'文档明确的 Important 标记':key==='repeated'?'文档中至少两次声明或引用':'Important 或多次出现的合集'}</p><button class="btn small ${settings.scope.documentFocus===key?'blue':''}" data-action="focus-list" data-focus="${key}" aria-pressed="${settings.scope.documentFocus===key}">查看列表</button><button class="btn small primary" data-action="focus-practice" data-focus="${key}" ${!count||!settings.modes.length?'disabled':''}>专项复习</button></section>`;}).join('')}</div><p class="callout small">重复次数按课程文档中的定理声明或明确引用统计；同一资料的导出副本不累加。预载列表中的可用次数单独保留在原来源记录。点开定理可查看文档依据。</p><div class="toolbar"><span class="selected-counter">${esc(FOCUS[settings.scope.documentFocus])} · 当前筛选 ${rs.length} 条 · 可练 ${scopeRecords().length} 条</span><button class="btn primary" data-action="start" ${!scopeRecords().length||!settings.modes.length?'disabled':''}>复习当前列表</button></div><div class="theorem-list">${rs.slice((page-1)*24,page*24).map(recordRow).join('')||emptyHTML('当前范围没有匹配定理','调整年份、Notebook、Week 或专项类型。')}</div>${paginate(page,pages,'library-page')}`;
  }
  function hintScopePicker(){
    const f=settings.scope,ns=hintData.notebooks.filter(n=>f.era==='all'||String(n.year)===f.era);
    const weeks=[...new Set(ns.flatMap(n=>n.weeks||[]))].sort((a,b)=>a-b);
    return `<div class="study-picker"><label><span class="field-label">年份</span><select data-filter="era">${[['2026','2026'],['2025','2025'],['all','全部年份']].map(([v,l])=>`<option value="${v}" ${f.era===v?'selected':''}>${l}</option>`).join('')}</select></label><label><span class="field-label">Notebook 正文</span><select data-filter="notebook" aria-label="Notebook 正文"><option value="">全部 Notebook</option>${ns.map(n=>`<option value="${n.port||n.sourceId}" ${f.notebook===String(n.port||n.sourceId)?'selected':''}>${esc(n.name)}${n.status==='not-captured'?' · 正文未读取':''}</option>`).join('')}</select></label><label><span class="field-label">Week</span><select data-filter="week"><option value="">全部 Week</option>${weeks.map(w=>`<option value="${w}" ${f.week===String(w)?'selected':''}>Week ${w}</option>`).join('')}</select></label>${f.week?`<label><span class="field-label">周次范围</span><select data-filter="weekMode"><option value="current" ${f.weekMode==='current'?'selected':''}>仅当周</option><option value="through" ${f.weekMode==='through'?'selected':''}>含此前全部</option></select></label>`:''}</div>`;
  }
  function hintPracticeCards(mode=settings.hintList){
    const counts=hintCardCounts(settings.scope);
    const q=E.normalizeName(settings.hintQuery),ids=new Set(E.notebookHintRows(hintData,settings.scope).filter(g=>g.hintCount>=(mode==='repeated'?2:1)&&(!q||E.normalizeName([g.label,...g.names,...g.references].join(' ')).includes(q))).flatMap(g=>g.theoremIds));
    return quizRecords.filter(r=>ids.has(r.id)&&(counts.get(r.id)||0)>=(mode==='repeated'?2:1));
  }
  function renderNotebookHints(){
    const ns=hintData.notebooks.filter(n=>E.notebookMatchesScope(n,settings.scope));
    let rows=E.notebookHintRows(hintData,settings.scope).filter(g=>g.hintCount>=(settings.hintList==='repeated'?2:1));
    if(settings.hintQuery){const q=E.normalizeName(settings.hintQuery);rows=rows.filter(g=>E.normalizeName([g.label,...g.names,...g.references].join(' ')).includes(q));}
    const pages=Math.max(1,Math.ceil(rows.length/20));page=Math.min(page,pages);
    const captured=ns.filter(n=>n.status!=='not-captured');
    return `<div class="heading-row"><div><div class="eyebrow">NOTEBOOK PROOF HINTS</div><h1>证明 Hint 定理</h1><p class="subhead">逐个 Notebook 标注证明中真正引用的定理。</p></div></div>${hintScopePicker()}<div class="btn-row section-gap"><button class="btn small ${settings.hintList==='used'?'blue':''}" data-action="hint-list" data-mode="used">全部 Hint 定理</button><button class="btn small ${settings.hintList==='repeated'?'blue':''}" data-action="hint-list" data-mode="repeated">重复 Hint 定理</button><button class="btn small primary" data-action="hint-practice" ${!hintPracticeCards().length||!settings.modes.length?'disabled':''}>复习 Hint 定理</button></div><p class="callout small">只统计 Notebook 正文证明步骤的 hint，不计预载列表、声明或普通文字提及。一次 hint 内同一引用只计一次；同名不同公式保留为待区分定理族。重复列表表示当前范围内至少两处 hint 使用。</p><p class="small muted" data-hint-coverage>当前范围 ${ns.length} 份 Notebook，已读取 ${captured.length} 份；正文未读取的 Notebook 不视为零引用。</p><label><span class="field-label">搜索 Hint 定理名称或编号</span><input class="input" id="hint-query" data-hint-query value="${attr(settings.hintQuery)}" placeholder="例如 Modus ponens、3.35"></label><div class="toolbar"><strong>${settings.hintList==='repeated'?'Hint 多次出现的定理':'Hint 中用到的定理'} · ${rows.length} 条</strong></div><div class="theorem-list">${rows.slice((page-1)*20,page*20).map(hintGroupRow).join('')||emptyHTML(captured.length?'当前范围没有匹配的 Hint 定理':'当前范围的 Notebook 正文尚未读取','可以调整 Notebook、Week、搜索词或切换全部 Hint 定理。')}</div>${paginate(page,pages,'library-page')}<details><summary>Notebook 正文读取情况</summary>${ns.map(n=>`<p>${esc(n.name)} · ${n.status==='not-captured'?'正文未读取':n.status==='captured-no-rendered-hints'?'已保存正文未包含可读取的证明 Hint':`${n.hintUses.length} 处 hint`}</p>`).join('')}</details>`;
  }
  function hintGroupRow(g){
    const exact=g.theoremIds.map(id=>byId.get(id)).filter(Boolean),candidates=g.candidateTheoremIds.map(id=>byId.get(id)).filter(Boolean);
    return `<article class="card hint-group" data-hint-group="${g.id}"><h2>${esc(g.label)}</h2><div class="badge-row"><span class="badge good">Hint 使用 ${g.hintCount} 次</span><span class="badge">${g.notebookCount} 份 Notebook</span>${g.status==='ambiguous'?'<span class="badge">同名／同编号公式待区分</span>':g.status==='unresolved'?'<span class="badge">尚未对应题库声明</span>':''}</div>${g.references.length?`<p class="small">${g.references.map(n=>'('+esc(n)+')').join('、')}</p>`:''}<div class="btn-row">${exact.map(r=>`<button class="btn small" data-action="detail" data-id="${r.id}">${esc(E.label(r))}</button>`).join('')}</div>${candidates.length?`<details><summary>查看候选公式 · ${candidates.length} 条（未确定具体变体）</summary>${candidates.map(r=>`<p><button class="record-title" data-action="detail" data-id="${r.id}">${titleHTML(r)}</button></p>`).join('')}</details>`:''}<details><summary>查看实际 Hint · ${g.uses.length} 处</summary><div class="source-list">${g.uses.map(hintUseHTML).join('')}</div></details></article>`;
  }
  function hintUseHTML(u){
    const n=u.notebook,l=u.locator;
    return `<div class="source-item"><strong>${esc(n.name)}</strong> · Cell ${l.cell} / Calculation ${l.calculation} / Step ${l.step}<p class="small">${u.checked?'已核对 Hint':'原文 Hint（未核对）'} · ${u.calculationChecked?'计算已完成':'计算未完成'}</p><div class="source-formula">${u.kind==='by'?'By '+esc(u.hint):'⟨'+esc(u.hint)+'⟩'}</div>${/^https?:\/\//.test(n.url||'')?`<a href="${attr(n.url)}" target="_blank" rel="noopener noreferrer">打开原始 Notebook ↗</a>`:''}</div>`;
  }
  function notebookHintEvidenceHTML(r){
    const groups=E.notebookHintRows(hintData,{era:'all'}).filter(g=>g.theoremIds.includes(r.id));
    const uses=new Map(groups.flatMap(g=>g.uses.map(u=>[u.id,u])));
    return uses.size?`<details open><summary>Notebook 证明 Hint 使用 · ${uses.size} 次</summary><div class="source-list">${[...uses.values()].map(hintUseHTML).join('')}</div></details>`:'';
  }
  function documentEvidenceHTML(r){
    const d=r.documentStudy;if(!d)return '';
    const evidence=[...(d.importantEvidence||[]),...(d.evidence||[])];
    return `<details open><summary>文档复习依据 · ${d.occurrences} 次出现 / ${d.documentCount} 个资料组</summary><p class="small muted">其中 ${d.proofMentions} 次为证明引用。计数按资料族去重。</p><div class="source-list">${evidence.map(x=>`<div class="source-item"><strong>${esc(x.sourceName||x.sourceId)}</strong> · ${esc(x.locator?.page?'第 '+x.locator.page+' 页':x.locator?.line?'第 '+x.locator.line+' 行':'原文')}<p>${esc(x.label)}</p>${x.excerpt?`<div class="source-formula">${esc(x.excerpt)}</div>`:''}</div>`).join('')||'<p class="small muted">当前课程文档未找到可确认的标记或引用。</p>'}</div></details>`;
  }
  function recordRow(r){const selected=settings.scope.selected.includes(r.id),starred=progress.stars.includes(r.id);return `<article class="theorem-row ${selected?'selected':''}"><input type="checkbox" data-select="${r.id}" aria-label="将 ${attr(E.label(r))} 纳入手选范围" ${selected?'checked':''}><div><button class="record-title" data-action="detail" data-id="${r.id}">${titleHTML(r)}</button>${r.variantLabel?` <span class="badge">${esc(r.variantLabel)}</span>`:''}<div class="math">${esc(r.formula)}</div>${badges(r)}</div><button class="star ${starred?'is-starred':''}" data-action="star" data-id="${r.id}" aria-label="${starred?'取消收藏':'收藏'} ${attr(E.label(r))}" aria-pressed="${starred}">${starred?'★':'☆'}</button></article>`;}
  function paginate(p,n,action){return n>1?`<div class="pagination"><button class="btn small" data-action="${action}" data-page="${p-1}" ${p===1?'disabled':''}>← 上一页</button><span class="small muted">${p} / ${n}</span><button class="btn small" data-action="${action}" data-page="${p+1}" ${p===n?'disabled':''}>下一页 →</button></div>`:'';}
  function renderMistakes(){
    let rows=records.filter(r=>{const p=progress.records[r.id];return p?.wrong>0&&(wrongTab==='all'||(wrongTab==='active'?p.active:!p.active));}).sort((a,b)=>(progress.records[b.id]?.lastAt||0)-(progress.records[a.id]?.lastAt||0));
    const n=Math.max(1,Math.ceil(rows.length/16));page=Math.min(page,n);
    return `<div class="heading-row"><div><div class="eyebrow">错误是下一次的线索</div><h1>错题本</h1><p class="subhead">每种做错的题型，连续答对 2 次后归档。历史不会删除。</p></div><button class="btn primary" data-action="review-all" ${!totalWrong()?'disabled':''}>开始复练</button></div><div class="btn-row" style="margin-bottom:20px">${[['active','待复练'],['resolved','已修复'],['all','全部历史']].map(([v,t])=>`<button class="btn small ${wrongTab===v?'blue':''}" data-action="wrong-tab" data-tab="${v}">${t}</button>`).join('')}<button class="btn small" data-action="review-scope">只复练当前范围</button></div><div class="callout blue" style="margin-bottom:22px">只使用你勾选的题型来复练相应错题。某题在“公式拼写”中答错，需要在该题型连续答对 2 次，不能靠名称选择消除。查看答案或提示会保留为待复练。</div><div class="theorem-list">${rows.slice((page-1)*16,page*16).map(r=>{const p=progress.records[r.id];return `<article class="card"><button class="record-title" data-action="detail" data-id="${r.id}">${titleHTML(r)}</button>${badges(r,false)}<div class="mistake-answer"><span class="small muted">最近答案 · ${MODE[p.lastMode]?.title||''} · ${dateText(p.lastAt)}</span><br>${esc(p.lastAnswer||'没有作答')}</div><div class="small muted" style="margin-top:10px">累计 ${p.wrong} 次需复练 · ${p.correct} 次正确${p.active?' · 剩余：'+p.wrongModes.map(m=>`${MODE[m].title} ${Math.min(2,p.modeWins?.[m]||0)}/2`).join('，'):' · 已修复 ✓'}</div><div class="btn-row mistake-actions"><button class="btn small" data-action="review-one" data-id="${r.id}">再练这条</button><button class="btn small ghost" data-action="detail" data-id="${r.id}">看公式与来源</button></div></article>`;}).join('')||emptyHTML(wrongTab==='active'?'这里暂时没有错题':'这里还没有记录','练习过程中答错、跳过或使用提示的定理，会自动记录在这里。','home') }</div>${paginate(page,n,'library-page')}`;
  }
  function shortSource(name){return name.split('/').pop().replace(/^COMPSCI_2LC3_/,'').replace(/^CompSci2LC3_/,'');}
  function sourceLabel(s){if(s.locator?.file)return `${s.locator.file} · Cell ${s.locator.cell}${s.locator.calculation?` · Calculation ${s.locator.calculation} · Step ${s.locator.step}`:''}`;const src=sourceMap.get(s.sourceId);const loc=s.locator?.page?'第 '+s.locator.page+' 页':s.locator?.line?'第 '+s.locator.line+' 行':'来源片段';return `${src?shortSource(src.name):s.sourceId} · ${loc}`;}
  function renderAudit(){
    const c=D.coverage;const list=D.review.filter(r=>!auditQuery||(r.header+' '+r.formula).toLowerCase().includes(auditQuery.toLowerCase()));const pages=Math.max(1,Math.ceil(list.length/10));auditPage=Math.min(auditPage,pages);
    return `<div class="heading-row"><button class="btn small" data-action="nav" data-view="settings">返回设置</button></div><div class="eyebrow">有出处，才值得记住</div><h1>资料与题库审计</h1><p class="subhead">定理声明来自预载列表与 notebook 正文已证明定理；Proof 填空来自 2026 HTML notebook 的已完成证明，保留原步骤和出处。</p><div class="audit-stats"><div class="audit-stat"><strong>${c.current2026PracticeCount}</strong><span>2026 可练卡片</span></div><div class="audit-stat"><strong>${quizRecords.length}</strong><span>所有年份可练卡片</span></div><div class="audit-stat"><strong>${records.filter(r=>E.documentFocusMatches(r,'important')).length}</strong><span>文档 Important 标记</span></div><div class="audit-stat"><strong>${D.sources.length}</strong><span>已核对的声明来源</span></div></div><div class="callout"><strong>覆盖边界</strong><br>${esc(c.notice)}${c.nativeNote?`<p>${esc(c.nativeNote)}</p>`:''}<br>已复制 2025i ${c.preloadedNotebookCount} 份及 2026 年 ${c.current2026NotebookCount} 份预载弹窗。另收录 ${c.notebookProvedDeclarationCount||0} 次正文已证明声明。每张卡的来源可定位到 notebook、模块、原文行或 Cell；不同 notebook 的预载范围可能不同。</div><div class="callout blue"><strong>Proof 定理填空 · ${proofRecords.length} 题</strong><br>起点、定理提示、终点取自已完成证明的连续三行。只接受定理名称；未命名或使用多条定理的步骤不出题。原替换条件保留，答案显示完整提示。证明步骤独立于预载声明计数。</div><details open><summary>预载列表的核对范围</summary><div class="source-list">${(c.unavailable?.length?c.unavailable:[{name:'26 份 Homework 预载列表',reason:'每份 CalcCheck 页面通过 Cell Actions 展开并复制全部预载条目；notebook 正文的证明任务不计入。'}]).map(x=>`<div class="source-item"><strong>${esc(x.name)}</strong><br>${esc(x.reason)}</div>`).join('')}</div></details><details><summary>重复计数、Important 与名称编号的规则</summary><p>${esc(c.countMethod)}</p><p>专项复习使用课程文档的 documentStudy 计数与依据。重复出现表示至少两次声明或明确引用，同族导出不累加；与下方预载列表计数分开。Important 只来自明确的原文标题或标注；!! 是另一种原文强调；个人收藏单独存储。重复预载不等于教师评级，也不等于独立出现的定理变体。</p><p>同名不同编号保留。没有官方编号：显示“未编号”和内部卡片 ID；没有名称：显示“原文未命名”，练习时选择具体编号。局部 (1)、(2) 等题号不是 LADM 编号，要结合来源。</p><p>来源数据保留弹窗列出的公理、定理、引理、推论、事实与推理规则；其中 ${records.length-quizRecords.length} 条推理规则不进入答题、选项或错题复练。notebook 正文里的待证明题不作为入库依据。${esc(c.curationNote||'')}</p></details><details><summary>判题的精确边界</summary><p>不是逐字比较。接受字母一一对应的改名，以及受支持的交换律、结合律、反向关系写法。不能把两个独立变量合并，也不能用任意恒真式代替另一条定理。</p><p>复杂量词、替换与命令语法采用保守的结构模板判题，接受一致的全局改名，但不声称验证任意等价改写或完整证明；这不是在线 CalcCheck 引擎。任何侧条件、变量类型仍需满足。公式字符清楚但无法可靠判定的答案不会静默判对。</p></details><details><summary>读取清单 · ${D.sources.length} 个文件 / 其他来源条目</summary><p>来源是课程 CalcCheck 预载列表及已验证的 notebook 正文声明；来源记录给出对应 notebook 地址。</p><div class="source-list">${D.sources.map(s=>`<div class="source-item"><strong>${esc(shortSource(s.name))}</strong><br>${esc(s.status)} · ${s.pages?`${s.pages} 页 · `:''}${s.declarations||0} 次声明提取${s.duplicateOf?' · 副本不重复计数':''}</div>`).join('')}</div></details><section class="section-gap"><div class="heading-row"><div><h2>待核对提取</h2><p class="subhead">可能含缺字、侧条件、图形字符或证明片段；不是可靠答案。</p></div><button class="btn small" data-action="export-bank">导出题库 JSON</button></div><input class="input" id="audit-query" data-audit-search value="${attr(auditQuery)}" placeholder="搜索待核对的编号或名称">${list.slice((auditPage-1)*10,auditPage*10).map(r=>`<details><summary>${esc(r.header||r.name)} <span class="badge">待核对</span></summary><p>${esc(r.reason)}</p><div class="source-formula">${esc(r.formula)}</div><p>${esc(sourceLabel(r.source))}</p></details>`).join('')}${paginate(auditPage,pages,'audit-page')}</section><div class="coverage-note">构建日期：${esc(c.builtAt)} · 题库与来源数据位于 data/，可通过 tools/ 重新整理新资料。</div>`;
  }
  function bankUpdateCard(){return `<section class="card" id="bank-updates"><h2>题库更新</h2><p class="small muted">当前题库 ${records.length} 条${bankRevision?' · 版本 '+esc(bankRevision.slice(0,12)):''}。更新保留错题、收藏、历史与 XP。</p>${window.TQ_NATIVE?'<p class="small muted">从 GitHub 部署网站检查并安装题库。</p><button class="btn" data-action="native-updates">管理题库更新</button>':canUpdateBank()?`<p class="small muted" id="bank-update-status" role="status" aria-live="polite">${esc(bankMessage)}</p><button class="btn primary" data-action="check-bank-update" ${bankBusy?'disabled':''}>${bankBusy?'正在检查…':'检查并安装题库更新'}</button>`:`<p class="small muted">单文件版与本地文件不能在线安装题库。请打开在线网站检查更新。</p><a class="btn" href="${DEPLOYED_SITE}" target="_blank" rel="noopener">打开在线题库</a>`}</section>`;}
  async function updateBank(){
    if(bankBusy||!canUpdateBank()||window.TQ_NATIVE)return;
    bankBusy=true;bankMessage='正在下载并校验题库…';render();
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),30000);
    async function fetchText(path,maxBytes){
      const url=new URL(path,new URL('./',location.href));url.searchParams.set('tq-bank-update',String(Date.now()));
      const response=await fetch(url,{cache:'no-store',signal:controller.signal});
      if(response.status===404&&path==='data/version.json')throw new Error('当前网站尚未发布题库更新清单，请部署新版网站后再检查。');
      if(!response.ok||response.redirected||new URL(response.url).origin!==location.origin)throw new Error('服务器没有返回题库文件，请确认网站已部署或联网后重试。');
      if(Number(response.headers.get('content-length'))>maxBytes)throw new Error('题库文件超过大小限制。');
      const bytes=await response.arrayBuffer();if(bytes.byteLength>maxBytes)throw new Error('题库文件超过大小限制。');
      return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
    }
    try{
      const manifest=JSON.parse(await fetchText('data/version.json',100000));validateBankManifest(manifest);
      const [theoremText,sourceText,studyText]=await Promise.all([fetchText(manifest.files.theorems.path,20000000),fetchText(manifest.files.sources.path,3000000),...(manifest.files.study?[fetchText(manifest.files.study.path,20000000)]:[])]);
      const snapshot={manifest,theoremText,sourceText,studyText,bundledFingerprint},next=await checkedBank(snapshot);
      const same=JSON.stringify(D)===JSON.stringify(next);
      await bankStorage(snapshot); // Install only once persistence succeeds.
      D=next;window.THEOREM_DATA=D;bankRevision=manifest.revision;
      proofRecords=window.PROOF_QUESTIONS=D.study.proofQuestions;window.PROOF_SOURCES=D.study.proofSources;hintData=window.NOTEBOOK_HINTS=D.study.notebookHints;
      records=[...D.theorems,...proofRecords];quizRecords=D.theorems.filter(E.isQuestionCard);byId=new Map(records.map(r=>[r.id,r]));sourceMap=new Map(studySources().map(source=>[source.id,source]));weekBySource=new Map(Object.entries(D.weekBySource||{}));archiveWeekNames=D.weekModuleLabels||{};
      // Keep historical progress for removed IDs, so a later bank can restore it.
      settings=cleanSettings(settings);saveSettings();
      if(!same){
        const pending=session||resume;resume=cleanSession(pending);
        if(resume){resume.state=null;write(KEYS.session,resume);}else{try{localStorage.removeItem(KEYS.session);}catch(_){} }
        if(session){session=resume;qState=null;if(!session&&view==='quiz')view='settings';}
        page=auditPage=1;closeModal();
      }
      bankMessage=same?'已核验：当前题库已是最新版本。':`已安装题库更新：${records.length} 条。学习记录已保留；未完成关卡的当前题目将重新生成。`;
    }catch(error){bankMessage='更新失败，保留原题库与学习记录。'+(error.name==='AbortError'?'网络请求超时，请重试。':error.message);}
    finally{clearTimeout(timeout);bankBusy=false;render();if(view!=='settings')toast(bankMessage);}
  }
  function appearanceFields(){return `<section class="card section-gap appearance-card"><h2>界面与显示</h2><label class="setting-row"><span><strong>语言</strong><p>选择界面语言；定理名称与公式保留原文。</p></span><select data-setting="language" aria-label="语言"><option value="zh-CN" ${settings.language==='zh-CN'?'selected':''}>简体中文</option><option value="en" ${settings.language==='en'?'selected':''}>English</option></select></label><label class="setting-row"><span><strong>外观</strong><p>按照设备设置自动切换。</p></span><select data-setting="appearance" aria-label="外观">${[['system','跟随系统'],['light','浅色'],['dark','深色']].map(([value,label])=>`<option value="${value}" ${settings.appearance===value?'selected':''}>${label}</option>`).join('')}</select></label></section>`;}
  function renderSettings(){return `<div class="eyebrow">按你的方式练</div><h1>练习设置</h1><p class="subhead">选择题型，保留进度，不需要服务器。</p>${appearanceFields()}<section class="card"><h2>题型与节奏</h2>${modeFields()}<label class="setting-row"><span><strong>每日目标</strong><p>按本机日期记录，不要求持续在线。</p></span><select data-setting="goal">${[10,20,30,50].map(n=>`<option value="${n}" ${n===settings.goal?'selected':''}>${n} 题</option>`).join('')}</select></label><label class="setting-row"><span><strong>答题音效</strong><p>轻提示音，默认关闭；遵从系统减少动态效果设置。</p></span><input type="checkbox" data-setting="sound" ${settings.sound?'checked':''}></label><button class="btn primary" data-action="start" ${!settings.modes.length||!scopeRecords().length?'disabled':''}>开始练习</button></section><section class="card"><h2>本地学习备份</h2><p class="small muted">${window.TQ_NATIVE?'错题、历史、收藏和 XP 保存在此 App。换设备或卸载应用前，请先导出。没有云端同步。':'错题、历史、收藏和 XP 保存在这个浏览器。换设备、换站点或清除浏览器数据前，请先导出。没有云端同步。'}</p><div class="btn-row section-gap"><button class="btn" data-action="export-progress">导出学习备份</button><button class="btn" data-action="import-progress">导入学习备份</button><button class="btn" data-action="shortcuts">查看符号键盘</button></div><input id="backup-file" type="file" accept="application/json,.json" hidden><p class="small muted">导入会替换当前学习记录；文件经过结构与大小检查。题库来源文件不包含你的学习记录。</p></section>${bankUpdateCard()}<section class="card"><h2>资料审计</h2><p class="small muted">查看资料覆盖、来源与判题边界。</p><button class="btn" data-action="nav" data-view="audit">查看覆盖与来源</button></section><section class="card"><h2>数据管理</h2><div class="btn-row section-gap"><button class="btn small" data-action="export-bank">导出题库 JSON</button><button class="btn small" data-action="reset-filters">重设记忆范围</button><button class="btn small" data-action="clear-progress">清空学习记录</button></div><p class="small muted">重设范围不会删除成绩；清空学习记录需要再次确认。</p></section><section class="card"><h2>关于 Theorem Quest</h2><p class="small muted">借鉴短关卡、即时反馈、连对和错题复练的学习节奏，使用独立设计，不隶属于 Duolingo、CalcCheck 或 McMaster。所有判题在设备本地进行，运行时不调用 AI 或外部 API。</p><p class="small muted">完整公式不是严格字符匹配；复杂语法的保守匹配边界见“资料审计”。题库覆盖尚有缺口，不把提取候选当成已核验定理。</p></section>`;}
  function openModal(title,body){
    hideScreenKeyboard();
    clearTimeout(quizFocusTimer);
    document.querySelectorAll('.modal-exit').forEach(el=>el.remove());
    if(!modalRoot.firstElementChild)lastFocus=document.activeElement;
    modalRoot.innerHTML=`<div class="modal-backdrop" data-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><h2 id="modal-title">${esc(title)}</h2><button class="icon-btn" data-action="close-modal" aria-label="关闭">×</button></header>${body}</section></div>`;prepareScreenInputs();document.body.style.overflow='hidden';app.inert=true;
    const backdrop=modalRoot.firstElementChild;
    animateUI(backdrop,[{opacity:0},{opacity:1}],200);
    animateUI(backdrop.querySelector('.modal'),[{opacity:0,transform:'scale(0.96)'},{opacity:1,transform:'scale(1)'}],200);
    backdrop.querySelector('[data-action="close-modal"]')?.focus({preventScroll:true});
  }
  function closeModal(){
    const backdrop=modalRoot.firstElementChild;if(!backdrop)return;
    hideScreenKeyboard();
    const modal=backdrop.querySelector('.modal'),visual=getComputedStyle(modal),opacity=visual.opacity,transform=visual.transform;
    const backdropOpacity=getComputedStyle(backdrop).opacity;
    backdrop.getAnimations({subtree:true}).forEach(animation=>animation.cancel());
    // Detach the exiting visual immediately so no stale dialog can trap input
    // or overwrite a new dialog when its animation finishes.
    backdrop.remove();app.inert=false;document.body.style.overflow='';
    if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true});lastFocus=null;
    backdrop.classList.add('modal-exit');backdrop.inert=true;backdrop.setAttribute('aria-hidden','true');modal.removeAttribute('role');modal.removeAttribute('aria-modal');
    backdrop.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    document.body.append(backdrop);
    const exit=animateUI(backdrop,[{opacity:backdropOpacity},{opacity:0}],160);
    animateUI(modal,[{opacity,transform},{opacity:0,transform:'scale(0.96)'}],160);
    if(exit)exit.finished.then(()=>backdrop.remove(),()=>backdrop.remove());else backdrop.remove();
  }
  function configure(){openModal('这一关，想怎么练？',`<p class="small muted">当前 ${scopeRecords().length} 条定理。勾选的题型交错出现，手机端优先选择题和按键填空，至少选一种。Proof 题只来自 2026 已完成证明，共 ${proofRecords.length} 个步骤。</p>${modeFields()}<div class="btn-row"><button class="btn primary" data-action="modal-start" ${!scopeRecords().length||!settings.modes.length?'disabled':''}>开始 ${settings.count} 题</button><button class="btn" data-action="modal-library">调整记忆范围</button></div>`);}
  function detail(id){const r=byId.get(id);if(!r)return;const p=progress.records[id];openModal('定理卡片',`<div class="question-name">${titleHTML(r)}</div>${r.variantLabel?`<span class="badge">${esc(r.variantLabel)}</span>`:''}${badges(r)}<div class="math">${esc(r.formula)}</div>${r.formulaVariants?.length>1?`<details><summary>同条目在原资料中的其他写法 · ${r.formulaVariants.length}</summary>${r.formulaVariants.map(f=>`<div class="source-formula">${esc(f)}</div>`).join('')}</details>`:''}${r.sideCondition?`<div class="callout"><strong>适用条件</strong><br>${esc(r.sideCondition)}</div>`:''}<p class="small"><strong>原文类型：</strong>${esc(r.kind)}${r.domain?' · '+esc(r.domain):''}</p><p class="small"><strong>所有编号：</strong>${r.numbers.length?r.numbers.map(n=>'('+esc(n)+')').join('、'):'原文未编号；内部卡片 ID 仅供网站索引'}</p>${r.aliases.length?`<p class="small"><strong>同条目别名：</strong>${r.aliases.map(esc).join(' · ')}</p>`:''}${notebookHintEvidenceHTML(r)}${documentEvidenceHTML(r)}${!r.documentStudy&&r.importantEvidence?.length?`<details open><summary>★ 原文 Important 依据</summary>${r.importantEvidence.map(x=>`<p>${esc(x.label)}<br>${esc(shortSource(sourceMap.get(x.sourceId)?.name||x.sourceId))}</p>`).join('')}</details>`:''}<details><summary>来源与原文片段 · ${r.sources.length} 个位置</summary><div class="source-list">${r.sources.map(s=>`<div class="source-item"><strong>${esc(sourceLabel(s))}</strong>${/^https?:\/\//.test(sourceMap.get(s.sourceId)?.url||'')?`<p><a href="${attr(sourceMap.get(s.sourceId).url)}" target="_blank" rel="noopener noreferrer">打开原始 Notebook ↗</a></p>`:''}<div class="source-formula">${esc(s.excerpt)}</div></div>`).join('')}</div></details>${p?`<details><summary>学习记录 · ${p.correct}/${p.attempts} 次正确</summary>${(p.log||[]).map(l=>`<p>${dateText(l.at)} · ${esc(MODE[l.mode]?.title)} · ${l.ok?'正确':l.assisted?'使用提示':'需复练'}<br><span class="source-formula">${esc(l.answer||'未作答')}</span></p>`).join('')}</details>`:''}<div class="btn-row"><button class="btn primary" data-action="practice-one" data-id="${id}">练习这条</button><button class="btn" data-action="copy-formula" data-id="${id}">复制公式</button><button class="btn" data-action="star" data-id="${id}">${progress.stars.includes(id)?'★ 已收藏':'☆ 收藏'}</button></div>`);}
  function shortcuts(){
    const rows=Object.entries(E.SHORTCUTS).sort(([a],[b])=>a.localeCompare(b));
    openModal('反斜线符号输入',`<p class="small">公式题中输入反斜线及代码前缀即可看到候选；按 ↓ / ↑ 选择，Tab 补成符号。完整代码后也可按空格转换。符号题中用相同的候选补全代码；下列同一符号的任意代码都可作答。</p><table class="readable-table"><thead><tr><th>反斜线代码</th><th>符号</th></tr></thead><tbody>${rows.map(([code,symbol])=>`<tr><td><code>${esc(code)}</code></td><td class="math small">${esc(symbol)}</td></tr>`).join('')}</tbody></table><p class="callout blue">直接输入 := 是命令赋值；\\:= 才转换成替换符号 ≔。≡ 与 = 分开判题。</p>`);
  }

  function launch(rs,label='自由练习',review=false,count=settings.count){
    rs=rs.filter(E.isQuestionCard);
    if(!settings.modes.length){toast('请至少勾选一种题型。');configure();return;}
    let queue;
    try{
      const options={mobile:!!window.TQ_NATIVE||window.matchMedia('(max-width: 600px), (pointer: coarse)').matches};
      if(review){
        const eligible=rs.filter(r=>progress.records[r.id]?.wrongModes?.some(m=>settings.modes.includes(m)&&E.eligibleModes(r,[m],settings.choiceDifficulty).length));
        if(!eligible.length){toast('当前错题型未被勾选，请在配置中启用相应题型。');configure();return;}
        options.modesForRecord=r=>progress.records[r.id].wrongModes;
        queue=E.makeSession(eligible,settings.modes,count,Math.random,settings.choiceDifficulty,options);
      }else queue=E.makeSession(rs,settings.modes,count,Math.random,settings.choiceDifficulty,options);
    }catch(e){toast(e.message);return;}
    closeModal();session={queue,index:0,choiceDifficulty:settings.choiceDifficulty,label,results:[],combo:0,bestCombo:0,xp:0,startedAt:Date.now(),state:null};qState=null;saveSession();view='quiz';render();window.scrollTo({top:0});
  }
  function newQuestionState(){const q=session.queue[session.index],r=byId.get(q.id);if(q.mode==='symbol'&&!q.symbol)q.symbol=E.shuffle(E.symbolsInFormula(r.formula))[0];return {checked:false,selected:null,groupSelected:false,typed:'',answer:'',assisted:false,options:q.mode==='choice'?E.choiceOptions(quizRecords,r,session.choiceDifficulty).map(v=>v.id):[],cloze:q.mode==='cloze'?E.clozeTemplate(r.formula,Math.random,session.choiceDifficulty):null,suggestions:[],suggestionIndex:0,shortcutIndex:0,symbolTarget:q.symbol||null,keys:'context',feedback:null};}
  function theoremTokens(r){return [...new Set((r.formulaVariants?.length?r.formulaVariants:[r.formula]).flatMap(f=>E.tokenize(f)))];}
  function theoremSymbolsHTML(r){
    if(screenEnabled())return '';
    const symbols=theoremTokens(r).filter(t=>!E.isVariable(t)&&!/^[A-Za-z0-9_]+$/.test(t));
    return symbols.length?`<div class="theorem-symbols" role="group" aria-label="本题特殊符号"><span class="theorem-symbols-label">本题符号</span>${symbols.map(t=>`<span class="theorem-symbol" title="${attr(t)}">${esc(t)}</span>`).join('')}</div>`:'';
  }
  function renderQuiz(){
    releaseScreenSuggestions();
    document.body.dataset.view='quiz';
    clearTimeout(quizFocusTimer);
    const oldMeter=$('.quiz-top .meter>span');
    const oldProgress=oldMeter?getComputedStyle(oldMeter).transform:null;
    const previouslyChecked=!!$('#quiz-bottom.feedback');
    const previousQuestion=$('.quiz-shell')?.dataset.question;
    const previousScroll=$('.quiz-main')?.scrollTop||0;
    const previousField=document.activeElement?.closest('.quiz-main')?document.activeElement:null;
    const previousFieldID=previousField?.id,selection=previousField&&typeof previousField.selectionStart==='number'?[previousField.selectionStart,previousField.selectionEnd]:null;
    if(!session){navigate('home');return;}if(session.index>=session.queue.length){endSession();return;}
    if(!qState){qState=session.state||newQuestionState();saveSession();}
    const q=session.queue[session.index],r=byId.get(q.id),m=MODE[q.mode];
    const questionKey=`${session.startedAt}:${session.index}:${q.id}:${q.mode}`;
    const sameQuestion=previousQuestion===questionKey;
    document.documentElement.classList.toggle('answer-feedback-open',qState.checked);
    const pct=(session.index+(qState.checked?1:0))/session.queue.length*100;
    let question='';
    if(q.mode==='choice'||q.mode==='name')question=`<div class="question-card"><div class="mini-mascot" aria-hidden="true"><span class="mark">∴</span></div><div class="speech"><div class="math" id="question-formula">${esc(r.formula)}</div></div></div>${r.sideCondition?`<div class="callout blue small">适用条件：${esc(r.sideCondition)}</div>`:''}`;
    else question=`<div class="question-card"><div class="mini-mascot" aria-hidden="true"><span class="mark">∴</span></div><div class="speech question-name">${titleHTML(r)}${r.variantLabel?`<span class="variant-hint">${esc(r.variantLabel)}</span>`:''}</div></div>${r.sideCondition?`<div class="callout blue small">适用条件：${esc(r.sideCondition)}</div>`:''}`;
    let answer='';
    if(q.mode==='proof'){
      const p=r.proof,[hintBefore,hintAfter]=(p.hintTemplate||'{{name}}').split('{{name}}');
      question=`<p class="small muted">${esc(p.notebook)} · ${esc(p.proofLabel)} · 步骤 ${esc(p.step)}</p>`;
      answer=`<div class="proof-chain" role="group" aria-label="Proof 定理名称填空"><div class="math proof-expression" id="proof-start">${esc(p.start)}</div><div class="proof-hint"><span>${esc(p.relation)} ⟨</span>${hintBefore?`<span class="proof-hint-context">${esc(hintBefore)}</span>`:''}<label class="sr-only" for="proof-answer">所用定理名称</label><input class="input name-input" id="proof-answer" role="combobox" aria-controls="proof-suggestions" aria-expanded="false" aria-autocomplete="list" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="仅输入定理名称" value="${attr(qState.typed)}" ${qState.checked?'disabled':''}>${hintAfter?`<span class="proof-hint-context">${esc(hintAfter)}</span>`:''}<span>⟩</span></div><div id="proof-suggestions" class="autocomplete" role="listbox" hidden></div><div class="math proof-expression" id="proof-end">${esc(p.end)}</div></div><p class="input-hint">输入三个字符（含空格和特殊字符）即可补全名称。填写起点到终点之间所用的定理名称；不接受编号或公式。</p>`;
    }
    if(q.mode==='choice')answer=`<div class="choices" role="group" aria-label="选择定理名称">${qState.options.map((id,i)=>{const x=byId.get(id);return `<button class="choice ${qState.selected===id?'selected':''} ${qState.checked&&id===r.id?'correct':''} ${qState.checked&&qState.selected===id&&!qState.feedback?.ok?'incorrect':''}" data-action="choose" data-id="${id}" aria-pressed="${qState.selected===id}" ${qState.checked?'disabled':''}><span class="choice-key">${i+1}</span><span>${titleHTML(x)}</span></button>`;}).join('')}</div><p class="input-hint">可按 1–4 选择，再按 Enter 检查。</p>`;
    if(q.mode==='name'){
      const group=E.nameGroup(quizRecords,r);
      answer=`<label class="field-label" for="name-answer">${r.name==='原文未命名'?'原文没有名称，请输入编号':'输入定理名称或别名'}</label><input class="input name-input" id="name-answer" placeholder="${r.name==='原文未命名'?'例如 11.47':'输入三个字符开始补全…'}" autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-controls="name-suggestions" aria-expanded="false" aria-autocomplete="list" value="${attr(qState.typed)}" ${qState.checked?'disabled':''}><div id="name-suggestions" class="autocomplete" role="listbox" hidden></div><div id="name-selection" class="name-selection" ${qState.selected?'':'hidden'}>${qState.selected?titleHTML(byId.get(qState.selected)):''}</div>${group.length>1?`<details class="group-number-picker"><summary>选择具体编号（可选）</summary><div class="group-refs">${[...new Map(group.map(x=>[x.displayRef,x])).values()].map(x=>`<button class="group-fill ${qState.selected&&byId.get(qState.selected)?.displayRef===x.displayRef?'selected':''}" data-action="group-ref" data-id="${x.id}" aria-pressed="${!!qState.selected&&byId.get(qState.selected)?.displayRef===x.displayRef}" ${qState.checked?'disabled':''}>${esc(x.displayRef)}</button>`).join('')}</div></details>`:''}<p class="input-hint">输入三个字符即可补全名称；编号请手动填写。${group.length>1?'同名定理只需填写名称。':'候选只补齐名称或别名。'}</p>`;
    }
    if(q.mode==='blanks'){
      const template=E.blankTemplate(r.formula),idx=new Map(template.blanks.map((v,i)=>[v.index,i]));qState.template=template;
      answer=`<div class="blank-formula" role="group" aria-label="补全定理变量">${template.tokens.map((t,k)=>idx.has(k)?`<input class="blank-slot ${(qState.values?.[idx.get(k)]||'')?'filled':''}" data-slot="${idx.get(k)}" id="blank-${idx.get(k)}" aria-label="第 ${idx.get(k)+1} 个字母空" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="12" value="${attr(qState.values?.[idx.get(k)]||'')}" ${qState.checked?'disabled':''}>`:`<span>${esc(t)}</span>`).join('')}</div><p class="input-hint">需要 ${template.variables.length} 个不同变量。每处都要填写，重复字母须保持关系一致。${buttonFillMode()?'直接点选任意空位，再点击字母按键填入；左右键也可切换，红色退格删除当前内容。':'Tab 或空格移到下一空；需要其他变量时输入反斜线代码补全。'}</p><div id="keyboard">${keyboardHTML('blanks',r)}</div>`;
    }
    if(q.mode==='cloze'){
      const t=qState.cloze?.blanks?qState.cloze:E.clozeTemplate(r.formula,Math.random,session.choiceDifficulty);qState.cloze=t;
      qState.clozeValues=qState.clozeValues||Array(t.blanks.length).fill('');
      qState.clozeSlot=Math.min(qState.clozeSlot||0,t.blanks.length-1);
      const slots=new Map(t.blanks.map((blank,i)=>[blank.index,i])),active=qState.clozeSlot;
      answer=`<div class="blank-formula cloze-formula" role="group" aria-label="补全定理符号">${t.tokens.map((token,index)=>slots.has(index)?`<button class="cloze-slot ${qState.clozeValues[slots.get(index)]?'filled':''} ${active===slots.get(index)?'active':''}" data-action="cloze-slot" data-slot="${slots.get(index)}" aria-label="第 ${slots.get(index)+1} 个符号空" aria-pressed="${active===slots.get(index)}" ${qState.checked?'disabled':''}>${esc(qState.clozeValues[slots.get(index)]||'？')}</button>`:`<span>${esc(token)}</span>`).join('')}</div><label class="field-label" for="cloze-answer">当前符号空 · ${active+1} / ${t.blanks.length}</label><input class="input name-input" id="cloze-answer" aria-label="当前符号空" role="combobox" aria-controls="shortcut-suggestions" aria-expanded="false" aria-autocomplete="list" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${buttonFillMode()?'点击下方按键填空':'输入符号或反斜线代码…'}" value="${attr(qState.clozeValues[active])}" ${qState.checked?'disabled':''}><div id="shortcut-suggestions" class="autocomplete shortcut-suggestions" role="listbox" hidden></div><p class="input-hint">${buttonFillMode()?'直接点选任意符号空位，再点击按键填入；左右键也可切换，红色退格删除当前内容。':'每个符号空都要填写。用 QWERTY 键盘输入反斜线代码，Tab 补全，再按 Tab 移到下一空。'}</p><div class="key-panel cloze-keyboard" id="keyboard" role="group" aria-label="本题符号键盘"><div class="key-panel-head"><span>符号键盘 · ${active+1} / ${t.blanks.length}</span><div><button class="key-control" data-action="cloze-prev" aria-label="上一空" ${qState.checked||active===0?'disabled':''}>←</button><button class="key-control" data-action="cloze-next" aria-label="下一空" ${qState.checked||active===t.blanks.length-1?'disabled':''}>→</button><button class="key-delete cloze-delete" data-action="cloze-delete" aria-label="删除当前符号" ${qState.checked?'disabled':''}>⌫</button></div></div><div class="key-row">${(screenEnabled()&&!buttonFillMode()?[]:t.options).map(token=>`<button class="key ${qState.clozeValues[active]===token?'selected':''}" data-action="cloze-key" data-token="${attr(token)}" aria-label="填入 ${attr(token)}" aria-pressed="${qState.clozeValues[active]===token}" ${qState.checked?'disabled':''}>${esc(token)}</button>`).join('')}</div></div>`;
    }
    if(q.mode==='formula')answer=`<label class="field-label" for="formula-answer">你的公式</label><textarea id="formula-answer" class="formula-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="输入公式；特殊符号用 \\land、\\implies…" aria-controls="shortcut-suggestions" aria-expanded="false" ${qState.checked?'disabled':''}>${esc(qState.typed)}</textarea><div id="shortcut-suggestions" class="autocomplete shortcut-suggestions" role="listbox" hidden></div><div class="formula-preview" id="formula-preview" aria-live="polite">${esc(E.normalizeInput(qState.typed||''))}</div><div id="keyboard">${keyboardHTML('formula',r)}</div><p class="input-hint">输入一个反斜线即可看到符号候选；↓ / ↑ 选项，Tab 补全。完整代码后按空格转换；Enter 检查。</p>`;
    if(q.mode==='symbol')answer=`<div class="symbol-challenge" aria-label="要输入的符号">${esc(qState.symbolTarget)}</div><label class="field-label" for="symbol-answer">输入这个符号的反斜线代码</label><input class="input name-input" id="symbol-answer" placeholder="例如 \\land" autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-controls="shortcut-suggestions" aria-expanded="false" aria-autocomplete="list" value="${attr(qState.typed)}" ${qState.checked?'disabled':''}><div id="shortcut-suggestions" class="autocomplete shortcut-suggestions" role="listbox" hidden></div><p class="input-hint">输入 \\ 后的字符；接受同一符号的所有已收录代码。↓ / ↑ 选择，Tab 补齐代码，Enter 检查。</p>`;
    if(buttonFillMode())answer=answer.replaceAll('<input ','<input readonly inputmode="none" data-button-input="true" ');
    app.innerHTML=`<div class="quiz-shell" data-mode="${q.mode}" data-question="${attr(questionKey)}"><header class="quiz-top"><button class="icon-btn" data-action="exit-quiz" aria-label="退出并保存本关">×</button><div class="meter" role="progressbar" aria-label="本关进度" aria-valuenow="${session.index+(qState.checked?1:0)}" aria-valuemin="0" aria-valuemax="${session.queue.length}"><span style="width:100%;transform:scaleX(${pct/100})"></span></div><span class="quiz-progress-label">${session.index+(qState.checked?1:0)} / ${session.queue.length}</span><span class="combo">ϟ ${session.combo} 连对</span></header><main class="quiz-main" id="main" tabindex="-1"><div class="quiz-meta"><span class="badge">${esc(session.label)}</span><span class="badge good">${q.mode==='name'&&r.name==='原文未命名'?'编号回忆':m.title}</span>${q.retry?`<span class="badge wrong">本轮最后一次复练</span>`:''}${E.documentFocusMatches(r,'important')?'<span class="badge important">★ IMPORTANT</span>':''}</div>${r.domain?`<p class="small muted">类型：${esc(r.domain)}</p>`:''}<h1>${q.mode==='name'&&r.name==='原文未命名'?'这条声明的原编号是什么？':m.prompt}</h1><p class="quiz-instruction">${q.mode==='proof'?'根据上下两行推导，填写中间的定理名称。':q.mode==='blanks'?'逻辑符号已经排好。字母不必与讲义相同，但逻辑结构要一致。':q.mode==='cloze'?(buttonFillMode()?'根据名称与公式结构，点击按键补全符号。':'根据名称与公式结构，输入反斜线代码补全符号。'):q.mode==='formula'?'回想运算符、变量关系和括号；不是逐字背诵。':q.mode==='name'&&r.name==='原文未命名'?'原文没有名称，请根据公式回忆编号。':'看清公式结构，再选择名称与编号。'}</p>${question}${q.mode==='cloze'||q.mode==='proof'?'':theoremSymbolsHTML(r)}${answer}</main>${qState.checked?'<div class="feedback-backdrop" aria-hidden="true"></div>':''}<footer ${qState.checked?'role="dialog" aria-modal="true" aria-labelledby="feedback-title"':''} class="quiz-bottom ${qState.checked?'feedback '+(qState.feedback.ok?'correct':'incorrect'):''}" id="quiz-bottom">${bottomHTML()}</footer></div>`;
    prepareScreenInputs();
    if(sameQuestion)$('.quiz-main').scrollTop=previousScroll;
    if(qState.checked){$('.quiz-main').inert=true;$('.quiz-top').inert=true;}
    else if(!sameQuestion)animateUI($('.quiz-main'),[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],160);
    const meter=$('.quiz-top .meter>span');
    if(oldProgress&&oldProgress!==getComputedStyle(meter).transform)animateUI(meter,[{transform:oldProgress},{transform:meter.style.transform}],200);
    if(qState.checked&&!previouslyChecked){
      animateUI($('.feedback-backdrop'),[{opacity:0},{opacity:1}],200);
      animateUI($('#quiz-bottom'),[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],200);
    }
    if(qState.checked){hideScreenKeyboard();$('#quiz-bottom [data-action="continue"]')?.focus({preventScroll:true});}
    else if(sameQuestion&&previousFieldID){const restored=document.getElementById(previousFieldID);restored?.focus({preventScroll:true});if(selection)restored?.setSelectionRange?.(...selection);}
    if(!qState.checked&&q.mode==='blanks'){const selected=$(`#blank-${qState.blankSlot??0}`);if(selected){activeInput=selected;selected.classList.add('active');}}
    refreshAccessory();positionAccessory();
    const quizShell=$('.quiz-shell'),state=qState;
    if(!qState.checked)quizFocusTimer=setTimeout(()=>{const target=q.mode==='proof'?$('#proof-answer'):q.mode==='name'?$('#name-answer')||$('.group-fill'):q.mode==='formula'?$('#formula-answer'):q.mode==='symbol'?$('#symbol-answer'):q.mode==='cloze'?$('#cloze-answer'):q.mode==='blanks'?$(`#blank-${qState.blankSlot??0}`):null;if(view==='quiz'&&qState===state&&quizShell?.isConnected&&!modalRoot.firstElementChild&&target&&!document.activeElement.matches('.quiz-main input,.quiz-main textarea,.quiz-shell button')){target.focus({preventScroll:true});activeInput=target;}},35);
  }
  function keyboardHTML(mode,r){
    if(screenEnabled()&&!buttonFillMode())return '';
    const original=E.blankTemplate(r.formula).variables;
    const letters=[...new Set([...original,...['p','q','r','s','a','b','c','x','y','z','m','n','α','β','γ'].filter(t=>!original.includes(t)).slice(0,3)])];
    const controls=`<div class="key-row key-controls" role="group" aria-label="光标与编辑"><button class="key key-control" data-action="key" data-key="CURSOR_LEFT" aria-label="光标左移" ${qState.checked?'disabled':''}>← <span>左移</span></button><button class="key key-control" data-action="key" data-key="CURSOR_RIGHT" aria-label="光标右移" ${qState.checked?'disabled':''}>→ <span>右移</span></button><button class="key key-control key-delete" data-action="key" data-key="BACKSPACE" aria-label="退格" ${qState.checked?'disabled':''}>⌫ <span>退格</span></button></div>`;
    if(mode==='blanks')return `<div class="key-panel"><div class="key-panel-head">字母按键 · 点一下填入并前进</div>${controls}<div class="key-row">${letters.map(t=>keyHTML(t)).join('')}</div></div>`;
    const common=['¬','∧','∨','≡','≢','⇒','⇐','=','≠','(',')','true','false','+','-','·','0','1','2','3','4','5','6','7','8','9','≤','≥','<','>'];
    const baseExtra=['∀','∃','∑','∏','❙','•',':','ℕ','ℤ','𝔹','∈','∉','∪','∩','⊆','⊂','∅','{','}','[',']','≔',':=','⁅','⁆','⍮','⟪','⟫','⨾','˘','⊦','suc','pred','even','odd','double'];
    const needed=theoremTokens(r).filter(t=>!E.isVariable(t));
    const all=[...new Set([...common,...baseExtra,...needed])];
    const full=qState.keys==='all';
    return `<div class="key-panel"><div class="key-panel-head"><button data-action="key-tab" data-tab="context" class="${full?'':'active'}">本题按键</button><button data-action="key-tab" data-tab="all" class="${full?'active':''}">全部按键</button><button data-action="shortcuts">键盘快捷输入 ?</button></div>${controls}<div class="key-row">${(full?all:needed).map(t=>keyHTML(t)).join('')}</div><div class="key-row">${(full?[...new Set([...original,'p','q','r','s','a','b','c','x','y','z','m','n',"p'","q'",'n₀','α','β'])]:letters).map(t=>keyHTML(t)).join('')}<button class="key word" data-action="key" data-key="SPACE">空格</button>${full?'<button class="key word" data-action="key" data-key="CLEAR">清空</button>':''}</div></div>`;
  }
  function keyHTML(t){return `<button class="key ${t.length>2?'word':''}" data-action="key" data-key="${attr(t)}" aria-label="输入 ${attr(t)}" title="${attr(Object.entries(E.SHORTCUTS).find(([_,v])=>v===t)?.[0]||t)}" ${qState.checked?'disabled':''}>${esc(t)}</button>`;}
  function bottomHTML(){
    if(!qState.checked)return `<div class="bottom-inner"><div class="btn-row"><button class="btn ghost" data-action="skip">暂时不会</button><button class="btn small ghost" data-action="hint">提示</button><span class="small muted">准备好后按 Enter</span></div><button id="check-answer" class="btn primary" data-action="check" ${canCheck()?'':'disabled'}>检查答案</button></div>`;
    const q=session.queue[session.index],r=byId.get(q.id),f=qState.feedback;
    const nameAnswer=q.mode==='name'||q.mode==='choice';
    const symbolAnswer=q.mode==='symbol';
    const variants=E.answerVariants(q.mode==='proof'?[]:quizRecords,r);
    const formulas=variants[0].formulas;
    const correctAnswer=q.mode==='proof'?r.proof.answers.join(' / '):symbolAnswer?Object.entries(E.SHORTCUTS).filter(([,symbol])=>symbol===qState.symbolTarget).map(([code])=>code).join(' / '):nameAnswer?E.label(r):formulas.join('\n\n');
    const answerType=q.mode==='proof'?'定理名称':symbolAnswer?'反斜线代码':nameAnswer?'名称与编号':'公式';
    const context=q.mode==='proof'?`原证明提示：${r.proof.relation} ⟨ ${r.proof.hint} ⟩`:symbolAnswer?`对应符号：${qState.symbolTarget} · ${E.label(r)}`:nameAnswer?`对应公式：${r.formula}`:`定理：${E.label(r)}`;
    const group=variants;
    const groupResults=`<section class="group-results" aria-label="全部答案变体"><p class="feedback-answer-heading">${variants.length>1?'同组答案':'定理信息'} · ${variants.length} 条${variants.length>1?'（同组）':''}</p>${variants.map((x,i)=>`<article class="answer-variant" data-answer-variant="${attr(x.id)}"><p class="feedback-context">${i===0?'本题':'同组变体'} · ${esc(x.references.join(' / '))}${x.variantLabel?' · '+esc(x.variantLabel):''}</p>${(i===0&&nameAnswer?x.names.filter(name=>name!==r.name):x.names).length?`<p class="feedback-answer">${esc((i===0&&nameAnswer?x.names.filter(name=>name!==r.name):x.names).join(' / '))}</p>`:''}${(i===0&&!nameAnswer&&!symbolAnswer?[]:x.formulas).map(formula=>`<p class="feedback-answer feedback-formula">${esc(formula)}</p>`).join('')}${x.sideCondition?`<p class="feedback-context">适用条件：${esc(x.sideCondition)}</p>`:''}</article>`).join('')}</section>`;
    return `<div class="bottom-inner"><div class="feedback-status" role="status" aria-live="polite"><span class="feedback-icon" aria-hidden="true">${f.ok?'✓':'↺'}</span><h2 id="feedback-title">${f.ok?(session.combo>=3?`${session.combo} 连对，保持这个节奏！`:'答对了！'):(qState.assisted?'带着提示，再记一次':'再记一次，就更近一步。')}</h2><span class="feedback-reward">${f.ok?`+${f.xp||10} XP`:'待复练'}</span></div><p class="feedback-scroll-label" id="feedback-scroll-label">答案详情 <span>↕ 上下滑动查看</span></p><div class="feedback-message" tabindex="0" role="region" aria-labelledby="feedback-scroll-label"><div class="feedback-text"><p class="feedback-answer-heading">正确答案 · ${answerType}</p><p id="correct-answer" class="feedback-answer ${nameAnswer||symbolAnswer?'':'feedback-formula'}">${esc(correctAnswer)}</p>${nameAnswer&&group.length>1?`<p class="feedback-context">同组名称可单独作答；本题对应 ${esc(r.displayRef)}。</p>`:''}${q.mode==='proof'?'':groupResults}<p class="feedback-context">${q.mode==='proof'||symbolAnswer?esc(context):''}${r.variantLabel?' · '+esc(r.variantLabel):''}</p><p class="feedback-note">${esc(f.message)}${f.ok?'':' 已记录到错题本。'}</p></div></div><button class="btn ${f.ok?'primary':'danger'}" data-action="continue">${session.index===session.queue.length-1?'查看本关成果':'继续'}</button></div>`;
  }
  function canCheck(){if(!session||!qState||qState.checked)return false;const m=session.queue[session.index].mode;if(m==='choice')return !!qState.selected;if(m==='cloze')return !!qState.cloze&&!!E.fillCloze(qState.cloze,qState.clozeValues||[]);if(m==='name')return !!qState.selected||!!qState.groupSelected||!!qState.typed.trim();if(m==='proof'||m==='formula'||m==='symbol')return !!qState.typed.trim();return (qState.values||[]).length===qState.template?.blanks.length&&(qState.values||[]).every(v=>v?.trim());}
  function updateCheck(){const b=$('#check-answer');if(b)b.disabled=!canCheck();}
  function updateSuggestions(){
    const input=$('#name-answer'),box=$('#name-suggestions');if(!input||!box)return;
    delete box.dataset.screenShortcuts;
    const target=byId.get(session.queue[session.index].id);
    qState.suggestions=qState.selected||!target.name?.trim()||target.name==='原文未命名'?[]:E.nameCompletions(scopeRecords(),input.value);
    qState.suggestionIndex=Math.min(qState.suggestionIndex||0,Math.max(0,qState.suggestions.length-1));
    box.hidden=!qState.suggestions.length;
    box.innerHTML=qState.suggestions.map((name,i)=>`<button type="button" id="suggestion-${i}" class="suggestion ${i===qState.suggestionIndex?'focused':''}" data-action="suggest" data-name="${attr(name)}" role="option" aria-selected="${i===qState.suggestionIndex}"><span class="record-name">${esc(name)}</span></button>`).join('');
    input.setAttribute('aria-expanded',String(!box.hidden));
    if(box.hidden)input.removeAttribute('aria-activedescendant');
    else input.setAttribute('aria-activedescendant','suggestion-'+qState.suggestionIndex);
  }
  function selectName(name){
    if(!qState.suggestions.includes(name))return;
    const input=$('#name-answer');if(!input)return;
    input.value=name;input.dispatchEvent(new Event('input',{bubbles:true}));
    qState.suggestions=[];$('#name-suggestions').hidden=true;
    input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');
    updateCheck();saveSession();input.focus({preventScroll:true});refreshAccessory();
  }
  function updateProofSuggestions(){
    const input=$('#proof-answer'),box=$('#proof-suggestions');if(!input||!box)return;
    delete box.dataset.screenShortcuts;
    qState.proofSuggestions=E.nameCompletions(proofRecords.flatMap(r=>r.proof.answers.map(name=>({name}))),input.value);
    qState.proofSuggestionIndex=Math.min(qState.proofSuggestionIndex||0,Math.max(0,qState.proofSuggestions.length-1));
    box.hidden=!qState.proofSuggestions.length;input.setAttribute('aria-expanded',String(!box.hidden));
    if(box.hidden)input.removeAttribute('aria-activedescendant');
    else input.setAttribute('aria-activedescendant','proof-suggestion-'+qState.proofSuggestionIndex);
    box.innerHTML=qState.proofSuggestions.map((name,i)=>`<button type="button" class="suggestion ${i===qState.proofSuggestionIndex?'focused':''}" id="proof-suggestion-${i}" data-action="proof-suggest" data-name="${attr(name)}" role="option" aria-selected="${i===qState.proofSuggestionIndex}"><span class="record-name">${esc(name)}</span></button>`).join('');
  }
  function selectProofName(name){const input=$('#proof-answer');if(!input)return;input.value=name;input.dispatchEvent(new Event('input',{bubbles:true}));$('#proof-suggestions').hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');input.focus({preventScroll:true});refreshAccessory();}
  function updateShortcutSuggestions(){
    const input=$('#symbol-answer')||$('#formula-answer')||$('#cloze-answer'),box=$('#shortcut-suggestions');if(!input||!box)return;
    const mode=session.queue[session.index].mode;
    const at=mode==='symbol'?E.shortcutPrefix(input.value.trim()):E.shortcutPrefix(input.value,input.selectionStart);
    const matches=at?E.shortcutSuggestions(at.prefix):[];
    qState.shortcutMatches=matches;qState.shortcutRange=at;
    qState.shortcutIndex=Math.min(qState.shortcutIndex||0,Math.max(0,matches.length-1));
    box.hidden=!matches.length;input.setAttribute('aria-expanded',String(!!matches.length));
    input.setAttribute('aria-activedescendant',matches.length?'shortcut-'+qState.shortcutIndex:'');
    box.innerHTML=matches.map(({key,symbol},i)=>`<button id="shortcut-${i}" class="suggestion ${i===qState.shortcutIndex?'focused':''}" data-action="shortcut" data-key="${attr(key)}" role="option" aria-selected="${i===qState.shortcutIndex}"><code>${esc(key)}</code> → <span class="math">${esc(symbol)}</span></button>`).join('');
  }
  function selectShortcut(key){
    if(!Object.hasOwn(E.SHORTCUTS,key))return;
    const mode=session.queue[session.index].mode,input=mode==='symbol'?$('#symbol-answer'):mode==='cloze'?$('#cloze-answer'):$('#formula-answer');if(!input)return;
    if(mode==='symbol'){input.value=key;input.setSelectionRange(key.length,key.length);}
    else{const at=qState.shortcutRange;if(!at)return;const end=input.selectionStart;input.value=input.value.slice(0,at.start)+E.SHORTCUTS[key]+input.value.slice(end);const caret=at.start+E.SHORTCUTS[key].length;input.setSelectionRange(caret,caret);}
    input.focus();input.dispatchEvent(new Event('input',{bubbles:true}));$('#shortcut-suggestions').hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');refreshAccessory();
  }
  function choose(id){if(qState.checked)return;qState.selected=id;$$('.choice').forEach(b=>{b.classList.toggle('selected',b.dataset.id===id);b.setAttribute('aria-pressed',b.dataset.id===id?'true':'false');});updateCheck();}
  function check(skip=false){
    if(!session||!qState||qState.checked)return;
    const q=session.queue[session.index],r=byId.get(q.id);let result={ok:false,message:'未作答，先记住这条定理的名称与公式。'},answer='';
    if(!skip){
      if(!canCheck())return;
      if(q.mode==='proof'){
        answer=qState.typed.trim();const ok=E.gradeProofName(r,answer);
        result={ok,message:ok?'定理名称正确。':'请填写原证明中使用的定理名称。'};
      }else if(q.mode==='name'||q.mode==='choice'){
        const judged=q.mode==='choice'?{ok:qState.selected===r.id,kind:'numbered'}:E.gradeName(quizRecords,r,{selectedId:qState.selected,groupSelected:qState.groupSelected,typed:qState.typed});
        answer=qState.selected?E.label(byId.get(qState.selected)):qState.groupSelected?r.name:qState.typed;
        result={ok:judged.ok,message:judged.ok?(judged.kind==='group'?'同组名称正确；未指定编号。':'名称与编号对应正确。'):'名称或所选编号与当前公式不对应。'};
      }else if(q.mode==='cloze'){
        const t=qState.cloze;
        answer=E.fillCloze(t,qState.clozeValues);
        const ok=E.gradeCloze(t,qState.clozeValues);
        result={ok,message:ok?'符号填空正确。':'有符号与原定理不一致，请逐空核对。'};
      }else if(q.mode==='symbol'){
        answer=qState.typed.trim();const ok=E.SHORTCUTS[answer]===qState.symbolTarget;
        result={ok,message:ok?'符号代码正确。':'请用反斜线代码输入显示的符号。'};
      }else{
        answer=q.mode==='blanks'?(E.fillTemplate(qState.template,qState.values||[])||''):qState.typed;
        if(q.mode==='blanks'&&!answer){toast('每个空只能填一个字母变量，如 p、p′ 或 n₀。');return;}
        result=q.mode==='blanks'?E.gradeBlanks(qState.template,qState.values||[]):
          (r.formulaVariants||[r.formula]).map(f=>E.compareFormula(f,answer)).find(v=>v.ok)||E.compareFormula(r.formula,answer);
      }
    }
    if(qState.assisted){result={...result,ok:false,message:'本次使用了提示，留待无提示时再练。'};}
    const ok=result.ok;const earned=E.applyAttempt(progress,r.id,q.mode,ok,answer,qState.assisted);
    session.combo=ok?session.combo+1:0;session.bestCombo=Math.max(session.bestCombo,session.combo);session.xp+=earned.xp;
    session.results.push({id:r.id,mode:q.mode,ok,retry:q.retry,assisted:qState.assisted});
    if(!ok&&settings.retry)session.queue=E.retryQuestion(session.queue,session.index);
    qState.checked=true;qState.answer=answer;qState.feedback={ok,message:result.message,xp:earned.xp};save();saveSession();beep(ok);renderQuiz();
  }
  function hintSourcesHTML(r){
    const locations=E.hintLocations(r,D.sources,D.weekBySource);
    if(!locations.length)return '<p class="small muted">暂无可核对的 notebook 出处。</p>';
    const years=[...new Set(locations.map(s=>s.year))];
    return `<p>出现位置（预载定理列表）：</p>${years.map(year=>{
      const notebooks=locations.filter(s=>s.year===year);
      return `<details data-hint-year="${year}" ${settings.scope.era==='all'||String(year).startsWith(settings.scope.era)||years.length===1?'open':''}><summary>${year===2025?'2025i':year} · ${notebooks.length} 份 notebook</summary><div class="source-list">${notebooks.map(s=>{
        const port=s.url?.match(/:(\d+)\//)?.[1],name=notebookNames[port]||shortSource(s.name);
        const week=s.weeks.length?s.weeks.map(n=>`Week ${n}`).join('、'):'Week 尚未归类';
        const link=/^https?:\/\//.test(s.url||'')?`<a href="${attr(s.url)}" target="_blank" rel="noopener noreferrer">${esc(name)}${port?` · notebook ${esc(port)}`:''}</a>`:esc(name);
        return `<div class="source-item" data-hint-source="${attr(s.sourceId)}"><strong>${esc(week)}</strong><br>${link}${s.sections.length?`<br>模块：${esc(s.sections.join('、'))}`:''}${s.lines.length?`<br>预载列表第 ${esc(s.lines.join('、'))} 行`:''}</div>`;
      }).join('')}</div></details>`;
    }).join('')}`;
  }
  function hint(){if(!qState||qState.checked)return;qState.assisted=true;const q=session.queue[session.index],r=byId.get(q.id),t=E.blankTemplate(r.formula);
    const text=q.mode==='cloze'?`共有 ${qState.cloze.blanks.length} 个符号空；每个位置都要按原定理填写。`:q.mode==='proof'?`名称以 ${r.proof.answers[0].slice(0,3)}… 开头。`:q.mode==='name'||q.mode==='choice'?`名称提示：${r.name==='原文未命名'?'这条定理原文没有名称，请按编号选择。':r.name.slice(0,3)+'…'}；主题：${r.topic}。`:q.mode==='symbol'?`代码以 ${Object.keys(E.SHORTCUTS).find(k=>E.SHORTCUTS[k]===qState.symbolTarget)?.slice(0,3)}… 开头；输入后可用候选补齐。`:`此公式有 ${t.variables.length} 个不同变量；常用原字母为 ${t.variables.join('、')||'无'}。${q.mode==='formula'?'主要符号：'+[...new Set(E.tokenize(r.formula).filter(x=>!E.isVariable(x)&&!['(',')'].includes(x)))].slice(0,14).join(' '):'同一个变量在不同空的位置要保持一致。'}`;
    const locations=q.mode==='proof'?`<p class="small muted">${esc(r.proof.notebook)} · ${esc(r.proof.proofLabel)} · 步骤 ${esc(r.proof.step)}</p>`:!r.name?.trim()||r.name==='原文未命名'||!r.numbers?.length?hintSourcesHTML(r):'';
    openModal('提示 · 本次将保留为待复练',`<p>${esc(text)}</p>${locations}<p class="small muted">先尝试完成；下一次不看提示再答对，才能推进错题修复。</p><div class="btn-row"><button class="btn primary" data-action="close-modal">继续作答</button></div>`);saveSession();}
  function nextQuestion(){
    if(!qState?.checked||$('#quiz-bottom')?.dataset.leaving)return;
    const state=qState,footer=$('#quiz-bottom');
    footer.dataset.leaving='true';footer.querySelector('[data-action=continue]').disabled=true;
    const advance=()=>{if(qState!==state||view!=='quiz')return;session.index++;session.state=null;qState=null;if(session.index>=session.queue.length){endSession();return;}saveSession();renderQuiz();window.scrollTo({top:0});};
    animateUI($('.feedback-backdrop'),[{opacity:1},{opacity:0}],160);
    const exit=animateUI(footer,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(12px)'}],160);
    if(exit)exit.finished.then(advance,advance);else advance();
  }
  function endSession(){
    if(!session)return;
    if(!session.finished){session.finished=true;const initial=session.results.filter(r=>!r.retry);progress.history.unshift({at:Date.now(),correct:initial.filter(r=>r.ok).length,total:initial.length,xp:session.xp});progress.history=progress.history.slice(0,100);save();}
    try{localStorage.removeItem(KEYS.session);}catch(_){}resume=null;view='result';renderResult();window.scrollTo({top:0});
  }
  function renderResult(){document.documentElement.classList.remove('answer-feedback-open');releaseScreenSuggestions();hideScreenKeyboard();document.body.dataset.view='result';if(!session){navigate('home');return;}const initial=session.results.filter(r=>!r.retry),good=initial.filter(r=>r.ok).length,missed=[...new Set(session.results.filter(r=>!r.ok).map(r=>r.id))];
    app.innerHTML=`<div class="quiz-shell"><main id="main" class="result" tabindex="-1"><div class="result-mark confetti" aria-hidden="true">✦</div><div class="eyebrow">LESSON COMPLETE</div><h1>${good===initial.length?'这一关，全都记住了！':'每一次回想，都有收获。'}</h1><p>${esc(session.label)} · 完成 ${initial.length} 道主问题${session.results.length>initial.length?'，加练 '+(session.results.length-initial.length)+' 道错题':''}</p><div class="result-stats"><div class="result-stat"><strong>+${session.xp}</strong><span>本关 XP</span></div><div class="result-stat"><strong>${initial.length?Math.round(good/initial.length*100):0}%</strong><span>首次作答正确率</span></div><div class="result-stat"><strong>${session.bestCombo}</strong><span>最高连续答对</span></div></div><div class="btn-row"><button class="btn primary" data-action="nav" data-view="home">回到闯关</button><button class="btn" data-action="result-retry" ${!missed.length?'disabled':''}>再练本关错题 (${missed.length})</button></div>${missed.length?`<details class="wrong-recap"><summary>本关需要再记一次的定理</summary>${missed.map(id=>`<button class="record-title" data-action="detail" data-id="${id}">${titleHTML(byId.get(id))}</button>`).join('')}</details>`:'<p class="small muted" style="margin-top:24px">把这份熟悉保留下来。之后也可以到定理库扩大范围。</p>'}<p class="small muted" style="margin-top:22px">${storageOK?(window.TQ_NATIVE?'学习记录已保存在此 App。':'学习记录已保存在这个浏览器。'):'本地保存不可用，请回设置页导出学习备份。'}</p></main></div>`;
  }
  function beep(ok){if(!settings.sound)return;try{const AC=window.AudioContext||window.webkitAudioContext,ctx=new AC(),osc=ctx.createOscillator(),gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.frequency.setValueAtTime(ok?660:240,ctx.currentTime);osc.frequency.setValueAtTime(ok?880:180,ctx.currentTime+.08);gain.gain.setValueAtTime(.055,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.22);osc.start();osc.stop(ctx.currentTime+.23);osc.onended=()=>ctx.close();}catch(_){} }
  function inputKey(text){
    if(qState?.checked)return;const mode=session.queue[session.index].mode;
    if(mode==='blanks'){
      let el=activeInput?.isConnected&&activeInput.matches('.blank-slot')?activeInput:$(`#blank-${qState.blankSlot??0}`)||$('.blank-slot:not(.filled)')||$('.blank-slot');if(!el)return;
      if(text==='CURSOR_LEFT'||text==='CURSOR_RIGHT'){const next=$(`#blank-${Number(el.dataset.slot)+(text==='CURSOR_LEFT'?-1:1)}`);if(next){next.focus({preventScroll:true});activeInput=next;}return;}
      if(text==='BACKSPACE')el.value='';else if(E.isVariable(text))el.value=text;else return;
      el.dispatchEvent(new Event('input',{bubbles:true}));el.focus({preventScroll:true});
      if(text!=='BACKSPACE'){const next=$(`#blank-${Number(el.dataset.slot)+1}`);if(next){next.focus({preventScroll:true});activeInput=next;}}return;
    }
    const el=$('#formula-answer');if(!el)return;let a=el.selectionStart??el.value.length,b=el.selectionEnd??a,value=el.value;
    if(text==='CURSOR_LEFT'||text==='CURSOR_RIGHT'){
      const caret=text==='CURSOR_LEFT'?(a===b&&a>0?a-Array.from(value.slice(0,a)).pop().length:a):(a===b&&b<value.length?b+Array.from(value.slice(b))[0].length:b);
      el.focus();el.setSelectionRange(caret,caret);return;
    }
    if(text==='CLEAR'){value='';a=0;}else if(text==='BACKSPACE'){if(a===b&&a>0)a-=Array.from(value.slice(0,a)).pop().length;value=value.slice(0,a)+value.slice(b);}
    else{const insert=text==='SPACE'?' ':text;const prefix=a>0&&!/\s$/.test(value.slice(0,a))&&text!=='SPACE'?' ':'';const content=prefix+insert+(text==='SPACE'?'':' ');value=value.slice(0,a)+content+value.slice(b);a+=content.length;}
    el.value=value;el.focus();el.setSelectionRange(a,a);el.dispatchEvent(new Event('input',{bubbles:true}));
  }
  function convertShortcutAtCaret(el,key){const end=el.selectionStart,head=el.value.slice(0,end);const match=Object.keys(E.SHORTCUTS).sort((a,b)=>b.length-a.length).find(k=>head.endsWith(k));if(!match)return false;
    const replacement=E.SHORTCUTS[match]+(key===' '?' ':''),start=end-match.length;el.value=el.value.slice(0,start)+replacement+el.value.slice(el.selectionEnd);const cursor=start+replacement.length;el.setSelectionRange(cursor,cursor);el.dispatchEvent(new Event('input',{bubbles:true}));return true;}
  function downloadJSON(obj,name){if(window.TQ_NATIVE){window.webkit.messageHandlers.quest.postMessage({action:'export',name,content:JSON.stringify(obj,null,2)});return;}const url=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
  function exportProgress(){downloadJSON({...progress,settings,exportedAt:new Date().toISOString(),app:'Theorem Quest'},'theorem-quest-progress-'+E.localDay()+'.json');toast('学习备份已导出。');}
  async function importProgress(file){if(!file)return;if(file.size>3*1024*1024){toast('备份文件超过 3 MB，未导入。');return;}try{const obj=JSON.parse(await file.text()),validated=E.validateProgress(obj,records.map(r=>r.id));openModal('替换当前学习记录？',`<p>此备份包含 ${Object.keys(validated.records).length} 条学习记录、${validated.xp} XP。</p><p class="small muted">导入会替换现有错题、收藏和学习历史。建议先导出当前备份。</p><div class="btn-row"><button class="btn" data-action="export-progress">先导出当前记录</button><button class="btn primary" id="confirm-import">确认导入</button><button class="btn" data-action="close-modal">取消</button></div>`);$('#confirm-import').addEventListener('click',()=>{progress=validated;if(obj.settings)settings=cleanSettings(obj.settings);save();saveSettings();applyAppearance();resume=null;session=null;qState=null;try{localStorage.removeItem(KEYS.session);}catch(_){}closeModal();navigate('settings');toast('备份已导入。');});}catch(e){toast('导入失败：'+e.message);}}
  const debounce=(fn,wait=170)=>{let timer;const run=(...a)=>{clearTimeout(timer);timer=setTimeout(()=>fn(...a),wait);};run.cancel=()=>clearTimeout(timer);return run;};
  const filterInput=debounce((id,k,value,caret)=>{settings.scope[k]=value;saveSettings();page=1;const previous=id?document.getElementById(id):null;if(id&&!previous)return;const restoreFocus=previous&&document.activeElement===previous;render();const el=id?document.getElementById(id):null;if(restoreFocus&&el){el.focus();el.setSelectionRange?.(caret,caret);}},220);
  const auditInput=debounce((value,caret)=>{auditQuery=value;auditPage=1;if(view!=='audit')return;const restoreFocus=document.activeElement===$('#audit-query');render();const el=$('#audit-query');if(restoreFocus){el?.focus();el?.setSelectionRange(caret,caret);}},220);
  document.addEventListener('input',ev=>{const el=ev.target;
    // Replacing a search field while the IME is composing discards its marked
    // text and interrupts Chinese input. Filter only the committed input event.
    if(ev.isComposing&&el.matches('[data-hint-query],input[data-filter],[data-audit-search]'))return;
    if(el.matches('#name-answer')){qState.typed=el.value;qState.selected=null;qState.groupSelected=false;qState.suggestionIndex=0;$$('[data-action="group-ref"]').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});$('#name-selection').hidden=true;updateSuggestions();updateCheck();}
    else if(el.matches('#formula-answer')){qState.typed=el.value;$('#formula-preview').textContent=E.normalizeInput(el.value);updateShortcutSuggestions();updateCheck();}
    else if(el.matches('#proof-answer')){qState.typed=el.value;qState.proofSuggestionIndex=0;updateProofSuggestions();updateCheck();}
    else if(el.matches('#symbol-answer')){qState.typed=el.value;updateShortcutSuggestions();updateCheck();}
    else if(el.matches('#cloze-answer')){const slot=qState.clozeSlot||0,value=E.normalizeInput(el.value).trim();qState.clozeValues[slot]=value;const button=$(`[data-action="cloze-slot"][data-slot="${slot}"]`);if(button){button.textContent=value||'？';button.classList.toggle('filled',!!value);}updateShortcutSuggestions();updateCheck();}
    else if(el.matches('.blank-slot')){qState.values=qState.values||Array(qState.template.blanks.length).fill('');qState.values[Number(el.dataset.slot)]=el.value.trim();el.classList.toggle('filled',!!el.value.trim());updateCheck();}
    else if(el.matches('[data-hint-query]')){const caret=el.selectionStart;settings.hintQuery=el.value;saveSettings();page=1;render();const input=$('#hint-query');input?.focus();input?.setSelectionRange(caret,caret);}
    else if(el.matches('input[data-filter]:not([type=checkbox])'))filterInput(el.id,el.dataset.filter,el.value,el.selectionStart);
    else if(el.matches('[data-audit-search]'))auditInput(el.value,el.selectionStart);
    if(view==='quiz'&&session&&qState)saveSession();
  });
  // One QWERTY keyboard serves every mobile text field. Readonly prevents iOS
  // from opening an input view; edits still use the same input/grading handlers.
  const screenKeyboardMedia=window.matchMedia('(max-width:760px), (pointer:coarse)');
  const screenKeyboard=document.createElement('section');
  screenKeyboard.id='screen-keyboard';screenKeyboard.className='screen-keyboard';screenKeyboard.hidden=true;
  screenKeyboard.setAttribute('role','group');screenKeyboard.setAttribute('aria-label','QWERTY keyboard');
  screenKeyboard.innerHTML='<div id="screen-suggestions"></div><div class="qwerty-toolbar"><span class="qwerty-context"></span><div><button type="button" data-qwerty-key="LEFT" aria-label="Cursor left">←</button><button type="button" data-qwerty-key="RIGHT" aria-label="Cursor right">→</button><button type="button" data-qwerty-key="DONE" aria-label="Done">⌄</button></div></div><div class="qwerty-rows" data-i18n-ignore></div>';
  document.body.append(screenKeyboard);
  let accessoryInput=null,accessoryComposing=false,screenShift=false,screenSuggestionHome=null,keyboardScrollFrame,screenPointerActive=false,screenPointerKey=false,nativeButtonInput=null;
  const screenEnabled=()=>!!window.TQ_NATIVE||screenKeyboardMedia.matches;
  function buttonFillMode(){return screenEnabled()&&!settings.fullKeyboard&&view==='quiz'&&session&&['blanks','cloze'].includes(session.queue[session.index]?.mode);}
  const editable=el=>el instanceof HTMLElement&&el.matches('textarea,input:not([type]),input[type=text],input[type=search]')&&!el.disabled&&el.dataset.buttonInput!=='true'&&(!el.readOnly||el.dataset.screenInput==='true');
  function prepareScreenInputs(){
    const enabled=screenEnabled();document.documentElement.classList.toggle('screen-input-enabled',enabled);
    const buttonInput=!!buttonFillMode()&&!qState?.checked&&!modalRoot.firstElementChild;
    if(window.TQ_NATIVE&&nativeButtonInput!==buttonInput){
      nativeButtonInput=buttonInput;
      window.webkit?.messageHandlers?.quest?.postMessage({action:'button-input',enabled:buttonInput});
    }
    document.documentElement.classList.toggle('button-fill-active',!!buttonFillMode());
    document.querySelectorAll('textarea,input:not([type]),input[type=text],input[type=search]').forEach(el=>{
      if(el.closest('.modal-exit'))return;
      if(el.dataset.buttonInput==='true'){el.readOnly=true;el.setAttribute('inputmode','none');return;}
      if(enabled){
        if(el.readOnly&&el.dataset.screenInput!=='true')return;
        if(el.dataset.screenInput!=='true'){el.dataset.originalInputmode=el.getAttribute('inputmode')??'';el.dataset.screenInput='true';}
        el.readOnly=true;el.setAttribute('inputmode','none');
      }else if(el.dataset.screenInput==='true'){
        el.readOnly=false;if(el.dataset.originalInputmode)el.setAttribute('inputmode',el.dataset.originalInputmode);else el.removeAttribute('inputmode');
        delete el.dataset.screenInput;delete el.dataset.originalInputmode;
      }
    });
    if(!enabled)hideScreenKeyboard();
  }
  function qwertyKey(key,label=key,className=''){
    const names={SHIFT:'Shift',BACKSPACE:'Backspace',TAB:'Tab',SPACE:'Space',ENTER:'Return'};
    return `<button type="button" class="qwerty-key ${className}" data-qwerty-key="${attr(key)}" aria-label="${attr(names[key]||key)}" ${key==='SHIFT'?`aria-pressed="${screenShift}"`:''}>${esc(label)}</button>`;
  }
  function renderQwerty(){
    const plain=['`','-','=','[',']','\\',';',"'",',','.','/'],shifted=['~','_','+','{','}','|',':','"','<','>','?'];
    const numbers='1234567890',numberShift='!@#$%^&*()';
    const letters=row=>[...row].map(ch=>qwertyKey(screenShift?ch.toUpperCase():ch)).join('');
    const rows=[
      `<div class="qwerty-row qwerty-punctuation">${plain.map((ch,i)=>qwertyKey(screenShift?shifted[i]:ch)).join('')}</div>`,
      `<div class="qwerty-row qwerty-numbers">${[...numbers].map((ch,i)=>qwertyKey(screenShift?numberShift[i]:ch)).join('')}</div>`,
      `<div class="qwerty-row">${letters('qwertyuiop')}</div>`,
      `<div class="qwerty-row qwerty-home">${letters('asdfghjkl')}</div>`,
      `<div class="qwerty-row">${qwertyKey('SHIFT','⇧','qwerty-modifier')}${letters('zxcvbnm')}${qwertyKey('BACKSPACE','⌫','qwerty-modifier')}</div>`,
      `<div class="qwerty-row qwerty-bottom">${qwertyKey('TAB','Tab','qwerty-tab')}${qwertyKey('SPACE','space','qwerty-space')}${qwertyKey('ENTER','return','qwerty-return')}</div>`
    ].join('');
    screenKeyboard.querySelector('.qwerty-rows').innerHTML=rows;
  }
  function releaseScreenSuggestions(){
    if(!screenSuggestionHome)return;
    const {box,anchor}=screenSuggestionHome;
    if(anchor.isConnected){anchor.replaceWith(box);}else box.remove();
    screenSuggestionHome=null;
  }
  function hideScreenKeyboard(){
    const box=screenSuggestionHome?.box;if(box)box.hidden=true;
    accessoryInput?.setAttribute('aria-expanded','false');accessoryInput?.removeAttribute('aria-activedescendant');
    modalRoot.querySelector('.modal')?.removeAttribute('aria-owns');
    releaseScreenSuggestions();screenKeyboard.hidden=true;
    document.documentElement.classList.remove('screen-keyboard-open');
    document.documentElement.style.setProperty('--screen-keyboard-height','0px');
  }
  function refreshScreenSuggestions(){
    if(!editable(accessoryInput)||!accessoryInput.isConnected)return;
    let box=accessoryInput.getAttribute('aria-controls')?document.getElementById(accessoryInput.getAttribute('aria-controls')):null;
    const at=E.shortcutPrefix(accessoryInput.value,accessoryInput.selectionStart),matches=at?E.shortcutSuggestions(at.prefix):[];
    const nameField=accessoryInput.matches('#name-answer,#proof-answer');
    if(box&&nameField){
      if(at){
        box.dataset.screenShortcuts='true';box.hidden=!matches.length;
        box.innerHTML=matches.map(({key,symbol},i)=>`<button type="button" id="screen-shortcut-${i}" class="suggestion ${i===0?'focused':''}" data-screen-completion="${attr(key)}" role="option" aria-selected="${i===0}"><code>${esc(key)}</code> → <span>${esc(symbol)}</span></button>`).join('');
        accessoryInput.setAttribute('aria-expanded',String(!!matches.length));
        if(matches.length)accessoryInput.setAttribute('aria-activedescendant','screen-shortcut-0');else accessoryInput.removeAttribute('aria-activedescendant');
      }else if(box.dataset.screenShortcuts){
        accessoryInput.id==='name-answer'?updateSuggestions():updateProofSuggestions();
      }
    }
    if(!box){
      let generic=document.getElementById('screen-completions');
      if(!generic){generic=document.createElement('div');generic.id='screen-completions';generic.className='autocomplete shortcut-suggestions';generic.setAttribute('role','listbox');generic.hidden=true;accessoryInput.after(generic);}
      generic.hidden=!matches.length;
      const markup=matches.map(({key,symbol})=>`<button type="button" class="suggestion" data-screen-completion="${attr(key)}" role="option"><code>${esc(key)}</code> → <span>${esc(symbol)}</span></button>`).join('');
      if(generic.innerHTML!==markup)generic.innerHTML=markup;
      box=generic;
    }
    if(screenSuggestionHome?.box!==box){
      releaseScreenSuggestions();
      if(box?.parentNode){const anchor=document.createComment('completion dropdown');box.before(anchor);screenSuggestionHome={box,anchor};screenKeyboard.querySelector('#screen-suggestions').append(box);}
    }
  }
  function refreshAccessory(){
    if(!screenEnabled()){hideScreenKeyboard();return;}
    // Keep geometry stable from touch-down through click. Reflowing the dock
    // during focus transfer can turn a field tap into a backdrop/slot tap.
    if(screenPointerActive)return;
    const focused=document.activeElement;
    if(editable(focused)){accessoryInput=focused;activeInput=focused;}
    if(!editable(accessoryInput)||!accessoryInput.isConnected||(!screenKeyboard.contains(focused)&&focused!==accessoryInput)){hideScreenKeyboard();return;}
    accessoryInput.closest('.modal')?.setAttribute('aria-owns','screen-keyboard');
    const opening=screenKeyboard.hidden;screenKeyboard.hidden=false;
    document.documentElement.classList.add('screen-keyboard-open');
    if(opening){screenShift=false;renderQwerty();}
    const context=accessoryInput.getAttribute('aria-label')||document.querySelector(`label[for="${accessoryInput.id}"]`)?.textContent||accessoryInput.placeholder||'QWERTY';
    screenKeyboard.querySelector('.qwerty-context').textContent=context;
    refreshScreenSuggestions();positionAccessory();
  }
  function positionAccessory(){
    const root=document.documentElement,viewport=window.visualViewport;
    root.style.setProperty('--viewport-height',`${viewport?.height||innerHeight}px`);
    root.style.setProperty('--keyboard-inset','0px');root.style.setProperty('--accessory-height','0px');root.classList.remove('keyboard-open');
    const footer=$('#quiz-bottom');root.style.setProperty('--quiz-footer-height',`${footer?.getBoundingClientRect().height||0}px`);
    const height=screenKeyboard.hidden?0:screenKeyboard.getBoundingClientRect().height;
    root.style.setProperty('--screen-keyboard-height',`${height}px`);
    cancelAnimationFrame(keyboardScrollFrame);if(height)keyboardScrollFrame=requestAnimationFrame(keepAnswerVisible);
  }
  function keepAnswerVisible(){
    const input=accessoryInput;if(screenKeyboard.hidden||!input?.isConnected)return;
    const panel=input.closest('.quiz-main')||input.closest('.modal');
    const rect=input.getBoundingClientRect(),keyboardRect=screenKeyboard.getBoundingClientRect();
    const bounds=panel?.getBoundingClientRect(),scrollable=panel&&/^(auto|scroll)$/.test(getComputedStyle(panel).overflowY);
    const top=scrollable?bounds.top+8:(window.visualViewport?.offsetTop||0)+8;
    const overlaps=rect.right>keyboardRect.left&&rect.left<keyboardRect.right;
    const bottom=scrollable?Math.min(bounds.bottom,overlaps?keyboardRect.top:innerHeight)-8:(overlaps?keyboardRect.top:innerHeight)-8;
    if(rect.bottom>bottom){const delta=rect.bottom-bottom;scrollable?panel.scrollBy(0,delta):window.scrollBy(0,delta);}
    else if(rect.top<top){const delta=rect.top-top;scrollable?panel.scrollBy(0,delta):window.scrollBy(0,delta);}
  }
  function replaceSelection(el,text,start=el.selectionStart??el.value.length,end=el.selectionEnd??start,caret=start+text.length){
    const value=el.value.slice(0,start)+text+el.value.slice(end);
    if(el.maxLength>=0&&value.length>el.maxLength)return;
    el.value=value;el.focus({preventScroll:true});el.setSelectionRange(caret,caret);
    el.dispatchEvent(new Event('input',{bubbles:true}));refreshAccessory();
  }
  function completeAccessory(key){
    const el=accessoryInput,at=el&&E.shortcutPrefix(el.value,el.selectionStart);
    if(!at||!Object.hasOwn(E.SHORTCUTS,key))return false;
    replaceSelection(el,el.id==='symbol-answer'?key:E.SHORTCUTS[key],at.start,el.selectionEnd);
    if(el.matches('#name-answer,#proof-answer')){positionAccessory();return true;}
    if(screenSuggestionHome?.box)screenSuggestionHome.box.hidden=true;
    el.setAttribute('aria-expanded','false');el.removeAttribute('aria-activedescendant');positionAccessory();return true;
  }
  function accessoryTab(){
    const el=accessoryInput;if(!el)return;
    const at=E.shortcutPrefix(el.value,el.selectionStart),matches=at?E.shortcutSuggestions(at.prefix):[];
    if(matches.length){completeAccessory(matches[el.matches('#name-answer,#proof-answer')?0:qState?.shortcutIndex||0]?.key||matches[0].key);return;}
    if(el.id==='name-answer'&&!$('#name-suggestions')?.hidden&&qState?.suggestions?.length){selectName(qState.suggestions[qState.suggestionIndex||0]);return;}
    if(el.id==='proof-answer'&&!$('#proof-suggestions')?.hidden&&qState?.proofSuggestions?.length){selectProofName(qState.proofSuggestions[qState.proofSuggestionIndex||0]);return;}
    if(el.id==='cloze-answer'){qState.clozeSlot=((qState.clozeSlot||0)+1)%qState.cloze.blanks.length;saveSession();renderQuiz();$('#cloze-answer')?.focus({preventScroll:true});refreshAccessory();return;}
    const root=el.closest('.modal')||app,fields=[...root.querySelectorAll('input,textarea')].filter(field=>editable(field)&&field.getClientRects().length);
    if(fields.length>1)fields[(fields.indexOf(el)+1)%fields.length].focus({preventScroll:true});
    refreshAccessory();
  }
  function editScreenKey(key){
    const el=accessoryInput;if(!editable(el)||!el.isConnected||accessoryComposing)return;
    if(key==='SHIFT'){screenShift=!screenShift;el.focus({preventScroll:true});renderQwerty();return;}
    if(key==='DONE'){el.blur();hideScreenKeyboard();return;}
    if(key==='TAB'){accessoryTab();refreshAccessory();return;}
    let start=el.selectionStart??0,end=el.selectionEnd??start;
    if(key==='LEFT'||key==='RIGHT'){
      if(el.matches('.blank-slot')&&start===end&&(key==='LEFT'&&start===0||key==='RIGHT'&&end===el.value.length)){const next=document.getElementById('blank-'+(Number(el.dataset.slot)+(key==='LEFT'?-1:1)));if(next){next.focus({preventScroll:true});refreshAccessory();return;}}
      const caret=key==='LEFT'?(start===end&&start>0?start-Array.from(el.value.slice(0,start)).pop().length:start):(start===end&&end<el.value.length?end+Array.from(el.value.slice(end))[0].length:end);
      el.focus({preventScroll:true});el.setSelectionRange(caret,caret);
      if(el.matches('#formula-answer,#symbol-answer,#cloze-answer'))updateShortcutSuggestions();refreshAccessory();return;
    }
    if(key==='BACKSPACE'){if(start===end&&start>0)start-=Array.from(el.value.slice(0,start)).pop().length;replaceSelection(el,'',start,end);return;}
    if(key==='ENTER'){
      if(screenShift&&el.matches('textarea')){replaceSelection(el,'\n');return;}
      const partial=E.shortcutPrefix(el.value,el.selectionStart);
      const completeCode=el.id==='symbol-answer'&&Object.hasOwn(E.SHORTCUTS,el.value.trim());
      if(!screenSuggestionHome?.box.hidden&&!completeCode&&(partial||el.matches('#name-answer,#proof-answer'))){accessoryTab();refreshAccessory();return;}
      if(el.closest('.quiz-main')){check();refreshAccessory();return;}
      const savePreset=el.id==='preset-name'&&$('#modal-root [data-action="confirm-preset"]');
      if(savePreset){savePreset.click();return;}el.blur();hideScreenKeyboard();return;
    }
    if(key==='SPACE'){
      if(el.matches('#formula-answer,#cloze-answer,.blank-slot,#name-answer,#proof-answer')&&convertShortcutAtCaret(el,' ')){refreshAccessory();return;}
      if(el.matches('.blank-slot')){accessoryTab();return;}
      replaceSelection(el,' ');return;
    }
    if([...key].length===1)replaceSelection(el,key);
  }
  document.addEventListener('pointerdown',ev=>{screenPointerActive=true;screenPointerKey=!!ev.target.closest('[data-qwerty-key]');},true);
  const finishScreenPointer=()=>{screenPointerActive=false;refreshAccessory();};
  document.addEventListener('pointerup',()=>{if(screenPointerKey)setTimeout(finishScreenPointer,0);},true);
  document.addEventListener('pointercancel',finishScreenPointer,true);
  document.addEventListener('click',()=>queueMicrotask(finishScreenPointer));
  screenKeyboard.addEventListener('pointerdown',ev=>{
    const button=ev.target.closest('[data-qwerty-key]');
    if(button&&ev.isPrimary&&ev.button===0){ev.preventDefault();editScreenKey(button.dataset.qwertyKey);}
  });
  screenKeyboard.addEventListener('touchstart',ev=>{if(ev.target.closest('[data-qwerty-key]'))ev.preventDefault();},{passive:false});
  screenKeyboard.addEventListener('mousedown',ev=>ev.preventDefault());
  screenKeyboard.addEventListener('click',ev=>{
    const button=ev.target.closest('[data-qwerty-key]');if(button&&ev.detail===0)editScreenKey(button.dataset.qwertyKey);
    const completion=ev.target.closest('[data-screen-completion]');if(completion)completeAccessory(completion.dataset.screenCompletion);
    refreshAccessory();
  });
  function selectBlank(el){
    if(qState?.checked||!el?.matches('.blank-slot')||el.disabled)return;
    activeInput=el;qState.blankSlot=Number(el.dataset.slot);
    document.querySelectorAll('.blank-slot').forEach(slot=>slot.classList.toggle('active',slot===el));
    saveSession();
  }
  // Readonly inputs do not consistently focus on an iOS tap. Record the
  // touched slot independently, keeping native scrolling intact until click.
  document.addEventListener('contextmenu',ev=>{if(ev.target.closest('[data-button-input]'))ev.preventDefault();});
  document.addEventListener('click',ev=>{const slot=ev.target.closest('.blank-slot');if(slot&&!slot.disabled){selectBlank(slot);slot.focus({preventScroll:true});}});
  document.addEventListener('focusin',ev=>{selectBlank(ev.target);if(ev.target.dataset?.buttonInput==='true')activeInput=ev.target;if(editable(ev.target)){accessoryInput=ev.target;activeInput=ev.target;refreshAccessory();}});
  document.addEventListener('focusout',()=>queueMicrotask(refreshAccessory));
  document.addEventListener('input',refreshAccessory);
  document.addEventListener('selectionchange',()=>{if(!screenKeyboard.hidden)refreshAccessory();});
  document.addEventListener('compositionstart',()=>{accessoryComposing=true;});
  document.addEventListener('compositionend',()=>{accessoryComposing=false;refreshAccessory();});
  document.addEventListener('keydown',ev=>{
    const el=ev.target;if(!screenEnabled()||el.dataset?.screenInput!=='true'||ev.isComposing||ev.metaKey||ev.ctrlKey||ev.altKey)return;
    if(ev.key.length===1||ev.key==='Backspace'||ev.key==='Delete'){
      ev.preventDefault();ev.stopImmediatePropagation();accessoryInput=el;
      if(ev.key==='Delete'){const start=el.selectionStart,end=el.selectionEnd;replaceSelection(el,'',start,end===start?start+(Array.from(el.value.slice(start))[0]?.length||0):end);}
      else editScreenKey(ev.key==='Backspace'?'BACKSPACE':ev.key===' '?'SPACE':ev.key);
    }
  },true);
  new ResizeObserver(positionAccessory).observe(screenKeyboard);
  window.visualViewport?.addEventListener('resize',positionAccessory);
  window.addEventListener('resize',()=>{prepareScreenInputs();refreshAccessory();positionAccessory();});
  screenKeyboardMedia.addEventListener('change',()=>{prepareScreenInputs();refreshAccessory();});
  document.addEventListener('touchmove',ev=>{if(ev.target.closest('.feedback-backdrop,[data-backdrop]')&&!ev.target.closest('.modal'))ev.preventDefault();},{passive:false});
  document.addEventListener('toggle',ev=>{if(ev.target instanceof HTMLDetailsElement&&ev.target.open){Array.from(ev.target.children).filter(el=>el.tagName!=='SUMMARY').forEach(el=>animateUI(el,[{opacity:0},{opacity:1}],160));}},true);
  document.addEventListener('mousedown',ev=>{if(ev.target.closest('[data-action="key"],[data-action="key-tab"],[data-action="shortcut"]'))ev.preventDefault();});
  // WebKit suppresses a tap's click when pointerdown is canceled. Cancel the
  // later mouse focus default instead, so touch scrolling and click work.
  document.addEventListener('mousedown',ev=>{if(ev.target.closest('[data-action="suggest"],[data-action="proof-suggest"]'))ev.preventDefault();});
  document.addEventListener('change',ev=>{const el=ev.target;
    if(el.matches('[data-setting-mode]')){const m=el.dataset.settingMode;settings.modes=el.checked?[...new Set([...settings.modes,m])]:settings.modes.filter(x=>x!==m);saveSettings();if(modalRoot.innerHTML){const b=$('[data-action="modal-start"]');if(b)b.disabled=!settings.modes.length||!scopeRecords().length;}else if(view==='settings'){render();document.querySelector(`[data-setting-mode="${m}"]`)?.focus({preventScroll:true});}}
    else if(el.matches('[data-setting]')){const k=el.dataset.setting;if(k==='language'||k==='appearance'){settings[k]=el.value;saveSettings();applyAppearance();render();localizeUI();document.querySelector(`[data-setting="${k}"]`)?.focus({preventScroll:true});return;}settings[k]=el.type==='checkbox'?el.checked:Number(el.value);saveSettings();const b=$('[data-action="modal-start"]');if(b)b.textContent=`开始 ${settings.count} 题`;}
    else if(el.matches('select[data-filter],input[type=checkbox][data-filter]')){settings.scope[el.dataset.filter]=el.type==='checkbox'?el.checked:el.value;if(el.dataset.filter==='documentFocus'){settings.scope.important=false;settings.scope.repeated=false;}if(el.dataset.filter==='era'){settings.scope.notebook='';settings.scope.week='';settings.scope.archiveWeek='';settings.scope.topic='';settings.scope.source='';}saveSettings();page=1;render();}
    else if(el.matches('[data-select]')){const id=el.dataset.select;settings.scope.selected=el.checked?[...new Set([...settings.scope.selected,id])]:settings.scope.selected.filter(v=>v!==id);settings.scope.manual=true;saveSettings();render();}
    else if(el.matches('[data-preset]')&&el.value!==''){filterInput.cancel();settings.scope=cleanSettings({scope:settings.presets[Number(el.value)].scope}).scope;saveSettings();page=1;render();}
    else if(el.matches('#backup-file'))importProgress(el.files[0]);
  });
  document.addEventListener('click',async ev=>{
    const b=ev.target.closest('[data-action]');if(!b||b.disabled){if(ev.target.matches('[data-backdrop]'))closeModal();return;}
    const a=b.dataset.action,id=b.dataset.id;
    switch(a){
      case 'proof-suggest':selectProofName(b.dataset.name);break;
      case 'nav':closeModal();navigate(b.dataset.view);break;
      case 'configure':configure();break;
      case 'modal-start':launch(scopeRecords());break;
      case 'modal-library':closeModal();navigate('library');break;
      case 'start':launch(scopeRecords(),FOCUS[settings.scope.documentFocus]==='全部定理'?'自由练习':FOCUS[settings.scope.documentFocus]+' · 专项复习');break;
      case 'focus-list':case 'focus-practice':{settings.scope.documentFocus=b.dataset.focus;settings.scope.important=false;settings.scope.repeated=false;settings.scope.manual=false;saveSettings();page=1;if(a==='focus-practice')launch(scopeRecords(),FOCUS[b.dataset.focus]+' · 专项复习');else render();break;}
      case 'hint-list':settings.hintList=b.dataset.mode;saveSettings();page=1;render();break;
      case 'hint-practice':launch(hintPracticeCards(),settings.hintList==='repeated'?'重复 Hint 定理 · 专项复习':'Hint 定理 · 专项复习');break;
      case 'start-topic':launch(scopeRecords().filter(r=>r.topic===b.dataset.topic),b.dataset.topic);break;
      case 'practice-one':launch([byId.get(id)],E.label(byId.get(id)),false,Math.min(settings.count,5));break;
      case 'resume':session=cleanSession(resume);if(session){qState=session.state;view='quiz';render();}else toast('上次关卡已结束。');break;
      case 'exit-quiz':saveSession();navigate('home');break;
      case 'choose':choose(id);break;
      case 'cloze-slot':if(!qState.checked){qState.clozeSlot=Number(b.dataset.slot);saveSession();renderQuiz();$('#cloze-answer')?.focus({preventScroll:true});}break;
      case 'cloze-prev':case 'cloze-next':case 'cloze-delete':if(!qState.checked){const slot=qState.clozeSlot||0;if(a==='cloze-delete')qState.clozeValues[slot]='';else qState.clozeSlot=Math.max(0,Math.min(qState.cloze.blanks.length-1,slot+(a==='cloze-next'?1:-1)));saveSession();renderQuiz();}break;
      case 'cloze-key':if(!qState.checked&&qState.cloze?.options.includes(b.dataset.token)){const slot=qState.clozeSlot||0;qState.clozeValues[slot]=b.dataset.token;qState.clozeSlot=Math.min(slot+1,qState.cloze.blanks.length-1);saveSession();renderQuiz();}break;
      case 'group-ref':qState.groupSelected=true;qState.selected=id;saveSession();renderQuiz();break;
      case 'suggest':selectName(b.dataset.name);break;
      case 'shortcut':selectShortcut(b.dataset.key);break;
      case 'check':check();break;
      case 'skip':check(true);break;
      case 'hint':hint();break;
      case 'continue':nextQuestion();break;
      case 'key':inputKey(b.dataset.key);break;
      case 'key-tab':qState.keys=b.dataset.tab;$('#keyboard').innerHTML=keyboardHTML('formula',byId.get(session.queue[session.index].id));break;
      case 'detail':detail(id);break;
      case 'close-modal':closeModal();break;
      case 'star':{const yes=progress.stars.includes(id);progress.stars=yes?progress.stars.filter(x=>x!==id):[...progress.stars,id];save();b.textContent=yes?'☆':'★';b.classList.toggle('is-starred',!yes);b.setAttribute('aria-pressed',!yes?'true':'false');toast(yes?'已取消收藏。':'已加入个人收藏；不改变原文 Important 标记。');if(view!=='quiz'&&!modalRoot.innerHTML)render();break;}
      case 'copy-formula':if(window.TQ_NATIVE){window.webkit.messageHandlers.quest.postMessage({action:'copy',text:byId.get(id).formula});toast('公式已复制。');break;}try{await navigator.clipboard.writeText(byId.get(id).formula);toast('公式已复制。');}catch(_){const t=document.createElement('textarea');t.value=byId.get(id).formula;document.body.append(t);t.select();document.execCommand('copy');t.remove();toast('公式已复制。');}break;
      case 'library-page':page=Math.max(1,Number(b.dataset.page));render();window.scrollTo({top:0});break;
      case 'audit-page':auditPage=Math.max(1,Number(b.dataset.page));render();$('#audit-query')?.scrollIntoView({block:'start'});break;
      case 'reset-filters':filterInput.cancel();settings.scope=JSON.parse(JSON.stringify(defaults.scope));saveSettings();page=1;render();toast('已重设为 2026 定理与已完成证明。');break;
      case 'select-filtered':settings.scope.selected=[...new Set([...settings.scope.selected,...visibleRecords().map(r=>r.id)])];settings.scope.manual=true;saveSettings();render();break;
      case 'clear-selection':settings.scope.selected=[];settings.scope.manual=false;saveSettings();render();break;
      case 'save-preset':openModal('保存记忆范围',`<label class="field-label" for="preset-name">范围名称</label><input class="input" id="preset-name" maxlength="50" placeholder="例如 Midterm 1 · 蕴含"><p class="small muted">保存当前筛选及手选的 ${settings.scope.selected.length} 个条目。</p><div class="btn-row"><button class="btn primary" data-action="confirm-preset">保存</button></div>`);break;
      case 'confirm-preset':{const name=$('#preset-name')?.value.trim();if(!name){toast('先给范围取个名字。');break;}settings.presets=settings.presets.filter(p=>p.name!==name);settings.presets.unshift({name,scope:JSON.parse(JSON.stringify(settings.scope))});settings.presets=settings.presets.slice(0,25);saveSettings();closeModal();render();toast('范围已保存。');break;}
      case 'wrong-tab':wrongTab=b.dataset.tab;page=1;render();break;
      case 'review-all':launch(records.filter(r=>progress.records[r.id]?.active),'错题专练',true);break;
      case 'review-scope':launch(scopeRecords().filter(r=>progress.records[r.id]?.active),'当前范围 · 错题专练',true);break;
      case 'review-one':launch([byId.get(id)],'单条错题复练',!!progress.records[id]?.active,Math.min(5,settings.count));break;
      case 'result-retry':{const ids=[...new Set(session.results.filter(x=>!x.ok).map(x=>x.id))];const rows=ids.map(id=>byId.get(id));launch(rows,'本关错题复练',rows.some(r=>progress.records[r.id]?.active),Math.min(settings.count,Math.max(2,rows.length*2)));break;}
      case 'bank-entrance':if(window.TQ_NATIVE)window.webkit.messageHandlers.quest.postMessage({action:'updates'});else{navigate('settings');$('#bank-updates')?.scrollIntoView({block:'center'});}break;
      case 'check-bank-update':updateBank();break;
      case 'native-updates':if(window.TQ_NATIVE)window.webkit.messageHandlers.quest.postMessage({action:'updates'});break;
      case 'export-progress':exportProgress();break;
      case 'import-progress':$('#backup-file')?.click();break;
      case 'export-bank':downloadJSON({schemaVersion:1,coverage:D.coverage,theorems:records,sources:D.sources,review:D.review},'theorem-quest-bank.json');break;
      case 'shortcuts':shortcuts();break;
      case 'clear-progress':openModal('清空全部学习记录？','<p>将删除本浏览器中的错题、XP、收藏、历史和未完成关卡。题库和筛选不会删除。</p><div class="btn-row"><button class="btn" data-action="export-progress">先导出备份</button><button class="btn danger" data-action="confirm-clear">确认清空</button><button class="btn" data-action="close-modal">取消</button></div>');break;
      case 'confirm-clear':progress=E.freshProgress();save();resume=session=qState=null;try{localStorage.removeItem(KEYS.session);}catch(_){}closeModal();navigate('settings');toast('学习记录已清空。');break;
    }
    if(view==='quiz'&&session&&qState)saveSession();
  });
  window.addEventListener('pagehide',()=>{if(view==='quiz')saveSession();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&view==='quiz')saveSession();});
  document.addEventListener('keydown',ev=>{
    if(modalRoot.innerHTML){
      if(ev.key==='Escape'){ev.preventDefault();closeModal();return;}
      if(ev.key==='Tab'){
        const f=[...modalRoot.querySelectorAll('button,input,select,textarea,a[href],summary,[tabindex]'),...(!screenKeyboard.hidden&&accessoryInput?.closest('.modal')?screenKeyboard.querySelectorAll('button'):[])].filter(el=>!el.disabled&&el.tabIndex>=0&&el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden');
        const first=f[0],last=f[f.length-1],outside=!f.includes(document.activeElement);
        if(outside||ev.shiftKey&&document.activeElement===first||!ev.shiftKey&&document.activeElement===last){ev.preventDefault();(ev.shiftKey?last:first)?.focus();}
      }return;
    }
    if(view!=='quiz'||!session||!qState||ev.isComposing)return;
    const el=ev.target,mode=session.queue[session.index].mode;
    if(qState.checked){if(ev.key==='Enter'&&!el.matches('button,summary')){ev.preventDefault();nextQuestion();}return;}
    if(el.matches('#formula-answer,#symbol-answer,#cloze-answer')&&!$('#shortcut-suggestions')?.hidden&&qState.shortcutMatches?.length){
      if(ev.key==='ArrowDown'||ev.key==='ArrowUp'){ev.preventDefault();qState.shortcutIndex=(qState.shortcutIndex+(ev.key==='ArrowDown'?1:-1)+qState.shortcutMatches.length)%qState.shortcutMatches.length;updateShortcutSuggestions();$('#shortcut-'+qState.shortcutIndex)?.scrollIntoView({block:'nearest'});return;}
      if(ev.key==='Tab'||ev.key==='Enter'&&(mode==='formula'||mode==='cloze'||!Object.hasOwn(E.SHORTCUTS,el.value.trim()))){ev.preventDefault();selectShortcut(qState.shortcutMatches[qState.shortcutIndex||0].key);return;}
    }
    if(el.matches('#formula-answer,#cloze-answer')&&(ev.key==='Tab'||ev.key===' ')){if(convertShortcutAtCaret(el,ev.key)){ev.preventDefault();return;}}
    if(el.matches('#cloze-answer')&&ev.key==='Tab'){
      const next=(qState.clozeSlot||0)+(ev.shiftKey?-1:1);
      if(next>=0&&next<qState.cloze.blanks.length){ev.preventDefault();qState.clozeSlot=next;saveSession();renderQuiz();$('#cloze-answer')?.focus({preventScroll:true});}
      return;
    }
    if(el.matches('#name-answer')&&!$('#name-suggestions').hidden&&qState.suggestions?.length){
      if(ev.key==='ArrowDown'||ev.key==='ArrowUp'){ev.preventDefault();qState.suggestionIndex=(qState.suggestionIndex+(ev.key==='ArrowDown'?1:-1)+qState.suggestions.length)%qState.suggestions.length;updateSuggestions();$('#suggestion-'+qState.suggestionIndex)?.scrollIntoView({block:'nearest'});return;}
      if(ev.key==='Tab'||ev.key==='Enter'){ev.preventDefault();selectName(qState.suggestions[qState.suggestionIndex||0]);return;}
    }
    if(el.matches('#proof-answer')&&!$('#proof-suggestions')?.hidden&&qState.proofSuggestions?.length){
      if(ev.key==='ArrowDown'||ev.key==='ArrowUp'){ev.preventDefault();qState.proofSuggestionIndex=(qState.proofSuggestionIndex+(ev.key==='ArrowDown'?1:-1)+qState.proofSuggestions.length)%qState.proofSuggestions.length;updateProofSuggestions();return;}
      if(ev.key==='Tab'||ev.key==='Enter'){ev.preventDefault();selectProofName(qState.proofSuggestions[qState.proofSuggestionIndex||0]);return;}
    }
    if(el.matches('.blank-slot')&&ev.key==='Tab'&&E.shortcutPrefix(el.value,el.selectionStart)){const matches=E.shortcutSuggestions(E.shortcutPrefix(el.value,el.selectionStart).prefix);if(matches.length){ev.preventDefault();completeAccessory(matches[0].key);return;}}
    if(el.matches('.blank-slot')&&ev.key===' '){ev.preventDefault();$(`#blank-${Number(el.dataset.slot)+1}`)?.focus();return;}
    if(mode==='choice'&&/^[1-4]$/.test(ev.key)&&!el.matches('input,textarea')){ev.preventDefault();const id=qState.options[Number(ev.key)-1];if(id)choose(id);return;}
    if(ev.key==='Enter'&&!ev.shiftKey&&!el.matches('button')){ev.preventDefault();check();}
  });
  // Expose a read-only diagnostics snapshot, never a way to bypass grading.
  window.TQDiagnostics=()=>({view,bankRevision,bankBusy,bankMessage,cardCount:quizRecords.length,proofCount:proofRecords.length,scopeCount:scopeRecords().length,modes:settings.modes.slice(),choiceDifficulty:settings.choiceDifficulty,sessionDifficulty:session?.choiceDifficulty,question:session&&session.index<session.queue.length?{...session.queue[session.index]}:null,checked:!!qState?.checked,storageOK});
  render();localizeUI();
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)&&!window.TQ_PORTABLE)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
