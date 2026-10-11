# Mobile navigation redesign

The owner requested: "the mobile nav is not good redesign it, add animation". This authorizes the revised menu and its opening/closing motion (`PRD.md`, Appendix G).

The owner then requested full width and length. The surface and its content layout span the entire viewport with no centered width cap. Navigation rows grow into the available height between the header and footer, while small safe-area gutters and scrolling on short screens preserve control access (`src/styles/globals.css`). Actual viewport rendering remains unverified.

The owner requested a further rebuild with more distinctive styling and repeated the full-width requirement while viewing localhost. The menu now uses the existing cobalt and lime identity colors, oversized sans and italic display type, numbered Work, About, Experience and Contact links, and a full-width contact band. The current route has a lime band, a marker and `aria-current="page"`. Home, the brief, email and the existing public profile links remain available. Jump to opens the existing palette; Decisions and Inspect share a full-width utility strip (`src/components/mobile-menu.tsx`, `src/styles/globals.css`).

The layout, body, navigation, list, rows and footer each explicitly declare 100% width with no max-width cap. Utility and profile links occupy adjoining columns without an inset container; row backgrounds and dividers span the viewport. Text keeps safe reading insets. An HTTP check of the running localhost dev server confirmed it served the edited stylesheet; actual rendered geometry remains unverified (`src/styles/globals.css`).

The trigger combines a Menu label with a two-line glyph and `aria-expanded`. The menu uses a native dialog for focus trapping, Escape and focus restoration. Opening sets body overflow to hidden; closing restores its previous value. The surface scrolls on short screens and accounts for safe areas (`src/components/header-actions.tsx`, `src/components/mobile-menu.tsx`, `src/components/use-dialog.ts`, `src/styles/globals.css`). Live behavior remains unverified.

The surface fades in over the existing 400ms slow duration while its contents fade and move upward by 16px. The surface stays fixed at the full viewport bounds. Closing fades over the 240ms state-change duration; the dialog stays modal until completion, then navigation or the next panel opens. Escape follows the same exit path. A cancelled exit does not trigger stale navigation. Native Web Animations read the existing CSS duration and easing tokens, with immediate navigation for reduced-motion/lite preferences or a missing animation API (`src/components/mobile-menu.tsx`, `src/lib/menu-transition.ts`, `src/lib/motion.ts`). Browser rendering in this session remains unverified.

Menu code loads on the first Menu action and remains mounted afterward for exit transitions. This removes the menu body from the first-load shell; no dependency was added (`src/components/shell.tsx`, `package.json`).

The browser inventory returned no enabled surfaces. Visual review, animation rendering, focus restoration, screen readers and real-device behavior remain unverified. Build and source checks do not establish those results.

Validation: `npm.cmd run lint` and `npm.cmd run typecheck` passed; `npm.cmd test` passed 43 tests across 8 files, including exit completion, cancellation, reduced-motion and missing-animation-API checks (`src/lib/menu-transition.test.ts`). Production build output and bundle checks are recorded in `docs/mobile-navigation-validation.txt`. The existing missing metadataBase host remains unresolved (`src/content/identity.ts`). No verification flag was promoted.
