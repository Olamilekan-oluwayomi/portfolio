# Mobile navigation redesign

The owner requested: "the mobile nav is not good redesign it, add animation". This authorizes the revised menu and its opening/closing motion (`PRD.md`, Appendix G).

The owner then requested full width and length. The surface and its content layout span the entire viewport with no centered width cap. Navigation rows grow into the available height between the header and footer, while small safe-area gutters and scrolling on short screens preserve control access (`src/styles/globals.css`). Actual viewport rendering remains unverified.

The menu is a full-screen editorial index with numbered Work, About, Experience and Contact links. The current route has an underline, a marker and `aria-current="page"`. Home, the brief, email and the existing public profile links remain available. Jump to opens the existing palette; Decisions and Inspect are grouped beneath navigation (`src/components/mobile-menu.tsx`).

The trigger combines a Menu label with a two-line glyph and `aria-expanded`. The menu uses a native dialog for focus trapping, Escape and focus restoration. Opening sets body overflow to hidden; closing restores its previous value. The surface scrolls on short screens and accounts for safe areas (`src/components/header-actions.tsx`, `src/components/mobile-menu.tsx`, `src/components/use-dialog.ts`, `src/styles/globals.css`). Live behavior remains unverified.

The menu surface fades and moves 8px over the existing 240ms state-change duration. CSS `@starting-style` and discrete display/overlay transitions support entry and exit without timers or a motion library. The background fades with the same duration. Reduced-motion and lite preferences disable the transition; browsers lacking these CSS features retain ordinary dialog navigation (`src/styles/globals.css`, `src/lib/motion.ts`). Browser support in this session remains unverified.

Menu code loads on the first Menu action and remains mounted afterward for exit transitions. This removes the menu body from the first-load shell; no dependency was added (`src/components/shell.tsx`, `package.json`).

The browser inventory returned no enabled surfaces. Visual review, animation rendering, focus restoration, screen readers and real-device behavior remain unverified. Build and source checks do not establish those results.

Validation: `npm.cmd run lint` and `npm.cmd run typecheck` passed; `npm.cmd test` passed 39 tests across 7 files. Production build output and bundle checks are recorded in `docs/mobile-navigation-validation.txt`. The existing missing metadataBase host remains unresolved (`src/content/identity.ts`). No verification flag was promoted.
