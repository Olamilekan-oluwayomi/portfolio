# Homepage direction change

The owner supplied [iamthecode.xyz](https://www.iamthecode.xyz/) as inspiration on October 4, 2026, then requested a substantially more distinctive revision after reviewing the initial adaptation. This records the current conversation; it does not mark a decision as owner-verified. The Decision-model draft remains in `docs/homepage-direction.json`, outside the published decision collection (`src/content/release.ts`).

## Reference and interpretation

The reference was fetched again and rendered in headless Chrome for this revision. Its oversized framed identity, grid canvas, compact navigation, colored labels and generous spacing informed the visual study. The local reference capture and HTML are ignored under `artifacts/reference/desktop.png` and `artifacts/reference/home.html`. No reference assets, fonts or source code were copied into the application.

The adaptation is an editorial engineering portfolio: a two-line monospace identity poster with a blue surname frame, a separate band for the recruiter facts, a native linked project index and a work spread with changing scale. RentIt and Foreign Exchange Checker use wide feature rows. Marginalia and Space Tourism form an unequal, staggered pair. About uses an annotation-shaped bracket mark and Contact becomes a large pink typographic sign-off (`src/app/page.tsx`, `src/styles/globals.css`).

Original illustrations give each project a different identity: an architectural line drawing for RentIt, a tilted manuscript sheet for Marginalia, an orbital line drawing for Space Tourism, and directional exchange typography for Foreign Exchange Checker. The visible caption says "Editorial illustration". These are not application captures, simulations, verified decision notes or product logos. Facts and links still come from `src/content/work-index.ts`; drawings live in `src/components/work/project-panel.tsx`.

## Implementation values

These choices supersede the original homepage presentation under the amendment in `PRD.md`.

| Role | Value |
| --- | --- |
| Canvas / ink | `#faf9f5` / `#21211f` |
| Secondary text | `#585852` |
| Selection frame | `#1379a8` |
| Project surfaces | `#90cff0`, `#c4dfcf`, `#efd391`; Space Tourism `#182a34` |
| Contact surface | `#eebac9` |
| Night canvas / ink | `#191b1c` / `#f7f5ef` |
| Name | Geist Mono, up to 184px; offset surname frame |
| Body / editorial accents | Geist / Instrument Serif |
| Grid | 80px desktop, 56px mobile |
| Project layout | Wide features and a seven/five-column pair; a linear list below 768px |
| Corners | Square project and contact surfaces; circular link glyphs |
| Interaction | Native index anchors, visible hover/focus feedback, contact underline |
| Motion | Contact underline only, 150ms; zero duration for reduced motion and lite mode |
| Font preload | Geist and Geist Mono; Instrument Serif variants load on use |

Tokens live in `src/styles/tokens.css`; composition and responsive rules live in `src/styles/globals.css`. Illustrations use inline SVG and CSS. No dependencies or client components were added (`package.json`, `src/components/work/project-panel.tsx`). The surname handles and illustrated sheets are static artwork, not draggable controls. All real navigation uses ordinary anchors (`src/app/page.tsx`).

## Public content boundary

Identity and availability come from `src/content/identity.ts` and the owner decisions in `docs/phase-1-exit.md`. The four R0 listings cite accepted truth sheets in `src/content/work-index.ts`. Frontend Mentor implementations are labeled as such; Marginalia retains its existing-account restriction. Case-study routes, decision notes and Inspect remain outside this homepage revision (`src/content/release.ts`). The brief remains a plain contact and project listing, with reduced vertical padding to fit the desktop fast path (`src/app/brief/page.tsx`, `src/styles/globals.css`).

## Verification

On October 4, 2026, `npm run lint`, `npm run build`, `python -B design/verify.py` and `git diff --check` passed. The production build measured 135,352 gzip bytes of modern first-load homepage JavaScript against 143,360 bytes, and 95,688 total font-file bytes against 153,600 (`scripts/check-budgets.mjs`). These are build artifact measurements, not browser transfer or Web Vitals measurements. The earlier 13 schema tests predate this revision and were not rerun because the content models and publication logic did not change.

Headless Chrome rendering was checked at 320, 390, 768, 1024, 1440 and 1920 CSS px, with no detected document overflow. Desktop and mobile screenshots were inspected, including paper and night palettes. At 390px, the employer, stack, brief link and contact route remain above the 844px fold. The first keyboard Tab reaches the visible skip link with a solid focus outline. All four index anchors resolve; the theme toggle updates its state and `aria-pressed`; reduced motion yields a zero-second contact underline transition. Runtime exception collection returned no exceptions. Local captures and reports are ignored under `artifacts/review/`; the scripts are `artifacts/review-home.mjs` and `artifacts/review-details.mjs`.

The contrast verifier covers text on canvas, raised manuscript sheets, all pastel panels and the dark Space Tourism surface. All checked pairs pass (`design/verify.py`). Full keyboard traversal, screen-reader behavior, Safari, Firefox, real-device testing, automated axe checks and Web Vitals remain unverified. This is a visually reviewed homepage checkpoint, not a completed accessibility or release audit (`PRD.md` sections 28, 29 and 41).
