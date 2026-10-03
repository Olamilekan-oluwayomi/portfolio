# Design system, Phase 2

Phase 2 deliverables and the measurements behind them. Everything here is static HTML
and CSS with no build step: open any `.html` file directly in a browser, or serve the
folder (`python -m http.server` from this directory) if a browser blocks `file://`
font or stylesheet loads.

Phase 2 is defined at `PRD.md:1328`. Its definition of done is contrast verified by
tooling, the specimen rendering in light and night, and the font budget measured. All
three are recorded below with the method that produced them.

## Files

| File | What it is |
|---|---|
| `tokens.css` | The deliverable. Font faces, type scale, spacing, layout, borders, motion and both colour palettes, transcribed from `PRD.md` sections 22 to 25 |
| `type.html` | Type specimen: every row of the hierarchy table at `PRD.md:614` to `PRD.md:624`, set in real site copy at real sizes |
| `color.html` | Both palettes, the verified contrast tables, and a comparison against the approximations `PRD.md:657` states |
| `samples.html` | Static sample of the two components Phase 2 owes: the Annotation (`PRD.md:716` to `PRD.md:719`) and the Figure (`PRD.md:596`) |
| `candidates.html` | The font decision aid: the chosen families beside section 23's named alternatives, rendered at site sizes |
| `specimen.css` | Chrome for these pages only. Does not ship |
| `verify.py` | Re-derives the palette check and the contrast tables below from `PRD.md` and `tokens.css`. Exits non-zero on any failure |
| `fonts/` | Four self-hosted woff2 files, Latin subset |

`tokens.css` is the only file intended to move into the app in Phase 3. `specimen.css`
exists to display tokens and uses colour, borders and spacing in ways the site would not.

## Font decision

Section 23 names a default trio and names alternatives "if licensing or rendering
issues appear", to be decided "in Phase 2 after rendering real content at real sizes"
(`PRD.md:600` to `PRD.md:610`). `candidates.html` is that rendering. No rendering
problem appeared, so the default stands, which is section 23's own rule rather than a
new decision. Nothing was substituted.

| Role | Family | File | Bytes | Preload |
|---|---|---|---|---|
| Display and headings | Instrument Serif Regular | `instrument-serif-regular.woff2` | 21,032 | yes |
| Display and headings, italic | Instrument Serif Italic | `instrument-serif-italic.woff2` | 22,128 | no |
| UI and body | Geist variable | `geist-var.woff2` | 29,400 | yes |
| Metadata and annotations | Geist Mono variable | `geist-mono-var.woff2` | 23,128 | yes |
| | | **Total** | **95,688** | **3 files** |

Measured with `wc -c` on 2026-10-03. The budget is 150 KB total woff2 and at most 3
files preloaded (`PRD.md:803`). The total is 93.4 KB, and the preloaded weight is
73,560 bytes, 71.8 KB. Both are inside budget, so no adjustment is owed.

Two properties of the choice are worth recording because they are the reason it survives
the rendering:

- Instrument Serif is the narrowest of the three candidates, which is what lets
  Display XL hold `Olamilekan Ilesanmi` on one line at `clamp(3.5rem, 11vw, 10.5rem)`
  inside a 1280 px container. It is also one weight and one style per file, so the
  regular and italic cost 43 KB together.
- Geist Mono is drawn to pair with Geist (`PRD.md:608`). If either family is replaced,
  that pairing is the thing lost.

The decision is reversible at the cost of one token and one file per family. An unverified
item: no licence audit was performed in Phase 2. All three families are open-source and
distributed for self-hosting, but the specific licence files were not checked, so
"licensing issues appeared" is neither confirmed nor ruled out here.

## Contrast verification

Recomputed 2026-10-03 from the hex values in `tokens.css` using the WCAG 2.x relative
luminance formula (0.2126 R + 0.7152 G + 0.0722 B over linearised sRGB channels, ratio
`(L1 + 0.05) / (L2 + 0.05)`). Thresholds are 4.5:1 for body text, 3:1 for non-text marks
and for borders that identify a control (`PRD.md:590`).

Paper theme:

| Pair | Ratio | Threshold | Result |
|---|---|---|---|
| `--ink` on `--paper` | 16.05:1 | 4.5:1 | pass |
| `--graphite` on `--paper` | 6.24:1 | 4.5:1 | pass |
| `--redline-text` on `--paper` | 5.53:1 | 4.5:1 | pass |
| `--redline` on `--paper` | 3.98:1 | 3.0:1 | pass |
| `--graphite` on `--paper` (control borders) | 6.24:1 | 3.0:1 | pass |
| `--ink` on `--paper-raised` | 17.07:1 | 4.5:1 | pass |
| `--rule` on `--paper` | 1.30:1 | none | dividers only |

Night theme:

| Pair | Ratio | Threshold | Result |
|---|---|---|---|
| `--ink` on `--paper` | 15.17:1 | 4.5:1 | pass |
| `--graphite` on `--paper` | 7.51:1 | 4.5:1 | pass |
| `--redline-text` on `--paper` | 7.36:1 | 4.5:1 | pass |
| `--redline` on `--paper` | 7.36:1 | 3.0:1 | pass |
| `--graphite` on `--paper` (control borders) | 7.51:1 | 3.0:1 | pass |
| `--ink` on `--paper-raised` | 13.99:1 | 4.5:1 | pass |
| `--rule` on `--paper` | 1.46:1 | none | dividers only |

Every pair passes. `--rule` is excluded from the thresholds deliberately: `PRD.md:640`
and `PRD.md:650` scope it to decorative dividers, never to anything that identifies a
control, so its low ratio is not a failure. Substituting it for `--graphite` on a control
border would be a violation.

The consequence for `--redline` is enforceable rather than a matter of intent. At 3.98:1
in paper it clears the 3:1 non-text threshold but not 4.5:1, so it may carry marks, lines
and dots, and may never carry text. Red text uses `--redline-text`. This is the rule at
`PRD.md:657` and it is now a number rather than a preference.

Section 24 states these ratios approximately and asks for verification with tooling.
Every approximation holds: ink on paper "above 15:1" is 16.05, graphite "about 6.2:1" is
6.24, `--redline-text` "about 5.5:1" is 5.53, `--redline` "about 4:1" is 3.98, and night
graphite "about 7.5:1" is 7.51. No adjustment is owed under Appendix B rule 10.

## Token verification

Every value in `tokens.css` was transcribed from the PRD and then checked against it
mechanically rather than by eye:

- All 16 palette hex values across both themes match `PRD.md:636` to `PRD.md:643` and
  `PRD.md:646` to `PRD.md:653` exactly, with no token added and none missing.
- The type scale matches all nine rows of the hierarchy table at `PRD.md:614` to
  `PRD.md:624`, including line heights and tracking.
- The motion easings and the five durations match `PRD.md:669` to `PRD.md:676`.
- Spacing, container width, column count, gutters, outer padding and the 68 character
  measure match `PRD.md:587` and `PRD.md:588`.

Reduced motion and lite mode both collapse the duration tokens to zero, except
`--dur-slow`, which is held at 100 ms so a crossfade survives where the PRD allows one
(`PRD.md:696`, `PRD.md:697`).

## Rendering in light and night

Both palettes were rendered and inspected. Two things about reproducing that are worth
knowing:

- The theme is selected by `data-theme="night"` on the root element, or by the system
  preference when no choice has been stored (`PRD.md:659`). `data-theme="paper"` is the
  explicit light choice: it needs no rule of its own because the media query is scoped
  `:root:not([data-theme])`, and the base `:root` block already declares
  `color-scheme: light`.
- Headless Chrome inherits the host's colour scheme. On a machine set to dark, a
  screenshot of a page with no `data-theme` renders the night palette, which is correct
  behaviour and not a styling bug. Forcing a specific theme for a screenshot means
  setting `data-theme` explicitly, not passing a colour-scheme flag.

## What is not here

- No screenshots or images. The figure in `samples.html` is a fixed-ratio frame with a
  redline border and a labelled placeholder. Committing a rendered image would be an
  invented asset, and the truth sheets record images as still outstanding per project.
- No real decision copy. The record text in `samples.html` is layout placeholder, drawn
  from seed wording to test the shape. It is not publishable copy and the seeds behind it
  are all still `verified: false`.
- No build integration. Nothing here is wired into `next/font`, Tailwind v4 or the app.
  That is Phase 3, and `PRD.md:628` requires the fonts to be loaded through `next/font`
  rather than the `@font-face` rules used here for a static specimen.
- No licence files. See the font decision above.

## Reproducing the measurements

```
python design/verify.py                         # palette and contrast, exits non-zero on failure
wc -c design/fonts/*.woff2                      # 95688 total
wc -c design/fonts/instrument-serif-regular.woff2 \
      design/fonts/geist-var.woff2 \
      design/fonts/geist-mono-var.woff2          # 73560 preloaded
python -m http.server -d design                 # then open localhost:8000/type.html
```

`verify.py` reproduces the two tables above and prints the same ratios. It is the
tooling the definition of done asks for, kept in the repository so the numbers can be
re-derived rather than trusted. Font sizes are measured with `wc -c`, which is the
byte count on disk, not an estimate.
