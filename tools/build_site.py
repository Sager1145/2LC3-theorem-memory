#!/usr/bin/env python3
"""Build a zero-dependency static site and a portable, single-file edition.
No course originals, private submissions, fonts, or test fixtures are published.
"""
from pathlib import Path
from datetime import datetime, timezone
import argparse, hashlib, json, shutil, re
from collections import Counter
ROOT=Path(__file__).resolve().parents[1]

def generated_assignment(asset, name):
    """Read a canonical generated JSON assignment without executing scripts."""
    code=(ROOT/'assets'/asset).read_text(encoding='utf-8')
    match=re.search(r'window\.'+re.escape(name)+r'\s*=\s*',code)
    if not match: raise ValueError(f'Missing generated dataset: {name}')
    return json.JSONDecoder().raw_decode(code[match.end():])[0]

def bundled_fingerprint():
    # Include every bundled study dataset so a changed deployment supersedes
    # installed snapshots, without serializing the full bank during startup.
    hashes=[_sha256(ROOT/'assets'/name) for name in ('data.js','proofs.js','notebook-hints.js')]
    return hashlib.sha256(':'.join(hashes).encode('ascii')).hexdigest()

def browser_bank_script():
    """Losslessly share repeated provenance text in browser/portable bundles.

    Canonical JSON and generated source assets stay in their auditable format.
    Hydration completes synchronously before app.js reads THEOREM_DATA.
    """
    bank=generated_assignment('data.js','THEOREM_DATA')
    text_fields={'sourceId','sourceName','label','excerpt','rawBlock','section','file'}
    counts=Counter()
    def visit(value, replace=False):
        if isinstance(value, dict):
            for key, item in value.items():
                if key in text_fields and isinstance(item,str):
                    if replace:
                        if item in indexes: value[key]=indexes[item]
                    else: counts[item]+=1
                else:
                    if key in text_fields and isinstance(item,(int,float)):
                        raise ValueError(f'Expected provenance text in {key}')
                    visit(item,replace)
        elif isinstance(value,list):
            for item in value: visit(item,replace)
    visit(bank)
    # Small strings can cost more as dictionary entries than as inline text.
    strings=[text for text,count in counts.items() if count>1 and len(text)>8]
    indexes={text:index for index,text in enumerate(strings)}
    visit(bank,True)
    # Most preloaded provenance rows have the same four fields and locator.
    # Pack only that exact shape; uncommon notebook locators remain objects.
    for theorem in bank['theorems']:
        for index, source in enumerate(theorem['sources']):
            locator=source.get('locator')
            if list(source)==['sourceId','locator','excerpt','rawBlock'] and isinstance(locator,dict) and list(locator)==['line','endLine','section']:
                theorem['sources'][index]=[source['sourceId'],locator['line'],locator['endLine'],locator['section'],source['excerpt'],source['rawBlock']]
    def js(value): return json.dumps(value,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
    return ('/* Generated browser bank; repeated source text is shared losslessly. */\n'
            '(function(){\nconst texts='+js(strings)+';\nconst bank='+js(bank)+';\n'
            'const fields=new Set('+js(sorted(text_fields))+');\n'
            'for(const theorem of bank.theorems)theorem.sources=theorem.sources.map(row=>Array.isArray(row)?'
            '{sourceId:row[0],locator:{line:row[1],endLine:row[2],section:row[3]},excerpt:row[4],rawBlock:row[5]}:row);\n'
            'function restore(value){if(!value||typeof value!=="object")return;'
            'for(const key of Object.keys(value)){const item=value[key];'
            'if(fields.has(key)&&typeof item==="number")value[key]=texts[item];'
            'else if(item&&typeof item==="object")restore(item);}}\n'
            'restore(bank);window.THEOREM_DATA=bank;\n'
            'window.TQ_BUNDLED_FINGERPRINT='+js(bundled_fingerprint())+';\n})();\n')

def versioned_entry(html, assets):
    """Each static asset URL identifies its contents, allowing exact cache hits."""
    def version(match):
        name=match.group(1)
        return './assets/'+name+'?v='+_sha256(assets/name)[:16]
    return re.sub(r'\./assets/([^"?]+)(?:\?[^\"]*)?',version,html)

def offline_worker(html):
    worker=(ROOT/'sw.js').read_text(encoding='utf-8')
    assets=['./','./index.html']+re.findall(r'(?:src|href)="(\./assets/[^\"]+)"',html)+['./favicon.svg','./manifest.webmanifest']
    worker=re.sub(r'const ASSETS=\[[^\n]*\];','const ASSETS='+json.dumps(assets,separators=(',',':'))+';',worker)
    revision=hashlib.sha256((html+worker).encode('utf-8')).hexdigest()[:16]
    return re.sub(r"const CACHE='[^']+';","const CACHE='theorem-quest-"+revision+"';",worker)

def _sha256(path):
    digest=hashlib.sha256()
    with path.open('rb') as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()

def study_payload():
    """Read generated JSON assignments without evaluating JavaScript."""
    bank=generated_assignment('data.js','THEOREM_DATA')
    return {'schemaVersion':1,
            'bank':{k:v for k,v in bank.items() if k not in ('theorems','sources')},
            'proofQuestions':generated_assignment('proofs.js','PROOF_QUESTIONS'),
            'proofSources':generated_assignment('proofs.js','PROOF_SOURCES'),
            'notebookHints':generated_assignment('notebook-hints.js','NOTEBOOK_HINTS')}

def write_study_payload(destination):
    destination=Path(destination)
    destination.parent.mkdir(parents=True,exist_ok=True)
    destination.write_text(json.dumps(study_payload(),ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
    return destination

def write_data_manifest(out, data_dir=None, built_at=None, study=None):
    """Write the small update manifest consumed by native clients."""
    data_dir=Path(data_dir) if data_dir is not None else ROOT/'data'
    theorems=data_dir/'theorems.json'
    sources=data_dir/'sources.json'
    theorem_hash=_sha256(theorems)
    source_hash=_sha256(sources)
    hashes=[theorem_hash,source_hash]
    if study is not None: hashes.append(_sha256(Path(study)))
    revision=hashlib.sha256(':'.join(hashes).encode('ascii')).hexdigest()
    if built_at is None:
        built_at=datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace('+00:00','Z')
    manifest={
        'schemaVersion':1,
        'revision':revision,
        'files':{
            'theorems':{'path':'data/theorems.json','sha256':theorem_hash},
            'sources':{'path':'data/sources.json','sha256':source_hash},
        },
        'theoremCount':len(json.loads(theorems.read_text(encoding='utf-8'))),
        'builtAt':built_at,
    }
    if study is not None:
        manifest['files']['study']={'path':'data/study.json','sha256':hashes[-1]}
    destination=Path(out)/'data'/'version.json'
    destination.parent.mkdir(parents=True,exist_ok=True)
    destination.write_text(json.dumps(manifest,separators=(',',':'))+'\n',encoding='utf-8')
    return manifest

def portable_html():
    html=(ROOT/'index.html').read_text(encoding='utf-8')
    html=re.sub(r'<link rel="(?:icon|manifest)"[^>]*>', '', html)
    css=(ROOT/'assets/style.css').read_text(encoding='utf-8')
    html=re.sub(r'<link rel="stylesheet" href="\./assets/style\.css(?:\?[^"]*)?">', lambda _: '<style>'+css+'</style>', html)
    for name in ['engine','data','proofs','notebook-hints','i18n','app']:
        html=re.sub(rf'<script defer src="\./assets/{name}\.js(?:\?[^"]*)?"></script>','',html)
    # Inline scripts execute AFTER the app/modal/toast nodes exist.
    scripts='<script>window.TQ_PORTABLE=true;</script>\n'
    for name in ['engine','data','proofs','notebook-hints','i18n','app']:
        code=(browser_bank_script() if name=='data' else (ROOT/f'assets/{name}.js').read_text(encoding='utf-8')).replace('</script','<\\/script')
        scripts+='<script>\n'+code+'\n</script>\n'
    return html.replace('</body>',scripts+'</body>')

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--out',default='_site');ap.add_argument('--portable');args=ap.parse_args()
    out=Path(args.out).resolve()
    if out==ROOT or out in ROOT.parents:raise SystemExit('Output must not overwrite source directory.')
    out.mkdir(parents=True,exist_ok=True)
    for name in ['index.html','favicon.svg','manifest.webmanifest','sw.js','.nojekyll']:
        shutil.copy2(ROOT/name,out/name)
    for name in ['assets','data']:
        shutil.copytree(ROOT/name,out/name,dirs_exist_ok=True)
    (out/'assets/data.js').write_text(browser_bank_script(),encoding='utf-8')
    html=versioned_entry((ROOT/'index.html').read_text(encoding='utf-8'),out/'assets')
    (out/'index.html').write_text(html,encoding='utf-8')
    (out/'sw.js').write_text(offline_worker(html),encoding='utf-8')
    study=write_study_payload(out/'data/study.json')
    write_data_manifest(out,study=study)
    if args.portable:
        p=Path(args.portable);p.parent.mkdir(parents=True,exist_ok=True);p.write_text(portable_html(),encoding='utf-8')
    print(f'Built static site: {out}')
if __name__=='__main__':main()
