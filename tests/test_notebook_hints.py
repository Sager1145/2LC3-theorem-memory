import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'tools'))
from build_notebook_hints import Resolver, build, extract_html

BANK=[{'id':'a','name':'First law','aliases':[],'numbers':['3.1'],'formula':'p ≡ p'},
      {'id':'b','name':'Second law','aliases':[],'numbers':['3.2'],'formula':'q ≡ q'},
      {'id':'v1','name':'Shared law','aliases':[],'numbers':['3.47','3.47a'],'formula':'p ∧ q ≡ q ∧ p'},
      {'id':'v2','name':'Shared law','aliases':[],'numbers':['3.47','3.47b'],'formula':'p ∨ q ≡ q ∨ p'}]
SOURCE={'sourceId':'calc-2026-16001'}

def hint(text,checked=True):
    status='Proven' if checked else 'Open'
    return f'<br>= <span class="HBConjStatus{status}">⟨</span>{text}<span class="HBConjStatus{status}">⟩</span><br>x'

def cell(body,number=2):
    return f'<div tabindex=""><div>[{number}]</div><textarea>draft ⟨“Second law”⟩</textarea><span class="ConjStatusProven">Theorem</span> “Declaration name”<br><span class="ConjStatusProven">Calculation:</span><br>x{body}<span class="RKConfirmedOK">All steps OK</span></div>'

class NotebookHintsTests(unittest.TestCase):
    def test_all_names_numbers_and_repeated_real_steps(self):
        raw=cell(hint('“First law” with “Second law”')+hint('(3.1)')+hint('“First law”'))
        uses,_=extract_html(raw,SOURCE,Resolver(BANK))
        self.assertEqual(len(uses),3)
        self.assertEqual(uses[0]['theoremIds'],['a','b'])
        self.assertEqual(uses[1]['references'],['3.1'])
        self.assertEqual(uses[1]['theoremIds'],['a'])
        self.assertNotEqual(uses[1]['id'],uses[2]['id'])
        self.assertTrue(all(u['checked'] for u in uses))

    def test_popup_prose_draft_and_diagnostic_echo_excluded(self):
        prose='<div tabindex=""><div>[1]</div><textarea></textarea><pre>≡⟨“Second law”⟩</pre></div>'
        popup='<div id="theorem-popup">Theorem “Second law”<br>≡⟨“Second law”⟩</div>'
        echo='<span class="RKConfirmedOK"><br>=⟨“Second law”⟩</span>'
        uses,_=extract_html(prose+popup+cell(hint('“First law”')+echo),SOURCE,Resolver(BANK))
        self.assertEqual(len(uses),1)
        self.assertEqual(uses[0]['names'],['First law'])

    def test_ambiguous_variants_remain_grouped(self):
        uses,_=extract_html(cell(hint('“Shared law”')+hint('(3.47)')+hint('“Shared law” (3.47a)')),SOURCE,Resolver(BANK))
        for u in uses[:2]:
            self.assertEqual(u['theoremIds'],[])
            self.assertEqual(u['groups'][0]['status'],'ambiguous')
            self.assertEqual(u['groups'][0]['candidateTheoremIds'],['v1','v2'])
        self.assertEqual(uses[2]['theoremIds'],['v1'])

    def test_by_and_partially_checked_hints_are_distinct(self):
        raw=cell(hint('“First law”',False)+'<br><span class="ConjStatusProven">By</span>“Second law”')
        uses,_=extract_html(raw,SOURCE,Resolver(BANK))
        self.assertEqual(len(uses),2)
        self.assertFalse(uses[0]['checked'])
        self.assertEqual(uses[1]['kind'],'by')
        self.assertTrue(uses[1]['checked'])

    def test_title_resolves_mismatched_saved_origin_port(self):
        registry=[{'id':'calc-2026-16001','url':'http://example:16001/','name':'2026 H1 · popup','year':2026},
                  {'id':'calc-2026-16002','url':'http://example:16002/','name':'2026 Ex1.1 · popup','year':2026}]
        raw='<!-- saved from url=(0030)http://example:16001/ -->'+cell(hint('“First law”'))
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);(root/'Ex1.1 — saved.html').write_text(raw)
            payload=build(root,BANK,registry)
        captured=next(n for n in payload['notebooks'] if n['port']==16002)
        self.assertEqual(captured['savedFromPort'],16001)
        self.assertEqual(captured['portResolution'],'notebook-title')
        self.assertEqual(len(captured['hintUses']),1)

    def test_duplicate_exports_and_uncaptured_are_not_false_zero(self):
        registry=[{'id':'calc-2026-16001','url':'http://example:16001/','name':'H1','year':2026},
                  {'id':'proof-16001','url':'http://example:16001/','name':'H1','year':2026},
                  {'id':'calc-2026-16002','url':'http://example:16002/','name':'Ex1.1','year':2026}]
        raw='<!-- saved from url=(0030)http://example:16001/ -->'+cell(hint('“First law”')+hint('“First law”'))
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);(root/'one.html').write_text(raw);(root/'copy.html').write_text(raw)
            payload=build(root,BANK,registry)
        self.assertEqual(payload['summary']['registeredNotebooks'],2)
        self.assertEqual(payload['summary']['hintCount'],2)
        self.assertEqual(payload['groups'][0]['hintCount'],2)
        self.assertTrue(payload['groups'][0]['repeated'])
        missing=next(n for n in payload['notebooks'] if n['port']==16002)
        self.assertEqual(missing['status'],'not-captured')
        self.assertEqual(missing['hintUses'],[])

if __name__=='__main__':unittest.main()
