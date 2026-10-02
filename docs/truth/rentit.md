# RentIt truth sheet

Source repository: `C:\Users\hp\Desktop\rentit`
Inspected at HEAD `f07791d` (`f07791db8b241ed22143e5d8c0946a94e728c2a4`, 2026-07-31, "docs: update README for favorites, web push notifications, and co-located tests")
Origin: `https://github.com/Olamilekan-oluwayomi/rentit.git` (`git config remote.origin.url`). Repository visibility: public. Verified 2026-10-02 by loading the repository page, which returns a repository view and not a 404 and reports 128 commits.
Read-only inspection. Nothing in the RentIt repository was modified.
Every claim below cites a file path or a commit hash. Anything I could not confirm from the repository is marked "unverified".

## Stack with versions

Declared ranges are from `package.json`. Installed versions are read from `node_modules/*/package.json` on this machine, which reflects one `npm install` and may not match any other checkout.

| Package | Declared | Installed here |
| --- | --- | --- |
| react | `^19.2.7` | 19.2.8 |
| react-dom | `^19.2.7` | 19.2.8 |
| react-router-dom | `^7.18.1` | 7.18.1 |
| @supabase/supabase-js | `^2.110.8` | 2.110.8 |
| tailwindcss | `^4.3.3` | 4.3.3 |
| @tailwindcss/vite | `^4.3.3` | not read separately |
| vite | `^8.1.1` | 8.1.5 |
| motion | `^12.42.2` | 12.42.2 |
| zod | `^4.4.3` | 4.4.3 |
| react-hook-form | `^7.82.0` | not read separately |
| react-day-picker | `^10.0.1` | not read separately |
| date-fns | `^4.4.0` | not read separately |
| lucide-react | `^1.26.0` | not read separately |
| react-dropzone | `^19.1.1` | not read separately |
| @hookform/resolvers | `^5.4.0` | not read separately |
| vitest | `^4.1.10` | 4.1.10 |
| @playwright/test | `^1.62.0` | 1.62.0 |
| eslint | `^10.6.0` | not read separately |

Node runtime on this machine: v24.16.0. The README states "Node.js 18+" as a prerequisite (`README.md`).

Build and test entry points, from `package.json`: `dev`, `build` (vite build), `lint` (eslint .), `preview`, `test` (vitest), `test:e2e` (playwright test), `test:e2e:ui`. Vitest is configured with jsdom, globals on, setup file `./src/test/setup.js`, and `src/test/e2e/**` excluded (`vite.config.js`). Playwright targets `http://localhost:5173`, Chromium only, `workers: 1`, and starts the Vite dev server itself (`playwright.config.js`).

`rollup-plugin-visualizer` writes bundle analysis to `stats.html` and opens a browser on build (`vite.config.js`). `stats.html` is gitignored (`.gitignore`) but a copy is tracked in the repo from earlier builds.

Edge Function runtime is Deno, not Node. `supabase/functions/send-notification/index.ts` imports `jsr:@supabase/supabase-js@2` and `npm:@pushforge/builder@2`.

## Live URL

unverified. No deployment URL appears anywhere in the repository. I searched the full tracked tree for `vercel.app`, `netlify.app`, `github.io` and any rentit host pattern with `git grep` and found nothing.

What is present instead:

- `vercel.json` contains only an SPA rewrite of `/(.*)` to `/index.html`. It is evidence of a Vercel deployment target, not a URL.
- A Supabase project ref `wyvjiwlwwemtaintqibv` is hardcoded in `supabase/migrations/20260804000000_webpush_pg_net_triggers.sql` as part of the Edge Function endpoint `https://wyvjiwlwwemtaintqibv.supabase.co/functions/v1/send-notification`, and in `supabase/.temp/project-ref` (that directory is gitignored). This is a backend host, not the public site.
- `public/robots.txt` is `User-agent: *` / `Allow: /` with no sitemap line.

Before any public copy claims RentIt is live, the owner must supply the URL.

## Routes

All client-side routes are declared in `src/App.jsx` lines 90 to 138. There is no server router.

Public layout group (`PublicLayout`, no auth guard):

| Path | Element | Guard |
| --- | --- | --- |
| `/` | `RootRoute` | none, swaps component on auth state |
| `/confirm` | `EmailConfirmationPage` | none |
| `/reset-password` | `ResetPasswordPage` | none |
| `/listings/:id` | `ListingDetailPage` | none |
| `/about` | `AboutPage` | none |
| `/contact` | `ContactPage` | none |
| `/privacy` | `PrivacyPage` | none |
| `/terms` | `TermsPage` | none |
| `/pricing` | `PricingPage` | none |
| `/users/:userId` | `PublicProfilePage` | none |
| `/login` | `LoginPage` | `GuestRoute` |
| `/register` | `RegisterPage` | `GuestRoute` |
| `/forgot-password` | `ForgotPasswordPage` | `GuestRoute` |

Authenticated layout group (`AppLayout`, loads `ProfileCompletionOverlay`):

| Path | Element | Guard |
| --- | --- | --- |
| `/profile` | `ProfilePage` | `ProtectedRoute` |
| `/listings/new` | `NewListingPage` | `ProtectedRoute` |
| `/listings/:id/edit` | `EditListingPage` | `ProtectedRoute` |
| `/inbox` | `InboxPage` | `ProtectedRoute` |
| `/favorites` | `FavoritesPage` | `ProtectedRoute` |
| `/booking/:id` | `BookingChatPage` | `ProtectedRoute` |
| `/my-bookings` | redirect to `/dashboard` | `ProtectedRoute` |

`/my-bookings` is a redirect, not a page. It exists because a link pointed at a route that did not exist; the blank page was fixed in `117e205` ("fix: blank page on 'View My Bookings' - undefined /my-bookings route").

Dashboard group, lazy loaded shell (`DashboardShell`) with its own chrome:

| Path | Element |
| --- | --- |
| `/dashboard` (index) | `Home` |
| `/dashboard/analytics` | `Analytics` |
| `/dashboard/listings` | `Listings` |
| `/dashboard/bookings` | `Bookings` |
| `/dashboard/messages` | `Messages` |
| `/dashboard/notifications` | `Notifications` |
| `/dashboard/settings` | `Settings` |

Guards: `ProtectedRoute` renders a loading state while auth resolves, then `<Navigate to="/login" replace />` when there is no user (`src/features/auth/components/ProtectedRoute.jsx` lines 23 to 34). `GuestRoute` does the mirror image for `/login`, `/register`, `/forgot-password`.

The root route is deliberately not a redirect. `RootRoute` renders `LandingPage` while auth is loading or when there is no user, and swaps to `HomePage` only after a session is confirmed. `LandingPage` is the one eagerly imported page so it paints without waiting on a network session lookup; the code comment in `src/App.jsx` lines 65 to 78 states the trade-off that a returning logged-in user may see the landing page flash on refresh.

Most routes are `lazy()` loaded behind a single `Suspense` with a spinner fallback (`src/App.jsx` lines 27 to 63).

## Features that exist in code

### Listings

- Browse grid with search, category, price, and location filters, sort by newest / oldest / price ascending / price descending, 12 per page. Filter defaults live in `src/shared/lib/constants.js` as `DEFAULT_FILTERS`; `LISTINGS_PER_PAGE = 12`; nine categories in `CATEGORIES`; four sort options in `SORT_OPTIONS`.
- Create, edit, soft delete and hard delete. `useListing` (`src/features/listings/hooks/useListing.js`) performs update, deactivate, and delete. All three write paths use `.update().eq("id", id)` rather than upsert, and the reason is written in the file: an upsert payload omits `owner_id` and fails the INSERT policy check even for existing rows (commit `4f7fb62`).
- Image upload, 1 to 5 images, JPEG / PNG / WEBP, 5 MB cap (`MAX_LISTING_IMAGES`, `MIN_LISTING_IMAGES`, `MAX_IMAGE_SIZE_MB`, `ALLOWED_IMAGE_TYPES` in `src/shared/lib/constants.js`). The same limits are re-declared independently in `src/shared/lib/validations.js`, whose comment says it mirrors the constants file. Listing images are compressed client side to 1200x1200 JPEG at quality 0.8; the dimensions are passed at the call sites in `NewListingPage.jsx` line 78 and `EditListingPage.jsx` line 89, and `compressImage` itself defaults to 512x512 at 0.8 (`src/utils/imageCompression.js` lines 26 to 28). Commit `39b326e`.
- Form validation with Zod: `listingFormSchema` for create (images required), `listingEditFormSchema` for edit (images optional, capped at 5) (`src/shared/lib/validations.js`).
- Gallery with keyboard navigation and a lightbox (`src/features/listings/components/ImageGallery.jsx`, `ListingGallery.jsx`).

### Bookings

- Date range selection with blocked-date awareness via `react-day-picker` (`src/features/bookings/components/AvailabilityCalendar.jsx`).
- Re-validation of availability at submit time before insert, described in the file header as a race-condition defense against two renters confirming the same range (`src/features/bookings/hooks/useCreateBooking.js` lines 8 to 22 and the check at line 74 onward).
- Same-day bookings clamp to 1 night rather than producing a 0-night, 0-price booking. Defensive in three places: `Math.max(1, ...)` in the calendar, a `nights < 1` guard on the confirm handler, and a `totalPrice <= 0` guard in the hook (commit `6cebfbf`).
- Statuses pending, approved, declined, completed, cancelled, rendered by `StatusBadge`.
- Owners block and unblock date ranges with an optional reason, stored in the `availability` table.

### Auth

- Email and password sign-up and sign-in, `supabase.auth.getSession()` on mount plus `onAuthStateChange` subscription (`src/features/auth/context/AuthContext.jsx`).
- Google OAuth via `signInWithOAuth`.
- Email confirmation flow, redirect target `${window.location.origin}/confirm` set as `emailRedirectTo` at sign-up (`AuthContext.jsx`).
- Forgot and reset password pages.
- Terms and Privacy acceptance at sign-up: required checkbox, submit disabled until checked, timestamps and versions (`TERMS_VERSION`, `PRIVACY_VERSION`, both `"1.0"`) passed through `signUp` metadata into the profile upsert (commit `d1e049c`).
- Profile creation is triggered by a database trigger, not the client. The client upserts a partial profile row to fill gaps, and retries once after 800 ms because the trigger is async (`RETRY_DELAY = 800` at `src/features/profile/context/ProfileContext.jsx` line 24, used at line 98; commit `209dc74`).
- `.single()` was replaced with `.maybeSingle()` everywhere in the profile read and write path because a new user has no profile row yet and `.single()` returns 406 (commit `01d4e40`).

### Profile

- Edit name, bio, location. Avatar upload compressed to 512x512 JPEG at 0.8 before upload, using the `compressImage` defaults with no overrides (`src/features/profile/hooks/useProfile.js` line 93 calls `compressImage(file)`; defaults at `src/utils/imageCompression.js` lines 26 to 28). Commit `ef7c312`. Initials fallback. Auto-detected location via the browser Geolocation API (`src/shared/hooks/useCurrentLocation.js`).
- Avatar filenames are made unique per upload to defeat stale cached images (commit `c8c80ec`).
- OAuth avatar is read from `picture` or `avatar_url` metadata and backfilled if missing (`src/features/profile/context/ProfileContext.jsx` lines 43 to 50 and 107 to 118).
- Public profile at `/users/:userId`, read only, with rating summary and active listings (`src/features/profile/components/PublicProfilePage.jsx`, commit `85cd190`).
- Profile completion gate: a non dismissable overlay that blocks progress until the profile is complete, backed by server side enforcement. The gate requires `avatar_url` plus `location` (`isProfileComplete`, `src/features/profile/context/ProfileContext.jsx` lines 140 to 143). It used to require `avatar_url` plus `full_name`; the requirement moved to `location` and the SQL function was updated to match in the same commit (commit `7e541da`, migration `20260730000000_profile_completion_location.sql`).

### Favorites

- Heart toggle on listing cards, `/favorites` page, optimistic toggle with rollback and an error toast on failure (`src/features/favorites/hooks/useFavorites.js`, lines 13 to 14 and 77 to 113). Guests get an info toast prompting sign in instead of a write (line 68).

### Messaging

- Real-time message threads per booking via Supabase realtime (`useMessages`, `useConversations`, `useUnreadCount`, `useSendMessage`, `useContactOwner`).
- Optimistic send with auto scroll, unread count badge, mark read on open.
- Realtime channel naming was changed twice in one afternoon. First to an unnamed channel so Supabase auto-generates an id (`9a4560a`), then to an incrementing `messages-${bookingId}-${++channelCounter}` name (`348caf0`), because named channels are singletons and `removeChannel` is async, so under React StrictMode double mount the old channel is still subscribed. The counter comment survives in `src/features/messages/hooks/useUnreadCount.js` lines 20 to 24.
- Per user conversation hiding. This is a soft delete: a row is inserted into `conversation_hidden` with the hiding timestamp, the other participant is unaffected, and the thread reappears if the other side sends a new message after that timestamp (`src/features/messages/hooks/useDeleteConversation.js`, migration `20260801000000_conversation_hidden.sql`, commits `32b7919` and `facdc3f`).
- Conversation rows open the booking; the counterparty avatar and name link to their public profile (`b8a58c5`). A wrong "(owner)" label was fixed by cross checking against `listing.owner_id` rather than trusting a stored field (`45df7a8`).

### Reviews

- Reviews only after a completed booking, enforced by `useReviewEligibility`. Star rating 1 to 5 plus text. Paginated on listing detail. Owner aggregate stored as `average_rating` and `rating_count` on the profile.

### Web push notifications

- Opt-in banner on the dashboard plus a toggle in settings, driven by `usePushNotifications`.
- Service worker at `public/sw.js` is a classic worker with no imports. It cannot read `localStorage` or `import.meta.env`, so the VAPID public key, Supabase URL, anon key, and the user's access token are read from a shared IndexedDB store (`rentit-push`, object store `keys`) written by `src/features/notifications/lib/pushStore.js`. The file header states this constraint explicitly.
- On `pushsubscriptionchange` the worker re-subscribes and upserts with `Prefer: resolution=merge-duplicates` against `push_subscriptions?on_conflict=endpoint`, decoding the user id from the JWT `sub` claim (`public/sw.js`, function `resubscribeAndSync`).
- Delivery path: Postgres triggers call `pg_net` `net.http_post` to the Edge Function, which sends the Web Push request. This replaced the Supabase dashboard Database Webhooks UI, which the migration header says is not available on this project (`20260804000000_webpush_pg_net_triggers.sql`).
- The webhook secret is not in the migration. It is read at call time from Supabase Vault under the name `push_webhook_secret`, and the helper is `SECURITY DEFINER` with `search_path = ''` and `REVOKE ALL` from PUBLIC so only the trigger path can call it. The migration documents a fallback to a plain `app_settings` table if Vault is unavailable on the plan, and states the trade-off: the secret is then stored unencrypted at rest.
- Stale endpoints returning 404 or 410 are pruned (Edge Function header and `push_subscriptions.js`).
- Sign-out clears the stored access token (`src/features/auth/context/AuthContext.jsx`).

### Dashboard

- Home overview stats, My Listings with pending request counts, My Rentals, Requests, Rented Out with earnings, Messages, Analytics, Notifications, Settings (page components under `src/pages/dashboard/`).
- A stat card read 0 for a renter's own bookings and was fixed by changing the query shape (`92d8843`).

### Contact and static pages

- `/contact` inserts into a `contact_messages` table and pre-fills from auth when logged in (`src/pages/ContactPage.jsx` line 82).
- `/pricing` is an explicit "coming soon" placeholder with a CTA back to browse, and no invented tiers (`src/pages/PricingPage.jsx` lines 10 and 23). Footer social links were removed in `05c56d9` because they pointed at generic placeholder URLs.
- Privacy policy dated July 28, 2026 (`src/pages/PrivacyPage.jsx` line 32).

## Auth and Supabase policies

### Tables created by versioned migrations

Present under `supabase/migrations/`: `messages`, `favorites`, `conversation_hidden`, `push_subscriptions`. Each enables RLS.

### Tables not in the repository

`profiles`, `listings`, `bookings`, `availability`, and `reviews` have no `CREATE TABLE` statement anywhere under `supabase/migrations/`. Their column definitions in the README are therefore not fully backed by versioned schema. Two migrations state this directly. `20260802000000_listings_update_policy.sql` says the listings table is created manually in the Supabase dashboard, so its original RLS policies are not versioned, and only the INSERT policy is re-created by an earlier migration. `20260731000000_profiles_schema_and_rls.sql` says schema inspection against the live database confirmed several columns exist and that which policies already exist is unknown.

Consequence for the portfolio: do not claim the RentIt database is reproducible from the repository. The README's schema tables are a description of the live database, not a migration set.

### Policies, as written in the migrations

- `messages`: SELECT and INSERT limited to bookings where the user is renter or the listing owner; INSERT also requires `sender_id = auth.uid()`; UPDATE limited to rows the user did not send, so `is_read` can only be flipped by the recipient. Added to `supabase_realtime`. A `conversation_summaries` view computes latest message and unread count per booking.
- `favorites`: a single `FOR ALL` policy scoped to `auth.uid() = user_id`, backed by `UNIQUE(user_id, listing_id)`.
- `conversation_hidden`: three separate policies for SELECT, INSERT, DELETE, all scoped to `user_id = auth.uid()`. No UPDATE.
- `push_subscriptions`: SELECT, INSERT, DELETE only, all scoped to `user_id = auth.uid()`. Deliberately no UPDATE policy, because key rotation is delete plus reinsert and RLS denies UPDATE by default. The migration notes Postgres does not support `CREATE POLICY IF NOT EXISTS`, so it uses DROP then CREATE.
- `bookings`, `listings`, `messages` INSERT paths all additionally require `has_complete_profile(auth.uid())`, a `SECURITY DEFINER` SQL function kept DRY across the three. `20260726010000_require_complete_profile.sql` creates it checking `avatar_url` and `char_length(trim(full_name)) >= 2`; `20260730000000_profile_completion_location.sql` replaces the function body to check `avatar_url` and a non empty `location`. That replacement is the server side half of commit `7e541da`.
- `profiles`: `20260731000000_profiles_schema_and_rls.sql` adds `terms_accepted_at`, `terms_version`, `privacy_accepted_at`, `privacy_version`, and `bio` if absent, enables RLS, and creates own-row SELECT, INSERT, and UPDATE policies. The migration header records that some policies already existed and that this migration is idempotent by design. That idempotency claim is wrong: the three policy statements use `CREATE POLICY IF NOT EXISTS`, which is not valid PostgreSQL, so the file cannot be applied as written (see uncertainty 7 below).
- `listings` UPDATE: `20260802000000_listings_update_policy.sql` loops over `pg_policies`, drops every UPDATE policy on `listings` by whatever name it has, then creates one canonical policy `USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid())`. The header explains that two competing UPDATE policies with conflicting `WITH CHECK` clauses were the failure mode, and that an absent UPDATE policy would silently filter the row rather than raise an error. Follow-up commit `4f7fb62` then changed the client to stop using upsert so writes go through UPDATE.
- `handle_new_user` trigger, `20260729000000_harden_oauth_trigger.sql`: `SECURITY DEFINER SET search_path = ''`, coalesces the display name across `full_name`, `name`, and `given_name` + `family_name`, coalesces the avatar across `picture` and `avatar_url`, reads the provider from `raw_app_meta_data` then `raw_user_meta_data` defaulting to `email`, adds a `provider` column, and inserts with `ON CONFLICT DO NOTHING`.

## Real states

- Loading: skeleton components. `ListingSkeleton`, `ProfileSkeleton`, `BookingListSkeleton`, and the `Skeleton` design primitive. Counted across 18 files by `git grep -c`.
- Empty: `EmptyState` design primitive plus shared wrappers in `src/shared/components/EmptyState.jsx`, used in the browse grid, favorites, profile, and each dashboard tab.
- Error: per-hook `error` state surfaced as a toast or inline message. Example, `useCreateBooking.js` line 87 raises "Failed to verify availability. Please try again." when the availability re-check itself fails, which is distinct from an overlap rejection at line 109.
- Not found: an invalid listing id renders a not-found state; covered by the E2E suite (`src/test/e2e/browse-book-flow.spec.js`).
- Auth loading: `ProtectedRoute` and `RootRoute` both have an explicit loading branch, so the spinner is a designed state, not a flash.
- Optimistic with rollback: favorites toggle and message send.
- Route level fallback: `PageFallback`, a spinner filling 60vh, wraps all lazy routes.
- Optimistic states: `ToastContext` provides `addToast` with `info` and `error` variants in use, for example "Log in to save listings" as info and "Something went wrong. Please try again." as error.

## Tests

Counts are from counting `it(` and `test(` call sites per file, not from a run. I did not execute the suites.

Unit and integration, 63 test cases across 11 files, all matching the README table exactly:

| File | Cases |
| --- | --- |
| `src/features/auth/components/RegisterPage.test.jsx` | 7 |
| `src/features/auth/context/AuthContext.test.jsx` | 9 |
| `src/features/bookings/components/AvailabilityCalendar.test.jsx` | 6 |
| `src/features/bookings/components/StatusBadge.test.jsx` | 2 |
| `src/features/bookings/hooks/useAvailability.test.js` | 7 |
| `src/features/bookings/hooks/useBookings.test.js` | 7 |
| `src/features/bookings/hooks/useCreateBooking.test.js` | 5 |
| `src/features/listings/components/NewListingPage.test.jsx` | 6 |
| `src/test/integration/BookingFlow.test.jsx` | 4 |
| `src/test/integration/InboxRowNavigation.test.jsx` | 6 |
| `src/test/integration/RegisterFlow.test.jsx` | 4 |

End to end, 7 cases across 2 files, matching the README: `src/test/e2e/auth-flow.spec.js` has 3, `src/test/e2e/browse-book-flow.spec.js` has 4.

Whether all 70 pass right now is unverified. Playwright browsers may not be installed on this machine.

## Architecture notes worth carrying into copy

- Feature based folders, not type based. The move from type based to feature based happened in one commit, `cb6e36c`, and the orphan page cleanup `8a9b263` deleted `src/pages/BookingRequestsPage.jsx` and `src/pages/MyBookingsPage.jsx`, 475 lines, once their UI had been extracted into shared components.
- A design system was built deliberately in two commits: `e543936` initialised Tailwind v4 config and global tokens, `108b8bb` created 13 UI primitives. Six subsequent commits replaced inline styles and buttons with those primitives one area at a time.
- 15 layout components were added in `692fce7`.
- The visualizer writes `stats.html` on every build and opens a browser (`vite.config.js`).

## Open uncertainties

1. Live deployment URL. Not in the repository. Needed before any public claim that RentIt is live.
2. Whether the database can be reproduced from the repository. Five of nine tables have no versioned `CREATE TABLE`. unverified.
3. Whether all 70 tests currently pass. Not executed.
4. Whether the push notification path works end to end in production. The migrations document a required manual Vault secret creation step that I cannot verify from the repository. unverified.
5. Project year and role. The repository contains commit dates in July 2026 and nothing that states the project start or the owner's formal role on it. unverified.
6. `contact_messages` has no migration and no RLS policy in the repository. Whether it exists in the live database and who can read it is unverified. This is worth resolving before the portfolio links to `/contact`.
7. `CREATE POLICY IF NOT EXISTS` is not valid PostgreSQL. **Resolved (2026-10-02).** The `push_subscriptions` note is correct and the profiles migration is wrong. The `CREATE POLICY` grammar has no `IF NOT EXISTS` clause (PostgreSQL 18 manual, `sql-createpolicy.html`), so the three statements at `20260731000000_profiles_schema_and_rls.sql` lines 40, 44 and 48 raise a syntax error, and the header's claim at lines 10 to 11 that every statement uses `IF NOT EXISTS` so the file is fully idempotent does not hold. An October 2025 pgsql-hackers thread discusses a patch to add the clause, which confirms it does not exist today, and a public fix for the same mistake records that it "blocked CI migrations and docker-compose postgres init". Consequence: the migration cannot be applied as written. What the live database actually contains stays unverified, because no database was available and the migration was not run; the file's own header notes that the columns and some policies already existed when it was written, so it may have been applied in the Supabase SQL editor before these statements were added, or the ALTER TABLE half may have applied while the CREATE POLICY half did not. This settles the fact check that blocked RentIt decision seed 4. The seed's idempotency half must be dropped or rewritten as a defect, and only the `maybeSingle` half can carry a record.