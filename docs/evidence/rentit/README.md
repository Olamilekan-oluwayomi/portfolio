# RentIt publication evidence checkpoint

Owner chose the full evidence gate on 2026-10-05 (`docs/rentit-case-study.md`, Decision review confirmation). No case-study route has been published. Release eligibility remains governed by `PRD.md` sections 16.2 and 38 and `src/lib/schemas.ts`.

## Source and live inspection

- Source cap: `f07791db8b241ed22143e5d8c0946a94e728c2a4`, `C:\Users\hp\Desktop\rentit`. No source or database changes were made (`docs/rentit-case-study.md`).
- Live root: `https://rentitdaily.vercel.app/`, supplied in `src/content/work-index.ts`. The observed page says it is a peer-to-peer marketplace for gear and unused items. Its Browse Rentals and host CTAs link to `/register`. This is the signed-out marketing page, not the authenticated browse screen.
- Listing link discovered from that root: `https://rentitdaily.vercel.app/listings/2ec86bee-6c5f-4694-85f5-b4d9f7380446`. The listing title is "PS5 with more than 10 games.". The page states "Log in to check availability and book this listing."
- Capture date: 2026-10-05. Captures use a fresh signed-out browser context with device scale factor 2. The actual browser state was captured without replacing images, injecting data or altering the application.

The observed images rendered as broken placeholders. At the first completed desktop capture, six image elements (listing images and host avatar) had `complete: true` and `naturalWidth: 0`. A subsequent reload also showed zero natural widths, with some images still incomplete. No failing HTTP status was established by the response listener. The underlying cause, whether it affects other browsers, and whether it is a production-wide defect are unverified. Do not describe this as a confirmed storage-policy failure or claim that the gallery works.

## Captures retained for QA, not publication

| File | Viewport / output pixels | What it actually shows | SHA-256 |
| --- | --- | --- | --- |
| `listing-booking-gate-desktop.jpg` | 1440x900 / 2880x1800 | Current public listing, broken image placeholders and signed-out booking gate | `8CDE728E1718C48908EA2267BF41F2317217CDA1A4C83F66F973A77CA9A78FBC` |
| `listing-booking-gate-mobile.jpg` | 390x844 / 780x1688 | Same public listing at mobile width, scrolled to its heading | `77DA2877F3544DEE53197DAEA432891A61D738B72C6AE8079EC3D4F614611195` |

These are two viewport variants of one screen. They do not count as two independent journey steps. Both remain QA-only and have no public application asset path. Suggested final captions and alt text must follow replacement captures, not imply a successful booking or complete image gallery.

## Sharing image prepared

`rentit-og.png` is an original 1200x630 sharing graphic, rendered from `rentit-og.svg` with the existing `design/fonts/geist-mono-var.woff2`. It uses the active blue/grid/framed typography language from `src/styles/tokens.css` and `docs/homepage-direction.md`. Title, purpose, sole developer credit and year come from `docs/rentit-case-study.md` and `docs/phase-1-exit.md`, Appendix A item 4.

Alt text: "Annotated case study for RentIt: earn from what you own, rent what you need for the moment. Built independently by Olamilekan Ilesanmi."

This is a sharing graphic, not an application screenshot or a substitute for a section 38 figure. It has been visually inspected and remains outside public application assets until the project is eligible. Re-rendering the SVG should use the existing Geist Mono font rather than its generic monospace fallback.

## Still needed

| Required evidence | Current state | Reason / source |
| --- | --- | --- |
| Intended problem, audience and contribution | Owner account recorded | `docs/rentit-case-study.md`, Owner clarification of purpose |
| Three decision alternatives and trade-offs | Owner confirmed "all good" | `docs/rentit-case-study.md`, Decision review confirmation |
| Project and decision verification flags | Owner edit pending in the application content files | `src/content/projects/rentit.mdx`, `src/content/decisions/rentit-*.mdx`; `AGENTS.md` forbids agent changes to true |
| Authenticated browse | Missing | Guest root renders marketing; `rentit:src/App.jsx` and live root observation above |
| Listing detail with visible gallery | Needs replacement capture | QA captures show image failures; cause unverified |
| Booking date selection and request state | Missing | Observed page requires login; `rentit:src/features/bookings/hooks/useCreateBooking.js` |
| Booking conversation | Missing | Requires authorized participant view; `rentit:src/features/messages/hooks/useMessages.js` |
| Owner listing management | Missing | Requires owner account; `rentit:src/features/listings/hooks/useListing.js` |
| Profile completion | Missing | `rentit:src/features/profile/context/ProfileContext.jsx`; section 38 asset needs |
| Tool-selection reasons | Proposed wording drafted at owner's request; confirmation pending | `docs/rentit-case-study.md`, Proposed selection reasons for owner confirmation |
| Reflection wording | Proposed paragraph in approved draft; original same-day rationale still unverified | `docs/rentit-case-study.md`, What I would change |
| OG image | Prepared and visually inspected; route integration pending | `rentit-og.svg`, `rentit-og.png` above |
| Static experience | Not complete; needs real journey figures | `PRD.md` section 38 |

Screens must use actual application state with owner-approved public content. Messages and profile material need privacy review before publication. No credentials, access tokens, session storage, private messages or authentication bypass are requested or recorded.

## Draft content prepared

`src/content/projects/rentit.mdx` and the three `src/content/decisions/rentit-*.mdx` records now use the existing `src/lib/schemas.ts` contracts and `src/lib/content.ts` loader. Schema validation passes. All four records remain `verified: false`, media is empty, and OG integration is absent. The planned `walkthrough` experience field is specification data, not a completed component.

`src/content/release.ts` is unchanged and excludes RentIt from publication. No project route, case-study link or production deployment is introduced by these drafts. The records in `docs/rentit-case-study-decisions.json` are the historical review source; future owner verification belongs in the application MDX records. Tool rationale remains explicitly unverified in the draft project until the owner confirms the proposed wording.
