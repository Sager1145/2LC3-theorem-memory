/* Theorem Quest — fully static app. All source strings are escaped before rendering. */
(() => {
  'use strict';
  const E = window.TQEngine, D = window.THEOREM_DATA;
  const app = document.querySelector('#app'), modalRoot = document.querySelector('#modal-root');
  if (!E || !D?.theorems?.length) { app.textContent = '题库没有载入。请保留 assets 文件夹，或使用随附的单文件版本。'; return; }
  const records = D.theorems, byId = new Map(records.map(r=>[r.id,r])), sourceMap = new Map(D.sources.map(s=>[s.id,s]));
  const KEYS = {progress:'tq.progress.v1', settings:'tq.settings.v1', session:'tq.session.v1'};
  const MODE = {
    name:{title:'名称回忆',icon:'Aa',prompt:'这条定理叫什么？',desc:'输入前三个字符，补全名称与编号'},
    choice:{title:'名称选择',icon:'☷',prompt:'为公式选择正确的定理',desc:'从名称与编号列表中选择'},
    blanks:{title:'字母填空',icon:'_p',prompt:'补上字母，还原这条定理',desc:'符号已给出，允许一致改名'},
    formula:{title:'公式拼写',icon:'∧',prompt:'写出这条定理的内容',desc:'符号按键，或 CalcCheck 风格输入'}
  };
  const defaults = {modes:['name','choice','blanks','formula'],count:10,goal:20,sound:false,retry:true,scope:{query:'',topic:'',source:'',range:'',era:'current',important:false,repeated:false,starred:false,wrong:false,manual:false,selected:[]},presets:[]};
  let storageOK=true, toastTimer, activeInput=null, lastFocus=null, view='home', page=1, wrongTab='active', auditQuery='', auditPage=1, session=null, qState=null;
  const esc = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const attr=esc, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  function load(key,fallback){try{const x=localStorage.getItem(key);return x?JSON.parse(x):fallback;}catch(_){storageOK=false;return fallback;}}
  function write(key,obj){try{localStorage.setItem(key,JSON.stringify(obj));}catch(_){storageOK=false;$('#storage-warning').hidden=false;}}
  let progress;
  try {progress=E.validateProgress(load(KEYS.progress,E.freshProgress()),records.map(r=>r.id));}catch(_){progress=E.freshProgress();}
  let settings=cleanSettings(load(KEYS.settings,defaults));
  let resume=cleanSession(load(KEYS.session,null));
  $('#storage-warning').hidden=storageOK;
  function cleanSettings(x){
    const o=JSON.parse(JSON.stringify(defaults));if(!x||typeof x!=='object')return o;
    o.modes=Array.isArray(x.modes)?[...new Set(x.modes.filter(m=>MODE[m]))]:o.modes;
    o.count=Number.isInteger(x.count)?Math.min(50,Math.max(1,x.count)):10;
    o.goal=[10,20,30,50].includes(x.goal)?x.goal:20;o.sound=!!x.sound;o.retry=x.retry!==false;
    const s=x.scope;if(s&&typeof s==='object'){
      for(const k of ['query','topic','source','range','era'])if(typeof s[k]==='string')o.scope[k]=s[k].slice(0,200);
      for(const k of ['important','repeated','starred','wrong','manual'])o.scope[k]=!!s[k];
      o.scope.selected=Array.isArray(s.selected)?[...new Set(s.selected.filter(id=>byId.has(id)))]:[];
    }
    if(Array.isArray(x.presets))o.presets=x.presets.slice(0,25).filter(p=>p&&typeof p.name==='string'&&p.scope).map(p=>({name:p.name.slice(0,50),scope:cleanSettings({scope:p.scope}).scope}));
    return o;
  }
  function cleanSession(x){
    if(!x||!Array.isArray(x.queue)||x.queue.length>300||!Number.isInteger(x.index)||x.index<0||x.index>=x.queue.length)return null;
    if(x.queue.some(v=>!v||!byId.has(v.id)||!MODE[v.mode]))return null;
    return {...x,queue:x.queue.map(v=>({id:v.id,mode:v.mode,retry:Math.min(2,Math.max(0,v.retry||0))})),label:String(x.label||'自由练习').slice(0,100),results:Array.isArray(x.results)?x.results.slice(0,300):[],combo:Number(x.combo)||0,bestCombo:Number(x.bestCombo)||0,xp:Number(x.xp)||0,state:x.state&&typeof x.state==='object'?x.state:null};
  }
  const save=()=>write(KEYS.progress,progress), saveSettings=()=>write(KEYS.settings,settings);
  function saveSession(){if(session){session.state=qState;write(KEYS.session,session);resume=session;}}
  function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3300);}
  function titleHTML(r){return `<span class="record-ref">${esc(r.displayRef)}</span><span class="record-name">${esc(r.name)}</span>`;}
  const totalWrong=()=>records.filter(r=>progress.records[r.id]?.active).length;
  const mastered=()=>records.filter(r=>(progress.records[r.id]?.streak||0)>=3).length;
  function dateText(n){return n?new Date(n).toLocaleString('zh-CN',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):'尚未练习';}
  function streakDays(){let n=0,d=new Date();if(!progress.days[E.localDay(d)])d.setDate(d.getDate()-1);while(progress.days[E.localDay(d)]&&n<10000){n++;d.setDate(d.getDate()-1);}return n;}
  function badges(r,extra=true){
    const p=progress.records[r.id];return `<div class="badge-row">${r.important?'<span class="badge important" title="原资料 Important 标题明确覆盖">★ IMPORTANT</span>':''}${r.emphasisEvidence?.length?'<span class="badge important" title="原资料感叹号强调，与 Important 标签分开">原文 !!</span>':''}${r.repeated?`<span class="badge repeat" title="按来源家族去重的名称或编号引用，可能包含同名变体">↻ 引用 ${r.countLowerBound?'≥ ':''}${r.occurrences} 次</span>`:''}${p?.active?'<span class="badge wrong">待复练</span>':p?.streak>=3?'<span class="badge good">已熟悉</span>':''}${extra?`<span class="badge">${esc(r.topic)}</span><span class="badge">${r.current?'当前笔记 / 提供材料':'2025 扩展课件'}</span>`:''}${r.domain?`<span class="badge">${esc(r.domain)}</span>`:''}</div>`;
  }
  function visibleRecords(){
    const f=settings.scope;let rs=records.filter(r=>(!f.topic||r.topic===f.topic)&&(!f.source||r.sources.some(s=>s.sourceId===f.source))&&
      (f.era==='all'||(f.era==='historical'?!r.current:r.current))&&(!f.important||r.important)&&(!f.repeated||r.repeated)&&(!f.starred||progress.stars.includes(r.id))&&(!f.wrong||progress.records[r.id]?.active)&&E.referenceInRange(r.numbers,f.range));
    if(f.query)rs=E.searchRecords(rs,f.query);return rs;
  }
  function scopeRecords(){const rs=visibleRecords();return settings.scope.manual?rs.filter(r=>settings.scope.selected.includes(r.id)):rs;}
  function navigate(next){view=next;page=1;render();window.scrollTo({top:0});requestAnimationFrame(()=>$('#main')?.focus({preventScroll:true}));}
  function render(){
    if(view==='quiz'){renderQuiz();return;}if(view==='result'){renderResult();return;}
    const nav=[['home','⌂','闯关'],['library','▤','定理库'],['mistakes','↺','错题本'],['audit','◎','资料审计'],['settings','⚙','设置']];
    app.innerHTML=`<div class="app-shell"><aside class="sidebar"><button class="brand" data-action="nav" data-view="home" aria-label="Theorem Quest 首页"><span class="mark" aria-hidden="true">∴</span><span><strong>Theorem<br>Quest</strong><br><small>定理闯关</small></span></button><nav class="nav" aria-label="主要导航">${nav.map(([id,ico,name])=>`<button class="nav-btn ${view===id?'active':''}" data-action="nav" data-view="${id}" ${view===id?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${ico}</span><span>${name}</span>${id==='mistakes'&&totalWrong()?`<span class="nav-count">${totalWrong()}</span>`:''}</button>`).join('')}</nav><div class="sidebar-foot">COMPSCI 2LC3<br>一条定理，一次进步。<br><br>本地保存 · 无需登录<br>独立学习工具，非课程官方产品。</div></aside><main id="main" class="main-area" tabindex="-1"><header class="topbar"><div class="course-chip">COMPSCI 2LC3 <span aria-hidden="true">/</span> LOGICAL REASONING</div><div class="stats-line"><span class="stat-gold" title="连续练习天数">ϟ ${streakDays()} 天</span><span class="stat-green" title="学习经验值">✦ ${progress.xp} XP</span></div></header>${({home:renderHome,library:renderLibrary,mistakes:renderMistakes,audit:renderAudit,settings:renderSettings})[view]()}</main></div>`;
  }
  function renderHome(){
    const rs=scopeRecords(),today=progress.days[E.localDay()]||0;
    const units=[['等式与基本规则','整数与代数'],['等价、否定与异或','析取 ∨','合取 ∧','蕴含 ⇒'],['替换与 Leibniz','序与单调性','自然数与归纳','命令正确性','Knights & Knaves'],['量词与谓词逻辑','集合与关系','关系、序列与后期内容']];
    const unitNames=['先把基础搭牢','命题逻辑探险','从定理走向证明','扩展资料 · 自由探索'];
    const topics=[...new Set(rs.map(r=>r.topic))];let used=new Set();
    const path=units.map((arr,i)=>{
      const list=arr.filter(t=>topics.includes(t));list.forEach(t=>used.add(t));if(!list.length)return '';
      return `<section class="unit"><div class="unit-title"><span class="unit-no">${String(i+1).padStart(2,'0')}</span><div><h3>${unitNames[i]}</h3><div class="unit-caption">自由选择 · 不锁关 · 每关 ${settings.count} 题</div></div></div><div class="path">${list.map((t,j)=>pathNode(t,i,j,rs)).join('')}</div></section>`;
    }).join('')+topics.filter(t=>!used.has(t)).map((t,j)=>pathNode(t,3,j,rs)).join('');
    const week=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));return `<span class="day ${progress.days[E.localDay(d)]?'done':''} ${i===6?'today':''}" title="${E.localDay(d)} · ${progress.days[E.localDay(d)]||0} 题">${['日','一','二','三','四','五','六'][d.getDay()]}</span>`;}).join('');
    return `<div class="home-grid"><div><div class="heading-row"><div><div class="eyebrow">小步练习，记住大结构</div><h1>今天也来一小关。</h1><p class="subhead">不只认得名字，也能把公式写出来。</p></div><button class="btn small" data-action="configure">配置练习</button></div><section class="card hero"><span class="mark" aria-hidden="true">∴</span><div class="eyebrow">YOUR DAILY QUEST</div><h2>${rs.length?'把熟悉的定理，变成直觉。':'先选一组想记住的定理。'}</h2><p>${rs.length?`当前范围 ${rs.length} 条，${settings.modes.length} 种题型随机出题。答错没有惩罚，稍后再试一次。`:'当前筛选没有条目。调整章节、编号范围，或取消手选限制即可开始。'}</p><button class="btn primary" data-action="start" ${!rs.length||!settings.modes.length?'disabled':''}>开始 ${settings.count} 题挑战 <span aria-hidden="true">→</span></button>${resume?'<button class="btn small" data-action="resume" style="margin-left:8px">继续上次关卡</button>':''}</section><div class="scope-summary"><span>${settings.scope.era==='all'?'全部已整理材料':settings.scope.era==='historical'?'2025 扩展课件':'当前笔记与已提供练习'} · ${settings.scope.manual?'手选范围':'筛选范围'}</span><button data-action="nav" data-view="library">调整记忆范围</button></div>${path||emptyHTML('范围里暂时没有定理','到定理库重设范围；你也可以一条一条勾选。','library','选择定理')}<div class="coverage-note">资料状态：${records.length} 条已整理卡片，${D.review.length} 条待核对候选。${D.coverage.completeProjectAccess?'':'部分 Project 附件无法读取，未宣称已覆盖整个 Project。'} <a data-action="nav" data-view="audit">查看覆盖与来源</a></div></div><aside class="home-side"><section class="card side-card"><div class="heading-row" style="margin-bottom:8px"><h3>每日练习目标</h3><span class="stat-gold">ϟ</span></div><p>坚持一点，比一次记很多更容易。</p><div class="week-strip">${week}</div><div class="meter"><span style="width:${Math.min(100,today/settings.goal*100)}%"></span></div><div class="metric-row"><span>${today} / ${settings.goal} 题</span><strong>${today>=settings.goal?'今日完成 ✓':'继续积累'}</strong></div></section><section class="card side-card"><h3>再给错题一次机会</h3><p>${totalWrong()?`${totalWrong()} 条定理等待复练。每种错题型连续答对 2 次后，就会移出待复练列表。`:'这里没有待复练的错题。遇到不熟悉的内容，我们会帮你留下来。'}</p><button class="btn wide ${totalWrong()?'primary':''}" data-action="review-all" style="margin-top:16px" ${!totalWrong()?'disabled':''}>错题复练 ${totalWrong()?'↺':''}</button></section><section class="card side-card"><h3>你的定理收藏</h3><div class="metric-row"><span>练习过</span><strong>${Object.keys(progress.records).length} / ${records.length}</strong></div><div class="metric-row"><span>连续答对 ≥ 3 次</span><strong>${mastered()}</strong></div><div class="metric-row"><span>个人收藏</span><strong>${progress.stars.length}</strong></div><p style="margin-top:14px">★ IMPORTANT 来自原资料；↻ 表示重复引用；☆ 是你自己的收藏，三者分开记录。</p></section></aside></div>`;
  }
  function pathNode(topic,unit,index,rs){const rows=rs.filter(r=>r.topic===topic),done=rows.filter(r=>progress.records[r.id]?.streak>=3).length;return `<div class="path-node"><button class="path-circle ${done===rows.length?'mastered':unit===3?'secondary':''}" data-action="start-topic" data-topic="${attr(topic)}" aria-label="练习 ${attr(topic)}">${done===rows.length?'✓':['=','∧','⇒','∀'][unit]}</button><div class="path-text"><strong>${esc(topic)}</strong><small>${rows.length} 条定理 · ${done} 条已熟悉</small><div class="meter-slim"><span style="width:${rows.length?done/rows.length*100:0}%"></span></div></div></div>`;}
  function emptyHTML(title,text,target,button='返回闯关'){return `<div class="empty"><div class="empty-icon" aria-hidden="true">∴</div><h2>${esc(title)}</h2><p>${esc(text)}</p>${target?`<button class="btn primary" data-action="nav" data-view="${target}">${esc(button)}</button>`:''}</div>`;}
  function modeFields(){return `<div class="mode-grid">${Object.entries(MODE).map(([id,m])=>`<label class="mode-card"><input type="checkbox" data-setting-mode="${id}" ${settings.modes.includes(id)?'checked':''}><span><strong>${m.icon} ${m.title}</strong><small>${m.desc}</small></span></label>`).join('')}</div><div class="setting-row"><label for="question-count"><strong>每关题数</strong><p>在所选题型之间随机；错题可在本轮加练。</p></label><select id="question-count" data-setting="count">${[1,5,10,15,20,30,50].map(n=>`<option ${settings.count===n?'selected':''} value="${n}">${n} 题</option>`).join('')}</select></div><label class="setting-row"><span><strong>本轮错题再出现</strong><p>隔几题重试，最多追加 2 次；退出也保留错题本。</p></span><input type="checkbox" data-setting="retry" ${settings.retry?'checked':''}></label>`;}
  function renderLibrary(){
    const rs=visibleRecords(),f=settings.scope,start=(page-1)*24,pages=Math.max(1,Math.ceil(rs.length/24));if(page>pages)page=pages;
    const topics=[...new Set(records.map(r=>r.topic))],ss=D.sources.filter(s=>records.some(r=>r.sources.some(p=>p.sourceId===s.id)));
    return `<div class="heading-row"><div><div class="eyebrow">建立自己的记忆范围</div><h1>定理库</h1><p class="subhead">编号、别名和所有不同公式变体都在这里。</p></div><button class="btn primary" data-action="start" ${!scopeRecords().length||!settings.modes.length?'disabled':''}>练习此范围</button></div><div class="filters"><label><span class="field-label">搜索名称、编号或公式</span><input id="library-query" class="input" data-filter="query" value="${attr(f.query)}" placeholder="例如 Golden、3.47、p ⇒ q" autocomplete="off"></label><label><span class="field-label">章节</span><select data-filter="topic"><option value="">全部章节</option>${topics.map(t=>`<option value="${attr(t)}" ${f.topic===t?'selected':''}>${esc(t)}</option>`).join('')}</select></label><label class="filter-source"><span class="field-label">材料范围</span><select data-filter="era"><option value="current" ${f.era==='current'?'selected':''}>当前笔记 / 已提供练习</option><option value="all" ${f.era==='all'?'selected':''}>全部已整理材料</option><option value="historical" ${f.era==='historical'?'selected':''}>仅 2025 扩展课件</option></select></label></div><div class="range-field"><label><span class="field-label">编号区间（逗号分隔多个范围）</span><input id="number-range" class="input" data-filter="range" value="${attr(f.range)}" placeholder="3.1-3.82.5, 15.1a-15.29" autocomplete="off"><small class="muted">3.47 包含 a–f 子项；区间筛选不包含原文未编号条目。局部题号请结合来源筛选。</small></label><button class="btn small" data-action="reset-filters">重设筛选</button></div><div class="filter-secondary">${[['important','★ Important'],['repeated','↻ 多次出现'],['starred','☆ 我的收藏'],['wrong','待复练'],['manual','仅练手选']].map(([k,n])=>`<label><input type="checkbox" data-filter="${k}" ${f[k]?'checked':''}>${n}</label>`).join('')}<select data-filter="source" aria-label="按来源文件筛选"><option value="">全部来源文件</option>${ss.map(s=>`<option value="${s.id}" ${f.source===s.id?'selected':''}>${esc(shortSource(s.name))}</option>`).join('')}</select></div><div class="toolbar"><span class="selected-counter">筛选 ${rs.length} 条 · 将练习 ${scopeRecords().length} 条 · 手选 ${f.selected.length} 条</span><div class="btn-row"><button class="btn small" data-action="select-filtered">全选筛选结果</button><button class="btn small" data-action="clear-selection">清空手选</button><button class="btn small" data-action="save-preset">保存范围</button><button class="btn small" data-action="configure">题型</button></div></div>${settings.presets.length?`<div class="filter-secondary"><label>已存范围 <select data-preset><option value="">选择一个范围…</option>${settings.presets.map((p,i)=>`<option value="${i}">${esc(p.name)}</option>`).join('')}</select></label></div>`:''}<div class="theorem-list">${rs.slice((page-1)*24,page*24).map(r=>recordRow(r)).join('')||emptyHTML('没有找到匹配的定理','试试放宽编号范围，或取消 Important、来源、手选限制。')}</div>${paginate(page,pages,'library-page')}`;
  }
  function recordRow(r){const selected=settings.scope.selected.includes(r.id),starred=progress.stars.includes(r.id);return `<article class="theorem-row ${selected?'selected':''}"><input type="checkbox" data-select="${r.id}" aria-label="将 ${attr(E.label(r))} 纳入手选范围" ${selected?'checked':''}><div><button class="record-title" data-action="detail" data-id="${r.id}">${titleHTML(r)}</button>${r.variantLabel?` <span class="badge">${esc(r.variantLabel)}</span>`:''}<div class="math">${esc(r.formula)}</div>${badges(r)}</div><button class="star ${starred?'is-starred':''}" data-action="star" data-id="${r.id}" aria-label="${starred?'取消收藏':'收藏'} ${attr(E.label(r))}" aria-pressed="${starred}">${starred?'★':'☆'}</button></article>`;}
  function paginate(p,n,action){return n>1?`<div class="pagination"><button class="btn small" data-action="${action}" data-page="${p-1}" ${p===1?'disabled':''}>← 上一页</button><span class="small muted">${p} / ${n}</span><button class="btn small" data-action="${action}" data-page="${p+1}" ${p===n?'disabled':''}>下一页 →</button></div>`:'';}
  function renderMistakes(){
    let rows=records.filter(r=>{const p=progress.records[r.id];return p?.wrong>0&&(wrongTab==='all'||(wrongTab==='active'?p.active:!p.active));}).sort((a,b)=>(progress.records[b.id]?.lastAt||0)-(progress.records[a.id]?.lastAt||0));
    const n=Math.max(1,Math.ceil(rows.length/16));page=Math.min(page,n);
    return `<div class="heading-row"><div><div class="eyebrow">错误是下一次的线索</div><h1>错题本</h1><p class="subhead">每种做错的题型，连续答对 2 次后归档。历史不会删除。</p></div><button class="btn primary" data-action="review-all" ${!totalWrong()?'disabled':''}>开始复练</button></div><div class="btn-row" style="margin-bottom:20px">${[['active','待复练'],['resolved','已修复'],['all','全部历史']].map(([v,t])=>`<button class="btn small ${wrongTab===v?'blue':''}" data-action="wrong-tab" data-tab="${v}">${t}</button>`).join('')}<button class="btn small" data-action="review-scope">只复练当前范围</button></div><div class="callout blue" style="margin-bottom:22px">只使用你勾选的题型来复练相应错题。某题在“公式拼写”中答错，需要在该题型连续答对 2 次，不能靠名称选择消除。查看答案或提示会保留为待复练。</div><div class="theorem-list">${rows.slice((page-1)*16,page*16).map(r=>{const p=progress.records[r.id];return `<article class="card"><button class="record-title" data-action="detail" data-id="${r.id}">${titleHTML(r)}</button>${badges(r,false)}<div class="mistake-answer"><span class="small muted">最近答案 · ${MODE[p.lastMode]?.title||''} · ${dateText(p.lastAt)}</span><br>${esc(p.lastAnswer||'没有作答')}</div><div class="small muted" style="margin-top:10px">累计 ${p.wrong} 次需复练 · ${p.correct} 次正确${p.active?' · 剩余：'+p.wrongModes.map(m=>`${MODE[m].title} ${Math.min(2,p.modeWins?.[m]||0)}/2`).join('，'):' · 已修复 ✓'}</div><div class="btn-row mistake-actions"><button class="btn small" data-action="review-one" data-id="${r.id}">再练这条</button><button class="btn small ghost" data-action="detail" data-id="${r.id}">看公式与来源</button></div></article>`;}).join('')||emptyHTML(wrongTab==='active'?'这里暂时没有错题':'这里还没有记录','练习过程中答错、跳过或使用提示的定理，会自动记录在这里。','home') }</div>${paginate(page,n,'library-page')}`;
  }
  function shortSource(name){return name.split('/').pop().replace(/^COMPSCI_2LC3_/,'').replace(/^CompSci2LC3_/,'');}
  function sourceLabel(s){const src=sourceMap.get(s.sourceId);const loc=s.locator?.page?'第 '+s.locator.page+' 页':s.locator?.line?'第 '+s.locator.line+' 行':'来源片段';return `${src?shortSource(src.name):s.sourceId} · ${loc}`;}
  function renderAudit(){
    const c=D.coverage;const list=D.review.filter(r=>!auditQuery||(r.header+' '+r.formula).toLowerCase().includes(auditQuery.toLowerCase()));const pages=Math.max(1,Math.ceil(list.length/10));auditPage=Math.min(auditPage,pages);
    return `<div class="eyebrow">有出处，才值得记住</div><h1>资料与题库审计</h1><p class="subhead">区分可答题条目、待核对提取和无法读取的原文件。不用推测补齐编号。</p><div class="audit-stats"><div class="audit-stat"><strong>${records.length}</strong><span>已整理的定理 / 公理 / 规则卡</span></div><div class="audit-stat"><strong>${D.review.length}</strong><span>待核对候选，不进入答题</span></div><div class="audit-stat"><strong>${records.filter(r=>r.important).length}</strong><span>原资料 Important 标记</span></div><div class="audit-stat"><strong>${D.sources.length}</strong><span>清点的文件 / 其他来源条目</span></div></div><div class="callout"><strong>覆盖边界</strong><br>${esc(c.notice)}<br>“当前笔记”只表示在可读取的近期笔记或提供的练习里出现，不保证是 2026 课堂已经讲授，也不保证在每个 CalcCheck notebook 中可引用。完整 Project 覆盖状态：${c.completeProjectAccess?'已完成':'尚未证实'}。</div><details open><summary>尚无法读全的 Project 材料</summary><div class="source-list">${(c.unavailable||[{name:'Archive.zip',reason:'原始字节不可取得，索引没有正文。'},{name:'Week 1 / Week 2 修订 ZIP、A1 notebook 与部分讲义',reason:'Project 原始字节不可取得；可读取的其他版本已纳入。'}]).map(x=>`<div class="source-item"><strong>${esc(x.name)}</strong><br>${esc(x.reason)}</div>`).join('')}</div></details><details><summary>重复计数、Important 与名称编号的规则</summary><p>${esc(c.countMethod)}</p><p>Important 只来自明确的原文标题或标注；!! 是另一种原文强调；个人收藏单独存储。重复引用不等于教师评级，也不等于独立出现的定理变体。</p><p>同名不同编号保留。没有官方编号：显示“未编号”和内部卡片 ID；没有名称：显示“原文未命名”，练习时选择具体编号。局部 (1)、(2) 等题号不是 LADM 编号，要结合来源。</p><p>题库包括公理、引理与推理规则，保留原类型。排除了占位模板、单独的证明中间步骤和无法可靠恢复的公式。${esc(c.curationNote||'')}</p></details><details><summary>判题的精确边界</summary><p>不是逐字比较。接受字母一一对应的改名，以及受支持的交换律、结合律、反向关系写法。不能把两个独立变量合并，也不能用任意恒真式代替另一条定理。</p><p>复杂量词、替换与命令语法采用保守的结构模板判题，接受一致的全局改名，但不声称验证任意等价改写或完整证明；这不是在线 CalcCheck 引擎。任何侧条件、变量类型仍需满足。公式字符清楚但无法可靠判定的答案不会静默判对。</p></details><details><summary>读取清单 · ${D.sources.length} 个文件 / 其他来源条目</summary><p>包括 ZIP 展开后的文件、同字节副本和整套课件不同拼版。${c.pdfPagesRead} 是扫描的 PDF 物理页数（包括不同拼版），不是独立内容页数。原文件未随网页公开发布。</p><div class="source-list">${D.sources.map(s=>`<div class="source-item"><strong>${esc(shortSource(s.name))}</strong><br>${esc(s.status)} · ${s.pages?`${s.pages} 页 · `:''}${s.declarations||0} 次声明提取${s.duplicateOf?' · 副本不重复计数':''}</div>`).join('')}</div></details><section class="section-gap"><div class="heading-row"><div><h2>待核对提取</h2><p class="subhead">可能含缺字、侧条件、图形字符或证明片段；不是可靠答案。</p></div><button class="btn small" data-action="export-bank">导出题库 JSON</button></div><input class="input" id="audit-query" data-audit-search value="${attr(auditQuery)}" placeholder="搜索待核对的编号或名称">${list.slice((auditPage-1)*10,auditPage*10).map(r=>`<details><summary>${esc(r.header||r.name)} <span class="badge">待核对</span></summary><p>${esc(r.reason)}</p><div class="source-formula">${esc(r.formula)}</div><p>${esc(sourceLabel(r.source))}</p></details>`).join('')}${paginate(auditPage,pages,'audit-page')}</section><div class="coverage-note">构建日期：${esc(c.builtAt)} · 题库与来源数据位于 data/，可通过 tools/ 重新整理新资料。</div>`;
  }
  function renderSettings(){return `<div class="eyebrow">按你的方式练</div><h1>练习设置</h1><p class="subhead">选择题型，保留进度，不需要服务器。</p><section class="card section-gap"><h2>题型与节奏</h2>${modeFields()}<label class="setting-row"><span><strong>每日目标</strong><p>按本机日期记录，不要求持续在线。</p></span><select data-setting="goal">${[10,20,30,50].map(n=>`<option value="${n}" ${n===settings.goal?'selected':''}>${n} 题</option>`).join('')}</select></label><label class="setting-row"><span><strong>答题音效</strong><p>轻提示音，默认关闭；遵从系统减少动态效果设置。</p></span><input type="checkbox" data-setting="sound" ${settings.sound?'checked':''}></label><button class="btn primary" data-action="start" ${!settings.modes.length||!scopeRecords().length?'disabled':''}>开始练习</button></section><section class="card"><h2>本地学习备份</h2><p class="small muted">错题、历史、收藏和 XP 保存在这个浏览器。换设备、换站点或清除浏览器数据前，请先导出。没有云端同步。</p><div class="btn-row section-gap"><button class="btn" data-action="export-progress">导出学习备份</button><button class="btn" data-action="import-progress">导入学习备份</button><button class="btn" data-action="shortcuts">查看符号键盘</button></div><input id="backup-file" type="file" accept="application/json,.json" hidden><p class="small muted">导入会替换当前学习记录；文件经过结构与大小检查。题库来源文件不包含你的学习记录。</p></section><section class="card"><h2>数据管理</h2><div class="btn-row section-gap"><button class="btn small" data-action="export-bank">导出题库 JSON</button><button class="btn small" data-action="reset-filters">重设记忆范围</button><button class="btn small" data-action="clear-progress">清空学习记录</button></div><p class="small muted">重设范围不会删除成绩；清空学习记录需要再次确认。</p></section><section class="card"><h2>关于 Theorem Quest</h2><p class="small muted">借鉴短关卡、即时反馈、连对和错题复练的学习节奏，使用独立设计，不隶属于 Duolingo、CalcCheck 或 McMaster。所有判题在设备本地进行，运行时不调用 AI 或外部 API。</p><p class="small muted">完整公式不是严格字符匹配；复杂语法的保守匹配边界见“资料审计”。题库覆盖尚有缺口，不把提取候选当成已核验定理。</p></section>`;}
  function openModal(title,body){lastFocus=document.activeElement;modalRoot.innerHTML=`<div class="modal-backdrop" data-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><h2 id="modal-title">${esc(title)}</h2><button class="icon-btn" data-action="close-modal" aria-label="关闭">×</button></header>${body}</section></div>`;document.body.style.overflow='hidden';setTimeout(()=>modalRoot.querySelector('input,button')?.focus(),20);}
  function closeModal(){modalRoot.innerHTML='';document.body.style.overflow='';if(lastFocus?.isConnected)lastFocus.focus();}
  function configure(){openModal('这一关，想怎么练？',`<p class="small muted">当前 ${scopeRecords().length} 条定理。勾选的题型将随机出现，至少选一种。</p>${modeFields()}<div class="btn-row"><button class="btn primary" data-action="modal-start" ${!scopeRecords().length||!settings.modes.length?'disabled':''}>开始 ${settings.count} 题</button><button class="btn" data-action="modal-library">调整记忆范围</button></div>`);}
  function detail(id){const r=byId.get(id);if(!r)return;const p=progress.records[id];openModal('定理卡片',`<div class="question-name">${titleHTML(r)}</div>${r.variantLabel?`<span class="badge">${esc(r.variantLabel)}</span>`:''}${badges(r)}<div class="math">${esc(r.formula)}</div>${r.formulaVariants?.length>1?`<details><summary>同条目在原资料中的其他写法 · ${r.formulaVariants.length}</summary>${r.formulaVariants.map(f=>`<div class="source-formula">${esc(f)}</div>`).join('')}</details>`:''}${r.sideCondition?`<div class="callout"><strong>适用条件</strong><br>${esc(r.sideCondition)}</div>`:''}<p class="small"><strong>原文类型：</strong>${esc(r.kind)}${r.domain?' · '+esc(r.domain):''}</p><p class="small"><strong>所有编号：</strong>${r.numbers.length?r.numbers.map(n=>'('+esc(n)+')').join('、'):'原文未编号；内部卡片 ID 仅供网站索引'}</p>${r.aliases.length?`<p class="small"><strong>同条目别名：</strong>${r.aliases.map(esc).join(' · ')}</p>`:''}${r.importantEvidence?.length?`<details open><summary>★ 原文 Important 依据</summary>${r.importantEvidence.map(x=>`<p>${esc(x.label)}<br>${esc(shortSource(sourceMap.get(x.sourceId)?.name||x.sourceId))}</p>`).join('')}</details>`:''}<details><summary>来源与原文片段 · ${r.sources.length} 个位置</summary><div class="source-list">${r.sources.map(s=>`<div class="source-item"><strong>${esc(sourceLabel(s))}</strong><div class="source-formula">${esc(s.excerpt)}</div></div>`).join('')}</div></details>${p?`<details><summary>学习记录 · ${p.correct}/${p.attempts} 次正确</summary>${(p.log||[]).map(l=>`<p>${dateText(l.at)} · ${esc(MODE[l.mode]?.title)} · ${l.ok?'正确':l.assisted?'使用提示':'需复练'}<br><span class="source-formula">${esc(l.answer||'未作答')}</span></p>`).join('')}</details>`:''}<div class="btn-row"><button class="btn primary" data-action="practice-one" data-id="${id}">练习这条</button><button class="btn" data-action="copy-formula" data-id="${id}">复制公式</button><button class="btn" data-action="star" data-id="${id}">${progress.stars.includes(id)?'★ 已收藏':'☆ 收藏'}</button></div>`);}
  function shortcuts(){const rows=[['\\equiv / \\==','≡'],['\\nequiv','≢'],['\\land / \\lor / \\lnot','∧ ∨ ¬'],['\\implies / \\follows','⇒ ⇐'],['\\neq / \\leq / \\geq','≠ ≤ ≥'],['\\becomes / \\:=','≔（替换）'],[':=',':=（赋值命令，不转换）'],['\\cdot / \\.','·'],['\\forall / \\exists','∀ ∃'],['\\with / \\spot','❙ •'],['\\[- / \\]- / \\;_','⁅ ⁆ ⍮'],['\\NN / \\ZZ / \\BB','ℕ ℤ 𝔹'],['\\sum / \\product','∑ ∏'],['\\<< / \\>>','⟪ ⟫']];openModal('符号输入与判题',`<p class="small">公式输入框中，输入代码后按 <kbd>Tab</kbd> 或 <kbd>空格</kbd> 转换；也可以整式粘贴，提交时会转换。单独的 <kbd>Enter</kbd> 检查，<kbd>Shift</kbd> + <kbd>Enter</kbd> 换行。</p><table class="readable-table"><thead><tr><th>输入</th><th>符号</th></tr></thead><tbody>${rows.map(([a,b])=>`<tr><td><code>${esc(a)}</code></td><td class="math small">${esc(b)}</td></tr>`).join('')}</tbody></table><p class="callout blue">这是基于所提供 CalcCheck 输入说明实现的常用快捷键子集，不是完整 CalcCheck 编辑器。≡ 与 = 保持不同；plain := 与 ≔ 保持不同。</p><p class="small muted">接受 a、p′、n₀、α 等字母变量的一致改名。复杂命令、量词和替换题请保留原符号结构及侧条件；不会用真假表把所有恒真式当作同一条定理。</p>`);}
  function launch(rs,label='自由练习',review=false,count=settings.count){
    if(!settings.modes.length){toast('请至少勾选一种题型。');configure();return;}
    let queue;
    try{
      if(review){
        const eligible=rs.filter(r=>progress.records[r.id]?.wrongModes?.some(m=>settings.modes.includes(m)&&E.eligibleModes(r,[m]).length));
        if(!eligible.length){toast('当前错题型未被勾选，请在配置中启用相应题型。');configure();return;}
        queue=[];let bag=[];for(let i=0;i<count;i++){if(!bag.length)bag=E.shuffle(eligible);const r=bag.pop();const modes=progress.records[r.id].wrongModes.filter(m=>settings.modes.includes(m));queue.push({id:r.id,mode:modes[Math.floor(Math.random()*modes.length)],retry:0});}
      }else queue=E.makeSession(rs,settings.modes,count);
    }catch(e){toast(e.message);return;}
    closeModal();session={queue,index:0,label,results:[],combo:0,bestCombo:0,xp:0,startedAt:Date.now(),state:null};qState=null;saveSession();view='quiz';render();window.scrollTo({top:0});
  }
  function newQuestionState(){const q=session.queue[session.index],r=byId.get(q.id);let candidates=records.filter(v=>v.id!==r.id&&E.label(v)!==E.label(r)&&!E.compareFormula(r.formula,v.formula).ok);const nearby=E.shuffle(candidates.filter(v=>v.topic===r.topic)),other=E.shuffle(candidates.filter(v=>v.topic!==r.topic));return {checked:false,selected:null,typed:'',answer:'',assisted:false,options:E.shuffle([r,...nearby.concat(other).slice(0,3)]).map(v=>v.id),suggestions:[],suggestionIndex:0,keys:'common',feedback:null};}
  function renderQuiz(){
    if(!session){navigate('home');return;}if(session.index>=session.queue.length){endSession();return;}
    if(!qState)qState=session.state||newQuestionState();
    const q=session.queue[session.index],r=byId.get(q.id),m=MODE[q.mode];const pct=(session.index+(qState.checked?1:0))/session.queue.length*100;
    let question='';
    if(q.mode==='choice'||q.mode==='name')question=`<div class="question-card"><div class="mini-mascot" aria-hidden="true"><span class="mark">∴</span></div><div class="speech"><div class="math" id="question-formula">${esc(r.formula)}</div></div></div>${r.sideCondition?`<div class="callout blue small">适用条件：${esc(r.sideCondition)}</div>`:''}`;
    else question=`<div class="question-card"><div class="mini-mascot" aria-hidden="true"><span class="mark">∴</span></div><div class="speech question-name">${titleHTML(r)}${r.variantLabel?`<span class="variant-hint">${esc(r.variantLabel)}</span>`:''}</div></div>${r.sideCondition?`<div class="callout blue small">适用条件：${esc(r.sideCondition)}</div>`:''}`;
    let answer='';
    if(q.mode==='choice')answer=`<div class="choices" role="group" aria-label="选择定理名称">${qState.options.map((id,i)=>{const x=byId.get(id);return `<button class="choice ${qState.selected===id?'selected':''} ${qState.checked&&id===r.id?'correct':''} ${qState.checked&&qState.selected===id&&!qState.feedback?.ok?'incorrect':''}" data-action="choose" data-id="${id}" aria-pressed="${qState.selected===id}" ${qState.checked?'disabled':''}><span class="choice-key">${i+1}</span><span>${titleHTML(x)}</span></button>`;}).join('')}</div><p class="input-hint">可按 1–4 选择，再按 Enter 检查。</p>`;
    if(q.mode==='name')answer=`<label class="field-label" for="name-answer">输入名称前 3 个字符，或直接输入编号</label><input class="input name-input" id="name-answer" placeholder="例如 Gol、De M、3.35…" autocomplete="off" spellcheck="false" role="combobox" aria-controls="name-suggestions" aria-expanded="false" aria-autocomplete="list" value="${attr(qState.typed)}" ${qState.checked?'disabled':''}><div id="name-suggestions" class="autocomplete" role="listbox" hidden></div><div id="name-selection" class="name-selection" ${qState.selected?'':'hidden'}>${qState.selected?titleHTML(byId.get(qState.selected)):''}</div><p class="input-hint">↓ / ↑ 选择候选，Tab 或 Enter 补全。名称相同或前缀相同时，请明确选择编号；不会只凭 “De M” 自动猜中。</p>`;
    if(q.mode==='blanks'){
      const template=E.blankTemplate(r.formula),idx=new Map(template.blanks.map((v,i)=>[v.index,i]));qState.template=template;
      answer=`<div class="blank-formula" role="group" aria-label="补全定理变量">${template.tokens.map((t,k)=>idx.has(k)?`<input class="blank-slot ${(qState.values?.[idx.get(k)]||'')?'filled':''}" data-slot="${idx.get(k)}" id="blank-${idx.get(k)}" aria-label="第 ${idx.get(k)+1} 个字母空" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="12" value="${attr(qState.values?.[idx.get(k)]||'')}" ${qState.checked?'disabled':''}>`:`<span>${esc(t)}</span>`).join('')}</div><p class="input-hint">需要 ${template.variables.length} 个不同变量。每处都要填写，重复字母须保持关系一致。Tab 或空格移到下一空；点字母键自动前进。</p><div id="keyboard">${keyboardHTML('blanks',r)}</div>`;
    }
    if(q.mode==='formula')answer=`<label class="field-label" for="formula-answer">你的公式</label><textarea id="formula-answer" class="formula-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="用下方按键拼出公式，或键入 \\land、\\implies…" ${qState.checked?'disabled':''}>${esc(qState.typed)}</textarea><div class="formula-preview" id="formula-preview" aria-live="polite">${esc(E.normalizeInput(qState.typed||''))}</div><div id="keyboard">${keyboardHTML('formula',r)}</div><p class="input-hint">符号代码后按 Tab / 空格转换 · Enter 检查 · Shift + Enter 换行。可以自由改名字母，不能合并独立变量。</p>`;
    app.innerHTML=`<div class="quiz-shell"><header class="quiz-top"><button class="icon-btn" data-action="exit-quiz" aria-label="退出并保存本关">×</button><div class="meter" role="progressbar" aria-label="本关进度" aria-valuenow="${session.index+(qState.checked?1:0)}" aria-valuemin="0" aria-valuemax="${session.queue.length}"><span style="width:${pct}%"></span></div><span class="quiz-progress-label">${session.index+(qState.checked?1:0)} / ${session.queue.length}</span><span class="combo">ϟ ${session.combo} 连对</span></header><main class="quiz-main" id="main" tabindex="-1"><div class="quiz-meta"><span class="badge">${esc(session.label)}</span><span class="badge good">${m.title}</span>${q.retry?`<span class="badge wrong">本轮复练 ${q.retry}/2</span>`:''}${r.important?'<span class="badge important">★ IMPORTANT</span>':''}</div>${r.domain?`<p class="small muted">类型：${esc(r.domain)}</p>`:''}<h1>${m.prompt}</h1><p class="quiz-instruction">${q.mode==='blanks'?'逻辑符号已经排好。字母不必与讲义相同，但逻辑结构要一致。':q.mode==='formula'?'回想运算符、变量关系和括号；不是逐字背诵。':'看清公式结构，再选择名称与编号。'}</p>${question}${answer}</main><footer class="quiz-bottom ${qState.checked?'feedback '+(qState.feedback.ok?'correct':'incorrect'):''}" id="quiz-bottom">${bottomHTML()}</footer></div>`;
    if(!qState.checked)setTimeout(()=>{const target=q.mode==='name'?$('#name-answer'):q.mode==='formula'?$('#formula-answer'):q.mode==='blanks'?$('#blank-0'):null;if(target){target.focus({preventScroll:true});activeInput=target;}},35);
  }
  function keyboardHTML(mode,r){
    const letters=[...new Set([...E.blankTemplate(r.formula).variables,'p','q','r','s','a','b','c','x','y','z','m','n',"p'","q'",'n₀','α','β'])];
    if(mode==='blanks')return `<div class="key-panel"><div class="key-panel-head">字母按键 · 点一下填入并前进</div><div class="key-row">${letters.map(t=>keyHTML(t)).join('')}<button class="key word" data-action="key" data-key="BACKSPACE" aria-label="清除当前空">⌫</button></div></div>`;
    const common=['¬','∧','∨','≡','≢','⇒','⇐','=','≠','(',')','true','false','+','-','·','0','1','2','3','4','5','6','7','8','9','≤','≥','<','>'];
    const baseExtra=['∀','∃','∑','∏','❙','•',':','ℕ','ℤ','𝔹','∈','∉','∪','∩','⊆','⊂','∅','{','}','[',']','≔',':=','⁅','⁆','⍮','⟪','⟫','⨾','˘','⊦','suc','pred','even','odd','double'];
    const extra=[...new Set([...baseExtra,...E.tokenize(r.formula).filter(t=>!E.isVariable(t)&&!common.includes(t))])];
    return `<div class="key-panel"><div class="key-panel-head"><button data-action="key-tab" data-tab="common" class="${qState.keys==='common'?'active':''}">常用符号</button><button data-action="key-tab" data-tab="extra" class="${qState.keys==='extra'?'active':''}">量词 / 命令 / 函数</button><button data-action="shortcuts">键盘快捷输入 ?</button></div><div class="key-row">${(qState.keys==='extra'?extra:common).map(t=>keyHTML(t)).join('')}</div><div class="key-row">${letters.map(t=>keyHTML(t)).join('')}<button class="key word" data-action="key" data-key="SPACE">空格</button><button class="key word" data-action="key" data-key="BACKSPACE" aria-label="退格">⌫</button><button class="key word" data-action="key" data-key="CLEAR">清空</button></div></div>`;
  }
  function keyHTML(t){return `<button class="key ${t.length>2?'word':''}" data-action="key" data-key="${attr(t)}" aria-label="输入 ${attr(t)}" title="${attr(Object.entries(E.SHORTCUTS).find(([_,v])=>v===t)?.[0]||t)}" ${qState.checked?'disabled':''}>${esc(t)}</button>`;}
  function bottomHTML(){
    if(!qState.checked)return `<div class="bottom-inner"><div class="btn-row"><button class="btn ghost" data-action="skip">暂时不会</button><button class="btn small ghost" data-action="hint">提示</button><span class="small muted">准备好后按 Enter</span></div><button id="check-answer" class="btn primary" data-action="check" ${canCheck()?'':'disabled'}>检查答案</button></div>`;
    const q=session.queue[session.index],r=byId.get(q.id),f=qState.feedback;
    return `<div class="bottom-inner"><div class="feedback-message" role="status" aria-live="polite"><span class="feedback-icon" aria-hidden="true">${f.ok?'✓':'↺'}</span><div class="feedback-text"><h2>${f.ok?(session.combo>=3?`${session.combo} 连对，保持这个节奏！`:'答对了！'):(qState.assisted?'带着提示，再记一次':'再记一次，就更近一步。')}</h2><p class="feedback-label">${esc(E.label(r))}${r.variantLabel?' · '+esc(r.variantLabel):''}</p><p class="feedback-formula">${esc(r.formula)}</p><p>${esc(f.message)}${f.ok?` +${f.xp||10} XP`:' 已记录到错题本。'}</p></div></div><button class="btn ${f.ok?'primary':'danger'}" data-action="continue">${session.index===session.queue.length-1?'查看本关成果':'继续'}</button></div>`;
  }
  function canCheck(){if(!session||!qState||qState.checked)return false;const m=session.queue[session.index].mode;if(m==='choice')return !!qState.selected;if(m==='name')return !!qState.selected||!!qState.typed.trim();if(m==='formula')return !!qState.typed.trim();return (qState.values||[]).length===qState.template?.blanks.length&&(qState.values||[]).every(v=>v?.trim());}
  function updateCheck(){const b=$('#check-answer');if(b)b.disabled=!canCheck();}
  function updateSuggestions(){
    const query=qState.typed.trim(),box=$('#name-suggestions');if(!box)return;
    if(qState.selected||Array.from(query).length<3&&!/^\(?\d/.test(query)){box.hidden=true;$('#name-answer')?.setAttribute('aria-expanded','false');return;}
    const q=E.normalizeName(query);
    qState.suggestions=E.searchRecords(records,query).filter(r=>[r.name,...r.aliases,r.displayRef,...r.numbers].some(v=>E.normalizeName(v).includes(q))).slice(0,80).map(r=>r.id);
    qState.suggestionIndex=Math.min(qState.suggestionIndex||0,Math.max(0,qState.suggestions.length-1));box.hidden=false;
    box.innerHTML=qState.suggestions.length?qState.suggestions.map((id,i)=>`<button id="suggestion-${i}" class="suggestion ${i===qState.suggestionIndex?'focused':''}" data-action="suggest" data-id="${id}" role="option" aria-selected="${i===qState.suggestionIndex}">${titleHTML(byId.get(id))}</button>`).join(''):'<div class="small muted" style="padding:14px">没有匹配名称；也可以输入具体编号。</div>';
    $('#name-answer')?.setAttribute('aria-expanded','true');$('#name-answer')?.setAttribute('aria-activedescendant','suggestion-'+qState.suggestionIndex);
  }
  function selectName(id){if(!byId.has(id))return;qState.selected=id;qState.typed=E.label(byId.get(id));$('#name-answer').value=qState.typed;$('#name-suggestions').hidden=true;$('#name-answer').setAttribute('aria-expanded','false');$('#name-selection').innerHTML=titleHTML(byId.get(id));$('#name-selection').hidden=false;updateCheck();$('#name-answer').focus();}
  function choose(id){if(qState.checked)return;qState.selected=id;$$('.choice').forEach(b=>{b.classList.toggle('selected',b.dataset.id===id);b.setAttribute('aria-pressed',b.dataset.id===id?'true':'false');});updateCheck();}
  function check(skip=false){
    if(!session||!qState||qState.checked)return;
    const q=session.queue[session.index],r=byId.get(q.id);let result={ok:false,message:'未作答，先记住这条定理的名称与公式。'},answer='';
    if(!skip){
      if(!canCheck())return;
      if(q.mode==='name'||q.mode==='choice'){
        let id=qState.selected;
        if(!id&&q.mode==='name'){
          const query=E.normalizeName(qState.typed).replace(/^\((.+)\)$/,'$1');
          let exact=records.filter(x=>[E.label(x),x.name,...x.aliases,...x.numbers].some(v=>E.normalizeName(v)===query));
          if(!exact.length&&Array.from(query).length>=3)exact=records.filter(x=>[x.name,...x.aliases].some(v=>E.normalizeName(v).startsWith(query)));
          if(exact.length===1)id=exact[0].id;
          else if(exact.length>1){toast('这个名称或前缀对应多条定理，请选择具体编号。');updateSuggestions();return;}
        }
        answer=id?E.label(byId.get(id)):qState.typed;
        const equivalent=id&&E.compareFormula(r.formula,byId.get(id).formula).ok;
        result={ok:id===r.id||!!equivalent,message:id===r.id?'名称与编号都选对了。':equivalent?'接受了描述同一公式结构的来源别名 / 变体。':'看清公式的主运算符和变量关系，再对应名称与编号。'};
      }else{
        answer=q.mode==='blanks'?(E.fillTemplate(qState.template,qState.values||[])||''):qState.typed;
        if(q.mode==='blanks'&&!answer){toast('每个空只能填一个字母变量，如 p、p′ 或 n₀。');return;}
        result=(r.formulaVariants||[r.formula]).map(f=>E.compareFormula(f,answer)).find(v=>v.ok)||E.compareFormula(r.formula,answer);
      }
    }
    if(qState.assisted){result={...result,ok:false,message:'本次使用了提示，留待无提示时再练。'};}
    const ok=result.ok;const earned=E.applyAttempt(progress,r.id,q.mode,ok,answer,qState.assisted);
    session.combo=ok?session.combo+1:0;session.bestCombo=Math.max(session.bestCombo,session.combo);session.xp+=earned.xp;
    session.results.push({id:r.id,mode:q.mode,ok,retry:q.retry,assisted:qState.assisted});
    if(!ok&&settings.retry&&q.retry<2)session.queue.splice(Math.min(session.index+4,session.queue.length),0,{id:r.id,mode:q.mode,retry:q.retry+1});
    qState.checked=true;qState.answer=answer;qState.feedback={ok,message:result.message,xp:earned.xp};save();saveSession();beep(ok);renderQuiz();
  }
  function hint(){if(!qState||qState.checked)return;qState.assisted=true;const q=session.queue[session.index],r=byId.get(q.id),t=E.blankTemplate(r.formula);
    const text=q.mode==='name'||q.mode==='choice'?`名称提示：${r.name==='原文未命名'?'这条定理原文没有名称，请按编号选择。':r.name.slice(0,3)+'…'}；主题：${r.topic}。`:`此公式有 ${t.variables.length} 个不同变量；常用原字母为 ${t.variables.join('、')||'无'}。${q.mode==='formula'?'主要符号：'+[...new Set(E.tokenize(r.formula).filter(x=>!E.isVariable(x)&&!['(',')'].includes(x)))].slice(0,14).join(' '):'同一个变量在不同空的位置要保持一致。'}`;
    openModal('提示 · 本次将保留为待复练',`<p>${esc(text)}</p><p class="small muted">先尝试完成；下一次不看提示再答对，才能推进错题修复。</p><div class="btn-row"><button class="btn primary" data-action="close-modal">继续作答</button></div>`);saveSession();}
  function nextQuestion(){if(!qState?.checked)return;session.index++;session.state=null;qState=null;if(session.index>=session.queue.length){endSession();return;}saveSession();renderQuiz();window.scrollTo({top:0});}
  function endSession(){
    if(!session)return;
    if(!session.finished){session.finished=true;const initial=session.results.filter(r=>!r.retry);progress.history.unshift({at:Date.now(),correct:initial.filter(r=>r.ok).length,total:initial.length,xp:session.xp});progress.history=progress.history.slice(0,100);save();}
    try{localStorage.removeItem(KEYS.session);}catch(_){}resume=null;view='result';renderResult();window.scrollTo({top:0});
  }
  function renderResult(){if(!session){navigate('home');return;}const initial=session.results.filter(r=>!r.retry),good=initial.filter(r=>r.ok).length,missed=[...new Set(session.results.filter(r=>!r.ok).map(r=>r.id))];
    app.innerHTML=`<div class="quiz-shell"><main id="main" class="result" tabindex="-1"><div class="result-mark confetti" aria-hidden="true">✦</div><div class="eyebrow">LESSON COMPLETE</div><h1>${good===initial.length?'这一关，全都记住了！':'每一次回想，都有收获。'}</h1><p>${esc(session.label)} · 完成 ${initial.length} 道主问题${session.results.length>initial.length?'，加练 '+(session.results.length-initial.length)+' 道错题':''}</p><div class="result-stats"><div class="result-stat"><strong>+${session.xp}</strong><span>本关 XP</span></div><div class="result-stat"><strong>${initial.length?Math.round(good/initial.length*100):0}%</strong><span>首次作答正确率</span></div><div class="result-stat"><strong>${session.bestCombo}</strong><span>最高连续答对</span></div></div><div class="btn-row"><button class="btn primary" data-action="nav" data-view="home">回到闯关</button><button class="btn" data-action="result-retry" ${!missed.length?'disabled':''}>再练本关错题 (${missed.length})</button></div>${missed.length?`<details class="wrong-recap"><summary>本关需要再记一次的定理</summary>${missed.map(id=>`<button class="record-title" data-action="detail" data-id="${id}">${titleHTML(byId.get(id))}</button>`).join('')}</details>`:'<p class="small muted" style="margin-top:24px">把这份熟悉保留下来。之后也可以到定理库扩大范围。</p>'}<p class="small muted" style="margin-top:22px">${storageOK?'学习记录已保存在这个浏览器。':'本地保存不可用，请回设置页导出学习备份。'}</p></main></div>`;
  }
  function beep(ok){if(!settings.sound)return;try{const AC=window.AudioContext||window.webkitAudioContext,ctx=new AC(),osc=ctx.createOscillator(),gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.frequency.setValueAtTime(ok?660:240,ctx.currentTime);osc.frequency.setValueAtTime(ok?880:180,ctx.currentTime+.08);gain.gain.setValueAtTime(.055,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.22);osc.start();osc.stop(ctx.currentTime+.23);osc.onended=()=>ctx.close();}catch(_){} }
  function inputKey(text){
    if(qState?.checked)return;const mode=session.queue[session.index].mode;
    if(mode==='blanks'){
      let el=activeInput?.isConnected&&activeInput.matches('.blank-slot')?activeInput:$('.blank-slot:not(.filled)')||$('.blank-slot');if(!el)return;
      if(text==='BACKSPACE')el.value='';else if(E.isVariable(text))el.value=text;else return;
      el.dispatchEvent(new Event('input',{bubbles:true}));el.focus();
      if(text!=='BACKSPACE'){const next=$(`#blank-${Number(el.dataset.slot)+1}`);if(next){next.focus();activeInput=next;}}return;
    }
    const el=$('#formula-answer');if(!el)return;let a=el.selectionStart??el.value.length,b=el.selectionEnd??a,value=el.value;
    if(text==='CLEAR'){value='';a=0;}else if(text==='BACKSPACE'){if(a===b&&a>0)a-=Array.from(value.slice(0,a)).pop().length;value=value.slice(0,a)+value.slice(b);}
    else{const insert=text==='SPACE'?' ':text;const prefix=a>0&&!/\s$/.test(value.slice(0,a))&&text!=='SPACE'?' ':'';const content=prefix+insert+(text==='SPACE'?'':' ');value=value.slice(0,a)+content+value.slice(b);a+=content.length;}
    el.value=value;el.focus();el.setSelectionRange(a,a);el.dispatchEvent(new Event('input',{bubbles:true}));
  }
  function convertShortcutAtCaret(el,key){const end=el.selectionStart,head=el.value.slice(0,end);const match=Object.keys(E.SHORTCUTS).sort((a,b)=>b.length-a.length).find(k=>head.endsWith(k));if(!match)return false;
    const replacement=E.SHORTCUTS[match]+(key===' '?' ':''),start=end-match.length;el.value=el.value.slice(0,start)+replacement+el.value.slice(el.selectionEnd);const cursor=start+replacement.length;el.setSelectionRange(cursor,cursor);el.dispatchEvent(new Event('input',{bubbles:true}));return true;}
  function downloadJSON(obj,name){const url=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
  function exportProgress(){downloadJSON({...progress,settings,exportedAt:new Date().toISOString(),app:'Theorem Quest'},'theorem-quest-progress-'+E.localDay()+'.json');toast('学习备份已导出。');}
  async function importProgress(file){if(!file)return;if(file.size>3*1024*1024){toast('备份文件超过 3 MB，未导入。');return;}try{const obj=JSON.parse(await file.text()),validated=E.validateProgress(obj,records.map(r=>r.id));openModal('替换当前学习记录？',`<p>此备份包含 ${Object.keys(validated.records).length} 条学习记录、${validated.xp} XP。</p><p class="small muted">导入会替换现有错题、收藏和学习历史。建议先导出当前备份。</p><div class="btn-row"><button class="btn" data-action="export-progress">先导出当前记录</button><button class="btn primary" id="confirm-import">确认导入</button><button class="btn" data-action="close-modal">取消</button></div>`);$('#confirm-import').addEventListener('click',()=>{progress=validated;if(obj.settings)settings=cleanSettings(obj.settings);save();saveSettings();resume=null;session=null;qState=null;try{localStorage.removeItem(KEYS.session);}catch(_){}closeModal();navigate('settings');toast('备份已导入。');});}catch(e){toast('导入失败：'+e.message);}}
  const debounce=(fn,wait=170)=>{let timer;return(...a)=>{clearTimeout(timer);timer=setTimeout(()=>fn(...a),wait);};};
  const filterInput=debounce((id,k,value,caret)=>{settings.scope[k]=value;saveSettings();page=1;render();const el=id?document.getElementById(id):null;if(el){el.focus();el.setSelectionRange?.(caret,caret);}},220);
  const auditInput=debounce((value,caret)=>{auditQuery=value;auditPage=1;render();const el=$('#audit-query');el.focus();el.setSelectionRange(caret,caret);},220);
  document.addEventListener('input',ev=>{const el=ev.target;
    if(el.matches('#name-answer')){qState.typed=el.value;qState.selected=null;qState.suggestionIndex=0;$('#name-selection').hidden=true;updateSuggestions();updateCheck();}
    else if(el.matches('#formula-answer')){qState.typed=el.value;$('#formula-preview').textContent=E.normalizeInput(el.value);updateCheck();}
    else if(el.matches('.blank-slot')){qState.values=qState.values||Array(qState.template.blanks.length).fill('');qState.values[Number(el.dataset.slot)]=el.value.trim();el.classList.toggle('filled',!!el.value.trim());updateCheck();}
    else if(el.matches('input[data-filter]:not([type=checkbox])'))filterInput(el.id,el.dataset.filter,el.value,el.selectionStart);
    else if(el.matches('[data-audit-search]'))auditInput(el.value,el.selectionStart);
  });
  document.addEventListener('focusin',ev=>{if(ev.target.matches('#formula-answer,.blank-slot'))activeInput=ev.target;});
  document.addEventListener('pointerdown',ev=>{if(ev.target.closest('[data-action="key"],[data-action="key-tab"]'))ev.preventDefault();});
  document.addEventListener('change',ev=>{const el=ev.target;
    if(el.matches('[data-setting-mode]')){const m=el.dataset.settingMode;settings.modes=el.checked?[...new Set([...settings.modes,m])]:settings.modes.filter(x=>x!==m);saveSettings();if(modalRoot.innerHTML){const b=$('[data-action="modal-start"]');if(b)b.disabled=!settings.modes.length||!scopeRecords().length;}else if(view==='settings')render();}
    else if(el.matches('[data-setting]')){const k=el.dataset.setting;settings[k]=el.type==='checkbox'?el.checked:Number(el.value);saveSettings();const b=$('[data-action="modal-start"]');if(b)b.textContent=`开始 ${settings.count} 题`;}
    else if(el.matches('select[data-filter],input[type=checkbox][data-filter]')){settings.scope[el.dataset.filter]=el.type==='checkbox'?el.checked:el.value;saveSettings();page=1;render();}
    else if(el.matches('[data-select]')){const id=el.dataset.select;settings.scope.selected=el.checked?[...new Set([...settings.scope.selected,id])]:settings.scope.selected.filter(v=>v!==id);settings.scope.manual=true;saveSettings();render();}
    else if(el.matches('[data-preset]')&&el.value!==''){settings.scope=cleanSettings({scope:settings.presets[Number(el.value)].scope}).scope;saveSettings();page=1;render();}
    else if(el.matches('#backup-file'))importProgress(el.files[0]);
  });
  document.addEventListener('click',async ev=>{
    const b=ev.target.closest('[data-action]');if(!b||b.disabled){if(ev.target.matches('[data-backdrop]'))closeModal();return;}
    const a=b.dataset.action,id=b.dataset.id;
    switch(a){
      case 'nav':closeModal();navigate(b.dataset.view);break;
      case 'configure':configure();break;
      case 'modal-start':launch(scopeRecords());break;
      case 'modal-library':closeModal();navigate('library');break;
      case 'start':launch(scopeRecords());break;
      case 'start-topic':launch(scopeRecords().filter(r=>r.topic===b.dataset.topic),b.dataset.topic);break;
      case 'practice-one':launch([byId.get(id)],E.label(byId.get(id)),false,Math.min(settings.count,5));break;
      case 'resume':session=cleanSession(resume);if(session){qState=session.state;view='quiz';render();}else toast('上次关卡已结束。');break;
      case 'exit-quiz':saveSession();navigate('home');break;
      case 'choose':choose(id);break;
      case 'suggest':selectName(id);break;
      case 'check':check();break;
      case 'skip':check(true);break;
      case 'hint':hint();break;
      case 'continue':nextQuestion();break;
      case 'key':inputKey(b.dataset.key);break;
      case 'key-tab':qState.keys=b.dataset.tab;$('#keyboard').innerHTML=keyboardHTML('formula',byId.get(session.queue[session.index].id));break;
      case 'detail':detail(id);break;
      case 'close-modal':closeModal();break;
      case 'star':{const yes=progress.stars.includes(id);progress.stars=yes?progress.stars.filter(x=>x!==id):[...progress.stars,id];save();b.textContent=yes?'☆':'★';b.classList.toggle('is-starred',!yes);b.setAttribute('aria-pressed',!yes?'true':'false');toast(yes?'已取消收藏。':'已加入个人收藏；不改变原文 Important 标记。');if(view!=='quiz'&&!modalRoot.innerHTML)render();break;}
      case 'copy-formula':try{await navigator.clipboard.writeText(byId.get(id).formula);toast('公式已复制。');}catch(_){const t=document.createElement('textarea');t.value=byId.get(id).formula;document.body.append(t);t.select();document.execCommand('copy');t.remove();toast('公式已复制。');}break;
      case 'library-page':page=Math.max(1,Number(b.dataset.page));render();window.scrollTo({top:0});break;
      case 'audit-page':auditPage=Math.max(1,Number(b.dataset.page));render();$('#audit-query')?.scrollIntoView({block:'start'});break;
      case 'reset-filters':settings.scope=JSON.parse(JSON.stringify(defaults.scope));saveSettings();page=1;render();toast('已重设为当前笔记范围。');break;
      case 'select-filtered':settings.scope.selected=[...new Set([...settings.scope.selected,...visibleRecords().map(r=>r.id)])];settings.scope.manual=true;saveSettings();render();break;
      case 'clear-selection':settings.scope.selected=[];settings.scope.manual=false;saveSettings();render();break;
      case 'save-preset':openModal('保存记忆范围',`<label class="field-label" for="preset-name">范围名称</label><input class="input" id="preset-name" maxlength="50" placeholder="例如 Midterm 1 · 蕴含"><p class="small muted">保存当前筛选及手选的 ${settings.scope.selected.length} 个条目。</p><div class="btn-row"><button class="btn primary" data-action="confirm-preset">保存</button></div>`);break;
      case 'confirm-preset':{const name=$('#preset-name')?.value.trim();if(!name){toast('先给范围取个名字。');break;}settings.presets=settings.presets.filter(p=>p.name!==name);settings.presets.unshift({name,scope:JSON.parse(JSON.stringify(settings.scope))});settings.presets=settings.presets.slice(0,25);saveSettings();closeModal();render();toast('范围已保存。');break;}
      case 'wrong-tab':wrongTab=b.dataset.tab;page=1;render();break;
      case 'review-all':launch(records.filter(r=>progress.records[r.id]?.active),'错题专练',true);break;
      case 'review-scope':launch(scopeRecords().filter(r=>progress.records[r.id]?.active),'当前范围 · 错题专练',true);break;
      case 'review-one':launch([byId.get(id)],'单条错题复练',!!progress.records[id]?.active,Math.min(5,settings.count));break;
      case 'result-retry':{const ids=[...new Set(session.results.filter(x=>!x.ok).map(x=>x.id))];const rows=ids.map(id=>byId.get(id));launch(rows,'本关错题复练',rows.some(r=>progress.records[r.id]?.active),Math.min(settings.count,Math.max(2,rows.length*2)));break;}
      case 'export-progress':exportProgress();break;
      case 'import-progress':$('#backup-file')?.click();break;
      case 'export-bank':downloadJSON({schemaVersion:1,coverage:D.coverage,theorems:records,sources:D.sources,review:D.review},'theorem-quest-bank.json');break;
      case 'shortcuts':shortcuts();break;
      case 'clear-progress':openModal('清空全部学习记录？','<p>将删除本浏览器中的错题、XP、收藏、历史和未完成关卡。题库和筛选不会删除。</p><div class="btn-row"><button class="btn" data-action="export-progress">先导出备份</button><button class="btn danger" data-action="confirm-clear">确认清空</button><button class="btn" data-action="close-modal">取消</button></div>');break;
      case 'confirm-clear':progress=E.freshProgress();save();resume=session=qState=null;try{localStorage.removeItem(KEYS.session);}catch(_){}closeModal();navigate('settings');toast('学习记录已清空。');break;
    }
  });
  document.addEventListener('keydown',ev=>{
    if(modalRoot.innerHTML){
      if(ev.key==='Escape'){ev.preventDefault();closeModal();return;}
      if(ev.key==='Tab'){const f=[...modalRoot.querySelectorAll('button:not(:disabled),input:not(:disabled),select,a[href],textarea')];const first=f[0],last=f[f.length-1];if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last?.focus();}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first?.focus();}}return;
    }
    if(view!=='quiz'||!session||!qState||ev.isComposing)return;
    const el=ev.target,mode=session.queue[session.index].mode;
    if(qState.checked){if(ev.key==='Enter'&&!el.matches('button')){ev.preventDefault();nextQuestion();}return;}
    if(el.matches('#formula-answer')&&(ev.key==='Tab'||ev.key===' ')){if(convertShortcutAtCaret(el,ev.key)){ev.preventDefault();return;}}
    if(el.matches('#name-answer')&&!$('#name-suggestions').hidden&&qState.suggestions?.length){
      if(ev.key==='ArrowDown'||ev.key==='ArrowUp'){ev.preventDefault();qState.suggestionIndex=(qState.suggestionIndex+(ev.key==='ArrowDown'?1:-1)+qState.suggestions.length)%qState.suggestions.length;updateSuggestions();$('#suggestion-'+qState.suggestionIndex)?.scrollIntoView({block:'nearest'});return;}
      if(ev.key==='Tab'||ev.key==='Enter'){ev.preventDefault();selectName(qState.suggestions[qState.suggestionIndex||0]);return;}
    }
    if(el.matches('.blank-slot')&&ev.key===' '){ev.preventDefault();$(`#blank-${Number(el.dataset.slot)+1}`)?.focus();return;}
    if(mode==='choice'&&/^[1-4]$/.test(ev.key)&&!el.matches('input,textarea')){ev.preventDefault();const id=qState.options[Number(ev.key)-1];if(id)choose(id);return;}
    if(ev.key==='Enter'&&!ev.shiftKey&&!el.matches('button')){ev.preventDefault();check();}
  });
  // Expose a read-only diagnostics snapshot, never a way to bypass grading.
  window.TQDiagnostics=()=>({view,cardCount:records.length,scopeCount:scopeRecords().length,modes:settings.modes.slice(),question:session&&session.index<session.queue.length?{...session.queue[session.index]}:null,checked:!!qState?.checked,storageOK});
  render();
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)&&!window.TQ_PORTABLE)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
