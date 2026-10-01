# Space Tourism truth sheet

Source repository: `C:\Users\hp\Desktop\Frontend-mentor\space-tourism-website-main`
Inspected at HEAD `90f8926` (`90f8926c4c39a9737f61990c39180a849468ef2a`, 2026-07-08, "Favicon updated").
Origin: `https://github.com/Olamilekan-oluwayomi/space-tourism-website-main.git` (source repository `.git/config`, read with `git config remote.origin.url`). Repository visibility: unverified.

Read-only source and history inspection. Source paths and line numbers below refer to that repository at this commit; explicitly identified portfolio paths refer to this repository. This is draft evidence, not approved public copy. `verified: false`; only the owner changes verification (portfolio `AGENTS.md:5`).

## 1. Identity, origin and application root

- The README names the project "Space Tourism Website" and explicitly credits Frontend Mentor for the design. The case study must distinguish implementing the supplied design from the owner's engineering choices (`README.md:1`, `README.md:206`, `README.md:210`; portfolio `PRD.md:1310`, §38).
- The application root is `space-tourism/`, not the repository root. Its manifest declares the Vite scripts and `space-tourism/src/main.jsx` mounts the router (`README.md:71`, `space-tourism/package.json:6`, `space-tourism/src/main.jsx:46`).
- The public project year, exact owner contribution and any departures from the supplied design remain unverified. The inspected commit date is not owner confirmation of a portfolio year (`90f8926`, portfolio `PRD.md:1484`, Appendix A).

## 2. Live URL and reachability evidence

Owner-supplied URL: `https://space-tourismx.vercel.app/`. The owner supplied this address in the audit conversation. Its association with the inspected commit is unverified.

Read-only observation recorded for this sheet with `Invoke-WebRequest -UseBasicParsing -Method Get`:

```text
checkedUtc: 2026-10-01T12:26:43Z
requestedUrl: https://space-tourismx.vercel.app/
status: 200
finalUrl: https://space-tourismx.vercel.app/
title: space-tourism
```

This checks only the root HTML response. The returned title matches `space-tourism/index.html:11`; direct navigation to nested routes, mobile rendering, iframe compatibility and deployed-source parity remain unverified. No browser screenshots were captured.

## 3. Stack with declared versions

These are manifest declarations, not installed or deployed versions (`space-tourism/package.json:12`, `space-tourism/package.json:20`):

| Technology | Declaration | Evidence |
| --- | --- | --- |
| React / React DOM | `^19.2.7` | `space-tourism/package.json:15` |
| React Router DOM | `^7.18.1` | `space-tourism/package.json:17` |
| Framer Motion | `^12.42.2` | `space-tourism/package.json:14` |
| Tailwind CSS / Vite integration | `^4.3.2` | `space-tourism/package.json:13`, `space-tourism/package.json:18` |
| Vite | `^8.1.1` | `space-tourism/package.json:30` |
| Terser | `^5.49.0` | `space-tourism/package.json:29` |

The code is JavaScript/JSX. Vite registers React and Tailwind, enables Terser with console/debugger removal, and names separate Framer Motion and React Router vendor chunks. The declared scripts are `dev`, `build`, `lint` and `preview`; none was run (`space-tourism/src/main.jsx:1`, `space-tourism/vite.config.js:5`, `space-tourism/package.json:6`).

## 4. Routes, content and state

`createBrowserRouter` defines four nested routes, each with a route-level lazy import. `App` supplies the header/background and renders `Outlet` (`space-tourism/src/main.jsx:7`, `space-tourism/src/App.jsx:36`).

| Route | Source-backed content and interaction | Evidence |
| --- | --- | --- |
| `/` | Home text and an Explore link to `/destination` | `space-tourism/src/pages/HomePage.jsx:3` |
| `/destination` | Local selection among Moon, Mars, Europa and Titan; image, description, distance and travel-time fields | `space-tourism/src/pages/DestinationPage.jsx:5`, `space-tourism/src/data/destinations.js:7` |
| `/crew` | Local selection among four crew entries, with role, name, biography and image | `space-tourism/src/pages/Crew.jsx:5`, `space-tourism/src/data/crew.js:10` |
| `/technology` | Local selection among launch vehicle, spaceport and space capsule entries | `space-tourism/src/pages/Technology.jsx:5`, `space-tourism/src/data/technology.js:8` |

Selected items are local indexes initialized to zero, not URL parameters or persisted preferences. The content comes from bundled modules; there is no remote content fetch in these page implementations (`space-tourism/src/pages/DestinationPage.jsx:6`, `space-tourism/src/pages/Crew.jsx:6`, `space-tourism/src/pages/Technology.jsx:6`). The travel figures and biographies are authored demo content, not measurements or achievements of the owner's project (`space-tourism/src/data/destinations.js:7`, `space-tourism/src/data/crew.js:10`).

The mobile menu opens through its labeled button and closes through its close button or a selected navigation link. A custom loading/error screen, not-found route or authored no-JavaScript content fallback is not present in the inspected router/HTML entry (`space-tourism/src/components/Header.jsx:63`, `space-tourism/src/components/Header.jsx:81`, `space-tourism/src/main.jsx:7`, `space-tourism/index.html:14`). Built-in router behavior is not a bespoke implemented state and was not tested.

## 5. Responsive implementation and assets

- **Route backgrounds:** the shell imports mobile, tablet and desktop JPEGs for each route. A `picture` chooses desktop at 1024 px, tablet at 768 px, otherwise mobile. The image is decorative and loads eagerly (`space-tourism/src/App.jsx:5`, `space-tourism/src/App.jsx:21`, `space-tourism/src/App.jsx:45`).
- **Destination:** the layout and planet sizes change through responsive utility classes; the displayed planet is a single imported PNG with `loading="lazy"`, not a width-based source set (`space-tourism/src/pages/DestinationPage.jsx:16`, `space-tourism/src/pages/DestinationPage.jsx:28`, `space-tourism/src/data/destinations.js:2`).
- **Crew:** a `picture` offers WebP with PNG fallback. Both formats are imported so the bundler handles their URLs; images are lazy-loaded (`space-tourism/src/data/crew.js:1`, `space-tourism/src/pages/Crew.jsx:60`, commit `a97919d`).
- **Technology:** landscape imagery is the default and portrait imagery is selected at 1024 px. Its image is eager with high fetch priority, unlike the crew/planet tags (`space-tourism/src/pages/Technology.jsx:62`, `space-tourism/src/data/technology.js:1`).
- **Typography:** Bellefair, Barlow and Barlow Condensed are requested from Google Fonts with `display=swap`. Tailwind v4 theme tokens live in CSS, including spacing/type scales labeled as coming from the style guide (`space-tourism/src/styles/index.css:1`, `space-tourism/src/styles/index.css:5`).

The repository includes `preview.jpg` and design-reference-looking files such as `space-tourism-website/Desktop - Home.png` and `space-tourism-website/Mobile - Home.png` (tracked tree at `90f8926`). Their capture/provenance is unverified; do not substitute them for evidence of the implemented live page. The portfolio still needs actual Home/Destination/Crew/Technology captures at 375, 768 and 1280 px (portfolio `PRD.md:1298`, §38).

## 6. Motion and accessibility evidence

Motion is implemented around selected content/images with keyed `AnimatePresence` and `motion` elements. For example, the planet image transition is 0.3 seconds and the crew image transition is 0.4 seconds. The shell itself does not wrap route navigation in a transition component (`space-tourism/src/pages/DestinationPage.jsx:18`, `space-tourism/src/pages/Crew.jsx:59`, `space-tourism/src/App.jsx:58`). These are configured durations, not measured frame-rate or responsiveness results.

| Area | What the source supports | Limit |
| --- | --- | --- |
| Destination selection | Named native buttons change local index | No tablist/tab/tabpanel semantics, selected-state ARIA or arrow-key handler in the component (`space-tourism/src/pages/DestinationPage.jsx:41`) |
| Crew selection | Native dot buttons with "View crew member" labels | No exposed selected state or arrow-key handler; page wrapper is a `section`, not `main` (`space-tourism/src/pages/Crew.jsx:10`, `space-tourism/src/pages/Crew.jsx:43`) |
| Technology selection | Numbered native buttons expose `aria-pressed` | Not an implemented ARIA tabs pattern (`space-tourism/src/pages/Technology.jsx:19`) |
| Mobile menu | Open/close labels and links that close the menu | No Escape handler, focus trap/return, expanded state or backdrop dismissal in the component (`space-tourism/src/components/Header.jsx:63`) |
| Logo | Home link contains an `aria-hidden` SVG | No accessible text/name on that link (`space-tourism/src/components/Header.jsx:17`) |
| Motion preferences | Animated page components and hover transitions | No reduced-motion handling found in these components or global styles (`space-tourism/src/pages/DestinationPage.jsx:18`, `space-tourism/src/pages/Crew.jsx:19`, `space-tourism/src/pages/Technology.jsx:37`, `space-tourism/src/styles/index.css:1`) |

Keyboard, screen-reader, contrast, target-size and reduced-motion behavior were not tested. The README's WCAG and keyboard claims are therefore unverified, and the portfolio must not call this "accessible tabs" merely because selection works by click (`README.md:128`, portfolio `PRD.md:1310`, §38).

## 7. Documentation contradictions and unsupported measurements

1. **Declared stack differs from README prose.** The README says React 18 and React Router v6; the manifest declares React 19 and Router 7 (`README.md:36`, `README.md:40`, `space-tourism/package.json:15`). Use the manifest for the inspected stack, not the prose.
2. **The final routing decision is described backwards.** The performance guide says lazy routing was abandoned for direct imports. Commit `dd21daa` actually replaces direct imports with route-level lazy imports, which remain at HEAD. That written reversal is not supported by this history (`space-tourism/PERFORMANCE_OPTIMIZATIONS.md:246`, `space-tourism/src/main.jsx:14`, diff `dd21daa^..dd21daa`).
3. **The font change did not introduce swap.** The guide attributes improvements to adding `display=swap`; the parent revision already included it. `dd21daa` adds `layer(base)` around the import instead (`space-tourism/PERFORMANCE_OPTIMIZATIONS.md:19`, `space-tourism/src/styles/index.css:1`, diff `dd21daa^..dd21daa`).
4. **The background-import story is not what the diff shows.** The guide says glob imports were replaced with direct imports. The inspected change instead memoizes an existing route lookup and adds eager/asynchronous image attributes; direct imports already existed (`space-tourism/PERFORMANCE_OPTIMIZATIONS.md:157`, `space-tourism/src/App.jsx:5`, diff `dd21daa^..dd21daa`).
5. **Technology examples disagree with the code.** The guide shows a lazy technology image and a 0.3-second content transition; source uses eager/high-priority imagery and 0.35 seconds (`space-tourism/PERFORMANCE_OPTIMIZATIONS.md:82`, `space-tourism/PERFORMANCE_OPTIMIZATIONS.md:128`, `space-tourism/src/pages/Technology.jsx:43`, `space-tourism/src/pages/Technology.jsx:73`).
6. **Image-size claims exceed the source evidence.** `sizes` alone does not establish a choice of smaller image files. Destination uses one `src`; Crew supplies format alternatives but no width/density alternatives. The claimed network savings are unverified without measurements (`README.md:27`, `space-tourism/src/pages/DestinationPage.jsx:28`, `space-tourism/src/pages/Crew.jsx:67`).
7. **Performance numbers lack audit artifacts.** The root README starts from 40 while the guide starts from 43, and 50+ is explicitly a target. FCP/LCP deltas, bundle savings and maintained accessibility/SEO scores have no checked-in Lighthouse report or reproducible measurement log in the inspected tree. Do not publish them as achieved results (`README.md:19`, `README.md:25`, `space-tourism/PERFORMANCE_OPTIMIZATIONS.md:5`, `space-tourism/PERFORMANCE_OPTIMIZATIONS.md:292`, tracked tree at `90f8926`).
8. **Some listed future work already exists.** WebP crew images appear as a future improvement despite already being imported and used as the preferred picture source (`README.md:198`, `space-tourism/src/data/crew.js:1`, `space-tourism/src/pages/Crew.jsx:67`).

These are contradictions in the source project's documentation. This audit records them without changing that repository or treating unverified performance claims as portfolio decisions (portfolio `PRD.md:1305`, §38).

## 8. Tests, publication gaps and owner follow-up

- No test script, tracked automated suite or Lighthouse report was found (`space-tourism/package.json:6`, tracked tree at `90f8926`). No build, lint, browser interaction or accessibility/performance audit was run; pass/fail results are unverified.
- Owner to supply: project year, contribution/design attribution, repository visibility and deployment revision (portfolio `PRD.md:1342`, §39; source `README.md:210`).
- Owner to resolve: the lazy/direct-routing narrative and any claimed before/after results. Supply actual audit artifacts if performance improvements are to be stated; otherwise omit the numbers (`space-tourism/PERFORMANCE_OPTIMIZATIONS.md:246`, portfolio `docs/truth/space-tourism-decisions.md:1`).
- Figures, truthful project copy, stack rationale, approved decisions, static fallback and iframe testing remain open. The truth sheet and seeds do not complete Phase 1 or qualify the project page for publication (portfolio `PRD.md:1280`, `PRD.md:1298`, §38; `PRD.md:1327`, §39).
