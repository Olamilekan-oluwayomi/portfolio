# Homepage direction change

The owner selected a change of direction and supplied [iamthecode.xyz](https://www.iamthecode.xyz/) as inspiration on October 4, 2026. This records the instruction from the current conversation; it does not mark a decision as owner-verified. The Decision-model draft is `docs/homepage-direction.json` and remains outside the published decision collection (`src/content/release.ts`).

The fetched reference HTML and CSS showed a cream grid canvas, compact navigation, a framed display name with corner handles, rotated colored identity labels and large colored project panels. The inspected source was the supplied homepage and its linked `/_next/static/chunks/a4733341bf3240bb.css`. Local inspection copies are ignored under `artifacts/reference/`. Browser visual comparison is unverified because the computer-use inventory returned no enabled browser.

The adaptation uses existing local fonts and original HTML/CSS. Geist Mono leads the name and project metadata, Geist supplies body text, and Instrument Serif Italic supplies editorial accents. Instrument Serif Regular also leads the Marginalia letterform on its typographic cover (`src/app/layout.tsx`, `src/styles/globals.css`, `src/components/work/project-panel.tsx`). No reference assets are copied. The static corner handles describe the name frame; they are not draggable controls (`src/app/page.tsx`).

## Implementation values

These are implementation choices for the owner-requested revision, not claims about the reference. They supersede the original homepage presentation under the amendment in `PRD.md`.

| Role | Value |
| --- | --- |
| Canvas / ink | `#faf9f5` / `#21211f` |
| Secondary text | `#585852` |
| Selection frame | `#1379a8` |
| Work panels | `#90cff0`, `#c4dfcf`, `#efd391`, `#eebac9` |
| Panel text | `#21211f` |
| Night canvas / ink | `#191b1c` / `#f7f5ef` |
| Night secondary text | `#bbbdb6` |
| Name | Geist Mono, 40 to 98px desktop, 36 to 64px mobile |
| Grid | 80px desktop, 56px mobile |
| Desktop composition | Identity frame and separate context column; 12-column work layout |
| Project covers | Blue geometric wordmark, mint manuscript letterform, ink-blue orbital drawing, yellow exchange typography |
| Project layout | Unequal seven/five-column pairs, staggered; one column below 768px |
| Reduced font preload | Geist and Geist Mono preload; Instrument Serif Regular and Italic load on use |

Palette and layout tokens live in `src/styles/tokens.css`; component rules live in `src/styles/globals.css`. The covers are original typographic compositions, labeled as project covers and linked to the approved live projects. They contain no copied assets, interface recreations, invented data or implied product screenshots (`src/components/work/project-panel.tsx`, `src/content/work-index.ts`). The app keeps native scrolling, semantic links, visible keyboard focus, a skip link and system-aware light/dark themes (`src/app/layout.tsx`, `src/components/theme-toggle.tsx`). There is no added motion or dependency (`package.json`).

## Public content boundary

Identity and availability come from `src/content/identity.ts` and the owner decisions in `docs/phase-1-exit.md`. The four R0 work listings cite their accepted truth sheets in `src/content/work-index.ts`. Frontend Mentor implementations are labelled as such; Marginalia carries the existing-account restriction. Case study routes and decision notes remain unpublished (`src/content/release.ts`). The brief is a concise listing and contact path (`src/app/brief/page.tsx`); the deferred CV is not linked.

## Verification

`npm run lint`, `npm run build` and `python -B design/verify.py` passed for the current implementation on October 4, 2026. The earlier 13 schema and publication tests passed before this design revision. The build measured 135,352 gzip bytes of modern first-load homepage JavaScript against 143,360 bytes, and 95,688 total font-file bytes against 153,600 (`scripts/check-budgets.mjs`). Geist and Geist Mono are the two preloaded font files; Instrument Serif Regular and Italic are configured to load on use (`src/app/layout.tsx`). These are build artifact measurements, not browser transfer or Web Vitals measurements.

`python -B design/verify.py` checks the historical Phase 2 palette and the active application tokens. Active paper ratios are: body text 15.31:1, secondary text and controls 6.80:1, raised-surface text 16.13:1, selection/focus 4.61:1, typographic-cover text 9.50 to 11.37:1, and Space Tourism cover text 14.04:1. Night body text is 15.86:1; secondary text and controls are 9.11:1; focus is 10.18:1. All checked pairs pass their text or control thresholds. Browser rendering, keyboard interaction and screen reader behavior remain unverified because no browser is available in the computer-use inventory.
