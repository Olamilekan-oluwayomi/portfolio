# Seed specificity review

Section D of the Phase 1 exit worksheet lists "Seeds reviewed for specificity" as an open box. This is that review, run against the rule at `PRD.md:434`:

> A decision is an actual choice made in an actual project, traceable to evidence: code, a commit, a pull request, a migration, a screenshot or the owner's own account. "I chose TypeScript because it provides type safety" is not a decision record, because it could describe any project. Test every record: if it could describe almost any developer project, rewrite it from the repository or cut it.

Method: all 32 seeds read in full from the five seed files, then each tested against that text alone. The test applied is "could this describe almost any developer project", not "is this interesting". A seed with a generic topic passes when the repository detail that makes it specific is identified and can be carried into the record.

Three verdicts:

- **Specific as recorded.** The seed already names artifacts, values or failures unique to this project.
- **Specific only if the detail is carried.** The topic alone is generic and would fail the test. The seed contains the specific detail, and the record must carry it rather than the topic.
- **Cannot pass without the owner.** The rationale or the alternative is missing, so no specific record can be written from what exists.

## Verdict summary

| Project | Specific as recorded | Specific only if the detail is carried | Cannot pass without the owner | Seeds |
| --- | --- | --- | --- | --- |
| RentIt | 7 | 1 | 0 | 8 |
| Space Tourism | 1 | 3 | 1 | 5 |
| Guardrail | 5 | 0 | 0 | 5 |
| Foreign Exchange Checker | 2 | 3 | 1 | 6 |
| Marginalia | 8 | 0 | 0 | 8 |
| **Total** | **23** | **7** | **2** | **32** |

Nothing is cut on specificity grounds. Both seeds that cannot pass fail on missing rationale, not on being generic, and that is the same owner-input gap already recorded in `docs/phase-1-exit.md:241`. So this review changes no counts by itself. It does change where the margin is.

Since this review ran, the owner deferred Guardrail (2026-10-02; `docs/phase-1-exit.md:85`). Its five seeds count toward no minimum, so the Guardrail verdicts below are a record rather than a pending requirement. The total row still describes all 32 seeds as reviewed; 27 of them belong to shipped projects.

## RentIt (`docs/truth/rentit-decisions.md`)

Seven of eight are specific as recorded. The seed file's own note, that seeds 1, 3, 4, 7 and 8 pass the test hardest (`docs/truth/rentit-decisions.md:7`), holds up.

- **1. UPDATE not upsert. Specific as recorded.** Names the exact mechanism: an upsert payload omits `owner_id`, so it fails the INSERT policy `WITH CHECK (owner_id = auth.uid())` even for an existing row. Not a general "use the right method" record.
- **2. Drop every UPDATE policy by name. Specific as recorded.** Names why the name is unknown (policies created in the dashboard, never versioned) and the observed failure (two competing UPDATE policies with conflicting `WITH CHECK` clauses).
- **3. Move the gate from full_name to location. Specific as recorded.** Names both rules: `avatar_url` plus non-empty `location`, against `avatar_url` plus `char_length(trim(full_name)) >= 2`.
- **4. maybeSingle, and idempotent migrations. Specific as recorded, but blocked.** Names the exact status codes: 406 when no profile row exists, 400 from unknown upsert columns or an RLS mismatch. Blocked from promotion by the `CREATE POLICY IF NOT EXISTS` fact check, not by specificity (`docs/phase-1-exit.md:250`).
- **5. Clamp same-day bookings to one night. Specific as recorded.** Names the mechanism: `differenceInCalendarDays` returns 0 for a same-day range, producing a 0-night, 0-price booking.
- **6. Service worker reads keys from IndexedDB. Specific only if the detail is carried.** The topic, a service worker storing configuration, is generic. Two details make it specific and both must appear: the worker scope cannot reach `localStorage` or `import.meta.env`, and the cost is an access token sitting in IndexedDB readable by any script on the origin. Written as "I used IndexedDB for the service worker" it would fail.
- **7. Postgres triggers and pg_net over Database Webhooks. Specific as recorded.** Names the plan limitation (the dashboard Webhooks UI is not available on this project), the Vault read at call time, and the documented plain-text fallback.
- **8. Two attempts to pin the chat input, both reverted. Specific as recorded.** Names three commits and three distinct approaches, and the surviving narrower scope. One of the strongest seeds in the portfolio on this test.

## Space Tourism (`docs/truth/space-tourism-decisions.md`)

**This is the project at risk, and it is the finding that matters.** Only one of five is specific as recorded. The project needs at least 3 to ship a page (`PRD.md:432`), so it has almost no margin.

- **1. Import crew assets instead of source-directory URLs. Specific only if the detail is carried.** The topic, "import assets so the bundler handles them", is common Vite advice and would fail on its own. The specific part is the failure mode: literal `/src/assets/crew/...` paths work in development and break in a production build. The record must name that, plus the fact that both WebP and PNG are imported.
- **2. Load page components through the router's lazy API. Cannot pass without the owner.** Two problems compound. The rationale is unstated, and the project's own performance guide describes the opposite decision as the retained one, which commit `dd21daa` contradicts (`docs/truth/space-tourism-decisions.md:24`, `docs/truth/space-tourism.md:89`). There is no specific record here until the owner says what the intent was. The seed file already warns against promoting this narrative as a `reversed` record to fill a quota (`docs/truth/space-tourism-decisions.md:69`).
- **3. Shorten crew and planet transitions. Specific as recorded.** Names both durations and both old values: crew 0.6 to 0.4 seconds, destination 0.4 to 0.3 seconds.
- **4. Configure vendor chunks and Terser. Specific only if the detail is carried.** "Configure the production build" is generic. The specific parts are console and debugger removal, two named manual chunks (Framer Motion, React Router), and the honest limit that separate chunks do not prove on-demand loading. It must not claim size savings, which are unverified.
- **5. Defer crew and planet images but prioritize technology imagery. Specific only if the detail is carried.** Deferring images is generic; the asymmetry is not. The record must carry that crew and planet images are lazy with async decoding while Technology is eager with high fetch priority, and that no measured LCP effect follows from the attributes.

Consequence: Space Tourism can reach 3 only if seeds 1, 4 and 5 each carry their repository detail, and it cannot reach 3 at all if seed 2 is relied on. With Guardrail deferred (owner, 2026-10-02), Space Tourism is one of the four projects that must reach 3, so this is now a requirement rather than a question, and it is the tightest of the four.

## Guardrail (`docs/truth/guardrail-decisions.md`)

All five specific as recorded. The project is deferred (owner, 2026-10-02), so these seeds count toward no minimum and the specificity question is moot for them. The verdicts are kept in case the contract source is ever recovered.

- **1. Read through the wallet, one getter at a time. Specific as recorded.** Names seven sequential getters with 300 ms gaps, against `af86fa2`'s separate `JsonRpcProvider` and `Promise.all`, and states the code-derived cost of 1.8 seconds.
- **2. Retry ambiguous read failures. Specific as recorded.** Names exponential delays starting at 500 ms, the three-retry bound, and the specific confusion being defended against, which is that throttling resembles missing revert data.
- **3. Retire five-second polling. Specific as recorded.** Names the removed interval and the guard ref added in its place.
- **4. Check the active chain before marking connected. Specific as recorded.** Names error `4902`, the swallowed non-4902 switch error, and the resulting misdiagnosis path.
- **5. Align dashboard calls with the replacement ABI. Specific as recorded.** Names the exact getters on both sides: `spent_in_window` and `usdc_balance` against `spent_today` and `contract_balance`, and `pause`/`unpause` against `toggle_pause`.

## Foreign Exchange Checker (`docs/truth/foreign-exchange-checker-decisions.md`)

Four usable, with a comfortable margin against the 3-per-project minimum.

- **1. Move converter state to Redux without moving favorites and logs. Specific as recorded.** The specificity is the inconsistency itself: currency moved to a slice while favorites and logs stayed in context, so the app deliberately runs three state approaches at once.
- **2. Cancel converter requests through the dispatched thunk. Cannot pass without the owner.** "Cancel the request on cleanup" could describe any React data fetch, and the reason is unstated. The seed says the diff proves the mechanism changed but not why that API was preferred.
- **3. Persist saved pairs and snapshots in the browser. Specific only if the detail is carried.** "Use local storage" is generic. The record must carry the two limits: the hook has no parsing or storage exception recovery, and the provider's rate date is not stored, so a saved snapshot has a local timestamp but no rate date.
- **4. Anchor each desktop picker to its currency button. Specific as recorded.** Names the structural change: picker state moved into `CurrencyPanel` and rendered inside the button's positioned wrapper, against a shared picker controlled through `onOpenPicker` as a centred overlay, with the mobile bottom sheet retained.
- **5. Format received amounts separately from editable input. Specific only if the detail is carried.** "Format the output" is generic. The record must carry the asymmetry: input text is left exactly as typed while receive is grouped and capped at two fraction digits, and compare and log use different defaults again.
- **6. Load a saved pair back into the converter and its History view. Specific only if the detail is carried.** "Load a saved item" is generic. The specific parts are that selecting a favourite also switches the active view to History without changing the entered amount, so loading a pair leaves the favourites view.

## Marginalia (`docs/truth/marginalia-decisions.md`)

All eight specific as recorded. The seed file's claim that this project is the best source of records holds up on the specificity test, not only on the reasons (`docs/truth/marginalia-decisions.md:7`).

- **1. Close the token in the citation protocol, not in the model. Specific as recorded.** Names the mechanism precisely: a 1-based index into a numbered evidence list, resolved server-side, with unresolvable indices dropped and every display field filled from real data. This is the clearest pass in the portfolio.
- **2. Enable RLS on the one table that had none. Specific as recorded.** Names `profiles` as the only table without RLS, the two scopes granted, and why INSERT is deliberately excluded: the sign-up trigger runs `SECURITY DEFINER` as the table owner and is not subject to policies.
- **3. Retry on a second provider, never re-run the research. Specific as recorded.** The specificity is the asymmetry. The identical assembled prompt is retried against Groq, while research, relevance checks and web search are never re-run.
- **4. Swap pdf-parse for unpdf. Specific as recorded.** Names the failure: `pdf-parse` pulls in `pdfjs-dist` canvas paths that break in Vercel's serverless runtime even with a DOMMatrix polyfill, plus the size change (301 lines removed, 51 added).
- **5. Fail a web-only question rather than answer it with nothing. Specific as recorded.** Names the invariant being protected: source mode is web only when web results are the actual evidence, so the question is failed rather than answered with an empty answer claiming a search happened.
- **6. Stop suppressing secondary passages. Specific as recorded.** Names the constant (`VALUE_CANDIDATE_SCORE_RATIO = 0.45`) and the removed behaviour (a primary cluster covering every concept suppressing the secondaries).
- **7. Make the README's security claims true instead of narrowing them. Specific as recorded, but a placement question.** It passes the test cleanly, naming the exact false claim ("Row Level Security everywhere") and the migration that makes it true. The seed itself asks whether a documentation-integrity decision belongs on a project page at all (`docs/truth/marginalia-decisions.md:103`). That is a placement judgment for the owner, not a specificity failure.
- **8. Restrict the app to existing users. Specific as recorded.** Names both behaviours across the two commits: server-side self-healing of a missing profile, then its removal in favour of rejecting unknown Google identities with `account_not_found`, signing out and clearing session cookies. It also records the real problem the reversal reintroduces, which is that the earlier `app_registered` flag did not survive repeat sign-ins.

## What this changes

- **Section D's specificity box is answered for the seeds as recorded.** The box is the owner's to tick, but the review exists and its method is stated above.
- **Space Tourism's project page has almost no margin.** One seed is safe as recorded, three need their detail carried, and one cannot be written without the owner. Any plan that relies on Space Tourism shipping three records should treat seed 2 as unusable and seeds 1, 4 and 5 as requiring careful writing.
- **Nothing is promoted by this review.** Every seed stays `verified: false`, and the reasons and accepted costs in `docs/phase-1-exit.md:241` are still the gate.
- **The 15-record total is not at risk.** 23 seeds pass as recorded across five projects, and only Marginalia's cap of 8 and RentIt's cap of 8 limit how many exist. The binding constraint remains the owner's reasons, not specificity.
