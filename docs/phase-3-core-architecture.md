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

## Deployment checkpoint, 2026-10-05

- `263fab4` declares the Next.js Vercel preset in `vercel.json`. The previous project preset was null and deployment `dpl_Aht8GraUB12zBJaasbVcWZgdLg9f` failed expecting `public` after building successfully.
- `4044eb6` updates `scripts/check-budgets.mjs` for Next.js 16.3 adapter output under `.next/server/route-cache/APP_PAGE/`. An actual local adapter build passed the homepage and other-route limits; a normal build also passed. The limits remain 140 KB for home, 170 KB for other routes, and 150 KB for fonts (`PRD.md` section 29).
- Preview deployment `dpl_G7Ajf2zi7qgJmkaXmsgVKCQmu5BW` for `4044eb6` reached Ready: https://portfolio-c1lmchs7o-ilesanmiolamilekan7gmailcoms-projects.vercel.app . Authenticated Vercel CLI requests returned 200 for `/` and `/brief`, and 404 for a missing route. Served HTML contains the identity and owner-provided WhatsApp and Twitter/X URLs (`src/content/identity.ts`). This is a deployment smoke check, not a browser accessibility or interaction sign-off.
- Both GitHub CI jobs passed for `4044eb6`: https://github.com/Olamilekan-oluwayomi/portfolio/actions/runs/37294667558 and https://github.com/Olamilekan-oluwayomi/portfolio/actions/runs/37294672725 .
- Production `main` remains outside this checkpoint. The changes are on `feat/editorial-homepage` in PR 4; this record does not claim that `main` deploys or that Phase 3 is complete.

## Remaining work

| Item | Evidence and constraint |
| --- | --- |
| Verify the production deploy | Required by `PRD.md` sections 33 and 39. Preview deployments reached Ready on 2026-10-05 (`dpl_G7Ajf2zi7qgJmkaXmsgVKCQmu5BW`); whether `main` deploys to production is unverified. See `docs/vercel-framework-decision.json`. |
| Add Lighthouse CI with the fixed mobile profile and thresholds | Required by `PRD.md` sections 29 and 39. Browser-size checks run in CI; Lighthouse does not yet. |
| Choose and record a static-compatible CSP | `PRD.md` section 32 says the static CSP approach must be selected and recorded. Current headers omit CSP pending that recorded decision. |
| Add the deferred CV file and production metadata host | `docs/phase-1-exit.md`, Appendix A items 8 and 13. |
| Complete Phase 4 navigation and achieve R0 | `PRD.md` sections 14, 36 and 39. Routes delivered so far: `/`, `/brief`, `/work/[slug]`, `/_not-found`. |

## Update, 2026-10-06

- Publication state changed since the checkpoint above. `src/content/release.ts` declares release `R1` with four published project slugs (`rentit`, `marginalia`, `space-tourism`, `foreign-exchange-checker`) after owner approval on 2026-10-06. The statement in the earlier remaining-work table that "no project or decision is published" and that "release.ts keeps the project list empty" is superseded by this line.
- Twelve decision records across the four projects carry `verified: true`, set by the owner (`src/content/decisions/`). The 15-record portfolio total and the two `reversed` or `open` records are checked from R2 onward (`PRD.md` section 16.2).
- Checks on 2026-10-06: `npm run lint`, `npm test` (17 tests), `npm run typecheck`, `npm run build` with `scripts/check-content.ts` reporting "4 published project pages (R1)", and `python design/verify.py` pass. This remains an implementation record, not an accessibility, deployment or release sign-off.
