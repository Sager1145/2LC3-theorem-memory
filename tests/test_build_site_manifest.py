import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))

from build_site import write_data_manifest


class DataManifestTest(unittest.TestCase):
    def test_manifest_hashes_files_and_keeps_revision_content_stable(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            temporary = Path(temporary_directory)
            data = temporary / "source-data"
            data.mkdir()
            theorem_bytes = b'[{"id":"one"},{"id":"two"}]\n'
            source_bytes = b'[{"id":"source-one"}]\n'
            (data / "theorems.json").write_bytes(theorem_bytes)
            (data / "sources.json").write_bytes(source_bytes)

            first = write_data_manifest(
                temporary / "first", data, "2026-09-30T12:00:00Z"
            )
            second = write_data_manifest(
                temporary / "second", data, "2026-10-01T12:00:00Z"
            )

            expected_theorem_hash = hashlib.sha256(theorem_bytes).hexdigest()
            self.assertEqual(first["schemaVersion"], 1)
            expected_source_hash = hashlib.sha256(source_bytes).hexdigest()
            expected_revision = hashlib.sha256(
                f"{expected_theorem_hash}:{expected_source_hash}".encode("ascii")
            ).hexdigest()
            self.assertEqual(first["revision"], expected_revision)
            self.assertEqual(second["revision"], expected_revision)
            self.assertEqual(first["theoremCount"], 2)
            self.assertEqual(
                first["files"]["theorems"],
                {"path": "data/theorems.json", "sha256": expected_theorem_hash},
            )
            self.assertEqual(
                first["files"]["sources"],
                {
                    "path": "data/sources.json",
                    "sha256": hashlib.sha256(source_bytes).hexdigest(),
                },
            )
            self.assertEqual(first["builtAt"], "2026-09-30T12:00:00Z")
            written = json.loads(
                (temporary / "first" / "data" / "version.json").read_text()
            )
            self.assertEqual(written, first)

            (data / "sources.json").write_bytes(b'[{"id":"source-two"}]\n')
            changed_sources = write_data_manifest(
                temporary / "third", data, "2026-10-01T12:00:00Z"
            )
            self.assertNotEqual(changed_sources["revision"], first["revision"])
            self.assertEqual(changed_sources["files"]["theorems"], first["files"]["theorems"])


if __name__ == "__main__":
    unittest.main()
