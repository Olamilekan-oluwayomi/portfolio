# Phase 1 exit worksheet

Owner-facing checklist for closing Phase 1: Project truth and decision evidence (`PRD.md:1327`, section 39). Phase 2, the design system, depends on this phase (`PRD.md:1328`). Writing in this file does not approve anything: every item needs an owner decision or a written deferral.

Rules that apply here:

- Deferred facts stay out of public copy (`PRD.md:1479`).
- Only the owner sets `verified: true` (`AGENTS.md`).
- Every claim cites a file path or commit hash (`AGENTS.md`).
- No em dashes in site copy or documentation (`PRD.md:1506`).

## Status snapshot

| Artifact | State |
| --- | --- |
| PRD v1.1 | Approved by the owner (2026-10-03); its resolvable `[CONFIRM]` markers are resolved |
| Truth sheets | 5 present in `docs/truth/`, accepted by the owner (2026-10-03) |
| Decision seeds | 32 across 5 projects, all `verified: false` |
| Appendix A items | 14 of 14 decided or deferred |
| Phase 1 exit | Met (2026-10-03) |

Project sources recorded in the truth sheets:

| Project | Truth sheet | Source repository | Inspected at |
| --- | --- | --- | --- |
| RentIt | `docs/truth/rentit.md` | `C:\Users\hp\Desktop\rentit` | `f07791d` |
| Space Tourism | `docs/truth/space-tourism.md` | `C:\Users\hp\Desktop\Frontend-mentor\space-tourism-website-main` | `90f8926` |
| Guardrail | `docs/truth/guardrail.md` | `C:\Users\hp\Desktop\guardrail-dapp` | `1e6f005` |
| Foreign Exchange Checker | `docs/truth/foreign-exchange-checker.md` | `C:\Users\hp\Desktop\Frontend-mentor\foreign-exchange-checker` | `3a73025` |
| Marginalia | `docs/truth/marginalia.md` | `C:\Users\hp\Desktop\ai-research-assistant` | `0d71954` |

## A. Appendix A decisions

The canonical inventory is `PRD.md:1481` to `PRD.md:1494`. For each item choose one: DECIDE (write the value) or DEFER (state that the fact stays out of public copy). A deferred fact leaves every page, tag and structured data field empty.

This section is pre-filled from the truth sheets in `docs/truth/`. Two markers:

- **CONFIRM:** evidence already records a candidate value. The owner confirms it or corrects it. A confirmed value is still `verified: false` until the owner promotes it (`AGENTS.md`).
- **OWNER ONLY:** no evidence exists in this repository or in the truth sheets. Only the owner can write the value. Nothing here may be guessed.

A candidate being present is not a verification. Every truth sheet says so in its own words (`docs/truth/guardrail.md:7`, `docs/truth/space-tourism.md:7`, `docs/truth/foreign-exchange-checker.md:7`).

### 1. Public role title for `siteIdentity.role` (`PRD.md:1481`)

- **OWNER ONLY.** No role title appears in this repository or in any truth sheet.
- The Log keeps exact job titles (`PRD.md:1138`), so this title and the Log entries must not contradict each other.
- Decision: DECIDE. Owner chose `Frontend Engineer` (2026-10-02). The Log still records the exact job title, `Frontend Developer Intern` (`PRD.md:527`). `verified` stays false until the owner promotes it.

### 2. PitchMatter wording for `employer` and `currentWork` (`PRD.md:1482`)

- **OWNER ONLY.** No PitchMatter wording is recorded in this repository or in any truth sheet.
- Requires written employer approval if the company requires it. Until wording is approved the affected field stays empty, and no page, tag or structured data mentions it (`PRD.md:1151`). If approval is refused, record a decision and adjust G1 (`PRD.md:1151`).
- Decision: DECIDE in part, DEFER in part (owner, 2026-10-02, revised). The owner confirms the NDA permits naming the employer, so `employer` is set to `PitchMatter` and G1's employer requirement stands as written rather than needing adjustment (`PRD.md:73`, `PRD.md:1151`). The product and the work stay unpublished: the owner approved the employer name only, so `currentWork` stays empty, no page, tag or structured data names the product, and the PitchMatter Log entry may be `public: true` carrying company, role and dates only with no description (`PRD.md:1123`, `PRD.md:527`). A site-level decision record documents the boundary, employer name public and product and work private, and a site decision of this kind counts toward the 15-record total and the reversed/open minimum while never counting toward a project's 3 (`PRD.md:432`). Amendment E is revised accordingly in `docs/prd-amendments.md`. Residual closed (owner, 2026-10-03): no product name and no description of the work is published, at any level of generality. The boundary stands as the default rather than as a pending question, and `PRD.md:1151` now states it directly.

### 3. Experience Log facts, checked against the CV (`PRD.md:1483`)

- **CONFIRM (drafts exist in the PRD) plus OWNER ONLY for the CV check.** The PRD carries a draft Log table at `PRD.md:527` to `PRD.md:531`: PitchMatter, August 2026 to present; Blueskills, October 2025 to present, 32 branches; NYSC, 2025 to 2026; B.Sc. Geography, Obafemi Awolowo University, 2024; President, NAGS, 2023 to 2024.
- No CV file exists in the repository; `siteIdentity.cv` is drafted as `/olamilekan-ilesanmi-cv.pdf` (`PRD.md:1146`). The branch count and every date stay unverified until checked against the CV.
- Decision: DECIDE (owner, 2026-10-02). The owner confirms a current CV whose facts match all five drafts at `PRD.md:527` to `PRD.md:531`, so the entries stand as written. Separately, the PitchMatter row names the company, role and dates only, with no product and no description of the work (owner, 2026-10-02). Item 2 now confirms the NDA permits naming the employer, so that row is no longer conditional. `verified` stays false, and the CV file itself must be placed at the `siteIdentity.cv` path (item 8) before the Log can cite it.

### 4. Project years and origins (`PRD.md:1484`)

- **OWNER ONLY for every year.** Origins are partly evidenced.

| Project | Origin evidence | Year evidence |
| --- | --- | --- |
| RentIt | No origin statement in the repository (`docs/truth/rentit.md:5`) | None; the repository holds commit dates in July 2026 and nothing that states the project start or the owner's role (`docs/truth/rentit.md:252`) |
| Space Tourism | Frontend Mentor challenge; the README credits Frontend Mentor for the design (`docs/truth/space-tourism.md:11`) | None; the inspected commit date is not owner confirmation of a portfolio year (`docs/truth/space-tourism.md:13`) |
| Guardrail | Self-described dApp; the README describes a Vyper contract on Arc, and the contract source is absent (`docs/truth/guardrail.md:12`) | None (`docs/truth/guardrail.md:13`) |
| FX Checker | Frontend Mentor challenge using the provided design system and assets (`docs/truth/foreign-exchange-checker.md:11`) | None (`docs/truth/foreign-exchange-checker.md:13`) |
| Marginalia | AI research assistant concept; the directory is `ai-research-assistant` and the product name is Marginalia (`docs/truth/marginalia.md:13`) | None; HEAD is dated 2026-09-29 (`docs/truth/marginalia.md:6`) |

- Every truth sheet states that a commit date is not a confirmed portfolio year (`docs/truth/space-tourism.md:13`, `docs/truth/foreign-exchange-checker.md:13`, `docs/truth/guardrail.md:13`).
- Years: DECIDE (owner, 2026-10-02). All five projects carry `year: 2026`. This matches every inspected HEAD date (`docs/truth/rentit.md:4`, `docs/truth/guardrail.md:4`, `docs/truth/foreign-exchange-checker.md:4`, `docs/truth/space-tourism.md:4`, `docs/truth/marginalia.md:5`).
- Conflict resolution (owner, 2026-10-02, revised twice): the 2025 row is not blank, and it is anchored to the NYSC and Blueskills facts rather than to an artifact the PRD listed (see item 14). The PRD adjustment at `PRD.md:510` and `PRD.md:1165` is applied under Appendix B rule 10 (`PRD.md:1507`; `docs/prd-amendments.md` groups A and B), because RentIt and Marginalia are 2026 projects, so the PRD's 2025 artifact list (Shore Guesthouse, the three state-management starters) had no year to sit in; the starters are Lab items regardless (`PRD.md:546`).
- Origins: DECIDE (owner, 2026-10-02). Space Tourism and FX Checker both began from Frontend Mentor supplied designs, and their pages will say so, separating the supplied design from the owner's own choices (`PRD.md:1310`; `docs/truth/space-tourism.md:11`, `docs/truth/foreign-exchange-checker.md:11`).
- Guardrail origin: owner attests that they wrote the contract (2026-10-02). Evidence is still missing. The tracked tree at `1e6f005` holds an ABI and no Vyper or Solidity source, test suite or deployment artifact (`docs/truth/guardrail.md:59`). Owner decision (2026-10-02): the project is deferred (item 5), so no enforcement claim and no rule simulation is authored and this gap no longer gates any page. `verified` stays false.
- RentIt and Marginalia origins: DECIDE (owner, 2026-10-02). The owner confirms both are their own builds from the start. Neither repository carries an origin statement, so this rests on owner confirmation alone (`docs/truth/rentit.md:5`, `docs/truth/marginalia.md:13`).

### 5. Feature truth (`PRD.md:1485`)

**Largely evidenced, with named gaps.** The truth sheets answer most of this item, and two answers require a PRD copy change. Per sub-item:

- **Guardrail enforced rules: OWNER ONLY, and now deferred.** The tracked tree holds an ABI, not the contract. Contract language, authorship, deployed bytecode and enforcement are unverified (`docs/truth/guardrail.md:12`), and an ABI signature cannot prove that a memo, role, daily limit or pause is enforced on-chain (`docs/truth/guardrail.md:57`). The contract source, deployment-to-source evidence and the real revert reasons would be required before any enforced-rule simulation is authored (`docs/truth/guardrail.md:99`), but the project is deferred, so no such simulation is authored.
- **Guardrail update (owner, 2026-10-02):** the owner attests they wrote the contract but cannot now produce or locate the source. Section 38 says a project is deferred, not padded, when it cannot meet the requirements without invented features (`PRD.md:1278`), and section 43 item 3 requires each published project to meet section 38 (`PRD.md:1443`). So Guardrail either publishes as dashboard-only with every enforcement claim dropped (`PRD.md:1311`), or it is deferred.
- **Decision (owner, 2026-10-02): defer the project.** The explorer check closed the contract-source route rather than leaving it open: the address the dashboard hardcodes is a deployed contract, but it is not verified, so no source is published on chain and the explorer cannot recover it (`docs/truth/guardrail.md:61`). With the source unrecoverable, the section 38 requirements cannot be met without invented features, so the project is deferred rather than padded (`PRD.md:1278`).
- **Consequences of the deferral.** No Guardrail project page, no Guardrail experience, no Guardrail decision records, and its 5 seeds are deferred with it (`docs/truth/guardrail-decisions.md:7` to `:65`). Guardrail leaves public copy entirely (owner, 2026-10-02), so it appears in neither the Work list nor the Brief and no page or structured data links its live URL or its repository, consistent with the deferred-facts rule at `PRD.md:1479`. The 15-record total is **not** relaxed by the deferral (`PRD.md:1278`); it stays available from the other four projects' 27 seeds (`RentIt 8, Space Tourism 5, FX Checker 6, Marginalia 8`).
- **FX Checker data source: EVIDENCED.** `https://api.frankfurter.dev/v1/latest`, `/v1/currencies` and the dated endpoints, called from the browser with no API key (`docs/truth/foreign-exchange-checker.md:52` to `:57`). The header copy "55 CURRENCIES - EOD - ECB DATA" is hardcoded, not a count derived from the fetched list (`docs/truth/foreign-exchange-checker.md:62`).
- **FX Checker states: EVIDENCED, and this shrinks the PRD.** The states that exist are converter result / missing result, history loading, history empty or failed, search no-results, empty favorites and empty log, missing comparison amount, and silent placeholders on ticker or stat failure (`docs/truth/foreign-exchange-checker.md:79` to `:88`). There is no stale-rate indicator and no offline mode (`docs/truth/foreign-exchange-checker.md:66`). The PRD's "Stale rate" and "Offline" tabs (`PRD.md:479`) describe states the app does not have, so they must be dropped or labeled as recreated (`docs/truth/foreign-exchange-checker.md:90`, `PRD.md:1312`).
- **RentIt booking statuses and access rules: PARTLY EVIDENCED, with a hard limit.** Routes, features, auth and Supabase policies are recorded (`docs/truth/rentit.md:54`, `docs/truth/rentit.md:108`, `docs/truth/rentit.md:181`). Five of nine tables have no versioned `CREATE TABLE`, so the database is not reproducible from the repository and the README's schema tables describe the live database rather than a migration set (`docs/truth/rentit.md:249`, `docs/truth/rentit.md:191`). `contact_messages` has no migration and no RLS policy in the repository (`docs/truth/rentit.md:254`).
- **Space Tourism sections: EVIDENCED.** Four routes exist: `/` (Home with an explore link), `/destination` (Moon, Mars, Europa, Titan), `/crew` (four entries), `/technology` (launch vehicle, spaceport, capsule) (`docs/truth/space-tourism.md:53` to `:55`). There is no not-found route and no authored no-JavaScript fallback (`docs/truth/space-tourism.md:59`). The PRD must not claim "accessible tabs": no tablist/tabpanel semantics, selected-state ARIA or arrow-key handler exists (`docs/truth/space-tourism.md:84`, `docs/truth/space-tourism.md:77` to `:79`).
- **Marginalia AI integration: EVIDENCED from code.** The truth sheet answers this from source rather than the pitch (`docs/truth/marginalia.md:9`, `docs/truth/marginalia.md:55`). Providers and fallbacks, the bounded values with file and line, and the retrieval layer are recorded (`docs/truth/marginalia.md:59`, `docs/truth/marginalia.md:103`, `docs/truth/marginalia.md:125`).
- Decision: DECIDE for the evidenced sub-items and DEFER for Guardrail (owner, 2026-10-02). The data source, states, sections, AI integration and RentIt access limits stand as the truth sheets record them, and the Guardrail enforced-rules sub-item is deferred in writing with the project, so item 5 closes. Two PRD copy changes are forced by evidence and must be made under Appendix B rule 10 (`PRD.md:1507`): drop or label the FX Checker "Stale rate" and "Offline" tabs (`PRD.md:479`, and the figures row at `PRD.md:1300`), and remove the Space Tourism "accessible tabs" claim (`PRD.md:454`, `PRD.md:459`).

### 6. Live URL for each project (`PRD.md:1486`)

**CONFIRM for three, OWNER ONLY for two.** Every URL below is owner-supplied or PRD-drafted, never repository evidence, and none is verified against its inspected commit. A 200 response proves reachability only (`docs/truth/guardrail.md:29`).

| Project | Candidate | Citation | Still open |
| --- | --- | --- | --- |
| Guardrail | `https://guardrail-dapp.vercel.app/` | `docs/truth/guardrail.md:17`; 200 observed at `docs/truth/guardrail.md:23` | Deferred with the project (item 5): recorded evidence, but no public page or link uses it |
| Space Tourism | `https://space-tourismx.vercel.app/` | `docs/truth/space-tourism.md:17`; 200 observed at `docs/truth/space-tourism.md:23` | Nested routes, iframe compatibility, deployed parity |
| FX Checker | `https://foreign-exchange-checker-eight.vercel.app/` | `docs/truth/foreign-exchange-checker.md:17`; 200 observed at `docs/truth/foreign-exchange-checker.md:23` | Deployed API behavior, parity |
| RentIt | `https://rentitdaily.vercel.app/` | `PRD.md:1181`, confirmed by the owner (2026-10-02); no URL appears anywhere in the repository (`docs/truth/rentit.md:44`) | Deployment-to-commit parity; the URL rests on owner confirmation and the PRD draft, not on repository evidence |
| Marginalia | `https://marginalia-u6x8.vercel.app/` | Supplied by the owner (2026-10-02), who first gave the `/login` route and then set Open live to the root `/` (owner, 2026-10-02). The host matches the PRD draft at `PRD.md:494`, which the truth sheet said not to reuse until confirmed (`docs/truth/marginalia.md:19`) | The app requires an account, so the page must state that (`docs/truth/marginalia-decisions.md:125`); deployment-to-commit parity |

- Decision: DECIDE (owner, 2026-10-02). All five live URLs are recorded: RentIt `https://rentitdaily.vercel.app/`, Space Tourism `https://space-tourismx.vercel.app/`, Guardrail `https://guardrail-dapp.vercel.app/`, FX Checker `https://foreign-exchange-checker-eight.vercel.app/`, Marginalia `https://marginalia-u6x8.vercel.app/`. Open live points at the root for every published project, Marginalia included; the Guardrail URL stays recorded evidence only, since that project is deferred and out of public copy (item 5); the `/login` route the owner first supplied is where the app sends a visitor without an account, not the link target. Except for RentIt, each URL rests on owner supply with no deployment-to-commit parity check. - Reachability check (2026-10-02). All five URLs were fetched. None returns a deployment-not-found page. Three findings are worth keeping. Guardrail's live page renders fully and its footer names the same contract address the source hardcodes, `0x56b6...c22d`, and the same chain ID, 5042002, so the address at `docs/truth/guardrail.md:51` is confirmed present in the deployed app, which is a real signal though not a commit-level parity check. Marginalia's live page is a sign-in screen offering Google and email, so the page must say an account is required (`docs/truth/marginalia-decisions.md:125`). RentIt and Space Tourism resolve with the titles `RentIt` and `space-tourism`, where the RentIt title carries a second part, `Rent from locals`. FX Checker resolved, and the string "starter-code" is the document's own title: `starter-code/index.html:11` sets `<title>starter-code</title>`, the Frontend Mentor starter folder name, so the deployed app ships the template default. That both confirms the deployment builds from this repository and gives the owner a one-line fix to decide on (`docs/truth/foreign-exchange-checker.md`, section 7 item 8).

### 7. Repository names and visibility (`PRD.md:1487`)

**CONFIRM for names, OWNER ONLY for visibility.** Every origin was read with `git config remote.origin.url`; visibility was not.

| Repository | Name | Visibility |
| --- | --- | --- |
| RentIt | `Olamilekan-oluwayomi/rentit` (`docs/truth/rentit.md:5`) | Public, verified (2026-10-02); the repository page reports 128 commits |
| Space Tourism | `Olamilekan-oluwayomi/space-tourism-website-main` (`docs/truth/space-tourism.md:5`) | Public, verified (2026-10-02); the repository page reports 9 commits |
| Guardrail | `Olamilekan-oluwayomi/guardrail-dapp` (`docs/truth/guardrail.md:5`) | Public, verified (2026-10-02); the repository page reports 2 commits, matching the two inspected commits (`docs/truth/guardrail.md:13`). The repository stays public; the deferral means no Source link appears on the site (item 5) |
| FX Checker | `Olamilekan-oluwayomi/foreign-exchange-checker` (`docs/truth/foreign-exchange-checker.md:5`) | Public, verified (2026-10-02); the repository page reports 33 commits and names the same live demo as the owner-supplied URL |
| Marginalia | `Olamilekan-oluwayomi/Marginalia` (`docs/truth/marginalia.md:4`) | Public, verified (2026-10-02). The audit read a GitHub API 404 as private (`docs/truth/marginalia.md:27`); the owner then made it public, and that line carries a dated amendment. Loading the repository page returns a repository view and not a 404, and it reports 103 commits on `main`, matching the local audit's count (`docs/truth/marginalia.md:6`), so this is evidence rather than testimony (`docs/truth/marginalia.md:29`) |

- Site source repository: the working copy at `C:\Users\hp\desktop\portfolio` has remote `https://github.com/Olamilekan-oluwayomi/portfolio.git` (`git remote -v`, recorded 2026-10-02 on branch `main` at `a6570cd`). Visibility: public, verified (2026-10-03). An unauthenticated fetch of both `https://github.com/Olamilekan-oluwayomi/portfolio` and `https://api.github.com/repos/Olamilekan-oluwayomi/portfolio` returns HTTP 200. The same check returns 200 for RentIt, Guardrail and Marginalia, which are known public, so the method distinguishes a public repository from a private one rather than returning 200 for anything. An earlier fetch on 2026-10-02 returned 404; the owner reports the repository was made public between the two checks, so the 404 was the earlier state and not a mistyped path. Section 43 item 16 requires the repository public (`PRD.md:1456`), which is now satisfied, so the footer colophon (`PRD.md:387`), the site source link (`PRD.md:128`) and the console greeting (`PRD.md:572`) all point at a repository a visitor can open.
- Marginalia's Source affordance was the owner's decision while the repository was private (`docs/truth/marginalia.md:29`). The repository is public (owner, 2026-10-02), so it carries a Source link to `https://github.com/Olamilekan-oluwayomi/Marginalia` alongside the other four, and that open sub-item closes.
- Decision: DECIDE (owner, 2026-10-02). All five project repositories are public: RentIt, Space Tourism, Guardrail, FX Checker and Marginalia. Each published project carries a Source link, and the Marginalia Source affordance question the truth sheet left to the owner no longer applies (`docs/truth/marginalia.md:29`). Guardrail's repository stays public but carries no Source link on the site, because the project is deferred and out of public copy (item 5). The five public states were then confirmed independently on 2026-10-02 by loading each repository page: all five return a repository view rather than a 404, and the reported commit counts corroborate the local audits (Marginalia 103 against `docs/truth/marginalia.md:6`, Guardrail 2 against `docs/truth/guardrail.md:13`, and the FX Checker page naming the same live demo as the owner-supplied URL at line 101), so visibility now rests on evidence rather than testimony. The site's own repository is private (owner, 2026-10-02), which conflicts with section 43 item 16 requiring it public (`PRD.md:1456`), with the footer colophon "Source on GitHub" (`PRD.md:387`), with the user need for a site source link (`PRD.md:128`), and with the console greeting that links to the source repository (`PRD.md:572`). The footer's personal GitHub profile link is a separate affordance and can stay (`PRD.md:355`). The site source affordance is resolved: the repository is public, so the colophon, the site source link and the console greeting all work as specified and no replacement affordance is needed. Item 7 closes, and Amendment F is withdrawn rather than drafted, because the conflict it existed to resolve no longer exists.

### 8. CV file (`PRD.md:1488`)

- **OWNER ONLY.** `siteIdentity.cv` is drafted as `/olamilekan-ilesanmi-cv.pdf` (`PRD.md:1146`). No PDF exists in the repository. No class of degree and no CGPA may appear (`PRD.md:1488`, `PRD.md:530`).
- Decision: DECIDE (owner, 2026-10-02). The path `/olamilekan-ilesanmi-cv.pdf` stands. The PDF itself is not in this repository and must be placed at that path before any page links it. Its facts must match the confirmed Log entries (item 3) and it must carry no class of degree and no CGPA (`PRD.md:1488`, `PRD.md:530`).

### 9. About photo (`PRD.md:1489`)

- **CONFIRM.** The v1 default is none (`PRD.md:1489`, `PRD.md:519`). Confirm the default or supply a photo.
- Decision: DECIDE (owner, 2026-10-02). No photo. About stays typographic.

### 10. Public email address and phone number (`PRD.md:1490`)

- **OWNER ONLY.** No address appears in this repository. The default for the phone number is no (`PRD.md:1490`, `PRD.md:912`).
- Decision: DECIDE (owner, 2026-10-02). Public email `ilesanmiolamilekan05@gmail.com`. The phone number stays unpublished, matching the PRD default (`PRD.md:912`). Scraping is the accepted cost of a public address (`PRD.md:912`).

### 11. Availability wording and reply time (`PRD.md:1491`)

- **OWNER ONLY.** No wording is recorded. The PRD's example at `PRD.md:562` is a voice sample, not a decision.
- Decision: DECIDE (owner, 2026-10-02). Availability: `Available for opportunities. Replies within 24 hours.` Sentence case applies on site UI (`PRD.md:1506`), and the value is one line holding the availability statement plus the reply time (`PRD.md:562`, `PRD.md:1143`).

### 12. Lab items, and whether Branch Watch relates to Blueskills (`PRD.md:1492`)

- **CONFIRM (drafts exist in the PRD) plus OWNER ONLY for the Branch Watch link.** The PRD drafts Earthquake Tracker, IP Address Tracker, Launch Countdown Timer, Branch Watch, and three open-source starters (Redux Toolkit, Zustand, Context API) at `PRD.md:546`. Inclusion is `[CONFIRM]`, and none is verified in this repository.
- The whole of Lab is post-R0 and cut-first (`PRD.md:544`), so this item does not gate R0.
- Decision: DECIDE (owner, 2026-10-02). The list stands as drafted at `PRD.md:546`: Earthquake Tracker, IP Address Tracker, Launch Countdown Timer, Branch Watch, and the three open-source starters (Redux Toolkit, Zustand, Context API). Branch Watch relates to the Blueskills work (owner, 2026-10-02), so the two are not unrelated and must not be presented as if they were. What the relationship actually is has not been stated, and it is the owner's to supply before the Branch Watch entry is written; the Blueskills facts already in the Log are Field Supervisor from October 2025 and 32 branches (`PRD.md:528`). The Log's link cell is deferred until then, so `PRD.md:528` names the project and publishes no link. No item in the list is verified in this repository.

### 13. Domain for canonical URLs and OG images (`PRD.md:1493`)

- **OWNER ONLY.** No domain is recorded. `siteIdentity.domain` is `[CONFIRM]` (`PRD.md:995`).
- Decision: DEFER (owner, 2026-10-02). No custom domain. Consequence: `metadataBase`, `alternates.canonical` (`PRD.md:848`), the OG image URLs (`PRD.md:845`) and the sitemap (`PRD.md:849`) must use the deployment host, and section 43 item 14 requires a canonical host live before done (`PRD.md:1454`). Revisit once the deployment host is known.

### 14. The 2023 gap (`PRD.md:1494`)

- **OWNER ONLY.** Confirm three things: that the gap is accurate, that it should be shown, and that it does not contradict the Log's 2023 entry (President, NAGS, 2023 to 2024, `PRD.md:531`).
- The About drafts 2023 as intentionally blank with the caption "No commits. Left blank." (`PRD.md:508`).
- Decision on 2025 (owner, 2026-10-02, revised): the 2025 row is not blank and does not read "Learning Phase". It is anchored to two evidenced facts already in the Log: NYSC, Ministry of Establishment and Training, Oyo State, 2025 to 2026 (`PRD.md:529`), and Field Supervisor at Blueskills from October 2025 (`PRD.md:528`). This removes the two-gap problem in item 4, keeps "The Gap" as the single silence (`PRD.md:513`), and drops the wording conflict with `PRD.md:51` to `PRD.md:55` and the banned-phrase list (`PRD.md:1241`). The row line is approved as drafted (owner, 2026-10-03): the row reads "In service. Kept building." The PRD adjustment at `PRD.md:510` is applied under Appendix B rule 10 (`PRD.md:1507`; `docs/prd-amendments.md` group A).
- 2024 row: DEFER the artifact cell (owner, 2026-10-03). No project or repository for 2024 is recorded in any truth sheet or repository inspected for this phase, and none was named, so the cell publishes no artifact: `PRD.md:509` now reads "None. No artifact is published for this year". The row caption "Came back." belongs to the same draft timeline as the other rows and is approved with them. This is the deferral section 39 accepts for a fact that cannot be evidenced, and the fact stays out of public copy (`PRD.md:1479`).
- 2023 gap: DECIDE (owner, 2026-10-02). The owner confirms the gap is accurate and wanted, and that it does not contradict the Log's 2023 entry (President, NAGS, 2023 to 2024, `PRD.md:531`). "The Gap" keeps its place as a signature moment (`PRD.md:268`, `PRD.md:513`).

Item 5 closes (owner, 2026-10-02). Its Guardrail sub-item is deferred in writing with the project, which is one of the two outcomes section 39 accepts (`PRD.md:1327`), so every Appendix A item now has an owner decision or a written deferral and section A closes. Three consequences carry forward. Guardrail's page, its experience and its decision records are not built. The 15-record total is not relaxed by the deferral (`PRD.md:1278`), so it must be met from the other four projects' 27 seeds plus site-level decisions. And the deferral forced PRD adjustments under Appendix B rule 10 (`PRD.md:1507`), applied as Amendment G in `docs/prd-amendments.md`, because several PRD passages still named Guardrail as one of five shipped projects.

Every `[CONFIRM]` is now resolved. The sweep of 2026-10-03 removed 26 markers whose facts Appendix A decided or deferred, and each disposition is recorded in `docs/prd-amendments.md` group H. Twelve lines still contain the word `CONFIRM`, and none is an unresolved fact. Three are the Guardrail page markers at `PRD.md:466`, `PRD.md:470` and `PRD.md:472`: they describe a deferred piece that ships nothing, so they are kept as a record of what was never confirmed rather than deleted, which would imply a verification that did not happen. The other nine are the PRD's own prose explaining the convention (`PRD.md:13`, `PRD.md:90`, `PRD.md:438`, `PRD.md:1327`, `PRD.md:1358`, `PRD.md:1360`, `PRD.md:1431`, `PRD.md:1444`, `PRD.md:1479`). Section 43 item 4 requires that no marker reach published content, and none of the twelve is published.

The PRD adjustments these decisions owed under Appendix B rule 10 (`PRD.md:1507`) are recorded as exact before-and-after text in `docs/prd-amendments.md`. Groups A to E and G are applied to `PRD.md` (commit `530e7d1`), and group H records the marker resolution sweep of 2026-10-03. Amendment F is withdrawn: the site source repository is public, so the conflict it existed to resolve is gone. That file also audits the voice sample at `PRD.md:1243` against the banned-phrase list at `PRD.md:1241`; it passes.

Supporting references for items 3 and 14: the Log table (`PRD.md:527` to `PRD.md:531`) and the About timeline (`PRD.md:508` to `PRD.md:511`).

## B. Decision seed promotion

A seed becomes a record only when it has context, options, choice, trade-off, theme, evidence and status, and its reason is written (`PRD.md:430`, section 16.2). Status describes the observed code and history, pending owner review.

Minimums (`PRD.md:432`): at least 15 records at launch, at least 3 verified per shipped project, and at least 2 portfolio-wide with status `reversed` or `open`. Site-level decisions never count toward a project 3.

Seed counts: RentIt 8, Space Tourism 5, Guardrail 5, FX Checker 6, Marginalia 8. Guardrail's 5 are deferred with the project (section A item 5) and count toward no minimum; the other 27 stand. Every seed stays `verified: false` until the owner promotes it.

### RentIt (`docs/truth/rentit-decisions.md`)

| Seed | Title | Owner input needed |
| --- | --- | --- |
| 1 | Write listing updates with UPDATE, not upsert | Accepted cost |
| 2 | Drop every UPDATE policy on listings by name, then create one | Accepted cost |
| 3 | Move the profile completion gate from full_name to location | Accepted cost; reconcile with the register form 2 character full_name minimum |
| 4 | Read profiles with maybeSingle, and make every migration idempotent | Accepted cost |
| 5 | Clamp a same day booking to 1 night instead of rejecting it | Reason for clamping over rejecting, and a note that clamping is silent |
| 6 | Let a service worker read VAPID keys and the access token from IndexedDB | Alternatives considered and accepted cost; `open` candidate |
| 7 | Replace the Database Webhooks UI with Postgres triggers and pg_net | Reason is in source; confirm |
| 8 | Two attempts to pin the chat input to the viewport bottom, both reverted | Reason and accepted cost; `reversed` candidate, cannot be written up until the reason exists (`docs/truth/rentit-decisions.md:123`) |

### Space Tourism (`docs/truth/space-tourism-decisions.md`)

| Seed | Title | Owner input needed |
| --- | --- | --- |
| 1 | Import crew assets instead of pointing at source-directory URLs | Accepted cost; output size and render check unverified |
| 2 | Load the four page components through the router lazy API | Reason; source documentation contradicts the current code |
| 3 | Shorten the crew and planet image transitions | Accepted cost |
| 4 | Configure vendor chunks and Terser for the production build | Reason is in source; confirm |
| 5 | Defer crew/planet images but prioritize technology imagery | Reason for the differing priorities |

Do not count the lazy-to-direct routing narrative as a `reversed` record (`docs/truth/space-tourism-decisions.md:67`).

### Guardrail (`docs/truth/guardrail-decisions.md`)

**Deferred with the project** (section A item 5, owner 2026-10-02). These seeds are neither promotable nor needed. They are kept in the file as evidence in case the contract source is ever recovered.

| Seed | Title | Owner input needed |
| --- | --- | --- |
| 1 | Read the guardrail through the wallet, one getter at a time | Reason for the wallet provider over other RPC setups |
| 2 | Retry ambiguous read failures before suggesting an ABI mismatch | Which errors were observed |
| 3 | Retire five-second polling in favor of connection/action refreshes | Reason for dropping all periodic refresh, and whether the gap was accepted; `reversed` candidate (`docs/truth/guardrail-decisions.md:67`) |
| 4 | Check the active chain before marking the wallet connected | Reason is in source; confirm |
| 5 | Align dashboard calls with the replacement ABI | Verification method and migration cost |

### Foreign Exchange Checker (`docs/truth/foreign-exchange-checker-decisions.md`)

| Seed | Title | Owner input needed |
| --- | --- | --- |
| 1 | Move converter state to Redux without moving favorites and logs | Reason for Redux for currency but not saved data |
| 2 | Cancel converter requests through the dispatched thunk | Reason |
| 3 | Persist saved pairs and manual conversion snapshots in the browser | Actual alternatives and reason |
| 4 | Anchor each desktop picker to its currency button | Reason is in source; confirm |
| 5 | Format received amounts separately from editable input | Reason for the two-decimal policy |
| 6 | Load a saved pair back into the converter and its History view | Reason for also selecting History |

The removals in `a88b805` and `3a73025` need owner testimony before becoming `reversed` records (`docs/truth/foreign-exchange-checker-decisions.md:79`).

### Marginalia (`docs/truth/marginalia-decisions.md`)

| Seed | Title | Owner input needed |
| --- | --- | --- |
| 1 | Close the token in the citation protocol, not in the model | Reason is in source; confirm |
| 2 | Enable RLS on the one table that had none | Accepted cost |
| 3 | Retry a failed answer on a second provider, but never re-run the research | Whether the gap was weighed against cost or overlooked |
| 4 | Swap pdf-parse for unpdf for serverless compatibility | Whether extraction fidelity was measured or only observed |
| 5 | Fail a web-only question rather than answer it with nothing | Accepted cost |
| 6 | Stop suppressing secondary passages once the primary covers every concept | Exact failure and accepted cost |
| 7 | Make the README security claims true instead of narrowing them | Reason is in source; confirm |
| 8 | Restrict the app to existing users: reject unknown OAuth identities | Accepted cost; `reversed` with a stated reason, which can meet the portfolio-wide minimum on its own (`docs/truth/marginalia-decisions.md:125`) |

An `open` candidate exists here if a second record is needed: the Tavily free tier cap of 1,000 credits per month (`docs/truth/marginalia-decisions.md:129`).

### What every seed still needs before promotion

Every seed already carries a choice, an alternative visible in the diff, a theme, a status and evidence. None carries the whole anatomy `PRD.md:430` requires. Two gaps are near universal:

- **Options.** The seed files record "the alternative visible in the diff", which is usually just what the code did before. That is evidence a change happened, not proof the owner weighed the prior behaviour as an option. Section 16.2 asks for options, so each record needs the owner to say whether that alternative was actually considered.
- **Reason and accepted cost.** Where a commit message or a code comment states a rationale the seed file says so and quotes it. Where it does not, the seed reads `reason: owner to supply`, and a record cannot be promoted while that is unresolved.

A record also has to fit the 120-word visible note (`docs/truth/rentit-decisions.md:7`), and only the owner sets `verified: true` (`AGENTS.md`). Nothing in this file can be promoted from this file.

| Readiness | Seeds |
| --- | --- |
| Reason stated in source; needs owner confirmation, the options question answered, and the accepted cost | RentIt 1, 2, 7 (`docs/truth/rentit-decisions.md:16`, `:30`, `:100`); Space Tourism 1 (`docs/truth/space-tourism-decisions.md:12`); FX Checker 4 (`docs/truth/foreign-exchange-checker-decisions.md:48`); Marginalia 1, 2, 4, 5, 7, 8 (`docs/truth/marginalia-decisions.md:18`, `:32`, `:60`, `:74`, `:102`, `:116`) |
| Reason partly stated; needs the gap filled and the accepted cost | RentIt 3 (`docs/truth/rentit-decisions.md:44`); Space Tourism 3, 4, 5 (`docs/truth/space-tourism-decisions.md:36`, `:48`, `:60`); Marginalia 3, 6 (`docs/truth/marginalia-decisions.md:47`, `:88`) |
| No reason in source; owner must supply it outright | RentIt 5, 6, 8 (`docs/truth/rentit-decisions.md:72`, `:85`, `:114`); Space Tourism 2 (`docs/truth/space-tourism-decisions.md:24`); FX Checker 1, 2, 3, 5, 6 (`docs/truth/foreign-exchange-checker-decisions.md:12`, `:24`, `:36`, `:60`, `:72`) |
| Fact check settled; seed needs rewriting | RentIt 4 (`docs/truth/rentit-decisions.md:58`). `CREATE POLICY IF NOT EXISTS` is not valid PostgreSQL, so the seed's idempotency half must be dropped as a defect and only the `maybeSingle` half can carry a record. The fact, not the seed, is resolved. See open uncertainty 7 in `docs/truth/rentit.md` |
| Deferred with the project | Guardrail 1 to 5 (`docs/truth/guardrail-decisions.md:7` to `:65`). The project is deferred (item 5), so these are neither blocked nor promotable. They stay in the file as evidence in case the source is ever recovered |

### Count check against `PRD.md:432`

| Minimum | Standing |
| --- | --- |
| 15 records at launch | Available but not met. 27 seeds exist across the four shipped projects (RentIt 8, Space Tourism 5, FX Checker 6, Marginalia 8); Guardrail's 5 are deferred with it and count toward nothing. Deferring a project does not relax the 15 (`PRD.md:1278`). None is a record yet. The four projects supply 12 at the 3-per-project minimum, and the remaining 3 can come from site-level decisions, which count toward the 15 and never toward a project's 3 (`PRD.md:432`); the confidentiality boundary in item 2 is one such candidate. |
| 3 verified per shipped project | Not met. With Guardrail deferred, four projects ship, so this is 12 records at minimum, and it depends entirely on the owner promoting them, which depends on the reasons above. |
| 2 portfolio-wide with status `reversed` or `open` | Not met, and this is the thinnest point in Phase 1. Marginalia seed 8 is `reversed` with a fully stated reason (`docs/truth/marginalia-decisions.md:116`), which is one of the two. Every other candidate is incomplete: RentIt seed 8 is `reversed` but its reverts carry no explanation at all (`docs/truth/rentit-decisions.md:114`); RentIt seed 6 is an `open` candidate with no reason and no alternative in the diff (`docs/truth/rentit-decisions.md:85`); and Marginalia's Tavily cap is honestly `open` but thin (`docs/truth/marginalia-decisions.md:129`). A second complete record has to come from one of these, and the cheapest route is the owner supplying the reason for RentIt seed 8, since both its reverts are already identified by commit. This requirement got harder with the deferral, not easier: Guardrail seed 3 was a third candidate and it left with the project (`docs/truth/guardrail-decisions.md:38`), so the two must come from the remaining four projects. |

Specificity review: run, and recorded in `docs/seed-specificity-review.md`. All 32 seeds were tested against the rule at `PRD.md:434`, which asks whether a seed could describe almost any developer project. 23 are specific as recorded, 7 are specific only if the record carries the repository detail the review names, and 2 cannot pass without the owner. Nothing is cut on specificity grounds, so this changes no counts by itself. One consequence does bear on the table above: Space Tourism has only 1 of its 5 seeds specific as recorded, so its 3-per-project minimum is the tightest in the portfolio and depends on seeds 1, 4 and 5 each being written with their specific detail rather than their topic.

Draft record text is in `docs/seed-promotion-drafts.md`: eleven records written to the full `PRD.md:430` anatomy, plus RentIt seed 4 marked blocked pending the fact check above. Every cost the owner confirmed on 2026-10-02 is folded in. Nothing there is approved, verified or promotable yet, and the third-option confirmation is still outstanding for all eleven. That file also names the three remaining open items.

## C. Other Phase 1 deliverables

- [x] PRD v1.1 approved as the working spec (`PRD.md:1` to `PRD.md:7`). Approved by the owner, 2026-10-03.
- [x] Voice sample approved or replaced (`PRD.md:1243`), within the banned-phrase list (`PRD.md:1241`). Approved as written (owner, 2026-10-03); the audit in `docs/prd-amendments.md` finds it clean.
- [x] Truth sheets read and accepted as accurate by the owner for the five projects. Accepted (owner, 2026-10-03).
- [x] Confirmation that figures, assets and approved copy are deferred to each project build phase (section 38), which is a project page gate, not a Phase 1 gate. Confirmed (owner, 2026-10-03). The truth sheets flag these as still open (`docs/truth/guardrail.md:95`, `docs/truth/foreign-exchange-checker.md:102`, `docs/truth/space-tourism.md:99`).

## D. Phase 1 exit criteria

From the Phase 1 definition of done (`PRD.md:1327`):

- [x] Every `[CONFIRM]` has an owner decision or a written deferral (section A). Resolved 2026-10-03; 26 markers removed and their dispositions recorded in `docs/prd-amendments.md` group H.
- [x] Every seed names its evidence (already done in the seed files).
- [x] Seeds reviewed for specificity. The review was performed on 2026-10-02 against `PRD.md:434` and is recorded in `docs/seed-specificity-review.md`; the owner confirms the verdicts (2026-10-03).
- [x] Approved PRD v1.1 and voice sample recorded (owner, 2026-10-03).

A to D are complete as of 2026-10-03, so Phase 1 closes and Phase 2, the design system, can start (`PRD.md:1328`).
