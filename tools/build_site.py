#!/usr/bin/env python3
"""Build a zero-dependency static site and a portable, single-file edition.
No course originals, private submissions, fonts, or test fixtures are published.
"""
from pathlib import Path
import argparse, shutil, re
ROOT=Path(__file__).resolve().parents[1]

def portable_html():
    html=(ROOT/'index.html').read_text(encoding='utf-8')
    html=re.sub(r'<link rel="(?:icon|manifest)"[^>]*>', '', html)
    css=(ROOT/'assets/style.css').read_text(encoding='utf-8')
    html=re.sub(r'<link rel="stylesheet" href="\./assets/style\.css(?:\?[^"]*)?">', lambda _: '<style>'+css+'</style>', html)
    for name in ['engine','data','app']:
        html=re.sub(rf'<script defer src="\./assets/{name}\.js(?:\?[^"]*)?"></script>','',html)
    # Inline scripts execute AFTER the app/modal/toast nodes exist.
    scripts='<script>window.TQ_PORTABLE=true;</script>\n'
    for name in ['engine','data','app']:
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
    if args.portable:
        p=Path(args.portable);p.parent.mkdir(parents=True,exist_ok=True);p.write_text(portable_html(),encoding='utf-8')
    print(f'Built static site: {out}')
if __name__=='__main__':main()
