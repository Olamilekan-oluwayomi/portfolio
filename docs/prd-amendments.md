# PRD amendments from Phase 1 decisions

Appendix B rule 10 requires two things whenever the PRD and reality disagree: a recorded decision, and a PRD adjustment (`PRD.md:1507`). Phase 1 has produced the decisions. This file holds the adjustments as exact before-and-after text so they can be reviewed in one pass and applied.

**Applied to `PRD.md` on 2026-10-02** for groups A, B, C, D, E and G, and on 2026-10-03 for group H, on the owner's instruction. Amendment F was withdrawn on 2026-10-03: the site source repository is public (verified by an unauthenticated fetch returning HTTP 200), so the conflict F existed to resolve is gone.

Every replacement swapped one line for one line, so no line number in `PRD.md` moved and every existing citation to `PRD.md` remains valid. What follows is now the record of what changed and why. Wording that was marked as a proposal was applied as such and remains open to owner editing: the decisions are settled, the phrasing is not.

Amendment G was added on 2026-10-02, when the owner deferred Guardrail. Amendment E was revised the same day, when the owner approved publishing the employer name, and that revision also closed Amendment A's 2026 cell. Amendment H was added on 2026-10-03 to record the marker resolution sweep that closed the last of Phase 1's `[CONFIRM]` criterion. Amendment I was added on 2026-10-06, when the owner approved the interactive brief recorded below.

## Summary

| # | Amendment | PRD sites | Decision it implements | State |
| --- | --- | --- | --- | --- |
| A | About timeline, the 2025 row | `PRD.md:510`, `PRD.md:511` | `docs/phase-1-exit.md:74`, `:158` (items 4 and 14) | Applied; the 2025 row reads "In service. Kept building." as approved, and the 2026 cell is resolved by E |
| B | RentIt example project year | `PRD.md:1165` | `docs/phase-1-exit.md:74` (item 4) | Applied |
| C | Space Tourism, the accessible-tabs claim | `PRD.md:454`, `PRD.md:459` | `docs/phase-1-exit.md:89`, `:91` (item 5) | Applied |
| D | FX Checker, the stale and offline states | `PRD.md:479`, `PRD.md:1300` | `docs/phase-1-exit.md:87`, `:91` (item 5) | Applied |
| E | Employer name published, product name withheld | `PRD.md:384`, `:511`, `:527`, `:1268`, `:1415`, `:1151` (no change at `:73`, `:1441`) | `docs/phase-1-exit.md:53` (item 2, revised and closed) | Applied; `currentWork` stays empty |
| F | Site source repository and its affordances | `PRD.md:1456`, `:387`, `:128`, `:572` | `docs/phase-1-exit.md:119`, `:121` (item 7) | Withdrawn 2026-10-03: the repository is public, so no adjustment is owed |
| G | The Guardrail deferral across eleven sites | `PRD.md:31`, `:283`, `:310`, `:311`, `:386`, `:461`, `:463` to `:472`, `:661`, `:908`, `:1023`, `:1299`, `:1311` | `docs/phase-1-exit.md:85` (item 5) | Applied |
| H | Marker resolution sweep, 26 markers | 26 sites, listed in section H | `docs/phase-1-exit.md` sections A and D | Applied |
| I | Decision Mode, hero anchors, homepage previews and microinteraction decisions | `PRD.md:333`, `:351`, `:372`, `:378`, new Appendix C; `docs/homepage-direction.md` two table rows and a new checkpoint | Owner brief approved in conversation, 2026-10-06, recorded in section I | Applied 2026-10-06; the PRD grew by append only |

Two citation corrections to `docs/phase-1-exit.md` are also owed, because the worksheet points at the wrong lines for two of these. They are listed at the end.

## A. About timeline, the 2025 and 2026 rows

**Decision.** The 2025 row is not blank, does not read "Learning Phase", and is anchored to two facts already in the Log: NYSC, Ministry of Establishment and Training, Oyo State, 2025 to 2026 (`PRD.md:529`), and Field Supervisor at Blueskills from October 2025 (`PRD.md:528`). RentIt and Marginalia are 2026 projects, not 2025, so the row's artifact list cannot stand (`docs/phase-1-exit.md:74`, `:158`).

**Why the artifact list cannot survive.** `Shore Guesthouse` appears exactly once in this repository, at `PRD.md:510`. There is no truth sheet, no source repository, no inspected commit and no evidence for it anywhere. Under `AGENTS.md:4` it cannot hold a year it has no evidence for. The three state-management starters are Lab items regardless (`PRD.md:546`), and Lab keeps its own list.

**Site `PRD.md:510`, before:**

```text
| 2025 | Kept building. | RentIt, Marginalia, Shore Guesthouse, three state-management starters `[CONFIRM list]` |
```

**After (proposal):**

```text
| 2025 | In service. Kept building. | None. The row is anchored to the NYSC placement and the Blueskills role, and neither has a verified artifact link |
```

Two parts of that line are drafts, not decisions. The row text "In service. Kept building." is the worksheet's own working draft (`docs/phase-1-exit.md:158`) and is pending owner approval. The artifact cell is my proposal: neither Log entry has a confirmed link (`PRD.md:528` carries `[CONFIRM link]`, `PRD.md:529` carries None), and the Branch Watch relationship that might supply one is unstated (`docs/phase-1-exit.md:147`).

**Site `PRD.md:511`, before:**

```text
| 2026 | Building professionally. | PitchMatter, DealBridge CRM `[CONFIRM public wording]` |
```

Resolved by Amendment E, not here. The row needed a decision because two open questions met in it: whether the NDA permits naming the employer, and what the artifact should be. The owner approved the employer name on 2026-10-02, so the artifact cell becomes `PitchMatter` and the product name drops. Amendment E carries the exact before-and-after. The alternatives this section previously listed (the five projects, employer and role only, both, or a bare `PitchMatter [CONFIRM]`) are superseded; the chosen value is the employer name alone.

No change to `PRD.md:1126`. The `TimelineYear` union still includes 2025, because the 2025 row still exists.

## B. RentIt example project year

**Decision.** All five projects carry `year: 2026`, matching every inspected HEAD date (`docs/phase-1-exit.md:74`).

The block at `PRD.md:1157` is labelled "Example entry (RentIt, illustrative, every field to be verified)", so this is consistency rather than a truth claim. It is still worth fixing: an example that contradicts a settled decision teaches the wrong value, and this block is the one every project file gets copied from.

**Site `PRD.md:1165`, before:**

```ts
  year: 2025, // [CONFIRM]
```

**After:**

```ts
  year: 2026, // [CONFIRM]
```

No other `year: 2025` exists in the PRD. The `2025` occurrences at `PRD.md:510`, `PRD.md:528` and `PRD.md:529` are About and Log dates, not project years, and `PRD.md:594` and `PRD.md:1126` are a metadata example and a type union.

## C. Space Tourism, the accessible-tabs claim

**Decision.** The PRD must not claim "accessible tabs". No tablist, tab or tabpanel semantics, no exposed selected state and no arrow-key handler exists in the components (`docs/truth/space-tourism.md:77` to `:79`, `:84`; `docs/phase-1-exit.md:89`).

Three PRD sites carry the claim or its condition. Two need editing. The third, `PRD.md:1310`, already reads "'Art direction' and 'accessible tabs' only if the markup does it", which is exactly the condition the evidence now answers, so it stands unchanged.

**Site `PRD.md:454`, before:**

```text
- **Purpose:** Demonstrate layout craft, art direction across breakpoints and accessible tabbed interfaces.
```

**After:**

```text
- **Purpose:** Demonstrate layout craft and art direction across breakpoints.
```

**Site `PRD.md:459`, before:**

```text
- **Technical story:** Component and layout strategy, tabs with correct ARIA roles and keyboard support, `<picture>` art direction, data-driven content, route-level code splitting (one line, no scores).
```

**After (proposal):**

```text
- **Technical story:** Component and layout strategy, `<picture>` art direction, data-driven content, route-level code splitting (one line, no scores), and the selection controls as built: named native buttons on Destination, labelled dot buttons on Crew, numbered buttons exposing `aria-pressed` on Technology, with no ARIA tabs pattern.
```

The replacement describes what the source holds (`docs/truth/space-tourism.md:77` to `:79`). It removes a capability claim and records the real markup instead, which is also the more specific decision material.

## D. FX Checker, the stale and offline states

**Decision.** The app has no stale-rate indicator and no offline mode. The PRD's "Stale rate" and "Offline" tabs describe states the app does not have, so they must be dropped or labelled as recreated (`docs/truth/foreign-exchange-checker.md:66`, `:90`; `docs/phase-1-exit.md:87`).

**Site `PRD.md:479`, before:**

```text
- **Interaction model:** Tabs for Loading, Result, Stale rate, Error and Offline. Each renders the real state (recreated or screenshot) with annotations. A hand-built SVG sparkline (no chart library) plots the snapshot.
```

**After (proposal):**

```text
- **Interaction model:** Tabs for the states the app has: Result and missing result, History loading, History empty or failed, Search no results, Empty favorites and log, and Missing comparison amount. Each renders the real state (recreated or screenshot) with annotations, and any recreation is labelled as one. A hand-built SVG sparkline (no chart library) plots the snapshot.
```

That list is the evidenced state inventory (`docs/truth/foreign-exchange-checker.md:79` to `:88`). The ticker and stat failure row is deliberately excluded: it exists only as console logging and silent placeholders, not as a visible state (`docs/truth/foreign-exchange-checker.md:88`).

**Site `PRD.md:1300`, before:**

```text
| Foreign Exchange Checker | Snapshot dataset, five state screenshots or recreations | Loading, result, stale, error, offline |
```

**After:**

```text
| Foreign Exchange Checker | Snapshot dataset, state screenshots or recreations | Result and missing result, history loading, history empty or failed, search no results, empty favorites and log, missing comparison amount |
```

Two notes. The word "five" goes, because the count is now whatever the states are. And `PRD.md:1312` needs no edit: it already says "A state the app lacks is dropped from the gallery, never invented", which is the rule this amendment obeys.

## E. Employer and current work

**Decision (owner, 2026-10-02, revised).** The PitchMatter employer name may be published. The product name and any description of the work remain unpublished: the NDA note covers the product, and the owner's approval named the employer only. So `employer` is set to `PitchMatter`, `currentWork` stays empty, and no page, tag or structured data names the product or describes the work (`PRD.md:1151`).

This supersedes the earlier deferral recorded at `docs/phase-1-exit.md:53`, and it means G1 no longer needs adjusting: the employer line it requires can now exist (`PRD.md:73`).

Five sites need an edit. Each is listed with its exact text.

**Site `PRD.md:73`, the G1 goal table. No change.** An earlier draft of this file removed `employer` from G1. With the name approved, the line stands as written: on `/`, "name, role, employer, stack line and a contact link are visible with zero interaction". The employer is `PitchMatter`.

**Site `PRD.md:1441`, the same goal restated in section 43. No change.** "role, stack, employer (approved wording) and a contact route" is now satisfiable, because the approved wording is the employer name.

**Site `PRD.md:384`, the homepage meta line.**

Before:

```text
- **Meta line (mono):** `siteIdentity.stackLine` (draft: `React · Next.js · TypeScript · Supabase`), then on a second line the current-work line built from `employer` and `currentWork` (draft: `Currently at PitchMatter, building DealBridge CRM`) `[CONFIRM public wording]`.
```

After:

```text
- **Meta line (mono):** `siteIdentity.stackLine` (draft: `React · Next.js · TypeScript · Supabase`), then on a second line the employer line built from `employer` (draft: `Currently at PitchMatter`).
```

The employer half survives and the product half is dropped. `currentWork` stays empty (`PRD.md:1151`), and the `[CONFIRM public wording]` marker drops because the wording is now approved.

**Site `PRD.md:511`, the About timeline 2026 row.**

Before:

```text
| 2026 | Building professionally. | PitchMatter, DealBridge CRM `[CONFIRM public wording]` |
```

After (proposal):

```text
| 2026 | Building professionally. | PitchMatter |
```

Only the artifact cell changes. The line text "Building professionally." is draft copy the owner edits for truth (`PRD.md:506`), and the marker drops because the employer name is approved. This is also the 2026 cell Amendment A was waiting on, so that open item closes here rather than in A.

**Site `PRD.md:527`, the Log row.**

Before:

```text
| Frontend Developer Intern, PitchMatter (UAE-based, remote) | August 2026 to present | Frontend work on the DealBridge CRM product `[CONFIRM what can be public]` | Linked decisions or none if covered by confidentiality |
```

After:

```text
| Frontend Developer Intern, PitchMatter (UAE-based, remote) | August 2026 to present | Company, role and dates only. No product and no description of the work | None |
```

Item 3 already settles the wording: "the PitchMatter row names the company, role and dates only, with no product and no description of the work" (`docs/phase-1-exit.md:59`). The condition that blocked it is now resolved, because the row names the employer, which the owner permits (`docs/phase-1-exit.md:53`). The entry can be `public: true` (`PRD.md:1123`): company, role and dates are publishable and the description cell carries no product.

**Site `PRD.md:1268`, the Brief spec.**

Before:

```text
2. Current work from `siteIdentity` (draft: PitchMatter, DealBridge CRM, August 2026 to present) `[CONFIRM wording]`.
```

After:

```text
2. Employer from `siteIdentity` (draft: PitchMatter, August 2026 to present). No product name and no description of the work.
```

**Site `PRD.md:1415`, the launch checklist.**

Before:

```text
- [ ] No proprietary PitchMatter material. Employer wording approved.
```

After (proposal):

```text
- [ ] No proprietary PitchMatter material. Employer name approved; no product name and no work description is published.
```

The original line became checkable once the employer name was approved. The replacement makes the boundary explicit so the product stays out.

**Site `PRD.md:1432`, the risks table. No change.** The mitigation already reads "`public: false` default on entries". The PitchMatter Log entry is the one exception the owner has now approved, and `PRD.md:1123` and `PRD.md:1124` define that flag without needing an edit.

**Site `PRD.md:1473`, Future Enhancements. Not drafted.** It lists "PitchMatter work (pattern level, with approval), DealBridge CRM case study, Branch Watch tracker story". The employer name is approved but the product is not, so "with approval" covers only the employer half and the DealBridge CRM case study is still unreachable. This is a post-launch wish list, and leaving it unchanged satisfies the deferred-fact rule (`docs/phase-1-exit.md:7`). Flagged so it is not forgotten.

**The question in this item is closed (owner, 2026-10-03).** No product name and no description of the work is published, at any level of generality. The owner approved the employer name and did not permit the product, so `currentWork` stays empty and the boundary stands as the default rather than as an open question. `PRD.md:1151` was rewritten by group H to state it directly.

## F. Site source repository and its affordances (withdrawn)

**Withdrawn on 2026-10-03. No adjustment is owed.** Section 43 item 16 requires the site repository to be public (`PRD.md:1456`), and it now is. An unauthenticated fetch of both `https://github.com/Olamilekan-oluwayomi/portfolio` and `https://api.github.com/repos/Olamilekan-oluwayomi/portfolio` returns HTTP 200, and the same check returns 200 for RentIt, Guardrail and Marginalia, which are known public, so the method distinguishes public from private rather than returning 200 for anything (`docs/phase-1-exit.md:121`).

The three sites that assume a source link now work as written, so none of them needs editing: the footer colophon "Source on GitHub" (`PRD.md:387`), the user need for a site source link (`PRD.md:128`), and the console greeting that links to the source repository (`PRD.md:572`). The only edit this amendment ever required was removing the `[CONFIRM]` marker at `PRD.md:1456`, which group H did.

Two related sites look like conflicts but are not, and were not edited: the footer's personal GitHub profile link is a separate affordance and stays (`PRD.md:355`), and `PRD.md:1313` already allows Marginalia's repository "or a written reason it is private", which the now-public repository makes unnecessary but not wrong.

## G. The Guardrail deferral

**Decision.** Guardrail is deferred, not published dashboard-only (owner, 2026-10-02; `docs/phase-1-exit.md:85`). The contract source is unrecoverable: the address the dashboard hardcodes is a deployed contract, but it is not verified, so no source is published on chain and the explorer cannot recover it (`docs/truth/guardrail.md:61`). Section 38 then applies directly, "A project is deferred, not padded, if it cannot meet the requirements below without invented features" (`PRD.md:1278`), and section 43 item 3 requires section 38 of published projects only (`PRD.md:1443`).

**Three rules the deferral does not change.** The count already derives from published content and the R2 line already reads "after all five (or all that pass section 38)" (`PRD.md:1278`, `PRD.md:1321`), so this amendment is a consistency pass, not a change of policy. The 15-record total is explicitly not relaxed by a deferral (`PRD.md:1278`). And Guardrail leaves public copy entirely (owner, 2026-10-02), so its live URL and its repository appear in no page, list or structured data (`PRD.md:1479`).

**Site `PRD.md:31`, before:**

```text
Five projects (RentIt, Space Tourism, Guardrail, Foreign Exchange Checker, Marginalia; five is a target, not a quota, see section 38) each get a bespoke interactive experience on top of a consistent case-study spine, so a visitor can compare judgment across very different products.
```

**After (proposal):**

```text
Five projects (RentIt, Space Tourism, Guardrail, Foreign Exchange Checker, Marginalia; five is a target, not a quota, see section 38) each get a bespoke interactive experience on top of a consistent case-study spine, so a visitor can compare judgment across very different products. Five remains the target; four ship in v1, because Guardrail is deferred under section 38.
```

The target language is kept and section 38 keeps ownership of the count, rather than rewriting the target from five to four. State the number directly instead if the owner prefers.

**Site `PRD.md:283`, before:**

```text
A simulation is honest only when it is labeled and its output comes from real rules (Guardrail, the FX snapshot).
```

**After:**

```text
A simulation is honest only when it is labeled and its output comes from real rules (the FX snapshot).
```

The rule keeps its force and one surviving example. Guardrail was the other referent, and it is deferred.

**Site `PRD.md:310` to `PRD.md:311`, before:**

```text
/work                  Contents page, all projects with status and stack
/work/[slug]           Project experience (five is the target)
```

**After:**

```text
/work                  Contents page, all projects with status and stack
/work/[slug]           Project experience (four in v1; Guardrail is deferred under section 38)
```

**Site `PRD.md:386`, before:**

```text
- **Contents list:** one row per project (five is the target), styled as a book's table of contents with a leader line, title, year and a short stack tag.
```

**After:**

```text
- **Contents list:** one row per project (five is the target; four ship in v1, with Guardrail deferred under section 38), styled as a book's table of contents with a leader line, title, year and a short stack tag.
```

This is the homepage surface, so a four-row list must not read as a five-row list that is missing a row.

**Site `PRD.md:461`, before:**

```text
- **Exit:** "Open live ↗", "Source", "Next: Guardrail".
```

**After (proposal):**

```text
- **Exit:** "Open live ↗", "Source", "Next: Foreign Exchange Checker".
```

Forced, because a "Next" link cannot point at a project that has no page. The PRD's own order is RentIt, Space Tourism, Guardrail, FX Checker, Marginalia (`PRD.md:461`, `PRD.md:472`, `PRD.md:483`, `PRD.md:494`), so removing Guardrail makes FX Checker the next shipping project and the loop still closes through Marginalia back to RentIt. The owner can reorder freely; the target value is not a judgment call, the order is.

**Site `PRD.md:463`, the Guardrail experience heading. Applied as an edit to that one line.** The drafted form inserted a separate deferral paragraph, which would have added two lines to `PRD.md` and shifted every line number below it. Because this whole pass exists to keep citations valid, the deferral was folded into the heading instead, and the file stayed at 1507 lines:

```text
#### Guardrail: "Try a transaction (simulated)" (deferred, owner 2026-10-02: the contract source is unrecoverable, so no enforcement rule can be evidenced; nothing below ships and this section is retained as a record of the intended piece)
```

The bullets at `PRD.md:465` to `PRD.md:472` are unchanged. They describe a piece that is not being built, and `PRD.md:472`'s own "Next: Foreign Exchange Checker" already survives the deferral.

**Site `PRD.md:661`, before:**

```text
**Semantic color:** PASS and BLOCKED chips in the Guardrail simulation use text labels as well as color, never color alone.
```

**After (applied):**

```text
**Semantic color:** status chips use text labels as well as color, never color alone. The Guardrail simulation that first carried this rule is deferred (section 16.3), so the rule applies to any status chip the site ships.
```

The rule is general accessibility, not a Guardrail rule. Only its referent is removed. The applied line cites section 16.3 rather than the heading line, because `PRD.md:463` is a heading whose number a later edit could move, while 16.3 is the section that owns the rule.

**Site `PRD.md:908`, before:**

```text
No wallet or sign-in flows inside embeds. The Guardrail piece is a local simulation and never requests a wallet connection or signs anything.
```

**After:**

```text
No wallet or sign-in flows inside embeds.
```

The deleted sentence described the deferred piece and restated the prohibition the sentence before it already gives.

**Site `PRD.md:1023`, before:**

```text
experiences/  rentit/, space-tourism/, guardrail/, fx-checker/, marginalia/
```

**After:**

```text
experiences/  rentit/, space-tourism/, fx-checker/, marginalia/
```

**Site `PRD.md:1299`, the asset table, before:**

```text
| Guardrail | Three scenarios with deterministic rule outputs | Dashboard, rule configuration, an error state `[CONFIRM]` |
```

**After:**

```text
| Guardrail (deferred, section 38) | Not built | Not captured |
```

**Site `PRD.md:1311`, the evidence table, before:**

```text
| Guardrail | The contract source or repository, the deployment or testnet, what the contract really enforces, the real revert reasons and error states | "Trustworthy UI around irreversible actions" only for rules and failure states that exist. Simulation outputs derive from those rules. The JSON-RPC batching problem needs a commit or issue behind it |
```

**After:**

```text
| Guardrail (deferred, section 38) | Deferred. The contract source is unrecoverable, so the evidence this row requires cannot exist (`docs/truth/guardrail.md:61`) | No interpretation is published |
```

**Sites that need no edit.** `PRD.md:1321` already reads "R2 after all five (or all that pass section 38)", which is the clause that makes a four-project R2 legitimate. `PRD.md:1278` already says the count derives from published content and that a deferral does not relax the 15-record total. `PRD.md:1445` requires "at least 3 per shipped project", which excludes Guardrail automatically. `PRD.md:1212` lists repository names as an internal record rather than public copy, and it stays accurate. Appendix A items 4 to 7 at `PRD.md:1484` to `PRD.md:1487` name Guardrail among the projects, and the written deferral in the worksheet resolves them under section 39 (`PRD.md:1327`), so the Appendix needs no edit.

**Related, forced by item 7 and not by the deferral.** `PRD.md:494` carries `[CONFIRM repo visibility]` on Marginalia's Source link. Item 7 resolved every project repository as public (`docs/phase-1-exit.md:117`), so that marker can be dropped. Noted here so it is not forgotten; it is not part of the deferral.

## H. Marker resolution sweep

Applied 2026-10-03 to close the one live Phase 1 exit criterion: every `[CONFIRM]` has an owner decision or a written deferral (`PRD.md:1327`). Each row removes marker text from a single line, so `PRD.md` is unchanged in length and every citation still resolves. The disposition column names where the decision is recorded.

| PRD site | Marker | Disposition |
| --- | --- | --- |
| `PRD.md:443` | `[CONFIRM origin and scope]` | RentIt origin and scope, `docs/phase-1-exit.md:78` (item 4) |
| `PRD.md:447` | `[CONFIRM]` | RentIt RLS policies, `docs/phase-1-exit.md:90` (item 5) |
| `PRD.md:448` | `[CONFIRM against real rules]` | RentIt access rules, `docs/phase-1-exit.md:90` (item 5) |
| `PRD.md:450` | `[CONFIRM]` | RentIt booking statuses, `docs/phase-1-exit.md:90` (item 5) |
| `PRD.md:455` | `[CONFIRM sections]` | Space Tourism sections, `docs/phase-1-exit.md:91` (item 5) |
| `PRD.md:477` | `[CONFIRM data source and features]` | FX Checker data source, `docs/phase-1-exit.md:88` (item 5) |
| `PRD.md:481` | `[CONFIRM against repo]` | FX Checker features, `docs/phase-1-exit.md:88` (item 5) |
| `PRD.md:492` | `[CONFIRM]` | Marginalia AI integration, `docs/phase-1-exit.md:92` (item 5) |
| `PRD.md:494` | `[CONFIRM repo visibility]` | Marginalia repository public, `docs/phase-1-exit.md:119` (item 7) |
| `PRD.md:508` | `[CONFIRM]` | About 2023 gap confirmed, `docs/phase-1-exit.md:161` (item 14) |
| `PRD.md:509` | `[CONFIRM]` | About 2024 artifact deferred; the cell now publishes no artifact, `docs/phase-1-exit.md:161` (item 14) |
| `PRD.md:528` | `[CONFIRM link]` | Log link deferred; the cell names the project and publishes no link, `docs/phase-1-exit.md:149` (item 12) |
| `PRD.md:533` | `[CONFIRM]` | Log facts confirmed against the CV, `docs/phase-1-exit.md:59` (item 3) |
| `PRD.md:546` | `[CONFIRM inclusion]` | Lab list confirmed, `docs/phase-1-exit.md:149` (item 12) |
| `PRD.md:560` | `[CONFIRM preferred public address]` | Public email decided, `docs/phase-1-exit.md:138` (item 10) |
| `PRD.md:562` | `[CONFIRM]` | Availability wording decided, `docs/phase-1-exit.md:143` (item 11) |
| `PRD.md:995` | `[CONFIRM]` | Domain deferred, no custom domain, `docs/phase-1-exit.md:154` (item 13) |
| `PRD.md:1098` | `[CONFIRM]` | Project years decided, `docs/phase-1-exit.md:74` (item 4) |
| `PRD.md:1143` | `[CONFIRM]` | Availability wording decided, `docs/phase-1-exit.md:143` (item 11) |
| `PRD.md:1144` | `[CONFIRM]` | Public email decided, `docs/phase-1-exit.md:138` (item 10) |
| `PRD.md:1147` | `[CONFIRM]` | Domain deferred, `docs/phase-1-exit.md:154` (item 13) |
| `PRD.md:1151` | `[CONFIRM]` | Employer name published, product and work withheld, `docs/phase-1-exit.md:53` (item 2) |
| `PRD.md:1163` | `[CONFIRM]` | RentIt tagline evidenced by the profile completion gate, `docs/truth/rentit.md:142` |
| `PRD.md:1165` | `[CONFIRM]` | Project years decided, `docs/phase-1-exit.md:74` (item 4) |
| `PRD.md:1212` | `[CONFIRM]` | Marginalia repository name and visibility, `docs/phase-1-exit.md:119` (item 7) |
| `PRD.md:1456` | `[CONFIRM]` | Site repository public, verified 2026-10-03, `docs/phase-1-exit.md:121` (item 7) |

**Two sites needed more than a marker deletion.** `PRD.md:509` asserted "First project or repository", which no evidence supports, so the assertion was replaced with a statement that no artifact is published. `PRD.md:1151` stated that `employer` and `currentWork` stay empty until wording is approved; approval was granted, so the sentence now states the boundary directly, that `employer` is published as PitchMatter and `currentWork` stays empty.

**Twelve `CONFIRM` occurrences remain, and none is an unresolved fact.** Three are the Guardrail page markers at `PRD.md:466`, `PRD.md:470` and `PRD.md:472`. They are deliberately kept: that section is deferred and ships nothing, the facts it names were never confirmed, and deleting the markers would imply a verification that did not happen. The other nine are the PRD's own prose explaining the convention (`PRD.md:13`, `PRD.md:90`, `PRD.md:438`, `PRD.md:1327`, `PRD.md:1358`, `PRD.md:1360`, `PRD.md:1431`, `PRD.md:1444`, `PRD.md:1479`). Section 43 item 4 bars markers from published content, and none of the twelve is published.

## Voice sample audit

Section C's other open box is the voice sample at `PRD.md:1243`, checked against the banned-phrase list at `PRD.md:1241`. Result: it passes, with one observation and one gap.

| Line | Text | Finding |
| --- | --- | --- |
| `PRD.md:1245` | "I'm a passionate developer who loves building beautiful websites." | Contains "passionate developer", banned at `PRD.md:1241`. It is the negative example and is labelled Weak, so it is doing its job. No change |
| `PRD.md:1246` | "Frontend developer. I keep notes on every decision, including the ones I got wrong." | Clean. No banned phrase, no em dash, active voice, concrete noun, two short sentences. Passes |
| `PRD.md:1247` | "A marketplace where a profile has to be complete before anyone can book. Here is why." | Clean. No banned phrase, no em dash, no performance-score claim. Passes |

The observation: the only banned phrase in the sample appears inside the line that exists to demonstrate what not to write, which is correct usage but means a reader skimming the list finds a hit. Nothing needs changing.

The gap: all three lines are confident statements. None demonstrates the tone for a failure, a limitation or an uncertainty, which is where this list is hardest to obey and where the content gate actually bites. The truth sheets are full of material that would breach the list if written carelessly, including "offline" for a state FX Checker does not have (`docs/truth/foreign-exchange-checker.md:66`). A fourth sample line covering a limitation would test the list rather than restate it. This is a suggestion, not a defect, and it changes nothing about the sample's current status.

## Citation corrections in `docs/phase-1-exit.md` (applied)

Both were wrong line numbers for otherwise correct findings. `AGENTS.md:4` requires every claim to cite a file path. Both are now fixed, and the corrected numbers are recorded here so the change is traceable.

| Worksheet site | Currently says | Should say | Why |
| --- | --- | --- | --- |
| `docs/phase-1-exit.md:75` (item 4) | "adjusting at `PRD.md:510` and `PRD.md:1166`" | `PRD.md:510` and `PRD.md:1165` | `PRD.md:1165` is `year: 2025, // [CONFIRM]`. `PRD.md:1166` is `status: "live"`, which this decision does not touch |
| `docs/phase-1-exit.md:91` (item 5) | "remove the Space Tourism 'accessible tabs' claim (`PRD.md:456`)" | `PRD.md:454` and `PRD.md:459` | The claim is in the Purpose line at `:454` and the technical story at `:459`. `:456` is the entry point and holds no such claim |

Two further worksheet citations are correct as written and were checked while drafting this: `PRD.md:479` for the FX Checker tabs and `PRD.md:510` for the 2025 row. The worksheet's pointer to G1 (`docs/phase-1-exit.md:53`, `:75`) cites `PRD.md:1151`, which is the sentence that says "adjust G1". The criterion itself is at `PRD.md:73` and `PRD.md:1441`, which Amendment E edits.

## What applying these did and did not do

A, B, C, D, E, G and H are applied to `PRD.md` as of 2026-10-03, which satisfies Appendix B rule 10 for the decisions Phase 1 has taken. F is withdrawn. Resolvable `[CONFIRM]` markers fell from 44 to 12, and none of the twelve is an unresolved fact or published content. No em dash was introduced, and the file is still 1507 lines, so every `PRD.md` citation elsewhere in the docs still resolves. Nothing is held back: the three items this section previously listed as open are all closed, the 2025 row wording is approved, the product question is answered by default, and F no longer applies.

Two residual mentions of the product name remain in `PRD.md` and both are deliberate. `PRD.md:1473` sits in Future Enhancements, which is post-launch and not published copy. `PRD.md:1482` is Appendix A item 2, the internal inventory of what may be said publicly, which describes the question rather than publishing an answer.

## I. Decision Mode, hero anchors, homepage previews and microinteraction decisions

**Decision (owner, 2026-10-06).** The owner approved in full an interactive and annotation brief titled "EVERY INTERFACE IS A SET OF DECISIONS" and instructed implementation to begin. The brief arrived in conversation, not as a file, so this section is its record: what it adds, where each approved item lands, what it adjusts, and what in it was rejected against binding rules.

### Where each approved item lands

| Brief item | Landing place | Adjusted sites |
| --- | --- | --- |
| Decision Mode, an on and off annotation layer | Plain chrome beside the annotation layer, which the chrome classification lists as Core (`PRD.md:304`); not a sixth signature moment (`PRD.md:269`, `PRD.md:294`) | New Appendix C; `PRD.md:333`, `PRD.md:351` |
| `D` shortcut for Decision Mode | The section 14 shortcut table and the disableable single-character set | `PRD.md:372`, `PRD.md:378` |
| Hero concept anchors with one contextual example each | The margin-note rules of section 26 (`PRD.md:724` to `PRD.md:727`) | Appendix C; section 26 already carries the behavior |
| Homepage index previews with a static pointer chip | The homepage composition, which `docs/homepage-direction.md` governs (`PRD.md:16`) | `docs/homepage-direction.md`, two table rows and a checkpoint |
| Contact eyebrow "Have something worth building?" | The homepage contact section only; the contact page keeps section 20 (`PRD.md:566` to `PRD.md:572`) | `docs/homepage-direction.md` checkpoint |
| What I rejected, presented editorially | Inside the existing "What I would change" block, which already links to a `reversed` or `open` decision (`PRD.md:433`) | Appendix C; no spine change |
| Static status dot, and a chip inside the preview area instead of a cursor-following label | Section 11.2 and the section 25 avoid list (`PRD.md:288`, `PRD.md:709`) | Appendix C records both |

### What in the brief is rejected

Three proposals in the brief collide with rules the owner has kept binding, so the rules win. A pulsing status dot loops, which section 11.2 forbids (`PRD.md:288`). Scroll-triggered transitions between beats sit on the section 25 avoid list (`PRD.md:709`). Restructuring the case-study page would break the eight-block spine that makes projects comparable (`PRD.md:425` to `PRD.md:434`), and the brief does not need it, because its beats map onto the existing blocks. Appendix B rule 4 keeps motion exactly as section 25 defines it (`PRD.md:1509`). The status dot stays static, no scroll entrance is added, and the spine stands.

**Site `PRD.md:333`, before:**

```text
**Cross-cutting structure:** decisions are the connective tissue. They appear in the homepage margin notes, inside project pages, in About (a computed summary by theme) and in `/decisions`.
```

**After:**

```text
**Cross-cutting structure:** decisions are the connective tissue. They appear in the homepage margin notes, in Decision Mode annotations (Appendix C), inside project pages, in About (a computed summary by theme) and in `/decisions`.
```

**Site `PRD.md:351`, before:**

```text
- Top-right (desktop): Work, About, Experience, Lab, Contact, then an "Inspect" toggle and a palette button labeled `Search ⌘K` (shows `Ctrl K` on Windows and Linux).
```

**After:**

```text
- Top-right (desktop): Work, About, Experience, Lab, Contact, then "Inspect" and "Decisions" toggles and a palette button labeled `Search ⌘K` (shows `Ctrl K` on Windows and Linux).
```

**Site `PRD.md:372`, before:**

```text
| `i` | Toggle Inspect (only when focus is not in a text field) |
```

**After:**

```text
| `i` or `d` | Toggle Inspect or Decision Mode (only when focus is not in a text field) |
```

**Site `PRD.md:378`, before:**

```text
**Shortcut accessibility rule (WCAG 2.1.4):** all single-character shortcuts (`/`, `i`, `g`-sequences, `[`, `]`, `?`) MUST be disableable from the `?` sheet and from the palette ("Shortcuts: on or off", persisted in `localStorage`). Modifier shortcuts (`⌘K` or `Ctrl K`) remain active.
```

**After:**

```text
**Shortcut accessibility rule (WCAG 2.1.4):** all single-character shortcuts (`/`, `i`, `d`, `g`-sequences, `[`, `]`, `?`) MUST be disableable from the `?` sheet and from the palette ("Shortcuts: on or off", persisted in `localStorage`). Modifier shortcuts (`⌘K` or `Ctrl K`) remain active.
```

**New `PRD.md` Appendix C, appended after `PRD.md:1515`.** Appending at the end of the file moves no line above it, so every existing citation still resolves. The appended block:

```markdown
## Appendix C. Decision Mode and the annotation layer

Added on 2026-10-06 on the owner's approval of the interactive brief recorded in `docs/prd-amendments.md`, section I. It is appended at the end of this file, so no line above it moves, and it is binding under Appendix B rule 10.

### C.1 Control, shortcut and persistence

- Decision Mode is a global annotation-visibility layer. It is plain chrome beside the annotation layer, which the chrome classification lists as Core (`PRD.md:304`), and not a sixth signature moment (`PRD.md:269`, `PRD.md:294`).
- The control is an `aria-pressed` toggle labeled "Decisions": in the persistent frame on desktop, inside the menu on mobile, as a palette command in the View group, and as a row in the `?` sheet.
- The shortcut `d` toggles the mode when focus is not in a text field. It joins the disableable single-character set of section 14, so turning single-character shortcuts off disables `d` while the button, the palette command and the menu row stay available.
- The setting persists in `localStorage` under `annotated-decision-mode` as `on` or `off`, syncs across tabs like `annotated-shortcuts`, and defaults to `off`, so a first visit stays clean.
- The shortcut is shown subtly: the frame control carries its `D` key hint and the `?` sheet lists the row.
- Nothing important depends on the mode (`PRD.md:295`): every note it reveals is either decorative repetition of content that already exists in a case study or a homepage explanation whose subject is visible without the mode.

### C.2 What the mode shows

- A small number of site notes, never one per element. Each note is a short label plus one to three sentences explaining a real decision of this build: why the grid keeps its gap, why the project surfaces carry no card border, why text is the LCP element. Every note is checkable against the code it annotates, and no metric, year, URL or feature is invented (Appendix B rules 2 and 10).
- Hero concept anchors: the four concept words beside the hero statement are focusable anchors. On hover, focus or tap they reveal one contextual example drawn from real project evidence, and one note is open at a time with `Esc` closing it (`PRD.md:724`).
- Every note follows section 26 (`PRD.md:725` to `PRD.md:727`): an `<aside aria-label="Decision note">` immediately after its anchor in reading order, a 1 px leader line on desktop, a numbered marker plus a bottom sheet on touch, and inline disclosure under `@media (hover: none)`.
- Notes fade over 150 ms opacity only. No scroll-triggered entrance, no loop, no pulse (`PRD.md:709`, `PRD.md:288`).

### C.3 Homepage index previews

- The homepage index rows keep their anchors. On fine pointers, hovering or focusing a row swaps the preview in a reserved area, with the first project shown by default, so nothing shifts and layout stays stable.
- Previews use assets already in the repository: the first published media item of each project (`public/images/rentit-browse.svg` and the first capture under `public/figures/` for the other three). No new mockup is created.
- The pointer label is a static chip inside the preview area. No element follows the cursor (`PRD.md:709`) and nothing pulses or loops.
- Preview images lazy-load and stay out of the accessible name, which the row already carries. `alt` is empty and the preview layer is `aria-hidden`.

### C.4 Case studies, contact and status

- What I rejected: records with `reversed` or `open` status are presented editorially inside the existing "What I would change" block, which already links to a reversed or open decision (`PRD.md:433`). No ninth block joins the spine, `kept` records keep their per-record options list, and a project with no reversed or open record shows no such presentation.
- The homepage contact eyebrow may read "Have something worth building?" (owner copy from the brief) while the heading stays "Let's talk." The contact page keeps section 20 unchanged (`PRD.md:566` to `PRD.md:572`).
- The availability status dot stays static, with no pulse (`PRD.md:288`).
- The brief's case-study restructure is rejected: the eight-block spine stands (`PRD.md:425` to `PRD.md:434`).
```

**`docs/homepage-direction.md`, two table rows, before:**

```text
| Interaction | Native index anchors, visible hover/focus feedback, contact underline |
| Motion | Contact underline only, 150ms; zero duration for reduced motion and lite mode |
```

**After:**

```text
| Interaction | Native index anchors with preview swap on hover and focus, hero concept anchors, contact underline |
| Motion | Contact underline, preview swap and note fades, 150 to 240ms; zero duration for reduced motion and lite mode |
```

**`docs/homepage-direction.md`, new checkpoint, appended at the end:**

```markdown
## Decision mode and index previews checkpoint, October 6, 2026

The owner approved an interactive brief on October 6, 2026. The decision record and the new binding Appendix C live in `docs/prd-amendments.md`, section I, and in `PRD.md`. This checkpoint names only the homepage values that change.

The index rows keep their anchors and gain a reserved preview area on fine pointers: the first project shows by default, and hovering or focusing a row swaps the preview over 240 ms. No element follows the cursor; a static chip inside the preview area carries the view label. The four concept words beside the hero statement become focusable anchors that open one section 26 note each, with one note open at a time and `Esc` closing it. Decision Mode reveals a small number of site notes, defaults to off, and is driven by its frame control, the `d` shortcut, a palette command and the `annotated-decision-mode` key, all specified in Appendix C. The contact eyebrow reads "Have something worth building?" while the heading stays "Let's talk." The availability dot stays static. Previews reuse the first published media item of each project (`src/content/projects/*.mdx`), lazy, with empty alt text inside an `aria-hidden` layer.

Reduced motion and lite mode zero the new fades along with the contact underline. Checkpoint validation belongs to the next verification pass: lint, typecheck, tests, production build, budgets, `design/verify.py` and viewport checks (`src/styles/globals.css`, `scripts/check-budgets.mjs`, `design/verify.py`).
```

Applied to `PRD.md` and `docs/homepage-direction.md` on 2026-10-06 on the same instruction. The four `PRD.md` replacements are one line each, and Appendix C is appended after the old end of file, so no existing `PRD.md` citation moves.
