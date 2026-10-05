# Phase 3 record: core architecture

Status of the Phase 3 deliverables in `PRD.md` section 39. This records implementation and checks; it does not approve content, publish a release, configure a Vercel project, or mark facts verified. `AGENTS.md` reserves verification for the owner.

## Delivered in this branch

| Deliverable | Evidence |
| --- | --- |
| Next.js App Router, TypeScript strict, Tailwind CSS v4 | `package.json`, `tsconfig.json`, `postcss.config.mjs`, `src/app/` |
| MDX frontmatter validation with Zod, evidence and release gates | `src/lib/schemas.ts`, `src/lib/content.ts`, `scripts/check-content.ts` |
| Automated tests for schemas, publication gates, loader failures, copy rules and analytics privacy | `src/lib/schemas.test.ts` |
| GitHub Actions checks on pushes and pull requests | `.github/workflows/ci.yml` |
| Fonts integrated through `next/font/local`; Phase 2 tokens carry into app CSS | `src/app/layout.tsx`, `src/styles/tokens.css`, `src/styles/globals.css` |
| Built client-JavaScript and font gates | `scripts/check-budgets.mjs` |
| Dependency footprint, recorded as installed direct-package bytes | `docs/phase-3-dependency-sizes.md`, `scripts/dependency-sizes.mjs` |
| Cookieless analytics stub with DNT and GPC consent predicate | `src/lib/analytics.ts` |

## Verification on 2026-10-04

- `npm.cmd run lint`: passed.
- `npm.cmd run typecheck`: passed.
- `npm.cmd test`: passed, 13 tests.
- `npm.cmd run build`: passed. Routes `/` and `/_not-found` are statically generated.
- Home first-load JavaScript: 134,875 gzip bytes against 143,360 bytes. The legacy `noModule` chunk is excluded because module-supporting browsers do not fetch it. Source: `.next/server/app/index.html`, `.next/static/chunks/`, `scripts/check-budgets.mjs`, and the 140 KB target in `PRD.md` section 29.
- Font files: 95,688 bytes against 153,600 bytes, measured from `design/fonts/` by `scripts/check-budgets.mjs`; source budget is `PRD.md` section 29.
- `python design/verify.py`: passed, all palette values and contrast pairs match `PRD.md`.
- `npm.cmd audit --omit=dev --json`: zero production dependency advisories at check time. A prior full audit reported five advisories in the removed Next ESLint preset dependency tree. After replacing that preset with `typescript-eslint`, the npm install reported zero advisories; a full audit has not been rerun successfully since the registry audit endpoint began returning errors.

## Open work

| Item | Evidence and constraint |
| --- | --- |
| Configure Vercel and verify the production deploy | Required by `PRD.md` sections 33 and 39. Preview deployment of `dd6dae4` failed after a successful build because the project had no framework preset and expected `public`. `vercel.json` now declares Next.js and retains the gated build command. See `docs/vercel-framework-decision.json`; successful deployment remains to be checked. |
| Add Lighthouse CI with the fixed mobile profile and thresholds | Required by `PRD.md` sections 29 and 39. Browser-size checks run in CI; Lighthouse does not yet. |
| Choose and record a static-compatible CSP | `PRD.md` section 32 says the static CSP approach must be selected and recorded. Current headers omit CSP pending that recorded decision. |
| Add the deferred CV file and production metadata host | `docs/phase-1-exit.md`, Appendix A items 8 and 13. |
| Build the Phase 4 navigation routes and achieve R0 | `PRD.md` section 39. Current implemented routes are `/`, `/brief` and `/_not-found` (`src/app/`). |
| Owner review of content and evidence | No project or decision is published. `src/content/release.ts` keeps the project list empty. No implementation sets a verification field true. |
