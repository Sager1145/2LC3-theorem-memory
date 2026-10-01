"""The installed iOS game must track every script in the web entry point."""
import re
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
from build_ios_web import build
from build_site import study_payload, portable_html
import json


class IOSWebBundleTest(unittest.TestCase):
    def test_web_scripts_are_embedded_and_invalidate_both_xcode_configs(self):
        entry = (ROOT / "index.html").read_text()
        scripts = re.findall(r'<script defer src="\./([^"?]+)(?:\?[^"]*)?"></script>', entry)
        self.assertIn("assets/i18n.js", scripts)
        self.assertIn("assets/proofs.js", scripts)
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory) / "TheoremQuest.html"
            study = Path(directory) / "study.json"
            build(destination, study)
            self.assertEqual(json.loads(study.read_text()), study_payload())
            bundled = destination.read_text()
        configurations = [(ROOT / "ios/project.yml").read_text(),
                          (ROOT / "ios/TheoremQuest.xcodeproj/project.pbxproj").read_text()]
        for script in scripts:
            with self.subTest(script=script):
                code = (ROOT / script).read_text().replace('</script', '<\\/script')
                self.assertIn('<script>\n' + code + '\n</script>', bundled)
                self.assertNotIn('src="./' + script, bundled)
                for configuration in configurations:
                    self.assertIn('$(SRCROOT)/../' + script, configuration)
        self.assertEqual(bundled, portable_html())
        for configuration in configurations:
            self.assertIn('--study-output', configuration)
            self.assertIn('$(TARGET_BUILD_DIR)/$(UNLOCALIZED_RESOURCES_FOLDER_PATH)/study.json', configuration)


if __name__ == "__main__":
    unittest.main()
