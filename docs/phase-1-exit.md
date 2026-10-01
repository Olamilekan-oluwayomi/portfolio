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
| PRD v1.1 | Present at `PRD.md`; owner approval to confirm |
| Truth sheets | 5 present in `docs/truth/` |
| Decision seeds | 32 across 5 projects, all `verified: false` |
| Appendix A items resolved or deferred | 0 of 14 |
| Phase 1 exit | Not met |

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

| # | Item | PRD | DECIDE or DEFER (owner) |
| --- | --- | --- | --- |
| 1 | Public role title for `siteIdentity.role` | `PRD.md:1481` | |
| 2 | PitchMatter wording for `employer` and `currentWork`, plus written approval if required | `PRD.md:1482` | |
| 3 | Experience Log facts: titles, dates, Blueskills branch count, checked against the CV | `PRD.md:1483` | |
| 4 | Project years and origins: RentIt, Marginalia, Guardrail, FX Checker, Space Tourism | `PRD.md:1484` | |
| 5 | Feature truth: Guardrail rules, FX Checker source and states, RentIt booking statuses and access rules, Space Tourism sections, Marginalia AI integration | `PRD.md:1485` | |
| 6 | Live URL for each project (none drafted for Guardrail or FX Checker) | `PRD.md:1486` | |
| 7 | Repository names and visibility for the five projects and the site own repository | `PRD.md:1487` | |
| 8 | CV file at the `siteIdentity.cv` path, with no class of degree or CGPA | `PRD.md:1488` | |
| 9 | About photo: include or not (v1 default is none) | `PRD.md:1489` | |
| 10 | Public email address, and whether to publish a phone number (default is no) | `PRD.md:1490` | |
| 11 | Availability wording and reply time | `PRD.md:1491` | |
| 12 | Lab items to list, and whether Branch Watch relates to the Blueskills work | `PRD.md:1492` | |
| 13 | Domain for canonical URLs and OG images | `PRD.md:1493` | |
| 14 | The 2023 gap: accurate, wanted, and not contradicting the Log 2023 entry (President, NAGS) | `PRD.md:1494` | |

Supporting references for items 3 and 14: the Log table (`PRD.md:527` to `PRD.md:531`) and the About timeline (`PRD.md:508` to `PRD.md:511`).

## B. Decision seed promotion

A seed becomes a record only when it has context, options, choice, trade-off, theme, evidence and status, and its reason is written (`PRD.md:430`, section 16.2). Status describes the observed code and history, pending owner review.

Minimums (`PRD.md:432`): at least 15 records at launch, at least 3 verified per shipped project, and at least 2 portfolio-wide with status `reversed` or `open`. Site-level decisions never count toward a project 3.

Seed counts: RentIt 8, Space Tourism 5, Guardrail 5, FX Checker 6, Marginalia 8. Every seed stays `verified: false` until the owner promotes it.

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

An `open` candidate exists here if a second record is needed: the Tavily free tier cap of 1,000 credits per month (`docs/truth/marginalia-decisions.md:125`).

## C. Other Phase 1 deliverables

- [ ] PRD v1.1 approved as the working spec (`PRD.md:1` to `PRD.md:7`).
- [ ] Voice sample approved or replaced (`PRD.md:1243`), within the banned-phrase list (`PRD.md:1241`).
- [ ] Truth sheets read and accepted as accurate by the owner for the five projects.
- [ ] Confirmation that figures, assets and approved copy are deferred to each project build phase (section 38), which is a project page gate, not a Phase 1 gate. The truth sheets flag these as still open (`docs/truth/guardrail.md:95`, `docs/truth/foreign-exchange-checker.md:102`, `docs/truth/space-tourism.md:99`).

## D. Phase 1 exit criteria

From the Phase 1 definition of done (`PRD.md:1327`):

- [ ] Every `[CONFIRM]` has an owner decision or a written deferral (section A).
- [ ] Every seed names its evidence (already done in the seed files).
- [ ] Seeds reviewed for specificity.
- [ ] Approved PRD v1.1 and voice sample recorded.

When A to D are complete, Phase 1 closes and Phase 2, the design system, can start (`PRD.md:1328`).
