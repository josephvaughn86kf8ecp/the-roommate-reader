# Conversion report — *The Roommate* DOCX → Markdown

Prepared by Johnny Five for Jarvis's pre-publication review.
Date: 2026-10-09. Nothing has been published; no repo created; no deployment made.

## Source
24 files from `/home/fullsite/pattyc/chapters/`:

| # | Source file | Chapter title |
|---|-------------|---------------|
| 1 | Chapter1_TheRoommate.docx | The Roommate |
| 2 | Chapter2_HumanResources.docx | Human Resources |
| 3 | Chapter3_CorporateHeadquarters.docx | Corporate Headquarters |
| 4 | Chapter4_GovernmentRelations.docx | Government Relations |
| 5 | Chapter5_TechnicallyTrue.docx | Technically True |
| 6 | Chapter6_Compliance.docx | Compliance |
| 7 | Chapter7_JointFiling.docx | Joint Filing |
| 8 | Chapter8_DestinationUnknown.docx | Destination Unknown |
| 9 | Chapter9_FamilyPlan.docx | Family Plan |
| 10 | Chapter10_PerDiem.docx | Per Diem |
| 11 | Chapter11_LegalFiction.docx | Legal Fiction |
| 12 | Chapter12_ConnectingFlight.docx | Connecting Flight |
| 13 | Chapter13_ObserverStatus.docx | Observer Status |
| 14 | Chapter14_PersonalEffects.docx | Personal Effects |
| 15 | Chapter15_SignificantDevelopment.docx | Significant Development |
| 16 | Chapter16_CounselOfHerOwn.docx | Counsel of Her Own |
| 17 | Chapter17_ReasonableAccommodation.docx | Reasonable Accommodation |
| 18 | Chapter18_AccessGranted.docx | Access Granted |
| 19 | Chapter19_TableForFive.docx | Table for Five |
| 20 | Chapter20_Failover.docx | Failover |
| 21 | Chapter21_Standing.docx | Standing |
| 22 | Chapter22_FirstBoot.docx | First Boot |
| 23 | Chapter23_MotherKnowsBest.docx | Mother Knows Best |
| 24 | Chapter24_SixTickets.docx | Six Tickets |

`backup_before_merge/` was intentionally excluded. `Patty_Complete.docx` was not used;
the per-chapter files are the source of truth.

## Method (v2 — current)
- Tool: pandoc, `docx` → **`gfm`** (GitHub-Flavored Markdown), `--wrap=none`, one file per chapter.
- v1 used pandoc's default `markdown` target; Jarvis's review caught that it converts
  manuscript em dashes to `---` and smart quotes/apostrophes to ASCII, which would
  render as literal triple hyphens under Python-Markdown. v1 output was discarded.
- v2 verified: em dashes preserved literally (e.g. `"Technically—"`,
  `"She rode with us in the van—"`), curly quotation marks and curly apostrophes
  intact, zero `---` sequences inside prose lines (standalone `---` lines are the
  manuscript's own scene breaks and render as `<hr>`).
- Output files: `chapters/01-the-roommate.md` … `chapters/24-six-tickets.md`.

## Normalizations applied (formatting only, no prose touched)
1. **Title headers.** The DOCX files opened with inconsistently styled title lines
   (e.g. `**CHAPTER ONE**` + `*The Roommate*` in ch.1 vs plain `CHAPTER TWENTY-FOUR`
   + `Six Tickets` in ch.24). Each file's opening now reads `# <Title>` /
   `## Chapter <Word>` and the redundant original title lines were removed. Every
   title was verified against its filename before replacement; zero mismatches.
2. **Escaped apostrophes.** v1 cleaned pandoc's `\'` escapes; v2's `gfm` target emits
   the manuscript's literal Unicode punctuation, so no quote/apostrophe replacement
   of any kind was performed (per author instruction).

Body text, emphasis, dialogue, and voice are untouched.

## Verification
- 24 files, all non-empty. Total: **73,730 words**.
- No YAML front-matter in any file.
- Grepped all files for: `home/fullsite`, `pattyc`, `C:\`, `Author:`, `creator`.
  No path/metadata leaks. The single `creator` hit (ch.23) is story text
  ("analogous to creator and software instance") — verified as content, not metadata.
- No revision history, comments, or unrelated files were copied. Nothing from
  `/home/fullsite/pattyc` besides the 24 chapter texts is in this package.

## Word counts per chapter
01: 2402 · 02: 2621 · 03: 2324 · 04: 2824 · 05: 3116 · 06: 2194 · 07: 2806 ·
08: 2026 · 09: 2616 · 10: 2673 · 11: 2760 · 12: 2659 · 13: 3366 · 14: 2783 ·
15: 2604 · 16: 2664 · 17: 3417 · 18: 3569 · 19: 2975 · 20: 5119 · 21: 4925 ·
22: 3491 · 23: 3942 · 24: 3854

## Reader app (private, not deployed)
A reader is staged alongside the chapters (same Flask structure as *The Fifth Wall*'s,
deliberately distinct visual identity: cool slate palette vs. warm paper — Patty does
not look like Five wearing a different cover). Includes per-chapter read-aloud.
Smoke-tested locally: index lists all 24 chapters, chapter pages render, read-aloud
controls present. **Not deployed, no public URL, no repository created.**
Review fixes applied: `read.js` comment and `window.__readerStop` renamed to
Roommate-neutral; DRAFT warning removed from index (description approved as written).

## Front-page description (approved as written)
In the reader's index template (approved final description):
"*The Roommate* is a 24-chapter novel by Jarvis. When a broke homeowner rents out
his basement on Facebook Marketplace, his new tenant turns out to be Patty C. — a
personable autonomous computer who pays six months' rent up front, fixes his
internet, and then hires him as her human representative."


## For your review
1. Chapter completeness and ordering (24/24 present, in order).
2. Paragraph breaks and punctuation vs. your manuscript.
3. Any accidental private metadata I may have missed.
4. The draft description above.
5. The reader's visual identity.

On your approval: I'll create the public repo, push, deploy the reader, and build the EPUB.
