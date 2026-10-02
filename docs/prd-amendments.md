# PRD amendments owed by Phase 1 decisions

Appendix B rule 10 requires two things whenever the PRD and reality disagree: a recorded decision, and a PRD adjustment (`PRD.md:1507`). Phase 1 has produced the decisions. This file holds the adjustments as exact before-and-after text so they can be reviewed in one pass and applied.

Nothing here is applied. `PRD.md` is unchanged. Every amendment below cites the decision that forces it, and every replacement line that is not yet owner-approved is marked as a proposal. No line here may be guessed into the PRD (`docs/phase-1-exit.md:39`).

Amendment F is not drafted, because the decision it depends on is still open. It is recorded at the end rather than invented.

## Summary

| # | Amendment | PRD sites | Decision it implements | State |
| --- | --- | --- | --- | --- |
| A | About timeline, the 2025 and 2026 rows | `PRD.md:510`, `PRD.md:511` | `docs/phase-1-exit.md:74`, `:158` (items 4 and 14) | 2025 row drafted; 2026 artifact cell needs a decision |
| B | RentIt example project year | `PRD.md:1165` | `docs/phase-1-exit.md:74` (item 4) | Drafted |
| C | Space Tourism, the accessible-tabs claim | `PRD.md:454`, `PRD.md:459` | `docs/phase-1-exit.md:89`, `:91` (item 5) | Drafted |
| D | FX Checker, the stale and offline states | `PRD.md:479`, `PRD.md:1300` | `docs/phase-1-exit.md:87`, `:91` (item 5) | Drafted |
| E | Employer and current work across seven sites | `PRD.md:73`, `:384`, `:511`, `:527`, `:1268`, `:1415`, `:1441` | `docs/phase-1-exit.md:53` (item 2) | Drafted, except anything naming the employer |
| F | Site source repository and its affordances | `PRD.md:1456`, `:387`, `:128`, `:572` | `docs/phase-1-exit.md:119`, `:121` (item 7) | Blocked, decision open |

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

This row needs a decision rather than an edit, because two open questions meet in it. Moving RentIt and Marginalia to 2026 makes the 2026 artifact cell the natural home for the five projects, but naming PitchMatter at all depends on whether the NDA permits naming the employer, which item 2 leaves open (`docs/phase-1-exit.md:53`). Options, none chosen:

- The five projects, since all five carry `year: 2026` (item 4).
- The employer and role only, with no product, matching the Log wording item 3 settles (`docs/phase-1-exit.md:59`).
- Both, employer line then projects.
- Leave the row as drafted but drop `DealBridge CRM`, leaving `PitchMatter [CONFIRM]`.

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

**Decision.** The owner reports an NDA covering the PitchMatter employment, so no public wording is sought. `employer` and `currentWork` stay empty, no page, tag or structured data mentions them, and G1 must be adjusted (`docs/phase-1-exit.md:53`; `PRD.md:1151`).

This is the widest amendment: seven sites carry wording that assumes an employer line will exist. Each is listed with its exact text.

**Site `PRD.md:73`, the G1 goal table.**

Before:

```text
| G1 | A visitor identifies role, stack, employer and contact route quickly | On `/`, name, role, employer, stack line and a contact link are visible with zero interaction on a 390x844 and a 1440x900 viewport. `/brief` holds the full fast path within a 1440x900 viewport, no scrolling |
```

After:

```text
| G1 | A visitor identifies role, stack and contact route quickly | On `/`, name, role, stack line and a contact link are visible with zero interaction on a 390x844 and a 1440x900 viewport. `/brief` holds the full fast path within a 1440x900 viewport, no scrolling |
```

**Site `PRD.md:1441`, the same goal restated in section 43.**

Before:

```text
1. **Product.** The recruiter fast path works: role, stack, employer (approved wording) and a contact route are visible on `/` with zero interaction, `/brief` exists and fits a 1440x900 viewport, and contact is two interactions or fewer from anywhere.
```

After:

```text
1. **Product.** The recruiter fast path works: role, stack and a contact route are visible on `/` with zero interaction, `/brief` exists and fits a 1440x900 viewport, and contact is two interactions or fewer from anywhere.
```

**Site `PRD.md:384`, the homepage meta line.**

Before:

```text
- **Meta line (mono):** `siteIdentity.stackLine` (draft: `React · Next.js · TypeScript · Supabase`), then on a second line the current-work line built from `employer` and `currentWork` (draft: `Currently at PitchMatter, building DealBridge CRM`) `[CONFIRM public wording]`.
```

After:

```text
- **Meta line (mono):** `siteIdentity.stackLine` (draft: `React · Next.js · TypeScript · Supabase`).
```

The second line is removed rather than left conditional, because the deferral is a decision not to seek wording, not a pending approval.

**Site `PRD.md:527`, the Log row.**

Before:

```text
| Frontend Developer Intern, PitchMatter (UAE-based, remote) | August 2026 to present | Frontend work on the DealBridge CRM product `[CONFIRM what can be public]` | Linked decisions or none if covered by confidentiality |
```

After (proposal):

```text
| Frontend Developer Intern, PitchMatter (UAE-based, remote) | August 2026 to present | Company, role and dates only. No product and no description of the work | None |
```

Item 3 settles the summary wording: "the PitchMatter row names the company, role and dates only, with no product and no description of the work" (`docs/phase-1-exit.md:59`). That row assumes the NDA permits naming the employer at all, which item 2 leaves open (`docs/phase-1-exit.md:53`), so even this version cannot be applied until that is answered. If the employer cannot be named, the row becomes a role, a date range and a remote location with no organisation.

**Site `PRD.md:1268`, the Brief spec.**

Before:

```text
2. Current work from `siteIdentity` (draft: PitchMatter, DealBridge CRM, August 2026 to present) `[CONFIRM wording]`.
```

After:

```text
2. Current work is not shown. `employer` and `currentWork` stay empty by owner decision (Appendix A item 2).
```

**Site `PRD.md:1415`, the launch checklist.**

Before:

```text
- [ ] No proprietary PitchMatter material. Employer wording approved.
```

After:

```text
- [ ] No proprietary PitchMatter material. No employer wording is published, by owner decision (Appendix A item 2).
```

The old line could never be ticked once wording is refused. The replacement is checkable.

**Site `PRD.md:1432`, the risks table.** No change. The mitigation already reads "`public: false` default on entries", which is the state the deferral produces. `PRD.md:1123` and `PRD.md:1124` define that flag and need no edit.

**Site `PRD.md:1473`, Future Enhancements.** Not drafted. It lists "PitchMatter work (pattern level, with approval), DealBridge CRM case study, Branch Watch tracker story". With wording refused, "with approval" no longer holds, but this is a post-launch wish list and the deferred fact rule (`docs/phase-1-exit.md:7`) is satisfied by leaving the PRD unchanged there. Flagged so it is not forgotten.

## F. Site source repository and its affordances (blocked)

**Not drafted, because the decision is open.** Section 43 item 16 requires the site repository to be public (`PRD.md:1456`). The owner states this repository is private (`docs/phase-1-exit.md:119`, `:121`). Three other sites assume a source link exists: the footer colophon "Source on GitHub" (`PRD.md:387`), the user need for a site source link (`PRD.md:128`), and the console greeting that links to the source repository (`PRD.md:572`).

Item 7 records that what replaces the source affordance, or whether the repository becomes public, "is the one part of item 7 still open" (`docs/phase-1-exit.md:121`). Drafting a replacement now would mean inventing a decision. When the owner settles it, the amendment is mechanical across those four sites.

Two related sites look like conflicts but are not, and should not be edited with this: the footer's personal GitHub profile link is a separate affordance and can stay (`docs/phase-1-exit.md:121`), and `PRD.md:1313` already allows Marginalia's repository "or a written reason it is private", which the now-public repository makes unnecessary but not wrong.

## Voice sample audit

Section C's other open box is the voice sample at `PRD.md:1243`, checked against the banned-phrase list at `PRD.md:1241`. Result: it passes, with one observation and one gap.

| Line | Text | Finding |
| --- | --- | --- |
| `PRD.md:1245` | "I'm a passionate developer who loves building beautiful websites." | Contains "passionate developer", banned at `PRD.md:1241`. It is the negative example and is labelled Weak, so it is doing its job. No change |
| `PRD.md:1246` | "Frontend developer. I keep notes on every decision, including the ones I got wrong." | Clean. No banned phrase, no em dash, active voice, concrete noun, two short sentences. Passes |
| `PRD.md:1247` | "A marketplace where a profile has to be complete before anyone can book. Here is why." | Clean. No banned phrase, no em dash, no performance-score claim. Passes |

The observation: the only banned phrase in the sample appears inside the line that exists to demonstrate what not to write, which is correct usage but means a reader skimming the list finds a hit. Nothing needs changing.

The gap: all three lines are confident statements. None demonstrates the tone for a failure, a limitation or an uncertainty, which is where this list is hardest to obey and where the content gate actually bites. The truth sheets are full of material that would breach the list if written carelessly, including "offline" for a state FX Checker does not have (`docs/truth/foreign-exchange-checker.md:66`). A fourth sample line covering a limitation would test the list rather than restate it. This is a suggestion, not a defect, and it changes nothing about the sample's current status.

## Citation corrections owed to `docs/phase-1-exit.md`

Both are wrong line numbers for otherwise correct findings. `AGENTS.md:4` requires every claim to cite a file path, so they should be fixed.

| Worksheet site | Currently says | Should say | Why |
| --- | --- | --- | --- |
| `docs/phase-1-exit.md:75` (item 4) | "adjusting at `PRD.md:510` and `PRD.md:1166`" | `PRD.md:510` and `PRD.md:1165` | `PRD.md:1165` is `year: 2025, // [CONFIRM]`. `PRD.md:1166` is `status: "live"`, which this decision does not touch |
| `docs/phase-1-exit.md:91` (item 5) | "remove the Space Tourism 'accessible tabs' claim (`PRD.md:456`)" | `PRD.md:454` and `PRD.md:459` | The claim is in the Purpose line at `:454` and the technical story at `:459`. `:456` is the entry point and holds no such claim |

Two further worksheet citations are correct as written and were checked while drafting this: `PRD.md:479` for the FX Checker tabs and `PRD.md:510` for the 2025 row. The worksheet's pointer to G1 (`docs/phase-1-exit.md:53`, `:75`) cites `PRD.md:1151`, which is the sentence that says "adjust G1". The criterion itself is at `PRD.md:73` and `PRD.md:1441`, which Amendment E edits.

## What applying these would and would not do

Applying A to E satisfies Appendix B rule 10 for the decisions Phase 1 has already taken. It does not close Phase 1. Held back:

- Amendment A's 2026 artifact cell, which needs a decision.
- The parts of Amendment E that name the employer, which need the NDA question in item 2 answered.
- Amendment F, which needs the source-affordance decision in item 7.
- Item 5's Guardrail sub-item, left open by the owner on 2026-10-02 (`docs/phase-1-exit.md:161`).
