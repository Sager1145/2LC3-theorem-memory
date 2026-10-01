#!/usr/bin/env python3
"""Build a zero-dependency static site and a portable, single-file edition.
No course originals, private submissions, fonts, or test fixtures are published.
"""
from pathlib import Path
from datetime import datetime, timezone
import argparse, hashlib, json, shutil, re
ROOT=Path(__file__).resolve().parents[1]

def _sha256(path):
    digest=hashlib.sha256()
    with path.open('rb') as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()

def study_payload():
    """Read generated JSON assignments without evaluating JavaScript."""
    def assignment(asset, name):
        code=(ROOT/'assets'/asset).read_text(encoding='utf-8')
        match=re.search(r'window\.'+re.escape(name)+r'\s*=\s*',code)
        if not match: raise ValueError(f'Missing generated dataset: {name}')
        return json.JSONDecoder().raw_decode(code[match.end():])[0]
    bank=assignment('data.js','THEOREM_DATA')
    return {'schemaVersion':1,
            'bank':{k:v for k,v in bank.items() if k not in ('theorems','sources')},
            'proofQuestions':assignment('proofs.js','PROOF_QUESTIONS'),
            'proofSources':assignment('proofs.js','PROOF_SOURCES'),
            'notebookHints':assignment('notebook-hints.js','NOTEBOOK_HINTS')}

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
        code=(ROOT/f'assets/{name}.js').read_text(encoding='utf-8').replace('</script','<\\/script')
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
    study=write_study_payload(out/'data/study.json')
    write_data_manifest(out,study=study)
    if args.portable:
        p=Path(args.portable);p.parent.mkdir(parents=True,exist_ok=True);p.write_text(portable_html(),encoding='utf-8')
    print(f'Built static site: {out}')
if __name__=='__main__':main()
