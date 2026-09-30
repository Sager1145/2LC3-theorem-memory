import importlib.util
from pathlib import Path
import unittest

spec=importlib.util.spec_from_file_location('proofs',Path(__file__).resolve().parents[1]/'tools/build_proof_questions.py')
proofs=importlib.util.module_from_spec(spec);spec.loader.exec_module(proofs)

def notebook(hint='“Identity” with `x ≔ n`',status='Proven',checked=True):
    return f'''<!-- saved from url=(0028)http://130.113.68.214:16022/ -->
    <div tabindex="0"><div>[4]</div><textarea></textarea><div>
    <strong><span class="ConjStatus{status}">Theorem</span></strong> “Example”: n + 0 = n<br>
    <span class="ConjStatusProven">Calculation for expected goal</span> `n + 0 = n`:<br>
    n + 0<br>= <span class="HBConjStatusProven">⟨</span> {hint} <span class="HBConjStatusProven">⟩</span>
    <span class="RKConfirmedOK"><br>— CalcCheck: Found “Identity”</span><br>n<br>
    {"<span class='RKConfirmedOK'>All steps OK</span>" if checked else ""}
    <span class="RKConfirmedOK">Calculation matches goal ─ OK</span>
    </div></div>'''

class ProofTests(unittest.TestCase):
    def test_consecutive_checked_step_preserves_context(self):
        rows,stats=proofs.extract_html(notebook(),'Ex3.1','week3/example.html',3)
        self.assertEqual(len(rows),1)
        self.assertEqual(rows[0]['proof']['start'],'n + 0')
        self.assertEqual(rows[0]['proof']['end'],'n')
        self.assertEqual(rows[0]['proof']['hint'],'“Identity” with `x ≔ n`')
        self.assertEqual(rows[0]['proof']['hintTemplate'],'{{name}} with `x ≔ n`')
        self.assertEqual(rows[0]['preloaded2026'],[16022])
        self.assertEqual(rows[0]['preloaded2026Weeks'],[3])
        self.assertEqual(rows[0]['sources'][0]['locator']['cell'],4)
        self.assertEqual(rows[0]['proof']['step'],1)
        self.assertTrue(rows[0]['proof']['proofLabel'].startswith('Theorem'))
        self.assertEqual(rows[0]['sources'][0]['excerpt'],'n + 0\n= ⟨“Identity” with `x ≔ n`⟩\nn')
    def test_open_enclosing_proof_excluded(self):
        self.assertEqual(proofs.extract_html(notebook(status='Open'))[0],[])
    def test_missing_check_excluded(self):
        self.assertEqual(proofs.extract_html(notebook(checked=False))[0],[])
    def test_multitheorem_and_unnamed_skipped(self):
        for hint,key in [('“Identity” with “Symmetry”','multipleNameSteps'),('Fact `1 = 1`','unnamedSteps')]:
            rows,stats=proofs.extract_html(notebook(hint))
            self.assertEqual(rows,[]);self.assertEqual(stats[key],1)
    def test_inline_comment_is_not_part_of_endpoint(self):
        raw=notebook().replace('<br>n<br>', '<br>n — This is “Identity”<br>')
        rows,_=proofs.extract_html(raw)
        self.assertEqual(rows[0]['proof']['end'],'n')
        self.assertIn('This is',rows[0]['sources'][0]['excerpt'])
    def test_ids_are_stable(self):
        self.assertEqual(proofs.extract_html(notebook())[0],proofs.extract_html(notebook())[0])
    def test_numbered_reference_requires_unique_original_name(self):
        rows,stats=proofs.extract_html(notebook('(3.1) with `x ≔ n`'),numbered_names={'3.1':'Identity'})
        self.assertEqual(rows[0]['proof']['answers'],['Identity'])
        self.assertEqual(rows[0]['proof']['hintTemplate'],'{{name}} with `x ≔ n`')
        rows,stats=proofs.extract_html(notebook('(3.1)'))
        self.assertEqual(rows,[]);self.assertEqual(stats['unresolvedNumberedSteps'],1)
    def test_standalone_calculation_is_completed(self):
        raw=notebook().replace('<strong><span class="ConjStatusProven">Theorem</span></strong> “Example”: n + 0 = n<br>','')
        raw=raw.replace('Calculation for expected goal','Calculation:')
        self.assertEqual(len(proofs.extract_html(raw)[0]),1)
    def test_calculations_do_not_cross_boundaries(self):
        raw=notebook(checked=False)
        tail='<span class="ConjStatusProven">Calculation:</span><br>x<br>= ⟨“Identity”⟩<br>y<br><span class="RKConfirmedOK">All steps OK</span>'
        raw=raw.replace('</div></div>',tail+'</div></div>')
        rows,stats=proofs.extract_html(raw)
        self.assertEqual(len(rows),1)
        self.assertEqual(rows[0]['proof']['start'],'x')
        self.assertEqual(stats['uncheckedCalculations'],1)
    def test_relative_hint_rejects_calculation(self):
        raw=notebook().replace('HBConjStatusProven','HBConjStatusRelative')
        rows,stats=proofs.extract_html(raw)
        self.assertEqual(rows,[]);self.assertEqual(stats['failedHintCalculations'],1)
    def test_expected_goal_requires_match_confirmation(self):
        raw=notebook().replace('Calculation matches goal ─ OK','Goal does not match')
        rows,stats=proofs.extract_html(raw)
        self.assertEqual(rows,[]);self.assertEqual(stats['unmatchedGoalCalculations'],1)
    def test_named_hint_with_another_numbered_theorem_excluded(self):
        rows,stats=proofs.extract_html(notebook('“Identity” with (3.1)'),numbered_names={'3.1':'Symmetry'})
        self.assertEqual(rows,[]);self.assertEqual(stats['additionalReferenceSteps'],1)
        rows,stats=proofs.extract_html(notebook('“Identity” (3.1)'),numbered_names={'3.1':'Identity'})
        self.assertEqual(len(rows),1);self.assertNotIn('(3.1)',rows[0]['proof']['hintTemplate'])

if __name__=='__main__': unittest.main()
