# Phase 2 record: design system

Evidence record for Phase 2, Design system (`PRD.md:1328`). Writing in this file does not approve anything, and nothing here sets `verified: true`. Only the owner does that (`AGENTS.md`).

Rules that apply here:

- Every claim cites a file path or commit hash (`AGENTS.md`).
- No em dashes in site copy or documentation (`PRD.md:1506`).
- Where the PRD and reality conflict, record a decision, adjust the PRD and continue (`PRD.md:1507`).
- Motion follows section 25 exactly, and no animation that is not listed is added (`PRD.md:1501`).

Phase 2's deliverables are `tokens.css`, a type specimen page, a color and contrast table, motion tokens, a sample Annotation and Figure in static HTML, and the final font choice with measured file sizes. Its definition of done is that contrast is verified by tooling, the specimen renders in light and night, and the font budget is measured.

## Status snapshot

| Artifact | State |
| --- | --- |
| `design/tokens.css` | Present. Every value transcribed from `PRD.md` and checked against it mechanically |
| Type specimen | `design/type.html`, all nine hierarchy rows at real sizes |
| Color and contrast table | `design/color.html`, both themes, recomputed 2026-10-03 |
| Motion tokens | In `design/tokens.css`, matching `PRD.md:669` to `PRD.md:676`, with reduced motion and lite mode collapses |
| Annotation and Figure samples | `design/samples.html` |
| Font choice and file sizes | Recorded in `design/README.md`. Default trio stands, 95,688 bytes measured |
| Definition of done | Met (2026-10-03) |
| `design/verify.py` | Reproduces the palette and contrast checks, exits non-zero on failure |

## A. Definition of done

| Item | How it was verified |
| --- | --- |
| Contrast verified by tooling | `design/verify.py` recomputes all 14 pairs from the token hex values with the WCAG 2.x relative luminance formula. Every pair passes. Results below |
| Specimen renders in light and night | Both palettes rendered in headless Chrome and inspected. The two renders differ. `design/type.html` carries a toggle, and `data-theme="paper"` and `data-theme="night"` were both rendered explicitly |
| Font budget measured | `wc -c` on the four woff2 files: 95,688 bytes total, 73,560 bytes preloaded across 3 files, against 150 KB and 3 files at `PRD.md:803` |

Two notes on reproducing these, both recorded in `design/README.md`:

- Headless Chrome inherits the host colour scheme. On a machine set to dark, a page with no `data-theme` renders the night palette, which is correct behaviour under `PRD.md:659` rather than a styling fault. Forcing a theme for a screenshot means setting `data-theme`, not passing a colour-scheme flag.
- The explicit light value is `data-theme="paper"`. It needs no rule of its own because the system-preference query at `design/tokens.css:178` is scoped `:root:not([data-theme])`, and the base block already declares `color-scheme: light`. The PRD names only the night value and says an explicit choice is stored (`PRD.md:659`). This is silence in the PRD rather than a conflict with it, so no adjustment is owed under `PRD.md:1507`, but Phase 3 needs the stored value name and it is `paper` or `night`.

## B. Contrast, recomputed

Values recomputed 2026-10-03 from `design/tokens.css` with `design/verify.py`. Thresholds are 4.5:1 for text, 3:1 for non-text marks and for borders that identify a control (`PRD.md:590`).

| Pair | Paper | Night | Threshold |
| --- | --- | --- | --- |
| `--ink` on `--paper` | 16.05:1 | 15.17:1 | 4.5:1 |
| `--graphite` on `--paper` | 6.24:1 | 7.51:1 | 4.5:1 |
| `--redline-text` on `--paper` | 5.53:1 | 7.36:1 | 4.5:1 |
| `--redline` on `--paper` | 3.98:1 | 7.36:1 | 3.0:1 |
| `--graphite` on `--paper`, control borders | 6.24:1 | 7.51:1 | 3.0:1 |
| `--ink` on `--paper-raised` | 17.07:1 | 13.99:1 | 4.5:1 |
| `--rule` on `--paper` | 1.30:1 | 1.46:1 | none, dividers only |

All seven pass. Two findings are worth recording rather than leaving in the specimen:

- `--rule` at 1.30:1 and 1.46:1 is far below every threshold, and the PRD scopes it to decorative dividers at `PRD.md:640` and `PRD.md:650`. It is safe only while nothing that identifies a control uses it. A control border takes `--graphite` or `--ink` (`PRD.md:590`).
- `--redline` at 3.98:1 in paper clears the 3:1 non-text threshold and does not clear 4.5:1. It may carry marks, lines and dots, and may never carry text. Red text uses `--redline-text`, which is why the two tokens exist. This was intent at `PRD.md:657` and is now a number that a check enforces.

Section 24 states these ratios approximately and asks for tooling verification. Every approximation holds: ink on paper stated as above 15:1 is 16.05, graphite stated as about 6.2:1 is 6.24, `--redline-text` stated as about 5.5:1 is 5.53, `--redline` stated as about 4:1 is 3.98, and night graphite stated as about 7.5:1 is 7.51. Nothing in section 24 needs editing and no adjustment is owed under `PRD.md:1507`.

## C. Font choice

Section 23 names a default trio and names alternatives "if licensing or rendering issues appear", to be decided "in Phase 2 after rendering real content at real sizes" (`PRD.md:600` to `PRD.md:610`). `design/candidates.html` is that rendering: the chosen families beside Newsreader, Fraunces, Inter Tight, Switzer, JetBrains Mono and IBM Plex Mono, at site sizes with real strings.

No rendering problem appeared. Instrument Serif is the narrowest of the display candidates, which is what lets Display XL hold `Olamilekan Ilesanmi` on one line at `clamp(3.5rem, 11vw, 10.5rem)` inside a 1280 px container, and it is one weight and one style per file. Geist Mono is drawn to pair with Geist (`PRD.md:608`). So the default stands. That is section 23's own rule applied, not a new decision, and nothing was substituted.

Measured with `wc -c` on 2026-10-03:

| File | Bytes | Preload |
| --- | --- | --- |
| `instrument-serif-regular.woff2` | 21,032 | yes |
| `instrument-serif-italic.woff2` | 22,128 | no |
| `geist-var.woff2` | 29,400 | yes |
| `geist-mono-var.woff2` | 23,128 | yes |
| Total | 95,688 | 3 files preloaded |

The budget is 150 KB total woff2 and at most 3 files preloaded (`PRD.md:803`). The total is 93.4 KB, and the preloaded weight is 73,560 bytes, 71.8 KB. Both are inside budget, so the PRD's instruction to measure real files and adjust with a written reason is satisfied with no adjustment.

The choice is reversible at one token and one file per family. **Unverified:** no licence audit was performed in Phase 2. All three families are open-source and distributed for self-hosting, but the specific licence files were not checked, so whether "licensing issues" exist under `PRD.md:610` is neither confirmed nor ruled out here.

## D. Token verification and one correction

Every value in `design/tokens.css` was checked against the PRD rather than reviewed by eye:

- All 16 palette hex values match `PRD.md:636` to `PRD.md:643` and `PRD.md:646` to `PRD.md:653`, with no value added and none missing. This check is automated in `design/verify.py`.
- The type scale matches all nine rows at `PRD.md:614` to `PRD.md:624`, including line heights and tracking.
- The easings and five durations match `PRD.md:669` to `PRD.md:676`.
- Spacing, container width, column count, gutters, padding and the 68 character measure match `PRD.md:587` and `PRD.md:588`.

The paper trail was then checked line by line, every `PRD.md:NNN` citation in `design/` resolved against the file, and 12 of them were wrong. Each is corrected in place:

- The font budget was cited as `PRD.md:801`, which is the JavaScript budget. The font budget is `PRD.md:803`.
- The rule that redline never carries text was cited as `PRD.md:648`, which is a night theme hex value. The rule is at `PRD.md:657`.
- Lite mode was cited as `PRD.md:701`, which is the avoid list. It is at `PRD.md:697`.
- The night theme block was cited as `PRD.md:646` to `PRD.md:657`. It is `PRD.md:645` to `PRD.md:654`.
- The theme behaviour line was cited as `PRD.md:654`, a closing brace. It is `PRD.md:659`.
- The hierarchy table was cited as ending at `PRD.md:625`, a blank line. The last row is `PRD.md:624`.
- The palette block was cited from `PRD.md:634`, a code fence. It is `PRD.md:635` to `PRD.md:654`.
- The reading layout in the annotation sample was cited as `PRD.md:585`, a table header. It is `PRD.md:587`.

None of these changed a token value. They are recorded because a citation that does not resolve is a claim that cannot be checked, and the same class of error in the truth sheets would matter more.

## E. What is not here

- **No images.** The figure in `design/samples.html` is a fixed 16:10 frame with a 1 px `--ink` border and a labelled placeholder, following `PRD.md:596`. Committing a rendered screenshot would be an invented asset, and the truth sheets record images as still outstanding per project.
- **No publishable record copy.** The decision text in the annotation sample is layout placeholder drawn from seed wording, marked as such on the page. Every seed is still `verified: false`.
- **No build integration.** Nothing is wired into `next/font`, Tailwind v4 or the app. `PRD.md:628` requires the fonts to load through `next/font`, so the `@font-face` rules in `tokens.css` are for the static specimen and are replaced in Phase 3.
- **No licence audit.** See section C.
- **Motion is tokens only.** The durations and easings are recorded and verified against section 25. No animation is implemented, because no Phase 2 deliverable asks for one and `PRD.md:1501` forbids adding motion that section 25 does not list.

## F. What only the owner can do

1. **Confirm the font choice or substitute at sight.** The default stands by section 23's rule. It is reversible at one token and one file per family, and `design/candidates.html` is where to look.
2. **Decide whether to audit the licences.** If the owner wants `PRD.md:610`'s condition actually exercised rather than merely not triggered, the licence files for the three families need checking. This is the one open item in this phase.
3. **Promote or defer the deferred facts carried from Phase 1.** The 2024 About artifact and the Branch Watch Log link remain deferred, and deferred facts stay out of public copy (`PRD.md:1479`).

## G. Next

Phase 3 is Core architecture (`PRD.md:1329`): the Next.js app, TypeScript strict, Tailwind v4, a Zod content pipeline, CI, the Vercel project, size and Lighthouse checks, and an analytics stub. Its definition of done is that `main` deploys, a content schema failure breaks the build, and CI is green.

The design system hands Phase 3 one file to integrate, `design/tokens.css`, and two decisions it must not lose: the explicit light value is `data-theme="paper"`, and `--rule` is for dividers while control borders take `--graphite` (`PRD.md:590`).
