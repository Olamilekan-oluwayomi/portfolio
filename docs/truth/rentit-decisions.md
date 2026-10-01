# RentIt decision seeds

Eight candidates pulled from the RentIt repository at HEAD `f07791d`, which is the cap you set. Two further candidates were found and dropped; they are listed at the end with the reason. Each one names the choice, the alternatives visible in the diff or file, and the commit that carries it.

**Nothing here is a decision record yet.** Reasons were only filled in where a commit message or a code comment stated one. Everything else reads `reason: owner to supply`. Do not promote a seed into a decision record (PRD section 16.2) until the reason is written, and never set `verified: true`.

PRD section 16.2 requires options, choice, trade-off, status, and theme, and caps the visible note at 120 words. PRD section 16.2 also requires every record to be specific to this project: "I chose TypeScript because it provides type safety" is not a record. Seeds 1, 3, 4, 7, and 8 are the ones that pass that test hardest, because the alternatives are recoverable from the diff.

---

## 1. Write listing updates with UPDATE, not upsert

- Commit: `4f7fb62`
- Choice: `.update(updates).eq("id", id)` for all three listing mutation paths (update fields, deactivate, activate)
- Alternatives in the diff: `.upsert({ id, ...updates }, { onConflict: "id" })`, which is what the code did before
- Reason: stated in the code comment added by the commit. An upsert payload omits `owner_id`, so it fails the INSERT policy `WITH CHECK (owner_id = auth.uid())` even when the row already exists. Evidence: `src/features/listings/hooks/useListing.js` lines 63 to 66.
- Trade-off: reason: owner to supply
- Status: kept
- Theme: security
- Evidence: `src/features/listings/hooks/useListing.js` lines 63 to 66 and 78, 104, 128; commit `4f7fb62`; migration `supabase/migrations/20260802000000_listings_update_policy.sql`
- verified: false

---

## 2. Drop every UPDATE policy on listings by name, then create one

- Commit: `c9a206e`
- Choice: a `DO` block that loops `pg_policies` and drops all UPDATE policies on `listings` regardless of name, then creates a single owner-only policy
- Alternatives in the migration: leaving the existing unversioned policy in place, or creating a second policy alongside it
- Reason: stated in the migration header. The original policies were created manually in the Supabase dashboard and were never versioned, so the name was unknown. Two competing UPDATE policies with conflicting `WITH CHECK` clauses caused the failure. The header also records that if no UPDATE policy existed at all, RLS would silently filter the row rather than raising an error.
- Trade-off: drops any policy that may have served a purpose outside the app, on the owner's own database, and there is no rollback script. reason: owner to supply
- Status: kept
- Theme: security
- Evidence: `supabase/migrations/20260802000000_listings_update_policy.sql` lines 1 to 20 and 31 to 58; commit `c9a206e`
- verified: false

---

## 3. Move the profile completion gate from full_name to location

- Commit: `7e541da`
- Choice: the gate requires `avatar_url` plus a non empty `location`, and `has_complete_profile()` in Postgres checks the same two fields
- Alternatives in the diff: the previous rule, `avatar_url` plus `char_length(trim(full_name)) >= 2`
- Reason: stated in the commit subject. The gate was extended to require avatar plus location instead of avatar plus full name, to auto show on login, and to update the DB RLS function.
- Trade-off: reason: owner to supply. Note for the owner to answer: `full_name` still has a 2 character minimum in the register form, so the two rules are now different.
- Status: kept
- Theme: ux
- Evidence: `src/features/profile/context/ProfileContext.jsx` lines 140 to 143; `supabase/migrations/20260730000000_profile_completion_location.sql`; commit `7e541da`
- verified: false

---

## 4. Read profiles with maybeSingle, and make every migration idempotent

- Commit: `01d4e40`
- Choice: `.maybeSingle()` in every profile read and write, plus `CREATE POLICY IF NOT EXISTS`, plus `console.error` on all query failures
- Alternatives in the diff: `.single()`, and `CREATE POLICY` without the guard
- Reason: stated in the commit body. `.single()` returns 406 when no profile row exists, which is the normal case for a new user. 400 came from unknown upsert columns or an RLS mismatch. The bare `CREATE POLICY` errored on re-run.
- Trade-off: reason: owner to supply
- Status: kept
- Theme: data
- Evidence: commit `01d4e40`; `src/features/profile/context/ProfileContext.jsx`; `src/features/profile/hooks/useProfile.js`; `supabase/migrations/20260731000000_profiles_schema_and_rls.sql`
- verified: false

---

## 5. Clamp a same day booking to 1 night instead of rejecting it

- Commit: `6cebfbf`
- Choice: `Math.max(1, differenceInCalendarDays(...))` in the calendar, plus a `nights < 1` guard on the confirm handler, plus a `totalPrice <= 0` guard in the hook
- Alternatives in the diff: the previous `differenceInCalendarDays` alone, which returned 0 for a same day range and produced a 0 night, 0 price booking
- Reason: stated in the commit subject. It fixes the 0 nights bug on same day booking, and the commit subject says "clamp to 1 night, add validation, defense-in-depth". The choice of clamping rather than rejecting is not explained. reason: owner to supply
- Trade-off: reason: owner to supply. Note for the owner to answer: clamping silently turns a same day selection into a 1 night booking rather than telling the user that same day rentals are not allowed.
- Status: kept
- Theme: ux
- Evidence: `src/features/bookings/components/AvailabilityCalendar.jsx` line 152 and the handler guard; `src/features/bookings/hooks/useCreateBooking.js` lines 63 to 68; commit `6cebfbf`
- verified: false

---

## 6. Let a service worker read VAPID keys and the access token from IndexedDB

- Commit: `8d779ab`
- Choice: a shared IndexedDB store, database `rentit-push`, object store `keys`, written by `pushStore.js` and read by `public/sw.js`, because the worker cannot reach `localStorage` or `import.meta.env`
- Alternatives in the diff: reason: owner to supply. No alternative appears in the diff; the constraint is documented in the file header rather than argued from a rejected option.
- Reason: partially stated. The `public/sw.js` header states the constraint: the service worker scope has no access to `localStorage` or `import.meta.env`, so it reads the VAPID public key, Supabase URL and anon key, and the user's access token from the shared IndexedDB store. Why IndexedDB rather than re-fetching inside the worker is not stated.
- Trade-off: puts an access token in IndexedDB, readable by any script on the origin. reason: owner to supply
- Status: kept
- Theme: architecture
- Evidence: `public/sw.js` header comment and the `openPushDb` and `getPushKey` helpers; `src/features/notifications/lib/pushStore.js`; commit `8d779ab`
- verified: false

---

## 7. Replace the Database Webhooks UI with Postgres triggers and pg_net

- Commit: `e2a1aaf` for the backend, `20260804000000_webpush_pg_net_triggers.sql` in the same commit
- Choice: `CREATE TRIGGER` on `bookings` and `messages` calling `net.http_post()` to the Edge Function, with the webhook secret read at call time from Supabase Vault
- Alternatives in the migration: the Supabase dashboard Database Webhooks UI, which the header says is not available on this project. The header also documents a fallback to a plain `app_settings` table if Vault is unavailable on the plan.
- Reason: stated in the migration header. It replaces the dashboard Database Webhooks UI, not available on this project, and posts the same payload shape the Edge Function already expected.
- Trade-off: the fallback stores the secret as plain text in the database instead of encrypted at rest. The header states this trade-off explicitly, so it is owner confirmed.
- Status: kept
- Theme: architecture
- Evidence: `supabase/migrations/20260804000000_webpush_pg_net_triggers.sql` header and the fallback note at the end of the file; commits `e2a1aaf`, `8d779ab`
- verified: false

---

## 8. Two attempts to pin the chat input to the viewport bottom, both reverted

- Commits: `b15e4f9` reverting `2735700`, and `25ed7b4` reverting `ec51a62`
- Choice: status `reversed`. The approach that survived is narrower: `h-screen` is scoped to chat routes only, which is what commit `3ebe655` ("fix: scope h-screen to chat pages only, restore min-h-screen for all routes") did after reverting `ef39dfb` ("fix: scope h-screen to chat routes so h-full descendants resolve").
- Alternatives in the diffs: moving `overflow-hidden` to `main` (`ec51a62`, reverted), breaking the height chain at the root (`2735700`, reverted), then scoping `h-screen` to the chat routes only
- Reason: reason: owner to supply. The reverts carry no explanation beyond "This reverts commit ...".
- Trade-off: reason: owner to supply
- Status: reversed
- Theme: architecture
- Evidence: commits `fc687a1`, `c97c6ef`, `ec51a62`, `2735700`, `b15e4f9`, `25ed7b4`, `ef39dfb`, `3ebe655`
- verified: false

---

## Reversed and open minimum

PRD section 16.2 requires at least 2 decisions across the portfolio with status `reversed` or `open`, and site level decisions never count toward a project's 3. RentIt currently offers one reversed seed (8) and one open candidate (6, the IndexedDB access token). That is enough for RentIt on its own, but the reversed one cannot be written up as a record until its reason exists, so treat the reversed minimum as not yet met.

## What I could not find

- No pull requests are referenced in any commit message, so no seed cites a PR.
- No commit explains a deletion of a feature or a rollback of a schema change. The only reverts in the full history are the two in seed 8.
- No performance measurement is recorded anywhere in the history. Commit `c28b783` ("Lighthouse optimizations") touches 26 files and names five areas but records no before or after numbers, so it cannot support a performance claim or a performance themed decision.

## Dropped to stay at eight

Both are real and traceable. I cut them because a record needs options, and neither has a recoverable alternative.

- **No UPDATE policy on `push_subscriptions`** (commit `e2a1aaf`, `supabase/migrations/20260803000000_create_push_subscriptions.sql`). The choice and its reason are stated in the file: deny UPDATE by default and treat key rotation as delete plus reinsert. There is no alternative in the diff to show. It is folded into seed 7's evidence rather than given its own record.
- **Folder restructure from type based to feature based** (commit `cb6e36c`). The diff does show the alternatives, because `src/contexts`, `src/hooks`, `src/lib`, `src/types` were emptied and removed. What is missing is any stated reason for preferring feature based, so it fails PRD section 16.2's bar on its own. Worth raising with the owner: the rationale is the kind of thing that makes a good architecture decision if it can be articulated.