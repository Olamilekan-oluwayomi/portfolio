# Seed promotion drafts

Draft record text for the twelve seeds whose reason is already stated in source. Prepared for owner review on 2026-10-02.

**Nothing here is a decision record.** This file drafts the visible note only, so the owner has twelve near-final records to read instead of twelve prompts. Nothing is approved, nothing carries `verified: true`, and nothing may be published from this file (`AGENTS.md`).

Anatomy required by `PRD.md:430` (§16.2): Title (a verb phrase), Context, Options considered (two or three, one line each), Choice, Trade-off, Result (optional, only if verifiable), Status, Theme. Maximum 120 words visible. Every record also carries an `evidence` reference (`PRD.md:430`). Specificity test at `PRD.md:434`: if the record could describe almost any developer project, rewrite it from the repository or cut it.

Scope of this pass, and its one hard limit:

- **Source states** marks what a commit message, code comment or migration header already says. Those lines are quoted, not paraphrased into something stronger.
- **Owner to supply** marks what no source states. It is left blank rather than guessed.
- Two gaps are not drafted here because only the owner can close them. **Options:** the seeds record "the alternative visible in the diff", which is usually just the previous code. That is evidence a change happened, not evidence the alternative was weighed, so each record needs one confirmation from the owner that the prior behaviour was actually on the table. **Accepted cost:** where a seed reads `reason: owner to supply` for the trade-off, it stays that way here.
- Word counts are deliberately kept short of the 120-word cap; recount before publishing.

---

## RentIt

### 1. Write listing updates with UPDATE, not upsert

**Status** kept. **Theme** security.

**Draft visible note.**

> Three listing mutation paths ran through `.upsert`. An upsert payload omits `owner_id`, so it failed the INSERT policy `WITH CHECK (owner_id = auth.uid())` even when the row already existed, which is the part that reads as a puzzle until the policy is checked. Moving all three paths to `.update(updates).eq("id", id)` sidesteps that policy entirely, because an update to an existing row is checked by the UPDATE policy instead. No accepted cost is recorded. Options after the fact were to keep upsert and widen the policy, or to update by id; only the second is in the history.

**Source states:** choice and reason, in the code comment the commit added (`docs/truth/rentit-decisions.md:16`).

**Owner to supply:** the trade-off, and whether upsert was a real option or only the previous code.

**Evidence:** `src/features/listings/hooks/useListing.js` lines 63 to 66 and 78, 104, 128; commit `4f7fb62`; migration `supabase/migrations/20260802000000_listings_update_policy.sql`.

### 2. Drop every UPDATE policy on listings by name, then create one

**Status** kept. **Theme** security.

**Draft visible note.**

> The UPDATE policies on `listings` were created by hand in the Supabase dashboard and never versioned, so their names were not recorded, and two with conflicting `WITH CHECK` clauses were rejecting writes. The migration iterates `pg_policies` and drops every UPDATE policy on `listings` by name, then creates a single owner-only policy, because dropping by name is the only way to be sure the conflicting pair is gone when neither name is known. Accepted cost, stated in the migration header: it also drops any policy serving a purpose outside the app, on the owner's own database, and there is no rollback script. The header also records that if no UPDATE policy had existed at all, RLS would have filtered the row silently rather than raising an error.

**Source states:** choice, reason and the accepted cost, all in the migration header (`docs/truth/rentit-decisions.md:30` to `:31`).

**Owner to supply:** confirmation that the prior policy was a real option.

**Evidence:** `supabase/migrations/20260802000000_listings_update_policy.sql` lines 1 to 20 and 31 to 58; commit `c9a206e`.

### 4. Read profiles with maybeSingle, and make every migration idempotent

**Status** kept. **Theme** data.

**Draft visible note.**

> A new RentIt user has no profile row until the sign-up trigger creates one, so `.single()` returned 406 on the ordinary path rather than an exceptional one. `.maybeSingle()` treats zero rows as a value instead of an error. The same commit made migrations re-runnable with `CREATE POLICY IF NOT EXISTS`, because the bare form errored on a second run, and added `console.error` to every query failure. The 400s were traced separately, to unknown upsert columns or an RLS mismatch. The three changes share one idea: expected conditions should not surface as errors. No accepted cost is recorded.

**Source states:** choice and reason, in the commit body (`docs/truth/rentit-decisions.md:58`).

**Owner to supply:** the trade-off, and whether `.single()` was a real option or only the previous code.

**Evidence:** commit `01d4e40`; `src/features/profile/context/ProfileContext.jsx`; `src/features/profile/hooks/useProfile.js`; `supabase/migrations/20260731000000_profiles_schema_and_rls.sql`.

### 7. Replace the Database Webhooks UI with Postgres triggers and pg_net

**Status** kept. **Theme** architecture.

**Draft visible note.**

> Push notifications needed `bookings` and `messages` to reach an Edge Function, and the Supabase dashboard Database Webhooks UI was not available on this project's plan. That constraint, not a preference, chose the mechanism: Postgres triggers calling `net.http_post()`, posting the same payload shape the Edge Function already expected. The webhook secret is read at call time from Supabase Vault. The migration also documents a fallback to a plain `app_settings` table if Vault is unavailable, and states its cost plainly, that the secret would sit as plain text rather than encrypted at rest. The fallback is not active in the inspected code. The accepted cost of the active path is not recorded.

**Source states:** choice, reason and the documented fallback with its cost (`docs/truth/rentit-decisions.md:98` to `:101`).

**Owner to supply:** the accepted cost of the Vault path, and whether the dashboard UI removal was a real option.

**Evidence:** `supabase/migrations/20260804000000_webpush_pg_net_triggers.sql` header and the fallback note at the end of the file; commits `e2a1aaf`, `8d779ab`.

---

## Space Tourism

### 1. Import crew assets instead of pointing at source-directory URLs

**Status** kept. **Theme** architecture.

**Draft visible note.**

> Crew images were referenced by literal source paths, `/src/assets/crew/...`, which resolve in development but never become dependencies of the build, so nothing guaranteed they reached the output or got hashed. The commit imports the WebP and PNG files and assigns the imported URLs to the data records, which puts them under the bundler's graph. Both formats are imported so the bundler handles both rather than one being assumed. The accepted cost is that asset references now depend on that import graph. Output size and a production rendering check are unverified, so no size claim is made here.

**Source states:** choice and reason, in the commit subject (`docs/truth/space-tourism-decisions.md:12`).

**Owner to supply:** the further costs the seed leaves open, and whether source-path URLs were a real option.

**Evidence:** `space-tourism/src/data/crew.js:1`, `space-tourism/src/pages/Crew.jsx:67`; diff `a97919d^..a97919d`.

---

## Foreign Exchange Checker

### 4. Anchor each desktop picker to its currency button

**Status** kept. **Theme** ux.

**Draft visible note.**

> Both currency panels shared one picker, controlled through `onOpenPicker` and drawn as a centred desktop overlay, so the control that opened the list and the control the visitor then used sat in different places. Moving picker-open state into `CurrencyPanel` and rendering the picker inside the button's positioned wrapper keeps the list anchored to its trigger, while mobile keeps the fixed bottom sheet. Accepted cost: each panel now owns its picker state and each mounted picker fetches the currency list, so the list is requested more than once. This change added no dialog semantics and no focus restoration, and neither was tested.

**Source states:** choice and reason, in the commit body (`docs/truth/foreign-exchange-checker-decisions.md:48`).

**Owner to supply:** confirmation that the shared centred overlay was a real option, and whether the missing dialog semantics were a deliberate deferral or an oversight.

**Evidence:** `starter-code/src/components/CurrencyPanel.jsx:23`, `:56`; `starter-code/src/components/CurrencyPicker.jsx:12`, `:85`; diff `a88b805^..a88b805`.

---

## Marginalia

### 1. Close the token in the citation protocol, not in the model

**Status** kept. **Theme** data.

**Draft visible note.**

> Citations are where an AI answer most often lies, so this removes the opportunity rather than asking the model to be careful. The model is shown the research context as a numbered list and cites by 1-based index into that list, never by a document or source id, so it cannot name an item that was not provided. `toAnswerCitations` fills every display field from the resolved item's real data, so page numbers, section names and quotes cannot be invented either. Accepted cost, and the intended trade: the model can only cite what was retrieved, so a correct answer depending on a missed passage becomes uncitable and its marker is stripped. The failure mode moves from fabricated sources to missing ones. A parallel implementation, `resolveCitations`, was deleted as dead code.

**Source states:** choice, reason and the trade-off, in the type comment on `GeneratedCitation` (`docs/truth/marginalia-decisions.md:18` to `:19`).

**Owner to supply:** confirmation that `resolveCitations` was a real option, and whether the missing-source cost was weighed or accepted after the fact.

**Evidence:** `src/lib/research/citation-generation.ts` (`GeneratedCitation`, `ANSWER_OUTPUT_SCHEMA`, `parseGeneratedAnswerOutput`, `toAnswerCitations`, `sanitizeAnswerMarkers`); commit `c42ed06`; `src/lib/research/__tests__/citation-generation.test.ts`.

### 2. Enable RLS on the one table that had none

**Status** kept. **Theme** security.

**Draft visible note.**

> Every table had row-level security except `profiles`, and that table was read and updated from the browser's authenticated client by `ProfileProvider` and `ProfileForm`. With RLS off, any authenticated request that could name a user id could read or overwrite another user's row, and the only thing preventing it was that the app never issued that query. The migration enables RLS and scopes SELECT and UPDATE to `auth.uid()`. Insert is deliberately not granted, because profiles are created by the sign-up trigger, which runs `SECURITY DEFINER` as the table owner and is not subject to the policies. No cost is recorded in the diff.

**Source states:** choice and reason, in the commit body (`docs/truth/marginalia-decisions.md:32`).

**Owner to supply:** whether there is any accepted cost, and confirmation that leaving RLS off was a real option.

**Evidence:** commit `8e11342`; `supabase/migrations/20260929000000_secure_profiles.sql` lines 7, 9, 15; `src/components/profile/ProfileProvider.tsx`; `src/components/profile/ProfileForm.tsx`.

### 4. Swap pdf-parse for unpdf for serverless compatibility

**Status** kept. **Theme** architecture.

**Draft visible note.**

> `pdf-parse` pulls in `pdfjs-dist`'s canvas-dependent code paths, which break in Vercel's serverless runtime. A hand-written DOMMatrix polyfill, added in `13d832f`, was a patch on that problem, and some PDFs with embedded figures and charts still failed extraction. `unpdf` extracts text with no canvas or native dependencies, so the polyfill and the whole dependency go away: the commit removes 301 lines and adds 51. Input and output shape and the user-safe error handling were preserved, which is what makes the swap safe to make for its own sake. Whether fidelity on chart-heavy PDFs was measured or only observed is not recorded.

**Source states:** choice and reason, in the commit body; the line counts are from the diff (`docs/truth/marginalia-decisions.md:60` to `:61`).

**Owner to supply:** whether extraction fidelity was measured or only observed, and whether the polyfill route was a real option.

**Evidence:** commit `179c217` (6 files, 51 insertions, 301 deletions); `src/lib/research/document-parse.ts`; `next.config.ts` `serverExternalPackages`; `src/lib/research/__tests__/document-parse.test.ts`.

### 5. Fail a web-only question rather than answer it with nothing

**Status** kept. **Theme** data.

**Draft visible note.**

> The invariant is that `sourceMode` is web only when web results are the actual evidence. When a web-only question returned nothing usable, the old path generated an answer anyway, which broke that invariant and told the user a search had been performed. The comment above `NO_WEB_SOURCES_MESSAGE` states the choice: fail the question instead. This only became reachable after `e39c03d` surfaced web search provider failures, which is what made the empty case visible at all. Accepted cost: the user gets a failure where a thin answer would have been something.

**Source states:** choice and reason, in the comment above `NO_WEB_SOURCES_MESSAGE` (`docs/truth/marginalia-decisions.md:74`).

**Owner to supply:** whether the thin-answer route was a real option, and how the accepted cost was weighed.

**Evidence:** commit `3c8530f` (642 lines of new tests, 213 changed in `generation.ts`); `NO_WEB_SOURCES_MESSAGE` and its comment in `src/lib/research/generation.ts`; `src/lib/research/__tests__/generation.test.ts`.

### 7. Make the README's security claims true instead of narrowing them

**Status** kept. **Theme** security.

**Draft visible note.**

> The README claimed row-level security everywhere. It was not true: `profiles` had RLS disabled while being read and written through the authenticated browser client. The commit body records the choice, which was to fix the code rather than soften the sentence, so the claim stays and the migration in `8e11342` makes it real. The wording narrows to "on application data", which is the accurate scope. `0d71954` applies the same habit to numbers, correcting the README's test counts against `npm test` rather than recounting by hand. No cost is recorded. This is a record about documentation integrity rather than product behaviour, so whether it belongs on a project page is the owner's call.

**Source states:** choice and reason, in the commit body (`docs/truth/marginalia-decisions.md:102`).

**Owner to supply:** whether a documentation-integrity record belongs on a project page, and confirmation that narrowing the wording was a real option.

**Evidence:** commit `b5be603`; commit `0d71954`.

### 8. Restrict the app to existing users: reject unknown OAuth identities

**Status** reversed. **Theme** security.

**Draft visible note.**

> The callback first self-healed a missing profile by upserting one server-side. The reason for that was real: an earlier `app_registered` metadata flag did not survive repeat OAuth sign-ins on the same Google account. `5b0e7ae` reverses it, rejecting unknown Google identities with `account_not_found`, signing them out and clearing session cookies, so the app is restricted to existing users and nothing is silently provisioned. The reversal reintroduces the missing-profile problem and answers it differently rather than removing it. Accepted cost: a legitimate new Google user cannot get in through OAuth and must register by email first, which is right for a private single-user app and wrong for a public one.

**Source states:** choice and reason, in `5b0e7ae` and `8b2b5c8`; the reversal is explicit in the second commit (`docs/truth/marginalia-decisions.md:116`).

**Owner to supply:** the remainder of the accepted cost, and how the reversal weighed the problem self-healing had solved.

**Evidence:** commits `8b2b5c8` and `5b0e7ae`; `src/app/auth/callback/route.ts`; `src/app/auth/__tests__/callback-route.test.ts`.

---

## What this pass did not touch

- **The other twenty seeds.** Twelve of thirty-two are drafted above. Seven more have a partly stated reason (RentIt 3; Space Tourism 3, 4, 5; Marginalia 3, 6) and nine have none (RentIt 5, 6, 8; Space Tourism 2; FX Checker 1, 2, 3, 5, 6). Those need owner testimony before drafting is even useful.
- **The five Guardrail seeds.** Blocked behind item 5 of `docs/phase-1-exit.md`, which is deliberately open.
- **`verified`.** Every record above stays `verified: false`. Only the owner changes this (`AGENTS.md`).
- **Counts.** Meeting the `PRD.md:432` minimums is tracked in section B of `docs/phase-1-exit.md`. The thinnest point is still the second portfolio-wide `reversed` or `open` record, where RentIt seed 8 is the cheapest route because both its reverts are already identified by commit.
