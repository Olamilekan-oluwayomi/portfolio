# Mobile performance gate

`PRD.md` sections 29 and 39 require Lighthouse CI on pull requests. `lighthouserc.json` audits the production Next.js server, not the development server or an authenticated Vercel preview. `.github/workflows/ci.yml` runs it after build and typecheck and saves the raw reports even when assertions fail.

## Fixed profile

- Routes: `/` and `/brief`, the current public content routes (`src/app/`). Add routes to the collection list when they ship.
- Viewport: 390 by 844, mobile, device scale factor 1.75.
- Simulated Slow 4G: 150 ms RTT and 1638.4 Kbps throughput; CPU slowdown multiplier 4. The DevTools throttle values are also explicit. These values follow Lighthouse's mobile Slow 4G profile; the viewport follows `PRD.md` G1.
- Three cold runs per route; each audit uses the median numeric value. This avoids selecting the best run while reducing isolated timing noise.
- Errors: LCP above 2000 ms, CLS above 0.05, TBT above 150 ms. Homepage first-view transfer above 512000 bytes also fails, matching the 500 KB gate in `PRD.md` section 29.
- Reports remain on disk and in GitHub Actions artifacts for 14 days. No public Lighthouse storage account, service token or analytics integration is needed.

Run `npm run build`, then `npm run check:performance`. Chrome must be installed. `CHROME_PATH` can select a local installation; the Linux CI runner supplies Chrome. The test server uses port 4173, which must be free. Local artifacts are ignored in `.gitignore`.

## Dependency choice

`@lhci/cli@0.15.1` is a pinned development dependency (`package.json`, `package-lock.json`). It provides repeatable collection, per-route assertions and reviewable reports rather than a custom performance scoring implementation. Its installed direct files measure 97,899 bytes (`scripts/dependency-sizes.mjs`, `docs/phase-3-dependency-sizes.md`); transitive tooling is additional disk weight, not client transfer. First-load JavaScript remains checked independently by `scripts/check-budgets.mjs`.

The CLI's original dependency tree reported 14 advisories. Scoped overrides use `tmp@0.2.7`, `uuid@11.1.1`, `basic-ftp@6.2.2` and `puppeteer-core@25.12.0`. The Puppeteer override crosses a major version, so compatibility is checked by real Lighthouse collection through its browser connection, not assumed. Collection of six reports succeeds and `npm audit --json` reports zero advisories with the resolved lockfile on 2026-10-05. The overrides apply only inside the CLI dependency tree (`package.json`).

## Initial local findings

Reports from the fresh local production server on 2026-10-05 show homepage median LCP 2795.193 ms, CLS 0.001204 and TBT 232 ms; Brief median LCP 2430.549 ms, CLS 0.027532 and TBT 212 ms. Those LCP and TBT values fail the configured gates. These are Windows lab measurements, not field values or CI results (`artifacts/lighthouse/`, regenerated with `lighthouserc.json`).

Before the font fix, homepage CLS was 0.068262. Next's generated Arial fallback for Geist Mono used 131.49 percent size adjustment. `src/app/layout.tsx` now uses an unscaled monospace fallback and prioritizes the italic font used in the first viewport. Final loaded font files and typography remain the existing ones; three fonts are preloaded at most. This improves measured CLS without relaxing the threshold.

Linux CI measurement and a reviewed regression baseline remain to be established. Section 29's greater-than-10-percent regression rule is not yet enforced by this first absolute-budget checkpoint. Do not claim Phase 3 or the full performance phase complete on the strength of these gates alone.

References: https://googlechrome.github.io/lighthouse-ci/docs/configuration.html and the installed Lighthouse mobile profile in `node_modules/lighthouse/core/config/constants.js`.
