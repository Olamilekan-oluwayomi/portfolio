# Annotated

Personal portfolio implementation governed by `PRD.md` and `AGENTS.md`.
Phase 1 evidence lives in `docs/truth/` and `docs/phase-1-exit.md`. Phase 2
tokens, specimens and measurements live in `design/` and
`docs/phase-2-design-system.md`.

The Phase 3 foundation uses Next.js App Router, strict TypeScript and Tailwind
v4 (`next.config.ts`, `tsconfig.json`, `postcss.config.mjs`). Public identity
comes from one config (`src/content/identity.ts`). This is a foundation preview,
not Release R0; the complete route frame belongs to Phase 4 (`PRD.md` section 39).

## Local development

Use Node 24 and npm. On Windows with PowerShell script execution disabled,
use `npm.cmd` in place of `npm`.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm test
npm run build
npm run typecheck
python design/verify.py
```

The build validates all MDX frontmatter before compiling, then checks first-load
JavaScript and font sizes (`scripts/check-content.ts`, `scripts/check-budgets.mjs`).
Malformed content fails in every mode. Publication findings fail by default.
`CONTENT_MODE=preview` or `VERCEL_ENV=preview` reports publication findings as
warnings, as required by `PRD.md` section 40.

## Content

Put authored projects in `src/content/projects/*.mdx` and decisions in
`src/content/decisions/*.mdx`. Frontmatter must satisfy `src/lib/schemas.ts`.
Publish eligible pages through `src/content/release.ts`. Only the owner changes
verification flags (`AGENTS.md`); evidence drafts are not promoted automatically.

Fonts use the existing Latin woff2 files through `next/font/local`
(`src/app/layout.tsx`). The app token file derives from `design/tokens.css`,
with static `@font-face` declarations removed (`src/styles/tokens.css`).
The app honours system colour preference through those tokens. Explicit theme
choice and Inspect belong to the later interaction phase (`PRD.md` sections 24, 39).

## Remaining Phase 3 work

Deployment, the static-compatible CSP decision, Lighthouse CI and its measured
profile, and remote CI verification remain outstanding (`PRD.md` sections 29,
32, 39). Canonical metadata awaits a known deployment host; the CV link awaits
the file (`docs/phase-1-exit.md`, Appendix A items 8 and 13). The analytics
module is an inert privacy-gated stub (`src/lib/analytics.ts`).
