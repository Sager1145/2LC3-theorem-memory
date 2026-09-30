#!/usr/bin/env python3
"""Build an auditable static theorem bank from a PRIVATE local source folder.

Supported: recursive ZIP, UTF-8 Markdown/text, CalcCheck HTML, LaTeX catalogue
macros / literal proof blocks, PDF text (PyMuPDF, no OCR). Never execute TeX/HTML.
Uncertain PDF declarations go to review-candidates.json, not the default quiz.
Original slides, proofs, personal names and full source documents are NOT copied
into the site. Run on your computer when additional Project bytes are available.
"""
from __future__ import annotations
import argparse, hashlib, html, json, re, sys, zipfile
from pathlib import Path
from collections import Counter, defaultdict
from typing import Any

LIMIT_FILE=80*1024*1024
LIMIT_TOTAL=500*1024*1024
DECL_KINDS={'axioment':'Axiom','theorement':'Theorem','lemmaent':'Lemma','corollaryent':'Corollary','derivedruleent':'Derived rule','primitiveruleent':'Primitive rule'}
MACROS={'equiv':'≡','nequiv':'≢','Rightarrow':'⇒','Leftarrow':'⇐','implies':'⇒','follows':'⇐','land':'∧','wedge':'∧','lor':'∨','vee':'∨','neg':'¬','lnot':'¬','cdot':'·','times':'×','leq':'≤','geq':'≥','le':'≤','ge':'≥','neq':'≠','ne':'≠','forall':'∀','exists':'∃','in':'∈','notin':'∉','cup':'∪','cap':'∩','subseteq':'⊆','supseteq':'⊇','subset':'⊂','supset':'⊃','vdash':'⊦','top':'true','bot':'false','emptyset':'∅','langle':'⟨','rangle':'⟩','sum':'∑','prod':'∏','lambda':'λ','alpha':'α','beta':'β','gamma':'γ','delta':'δ','to':'→','mapsto':'↦','mathbbN':'ℕ','mathbbZ':'ℤ'}
TEXT_COMMANDS=['texttt','textbf','emph','textit','mathrm','operatorname','text','mbox','key','mathsf','mathit','textrm','textnormal','ensuremath','underline']
IGNORE_WORDS=re.compile(r'\b(?:Proof|Assuming|Calculation|This is|Using|expected goal|Could not|CalcCheck|Source basis|GOAL|THEOREM NAME|START)\b')
NUM=re.compile(r'\((\d+(?:\.\d+)*(?:[a-z](?:≡|=)?|≡|=)?)\)')
QUOTES=re.compile(r'“([^”]+)”|"([^"]+)"|``(.*?)\'\'')
TOKEN=re.compile(r"is-knight|is-knave|[A-Za-zα-ωΑ-Ω][A-Za-zα-ωΑ-Ω0-9_₀-₉'′]*|\d+|[^\s]",re.U)


def digest(s: str | bytes,n=12): return hashlib.sha256(s.encode() if isinstance(s,str) else s).hexdigest()[:n]

def braces(s,pos):
    while pos<len(s) and s[pos].isspace():pos+=1
    if pos>=len(s) or s[pos]!='{': return None,pos
    start=pos+1; depth=1;pos+=1
    while pos<len(s):
        if s[pos]=='\\': pos+=2;continue
        if s[pos]=='{':depth+=1
        if s[pos]=='}':
            depth-=1
            if depth==0:return s[start:pos],pos+1
        pos+=1
    return None,pos

def clean(s):
    s=html.unescape(s).replace('\u00a0',' ').replace('−','-').replace('⋅','·').replace('/≡','≢').replace('/=','≠')
    s=s.replace('\\{','SETOPEN').replace('\\}','SETCLOSE')
    s=s.replace('\\textbackslash{}','\\').replace('\\textquotesingle{}',"'")
    s=s.replace('\\textless{}','<').replace('\\textgreater{}','>').replace('\\_','_').replace('\\&','&')
    s=re.sub(r'\\(?:hspace|vspace)\*?\{[^}]*\}',' ',s)
    for cmd in TEXT_COMMANDS:
        pattern=re.compile(r'\\'+cmd+r'\s*\{')
        while (m:=pattern.search(s)):
            val,end=braces(s,m.end()-1)
            if val is None:break
            s=s[:m.start()]+val+s[end:]
    s=re.sub(r'\\(?:ttfamily|calcfont|small|footnotesize|scriptsize|normalsize|sffamily|quad|qquad|displaystyle|,|;|!)\b?',' ',s) if False else s
    s=re.sub(r'\\(?:ttfamily|calcfont|small|footnotesize|scriptsize|normalsize|sffamily|quad|qquad|displaystyle)(?![a-zA-Z])',' ',s)
    for k,v in sorted(MACROS.items(),key=lambda x:-len(x[0])):
        s=re.sub(r'\\'+k+r'(?![A-Za-z])',lambda m:v,s)
    s=s.replace('\\(', '').replace('\\)','').replace('\\[','').replace('\\]','')
    s=re.sub(r'\$_\{?(\d)\}?\$',lambda m:'₀₁₂₃₄₅₆₇₈₉'[int(m[1])],s)
    s=s.replace('$','').replace('\\,',' ').replace('\\;',' ').replace('\\!','').replace('\\ ',' ')
    s=s.replace('\\`','`').replace('\\**','').replace('**','').replace('\\\n','\n')
    s=s.replace('SETOPEN','{').replace('SETCLOSE','}')
    return re.sub(r'\s+',' ',s).strip().rstrip('\\').strip()

def public_name(name):
    if 'MARKING-' in name and 'yangj' in name:return 'Midterm1_Notebook1_Oddities_2025_marked.html'
    if 'yangj' in name:return 'Midterm1_Notebook2_Integers_2025.html'
    return name

def lineage(name):
    if re.search(r'(Full_Theorem_List|Theorems_and_Study_Notes)',name):return 'Canonical theorem catalogue'
    if 'Week1' in name:return 'Week 1 notes'
    if 'Week2' in name:return 'Week 2 notes'
    if 'Week3' in name:return 'Week 3 notes'
    if '20260912-012' in name:return 'H2 pasted notebook'
    if '20260911-165540' in name:return 'H1 pasted notebook'
    if '20260910-202407' in name:return 'Pasted theorem catalogue'
    if 'Markdown (2)(1)' in name:return 'Ex1.7 pasted notebook'
    return public_name(name)

def topic(formula, numbers, context=''):
    n=numbers[-1] if numbers else ''
    if n.startswith('15.'):return '整数与代数'
    if n.startswith('1.'):return '等式与基本规则'
    if any(x in formula for x in ['⇒⁅','⇒ ⁅','⍮',':=']):return '命令正确性'
    if any(x in formula for x in ['is-knight','is-knave','says']):return 'Knights & Knaves'
    if any(x in formula for x in ['suc','pred','double','even','odd']):return '自然数与归纳'
    if n.startswith('3.'):
        v=float('.'.join(n.split('.')[:2]).rstrip('abcdefghijklmnopqrstuvwxyz≡='))
        sub=int(re.match(r'3\.(\d+)',n)[1])
        return '等价、否定与异或' if sub<24 else '析取 ∨' if sub<35 else '合取 ∧' if sub<57 else '蕴含 ⇒' if sub<83 else '替换与 Leibniz'
    if n.startswith('4.') or 'Monotonicity' in context or 'Antitonicity' in context:return '序与单调性'
    if n.startswith(('8.','9.')) or any(x in formula for x in ['∀','∃','∑','∏']):return '量词与谓词逻辑'
    if n.startswith(('11.','12.')) or any(x in formula for x in ['∈','⊆','∪','∩']):return '集合与关系'
    if any(x in formula for x in ['⨾','˘','⌢','◃','▹']):return '关系、序列与后期内容'
    if any(x in formula for x in ['≤','≥','<','>']):return '序与单调性'
    if any(x in formula for x in ['⇒','⇐']):return '蕴含 ⇒'
    if any(x in formula for x in ['∧','∨','≡','≢','¬']):return '等价、否定与异或'
    if any(x in formula for x in ['+','·','-']):return '整数与代数'
    return '等式与基本规则'

def plausible(f):
    if not f or len(f)>1800:return False,'empty-or-long'
    if 'expression' in f:return False,'placeholder-template'
    if IGNORE_WORDS.search(f):return False,'prose-or-proof'
    if re.search(r'\\[A-Za-z]|�|[\ue000-\uf8ff]|\?₁|\?₂|\?₃|\\end|#\d',f):return False,'unresolved-source-syntax'
    if not any(x in f for x in ['=','≡','≢','⇒','⇐','⊦','∈','≤','≥','≠','∧','∨','¬','<','>']) and f not in ['true','false']:return False,'not-a-formula'
    opens={'(':')','[':']','{':'}','⁅':'⁆','⟨':'⟩','⟪':'⟫','⦗':'⦘'};close=set(opens.values());stack=[]
    for c in f:
        if c in opens:stack.append(opens[c])
        elif c in close:
            if not stack or stack.pop()!=c:return False,'unbalanced-delimiters'
    if stack:return False,'unbalanced-delimiters'
    words=re.findall(r'\b[a-zA-Z]{4,}\b',f)
    if any(w not in ['true','false','double','even','says','knight','knave','pred','skip','abort','while','then','else','head','tail','length','domain','range','take','drop','real','nat','bool'] for w in words):return False,'unrecognised-prose-or-function'
    return True,''

class Builder:
    def __init__(self):
        self.sources=[];self.raw=[];self.candidates=[];self.texts=[];self.seen_bytes={};self.total=0;self.archives=[]
    def source(self,name,raw,fmt,parent=''):
        sha=digest(raw,64);dup=self.seen_bytes.get(sha)
        sid='s-'+digest(name+sha)
        src={'id':sid,'name':public_name(name),'format':fmt,'sha256':sha,'bytes':len(raw),'parentArchive':public_name(parent),'lineage':lineage(name),'status':'read','duplicateOf':dup,'pages':0,'charactersRead':0,'declarations':0,'candidates':0}
        self.sources.append(src)
        if dup:src['status']='duplicate-bytes'
        else:self.seen_bytes[sha]=sid
        return src
    def add(self,header,formula,src,locator,kind='Theorem',context='',status='confirmed',reason=''):
        header=clean(header);formula=clean(formula).strip('` ').rstrip(';')
        names=[next(x for x in q if x) for q in QUOTES.findall(header)]
        names=list(dict.fromkeys(clean(x) for x in names))
        nums=list(dict.fromkeys(NUM.findall(header)))
        if not nums and not names:return
        if names and any(x in names[0] for x in ['THEOREM','ANOTHER','THEOREM OR','?']):return
        valid,why=plausible(formula)
        if not valid:status='review';reason=reason or why
        r={'header':header,'name':names[0] if names else '原文未命名','aliases':names[1:],'numbers':nums,'formula':formula,'kind':kind,'topic':topic(formula,nums,header+' '+context),'current':not ('2025-' in src['name'] and 'slides' in src['name'].lower()) and 'Fall2025_Lecture' not in src['name'],
           'source':{'sourceId':src['id'],'locator':locator,'excerpt':(header+': '+formula)[:450]},'status':status,'reason':reason}
        if status=='review':self.candidates.append(r);src['candidates']+=1
        else:self.raw.append(r);src['declarations']+=1
    def declarations(self,text,src,base=1):
        lines=text.splitlines();i=0
        # Restrict headers to actual declared kinds / quoted names / theorem numbers.
        pat=re.compile(r'^\s*(?:(Axiom|Theorem|Lemma|Corollary|Fact|Derived inference rule|Derived rule|Primitive inference rule|Primitive rule)\s+)?((?:(?:\([^)]{1,40}\)|“[^”]+”|"[^"]+")\s*)+):?\s*(.*)$')
        while i<len(lines):
            line=re.sub(r'^\s*\d+:\s{0,2}','',lines[i]);line=re.sub(r'^\s*[-*]\s+','',line);line=html.unescape(line).replace('**','').replace('\\`','`').replace('\u00a0',' ')
            m=pat.match(line)
            if not m or (not m[1] and not any(c in m[2] for c in ['“','"'])):i+=1;continue
            kind,head,first=m.groups();start=i;i+=1
            fs=[first.strip()];
            while i<len(lines):
                nxt=re.sub(r'^\s*\d+:\s{0,2}','',lines[i]);flat=html.unescape(nxt).replace('**','').replace('\u00a0',' ');flat=re.sub(r'^\s*[-*]\s+(?=(?:Theorem|Axiom|Lemma|Corollary|Primitive|Derived|Fact|“))','',flat)
                if not flat.strip() or re.match(r'^\s*(?:Proof\s*:|Calculation|By |Using |Assuming|Declaration|—|\\(?:end|begin|source|proofmeta)|Axiom\b|Theorem\b|Lemma\b|Corollary\b|Fact\b)',flat) or pat.match(flat):break
                if len(fs)>12:break
                fs.append(flat.strip());i+=1
            f=' '.join(fs).strip().lstrip(':').strip()
            # Avoid absorbing a following bare markdown section.
            f=f.split(' — CalcCheck:')[0].strip()
            self.add(head,f,src,{'line':base+start},kind or 'Theorem')
    def tex(self,text,src):
        begin=text.find('\\begin{document}');off=max(0,begin);body=text[off:]
        p=re.compile(r'\\('+ '|'.join(DECL_KINDS)+r')\s*\{')
        for m in p.finditer(body):
            head,end=braces(body,m.end()-1);form,end2=braces(body,end)
            if head is not None and form is not None:self.add(head,form,src,{'line':text[:off+m.start()].count('\n')+1},DECL_KINDS[m[1]])
        # Source theorem indexes put names/formulas in tables instead of code cells.
        # Parse only formula-bearing monospace groups, never prose or diagram captions.
        for ln,line in enumerate(text.splitlines(),1):
            if '&' not in line or r'\ttfamily' not in line:continue
            cells=re.split(r'(?<!\\)&',line)
            if len(cells)<2:continue
            if cells[0].strip().startswith('“') and r'\ttfamily' in cells[1]:
                h=cells[0].strip();cell=cells[1];kind='Source-listed law'
            elif len(cells)>=3 and re.match(r'^(?:Axiom|Theorem|Lemma|Corollary|Derived rule|Primitive rule)\s*$',cells[0].strip()) and r'\ttfamily' in cells[2]:
                h=clean(cells[1]).strip('{} ');cell=cells[2];kind=cells[0].strip()
            else:continue
            m=re.search(r'\{\\ttfamily',cell)
            if not m:continue
            f,end=braces(cell,m.start())
            if f is None:continue
            f=clean(f)
            for variant in f.split(' / '):self.add(h,variant,src,{'line':ln},kind,context='source theorem index')

        # Literal code blocks preserve the exact course declaration text.
        code_blocks=list(re.finditer(r'\\begin\{(Code|ProofCode|verbatim|syntaxbox)\}(.*?)\\end\{\1\}',text,re.S))
        code_lines=set()
        for m in code_blocks:
            code_lines.update(range(text[:m.start()].count('\n')+1,text[:m.end()].count('\n')+2))
        for m in code_blocks:
            self.declarations(m[2],src,text[:m.start(2)].count('\n')+1)
        # A few source lists use direct quoted declarations outside code environments.
        for n,line in enumerate(text.splitlines(),1):
            if n not in code_lines and line.lstrip().startswith(('Axiom ','Theorem ','Lemma ','Corollary ')) and ':' in line:
                self.declarations(line,src,n)
    def html(self,text,src):
        from bs4 import BeautifulSoup
        soup=BeautifulSoup(text,'html.parser')
        for el in soup(['script','style','noscript']):el.decompose()
        blocks=soup.select('pre,textarea')
        for i,el in enumerate(blocks):self.declarations(el.get_text('\n'),src,i+1)
        visible=soup.get_text(' ',strip=True)
        src['emptyCodeCells']=sum(not el.get_text(strip=True) for el in soup.select('textarea'))
        return visible
    def pdf(self,raw,src):
        import fitz
        doc=fitz.open(stream=raw,filetype='pdf');src['pages']=len(doc)
        full=[]
        combined='Fall2025_Lecture_Slides' in src['name']
        for pno,page in enumerate(doc,1):
            text=page.get_text('text',sort=True);full.append(text)
            if combined:continue # A different layout is not an independent source.
            for slide in re.split(r'McMaster U\s+COMPSCI 2LC3[^\n]*',text):
                self.pdf_slide(slide,src,pno)
        if combined:src['status']='read-duplicate-compilation'
        return '\n\f\n'.join(full)
    def pdf_slide(self,text,src,pno):
        lines=[l.strip() for l in text.splitlines()]; indices=[]
        pat=re.compile(r'^(?:(Axiom|Theorem|Lemma|Corollary)\s+)?\((\d+\.\d+(?:\.[0-9]+)*(?:[a-z≡=])?)\)\s*(.*)')
        for i,l in enumerate(lines):
            m=pat.match(l)
            if m:indices.append((i,m))
        for k,(i,m) in enumerate(indices):
            end=indices[k+1][0] if k+1<len(indices) else min(len(lines),i+7)
            chunk=[]
            for l in lines[i+1:end]:
                if not l:
                    if chunk:break
                    continue
                chunk.append(l)
            rest=m[3]; merged=' '.join([rest]+chunk)
            names=[q[0] or q[1] or q[2] for q in QUOTES.findall(merged)]
            formula='';name=''
            if names:
                last=list(QUOTES.finditer(merged))[-1];formula=merged[last.end():].lstrip(' :,')
                name=' '.join('“'+x+'”' for x in names)
            elif ':' in merged:
                head,formula=merged.split(':',1)
                if len(head)<90 and not any(x in head for x in ['⇒','≡','=','∧','∨']):name='“'+head.strip()+'”'
                else:formula=''
            else:
                # A naked mathematical statement is legitimate, a bare theorem reference is not.
                if re.match(r'^(?:[a-zA-Z]|¬|\()',rest) and any(x in rest for x in ['≡','⇒','=','∧','∨','≤']):formula=merged
            if not formula:continue
            formula=re.split(r'\s+(?:Proof|How to|For example|Can be|where|is valid|with neutral|provided|if |iff |—|⟨\.\.\.)',formula)[0]
            formula=clean(formula)
            # PDF-only additions remain review candidates unless a source-clean formula
            # can be verified later against catalogue/macros or a curated review file.
            self.add('('+m[2]+') '+name,formula,src,{'page':pno},m[1] or 'Theorem',text[:150],status='review',reason='pdf-declaration-needs-review')
    def file(self,name,raw,parent='',depth=0):
        ext=Path(name).suffix.lower().lstrip('.')
        if len(raw)>LIMIT_FILE:raise ValueError(f'File too large: {name}')
        self.total+=len(raw)
        if self.total>LIMIT_TOTAL:raise ValueError('Source expansion limit exceeded')
        src=self.source(name,raw,ext,parent)
        if src['duplicateOf']:return
        if ext=='zip':
            if depth>=4:src['status']='nested-zip-depth-limit';return
            import io
            with zipfile.ZipFile(io.BytesIO(raw)) as z:
                items=[x for x in z.infolist() if not x.is_dir() and not x.filename.startswith('__MACOSX/')]
                src['archiveEntries']=len(items)
                for info in items:
                    if info.file_size>LIMIT_FILE:continue
                    self.file(info.filename,z.read(info),name,depth+1)
            src['status']='expanded';return
        if ext=='pdf':text=self.pdf(raw,src)
        elif ext in ['tex','md','txt','html','htm','calcnb','json','csv','hs']:
            text=raw.decode('utf-8-sig',errors='replace')
            if ext=='tex':self.tex(text,src)
            elif ext in ['html','htm']:text=self.html(text,src)
            elif ext in ['md','txt','calcnb']:
                if 'CalcCheck' in text or 'Axiom' in text or 'Theorem' in text:self.declarations(text,src)
        else:src['status']='non-text-asset';return
        src['charactersRead']=len(text)
        self.texts.append((src,text))
    def finish(self,out):
        # Preserve exact numbered variants. Merge repeated declarations, sources and aliases.
        bank={}
        for r in self.raw:
            nums=r['numbers']; ref=nums[-1] if nums else ''
            key=(ref,r['name'] if not ref else '',re.sub(r'\s+','',r['formula']))
            if key not in bank:
                item={k:v for k,v in r.items() if k not in ['source','status','reason','header']}
                item.update({'id':'t-'+digest('|'.join(key)),'sources':[],'aliases':r['aliases'][:],'importantEvidence':[],'emphasisEvidence':[],'occurrences':0,'documentCount':0,'proofMentions':0})
                bank[key]=item
            item=bank[key];item['current']|=r['current']; item['aliases']=list(dict.fromkeys(item['aliases']+[r['name']]+r['aliases']))
            if r['source'] not in item['sources']:item['sources'].append(r['source'])
        items=list(bank.values())
        bynum=defaultdict(list)
        for r in items:
            for n in r['numbers']:bynum[n].append(r)
        # Attach matching PDF citations/explicit importance without introducing unverified data.
        seenreview=set();reviews=[]
        for r in self.candidates:
            cands=[v for n in r['numbers'] for v in bynum.get(n,[])]
            exact=[v for v in cands if re.sub(r'[\s()]','',v['formula'])==re.sub(r'[\s()]','',r['formula'])]
            if exact:
                for v in exact:
                    if r['source'] not in v['sources']:v['sources'].append(r['source'])
                continue
            # Known number in source is a mention, not a second unverified card.
            if cands and r['reason']=='pdf-declaration-needs-review':continue
            key=(tuple(r['numbers']),r['name'],r['formula'])
            if key in seenreview:continue
            seenreview.add(key);reviews.append(r)
        source_map={s['id']:s for s in self.sources}
        for r in items:
            r['aliases']=[x for x in dict.fromkeys(r['aliases']) if x!=r['name']]
            r['displayRef']='('+r['numbers'][-1]+')' if r['numbers'] else '未编号 ['+r['id'][2:8].upper()+']'
            groups=set();occ=0;proof=0
            names=[r['name']]+r['aliases']
            # Counts de-duplicate PDF layouts/revision families using the maximum
            # count observed in each lineage, not a sum across exports.
            groupcounts=defaultdict(int);proofcounts=defaultdict(int)
            for src,text in self.texts:
                if src['status'] in ['duplicate-bytes','read-duplicate-compilation'] or src['name'].endswith('.pdf') and 'Week' in src['name']:continue
                ncount=max([len(re.findall(r'“'+re.escape(n)+r'”',text)) for n in names if n!='原文未命名']+[0])
                refcount=max([len(re.findall(r'\('+re.escape(n)+r'\)',text)) for n in r['numbers']]+[0])
                count=max(ncount,refcount)
                g=src['lineage'];groupcounts[g]=max(groupcounts[g],count)
                # Hints have actual ⟨...⟩ blocks; no table/statistics inflation.
                hints=re.findall(r'⟨([^⟩]{0,1400})⟩',text)
                pcount=sum(any('“'+n+'”' in h for n in names if n!='原文未命名') for h in hints)
                proofcounts[g]=max(proofcounts[g],pcount)
                if src['format']=='pdf':
                    slides=re.split(r'McMaster U\s+COMPSCI 2LC3[^\n]*',text)
                    for chunk in slides:
                        first=' '.join(chunk.strip().splitlines()[:3])
                        refs=[n for n in r['numbers'] if '('+n+')' in chunk]
                        if refs and re.search(r'\bImportant\b',first,re.I):
                            ev={'sourceId':src['id'],'label':first[:180],'references':refs}
                            if ev not in r['importantEvidence']:r['importantEvidence'].append(ev)
                        if refs:
                            for line in chunk.splitlines():
                                if re.search(r'!{2,}',line) and any('('+n+')' in line for n in refs):
                                    ev={'sourceId':src['id'],'label':line.strip()[:240]}
                                    if ev not in r['emphasisEvidence']:r['emphasisEvidence'].append(ev)
            r['frequencyByFamily']={k:v for k,v in groupcounts.items() if v};r['proofFrequencyByFamily']={k:v for k,v in proofcounts.items() if v};r['occurrences']=sum(groupcounts.values());r['documentCount']=sum(v>0 for v in groupcounts.values());r['proofMentions']=sum(proofcounts.values())
            r['important']=bool(r['importantEvidence']);r['repeated']=r['occurrences']>=2
            r['priority']=r['important'] or r['proofMentions']>=3 or bool(r['emphasisEvidence'])
        items.sort(key=lambda r:(not r['current'],r['topic'],r['numbers'][-1] if r['numbers'] else 'z',r['name']))
        coverage={'schemaVersion':1,'builtAt':'2026-09-29','completeProjectAccess':False,'sourceFiles':len(self.sources),'readFiles':sum(s['status'] not in ['non-text-asset'] for s in self.sources),
          'pdfPagesRead':sum(s['pages'] for s in self.sources),'theoremCount':len(items),'currentCount':sum(r['current'] for r in items),'reviewCount':len(reviews),'importantCount':sum(r['important'] for r in items),'repeatedCount':sum(r['repeated'] for r in items),
          'notice':'已读取可取得的课程资料。Archive.zip 等 Project 原始字节不可取得；PDF-only 待核对条目不自动作为确定答案。2025 全学期课件独立标记，不等同于 2026 当前进度。',
          'countMethod':'出现次数按同一来源家族取修订版最大值；同字节副本、同笔记 PDF/TeX、整套课件不同拼版不重复累加。proofMentions 只数 ⟨…⟩ 提示中的名称；同名家族计数，不是精确变体调用次数。'}
        out.mkdir(parents=True,exist_ok=True)
        for filename,obj in [('theorems.json',items),('sources.json',self.sources),('coverage.json',coverage),('review-candidates.json',reviews)]:
            (out/filename).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
        payload={'theorems':items,'sources':self.sources,'coverage':coverage,'review':reviews}
        assets=out.parent/'assets';assets.mkdir(exist_ok=True)
        (assets/'data.js').write_text('/* Generated by tools/build_corpus.py; source provenance in data/. */\nwindow.THEOREM_DATA = '+json.dumps(payload,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')+';\n')
        print(json.dumps(coverage,ensure_ascii=False,indent=2))

def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('source',type=Path);ap.add_argument('--out',type=Path,default=Path('data'));args=ap.parse_args()
    b=Builder()
    for p in sorted(args.source.rglob('*')):
        if p.is_file():
            try:b.file(str(p.relative_to(args.source)),p.read_bytes())
            except Exception as e:print(f'WARNING {p.name}: {e}',file=sys.stderr)
    b.finish(args.out)
if __name__=='__main__':main()
