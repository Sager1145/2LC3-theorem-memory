# Document-based study lists

The document-focused Important and Repeated lists use `documentStudy` on each existing theorem card. They are independent of the legacy `repeated` flag, which measures availability in multiple CalcCheck preloaded lists. Loading a standard theorem into many exercises does not make it a repeated document reference.

`tools/build_document_study.py` reads the local CS2LC PDFs, DOCX paragraphs and visible HTML text. It matches parenthesized theorem numbers and quoted theorem names that identify a single formula. A nearby number and name in one declaration count once. It does not add or alter theorem formulas. Documents stay private; the generated evidence retains a bounded reference excerpt and relative source name.

- **Important:** a numbered theorem occurs on a slide whose title explicitly says Important. This is explicit document emphasis, not a computed popularity score.
- **Repeated:** at least two matched references, including repeated use inside one document.
- **Document count:** independent document families containing a matched reference. Preliminary/final lecture exports and companion/full notes for the same week share a family, using the maximum mention count across their versions. Identical bytes, ZIP containers, and the alternative full-semester slide layout are excluded.
- **Proof mentions:** references inside explicit `⟨…⟩` proof hints. Shared base numbers identifying different formulas and ambiguous unnumbered names do not contribute. Identical-formula cards may share a source position, counted once per card.

The counts are lower bounds from text extraction. Scans, unusual PDF glyph encodings, plain unquoted names, and ambiguous unnumbered theorem names can be missed. Importance language about general proof advice does not label unrelated theorem cards. The document audit records files and extracted characters in `data/document-study.json`; the compact totals and method are also in `coverage.documentStudy`.

Rebuild after importing or enriching the bank, before `tools/build_site.py` packages the JSON:

```sh
python3 tools/build_document_study.py /path/to/CS2LC
```

The Python environment needs `pypdf`. Extracted private text is cached under ignored `.build/document-text` by content hash. Card evidence carries `sourceId`, `sourceName`, `label`, a page/line locator, `excerpt`, and per-file reference/proof counts. `importantEvidence` records the slide title and matching theorem numbers. `frequencyByFamily` and `proofFrequencyByFamily` make the totals reproducible; the legacy preloaded metadata remains unchanged.

Both clients use only document evidence for focused lists. Older cards without `documentStudy` remain usable in the full library. When an installed update omits document metadata, the game retains verified bundled evidence only if the stable ID and exact formula are unchanged; explicit metadata in the update takes precedence.

The initial audit read 53 documents, matching 487 existing cards: 11 Important and 369 repeated entries. Eight repeated entries are inference rules, so 361 repeated cards enter practice. The 2026 practice scope contains all 11 Important and 197 repeated cards. The 11 Important references were visually confirmed on physical page 12 of `2lcslides.pdf`.

After adding verified notebook declarations, the same 53-document scan matches 485 cards: 11 Important and 367 repeated (359 practice cards; 201 in the 2026 scope). Additional names can make an unnumbered reference ambiguous; the extractor continues to exclude those matches.
