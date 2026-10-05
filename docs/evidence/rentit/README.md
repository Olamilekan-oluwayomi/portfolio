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

## Owner-supplied screenshots, received 2026-10-05

Four screenshots supplied in the conversation are retained unchanged in ignored `artifacts/rentit-owner-captures/`. Each is 1920x1080 pixels and includes browser tabs and address-bar chrome. The original capture date, CSS viewport dimensions and device pixel ratio are unverified. They are supporting evidence, not accepted 2x journey figures. The browser chrome is not being published as part of the portfolio.

| Local original | Observed page / evidence boundary | SHA-256 |
| --- | --- | --- |
| `landing-desktop.png` | Signed-out landing page at `rentitdaily.vercel.app`, with item-rental purpose, search and category links. This is not the browse-results screen | `027E180C9801C3842730067B9FB0D9DBF25C885F51A527903F55C3490DFC10C0` |
| `login-desktop.png` | `/login`, empty email/password fields and Google sign-in button. Successful authentication is not shown | `5669A76A214BD9DC81BD7C3FF0F34B95D98868348E7AEDFE810EF480512162D7` |
| `register-desktop.png` | `/register`, empty account fields and unchecked terms agreement. Account creation and profile completion are not shown | `225AD769678701755E0AC3A3C4183FDD18A2B9C6E09CF12242CC7721E753A44E` |
| `new-listing-desktop.png` | `/listings/new`, signed-in navigation and upper portion of an empty listing-creation form: title, description, category and daily price. Submission, existing-listing editing, hide/restore and booking management are not shown | `B5C5638A5019E92CF8C20188134A3A3D33DC3CE9863FD71B0C3548BEAAA09477` |

The fourth screenshot supplies a real signed-in creation state. It does not replace the owner-management figure for an existing listing in the five-step experience (`PRD.md` section 16.3; `src/components/work/case-study.tsx`). A broken-image indicator is visible in its avatar area; the underlying cause remains unverified. The first three support onboarding context, but none shows the request or conversation flow. No private message content or entered credentials are visible in these supplied screenshots.

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
| Supporting onboarding / listing creation screens | Four owner-supplied originals retained locally; not accepted journey figures | Owner-supplied screenshot inventory above. Creation is distinct from existing-listing management |
| Profile completion | Missing | `rentit:src/features/profile/context/ProfileContext.jsx`; section 38 asset needs |
| Tool-selection reasons | Owner confirmed the drafted reasons | `docs/rentit-case-study.md`, Stack reason confirmation |
| Reflection wording | Owner confirmed the three future priorities; original same-day rationale still unverified | `docs/rentit-case-study.md`, Reflection confirmation |
| OG image | Prepared and visually inspected; route integration pending | `rentit-og.svg`, `rentit-og.png` above |
| Static experience | Static reading path implemented; real journey figures and interactive stepper remain incomplete | `src/components/work/case-study.tsx`; `PRD.md` sections 16.3 and 38 |

Screens must use actual application state with owner-approved public content. Messages and profile material need privacy review before publication. No credentials, access tokens, session storage, private messages or authentication bypass are requested or recorded.

## Draft content prepared

`src/content/projects/rentit.mdx` and the three `src/content/decisions/rentit-*.mdx` records now use the existing `src/lib/schemas.ts` contracts and `src/lib/content.ts` loader. Schema validation passes. All four records remain `verified: false`, media is empty, and OG integration is absent. The review page has a static five-step reading path and permission map; the full screenshot-backed interactive walkthrough remains incomplete.

`src/content/release.ts` is unchanged and excludes RentIt from publication. The records in `docs/rentit-case-study-decisions.json` are the historical review source; future owner verification belongs in the application MDX records. The owner confirmed the tool rationale, which is now recorded in the draft project's stack fields. Missing figures and verification still prevent publication.

## Case-study review page checkpoint

The server-rendered spine in `src/components/work/case-study.tsx` uses native chapter links, source disclosures and a mobile live-product bar. Styling is scoped in `src/components/work/case-study.module.css`; no homepage styles or dependencies changed. `src/app/work/[slug]/page.tsx` generates eligible static pages and exposes explicitly marked drafts only in development or Vercel previews. `src/lib/project-page.test.ts` checks that adding a release slug alone cannot expose an unverified project.

Local browser checks on 2026-10-05: 390x844, 430x932 and 1440x900 had no horizontal overflow; all six chapter targets existed and their links were at least 44px tall. Native navigation reached `#decisions`. With JavaScript disabled, the title, journey, permission map and decision text remained readable. A production build returned HTTP 404 for `/work/rentit`. Review captures are in ignored `artifacts/rentit-case-study-{390,430,1440}.png`. These are portfolio layout checks, not RentIt journey evidence or a complete accessibility certification.
