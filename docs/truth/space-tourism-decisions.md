# Space Tourism decision seeds

Five candidates from source HEAD `90f8926c4c39a9737f61990c39180a849468ef2a`. Source paths and line numbers refer to `C:\Users\hp\Desktop\Frontend-mentor\space-tourism-website-main`; see portfolio `docs/truth/space-tourism.md:1` for source/deployment limits and design attribution.

**These are not finished decision records.** Earlier code is an evidenced alternative, not proof of every option considered. Source documentation is used for stated intent only where it does not contradict the diff; measured outcomes remain unverified. Missing rationale stays `reason: owner to supply`, and statuses describe the code pending owner review. All seeds remain `verified: false` (portfolio `AGENTS.md:5`). Final records must meet portfolio `PRD.md:430` (§16.2), including specificity and the visible 120-word limit.

## 1. Import crew assets instead of pointing at source-directory URLs

- Commit: `a97919d`.
- Choice: import the WebP and PNG files and assign the imported URLs to the crew data records.
- Alternatives in the diff: literal `/src/assets/crew/...` URLs for the same files.
- Reason: the commit subject explicitly says "import crew assets so Vite bundles them for production".
- Trade-off: asset references now depend on the bundler import graph, with both formats represented. Actual output size and a production rendering check are unverified; other costs: reason: owner to supply.
- Status: kept.
- Theme: architecture.
- Evidence: `space-tourism/src/data/crew.js:1`, `space-tourism/src/pages/Crew.jsx:67`; diff `a97919d^..a97919d`.
- verified: false

## 2. Load the four page components through the router's lazy API

- Commit: `dd21daa`.
- Choice: replace direct page imports with route-level `lazy` functions and dynamic imports for Home, Destination, Crew and Technology.
- Alternatives in the diff: eager imports and `element` declarations for all four page components.
- Reason: reason: owner to supply. The performance guide says the opposite decision was retained, so it cannot establish the rationale for the current implementation.
- Trade-off: route resolution now depends on loading its module. Any latency/initial-bundle benefit or cost is unverified; no measurement report accompanies the code.
- Status: kept in inspected code; the contradictory written account needs owner resolution.
- Theme: performance.
- Evidence: `space-tourism/src/main.jsx:7`; diff `dd21daa^..dd21daa`; conflicting account in `space-tourism/PERFORMANCE_OPTIMIZATIONS.md:246`.
- verified: false

## 3. Shorten the crew and planet image transitions

- Commit: `dd21daa`.
- Choice: reduce crew image transition duration from 0.6 to 0.4 seconds and destination image duration from 0.4 to 0.3 seconds.
- Alternatives in the diff: retain those longer configured durations.
- Reason: the performance guide describes the intent as snappier interactions. The claimed frame-rate/TBT results are unverified (`space-tourism/PERFORMANCE_OPTIMIZATIONS.md:111`).
- Trade-off: the guide describes less smooth-feeling motion in exchange for perceived responsiveness, but no user or timing test substantiates that subjective outcome. Accepted cost: reason: owner to supply.
- Status: kept.
- Theme: motion.
- Evidence: `space-tourism/src/pages/Crew.jsx:65`, `space-tourism/src/pages/DestinationPage.jsx:24`; diff `dd21daa^..dd21daa`.
- verified: false

## 4. Configure vendor chunks and Terser for the production build

- Commit: `dd21daa`.
- Choice: add Terser compression with console/debugger removal and explicit chunk names for Framer Motion and React Router.
- Alternatives in the diff: the previous Vite configuration declared plugins without custom build/minification/chunk settings. That is not evidence that Vite previously did no minification.
- Reason: the performance guide describes reducing production code for mobile bandwidth. Its claimed size savings are unverified (`space-tourism/PERFORMANCE_OPTIMIZATIONS.md:184`, `space-tourism/PERFORMANCE_OPTIMIZATIONS.md:280`).
- Trade-off: adds a build dependency and suppresses production console output. Separate chunks do not by themselves prove that every dependency is loaded only on demand.
- Status: kept.
- Theme: performance.
- Evidence: `space-tourism/vite.config.js:7`, `space-tourism/package.json:29`, `space-tourism/src/main.jsx:3`; diff `dd21daa^..dd21daa`.
- verified: false

## 5. Defer crew/planet images but prioritize technology imagery

- Commit: `dd21daa`.
- Choice: add lazy loading and async decoding to crew/planet images, while the new Technology implementation uses an eager, high-priority landscape/portrait picture.
- Alternatives in the diff: the earlier crew/planet tags had no loading/decoding attributes. The guide's lazy Technology example is not evidence that this version was actually retained or trialed.
- Reason: reason: owner to supply, especially why the image groups use different priorities. The guide does not explain the implementation faithfully.
- Trade-off: image priority now differs by page. Effects on visible image arrival and LCP are unverified; no measured improvement is inferred from the attributes alone.
- Status: kept.
- Theme: performance.
- Evidence: `space-tourism/src/pages/Crew.jsx:69`, `space-tourism/src/pages/DestinationPage.jsx:28`, `space-tourism/src/pages/Technology.jsx:62`, `space-tourism/PERFORMANCE_OPTIMIZATIONS.md:82`; commit `dd21daa`.
- verified: false

## What must not become a decision record yet

- The guide's claimed reversal from lazy routes to direct imports is contradicted by `dd21daa` and current `space-tourism/src/main.jsx:14`. Do not count that narrative as a verified `reversed` decision or mark it `open` merely to fill a quota. Owner intent and any missing experiment evidence are unverified.
- Adding `display=swap` and replacing glob imports are not supported descriptions of the `dd21daa` changes. The parent already used swap and direct background imports (diff `dd21daa^..dd21daa`; `space-tourism/src/styles/index.css:1`, `space-tourism/src/App.jsx:5`).
- No generic "accessible tabs" or "I designed the art direction" decision is supported here. The supplied design is credited to Frontend Mentor, and the selectors lack the complete tabs behavior claimed by such wording (`README.md:210`, `space-tourism/src/pages/DestinationPage.jsx:41`, portfolio `PRD.md:1310`, §38).
- These drafts do not meet the verified-record or reversed/open minima. The owner still supplies actual options, reasons and accepted costs, resolves conflicting documentation and approves any publishable record (portfolio `PRD.md:430`, `PRD.md:432`, §16.2; `PRD.md:1327`, §39).
