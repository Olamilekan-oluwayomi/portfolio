# RentIt case-study draft

Status: owner review draft. `verified: false`. Not published and not eligible for a project route. Publication still requires the evidence, assets and owner-verified decisions in `PRD.md` sections 16.2, 35 and 38.

Source checkout inspected read-only at `f07791db8b241ed22143e5d8c0946a94e728c2a4` in `C:\Users\hp\Desktop\rentit`. All `rentit:` references below are paths in that checkout at this commit. Existing research: `docs/truth/rentit.md`, `docs/truth/rentit-decisions.md`, `docs/seed-promotion-drafts.md` and `docs/phase-1-exit.md`.

This draft separates candidate visitor copy from editorial review notes. It describes implementation, not measured product success. Live backend behavior, customer use, conversion, revenue and concurrency guarantees are unverified. No authenticated activity, booking, message, migration or database write was performed for this draft.

## Header

- Title: RentIt. Evidence: `src/content/work-index.ts`.
- Year: 2026. Evidence: owner confirmation in `docs/phase-1-exit.md`, Appendix A item 4.
- Category: Property marketplace. Evidence: `src/content/work-index.ts`.
- Role: Own build from the start, confirmed in `docs/phase-1-exit.md`, Appendix A item 4. A more specific credit such as sole designer, sole developer or end-to-end ownership is unverified and needs owner wording.
- Tagline: From a listing to a booking request, with the conversation attached.
- Summary: A property marketplace connecting listings, booking requests and conversations, with profile checks and owner controls built into the flow.
- Live link: `https://rentitdaily.vercel.app/`. Evidence: `src/content/work-index.ts` and `docs/phase-1-exit.md`, Appendix A item 6. Current authenticated functionality is unverified.
- Source: `https://github.com/Olamilekan-oluwayomi/rentit`. Evidence: `src/content/work-index.ts`.

Tagline and summary evidence: `rentit:src/features/bookings/hooks/useCreateBooking.js`, `rentit:src/features/messages/hooks/useMessages.js`, `rentit:src/features/listings/hooks/useListing.js`.

## Premise

RentIt is a property marketplace for people listing properties and people requesting a booking. A renter can browse listings, inspect a property, select dates and submit a request. Conversations are attached to bookings, while owners have separate views for incoming requests and their listings. The implementation connects these steps through authentication, profile-completion checks and booking status. This case study follows that path and the concrete failures encountered while building it, rather than treating the marketplace as a collection of screens.

Evidence: `rentit:src/App.jsx`, `rentit:src/features/bookings/hooks/useCreateBooking.js`, `rentit:src/features/bookings/hooks/useBookings.js`, `rentit:src/features/messages/hooks/useMessages.js`; the listing and dashboard inventory in `docs/truth/rentit.md`. Why the owner originally chose this problem, the intended rental duration and any user research are unverified. Those cannot be inferred from the feature set.

## The problem the implementation addresses

Candidate editorial framing: **A listing is only the beginning. The request, permissions and conversation need to remain connected.**

RentIt has different queries for a renter's bookings and an owner's incoming requests. Booking creation has prerequisites and explicit failure paths; messages use the booking id to load their history. The case study can explain those boundaries through one journey. This is an interpretation of the implementation, not evidence that a market or user-research problem was validated.

Evidence: `rentit:src/features/bookings/hooks/useBookings.js`, `rentit:src/features/bookings/hooks/useCreateBooking.js`, `rentit:src/features/messages/hooks/useMessages.js`.

## Follow a booking

These are narrative chapters, not a claim that all production behavior was tested. The five-step structure follows `PRD.md` section 16.3. Real captures are still required by section 38.

| Step | What the visitor should understand | Implementation evidence | Capture needed |
| --- | --- | --- | --- |
| Browse | Search and filter before choosing a listing | Listing inventory in `docs/truth/rentit.md`; `rentit:src/shared/lib/constants.js` | Browse screen with actual filters and results |
| Inspect a listing | Review its details and choose dates | `rentit:src/features/bookings/components/AvailabilityCalendar.jsx`; listing-detail route in `rentit:src/App.jsx` | Detail screen and date selection |
| Request a booking | Sign-in and profile prerequisites precede a pending request; availability is checked again | `rentit:src/features/bookings/hooks/useCreateBooking.js` | Request state, profile-completion gate and overlap/error state |
| Continue the conversation | Messages belong to a booking rather than a disconnected inbox exchange | `rentit:src/features/messages/hooks/useMessages.js` | Booking thread with owner-approved, non-sensitive content |
| Manage the listing | Owners can edit, hide and restore an existing listing | `rentit:src/features/listings/hooks/useListing.js` | Listing management before and after a visibility change |

Do not substitute the homepage's editorial illustration for an application screenshot. Screenshot dimensions, final alt text and captions must follow the actual captured content. No figure filenames, accounts, property records or conversation text are invented here (`PRD.md` section 38).

## Permission map

This table distinguishes UI/query behavior from migration intent. It does not certify the deployed database. RLS policies govern rows inside the database; UI guards alone are not authorization evidence ([Supabase RLS documentation](https://supabase.com/docs/guides/database/postgres/row-level-security)).

| Action | Behavior visible in source | Evidence and boundary |
| --- | --- | --- |
| Open a listing | Listing-detail route belongs to the public layout | `rentit:src/App.jsx`. Live data visibility is unverified |
| Submit a booking | Guest redirected to login; profile gate before submission; inserted row uses current user as renter and starts pending | `rentit:src/features/bookings/hooks/useCreateBooking.js` |
| Create listings, bookings or messages | Versioned INSERT policies require `has_complete_profile(auth.uid())`; later migration changes that check to avatar and location | `rentit:supabase/migrations/20260726010000_require_complete_profile.sql`, `rentit:supabase/migrations/20260730000000_profile_completion_location.sql`. Applied production state is unverified |
| Read renter/owner booking views | Renter query filters their user id; owner query first fetches owned listing ids | `rentit:src/features/bookings/hooks/useBookings.js`. Query scope is not proof of backend enforcement |
| Update a listing | Migration scopes the existing and resulting row to its owner; hook uses UPDATE | `rentit:supabase/migrations/20260802000000_listings_update_policy.sql`, `rentit:src/features/listings/hooks/useListing.js`. Applied production policy is unverified |
| Send booking messages | Migration checks sender identity, completed profile and participation as renter or listing owner | `rentit:supabase/migrations/20260726010000_require_complete_profile.sql`. Applied production policy is unverified |

## Decisions worth explaining

Three draft records are in `docs/rentit-case-study-decisions.json`, using the existing Decision schema in `src/lib/schemas.ts`. All remain `verified: false`. They adapt the evidence and owner testimony already recorded in `docs/seed-promotion-drafts.md`, rather than inventing rationale.

1. **Update an existing listing instead of upserting it.** The mutation needed to change a known row; the old upsert payload omitted the ownership field required by the INSERT policy. Evidence: `rentit:src/features/listings/hooks/useListing.js`, commit `4f7fb62`.
2. **Replace unknown listing UPDATE policies with one owner policy.** The original policy names were not versioned, so the migration discovers and replaces them. The destructive scope and absent rollback are review concerns inferred from the script, not costs quoted from its header. Evidence: `rentit:supabase/migrations/20260802000000_listings_update_policy.sql`, commit `c9a206e`.
3. **Deliver database events through triggers.** The migration states that the dashboard Webhooks UI was unavailable on this project. It does not prove a plan-wide restriction. Secret and endpoint lookups can skip delivery without rejecting the insert. Evidence: `rentit:supabase/migrations/20260804000000_webpush_pg_net_triggers.sql`, commit `e2a1aaf`; owner cost confirmation in `docs/seed-promotion-drafts.md`.

The first two records support listing management. The third is an optional depth chapter about notifications, not a claim that a booking requires push delivery. Production push delivery is unverified (`docs/truth/rentit.md`, open uncertainties).

The alternatives are recoverable from historical code and migration comments. Whether the owner actually weighed all of them, and whether another option was considered, remains unverified. Status `kept` describes the inspected implementation, not owner verification.

## Problems and fixes

### An existing listing could still hit an INSERT policy

Editing, hiding and restoring a listing used upsert. The payload omitted `owner_id`, which the INSERT policy expected even when the intended operation was a change to an existing row. The fix used UPDATE filtered by listing id across all three paths. The hook then selects the changed row and surfaces an error when that operation fails.

Evidence: `rentit:src/features/listings/hooks/useListing.js`; commit `4f7fb62`. The repository records the fix, not a current production success measurement.

### Calendar availability could become stale before submission

A renter could select dates before another approved booking changed availability. The booking hook fetches blocked ranges again before inserting and rejects an overlap with a message asking for different dates. It also stops when the availability query fails. That catches changes visible at the second read; the read and insert remain separate operations, so this is not an atomic concurrency guarantee.

Evidence: `rentit:src/features/bookings/hooks/useCreateBooking.js`. Mocked test cases exist in `rentit:src/features/bookings/hooks/useCreateBooking.test.js`; they were read, not executed in this pass. Deployed concurrency behavior is unverified.

### A same-day selection produced a zero-night booking

The previous day-difference calculation could return zero for a same-day range. The implementation clamps the calendar calculation to at least one night and adds guards against fewer than one night and a non-positive total. That removes the zero-price path in the inspected code. Why clamping was preferred to rejecting the selection, and whether the wording matches the rental model, remain unverified.

Evidence: `rentit:src/features/bookings/components/AvailabilityCalendar.jsx`, `rentit:src/features/bookings/hooks/useCreateBooking.js`; commit `6cebfbf`; `docs/truth/rentit-decisions.md`, seed 5.

## Stack, with evidence rather than invented preferences

These explain what each tool does. They do not assert why it was originally selected over alternatives. Those selection reasons remain unverified and are needed for the final section 16.1 stack copy.

| Technology | Responsibility in the implementation | Evidence |
| --- | --- | --- |
| React | Page and feature components, with hooks managing loading, error and mutation state | `rentit:src/features/bookings/hooks/useCreateBooking.js`, `rentit:src/features/listings/hooks/useListing.js` |
| React Router | Public, guest and authenticated route groups | `rentit:src/App.jsx`, `rentit:src/features/auth/components/ProtectedRoute.jsx` |
| Supabase | Booking/listing queries, authentication integration and booking-message subscriptions | `rentit:src/features/bookings/hooks/useCreateBooking.js`, `rentit:src/features/messages/hooks/useMessages.js`; auth inventory in `docs/truth/rentit.md` |
| Zod | Listing-create and listing-edit validation schemas | `rentit:src/shared/lib/validations.js`; validation inventory in `docs/truth/rentit.md` |
| Vite and Tailwind CSS | Build tooling and styling dependencies | `rentit:package.json`, `rentit:vite.config.js`; stack inventory in `docs/truth/rentit.md` |

## Result we can substantiate

The inspected source implements booking requests with pending status, owner and renter booking queries, booking-scoped message history and listing-edit/visibility controls. It also contains explicit failures for unavailable dates and failed availability reads. These are concrete implementation outcomes. They do not establish adoption, business results, successful deployed permissions or notification delivery.

Evidence: `rentit:src/features/bookings/hooks/useCreateBooking.js`, `rentit:src/features/bookings/hooks/useBookings.js`, `rentit:src/features/messages/hooks/useMessages.js`, `rentit:src/features/listings/hooks/useListing.js`. No product metrics or current test-pass counts are asserted.

## What I would change

Proposed reflection for owner review, not the owner's confirmed position:

> The next improvement would be to make the database setup reproducible and verify booking conflicts at the write boundary. The repository does not contain the original creation migrations for several core tables, and the availability check happens before a separate insert. I would also revisit how a same-day selection is explained: clamping it to one night prevents a zero total, but the product should make that rule clear. Those are proposals to review, not changes completed in this build.

Evidence for the gaps: `docs/truth/rentit.md`, database and uncertainty sections; `rentit:src/features/bookings/hooks/useCreateBooking.js`; commit `6cebfbf`. The proposed priorities and first-person wording are unverified until the owner approves them. No reversed/open decision is fabricated from these recommendations.

## Owner review needed

1. What prompted you to build RentIt, who was it intended for, and how should your personal contribution be credited? Existing own-build confirmation: `docs/phase-1-exit.md`, Appendix A item 4.
2. For the three draft decisions, were the listed alternatives actually considered? Was there another option? Does the accepted-cost wording match your experience? Source drafts: `docs/rentit-case-study-decisions.json`, `docs/seed-promotion-drafts.md`.
3. Is the proposed reflection your actual position? In particular, why did you choose one-night clamping over rejecting a same-day selection? Evidence gap: `docs/truth/rentit-decisions.md`, seed 5.

## Remaining publication gates

- Owner-approved copy, contribution wording, tool-selection reasons and at least three owner-verified decisions (`PRD.md` sections 16.1, 16.2 and 38). The agent never sets `verified: true`.
- Current deployed journey and permissions evidence; push delivery only if that claim will be included (`docs/truth/rentit.md`, open uncertainties).
- Real five-step screenshots, profile-completion evidence and privacy-reviewed conversation material. At least four figures, or the bespoke piece plus two figures, with dimensions, alt text and captions (`PRD.md` section 38).
- Static fallback and OG image; project schema validation and publication checks (`PRD.md` section 38; `src/lib/schemas.ts`, `src/lib/content.ts`).
- No route or homepage case-study link until these gates pass. R0 continues to show its existing approved listing and external links (`PRD.md` section 39; `src/content/release.ts`, `src/content/work-index.ts`).
