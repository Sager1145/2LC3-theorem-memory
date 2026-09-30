#!/usr/bin/env python3
"""Bundle the complete offline game into the iOS app from current web sources."""
from pathlib import Path
import argparse
from build_site import portable_html


def build(destination):
    html = portable_html()
    marker = '<script>\n/* Theorem Quest — fully static app.'
    patch = '''<script>
if (window.TQNativeData) {
  const theorems = window.TQEngine.retainDocumentStudy(window.TQNativeData.theorems, window.THEOREM_DATA.theorems);
  Object.assign(window.THEOREM_DATA, window.TQNativeData, {theorems});
  const d = window.THEOREM_DATA;
  d.weekBySource = Object.fromEntries(d.sources.map(s => [s.id, s.weeks || []]));
  d.coverage.current2026PracticeCount = d.theorems.filter(r => (r.preloaded2026?.length || r.notebook2026?.length) && !/inference rule/i.test(r.kind)).length;
  d.coverage.current2026NotebookCount = d.sources.filter(s => s.id.startsWith('calc-2026-')).length;
  d.coverage.nativeNote = "题卡与来源来自已安装的校验快照；覆盖说明、课程文档依据和待核对清单随 App 内置版本发布。";
}
</script>
'''
    if marker not in html:
        raise RuntimeError('Cannot locate the app script; offline bundle was not generated.')
    html = html.replace(marker, patch + marker, 1)
    destination = Path(destination)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(html, encoding='utf-8')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', required=True)
    build(parser.parse_args().output)
