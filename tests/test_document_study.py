"""Check the published document evidence, independently of private originals."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class DocumentStudyTests(unittest.TestCase):
    def test_explicit_important_slide_has_exact_reference_list(self):
        bank = json.loads((ROOT / 'data/theorems.json').read_text())
        important = [r for r in bank if r['documentStudy']['important']]
        self.assertEqual(len(important), 11)
        refs = {ref for r in important for e in r['documentStudy']['importantEvidence'] for ref in e['references']}
        self.assertEqual(refs, {'3.15', '3.65', '3.66', '3.71', '3.72', '3.73', '3.74', '3.75', '3.77', '3.78', '3.79'})
        for card in important:
            for evidence in card['documentStudy']['importantEvidence']:
                self.assertEqual(evidence['sourceName'], '2lcslides.pdf')
                self.assertEqual(evidence['locator']['page'], 12)

    def test_browser_and_native_publish_the_same_document_metadata(self):
        bank = json.loads((ROOT / 'data/theorems.json').read_text())
        script = (ROOT / 'assets/data.js').read_text()
        payload = json.loads(script[script.index('{'):script.rfind('}') + 1])
        self.assertEqual(payload['theorems'], bank)
        audit = json.loads((ROOT / 'data/document-study.json').read_text())
        documents = {s['id'] for s in audit['sources']}
        self.assertEqual(sum(r['documentStudy']['repeated'] for r in bank), audit['repeatedCount'])
        for card in bank:
            study = card['documentStudy']
            for evidence in study['evidence'] + study['importantEvidence']:
                self.assertIn(evidence['sourceId'], documents)
                self.assertTrue(evidence['sourceName'])
                self.assertNotIn('preloaded', evidence['sourceId'])

if __name__ == '__main__':
    unittest.main()
