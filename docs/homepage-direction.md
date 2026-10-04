# Homepage direction change

The owner selected a change of direction and supplied [iamthecode.xyz](https://www.iamthecode.xyz/) as inspiration on October 4, 2026. This records the instruction from the current conversation; it does not mark a decision as owner-verified. The Decision-model draft is `docs/homepage-direction.json` and remains outside the published decision collection (`src/content/release.ts`).

The fetched reference HTML and CSS showed a cream grid canvas, compact navigation, a framed display name with corner handles, rotated colored identity labels and large colored project panels. The inspected source was the supplied homepage and its linked `/_next/static/chunks/a4733341bf3240bb.css`. Local inspection copies are ignored under `artifacts/reference/`. Browser visual comparison is unverified because the computer-use inventory returned no enabled browser.

The adaptation uses existing local fonts and original HTML/CSS. Geist Mono leads the name, Geist supplies body text, and the existing Instrument Serif italic supplies small editorial accents (`src/app/layout.tsx`, `src/styles/globals.css`). No reference assets are copied. The static corner handles describe the name frame; they are not draggable controls (`src/app/page.tsx`).

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
| Project panels | Two columns desktop, one below 768px |

Source for these values: `src/styles/globals.css`. The app keeps native scrolling, semantic links, visible keyboard focus, a skip link and system-aware light/dark themes (`src/app/layout.tsx`, `src/components/theme-toggle.tsx`). There is no added motion or dependency (`package.json`).

## Public content boundary

Identity and availability come from `src/content/identity.ts` and the owner decisions in `docs/phase-1-exit.md`. The four R0 work listings cite their accepted truth sheets in `src/content/work-index.ts`. Frontend Mentor implementations are labelled as such; Marginalia carries the existing-account restriction. Case study routes and decision notes remain unpublished (`src/content/release.ts`). The brief is a concise listing and contact path (`src/app/brief/page.tsx`); the deferred CV is not linked.

## Verification

`npm run lint`, `npm test` (13 tests), `npm run typecheck` and `npm run build` passed on October 4, 2026. The build's budget check measured 135,251 gzip bytes of modern first-load homepage JavaScript against 143,360 bytes, and 95,688 font bytes against 153,600 (`scripts/check-budgets.mjs`). These are build artifact measurements, not browser transfer or Web Vitals measurements.

WCAG relative-luminance calculations from the CSS hex values give paper text 15.31:1, paper secondary text 6.80:1, selection frame 4.61:1, panel text 9.50 to 11.37:1, night text 15.86:1 and night secondary text 9.11:1 (`src/styles/globals.css`). Responsive browser rendering, keyboard interaction and screen reader behavior remain unverified until a browser is available.
