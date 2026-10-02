# Seed promotion drafts

Eleven records drafted to the `PRD.md:430` (§16.2) anatomy, plus one blocked. Prepared for owner review on 2026-10-02.

**Nothing here is a decision record and nothing is approved.** Every entry stays `verified: false`; only the owner changes that (`AGENTS.md`). Publishing from this file would be publishing unapproved copy.

Anatomy required by `PRD.md:430`: Title (a verb phrase), Context, Options considered (two or three, one line each), Choice, Trade-off, Result (optional, only if verifiable), Status, Theme. Maximum 120 words visible. Every record carries an `evidence` reference. Specificity test at `PRD.md:434`: if the record could describe almost any developer project, rewrite it from the repository or cut it.

How to read each entry:

- **Note** is the publishable text, drafted under the 120-word cap. Word counts are deliberately short of the limit; recount before publishing.
- **Options considered** lists only options recoverable from source. **Confirming that no third option was weighed remains the owner's, and it is the last thing standing between these eleven and promotion.** A third option, if there was one, belongs here.
- **Trade-off** states a cost only where the code, a migration header or the owner supports it. Where the owner confirmed a cost on 2026-10-02 it says so.
- Nothing here asserts a measurement. Where a result would be unverifiable it is absent rather than estimated.

Three items remain open across the eleven, each named where it sits: whether Marginalia seed 2 has any cost at all, whether FX Checker seed 4's missing dialog semantics were deliberate, and whether Marginalia seed 7 belongs on a project page at all.

---

## RentIt

### 1. Write listing updates with UPDATE, not upsert

**Status** kept. **Theme** security.

**Context.** Three listing mutation paths (update fields, deactivate, activate) ran through `.upsert`.

**Options considered.**

- `.upsert({ id, ...updates }, { onConflict: "id" })`, the previous code.
- `.update(updates).eq("id", id)`, chosen.

**Choice.** `.update(updates).eq("id", id)` on all three mutation paths.

**Trade-off.** None, confirmed by the owner on 2026-10-02. The path is only reachable for a listing already fetched by id (`useListing.js:34-52`), so it never needed to create a row, and `.single()` chained after `.select()` turns a zero-row update into an error rather than a silent success (`useListing.js:80-83`). The same repository keeps upsert where creation is needed (`useProfile.js:32-33`).

**Evidence:** `src/features/listings/hooks/useListing.js` lines 63 to 66, 76 to 87, and the other two mutation paths at 104 and 128; commit `4f7fb62`; migration `supabase/migrations/20260802000000_listings_update_policy.sql`.

**Note.**

> Three listing mutation paths ran through `.upsert`. An upsert payload omits `owner_id`, so it failed the INSERT policy `WITH CHECK (owner_id = auth.uid())` even when the row already existed, which reads as a puzzle until the policy is checked. Moving all three paths to `.update(updates).eq("id", id)` sidesteps that policy, because an update to an existing row is checked by the UPDATE policy instead. The cost is none: the path only ever runs for a listing already fetched by id, so it never needed to create a row, and `.single()` turns a zero-row update into an error rather than a silent success.

### 2. Drop every UPDATE policy on listings by name, then create one

**Status** kept. **Theme** security.

**Context.** The UPDATE policies on `listings` were created by hand in the Supabase dashboard and never versioned, so their names were not recorded, and two with conflicting `WITH CHECK` clauses were rejecting writes.

**Options considered.**

- Leave the existing unversioned policy in place.
- Create a second policy alongside it.
- Drop every UPDATE policy on `listings` by iterating `pg_policies`, then create one owner-only policy, chosen.

**Choice.** A `DO` block that drops all UPDATE policies on `listings` regardless of name, then creates a single owner-only policy.

**Trade-off.** Stated in the migration header: it also drops any policy that may have served a purpose outside the app, on the owner's own database, and there is no rollback script.

**Evidence:** `supabase/migrations/20260802000000_listings_update_policy.sql` lines 1 to 20 and 31 to 58; commit `c9a206e`.

**Note.**

> The UPDATE policies on `listings` were created by hand in the Supabase dashboard and never versioned, so their names were not recorded, and two with conflicting `WITH CHECK` clauses were rejecting writes. The migration iterates `pg_policies` and drops every UPDATE policy on `listings` by name, then creates a single owner-only policy, because dropping by name is the only way to be sure the conflicting pair is gone when neither name is known. Accepted cost, stated in the migration header: it also drops any policy serving a purpose outside the app, and there is no rollback script. The header also records that if no UPDATE policy had existed at all, RLS would have filtered the row silently rather than raising an error.

### 4. Read profiles with maybeSingle, and make every migration idempotent

**BLOCKED. Do not promote.** The idempotency half rests on `CREATE POLICY IF NOT EXISTS` at `20260731000000_profiles_schema_and_rls.sql:40`, `:44` and `:48`, while the `push_subscriptions` migration states that Postgres does not support that clause and uses DROP then CREATE instead (`docs/truth/rentit.md:198`). Both cannot be right. If the clause is unsupported the migration errors rather than skipping, which changes the reason and makes a silently-skipped policy impossible as a cost. Settle it against a live database first. See open uncertainty 7 in `docs/truth/rentit.md`.

The `maybeSingle` half is sound and could be split out as its own record if the migration half cannot be resolved.

### 7. Replace the Database Webhooks UI with Postgres triggers and pg_net

**Status** kept. **Theme** architecture.

**Context.** Push notifications needed `bookings` and `messages` to reach an Edge Function. The Supabase dashboard Database Webhooks UI was not available on this project's plan.

**Options considered.**

- The Supabase dashboard Database Webhooks UI, unavailable on this plan.
- Postgres triggers calling `net.http_post()`, with the secret and the function URL read from Supabase Vault at call time, chosen.
- A plain `app_settings` table, documented in the migration as the fallback if Vault is unavailable, not active in the inspected code.

**Choice.** Triggers on `bookings` and `messages` calling `net.http_post()` to the Edge Function, with both values read by name from Vault.

**Trade-off.** Confirmed by the owner on 2026-10-02: two Vault reads on every trigger invocation, and a fail-soft misconfiguration path. If either secret is unset the function raises a NOTICE, returns NULL and skips the webhook, so delivery stops silently while the insert still succeeds. The fallback's own cost, a secret stored unencrypted at rest, is stated in the migration.

**Evidence:** `supabase/migrations/20260804000000_webpush_pg_net_triggers.sql`, header lines 1 to 30, the Vault lookups at 64 to 85, the NOTICE paths at 69 to 72 and 82 to 85, and the fallback note at 199 to 207; commits `e2a1aaf`, `8d779ab`.

**Note.**

> Push notifications needed `bookings` and `messages` to reach an Edge Function, and the dashboard Database Webhooks UI was not available on this project's plan. That constraint chose the mechanism: Postgres triggers calling `net.http_post()`, posting the payload shape the Edge Function already expected. Two costs. Every trigger invocation pays two Vault reads, since the secret and the function URL are looked up by name at call time. And it fails soft: if either secret is unset the function raises a NOTICE and skips the webhook, so delivery stops silently while the insert still succeeds. The migration also documents an `app_settings` fallback whose secret would sit unencrypted at rest, and states that cost itself.

---

## Space Tourism

### 1. Import crew assets instead of pointing at source-directory URLs

**Status** kept. **Theme** architecture.

**Context.** Crew imagery was referenced by literal `/src/assets/crew/...` paths, which resolve in development but never become dependencies of the build.

**Options considered.**

- Literal `/src/assets/crew/...` URLs, the previous code.
- Import the WebP and PNG files and assign the imported URLs to the data records, chosen.

**Choice.** Import both formats and assign the imported URLs to the data records.

**Trade-off.** Confirmed by the owner on 2026-10-02, in addition to the two the seed already named. Both formats are emitted into the build output, and there are no width or density alternatives, so one image size is served at every breakpoint. The PNG is only fetched by a browser without WebP support, so the transfer cost is conditional while the output cost is not.

**Evidence:** `space-tourism/src/data/crew.js:1` to `:8` and `:16` to `:19`; `space-tourism/src/pages/Crew.jsx:67`; `space-tourism/src/pages/DestinationPage.jsx:28`; diff `a97919d^..a97919d`; no width or density alternatives noted at `docs/truth/space-tourism.md:93`.

**Note.**

> Crew images were referenced by literal source paths, `/src/assets/crew/...`, which resolve in development but never become dependencies of the build, so nothing guaranteed they reached the output or got hashed. The commit imports the WebP and PNG files and assigns the imported URLs to the data records, putting them under the bundler's graph. Two costs. All eight files are imported, so both formats are emitted into the build output. And each record holds one file per format with no width or density alternatives, so a single image size is served at every breakpoint. The PNG is only fetched by a browser without WebP support, so that cost is conditional.

---

## Foreign Exchange Checker

### 4. Anchor each desktop picker to its currency button

**Status** kept. **Theme** ux.

**Context.** Both currency panels shared one picker, controlled through `onOpenPicker` and drawn as a centred desktop overlay, so the control that opened the list and the control the visitor then used sat in different places.

**Options considered.**

- A shared picker controlled through `onOpenPicker`, rendered as a centred desktop overlay, the previous code.
- Move picker-open state into `CurrencyPanel` and render the picker inside the button's positioned wrapper, keeping a fixed bottom sheet on mobile, chosen.

**Choice.** Per-panel picker state, anchored inside the trigger's positioned wrapper.

**Trade-off.** Each panel owns its picker state and each mounted picker fetches the currency list, so the list is requested more than once. The change added no dialog semantics and no focus restoration, and neither was tested. **Owner to confirm whether those omissions were a deliberate deferral, since that changes how the record reads.**

**Evidence:** `starter-code/src/components/CurrencyPanel.jsx:23`, `:56`; `starter-code/src/components/CurrencyPicker.jsx:12`, `:85`; diff `a88b805^..a88b805`.

**Note.**

> Both currency panels shared one picker, controlled through `onOpenPicker` and drawn as a centred desktop overlay, so the control that opened the list and the control the visitor then used sat in different places. Moving picker-open state into `CurrencyPanel` and rendering the picker inside the button's positioned wrapper keeps the list anchored to its trigger, while mobile keeps the fixed bottom sheet. Accepted cost: each panel now owns its picker state and each mounted picker fetches the currency list, so the list is requested more than once. This change added no dialog semantics and no focus restoration, and neither was tested.

---

## Marginalia

### 1. Close the token in the citation protocol, not in the model

**Status** kept. **Theme** data.

**Context.** The model produced citations, and a wrong citation is a fabricated source.

**Options considered.**

- Let the model emit citation identifiers and resolve them, the removed `resolveCitations` implementation, deleted in `c42ed06`.
- Have the model cite by 1-based index into a numbered evidence list, resolved server-side, chosen.

**Choice.** The model cites by 1-based index into a numbered evidence list (`evidence` field), never by document or source id. The server resolves each index to real data and drops anything unresolvable.

**Trade-off.** Stated in the type comment on `GeneratedCitation`: the model can only cite what was retrieved, so a correct answer depending on a missed passage becomes uncitable and its marker is stripped. The failure mode moves from fabricated sources to missing ones, which is the intended trade.

**Evidence:** `src/lib/research/citation-generation.ts` (`GeneratedCitation`, `ANSWER_OUTPUT_SCHEMA`, `parseGeneratedAnswerOutput`, `toAnswerCitations`, `sanitizeAnswerMarkers`); commit `c42ed06` for the deleted duplicate; `src/lib/research/__tests__/citation-generation.test.ts`.

**Note.**

> Citations are where an AI answer most often lies, so this removes the opportunity rather than asking the model to be careful. The model is shown the research context as a numbered list and cites by 1-based index into that list, never by a document or source id, so it cannot name an item that was not provided. `toAnswerCitations` fills every display field from the resolved item's real data, so page numbers, section names and quotes cannot be invented either. Accepted cost, and the intended trade: the model can only cite what was retrieved, so a correct answer depending on a missed passage becomes uncitable and its marker is stripped. The failure mode moves from fabricated sources to missing ones. A parallel implementation, `resolveCitations`, was deleted as dead code.

### 2. Enable RLS on the one table that had none

**Status** kept. **Theme** security.

**Context.** Every table had row-level security except `profiles`, which was read and updated from the browser's authenticated client by `ProfileProvider` and `ProfileForm`.

**Options considered.**

- Leave `profiles` without RLS, what the repository shipped.
- Enable RLS with SELECT and UPDATE scoped to `auth.uid()`, and deliberately not grant INSERT, chosen.

**Choice.** RLS on `profiles`, SELECT and UPDATE scoped to `auth.uid()`, insert deliberately not granted.

**Trade-off.** No cost is visible in the diff, and none was stated in the commit body. **Owner to confirm there is no cost, and that leaving RLS off was a real option.**

**Evidence:** commit `8e11342`; `supabase/migrations/20260929000000_secure_profiles.sql` lines 7, 9, 15; `src/components/profile/ProfileProvider.tsx`; `src/components/profile/ProfileForm.tsx`.

**Note.**

> Every table had row-level security except `profiles`, and that table was read and updated from the browser's authenticated client by `ProfileProvider` and `ProfileForm`. With RLS off, any authenticated request that could name a user id could read or overwrite another user's row, and the only thing preventing it was that the app never issued that query. The migration enables RLS and scopes SELECT and UPDATE to `auth.uid()`. Insert is deliberately not granted, because profiles are created by the sign-up trigger, which runs `SECURITY DEFINER` as the table owner and is not subject to the policies. No cost is recorded in the diff.

### 4. Swap pdf-parse for unpdf for serverless compatibility

**Status** kept. **Theme** architecture.

**Context.** PDF text extraction used `pdf-parse`, which bundles `pdfjs-dist` canvas-dependent code paths that break in Vercel's serverless runtime.

**Options considered.**

- `pdf-parse` with a hand-written DOMMatrix polyfill, the previous code, polyfill added in `13d832f`.
- `unpdf`, which extracts text with no canvas or native dependencies, chosen.

**Choice.** `unpdf`, with `pdf-parse`, the `pdfjs-dist` canvas paths and the DOMMatrix polyfill all removed, and `serverExternalPackages: ["unpdf"]` in `next.config.ts`.

**Trade-off.** Dependency weight fell, 301 lines removed against 51 added. **Owner to confirm whether extraction fidelity on chart-heavy PDFs was measured or only observed.**

**Evidence:** commit `179c217` (6 files, 51 insertions, 301 deletions); `src/lib/research/document-parse.ts`; `next.config.ts`; `src/lib/research/__tests__/document-parse.test.ts`.

**Note.**

> `pdf-parse` pulls in `pdfjs-dist`'s canvas-dependent code paths, which break in Vercel's serverless runtime. A hand-written DOMMatrix polyfill, added in `13d832f`, was a patch on that problem, and some PDFs with embedded figures and charts still failed extraction. `unpdf` extracts text with no canvas or native dependencies, so the polyfill and the whole dependency go away: the commit removes 301 lines and adds 51. Input and output shape and the user-safe error handling were preserved, which is what makes the swap safe to make for its own sake. Whether fidelity on chart-heavy PDFs was measured or only observed is not recorded.

### 5. Fail a web-only question rather than answer it with nothing

**Status** kept. **Theme** data.

**Context.** A web-only question with no usable web results previously still generated an answer, which claimed a search had happened.

**Options considered.**

- Generate an answer anyway, the previous behaviour, which `3c8530f` fixed after `e39c03d` made provider failures visible.
- Mark the question failed with `NO_WEB_SOURCES_MESSAGE`, chosen.

**Choice.** If a web-only question produces no usable web evidence, mark it failed rather than answering.

**Trade-off.** Stated in the comment above `NO_WEB_SOURCES_MESSAGE`: the user gets a failure where a thin answer would have been something. **Owner to confirm how that was weighed.**

**Evidence:** commit `3c8530f` (642 lines of new tests, 213 changed in `generation.ts`); `NO_WEB_SOURCES_MESSAGE` and its comment in `src/lib/research/generation.ts`; `src/lib/research/__tests__/generation.test.ts`.

**Note.**

> The invariant is that `sourceMode` is web only when web results are the actual evidence. When a web-only question returned nothing usable, the old path generated an answer anyway, which broke that invariant and told the user a search had been performed. The comment above `NO_WEB_SOURCES_MESSAGE` states the choice: fail the question instead. This only became reachable after `e39c03d` surfaced web search provider failures, which is what made the empty case visible at all. Accepted cost: the user gets a failure where a thin answer would have been something.

### 7. Make the README's security claims true instead of narrowing them

**Status** kept. **Theme** security.

**Context.** The README claimed "Row Level Security everywhere", which was false because `profiles` had RLS disabled while being read and written through the authenticated browser client.

**Options considered.**

- Narrow the claim so it matched the code.
- Keep the claim and add the migration that makes it true, chosen.

**Choice.** Keep "Row Level Security on application data" as the claim and add the migration that makes it true.

**Trade-off.** None recorded. **Owner to confirm whether a documentation-integrity record belongs on a project page at all**, since this one describes a habit rather than product behaviour.

**Evidence:** commit `b5be603`; commit `0d71954` ("Correct the README's test counts", verified against `npm test` rather than recounted by hand).

**Note.**

> The README claimed row-level security everywhere. It was not true: `profiles` had RLS disabled while being read and written through the authenticated browser client. The commit body records the choice, which was to fix the code rather than soften the sentence, so the claim stays and the migration in `8e11342` makes it real. The wording narrows to "on application data", which is the accurate scope. `0d71954` applies the same habit to numbers, correcting the README's test counts against `npm test` rather than recounting by hand. No cost is recorded. This is a record about documentation integrity rather than product behaviour.

### 8. Restrict the app to existing users: reject unknown OAuth identities

**Status** reversed. **Theme** security.

**Context.** The OAuth callback first self-healed a missing profile by upserting one server-side, then that was removed.

**Options considered.**

- `8b2b5c8`: self-heal a missing profile by upserting one server-side, the earlier behaviour.
- `5b0e7ae`: reject unknown Google identities with `account_not_found`, sign out and clear every cookie, chosen.

**Choice.** Status `reversed`. Unknown Google identities are rejected rather than silently provisioned.

**Trade-off.** Confirmed by the owner on 2026-10-02, three costs. A registered user whose profile row is missing is rejected outright and told no account exists, pointing them at a registration route that is itself disabled. The `account_not_found` classification matches the substring "signup" in Supabase's error text, so an upstream wording change reclassifies it to the generic `oauth_failed`. And every rejection lands on `/login`, even when the attempt came from `/register`. The narrowing itself is right for a private single-user app and would be wrong for a public one.

**Evidence:** commits `8b2b5c8` and `5b0e7ae`; `src/app/auth/callback/route.ts`, the rejection path at lines 36 to 60, the error classification at 82 to 92, and the profile-row admission check at 103 to 122; `src/app/auth/__tests__/callback-route.test.ts`.

**Note.**

> The callback first self-healed a missing profile by upserting one server-side, and the reason was real: an earlier `app_registered` metadata flag did not survive repeat OAuth sign-ins on the same Google account. The reversal rejects unknown Google identities with `account_not_found` and clears every cookie, so nothing is silently provisioned, and the check is now a profile row, which is durable where OAuth metadata was not. Three costs. A registered user whose profile row is missing is rejected and told no account exists, pointing them at a registration route that is disabled. The classification matches the substring "signup" in Supabase's error text, so an upstream wording change reclassifies it. And every rejection lands on `/login`, even from `/register`.

---

## Still needed before these eleven can be promoted

1. **The third-option confirmation, for every record.** Section 16.2 asks for options considered, and a list of two is only honest if two is the real number.
2. **Marginalia seed 2.** Whether it has any accepted cost, and whether leaving RLS off was a real option.
3. **FX Checker seed 4.** Whether the missing dialog semantics and focus restoration were a deliberate deferral.
4. **Marginalia seed 7.** Whether a documentation-integrity record belongs on a project page.
5. **The `verified` flag is yours alone.** All eleven stay false (`AGENTS.md`).

## Not touched by this pass

- **The twenty undrafted seeds.** Seven have a partly stated reason (RentIt 3; Space Tourism 3, 4, 5; Marginalia 3, 6) and nine have none (RentIt 5, 6, 8; Space Tourism 2; FX Checker 1, 2, 3, 5, 6). Those need owner testimony before drafting is useful.
- **RentIt seed 4**, blocked on the `CREATE POLICY IF NOT EXISTS` fact check.
- **The five Guardrail seeds**, blocked behind item 5 of `docs/phase-1-exit.md`.
- **Counts.** Tracked in section B of `docs/phase-1-exit.md`. The thinnest requirement is still the second portfolio-wide `reversed` or `open` record. Marginalia seed 8 above is one. The cheapest second is RentIt seed 8, where both reverts are already identified by commit (`b15e4f9` reverting `2735700`, `25ed7b4` reverting `ec51a62`, surviving approach `3ebe655`) and only the reason is missing.
