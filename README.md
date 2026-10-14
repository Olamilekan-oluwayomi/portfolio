# Annotated

Personal portfolio implementation governed by `PRD.md` and `AGENTS.md`.
Phase 1 evidence lives in `docs/truth/` and `docs/phase-1-exit.md`. Phase 2
tokens, specimens and measurements live in `design/` and
`docs/phase-2-design-system.md`.

The portfolio uses Next.js App Router, strict TypeScript and Tailwind v4
(`next.config.ts`, `tsconfig.json`, `postcss.config.mjs`). Public identity comes
from one config (`src/content/identity.ts`). Release remains R1 with four
published case studies (`src/content/release.ts`). The owner-selected public
address is [lizzle.vercel.app](https://lizzle.vercel.app).

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
npx playwright install chromium
npm run test:launch
npm run audit:performance
npm run check:launch-content
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

Fonts use the existing Latin woff2 files with explicit local CSS URLs and
route-specific preload hints (`src/styles/globals.css`, `src/app/layout.tsx`,
`PRD.md` Appendix J). Theme, motion preferences, palette, Decision Mode and
Inspect are implemented in the client shell. Heavy layers load on action;
Inspect reports actual visit measurements (`src/components/shell.tsx`,
`src/lib/measurements.ts`). Native page links and static figures preserve the
reading path without JavaScript (`PRD.md` Appendix K).

## Current evidence and remaining gates

PR #16 merged at `7ad3d108a9a9a2a8b72a6fc4aa66cc73ef89ed0c` after all required
checks passed. Its CI evidence includes 44 unit tests, 43 browser checks and
ten-route performance audits (`tests/launch/accessibility.spec.ts`,
`docs/ci-performance-results.json`, `docs/launch-audit.md`). The owner approved
CI timing budgets of 3200ms LCP and 250ms TBT; the original timing targets were
not met (`PRD.md` Appendix L). The failed local report is retained separately
(`docs/launch-performance-results.json`).

R2/R3 are pending. Additional owner-verified decision records, the independent
review exercise, complete security/SEO sign-off and analytics/field monitoring
remain outstanding (`docs/launch-content-results.json`,
`docs/launch-review-sheet.md`, `docs/launch-audit.md`, `src/lib/analytics.ts`).
The public CV is a sanitized derivative; its source stays excluded from Git and
deployment uploads (`docs/deployment-identity.md`, `.vercelignore`).

## Production deployment

```sh
npm run deploy:production
```

This deploys and explicitly moves the lizzle alias to the new production
deployment (`package.json`). The former canonical host redirects to lizzle
(`next.config.ts`).
