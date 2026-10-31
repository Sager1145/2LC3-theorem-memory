"""Verify smaller browser bundles preserve the complete auditable bank."""
import hashlib
import json
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
import build_site


class LoadingBundleTests(unittest.TestCase):
    def test_packed_bank_round_trips_every_field_and_serialization(self):
        script = build_site.browser_bank_script()
        canonical = (ROOT / "assets/data.js").read_bytes()
        self.assertLess(len(script.encode("utf-8")), len(canonical) * 0.5)
        with tempfile.TemporaryDirectory() as directory:
            packed = Path(directory) / "packed.js"
            packed.write_text(script, encoding="utf-8")
            checked = subprocess.run(
                ["node", "-e", r"""
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const canonical={window:{}},packed={window:{}};
vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8'),canonical);
vm.runInNewContext(fs.readFileSync(process.argv[2],'utf8'),packed);
const expected=canonical.window.THEOREM_DATA,actual=packed.window.THEOREM_DATA;
assert.equal(JSON.stringify(actual),JSON.stringify(expected));
assert.deepEqual(JSON.parse(JSON.stringify(actual)),JSON.parse(JSON.stringify(expected)));
assert.deepEqual(Object.keys(packed.window).sort(),['THEOREM_DATA','TQ_BUNDLED_FINGERPRINT']);
let sourceRows=0,uncommonRows=0;
for(let i=0;i<expected.theorems.length;i++){
  const before=expected.theorems[i],after=actual.theorems[i];
  assert.equal(after.id,before.id);
  assert.equal(JSON.stringify(after.documentStudy),JSON.stringify(before.documentStudy));
  for(let j=0;j<before.sources.length;j++){
    const origin=before.sources[j],restored=after.sources[j];
    assert(!Array.isArray(restored));
    assert.equal(typeof restored.sourceId,'string');
    assert.equal(typeof restored.excerpt,'string');
    assert.equal(restored.rawBlock,origin.rawBlock);
    assert.equal(JSON.stringify(restored.locator),JSON.stringify(origin.locator));
    sourceRows++;
    if(origin.locator.cell!==undefined)uncommonRows++;
  }
}
assert(sourceRows>20000);
assert(uncommonRows>0);
process.stdout.write(packed.window.TQ_BUNDLED_FINGERPRINT);
""", str(ROOT / "assets/data.js"), str(packed)],
                check=True, capture_output=True, text=True,
            )
        self.assertEqual(checked.stdout, build_site.bundled_fingerprint())

    def test_fingerprint_tracks_each_bundled_study_dataset(self):
        names = ("data.js", "proofs.js", "notebook-hints.js")
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            assets = root / "assets"
            assets.mkdir()
            for name in names:
                (assets / name).write_bytes(name.encode("ascii"))
            with patch.object(build_site, "ROOT", root):
                initial = build_site.bundled_fingerprint()
                hashes = [hashlib.sha256((assets / name).read_bytes()).hexdigest() for name in names]
                expected = hashlib.sha256(":".join(hashes).encode("ascii")).hexdigest()
                self.assertEqual(initial, expected)
                for name in names:
                    with self.subTest(dataset=name):
                        path = assets / name
                        original = path.read_bytes()
                        path.write_bytes(original + b" changed")
                        self.assertNotEqual(build_site.bundled_fingerprint(), initial)
                        path.write_bytes(original)
                        self.assertEqual(build_site.bundled_fingerprint(), initial)

    def test_asset_urls_and_offline_cache_track_exact_content(self):
        html = ('<link rel="stylesheet" href="./assets/style.css?v=old">'
                '<script defer src="./assets/data.js?v=old"></script>'
                '<script defer src="./assets/app.js"></script>')
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            assets = root / "assets"
            assets.mkdir()
            (root / "sw.js").write_bytes((ROOT / "sw.js").read_bytes())
            for name in ("style.css", "data.js", "app.js"):
                (assets / name).write_bytes(name.encode("ascii"))
            with patch.object(build_site, "ROOT", root):
                first = build_site.versioned_entry(html, assets)
                worker = build_site.offline_worker(first)
                self.assertEqual(build_site.versioned_entry(first, assets), first)
                urls = re.findall(r'(?:src|href)="(\./assets/[^"]+)"', first)
                precached = json.loads(re.search(r"const ASSETS=(\[[^\n]*\]);", worker).group(1))
                self.assertEqual(precached, ["./", "./index.html", *urls,
                                             "./favicon.svg", "./manifest.webmanifest"])
                for url in urls:
                    name = url.split("/")[-1].split("?")[0]
                    digest = hashlib.sha256((assets / name).read_bytes()).hexdigest()[:16]
                    self.assertEqual(url, f"./assets/{name}?v={digest}")
                cache = re.search(r"const CACHE='([^']+)';", worker).group(1)
                self.assertEqual(build_site.offline_worker(first), worker)
                for name in ("style.css", "data.js", "app.js"):
                    with self.subTest(asset=name):
                        path = assets / name
                        original = path.read_bytes()
                        path.write_bytes(original + b" changed")
                        changed = build_site.versioned_entry(html, assets)
                        changed_worker = build_site.offline_worker(changed)
                        changed_urls = re.findall(r'(?:src|href)="(\./assets/[^"]+)"', changed)
                        self.assertEqual(sum(a != b for a, b in zip(urls, changed_urls)), 1)
                        self.assertNotEqual(re.search(r"const CACHE='([^']+)';", changed_worker).group(1), cache)
                        changed_precache = json.loads(re.search(r"const ASSETS=(\[[^\n]*\]);", changed_worker).group(1))
                        self.assertTrue(all(url in changed_precache for url in changed_urls))
                        path.write_bytes(original)
                self.assertNotEqual(build_site.offline_worker(first + "<!-- changed entry -->"), worker)
                (root / "sw.js").write_text((root / "sw.js").read_text() + "\n// changed worker\n")
                self.assertNotEqual(re.search(r"const CACHE='([^']+)';", build_site.offline_worker(first)).group(1), cache)


if __name__ == "__main__":
    unittest.main()
