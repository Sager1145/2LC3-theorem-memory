#!/usr/bin/env python3
"""Bundle the complete offline game into the iOS app from current web sources."""
from pathlib import Path
import argparse
from build_site import portable_html, write_study_payload


def build(destination, study_output=None):
    html = portable_html()
    destination = Path(destination)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(html, encoding='utf-8')
    if study_output is not None:
        write_study_payload(study_output)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', required=True)
    parser.add_argument('--study-output')
    args=parser.parse_args()
    build(args.output,args.study_output)
