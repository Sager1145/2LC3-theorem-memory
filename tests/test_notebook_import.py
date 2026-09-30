import copy
import json
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
from import_notebook_theorems import merge


class NotebookImportTests(unittest.TestCase):
    def test_capture_is_completely_represented_and_week_scoped(self):
        capture = json.loads((ROOT/'research/notebooks/proved-declarations.json').read_text())
        bank = json.loads((ROOT/'data/theorems.json').read_text())
        sources = {s['id']: s for s in json.loads((ROOT/'data/sources.json').read_text())}
        inventory = json.loads((ROOT/'data/weekly-inventory.json').read_text())
        for row in capture['declarations']:
            found = [c for c in bank if any(o['sourceId'] == row['sourceId'] and o['locator'] == row['locator'] for o in c['sources'])]
            self.assertEqual(len(found), 1)
            self.assertEqual(''.join(found[0]['formula'].split()), ''.join(row['formula'].split()))
            for week in sources[row['sourceId']]['weeks']:
                group = next(g for g in inventory['weeks'] if g['year'] == 2026 and g['week'] == week)
                self.assertIn(found[0]['id'], [c['id'] for c in group['cards']])
        self.assertEqual(sources['notebook-2026-16022']['weeks'], [3])
        self.assertEqual(sources['notebook-2026-16027']['weeks'], [4])
        self.assertEqual(sources['notebook-2026-16019']['weeks'], [])

    def test_reimport_retains_ids_and_does_not_duplicate_origins(self):
        capture = json.loads((ROOT/'research/notebooks/proved-declarations.json').read_text())
        bank = json.loads((ROOT/'data/theorems.json').read_text())
        sources = json.loads((ROOT/'data/sources.json').read_text())
        merged, updated, _ = merge(copy.deepcopy(bank), copy.deepcopy(sources), capture)
        self.assertEqual(bank, merged)
        self.assertEqual(sources, updated)
        self.assertTrue(any(c.get('notebook2026') and c.get('preloaded2026') for c in bank))

if __name__ == '__main__': unittest.main()
