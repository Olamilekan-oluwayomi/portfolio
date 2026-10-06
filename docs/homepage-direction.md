# Homepage direction change

The owner supplied [iamthecode.xyz](https://www.iamthecode.xyz/) as inspiration on October 4, 2026, then requested a substantially more distinctive revision after reviewing the initial adaptation. This records the current conversation; it does not mark a decision as owner-verified. The Decision-model draft remains in `docs/homepage-direction.json`, outside the published decision collection (`src/content/release.ts`).

## Reference and interpretation

The reference was fetched again and rendered in headless Chrome for this revision. Its oversized framed identity, grid canvas, compact navigation, colored labels and generous spacing informed the visual study. The local reference capture and HTML are ignored under `artifacts/reference/desktop.png` and `artifacts/reference/home.html`. No reference assets, fonts or source code were copied into the application.

The adaptation is an editorial engineering portfolio: a two-line monospace identity poster with a highlighted surname frame, a separate band for the recruiter facts, a native linked project index and a work spread with changing scale. RentIt and Foreign Exchange Checker use wide feature rows. Marginalia and Space Tourism form an unequal, staggered pair. About uses an annotation-shaped bracket mark and Contact becomes a large pink typographic sign-off (`src/app/page.tsx`, `src/styles/globals.css`).

Original illustrations give each project a different identity: an architectural line drawing for RentIt, a tilted manuscript sheet for Marginalia, an orbital line drawing for Space Tourism, and directional exchange typography for Foreign Exchange Checker. The visible caption says "Editorial illustration". These are not application captures, simulations, verified decision notes or product logos. Facts and links still come from `src/content/work-index.ts`; drawings live in `src/components/work/project-panel.tsx`.

## Implementation values

These choices supersede the original homepage presentation under the amendment in `PRD.md`.

| Role | Value |
| --- | --- |
| Canvas / ink | `#faf9f5` / `#21211f` |
| Secondary text | `#585852` |
| Selection frame | `#1379a8` |
| Selected identity / annotation and action | `#d5ff00` / `#244bff`, with `#ffffff` annotation text |
| Project surfaces | `#90cff0`, `#c4dfcf`, `#efd391`; Space Tourism `#182a34` |
| Contact surface | `#eebac9` |
| Night canvas / ink | `#191b1c` / `#f7f5ef` |
| Name | Geist Mono, up to 184px; desktop size also responds to viewport height; offset surname frame |
| Body / editorial accents | Geist / Instrument Serif |
| Grid | 80px desktop, 56px mobile |
| Project layout | Wide features and a seven/five-column pair; a linear list below 768px |
| Corners | Square project and contact surfaces; circular link glyphs |
| Interaction | Native index anchors with preview swap on hover and focus, hero concept anchors, contact underline |
| Motion | Contact underline, preview swap and note fades, 150 to 240ms; zero duration for reduced motion and lite mode |
| Font preload | Geist and Geist Mono; Instrument Serif variants load on use |

Tokens live in `src/styles/tokens.css`; composition and responsive rules live in `src/styles/globals.css`. Illustrations use inline SVG and CSS. No dependencies or client components were added (`package.json`, `src/components/work/project-panel.tsx`). The surname handles and illustrated sheets are static artwork, not draggable controls. All real navigation uses ordinary anchors (`src/app/page.tsx`).

## Hero composition checkpoint, October 5, 2026

Following the owner's audit and instruction to begin improvements, the hero retains its lime selected surname, cobalt annotation, graph canvas and asymmetric name. The role is now registered to the surname's right edge between the name lines; it is static text, without a navigation arrow. The heading contains only the owner's name (`src/app/page.tsx`, `src/styles/globals.css`).

The skills use a two-column technical strip with equal emphasis, sourced from the existing identity string. On mobile, this strip spans the full information band below the manifesto and employment pair, avoiding the earlier width-dependent badge wrapping. Hero supporting text is at least 12px and hero links have targets at least 44px high. The name size responds to viewport height on desktop, with additional spacing adjustments for screens at most 800px high. The principal accent values now live in the active token file and their text contrast is included in the existing verifier (`src/styles/globals.css`, `src/styles/tokens.css`, `design/verify.py`).

This checkpoint changes the hero composition only. Project content, routes and Inspect are not expanded. No decision is promoted to owner-verified (`src/content/release.ts`, `docs/homepage-direction.json`).

Checkpoint validation: lint, typecheck, the production build, the contrast verifier and the whitespace check passed. The build measured 135,483 gzip bytes of first-load homepage JavaScript and 95,688 font-file bytes, within the existing limits (`package.json`, `scripts/check-budgets.mjs`, `design/verify.py`). Headless viewport checks at 320, 390, 430, 639, 640, 768, 1024, 1366 and 1440px detected no document-width overflow. At 390 and 430px the skill strip is 48px high in both compositions. At 1366x768 the brief and hero contact targets fit above the fold. Theme toggling preserved hero height, reduced motion yielded a zero-second contact underline transition, and the first keyboard Tab reached the skip link with a visible outline. Reports and captures are local review artifacts under `artifacts/review/hero-checkpoint-report.json`, `artifacts/review/hero-checkpoint-interactions.json` and `artifacts/review/hero-*.png`. These are viewport and targeted behavior checks, not a full screen-reader, physical-device or cross-browser accessibility sign-off.

## Public content boundary

Identity and availability come from `src/content/identity.ts` and the owner decisions in `docs/phase-1-exit.md`. The four R0 listings cite accepted truth sheets in `src/content/work-index.ts`. Frontend Mentor implementations are labeled as such; Marginalia retains its existing-account restriction. Case-study routes, decision notes and Inspect remain outside this homepage revision (`src/content/release.ts`). The brief remains a plain contact and project listing, with reduced vertical padding to fit the desktop fast path (`src/app/brief/page.tsx`, `src/styles/globals.css`).

## Verification

On October 4, 2026, `npm run lint`, `npm run build`, `python -B design/verify.py` and `git diff --check` passed. The production build measured 135,352 gzip bytes of modern first-load homepage JavaScript against 143,360 bytes, and 95,688 total font-file bytes against 153,600 (`scripts/check-budgets.mjs`). These are build artifact measurements, not browser transfer or Web Vitals measurements. The earlier 13 schema tests predate this revision and were not rerun because the content models and publication logic did not change.

Headless Chrome rendering was checked at 320, 390, 768, 1024, 1440 and 1920 CSS px, with no detected document overflow. Desktop and mobile screenshots were inspected, including paper and night palettes. At 390px, the employer, stack, brief link and contact route remain above the 844px fold. The first keyboard Tab reaches the visible skip link with a solid focus outline. All four index anchors resolve; the theme toggle updates its state and `aria-pressed`; reduced motion yields a zero-second contact underline transition. Runtime exception collection returned no exceptions. Local captures and reports are ignored under `artifacts/review/`; the scripts are `artifacts/review-home.mjs` and `artifacts/review-details.mjs`.

The contrast verifier covers text on canvas, raised manuscript sheets, all pastel panels and the dark Space Tourism surface. All checked pairs pass (`design/verify.py`). Full keyboard traversal, screen-reader behavior, Safari, Firefox, real-device testing, automated axe checks and Web Vitals remain unverified. This is a visually reviewed homepage checkpoint, not a completed accessibility or release audit (`PRD.md` sections 28, 29 and 41).

## Decision mode and index previews checkpoint, October 6, 2026

The owner approved an interactive brief on October 6, 2026. The decision record and the new binding Appendix C live in `docs/prd-amendments.md`, section I, and in `PRD.md`. This checkpoint names only the homepage values that change.

The index rows keep their anchors and gain a reserved preview area on fine pointers: the first project shows by default, and hovering or focusing a row swaps the preview over 240 ms. No element follows the cursor; a static chip inside the preview area carries the view label. The four concept words beside the hero statement become focusable anchors that open one section 26 note each, with one note open at a time and `Esc` closing it. Decision Mode reveals a small number of site notes, defaults to off, and is driven by its frame control, the `d` shortcut, a palette command and the `annotated-decision-mode` key, all specified in Appendix C. The contact eyebrow reads "Have something worth building?" while the heading stays "Let's talk." The availability dot stays static. Previews reuse the first published media item of each project (`src/content/projects/*.mdx`), lazy, with empty alt text inside an `aria-hidden` layer.

Reduced motion and lite mode zero the new fades along with the contact underline. Checkpoint validation belongs to the next verification pass: lint, typecheck, tests, production build, budgets, `design/verify.py` and viewport checks (`src/styles/globals.css`, `scripts/check-budgets.mjs`, `design/verify.py`).
