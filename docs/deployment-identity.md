# Supplied CV and current canonical host

The owner supplied `docs/Olamilekan_Ilesanmi_CV_Web_Developer.pdf` and the current deployed host `https://portfolio-omega-snowy-medsu1hh4w.vercel.app/` in this session. These values supersede the CV and domain deferrals in `docs/phase-1-exit.md`, Appendix A items 8 and 13, and the corresponding evidence-gap paragraph in `docs/implementation-status.md`.

The public CV is `public/olamilekan-ilesanmi-cv.pdf`. The supplied source contains employment product details excluded by the company/role/dates-only boundary in `docs/phase-1-exit.md`, Appendix A item 2. The public derivative removes the current-work description and employer product bullets, preserves the company, role and dates, and replaces typographic dashes with ASCII hyphens. Other text comes from the supplied CV, without introducing project claims (`scripts/prepare-public-cv.py`). The original remains unchanged locally and is excluded from Git and Vercel uploads (`.gitignore`, `.vercelignore`). Its SHA256 is `3643372b73871bbd4c84901015387c6150ca85d31cae7ede884295ad4084467b`; the public derivative's SHA256 is `b04fd039883be417f8ceb83b6becd9d1f92a95f8802b30fc416b124149a6d0fe`.

Public links are sourced from `siteIdentity.cv` in `src/content/identity.ts`. Brief and Contact use normal same-tab links; the palette uses a document action and `window.location.assign` (`src/lib/palette.ts`, `src/components/palette.tsx`; `PRD.md` sections 20 and 35). The public PDF was rendered and visually reviewed as a single page. Both source and derivative have no link annotations (`public/olamilekan-ilesanmi-cv.pdf`, `scripts/prepare-public-cv.py`).

`siteIdentity.domain` carries the supplied host without the trailing slash. Root metadata uses it as `metadataBase`; current public routes supply their own canonical paths, and project social-image URLs resolve against it (`src/app/layout.tsx`, `src/app/page.tsx`, `src/app/{about,brief,contact,experience,work}/page.tsx`, `src/app/work/[slug]/page.tsx`; `PRD.md` section 30).

The sitemap includes the six current public index/profile routes and the published project collection. It excludes draft projects and routes that have not shipped (`src/app/sitemap.ts`, `src/content/release.ts`). Accurate content modification dates are not tracked by this repository's content model, so `lastModified` is deferred rather than filled with build time or invented dates. Preview deployments retain noindex and disallow crawling; production allows crawling and names the canonical sitemap (`src/app/layout.tsx`, `src/app/robots.ts`).

This update changes no owner verification flags or release level (`src/content/release.ts`, `AGENTS.md`). CV fact reconciliation, the remaining SEO requirements and the other R2/R3 gates remain separate from wiring these two supplied values (`PRD.md` sections 16.2, 30, 38 and 43).

## Validation

`npm.cmd test` passed all 44 tests across eight files, including the same-tab CV palette action (`src/lib/palette.test.ts`). `npm.cmd run lint` passed. `npm.cmd run build` passed its content gate, compilation, TypeScript and all resource budgets, and emitted no missing-metadataBase warning (`package.json`, `scripts/check-budgets.mjs`).

The production-build HTTP check validates all ten public routes, internal links, figures, image candidates, PDF signature/content type/hash, route canonical URLs, absolute project social-image URLs, sitemap coverage and robots policy (`scripts/review-smoke.mjs`). Browser interaction, physical devices and screen readers remain unverified; these HTTP checks do not establish those results.
