# Annotated: Product Requirements Document

**Project:** Olamilekan Ilesanmi, personal developer portfolio
**Working title:** Annotated
**Version:** 1.1 (tightening pass on 1.0, concept unchanged)
**Date:** September 30, 2026
**Owner:** Olamilekan Ilesanmi
**Audience:** The owner, and any coding agent (for example OpenCode) implementing the site

## How to read this document

### Owner visual direction amendment, October 4, 2026

The owner rejected the basic homepage and chose a change of visual direction, supplying https://www.iamthecode.xyz/ as inspiration. The implementation uses a graph-paper canvas, a framed monospace name, pastel identity labels, compact navigation and colored project panels. The exact implementation values and the Decision-model record are in `docs/homepage-direction.md` and `docs/homepage-direction.json`.

For this homepage revision, those files supersede the original serif-first presentation, paper/red palette and homepage composition in sections 8, 15 and 22 to 24. Existing fonts are retained, with Geist Mono leading the name and Geist leading body text. The original design specimens remain historical references. Content truth, confidentiality, release sequencing, accessibility, performance budgets and motion restrictions remain binding, including sections 16.2, 35, 38 and Appendix B. R0 lists approved project facts and external links; it does not publish unverified case studies or decision notes.

The owner requested a more distinctive revision after reviewing the first implementation. The active composition is an oversized two-line monospace identity poster with an offset highlighted surname frame, followed by a native project index and an editorial work spread. The October 5 hero checkpoint retains the owner's lime/cobalt experiment, registers the role annotation to the surname and stabilizes the technical skill grouping across mobile sizes (`docs/homepage-direction.md`). RentIt and Foreign Exchange Checker use wide feature rows; Marginalia and Space Tourism form an unequal, staggered pair. Each R0 cover is explicitly labeled as an editorial illustration, not a screenshot or recreated application screen. Covers use original CSS, inline SVG and existing local fonts; real project imagery and decision annotations wait for their evidence and publication gates (`src/app/page.tsx`, `src/components/work/project-panel.tsx`, `src/content/work-index.ts`, `PRD.md` sections 16.2 and 38). Interaction is native anchor navigation and restrained state feedback, with no scroll effects; the contact underline follows section 25.

- MUST, SHOULD and MAY carry their RFC 2119 meaning. MUST items are acceptance criteria. SHOULD items can be traded off with a written reason. MAY items are optional.
- `[CONFIRM]` marks a fact the owner must verify before it appears in public copy. Nothing marked `[CONFIRM]` ships unverified, and the production build checks for it (section 40). Appendix A is the canonical inventory.
- Numbers (budgets, durations, sizes) are starting targets, each with a reason stated nearby. Change them only with a reason.
- Sections 1 to 7 explain why. Sections 8 to 21 define the experience. Sections 22 to 38 define the system. Sections 39 to 44 define how to build and verify it. Appendices list open items and rules for coding agents.
- Example copy is a voice sample, not final text.
- Features tagged *post-R0*, *optional* or *cut-first* sit outside the core product (section 5). They never block a release and never appear in a MUST acceptance criterion.

---

## 1. Executive Summary

Annotated is a portfolio built on one claim: an interface is the visible result of decisions, and most portfolios only show the result.

The site is a quiet, editorial document. At first glance it reads like a well-set page: a name, a role, a current employer, five projects. Depth arrives in three layers, each optional:

1. **Margin notes.** A real engineering decision attached to the exact thing it explains.
2. **Inspect.** A toggle that flips the page over to show the engineering underneath: measured values from this visit (Web Vitals, JavaScript and font bytes, request count) and real component, type and token names. A short, honest panel, not a DevTools clone, and never decoration.
3. **Decision records.** Every decision is indexed across the whole site, including the ones later reversed.

Five projects (RentIt, Space Tourism, Guardrail, Foreign Exchange Checker, Marginalia; five is a target, not a quota, see section 38) each get a bespoke interactive experience on top of a consistent case-study spine, so a visitor can compare judgment across very different products. Five remains the target; four ship in v1, because Guardrail is deferred under section 38.

A recruiter gets what they need in 30 seconds from the homepage or from the plain `/brief` page. A hiring engineer gets evidence of judgment in about three minutes. Everything spectacular is optional depth, never a gate.

**Content beats chrome.** Every layer, animation and interaction must improve comprehension, orientation, evidence or navigation. If removing it loses nothing, it goes. A visitor should remember the projects and the decisions, not the portfolio's mechanics.

The build uses Next.js (App Router), TypeScript and Tailwind CSS, with Motion only where CSS cannot reasonably do the job and the native View Transitions API as progressive enhancement. It deliberately ships no WebGL and no scroll-hijacking library in v1. The concept's strength is reasoning and typography, which cost almost nothing to render, and the money is better spent on content quality, accessibility and speed.

The site is also the first project: its source, its decisions and its performance are all inspectable from inside it.

## 2. Product Vision

**Vision statement:** A portfolio that shows its work the way a good engineer shows it in a design review: here is what I built, here is why it is shaped like this, here is what I would change.

**Tagline candidates:** "Every interface is a set of decisions." / "An annotated build." / "Here are mine, including the ones I'd reverse."

### Challenging the starting concept

The starting concept was: *"This is not a portfolio. It's a record of what I've learned to build."* It is a good instinct with three weaknesses.

1. **"Learned" frames the work as coursework.** It invites visitors to grade a student at the moment the owner wants to be evaluated as a professional (PitchMatter started in August 2026).
2. **It is retrospective.** It says what happened, not how the owner will think on someone else's team.
3. **It is unverifiable.** A claim of learning cannot be checked. A decision can: it has a context, options, a choice and a consequence, all of which a reader can judge.

So the concept moves from **learned** to **decided**: *not a gallery, a record of decisions.*

The other starting idea, "peel back the interface to reveal the engineering," is kept and improved. Peeling back shows structure (what exists). Margin notes show reasoning (why it exists and what it cost). Reasoning is the thing a hiring engineer cannot get from a screenshot, so it becomes the spine. Inspect stays, but every value it shows must be measured or authored, never faked.

## 3. Problem Statement

Developer portfolios fail in three recurring ways.

1. **They are interchangeable.** Hero, about, skills, project cards, contact. A visitor who sees thirty of them in a week remembers none.
2. **They show outputs without reasoning.** Screenshots and a tech-stack list let a hiring engineer judge taste at best. Judgment (why this state model, why this boundary, what was traded away) is invisible.
3. **Spectacle portfolios bury information and punish devices.** Scroll-jacked, WebGL-heavy sites look impressive on a high-end laptop and fail on a mid-range phone, a screen reader, or a recruiter with 30 seconds.

Specific to this owner: the shipped work is broad (a marketplace, a Web3 dApp, an editorial research interface, a data utility, a spatial layout study) and the current title (Frontend Developer Intern) undersells it. A single card template would flatten five different products into five identical thumbnails. The most differentiating evidence is how the owner thinks, and that is exactly what a standard portfolio cannot display.

## 4. Product Goals

| ID | Goal | Measure |
|---|---|---|
| G1 | A visitor identifies role, stack, employer and contact route quickly | On `/`, name, role, employer, stack line and a contact link are visible with zero interaction on a 390x844 and a 1440x900 viewport. `/brief` holds the full fast path within a 1440x900 viewport, no scrolling |
| G2 | Any project is reachable in two interactions or fewer from any page | Verified by e2e test from every route via nav, palette, or Contents list |
| G3 | The site demonstrates judgment, not only polish | The canonical rule in section 16.2: at least 15 records, at least 3 verified per shipped project, at least 2 across the portfolio `reversed` or `open`, all traced to project evidence |
| G4 | The site demonstrates engineering through its own implementation | Inspect shows the v1 set (section 26) for the current route: measured LCP, INP, CLS, JavaScript transferred, font bytes and request count, plus real component, type and token names. Nothing unmeasured is shown as a number |
| G5 | The site is memorable | Five reviewers who did not see the brief each spend 3 minutes on the site, then 3 days later unprompted recall at least two distinct elements, at least one of them a project or a decision (target: 4 of 5 reviewers). If reviewers recall only mechanics, cut chrome before adding anything |
| G6 | The site is fast | Lab gates in section 29 pass in CI on every PR. Field p75 targets are monitored after launch and are not release gates |
| G7 | The site is accessible | WCAG 2.2 AA, verified by automated checks plus manual keyboard and screen reader passes |
| G8 | The site is cheap to maintain | Adding a project needs one project file, its decision files and, optionally, one experience component. No routing or layout code changes |

## 5. Non-Goals

- **Not a blog or CMS in v1.** Content lives in the repository as MDX and typed data.
- **No 3D or WebGL on the critical path, and none in v1 scope.** An optional Lab piece is allowed later under strict conditions (section 19).
- **No scroll hijacking or smooth-scroll libraries.** Native scroll, find-in-page and anchor links must behave normally.
- **No contact form in v1.** It adds spam handling and personal data storage for little gain over a mailto link.
- **Not a design-system showcase.** The system exists to serve the content.
- **Not a game, and not an operating-system metaphor.**
- **No claims the owner cannot back.** No invented metrics, testimonials or features. Anything unverified is marked `[CONFIRM]` until verified.
- **No performance scores as project copy.** Project pages describe what was built and decided. Measured performance appears only as live data about this site inside Inspect.

### Scope tiers (canonical)

**Core product:** identity, Brief, Work, projects, decisions, About, Experience, Contact, the three registers (Quiet, Margin, Inspect), and the accessibility, performance and content-truth rules that govern them. If time runs short, everything else goes first.

**Post-R0, optional, cut-first**, in cut order:

1. Decorative polish: the coordinates readout, the redline cursor dot, grain, the shared-element title move.
2. `/lab` and `/lab/terminal`, and the console greeting.
3. The GitHub activity strip.
4. The WebGL Lab piece (post-launch only).
5. Project flourishes: anything marked Optional in section 16.3, and muted loops a figure does not need.
6. Analytics beyond the core events (section 31).

Cut-first features are built only after the core is complete and inside budget, and can be dropped without ceremony. None of them appears in a MUST acceptance criterion.

## 6. Target Users

| Persona | Time budget | What they are trying to do | Fails if |
|---|---|---|---|
| **P1. Recruiter or talent partner** (primary) | 30 seconds to 2 minutes | Decide whether to forward the owner to a hiring manager | They must hunt for role, stack, employer, location or contact, or animation delays reading |
| **P2. Engineering lead or hiring manager** (primary) | 3 to 10 minutes | Judge craft and judgment; decide whether to interview | They only find screenshots and a stack list, no reasoning, no live links, no source |
| **P3. Founder or client** (secondary) | 2 to 5 minutes | See shipped, working products and sense how the owner communicates | They cannot tell what was built end to end from what was a template exercise |
| **P4. Designer or art director** (secondary) | 2 to 5 minutes | Judge typographic care, motion restraint, responsive craft | The site feels like a template or janks |
| **P5. Peer developer** (tertiary) | Variable | Explore, view source, find shortcuts | There is nothing to discover and no source to read |

The owner is based in Oyo State, Nigeria and works remotely (PitchMatter is UAE-based). P1 and P3 will often open the link on a phone from a LinkedIn message, so mobile is a first-class path, not a fallback.

## 7. User Needs

| Need | Users | How the product meets it |
|---|---|---|
| Understand who the owner is and what they do in one glance | P1, P3 | Above-the-fold name, role, employer, stack line; `/brief` as a plain fast path |
| Find contact and CV without effort | P1, P3 | Persistent nav link to Contact, footer email on every page, palette commands "Copy email" and "Open CV" |
| See real, live products | P2, P3 | "Open live" on every project header and at the end of each experience; repository links where public |
| Evaluate engineering judgment | P2 | Decision records with context, options, choice, trade-off, status; global `/decisions` index |
| Verify the engineering is real | P2, P5 | Inspect shows measured data and real names; site source link in footer |
| Judge craft | P4 | Deliberate type system, restrained motion, responsive transformations that change interaction, not only layout |
| Navigate without confusion | All | Plain nav labels, always-visible home and contact, command palette, consistent breadcrumb on project pages |
| Use the site with keyboard, screen reader, reduced motion, slow device | All | Content-first HTML, annotation text in reading order, lite mode, no essential information inside an animation |
| Come away remembering something | P2, P3, P4 | Five signature moments (section 10), not constant motion |

---

## 8. Creative Direction

**One line:** Paper, ink and a red pen.

The site looks and behaves like a carefully typeset document that an experienced engineer has marked up. Three registers carry the whole experience:

| Register | What the visitor sees | When |
|---|---|---|
| **Quiet** | Warm paper, near-black ink, large serif headlines, generous whitespace, no motion after the first load | Default state, and the state the site returns to after every interaction |
| **Margin** | A single red-pen annotation appears beside the thing it explains | On hover, focus or tap of an annotatable element |
| **Inspect** | The page flips to its opposite theme and overlays outlines, tokens, component names and measured performance | Only when the visitor asks for it |

The rhythm the brief asks for maps directly onto these: **silence** (Quiet) to **anticipation** (a margin mark appears near the cursor, an "Inspect" control waits in the corner) to **interaction** (open a note, toggle Inspect) to **visual transformation** (the flip) to **silence** (toggle off, the page settles).

**Reference moods** (described, not copied): a broadsheet's table of contents; an architect's drawing set with revision marks; a code-review thread; a printer's proof with proofreader's marks; a scientific paper with footnotes and marginalia.

**Explicitly refused:** random 3D objects, ambient particles, purple-blue gradients, glassmorphism, glow, looping background animation, scroll-jacking, custom cursors that replace the native one, parallax for its own sake, "scroll to reveal" text.

**Personality:** confident, exact, dry, honest about trade-offs. The tone of a senior engineer who is comfortable saying "I would change this."

## 9. Concept Exploration

Four radically different directions were evaluated against the same fifteen questions. They are described by trade-offs, not ranked.

### Concept A: The Survey

- **Core idea:** The portfolio is one large, pannable, zoomable survey sheet. Projects are sites on the sheet. About, Experience and Contact are named regions. The 2023 to 2026 progression is a route across terrain.
- **Emotional feeling:** Orientation, calm exploration, the pleasure of finding a place.
- **Visual language:** Topographic contour lines in SVG, survey tick marks, coordinates in monospace, muted earth palette with one signal color. Connects naturally to the owner's Geography degree, a true and unusual fact.
- **Navigation model:** Drag to pan, wheel or pinch to zoom, arrow keys to pan, plus and minus to zoom. A mandatory "List view" toggle and the command palette provide linear access.
- **Homepage:** The sheet centered on a "You are here" marker, a north arrow, and a title block (the legend box on a map) carrying name and role. Labels resolve as the visitor zooms.
- **Projects:** Zoom into a site and the sheet transitions to an inset sheet holding the case study.
- **About:** A route line across terrain with four waypoints, 2023 to 2026.
- **Experience:** Survey benchmarks placed along the route.
- **Contact:** A beacon at the sheet's edge, "Send a signal."
- **What makes it memorable:** The physical feeling of moving through a place; a metaphor almost nobody executes well.
- **Technical approach:** SVG layers with CSS transforms or a canvas, a small pan and zoom store, optional `d3-zoom` (about 10 KB). No WebGL needed.
- **Potential risks:** Low discoverability, disorientation, pan and zoom conflicting with page scroll on touch, long text reading badly on a map, perceived gimmick.
- **Performance implications:** Moderate. Large SVGs need offscreen culling and a node cap (under 300).
- **Accessibility implications:** Hard. Pan and zoom are pointer-centric. Requires a full parallel list view, keyboard panning, focusable sites, live announcements of zoom changes. Screen reader users should land in list view by default.

### Concept B: The Workbench

- **Core idea:** A minimal desktop environment: windows, a file tree (`~/work/rentit`), a terminal. Projects are apps the visitor launches.
- **Emotional feeling:** Playful, nerdy, instantly familiar to developers.
- **Visual language:** Crisp window chrome, monospace, muted greys, small pixel-perfect details.
- **Navigation model:** Dock, draggable windows, terminal commands, palette.
- **Homepage:** A desktop with a welcome window and an icon grid.
- **Projects:** Each opens as a window with a live iframe and a README-style case study.
- **About:** `about.md` in a text editor window.
- **Experience:** A formatted `git log`.
- **Contact:** A mail app window and a `contact` terminal command.
- **What makes it memorable:** Immediate recognition and toys to play with.
- **Technical approach:** Window manager state (Zustand), z-order and drag, a virtual file system, no WebGL.
- **Potential risks:** A widely used trope, so low originality. Windows hide content. Drag and resize are heavy on mobile. Risks looking like a template.
- **Performance implications:** Moderate. Many iframes unless strictly lazy.
- **Accessibility implications:** Window focus management is complex; drag-only interactions need keyboard equivalents; landmark structure gets messy.

### Concept C: The Ledger

- **Core idea:** One long vertical scroll where time is the spine. 2023 is blank, then each year is a chapter and each project a pinned scene.
- **Emotional feeling:** Narrative momentum, a cinematic story of return.
- **Visual language:** Huge type, full-bleed color fields per year, sparse imagery, dark theme.
- **Navigation model:** Scroll first, a progress rail with years, palette as a secondary path.
- **Homepage:** The title, then the years begin.
- **Projects:** Pinned scenes of 150 to 300vh with transforms tied to scroll progress; click to open a full case study.
- **About:** The scroll itself.
- **Experience:** The final chapters.
- **Contact:** The last screen.
- **What makes it memorable:** An emotional arc and strong typographic moments.
- **Technical approach:** CSS scroll-driven animations with fallback, or GSAP ScrollTrigger with a smooth-scroll library; pinned sections.
- **Potential risks:** Scroll fatigue, recruiters cannot skim, hard to deep-link, scroll-jacking, mobile jank, the well-worn "award site" pattern, content overshadowed.
- **Performance implications:** Highest risk on low-end devices. Pinned sections and scroll-linked transforms are easy to get wrong.
- **Accessibility implications:** Motion sensitivity. Reduced motion must flatten the whole thing. Scroll-linked content must also exist as static content. Skip links are essential.

### Concept D: Annotated

- **Core idea:** The site is a beautifully typeset document (the finished work). Meaningful elements can carry a margin note (a decision record). An Inspect layer turns the page over to reveal the engineering. Decisions are first-class, indexed and filterable.
- **Emotional feeling:** Trust and rigor with dry wit. A senior engineer walking you through a design review, in a site that feels like a well-edited magazine.
- **Visual language:** Paper, ink, red pen. Serif display type, monospace annotations, redline marks.
- **Navigation model:** A persistent minimal bar, a command palette, keyboard shortcuts, contextual next and previous, and a plain `/brief`.
- **Homepage:** A near-empty typographic opening, a table-of-contents style project list, a margin note on hover, an invitation to Inspect.
- **Projects:** A bespoke interactive experience per project (walkthrough, resizer, console, state gallery, manuscript) with decision records pinned to figures.
- **About:** The Record: a four-line typographic timeline with a deliberate gap.
- **Experience:** The Log, where each entry links to evidence.
- **Contact:** One large email address that copies on click, then silence.
- **What makes it memorable:** The Inspect flip, decisions that include reversals, the honest gap in 2023, and "how was this built?" answered on the page itself.
- **Technical approach:** Next.js App Router, MDX content validated with Zod, Motion for state-driven UI, View Transitions for route and Inspect transitions, real measurement with `web-vitals` and `PerformanceObserver`, no WebGL on the critical path.
- **Potential risks:** Requires authoring real, good decision records (content-heavy). Inspect can read as a DevTools gimmick if its data is fake. Margin layout takes care.
- **Performance implications:** Low to moderate. Mostly text and static images; the Inspect chunk loads lazily.
- **Accessibility implications:** Favorable. Annotations are real text in reading order. The overlay is decorative and `aria-hidden`, with text equivalents elsewhere.

### Trade-off summary

| Concept | Strongest at | Weakest at | Build cost | Fit with the 30-second path |
|---|---|---|---|---|
| A. The Survey | Spatial memory, a genuine personal link, an original metaphor | Linear reading, keyboard and screen reader parity, mobile | High (custom pan and zoom, parallel list view) | Weak unless list view is the default |
| B. The Workbench | Instant developer recognition, playful depth | Originality, mobile, accessible window management | Medium to high | Weak, content sits inside windows |
| C. The Ledger | Emotional arc, story pacing, typographic set pieces | Skimming, deep links, low-end performance, scroll-linked accessibility | Medium to high (pinned scenes, tuning) | Weak unless a skip path exists |
| D. Annotated | Evidence of judgment, honesty, recruiter path, performance, accessibility | Needs real authored content, margin layout complexity, risk of reading as a DevTools gimmick if data is fake | Medium (content-heavy, engineering-light) | Strong, the default view is already the fast path |

### Recommendation

The product goals in section 4 put judgment, professional credibility and a 30-second fast path ahead of spectacle, while still demanding distinctiveness and an engineering demonstration. Concept D is the only direction whose default state already satisfies the recruiter path, whose depth layer produces the evidence hiring engineers lack, and whose cost is mostly writing rather than engineering risk. A, B and C are each more dramatic in a first five seconds, and each needs a large accessibility and performance mitigation effort to reach the same floor.

Concept D borrows the best of the others instead of discarding them:

- From **A:** the coordinate-style monospace metadata and the idea of a spatial index (the `/decisions` matrix).
- From **B:** a single command registry powering the palette, shortcuts and an optional `/lab/terminal`.
- From **C:** the four-beat yearly timeline in About, including the deliberate gap.

If more spectacle is wanted later, the escape hatch is one lazily loaded, desktop-only Lab piece with a static fallback (section 19), which does not change the core.

## 10. Selected Experience Direction

**Annotated.** The working subtitle is *"An annotated build."*

### Why this direction and how it improves the original idea

1. **From "learned" to "decided."** Decisions are checkable and forward-looking. They show how the owner will think inside someone else's codebase.
2. **From "peel back" to "annotate, then inspect."** The annotation layer carries reasoning and trade-offs. Inspect carries measured engineering. Together they answer both "why" and "how."
3. **Silence as a mechanic.** The site returns to a still, text-first state after every interaction. The restraint is part of the craft demonstration.
4. **Honesty as the differentiator.** Decision records have a status: `kept`, `reversed` or `open`. A portfolio that shows what it would change is rare and credible.
5. **The portfolio is project zero.** Its own decisions (why no WebGL, why no smooth-scroll library, why paper and ink) are recorded alongside the five projects.

### Five signature moments

These are the only places the site is allowed to be theatrical.

1. **The Opening.** The first 2 seconds: empty paper, then name, role and current work arrive one line at a time, then stillness.
2. **The Margin Note.** A red-pen annotation appears beside a Contents line or a figure and states a decision in one sentence.
3. **The Flip.** Toggling Inspect crossfades the page into its opposite theme and draws outlines, tokens and live metrics over it.
4. **The Gap.** On the About timeline, 2023 is left empty on purpose.
5. **The Email.** The Contact page is one large email address. Click copies it. Nothing else moves.

### A 90-second session (hiring engineer)

Lands on `/`, reads the name and role (0 to 5s). Hovers "Marginalia" in the Contents list and reads the margin note (5 to 15s). Opens the project, reads the manuscript with visible sources (15 to 60s). Opens a decision marked "reversed" and reads why (60 to 75s). Presses `i`, sees real performance figures for that page (75 to 85s). Clicks "Open live" (85 to 90s).

---

## 11. Experience Principles

1. **Content beats chrome.** Every interface layer, animation and interaction must improve comprehension, orientation, evidence or navigation. If removing it loses no meaningful information, remove it. The work is what a visitor should remember, not the mechanics.
2. **Quiet by default.** After the opening, nothing moves unless the visitor acts. No looping animation anywhere.
3. **Plain labels, unusual content.** Navigation says Work, About, Experience, Lab, Contact. The originality lives in what the pages do, never in what the links are called. A visitor is never asked to decode a menu.
4. **Content before layers.** Every page is complete, readable HTML with no JavaScript required. Annotation, Inspect and transitions are enhancements.
5. **Real data only.** Inspect shows measured or authored values. No fake terminals, fake metrics or invented logs. A simulation is honest only when it is labeled and its output comes from real rules (the FX snapshot). An unlabeled one is fake.
6. **Honest about reversals.** Show decisions that were changed or left open. Credibility comes from the ones that cost something.
7. **Fast path first.** The 30-second route (homepage and `/brief`) is designed first and protected from every later creative decision.
8. **Theatrics are rationed.** Five signature moments (section 10). Everything else is restraint.
9. **Nothing important is hidden.** Hidden interactions are delight only, and never the sole route to any information.

### Chrome classification

Each layer earns its place by what it gives the visitor. Anything that only decorates is optional polish: never a MUST, and the first thing cut (section 5).

| Element | What it gives the visitor | Status |
|---|---|---|
| Persistent frame, breadcrumb, palette | Orientation and navigation | Core |
| Margin notes, pins, leader lines | Evidence: the decision attached to the thing it explains | Core |
| Inspect panel and chips | Evidence: measured values and real names | Core |
| The Opening, the Flip, the Gap, the Email | The signature moments: reading order, a visible mode change, a stated fact, one action | Signature, purposeful, skippable |
| Underline draws, hover and focus feedback | State feedback | Keep, small |
| Coordinates readout | Minor orientation on long pages; duplicates the URL and breadcrumb | Optional polish, cut-first |
| Redline cursor dot | Hints that an element is annotatable, which the marker and underline already say | Optional polish, cut-first |
| Grain, shared-element title move | Atmosphere and continuity | Optional polish, cut-first |
| Muted video loops | Motion a still cannot show, only where a figure needs it | Optional, cut-first |

## 12. Information Architecture

```
/                      The Opening + Contents (project list) + Inspect invitation
/brief                 30-second plain summary (print-friendly)
/work                  Contents page, all projects with status and stack
/work/[slug]           Project experience (four in v1; Guardrail is deferred under section 38)
/decisions             Decision index: filter by theme, project, status
/about                 The Record (timeline 2023 to 2026)
/experience            The Log (work history, education)
/lab                   Small experiments and starter templates
/lab/terminal          Text command interface (hidden, optional)
/contact               One email address, links, CV
/404                   "This page has no decisions attached."
```

**Content types:** SiteIdentity, Project, Decision, ExperienceEntry, LabItem, TimelineYear. Decisions belong to a project (or to the site itself as "project zero") and carry a theme tag. See section 35.

**Labeling:** "Work" (not "Builds"), "About" (not "The Record" in the nav, though the page is titled that), "Experience" (not "Log"), "Lab", "Contact". The in-page names (The Record, The Log) are headings, not navigation.

**Cross-cutting structure:** decisions are the connective tissue. They appear in the homepage margin notes, inside project pages, in About (a computed summary by theme) and in `/decisions`.

## 13. User Journeys

| Journey | Steps | Target |
|---|---|---|
| **J1. Recruiter, 30 seconds** | Land on `/` (name, role, employer, stack already visible) then click "30-second brief" then read `/brief` then click email, LinkedIn or CV | 2 interactions to contact or CV. Everything needed fits a 1440x900 viewport |
| **J2. Engineering lead, 3 to 6 minutes** | `/` then hover Contents then open a project then read 3 decisions then toggle Inspect then open live project then GitHub | At least 2 projects understood in depth. Inspect toggled at least once |
| **J3. Founder, 3 minutes** | `/work` then RentIt walkthrough then "Open live" then Contact | The product is understood as end to end work, not a template |
| **J4. Designer, 3 minutes** | `/` then Inspect (type and token chips) then Marginalia then Space Tourism resizer | Sees systematic typography, restraint and responsive craft |
| **J5. Mobile deep link** | Tap `/work/rentit` from a LinkedIn message then see header, nav and "Open live" then Contact | Nav is obvious on arrival. "Open live" is reachable without scrolling past the first screen |
| **J6. Lost visitor** | Anywhere then wordmark (home) or palette or menu | Home and Contact are always one interaction away. 404 offers the Contents list |

## 14. Navigation Model

**Persistent frame (every route):**

- Top-left: wordmark (`siteIdentity.name`, link to `/`).
- Top-right (desktop): Work, About, Experience, Lab, Contact, then an "Inspect" toggle and a palette button labeled `Search ⌘K` (shows `Ctrl K` on Windows and Linux).
- Bottom-left: GitHub ↗ and LinkedIn ↗ (from `siteIdentity.links`; full URLs in the `href`, visible text short).
- Bottom-right: a monospace "coordinates" readout: route and scroll percentage, for example `/work/rentit  34%`. Optional polish, cut-first (section 11). Real values, `aria-hidden`.

**Required affordances (always available):**

| Need | Desktop | Mobile | Inside a project |
|---|---|---|---|
| Return home | Wordmark, `g` then `h` | Wordmark | Wordmark and breadcrumb "Work / RentIt" |
| View work | "Work" in bar, `g` then `w` | "Work" in menu | Breadcrumb "Work", palette |
| View about | "About" in bar, `g` then `a` | Menu | Palette |
| Contact | "Contact" in bar, footer email, `g` then `c` | Menu and sticky footer email | Footer and palette "Copy email" |
| Open external project | "Open live ↗" in project header, palette | Sticky bottom bar on project pages | Project header and end of the experience |
| GitHub and LinkedIn | Footer, Contact page, palette | Menu footer, Contact page | Project header repo link, footer |

**Keyboard shortcuts** (also listed in a `?` sheet and in the palette):

| Keys | Action |
|---|---|
| `⌘K` or `Ctrl K` | Open command palette (always active, including inside inputs) |
| `/` | Open palette (only when focus is not in a text field) |
| `i` | Toggle Inspect (only when focus is not in a text field) |
| `g` then `h`, `w`, `a`, `e`, `l`, `c` | Home, Work, About, Experience, Lab, Contact |
| `[` and `]` | Previous and next project (project pages) |
| `?` | Shortcut sheet |
| `Esc` | Close the top-most layer (palette, sheet, Inspect) and restore focus |

**Shortcut accessibility rule (WCAG 2.1.4):** all single-character shortcuts (`/`, `i`, `g`-sequences, `[`, `]`, `?`) MUST be disableable from the `?` sheet and from the palette ("Shortcuts: on or off", persisted in `localStorage`). Modifier shortcuts (`⌘K` or `Ctrl K`) remain active.

**Gestures:** none required. Mobile uses tap only. No swipe navigation, so no conflict with browser back gestures.

**Command palette:** defined in section 26. It is a convenience layer, never the only route.

## 15. Homepage Experience

### Composition (1440x900 reference)

- Persistent frame visible at time zero (nothing delayed, so navigation is never hidden).
- Center-left column, top 18% empty on load.
- **Display name:** `siteIdentity.name` in Instrument Serif at display size (section 23).
- **Subline (italic serif):** a single sentence. Draft: *"Frontend developer. I keep notes on every decision."*
- **Meta line (mono):** `siteIdentity.stackLine` (draft: `React · Next.js · TypeScript · Supabase`), then on a second line the employer line built from `employer` (draft: `Currently at PitchMatter`).
- **Brief link:** "Only have 30 seconds? Read the brief." directly under the meta line, visible without scrolling on all viewports.
- **Contents list:** one row per project (five is the target; four ship in v1, with Guardrail deferred under section 38), styled as a book's table of contents with a leader line, title, year and a short stack tag.
- **Footer colophon:** "Set in Instrument Serif and Geist. Built with Next.js. Source on GitHub."

### The Opening timeline

All text is present in the server-rendered HTML. The sequence is CSS-only opacity and small `translateY` (8px) animation, so it works without hydration.

| Time | Event | Detail |
|---|---|---|
| 0 ms | Silence | Paper and grain. Frame chrome static |
| 400 ms | Name in | Opacity 0 to 1 over 500 ms, `--ease-out` |
| 900 ms | Subline in | 400 ms |
| 1300 ms | Meta and brief link in | 300 ms |
| 1700 ms | Contents in | One block, 300 ms, no per-row stagger |
| 2000 ms | Done | Fully static. No looping motion |

**Skip rules:** the sequence is skipped (final state on first paint) when `prefers-reduced-motion: reduce`, when `sessionStorage` marks the opening as seen in this session, and in lite mode (section 29). The 400 ms silence beat is counted inside the LCP budget.

### Interactions

- **Contents row hover or focus** (fine pointer): a margin note appears in the right column (150 ms opacity). Note content: the project's headline decision in 90 characters or fewer, plus year. Click or Enter opens the project.
- **Touch:** no hover exists, so the headline decision is shown as a second line under each row, always visible. Tap opens the project.
- **Inspect:** `i` or the corner toggle. On the homepage, Inspect draws the 12-column grid, outlines the name, subline, meta line and each Contents row, and attaches mono chips such as `<Display as="h1"> Instrument Serif 168/154 --ink`. A bottom-right panel shows the v1 set (section 26): the route, then measured LCP, INP ("not yet measured" until the visitor has interacted), CLS, JavaScript transferred, font bytes and request count. A list titled "Decisions on this page" links to 3 to 5 site decisions, for example *why the Opening is 2 seconds and skippable*, *why text is the LCP element*, *why there is no WebGL*.
- **After the page:** stillness. The footer is text only.

## 16. Project Experience

### 16.1 Project page anatomy

Every project page uses the same spine so visitors can compare.

| Order | Block | Content | Length |
|---|---|---|---|
| 1 | Header | Title, year, status, role, stack chips, "Open live ↗", "GitHub ↗" | Short |
| 2 | Premise | What it is, who it is for, why it was built | 60 to 90 words |
| 3 | The experience | The bespoke interactive piece (16.3) | Interactive |
| 4 | Decisions | 3 to 5 decision records (count rule: 16.2), anchored to figures | 60 to 120 words each |
| 5 | Stack | Each technology with one line on why it was chosen | One line each |
| 6 | Problems and fixes | 2 or 3 concrete problems and what solved them | 40 to 80 words each |
| 7 | What I would change | What the owner would do differently and what it taught them, linked to a `reversed` or `open` decision where one exists | 60 to 100 words |
| 8 | Exit | Next project, Back to Work, Open live | Short |

### 16.2 Decision record anatomy

A decision record (shown as a margin note on desktop, an inline card on mobile) contains: **Title** (a verb phrase, for example "Validate at the form boundary with Zod"), **Context** (one or two sentences), **Options considered** (two or three, one line each), **Choice**, **Trade-off** (what it cost), **Result** (optional, only if verifiable), **Status** (`kept`, `reversed`, `open`), **Theme** (`state`, `data`, `motion`, `a11y`, `performance`, `architecture`, `ux`, `security`). Maximum 120 words visible; longer notes link to a full record. Every record also carries an `evidence` reference in the data (section 35).

**Decision count rule (canonical; every other section defers to this one).** At launch (R3, the release that meets section 43) the site has at least 15 decision records, at least 3 verified decisions per shipped project, and at least 2 decisions across the portfolio with status `reversed` or `open`. Project zero (`site`) decisions count toward the 15 and toward the reversed or open minimum, never toward a project's 3. The 3-per-project minimum gates each project page when it ships. The portfolio totals are checked from R2 onward.

**Evidence and specificity.** A decision is an actual choice made in an actual project, traceable to evidence: code, a commit, a pull request, a migration, a screenshot or the owner's own account. "I chose TypeScript because it provides type safety" is not a decision record, because it could describe any project. Test every record: if it could describe almost any developer project, rewrite it from the repository or cut it.

### 16.3 The five experiences

Every detail marked `[CONFIRM]` must be checked against the repository before publishing. The stories and interactions below are what each page may interpret. The evidence that must exist first is in section 38.

#### RentIt: "Follow a booking"

- **Purpose:** Show end to end product thinking on a two-sided marketplace.
- **Story:** A property marketplace where owners list and manage properties and renters browse, book and message, with profile completion gating participation.
- **Entry point:** The Contents row opens the page on a full-width listing screenshot with numbered pins.
- **Interaction model:** A five-step stepper: Browse, Listing, Request to book, Message, Manage listing. Each step swaps a real screenshot (or a muted loop of 8 seconds or less, poster first, `preload="none"`), reveals one or two pins, and shows the linked decisions. The stepper is a `role="group"` of buttons with roving tabindex and arrow-key movement. Without JavaScript, the steps render as a static sequence of figures.
- **Visual treatment:** The product UI is the hero. Portfolio chrome recedes to paper and a 1 px frame.
- **Technical story:** Supabase authentication and data access (row-level policies), React Router route structure, Zod validation at form boundaries, the profile-completion gate, listing management, the messaging data model.
- **Case-study structure:** The standard spine plus a "Permission map" table (anonymous, renter, owner against what each can do).
- **Exit:** After the final step: "Open RentIt ↗", "Source", "Next: Marginalia".
- **Optional (cut-first):** If the app implements booking statuses, a small state diagram of the request lifecycle.

#### Space Tourism: "Resize the viewport"

- **Purpose:** Demonstrate layout craft and art direction across breakpoints.
- **Story:** A frontend implementation of a multi-section space tourism site (destinations, crew, technology).
- **Entry point:** A dark framed viewport embedded in the paper page, showing a poster image with a "Load live preview" button.
- **Interaction model:** After the visitor loads it, the live site renders in a sandboxed iframe inside a frame the visitor resizes using a drag handle or a keyboard-operable slider (`role="slider"`, arrow keys, snap points at 375, 768 and 1280 px). Annotations update per snap point, explaining what changed and why (navigation collapse, image art direction swap, tab layout). Fallback: three static screenshots with the same annotations.
- **Visual treatment:** The page stays paper. Only the frame is dark, so the contrast makes the piece feel like looking through a window.
- **Technical story:** Component and layout strategy, `<picture>` art direction, data-driven content, route-level code splitting (one line, no scores), and the selection controls as built: named native buttons on Destination, labelled dot buttons on Crew, numbered buttons exposing `aria-pressed` on Technology, with no ARIA tabs pattern.
- **Case-study structure:** The standard spine plus a "Responsive transformation" table (width, what changes, why).
- **Exit:** "Open live ↗", "Source", "Next: Foreign Exchange Checker".

#### Guardrail: "Try a transaction (simulated)" (deferred, owner 2026-10-02: the contract source is unrecoverable, so no enforcement rule can be evidenced; nothing below ships and this section is retained as a record of the intended piece)

- **Purpose:** Show the ability to design trustworthy UI around irreversible actions.
- **Story:** A Web3 dApp with a smart contract enforcing rules, and a dashboard that reads and presents that state `[CONFIRM exactly what Guardrail enforces]`.
- **Entry point:** An inverted (ink) console block on the paper page.
- **Interaction model:** The visitor picks one of three scripted scenarios. The console prints rule checks line by line (40 ms per line, 12 lines maximum) and ends with a PASS or BLOCKED chip and the reason. It makes no network calls and never asks for a wallet connection. A permanent caption reads "Simulation based on the contract rules, not a live transaction." With reduced motion, all lines appear at once.
- **Visual treatment:** Monospace, high contrast. Red is used only for BLOCKED (semantic, not decorative). No neon, no glow.
- **Technical story:** Contract interaction with ethers v6, network and testnet configuration, mapping contract reverts to human-readable messages, read and write separation, a documented JSON-RPC batching problem and its fix `[CONFIRM details]`.
- **Case-study structure:** The standard spine plus a "Failure states" chapter listing every error and the message the user sees.
- **Exit:** "Open live ↗" (note: testnet `[CONFIRM]`), "Source", "Next: Foreign Exchange Checker".

#### Foreign Exchange Checker: "State gallery"

- **Purpose:** Show restraint and correctness on a small utility, and treat system states as design.
- **Story:** A currency conversion checker.
- **Entry point:** One large input and result pair driven by a bundled snapshot dataset. The portfolio never calls a third-party rates API.
- **Interaction model:** Tabs for the states the app has: Result and missing result, History loading, History empty or failed, Search no results, Empty favorites and log, and Missing comparison amount. Each renders the real state (recreated or screenshot) with annotations, and any recreation is labelled as one. A hand-built SVG sparkline (no chart library) plots the snapshot.
- **Visual treatment:** Tabular numerals (`font-variant-numeric: tabular-nums`), hairline grid, the quietest of the five.
- **Technical story:** Data fetching and caching, debounced input, `Intl.NumberFormat`, precision and rounding, error handling.
- **Case-study structure:** The standard spine plus a "Numbers you can trust" chapter on formatting and precision.
- **Exit:** "Open live ↗", "Source", "Next: Marginalia".

#### Marginalia: "Read it with the sources visible"

- **Purpose:** Demonstrate product concept and editorial interface design, and act as the most literal expression of this portfolio's own idea.
- **Story:** An AI research assistant concept for researchers, centered on research, reading, connecting information, visible citations and manuscript interaction.
- **Entry point:** A manuscript title page with an abstract and keywords.
- **Interaction model:** The case study is typeset as a manuscript. Claims carry numbered source markers. Activating a marker opens a source panel (side sheet on desktop, bottom sheet on mobile) quoting the evidence (a screenshot, a repository file, a commit). "Show all sources" inlines every source as a footnote. The mechanic mirrors the product.
- **Visual treatment:** The most editorial page: wider margins, footnotes, small caps for section marks, no drop caps.
- **Technical story:** The citation data model (claims, sources, anchors), accessible footnote and disclosure pattern, editorial grid, highlight state, and the AI integration.
- **Case-study structure:** The standard spine plus a "How citations work in the product" chapter.
- **Exit:** "Open Marginalia ↗" (https://marginalia-u6x8.vercel.app/), "Source", "Next: RentIt" (the list loops).

### 16.4 Exit behavior (all projects)

Always visible: breadcrumb "Work / Project", wordmark, palette. `Esc` closes layers first, then returns to `/work`. Browser back always works (real routes). The page ends with Open live, Source and Next project.

## 17. About Experience: The Record

**Purpose:** Communicate progression concisely, without apology and without cliché.

**Layout:** Four rows, each with a very large year (Instrument Serif), a short line, and an artifact link.

| Year | Line (draft, owner edits for truth) | Artifact |
|---|---|---|
| 2023 | *Empty on purpose.* Caption in mono: "No commits. Left blank." | None. The row is intentionally blank |
| 2024 | Came back. | None. No artifact is published for this year |
| 2025 | In service. Kept building. | None. The row is anchored to the NYSC placement and the Blueskills role, and neither has a verified artifact link |
| 2026 | Building professionally. | PitchMatter |

**The Gap:** 2023 is rendered at full size with nothing beside it. The empty space is the statement. It is the only place where silence is the content.

**Optional activity strip (MAY, post-R0, cut-first):** a build-time snapshot of GitHub commit activity per month, 2023 to 2026, drawn as a hand-built SVG. It shows the gap honestly. Include it only if the real data tells the story the owner wants to tell.

**How I work (computed):** a short block showing the count of decisions by theme across all projects, each linking to `/decisions` filtered by that theme. It demonstrates working style with evidence instead of adjectives.

**Rules:** at most 180 visible words. No photo in v1 (MAY add one, see Appendix A). No banned phrases (section 37).

## 18. Experience and Work History: The Log

A reverse-chronological list. Each entry is a native `<details>` element (no JavaScript dependency): summary line always visible, detail on expand.

| Entry | Dates | Summary | Evidence |
|---|---|---|---|
| Frontend Developer Intern, PitchMatter (UAE-based, remote) | August 2026 to present | Company, role and dates only. No product and no description of the work | None |
| Field Supervisor, Blueskills (remote role, field operations in Oyo State, Nigeria) | October 2025 to present | Oversees 32 branches across Oyo State, branch reporting and tracking | Branch tracker project |
| NYSC, Ministry of Establishment and Training, Oyo State | 2025 to 2026 | National service placement | None |
| B.Sc. Geography, Obafemi Awolowo University | 2024 | Degree only, no class or CGPA | None |
| President, NAGS | 2023 to 2024 | Student association leadership | None |

Every title, date and number in this table (including the Blueskills branch count) is owner-confirmed against the current CV; `verified` stays false until the owner promotes it. An entry with `public: false` stays hidden until approved.

**Rules:**

- Do not show proprietary PitchMatter screens or data. Describe at the level of decisions and patterns only, and get written approval for wording.
- Lead every entry with what was delivered, not with learning.
- Location everywhere is "Oyo State, Nigeria" (remote).
- The Log stays visually quieter than the Work section. It is support for the frontend story, not the headline.

## 19. Experiments: Lab

**Purpose:** Small things that are interesting but do not justify a full case study, plus the terminal. The whole of Lab is post-R0 and cut-first (section 5).

**Initial contents** (one row each: title, year, stack, link): Earthquake Tracker, IP Address Tracker, Launch Countdown Timer, Branch Watch, and the three open-source starters (Redux Toolkit, Zustand, Context API boilerplates).

**Flagship (post-R0, optional, cut-first):** `/lab/terminal`, a text command interface built on the same command registry as the palette (section 34).

**Optional WebGL piece (MAY, post-R0, cut-first).** It must satisfy every condition:

- It answers a real question (for example "what does this site's network waterfall look like as an object?") rather than decorating.
- Dynamic import, desktop and fine pointer only, loaded on an explicit user action.
- 350 KB gzip maximum for its chunk. No assets above 500 KB.
- A static image fallback and a text description.
- Disabled when `Save-Data`, reduced motion, low `deviceMemory`, or `failIfMajorPerformanceCaveat` applies.

## 20. Contact Experience

- **The page:** One very large email address (`siteIdentity.email`) in Instrument Serif. Click or Enter copies it to the clipboard and shows "Copied" for 1.5 seconds, announced through an `aria-live="polite"` region. A plain `mailto:` link sits directly under it.
- **Secondary links:** LinkedIn, GitHub and the CV, read from `siteIdentity` (section 35). Each opens in the same tab for the CV and a new tab for external profiles with `rel="noopener noreferrer"`.
- **Availability line:** `siteIdentity.availability`, one sentence, for example "Open to frontend roles. Replies within two working days."
- **Motion:** The underline on the email draws left to right on hover over 240 ms with `transform: scaleX`. Nothing else moves. The page ends in silence.
- **Not included:** a form, a phone number by default, a calendar embed.

## 21. Hidden Interactions

All are delight only. None hides information that is not also reachable through normal navigation.

| Interaction | Trigger | Result | Also reachable via |
|---|---|---|---|
| Console greeting (post-R0, cut-first) | Open DevTools console | A plain-text message linking to the source repository and the `/decisions` page | Footer source link |
| `/lab/terminal` (post-R0, optional, cut-first) | Type the URL, or palette command "Open terminal" | Commands: `help`, `whoami`, `work`, `about`, `contact`, `inspect`, `decisions <theme>`. Output is real text in an `aria-live="polite"` log | Every command maps to an existing page |
| Shortcut sheet | `?` | Lists every shortcut and the on or off setting | Palette |
| 404 | Any invalid URL | "This page has no decisions attached." plus the Contents list | Normal nav |
| Reversed decisions filter | `/decisions?status=reversed` | Shows only reversed decisions | `/decisions` status filter |
| Inspect on decisions | Toggle Inspect on `/decisions` | Shows a projects-by-themes matrix with counts | The matrix is also shown unhidden at the top of `/decisions` |

---

## 22. Visual System

**Principle:** flat, typographic, structured by rules and whitespace rather than boxes and shadows.

| Element | Specification |
|---|---|
| **Grid** | Container max width 1280 px. 12 columns, 24 px gutters, 32 px outer padding (16 px on mobile). Desktop reading layout: columns 1 to 2 metadata (year, index), columns 3 to 8 main text (62 to 68 characters per line), columns 9 to 12 annotation column |
| **Spacing scale** | 4 px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144. Section gaps use 96 and 144 on desktop, 64 on mobile |
| **Layout** | Text-led. Figures may span columns 3 to 12. Full-bleed only for the Space Tourism frame |
| **Borders** | 1 px solid. Decorative dividers use `--rule`. Borders that identify a control (inputs, buttons, toggles) use `--graphite` or `--ink` (3:1 contrast minimum, WCAG 1.4.11) |
| **Corners** | 0 px everywhere, except 2 px on inputs and buttons |
| **Surfaces** | Flat. Two tones only: `--paper` and `--paper-raised` (palette dialog, source sheets). No shadows. Raised surfaces are identified by a 1 px `--ink` border |
| **Iconography** | Almost none. A custom set of five 1.5 px stroke glyphs: external arrow ↗, plus, minus, caret, pin dot. Inline SVG, `currentColor`. No icon font, no large icon library |
| **Technical metadata** | Geist Mono, 12 to 13 px, graphite, used for years, indexes, coordinates, status, stack tags. Example: `2025  REACT · VITE · SUPABASE` |
| **Cursor** | The native cursor is never replaced or hidden. On fine-pointer devices, a 6 px redline dot MAY appear within 24 px of an annotatable element as an additive hint, positioned with `transform`, no trailing or easing lag beyond one frame. Never on touch. Optional polish, cut-first (section 11), not an acceptance criterion |
| **Image treatment** | Screenshots at natural color inside a 1 px `--ink` frame, no device mockups. Each has a mono caption "Fig. 3" with optional redline pins. Fixed `aspect-ratio` to prevent layout shift |
| **Noise and grain** | One static tiling SVG or PNG noise at about 4 percent opacity over `--paper`, under 2 KB inline. Never animated. Removed under `prefers-contrast: more` and in lite mode |
| **Visual transitions** | Crossfade only for theme and route changes (View Transitions). Transform and opacity for small elements. No wipes, slides or shape morphs |

## 23. Typography

**Personality the type must communicate:** editorial confidence (display serif) with engineering precision (neutral sans and monospace). A magazine that also has a terminal in it.

| Role | Family and category | Why |
|---|---|---|
| **Display and headings** | **Instrument Serif** (condensed display serif, Regular and Italic) | Tall and elegant at large sizes, with enough character to be recognizable. A single weight avoids variable-font cost. Used only at 28 px and above |
| **UI and body** | **Geist** (neutral grotesque, variable) | Clean, highly legible, excellent numerals, calm next to the serif |
| **Metadata and annotations** | **Geist Mono** (monospace, variable) | The "engineer's voice". Pairs with Geist by design |

Candidate alternatives if licensing or rendering issues appear: Newsreader or Fraunces (display serif), Inter Tight or Switzer (sans), JetBrains Mono or IBM Plex Mono (mono). Decide in Phase 2 after rendering real content at real sizes.

### Hierarchy

| Role | Family and weight | Size (mobile to desktop) | Line height | Tracking |
|---|---|---|---|---|
| Display XL (homepage name) | Instrument Serif Regular | `clamp(3.5rem, 11vw, 10.5rem)` | 0.92 | -0.02em |
| Display L (page H1) | Instrument Serif Regular | `clamp(2.5rem, 6vw, 5.5rem)` | 1.0 | -0.015em |
| H2 | Instrument Serif Regular | `clamp(1.75rem, 3.4vw, 2.75rem)` | 1.1 | -0.01em |
| Lead and subline | Instrument Serif Italic | `clamp(1.25rem, 2vw, 1.75rem)` | 1.35 | 0 |
| H3 | Geist 500 | 1.25rem | 1.3 | 0 |
| Body | Geist 400 | 1rem mobile, 1.0625rem desktop | 1.6 | 0 |
| UI label | Geist 500 | 0.875rem | 1.2 | 0.01em |
| Annotation | Geist Mono 400 | 0.8125rem | 1.5 | 0.01em |
| Meta (minimum size) | Geist Mono 400, uppercase | 0.75rem | 1.4 | 0.04em |

**Rules:** nothing below 12 px. Only two weights of Geist are loaded (400, 500). Tabular numerals for any number in a column or that changes. Use `text-wrap: balance` on headings and `text-wrap: pretty` on body. Hyphenation off for headings. Line length never exceeds 68 characters in body text.

**Loading:** self-host through `next/font`, Latin subset only, `display: swap`, automatic fallback metric adjustment. Preload Instrument Serif Regular, Geist and Geist Mono. Instrument Serif Italic loads without preload (it appears at 900 ms in the Opening). Total font budget in section 29.

## 24. Color System

**Philosophy:** warm neutrals and one signal color. The red pen is used only to mark things: annotations, pins, active states, and a 2 px focus-adjacent accent. If red appears where nothing is being marked, it is wrong.

```css
:root {
  --paper: #F2EEE5;          /* page */
  --paper-raised: #F8F5EE;   /* dialogs, sheets */
  --ink: #14130F;            /* primary text */
  --graphite: #5A574E;       /* secondary text, control borders */
  --rule: #D8D2C2;           /* decorative dividers only */
  --redline: #D9391F;        /* marks, lines, dots (non-text) */
  --redline-text: #B42A12;   /* red text on paper */
  --focus: #14130F;
}
:root[data-theme="night"] {
  --paper: #12110E;
  --paper-raised: #1B1A16;
  --ink: #ECE6D8;
  --graphite: #A9A394;
  --rule: #34312A;
  --redline: #FF7A5C;
  --redline-text: #FF7A5C;
  --focus: #ECE6D8;
}
```

**Approximate contrast** (verify with tooling in Phase 2): ink on paper above 15:1; graphite on paper about 6.2:1; `--redline-text` on paper about 5.5:1; `--redline` on paper about 4:1 (so never for small text, only for marks and large elements); night graphite on night paper about 7.5:1.

**Theme behavior:** honor `prefers-color-scheme` on first visit, store an explicit choice, and expose a palette command "Toggle theme". **Inspect always uses the opposite theme** of the current one (paper visitors see night-ink Inspect, night visitors see paper-blueprint Inspect), so the flip is always a visible transformation.

**Semantic color:** status chips use text labels as well as color, never color alone. The Guardrail simulation that first carried this rule is deferred (section 16.3), so the rule applies to any status chip the site ships.

## 25. Motion System

**Philosophy:** motion answers "what just happened?" or "where did that come from?" It is never ambient. The site is still unless the visitor acts.

### Tokens

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);      /* entrances, reveals */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* crossfades, sheets */
  --dur-instant: 80ms;
  --dur-fast: 150ms;    /* hover, focus, tooltips */
  --dur-base: 240ms;    /* state changes, toggles */
  --dur-slow: 400ms;    /* route transitions, sheets */
  --dur-scene: 700ms;   /* Inspect flip, the only long one */
}
```

### Rules by category

| Category | Specification |
|---|---|
| **Properties** | Animate `transform` and `opacity` for primary movement. `clip-path` is allowed for small elements (Inspect outline draw). Never animate `width`, `height`, `top`, `left`, `margin` or `box-shadow`. Do not use `will-change` permanently, only during an active animation |
| **Entrance** | The Opening only (section 15). Elsewhere, content is simply there. Sections do not fade in on scroll |
| **Page transitions** | Persistent frame stays put. Content crossfades using the View Transitions API: old content out 160 ms, new content in 320 ms with 8 px `translateY`. The project title may share a `view-transition-name` with its Contents row for a shared-element move (400 ms). Fallback: instant route change |
| **Hover** | 150 ms. Underlines draw with `scaleX` (origin left). Margin notes fade with opacity. No movement greater than 4 px |
| **Scroll** | Native scroll only. No scroll-linked transforms, no pinning, no parallax. If the optional coordinates readout is built, it updates on `requestAnimationFrame`, throttled, text only |
| **Cursor** | Native cursor always. Optional 6 px dot hint (section 22) |
| **Project transitions** | Contents row to project: shared title if supported, else crossfade. Step changes in the RentIt stepper: 240 ms crossfade of the figure (opacity), pins fade in 150 ms, no sliding |
| **Loading states** | Skeletons are static paper-tone blocks with no shimmer. Loading text is monospace: `Loading live preview`. Reserve the final dimensions to prevent layout shift |
| **Micro-interactions** | Copy confirmation: text swap, no animation. Toggle (Inspect): 240 ms thumb move using `transform`. Focus ring appears instantly |
| **The Flip (Inspect)** | `document.startViewTransition()` crossfades the root to the opposite theme in 700 ms (compositor-only). Outlines then draw on with `clip-path`, 30 ms stagger, 12 elements maximum per viewport, total under 500 ms. Toggling off crossfades back in 300 ms. No layout change occurs. Where View Transitions are unavailable the theme swaps instantly |
| **Error states** | No shake or bounce. A redline 1 px underline and a text message. Messages are real text, announced via `aria-live` |
| **Reduced motion** | Under `prefers-reduced-motion: reduce`: the Opening renders final state instantly; route and theme changes become an instant swap or a 100 ms opacity crossfade at most; the Flip becomes an instant theme swap with outlines appearing at once; videos show their poster; no autoplay anywhere; the terminal and console simulations print all lines at once |
| **Lite mode** | Activated by `Save-Data`, `deviceMemory` 4 GB or less, `hardwareConcurrency` 4 or less, or a visitor toggle. Same as reduced motion, plus no grain, no videos, no outline draw |

### Avoid list

Looping background animation; parallax; smooth-scroll libraries; scroll-triggered fades on every section; staggered letter or word reveals; magnetic buttons; cursor trails; page-load loaders longer than the content; hover scale on images; spring bounce on UI chrome; any animation over 700 ms.

## 26. Interaction Design

**States for interactive elements** (all must be visible without color alone):

| Element | Default | Hover | Focus-visible | Active | Disabled |
|---|---|---|---|---|---|
| Text link | `--ink`, 1 px underline | Underline thickens to 2 px | 2 px `--focus` outline, 3 px offset | Underline `--redline-text` | Not used |
| Button | 1 px `--graphite` border | Background `--ink`, text `--paper` (150 ms) | Same outline as links | Invert held | Avoided. Keep enabled and explain on use |
| Contents row | Title, year, tag | Margin note appears, title underlined | Same as hover plus outline | Note stays | Not used |
| Toggle (Inspect) | `aria-pressed="false"` | Border `--ink` | Outline | `aria-pressed="true"`, redline fill | Not used |

### Margin notes (annotations)

- **Desktop, fine pointer:** appear in the annotation column on hover or focus of the anchor, 150 ms opacity. A 1 px redline leader line connects the note to its anchor. One note is open at a time. `Esc` closes.
- **Tablet and touch:** anchors show a small numbered marker. Tapping opens a bottom sheet (native `<dialog>` or Popover API) with the note. Tapping outside or the close button dismisses it.
- **Reading order and semantics:** each note is an `<aside aria-label="Decision note">` placed in the DOM immediately after the content it explains. CSS positions it in the margin. A screen reader encounters it inline, in order, without any pointer interaction.
- **No-hover fallback:** if `@media (hover: none)`, notes render inline under the anchor by default, collapsed to a one-line summary with a disclosure.

### Inspect

- **Toggle:** visible corner control (`aria-pressed`), shortcut `i`, palette command. Toggling never changes scroll position or layout.
- **Overlay:** a fixed-position decorative layer (`aria-hidden="true"`, `pointer-events: none`) drawing outlines for elements with `data-inspect` attributes only (not the whole DOM). Chips show component name, typeface and size, and color and spacing tokens, read from `data-inspect` and `getComputedStyle` on demand.
- **Panel:** a real, focusable `<section aria-label="Page measurements">` holding the information as text, so the overlay is decoration.
- **v1 content (canonical):** the current route; the relevant component; typography; the relevant spacing and color tokens; measured LCP, INP and CLS; JavaScript transferred; font bytes; request count; and the decisions relevant to the page ("Decisions on this page"). On mobile (section 27) the measured values and decisions appear without chips. Anything else, such as bytes by type, is optional and deferred past R2.
- **Data integrity:** a value is either measured (web-vitals, `PerformanceObserver`, `performance.getEntriesByType`) or authored in content, and authored values (component and token names) are never presented as measurements. Measured values describe this visit on this device, not field p75 and not a lab score. A metric that has not been measured shows "not yet measured", never a placeholder number.

### Command palette

- Opens with `⌘K` or `Ctrl K` (always) and `/` (when not typing). Built on native `<dialog>` with `showModal()` for focus trapping and inertness.
- Input uses the ARIA combobox pattern: `role="combobox"`, `aria-expanded`, `aria-controls` pointing to a `role="listbox"`, `aria-activedescendant` on arrow navigation. A `role="status"` region announces "N results".
- Groups: Navigate (pages, projects), Open (live project links, GitHub, LinkedIn, CV), Copy (email), View (toggle Inspect, theme, shortcuts, lite mode), Search decisions (fuzzy match on title and theme).
- Scoring: a small in-house substring and word-prefix scorer is sufficient for under 80 commands. No search library needed.
- `Esc` closes and returns focus to the previously focused element. Results always include an "Open contact" command so the route to contact is never more than two keystrokes from the palette.

### Feedback patterns

- Clipboard success: text changes to "Copied" for 1.5 s with a live-region announcement. Clipboard failure: the address is selected and a message reads "Press Ctrl C to copy."
- External links show ↗ and an accessible name that ends with "(opens in new tab)" where applicable.
- Empty and error states are sentences in the site's voice, for example "No decisions match that filter. Clear the filter."

## 27. Responsive Strategy

Three separate interaction strategies, not one layout stacked.

| Breakpoint | Name | Approach |
|---|---|---|
| Below 640 px | **Mobile** | Reading-first. Simplify, do not shrink |
| 640 to 1023 px | **Tablet** | Hybrid. Margin notes inline unless the viewport can hold the annotation column |
| 1024 px and above | **Desktop** | Full experience: margin column, hover notes, Inspect overlay, palette and shortcuts |
| 1440 px and above | **Wide** | Same as desktop with a capped 1280 px container and larger display type |

| Feature | Mobile | Tablet | Desktop |
|---|---|---|---|
| Navigation | Wordmark plus "Menu" button opening a full-screen `<dialog>` with large links (48 px targets) and external links. Sticky bottom bar with "Open live ↗" on project pages | Same as desktop bar if it fits, otherwise mobile menu | Persistent top bar |
| Margin notes | Numbered markers, tap opens a bottom sheet | Inline right-aligned notes at 768 px and above, else markers | Margin column with hover and focus |
| Inspect | Becomes "Notes: on or off", which inlines every decision and measurement as cards under their anchors (no overlay) | Overlay simplified: outlines plus the panel, no chips | Full overlay, chips, panel |
| Command palette | "Jump to" bottom sheet with 48 px rows, opened by a button (no keyboard dependency) | Palette dialog, optional keyboard | Full palette and shortcuts |
| Opening sequence | Same timing, shorter copy | Same | Full |
| Hover-only affordances | None. Everything is tap or always visible | None on touch tablets | Allowed |
| Space Tourism resizer | Shows three static screenshots with a segmented control (375, 768, 1280) instead of a draggable iframe | Drag handle with iframe on demand | Drag handle, keyboard slider, iframe on demand |
| Videos and heavy media | Posters only by default with a tap to play | Posters, autoplay disabled | Muted loops on intersection (lite mode excluded) |
| Custom cursor hint | Removed | Removed | Optional |
| Project experiences | Single column, step controls as a vertical list | Two columns where the figure needs width | Full layout |

**Touch targets:** 44 by 44 CSS px minimum for standalone controls on touch. Inline text links only need the WCAG 2.2 floor of 24 by 24 with spacing. **Orientation:** no lock. **Zoom:** never disable pinch zoom.

## 28. Accessibility

**Standard:** WCAG 2.2 Level AA across every route, plus the specifics below.

- **Semantics:** one `<h1>` per page, ordered headings, landmarks (`header`, `nav`, `main`, `footer`), `<article>` for project pages, `<ol>` for the Contents list, `<time>` for dates, `<figure>` and `<figcaption>` for images.
- **Skip link:** "Skip to content" is the first focusable element and becomes visible on focus.
- **Keyboard:** every function works without a pointer. Logical tab order equals DOM order. No keyboard traps; dialogs trap focus intentionally and return it on close.
- **Focus:** a 2 px `--focus` outline with 3 px offset on every focusable element, never removed. Focus is never hidden behind sticky bars (`scroll-padding-top` set).
- **Screen readers:** margin notes are inline asides in reading order. The Inspect overlay and coordinates readout are `aria-hidden`; all their information exists as text in the Inspect panel and in page content. Stepper, tabs, slider and dialogs follow the WAI-ARIA Authoring Practices patterns. Live regions (`aria-live="polite"`) announce copy confirmations, palette result counts, terminal output and stepper changes.
- **Reduced motion and lite mode:** see section 25. A visible "Reduce motion" toggle in the palette overrides the system setting in the conservative direction only.
- **Color and contrast:** text 4.5:1, large text and UI boundaries 3:1, never color alone (section 24).
- **Target size:** as in section 27.
- **Shortcuts:** single-character shortcuts can be turned off (section 14).
- **WebGL and canvas alternatives:** there is none on the critical path. Any future Lab piece needs a text description, a static image with alt text, and a keyboard-accessible route to the same information.
- **Iframes and embeds:** titled (`title="Space Tourism live preview"`), loaded on explicit action, with a link to open the site directly.
- **Media:** videos have no audio and no autoplay sound. A text equivalent exists for what they show.
- **Language and metadata:** `lang="en"`, descriptive `<title>` per route, link text that names the destination.
- **Testing:** section 40.

## 29. Performance

**Principle:** the creative experience never justifies a poor user experience. Everything heavy is optional, lazy and absent on weak devices.

### Budgets

Core Web Vitals "good" thresholds are LCP 2.5 s, INP 200 ms, CLS 0.1 at the 75th percentile. This site targets tighter values. The numbers are split by how they are checked. **Lab gates** decide whether a build ships. **Field targets** describe how the site behaves for real visitors on their own devices and networks, so they are monitored after deployment and never used as a pre-launch gate.

#### Lab gates (CI and release; a miss blocks the merge or release)

| Metric | Target | Notes |
|---|---|---|
| **First-load JavaScript, `/`** | 140 KB gzip or less | Framework and small store. Motion enters the first load only if a first-load component genuinely needs it. Enforce in CI with size checks |
| **First-load JavaScript, other routes** | 170 KB gzip or less | |
| **Lazy chunks** | Inspect 40 KB, palette 25 KB, web-vitals attribution 10 KB, each project experience 60 KB (gzip) | Loaded on intent (hover or idle prefetch) |
| **Fonts** | 150 KB total woff2 or less, at most 3 files preloaded | Measure real files in Phase 2 and adjust with a written reason |
| **Images** | AVIF first, WebP fallback. Largest figure on a project page 120 KB or less at 1440 wide. Homepage has no required image | Serve widths 640, 960, 1440, 1920 with accurate `sizes` |
| **Video** | 1.5 MB or less per 8 second loop, H.264, muted, `playsinline`, poster, `preload="none"` | Started on intersection, paused when offscreen, never in lite mode |
| **Page weight** | `/` 500 KB or less transferred on first view | |
| **3D assets** | None in v1. Any Lab piece: 350 KB gzip chunk and 500 KB assets maximum, loaded only on explicit action | |
| **Lighthouse CI** (fixed throttled mobile profile, chosen in Phase 3) | LCP 2.0 s or less, CLS 0.05 or less, TBT 150 ms or less | Lab proxies for the field targets below. The LCP element is text (the H1), so no image is required for first render, and the 400 ms Opening beat is inside the budget. Lighthouse cannot measure INP, so TBT stands in for it. A lab threshold may change only with a written reason |
| **Accessibility, build, content** | axe clean on every route, build passes, content validation passes | Sections 28 and 40 |

#### Field targets (monitored after deployment; not gates)

| Metric | Target | Notes |
|---|---|---|
| **LCP** (mobile, p75) | 2.0 s or less | |
| **INP** (p75) | 150 ms or less | Event handlers stay short. Inspect and palette work is deferred out of the input handler |
| **CLS** (p75) | 0.05 or less | Reserve image and iframe dimensions. Fonts use adjusted fallback metrics |
| **Segments** | Device class, connection type | Read p75 per segment, not only overall |

A missed field target opens an issue and, if the cause is in the site, a fix or a recorded decision. It does not retroactively fail CI and never blocks launch. A personal site has modest traffic, so p75 is read only once the sample is large enough to mean something. Below that it is anecdote.

### Techniques

- Static generation for every route. No client-side data fetching for content.
- Progressive enhancement: SSR HTML works without JavaScript; layers attach after hydration.
- `dynamic()` imports for Inspect, palette, per-project experience components and `web-vitals`. Prefetch the palette chunk on first pointer or keyboard activity and on idle.
- `next/image` for all raster images with explicit dimensions. `priority` only when an image is the LCP element (none on the homepage).
- `next/font` self-hosting with subsets. No third-party font requests.
- Third-party scripts: none except cookieless analytics (section 31).
- Device classes: `Save-Data`, `deviceMemory`, `hardwareConcurrency`, `prefers-reduced-motion` and `prefers-reduced-data` (where supported) select lite mode. These are hints: where a signal is unavailable, the site stays in full mode.
- Animation: all motion is compositor-only with no long tasks. Frame time under 16 ms during transitions on a mid-range phone with 4x CPU throttle is checked by hand on real devices, not in CI.
- Low-powered devices get text, static images and no overlay animation.

### Measurement and enforcement

- **Lab:** Lighthouse CI and size checks in GitHub Actions on every PR against the lab gates. Fail the build on any gate miss or on a regression of more than 10 percent.
- **Field:** Vercel Speed Insights (or `web-vitals` sent to the same endpoint) for p75 LCP, INP and CLS by device type and connection, reviewed weekly after launch (section 31). Monitoring only.
- **Devices:** manual passes on one low-end Android phone (or Chrome 4x CPU and Slow 4G throttle) and one recent iPhone before each release, including the animation frame-time check.

## 30. SEO

- **Title (home):** `{name}, {role}` from `siteIdentity` (draft: `Olamilekan Ilesanmi, Frontend Developer`, under 60 characters). Project pages: `RentIt: a property marketplace | {name}` pattern, unique per page.
- **Meta description (home, about 130 characters):** "Frontend developer building React, Next.js and TypeScript products. {count} shipped projects, each shown with the decisions behind it." (the count is derived from published projects).
- **Per-page descriptions:** unique, 120 to 155 characters, written from each project's `summary`.
- **Open Graph:** `og:title`, `og:description`, `og:type` (`website` for home, `article` for projects), `og:url`, `og:image` (1200 by 630, generated per route with `next/og`, showing the title in Instrument Serif on paper), `og:site_name`, `og:locale`.
- **Twitter or X:** `twitter:card` = `summary_large_image` with the same title, description and image.
- **Structured data (JSON-LD):** `Person` on home and About; `WebSite` on home; `CreativeWork` (or `SoftwareApplication` with `applicationCategory: "WebApplication"`) on each project; `BreadcrumbList` on project pages.
- **Canonical:** set `metadataBase` and `alternates.canonical` per route. One canonical host, redirect the other.
- **Sitemap and robots:** `app/sitemap.ts` lists every public route with `lastModified`; `app/robots.ts` allows all and references the sitemap. `/lab/terminal` is included (it is harmless) unless it confuses indexing, then `noindex`.
- **Semantic HTML:** see section 28. Crawlers must receive full text in the initial HTML.
- **Project metadata:** each project's `seo` fields (title, description, ogImage) are required by the content schema.

Structured data values all come from `siteIdentity`. `worksFor` is emitted only when `employer` wording is approved. Illustrative shape:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "<name>",
  "jobTitle": "<role>",
  "url": "https://<domain>",
  "worksFor": { "@type": "Organization", "name": "<employer>" },
  "sameAs": ["<links.github>", "<links.linkedin>"],
  "knowsAbout": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Supabase"]
}
```

## 31. Analytics

**Principles:** cookieless, no personal data, no cross-site tracking, no session replay. Collect only what informs decisions about the site.

**Tool:** Vercel Web Analytics plus Speed Insights (cookieless), or self-hosted Plausible or Umami. Custom events are sent only when `navigator.doNotTrack !== "1"` and Global Privacy Control is not set.

| Event | Properties | Why |
|---|---|---|
| `page_view` | route, device class (mobile, tablet, desktop), referrer category | Traffic and entry points |
| `project_open` | slug, from (contents, palette, nav, deep link) | Which projects attract attention |
| `project_depth` | slug, depth (25, 50, 75, 100 percent of the experience) | Whether visitors get through an experience |
| `experience_interaction` | slug, type (step, resize, simulate, cite) | Whether the bespoke piece is used |
| `external_click` | target (live, github, linkedin), slug | Conversion to live products and profiles |
| `contact_action` | type (copy_email, mailto, linkedin, cv_download) | Conversion to contact |
| `nav_method` | method (click, palette, keyboard, menu) | Whether navigation models work |
| `palette_open` and `palette_select` | command group | Palette usefulness |
| `inspect_toggle` | state (on, off), route | Whether the signature layer is found |
| `brief_view` | route it was opened from | Fast path usage |
| `vitals` | LCP, INP, CLS, device class, connection type | Field performance. Only if Speed Insights is not used |

**Core events at R0:** `page_view`, `project_open`, `external_click`, `contact_action`, `brief_view` and field vitals. The rest (`project_depth`, `experience_interaction`, `nav_method`, `palette_open`, `palette_select`, `inspect_toggle`) are post-R0 and cut-first.

**Excluded:** IP addresses, user IDs, fingerprinting, geolocation beyond country, scroll position streams, click heatmaps, any free-text input.

**Dashboards:** one weekly view: entry routes, project opens and depth, contact actions, Inspect usage, p75 vitals by device class. The decision the data informs: which project experiences are worth polishing further.

---

## 32. Security

The site is static and collects almost nothing. Security work is about keeping it that way.

- **Data minimization:** no accounts, no forms, no cookies set by the site, no personal data stored. Analytics are cookieless (section 31). The phone number is not published by default.
- **Headers** (via `next.config` headers or middleware):
  - `Content-Security-Policy`: `default-src 'self'; script-src 'self' 'nonce-{nonce}' 'strict-dynamic'; style-src 'self' 'nonce-{nonce}'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://vitals.vercel-insights.com; frame-src https://space-tourismx.vercel.app; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`. Adjust `connect-src` for the chosen analytics endpoint. `frame-src` lists only the verified hosts of experiences that embed a live preview (Space Tourism in this PRD). Per-request nonces conflict with static generation, and static HTML is the stronger constraint, so Phase 3 picks a static-compatible policy (for example hashes) and records the choice as a decision.
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
- **External links:** `rel="noopener noreferrer"` on every `target="_blank"`.
- **Iframes:** only on explicit click, with `sandbox="allow-scripts allow-same-origin"` (the embedded sites are the owner's own deployments) and a `title`. No wallet or sign-in flows inside embeds.
- **Dependencies:** pin versions, run `npm audit` and Dependabot. The dependency rule in section 33 applies.
- **Secrets:** none in the client bundle. Environment variables are limited to analytics identifiers. No API keys at all in v1.
- **Content:** MDX is authored by the owner only. No user-generated content, so no sanitization surface. Content validation fails the build on malformed data.
- **Email exposure:** the contact address is public by design. Use a dedicated address and accept scraping as the cost of being reachable. Do not publish a phone number unless the owner decides otherwise.
- **Repository hygiene:** secret scanning enabled, `.env*` in `.gitignore`, no real private project code or screenshots in the repository.
- **Privacy note:** a short plain-text statement on the Contact page (no cookies, cookieless analytics, what is measured).

## 33. Technical Architecture

### Stack decisions

**Dependency rule.** Use the smallest implementation that satisfies the requirement. Every dependency needs a specific reason and a measurable benefit, recorded with its size in the PR. Native elements (`<dialog>`, `<details>`, Popover) come before libraries.

| Technology | Decision | Reason |
|---|---|---|
| **Next.js (App Router, current stable)** | Use | Static generation per route, metadata and OG image APIs, route-level code splitting, first-class Vercel deployment |
| **TypeScript (strict)** | Use | Content schemas and component contracts are part of the demonstration |
| **Tailwind CSS v4** | Use | Design tokens as CSS variables, fast iteration, small output. Tokens live in CSS, not in JS |
| **Motion (motion.dev)** | Use only where CSS and native APIs are insufficient or materially awkward, with `LazyMotion` and `m` components | Interruptible state-driven UI (stepper, sheets, annotation open and close). Not for the Opening, hover, underline draws or the Inspect flip. If CSS does it, Motion does not |
| **View Transitions API** | Use as progressive enhancement | Compositor-level crossfades for routes and the Inspect flip. Normal route navigation MUST work unchanged where it is unavailable (instant swap). Evaluate Next.js experimental support or a small wrapper in Phase 3 |
| **CSS scroll-driven animations** | MAY, sparingly | Not required. If used, it must have a static fallback |
| **Native React state and `useSyncExternalStore`** | Use first | Inspect state, shortcut setting, theme and lite mode need a tiny shared store. A module-level store read through `useSyncExternalStore` covers it |
| **Zustand** | Only if the shared UI state outgrows that | Needs a written reason and a measured benefit. Around 1 KB |
| **MDX with Zod-validated frontmatter** | Use (`@next/mdx` with `gray-matter`, or Velite) | Keeps content in the repo, typed, and validated at build. Choose the lighter one in Phase 3 |
| **Zod** | Use | Content validation at build time (and matches the owner's existing stack) |
| **web-vitals** | Use, lazy | Real measurements for Inspect and field data |
| **Vercel Web Analytics and Speed Insights** | Use | Cookieless, integrated with the deployment |
| **GSAP** | Do not use in v1 | Motion plus CSS covers the needs. Two animation engines is unjustified weight |
| **Lenis or any smooth-scroll library** | Do not use | Breaks find-in-page, anchors and expectations; adds INP and accessibility risk. Native scroll is part of "knowing when not to animate" |
| **Three.js and React Three Fiber** | Not in v1 | No requirement justifies it. Lab piece only, under section 19 conditions |
| **A UI component library** | Do not use | The system is small and bespoke. Use native `<dialog>`, `<details>` and Popover where possible |
| **A CMS** | Do not use | See non-goals |

### Application architecture

- **Rendering:** every route is statically generated (SSG). The dynamic segment `/work/[slug]` uses `generateStaticParams`. Client components are the exception, used only for interactive pieces.
- **Server and client split:** layout, content, metadata and Contents list are server components. Client components: `ShortcutProvider`, `InspectProvider`, `CommandPalette`, `AnnotationLayer`, the five experiences, the terminal.
- **Content pipeline:** `content/` (MDX and TS) then a build-time loader that validates with Zod and produces typed collections (`projects`, `decisions`, `experience`, `lab`, `timeline`). Invalid content fails the build with a readable error.
- **Single command registry:** one typed array of commands (`id`, `label`, `group`, `keywords`, `run`, `href?`) feeds the palette, shortcut handler, terminal and mobile jump sheet.

### Animation architecture

Three layers, using the lowest that works:

1. **CSS** (transitions, keyframes, `@starting-style`): hover, focus, the Opening, underline draws.
2. **Motion**: state-driven components with interruption handling (stepper, sheets, annotation open and close).
3. **View Transitions**: page-level crossfades and the Inspect flip.

A single `useMotionPreference()` hook returns `"full" | "reduced" | "lite"` from media queries, `Save-Data` and device hints, plus the visitor's override. Every animated component reads it. Motion tokens come from CSS variables (section 25) so values are defined once.

### WebGL architecture

None in v1. If a Lab piece is added, it lives behind a `<LabCanvas>` wrapper: dynamic import with `ssr: false`, mounted only after an explicit action, `failIfMajorPerformanceCaveat: true`, capped device pixel ratio (2), render on demand (not a perpetual loop), full disposal on unmount, and a static fallback image with alt text.

### Asset management and image optimization

- Screenshots captured at 2x, cropped consistently, named `{slug}-{figure}-{descriptor}.png`, stored in `content/projects/{slug}/`.
- Served through `next/image` as AVIF with WebP fallback. Each figure declares `width`, `height`, `alt`, `caption`, optional `pins`.
- Videos: MP4 (H.264) with a poster, see section 29. No GIFs.
- Favicon and OG images generated programmatically (`app/icon`, `opengraph-image.tsx`).

### Font loading

`next/font/local` or `next/font/google` with self-hosting, Latin subset, `display: swap`, CSS variables for families, automatic fallback metrics. Preload the three primary files. Italic loads without preload.

### Code splitting and lazy loading

Automatic per route. Explicit `dynamic()` for Inspect, palette, `web-vitals`, and each project experience. Prefetch on intent (hover, focus, first keyboard activity) and on idle. Below-the-fold figures use native `loading="lazy"`.

### Caching

Static HTML on the CDN edge. Immutable hashed assets (`max-age=31536000, immutable`). Images cached for one year via the optimizer (`minimumCacheTTL`). The optional GitHub activity strip is fetched at build time and falls back to a committed snapshot if the API fails.

### Error handling

- `not-found.tsx`, `error.tsx` per segment and `global-error.tsx` with the site's voice and a link home.
- Each project experience sits in an error boundary that falls back to its static version (the same figures and text).
- Iframe failure shows the poster and a link to open the site directly.
- Clipboard failure falls back to selected text.
- Analytics failures are silent and never block UI.
- A content schema violation fails the build, never production.

### Deployment

- **Host:** Vercel. `main` deploys to production, pull requests get preview URLs.
- **CI (GitHub Actions):** type check, lint, unit tests, content checks (section 40), build, bundle size check, Lighthouse CI on the preview, Playwright e2e and accessibility tests.
- **Domain:** `siteIdentity.domain`, HTTPS, one canonical host.
- **Workflow:** small branches per task, many small commits, Conventional Commits, merge via PR with preview check. Commit and push after every working step so a failed experiment never costs more than a few minutes.

## 34. Component Architecture

```
src/
  app/
    layout.tsx            frame, fonts, providers, skip link
    page.tsx              The Opening + Contents
    brief/page.tsx
    work/page.tsx
    work/[slug]/page.tsx  loads project + its experience component
    decisions/page.tsx
    about/page.tsx
    experience/page.tsx
    lab/page.tsx
    lab/terminal/page.tsx
    contact/page.tsx
    not-found.tsx
    sitemap.ts  robots.ts  opengraph-image.tsx
  components/
    shell/        Frame, Wordmark, NavBar, MobileMenu, Footer, CoordinatesReadout (optional, cut-first)
    type/         Display, Lead, Prose, Meta, Mono
    annotation/   Annotation, AnnotationLayer, Marker, DecisionCard, Figure, Pin
    inspect/      InspectProvider, InspectToggle, InspectOverlay, Chip, VitalsPanel
    palette/      CommandPalette, PaletteList, useCommandRegistry
    work/         Contents, ContentsRow, ProjectHeader, Chapter, StackList, NextProject
    experiences/  rentit/, space-tourism/, fx-checker/, marginalia/
    lab/          LabRow, Terminal (post-R0, cut-first)
    ui/           Button, LinkExternal, Toggle, Sheet, Disclosure, CopyButton
  content/
    identity.ts   projects/*.mdx   decisions/*.mdx   experience.ts   timeline.ts   lab.ts
  lib/
    content.ts  commands.ts  motion.ts  analytics.ts  seo.ts  a11y.ts  store.ts
  styles/
    tokens.css  globals.css
```

### Key component contracts

```tsx
// Attach a decision to an element or figure
type AnnotationProps = {
  decisionId: string;            // resolves to a Decision
  anchorId?: string;             // element or figure it points to
  placement?: "margin" | "inline";
};

// Figure with optional pins linked to decisions
type FigureProps = {
  id: string; src: string; alt: string; caption: string;
  width: number; height: number;
  pins?: { x: number; y: number; decisionId: string }[]; // x,y in 0..1
};

// Mark any element as inspectable
// <h1 data-inspect="Display|InstrumentSerif 168/154|--ink">
type InspectAttr = `${string}|${string}|${string}`; // component|type|tokens (color and spacing tokens, comma separated)

// One registry powers palette, shortcuts, terminal, mobile sheet
type Command = {
  id: string; label: string;
  group: "navigate" | "open" | "copy" | "view" | "decisions";
  keywords: string[];
  href?: string;                 // internal or external
  run?: () => void;              // for actions
  shortcut?: string;             // for display and binding
};
```

**Rules:** experiences are self-contained components receiving `project` and its `decisions`. They never import global layout state except through the motion and Inspect hooks. Every experience exports a static fallback.

## 35. Data Model

Improvements over the starting structure: decisions are first-class and separate; projects have a `kind` and an `experience.mode`; media carry alt text and pins; links are typed; claims that need verification have a `verified` flag; there is a `status` for honesty.

```ts
export type Theme =
  | "state" | "data" | "motion" | "a11y"
  | "performance" | "architecture" | "ux" | "security";

export type Decision = {
  id: string;                       // "rentit-zod-boundary"
  projectSlug: string | "site";     // "site" = the portfolio itself
  title: string;                    // verb phrase
  context: string;                  // 1-2 sentences
  options: string[];                // 2-3 considered
  choice: string;
  tradeoff: string;
  result?: string;                  // only if verifiable
  status: "kept" | "reversed" | "open";
  theme: Theme;
  anchor?: { figureId?: string; chapterId?: string };
  evidence: { label: string; ref: string }[]; // at least one: repo path, commit, PR, asset id or URL the choice traces to
  verified: boolean;                // checked against a source (see below)
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;                  // <= 90 chars, used as the Contents margin note
  kind: "product" | "implementation" | "concept" | "experiment";
  year: number;
  status: "live" | "testnet" | "concept" | "archived";
  role: string;                     // "Design and build"
  order: number;
  featured: boolean;
  summary: string;                  // 120-155 chars, SEO description
  premise: string;                  // 60-90 words
  stack: { name: string; category: "framework" | "language" | "styling" | "data" | "state" | "validation" | "tooling"; why: string }[];
  links: { live?: string; repo?: string; caseStudy: string };
  media: { id: string; kind: "screenshot" | "video" | "diagram"; src: string; poster?: string; alt: string; caption: string; width: number; height: number }[];
  experience: { mode: "walkthrough" | "resizer" | "console" | "state-gallery" | "manuscript"; component: string };
  problems: { title: string; body: string }[];       // 2-3
  reversals: string;                                  // "What I would change"
  seo: { title: string; description: string; ogImage?: string };
  evidence: { label: string; ref: string }[];         // what exists: deployment, repo, commit, asset id, recorded state
  verified: boolean;                                   // see below
};

export type ExperienceEntry = {
  id: string; org: string; role: string;
  type: "internship" | "full-time" | "service" | "leadership" | "education";
  start: string; end: string | null;   // ISO year-month
  location: string;                    // "Remote" or "Oyo State, Nigeria"
  summary: string;
  evidence: { label: string; href: string }[];
  public: boolean;                     // false = hide until approved
};

export type TimelineYear = { year: 2023 | 2024 | 2025 | 2026; line: string; artifacts: { label: string; href: string }[]; intentionallyBlank?: boolean };

export type LabItem = { slug: string; title: string; year: number; stack: string[]; href: string; repo?: string };
```

### Site identity (canonical)

Public identity lives in one typed config, `content/identity.ts`. Nothing else in the repository (copy, metadata, JSON-LD, the Brief, the footer, the palette, OG images) hard-codes these values, so changing one field changes every page.

```ts
siteIdentity = {
  name,          // "Olamilekan Ilesanmi"
  role,          // public headline role; the Log keeps exact job titles
  location,      // "Oyo State, Nigeria" (remote)
  employer,      // approved wording only
  currentWork,   // approved wording only
  stackLine,     // one line, used on the homepage and the Brief
  availability,  // one sentence
  email,
  links,         // { github: "https://github.com/Olamilekan-oluwayomi", linkedin: "https://www.linkedin.com/in/olamilekanilesanmi" }
  cv,            // "/olamilekan-ilesanmi-cv.pdf"
  domain
}
```

This is a specification, not implementation code. `employer` is published as PitchMatter; `currentWork` stays empty and no page, tag or structured data names the product or describes the work (owner, 2026-10-03; section 18).

### What `verified` means

`verified: true` means the fact has been checked against an appropriate source, and `evidence` says which: repository or commit evidence, owner confirmation, the live deployment, or approved public or employer wording. It does not mean "read it over" or "sounds right". The default is `false`. An uncertain fact must never become public because someone forgot to remove it, so the production build fails on it (section 40) instead of relying on memory. Interpretation is held to the same bar: a claim about what a project demonstrates needs evidence that it does (section 38).

### Example entry (RentIt, illustrative, every field to be verified)

```ts
export const rentit: Project = {
  slug: "rentit",
  title: "RentIt",
  tagline: "Two-sided marketplace where a profile must be complete before anyone can book.",
  kind: "product",
  year: 2026,
  status: "live",
  role: "Design and build",
  order: 1,
  featured: true,
  summary: "A property marketplace with authentication, listings, booking and messaging, built with React, Vite, Supabase and Zod.",
  premise: "...", // 60-90 words, owner writes
  stack: [
    { name: "React", category: "framework", why: "..." },
    { name: "Vite", category: "tooling", why: "..." },
    { name: "Tailwind CSS", category: "styling", why: "..." },
    { name: "Supabase", category: "data", why: "..." },
    { name: "React Router", category: "framework", why: "..." },
    { name: "Zod", category: "validation", why: "..." }
  ],
  links: {
    live: "https://rentitdaily.vercel.app/",
    repo: "https://github.com/Olamilekan-oluwayomi/rentit",
    caseStudy: "/work/rentit"
  },
  media: [],
  experience: { mode: "walkthrough", component: "rentit" },
  problems: [],
  reversals: "...",
  seo: { title: "RentIt: a property marketplace", description: "..." },
  evidence: [],
  verified: false
};
```

```ts
// Illustrative shape only. As written it is generic and would fail the specificity test in section 16.2. Replace it with the real choice from the repository.
export const rentitZod: Decision = {
  id: "rentit-zod-boundary",
  projectSlug: "rentit",
  title: "Validate at the form boundary with Zod",
  context: "Listing and profile forms accept many fields and feed a database.",
  options: ["Inline checks per field", "A Zod schema shared by form and request", "Database constraints only"],
  choice: "A Zod schema shared by the form and the request.",
  tradeoff: "One more dependency and a schema to keep in step with the database.",
  status: "kept",
  theme: "data",
  evidence: [],
  verified: false
};
```

Repository names (from the owner's GitHub): `rentit`, `guardrail-dapp`, `foreign-exchange-checker`, `space-tourism-website-main`. The Marginalia repository is `Marginalia` and is public.

## 36. Routing

**Recommendation: a hybrid.** Real routes for every meaningful destination, wrapped in one persistent client shell that provides transitions, the palette and Inspect.

**Why not a single page:** crawlable and shareable URLs per project, per-route Open Graph images, the browser back button working as expected, route-level code splitting, and deep links that land a recruiter directly on the thing they were sent. **Why not fully separate pages:** losing the persistent frame would make transitions feel like reloads and would fragment the palette and Inspect state.

| Route | Rendering | Notes |
|---|---|---|
| `/` | Static | The Opening and Contents. Lightweight, no experience chunks |
| `/brief` | Static | No JavaScript required. Print stylesheet. Mirrors data from content files |
| `/work` | Static | Contents of all projects |
| `/work/[slug]` | Static (`generateStaticParams`) | Loads its experience component dynamically |
| `/decisions` | Static | Filters via query string (`?theme=`, `?project=`, `?status=`), progressive enhancement, server-rendered default |
| `/about` | Static | Optional build-time GitHub data (post-R0, cut-first) |
| `/experience` | Static | |
| `/lab` | Static | Items link out. No per-item pages in v1. Post-R0 |
| `/lab/terminal` | Static shell, client terminal | Post-R0, optional, cut-first |
| `/contact` | Static | |
| `/sitemap.xml`, `/robots.txt` | Generated | |
| `*` | `not-found` | |

**Redirects:** `www` to apex (or the reverse), trailing-slash consistency, `/projects/*` to `/work/*` if old links exist.

## 37. Content Strategy

**Tone:** confident, human, concise, technical, curious, specific. Active voice. Concrete nouns. Short sentences. Numbers only when verifiable.

**Banned phrases** (unless used with a genuinely original reason): "passionate developer", "turning ideas into reality", "crafting digital experiences", "results-driven", "innovative solutions", "self-taught", "aspiring", "learner", "seamless experiences", "cutting-edge", "transformative", "best-in-class", "AI-powered". Also avoid em dashes in all site copy, and avoid performance-score claims in project descriptions.

**Sample voice:**

- Weak: "I'm a passionate developer who loves building beautiful websites."
- Better: "Frontend developer. I keep notes on every decision, including the ones I got wrong."
- Project line: "A marketplace where a profile has to be complete before anyone can book. Here is why."

### Content by section

| Section | Information needed | Why it matters | Text | Visual | Interactive |
|---|---|---|---|---|---|
| Home | Name, role, employer, stack, brief link, Contents | The 30-second answer | 40 words above Contents | Typography only | Margin notes, Inspect |
| Brief | Role, location, stack, current work, projects with links, experience, contact, CV | Fast path for recruiters | One 1440x900 viewport | None | None (plain links) |
| Work (Contents) | One row per project: title, year, stack, headline decision | Orientation | 1 line per project | None | Hover note |
| Project | Premise, experience, decisions, stack, problems, reversals | Proof of product thinking and judgment | 500 to 900 words total plus figures | Screenshots and the bespoke piece | The experience |
| Decisions | All records, filters, matrix | Evidence of judgment at scale | 15+ records | Matrix | Filters |
| About | Four years, artifacts, computed themes | Progression and working style | 180 words max | Large year numerals | None |
| Experience | Entries with evidence | Professional credibility | 1 to 3 lines each | None | Disclosure |
| Lab | Small experiments | Curiosity | 1 line each | Optional thumbnails | Links |
| Contact | Email, links, availability, CV | Conversion | 30 words | Email as display type | Copy |

### Brief page spec

One column, plain HTML, print-friendly:

1. Name, role, location, availability line, all from `siteIdentity`.
2. Employer from `siteIdentity` (draft: PitchMatter, August 2026 to present). No product name and no description of the work.
3. `siteIdentity.stackLine`.
4. Each published project: name, one-line description, Open live, Source.
5. Experience and education in five lines.
6. Contact: email, LinkedIn, GitHub, CV, all from `siteIdentity`.

The six blocks MUST fit a 1440x900 viewport without scrolling. If they do not, trim copy, never body type below 16 px.

## 38. Project Content Requirements

**Eligibility.** Five projects is the target, not a quota. A project is deferred, not padded, if it cannot meet the requirements below without invented features, invented metrics, unverifiable claims, fabricated decisions, misleading screenshots or unavailable source material. Truthful evidence beats an arbitrary count. Copy that states how many projects exist derives the number from published content. Deferring a project does not relax the 15-record total (section 16.2).

Minimum content to publish any project page:

- [ ] `tagline` of 90 characters or fewer, `summary` of 120 to 155 characters, `premise` of 60 to 90 words.
- [ ] At least 3 decision records with `verified: true`, each passing the specificity test and carrying evidence (section 16.2). The reversed or open minimum is portfolio-wide, not per project.
- [ ] At least 4 figures at 2x with alt text and captions, or the bespoke piece plus 2 figures.
- [ ] Stack list with a one-line "why" per technology.
- [ ] 2 to 3 "Problems and fixes".
- [ ] "What I would change" paragraph.
- [ ] Verified live URL and a repository URL (or a written reason the source is private).
- [ ] Every claim about what the project demonstrates is backed by an item in its `evidence` list (table below).
- [ ] A static fallback for the experience.
- [ ] Open Graph image generated.

### Per-project asset needs

| Project | Bespoke piece needs | Assets to capture |
|---|---|---|
| RentIt | Five steps, each with a screenshot or short loop, pins | Browse, listing detail, booking request, message thread, listing management, profile completion |
| Space Tourism | Live iframe poster, three-width screenshots | Home, destination, crew, technology at 375, 768 and 1280 |
| Guardrail (deferred, section 38) | Not built | Not captured |
| Foreign Exchange Checker | Snapshot dataset, state screenshots or recreations | Result and missing result, history loading, history empty or failed, search no results, empty favorites and log, missing comparison amount |
| Marginalia | Manuscript text with 6 to 10 source markers (fewer if fewer are real) and their evidence | Main interface, citation view, manuscript view, source panel |

### Evidence and interpretation

Evidence is what actually exists. Interpretation is what the portfolio says it demonstrates. Interpretation never outruns evidence.

| Project | Evidence that must exist first | Interpretation, only as far as the evidence reaches |
|---|---|---|
| RentIt | The deployed app, the repository, a screenshot of each of the five steps as they exist, and the real rules read from code and Supabase policies (profile-completion gate, access by role, booking statuses if any) | "End to end product thinking" and the Permission map, limited to rules that exist. A booking state diagram only if statuses exist |
| Space Tourism | The deployed site, the repository, the real layout at 375, 768 and 1280 px, the sections that exist, the tab markup and keyboard behavior as built | "Art direction" and "accessible tabs" only if the markup does it. If it began from a provided design, the page says so and separates that design from the owner's own choices |
| Guardrail (deferred, section 38) | Deferred. The contract source is unrecoverable, so the evidence this row requires cannot exist (`docs/truth/guardrail.md:61`) | No interpretation is published |
| Foreign Exchange Checker | The deployed app, the repository, the real data source, and only the states the app actually has. Recreated states are labeled as recreated, and the snapshot dataset is labeled as a dated snapshot | "Numbers you can trust" only for the formatting and rounding the code really does. A state the app lacks is dropped from the gallery, never invented |
| Marginalia | The deployed app, the repository (or a written reason it is private), real screens, the facts of the AI integration | Described as the concept it is. Every numbered source marker resolves to a real screenshot, file or commit. Fewer real markers beat padded ones |

---

## 39. Development Phases

**Planning assumption:** about 250 focused hours in total (the phase estimates below sum to 248), roughly 25 weeks at 10 hours a week, so the plan is built to ship early and layer depth on top. v1.0 said 180 to 240, but its phases summed to 216 and gave project verification, decision writing and asset capture only 6 hours of their own (Phase 1) plus whatever Phase 6 had left after building five experiences. Those are now counted explicitly. The estimate **excludes** waiting time (PitchMatter wording approval, the three-day gap in the memorability test) and post-launch iteration beyond Phase 12's first-week review. Phase 6 carries the most uncertainty, so re-estimate after R1.

**Release plan:** R0 after Phase 4 (a live, job-ready site: Brief, Work list, About, Experience, Contact), R1 after two project experiences, R2 after all five (or all that pass section 38), R3 after polish. Nothing waits for the end. Every release meets the accessibility and content-truth rules for the routes it ships. At R0, a project without a finished page appears in Work and the Brief as title, year, stack, one-line description, Open live and Source only: no case-study link and no decision note until its page ships.

**Commit cadence (all phases):** commit and push after every working step. One branch per task, many small commits, Conventional Commit messages, open a PR for each phase chunk so Vercel gives a preview. Tag releases R0 to R3.

| # | Phase | Objective | Deliverables | Dependencies | Definition of done | Est. |
|---|---|---|---|---|---|---|
| 1 | Project truth and decision evidence | Lock the concept, and know what is true before building the interface around it | Approved PRD v1.1, a project truth sheet per project, decision seeds (below), Appendix A items resolved or deferred in writing, voice sample | None | Every `[CONFIRM]` has an owner decision or is deferred in writing (deferred facts stay out of public copy). Every seed names its evidence. Seeds reviewed for specificity | 14 h |
| 2 | Design system | Turn the visual system into tokens and specimens | `tokens.css`, type specimen page, color and contrast table, motion tokens, sample Annotation and Figure in static HTML, final font choice with measured file sizes | Phase 1 | Contrast verified by tooling. Specimen renders in light and night. Font budget measured | 14 h |
| 3 | Core architecture | Stand up the app skeleton | Next.js app, TypeScript strict, Tailwind v4, content pipeline with Zod, CI, Vercel project, size and Lighthouse checks, analytics stub | Phase 2 | `main` deploys, content schema failure breaks the build, CI green | 14 h |
| 4 | Navigation | Build the frame and every always-available route | Frame, NavBar, MobileMenu, Footer, skip link, command registry, palette, shortcut provider with on or off setting, `/brief`, `/about` (static), `/experience` (static Log), `/contact`, `/work` list, 404 | Phase 3 | All required affordances (section 14) present on every route, and navigation lists only routes that exist in the release (Lab appears when `/lab` ships). Palette keyboard and screen reader tested. **Release R0** | 18 h |
| 5 | Interactive environment | Build the signature layers | The Opening, Contents margin notes, Annotation system, Inspect overlay and panel, theme flip, view transitions, lite mode hook | Phase 4 | Opening 2 s or less and skippable. Inspect shows only measured or authored values. Reduced motion works. No layout shift on toggle | 30 h |
| 6 | Project experiences | Build the five pieces and the case-study spine | Project template and spine (8 h), five experiences at a 12 h time box each (60 h), decision writing, evidence checks and asset capture (16 h), figures, static fallbacks | Phases 4, 5, content from Phase 1 | Each project meets section 38. Each experience works without JavaScript in its fallback. **R1 after two projects, R2 after five** | 84 h |
| 7 | About and decisions | Build The Record in full and `/decisions` | Timeline with the Gap, computed themes, Log evidence links, decisions index and matrix | Phases 5, 6 | Word limits met, evidence links resolve, matrix counts match content | 12 h |
| 8 | Contact and Lab | Finish the smaller surfaces | Contact polish, copy flow, Lab list, terminal (post-R0, cut-first) | Phase 4 | Copy works with assistive tech and fails gracefully | 6 h |
| 9 | Accessibility | Reach and verify AA | Audit fixes, keyboard pass, screen reader passes, reduced-motion pass, target size pass | Phases 4 to 8 | Automated checks clean, manual checklist (section 41) signed off | 18 h |
| 10 | Performance | Meet and lock the budgets | Bundle review, lazy loading, image and font tuning, low-end device pass, budget checks enforced in CI | Phases 5 to 8 | All lab gates in section 29 pass in CI and the real-device checks pass. Field monitoring is live (it is not a gate) | 16 h |
| 11 | QA | Find what remains | Cross-browser, cross-device, content proofread, link check, SEO checks, analytics events verified, five-reviewer memorability test | Phases 9, 10 | QA checklist complete, no open severity 1 or 2 issues | 16 h |
| 12 | Deployment | Launch and observe | Production domain, headers, OG images, sitemap, redirects, analytics dashboard, launch announcement draft. **Release R3** | Phase 11 | Production passes section 43. First-week field data reviewed, misses logged as issues | 6 h |

**Phase 1 in detail.** The goal is not polished sentences before coding. It is knowing what is true before the interface is built around it. Invent nothing. Anything that cannot be verified is deferred.

- **Project truth** (per project, verify where possible): name, year, live URL, repository, actual features, actual states, actual behavior, screenshots and assets, technology used, employment and public-work wording, confidentiality restrictions.
- **Decision evidence:** at least 15 decision seeds, at least 3 per project, and at least 2 candidates for `reversed` or `open`. Each seed names the repository file, commit or other evidence it comes from (section 16.2).

## 40. Testing Strategy

| Layer | Tools | What it covers |
|---|---|---|
| **Unit** | Vitest | Content schemas (valid and invalid fixtures), command scoring, `useMotionPreference`, analytics gating (DNT, GPC), decision filters, matrix counts |
| **Component** | Testing Library | Annotation open and close, stepper keyboard behavior, tabs, slider, palette combobox semantics, copy button states |
| **End-to-end** | Playwright | Every journey in section 13; the 30-second path in at most 2 interactions; keyboard-only run through every route; palette and shortcuts on and off; Inspect toggle without layout shift; mobile viewport runs; back button behavior; deep links |
| **Accessibility automated** | `@axe-core/playwright` on every route in light, night and Inspect states | Structure, names, contrast, landmarks |
| **Accessibility manual** | NVDA with Firefox, VoiceOver on macOS and iOS, TalkBack spot check, keyboard-only, 200 percent zoom and 400 percent reflow, reduced motion, high contrast mode | What automated tools cannot judge |
| **Visual regression** | Playwright screenshots on key routes, light and night, desktop and mobile | Unintended visual drift (small tolerance) |
| **Performance lab** | Lighthouse CI, bundle size checks, `@next/bundle-analyzer` | Lab gates in section 29 |
| **Performance field** | Speed Insights or `web-vitals` | p75 LCP, INP, CLS by device class after launch (monitoring, not a gate) |
| **Real devices** | One low-end Android (or 4x CPU and Slow 4G throttle), one recent iPhone | Jank, touch targets, sheets, Safari quirks |
| **Content** | Link checker, spell check, banned-phrase and em dash lint, `verified` flag check, `[CONFIRM` marker scan, decision counts | No unverified or uncertain claims in production |

**Content gate.** Production builds (`main` and release tags) fail if any published Project or Decision has `verified: false` or no `evidence`, if any published content or identity value still contains a `[CONFIRM` marker, or if a count rule in section 16.2 is broken for what is shipping (3 verified per shipped project, and the portfolio totals from R2). PR preview builds report the same findings as warnings, so work in progress stays visible without being publishable.

## 41. QA Checklist

**Fast path**
- [ ] On `/`, name, role, employer, stack and brief link are visible without interaction (390x844 and 1440x900).
- [ ] `/brief` fits a 1440x900 viewport without scrolling and prints cleanly.
- [ ] Email, LinkedIn, GitHub and CV links work and are correct.

**Navigation**
- [ ] Home, Work, About, Contact, external project, GitHub and LinkedIn are each reachable from every page.
- [ ] Every project is reachable in two interactions or fewer.
- [ ] Palette opens with `⌘K` and `Ctrl K`, closes with `Esc`, restores focus.
- [ ] Single-character shortcuts can be switched off and stay off after reload.

**Experience**
- [ ] Opening plays once per session and is skipped when expected.
- [ ] Margin notes appear on hover and focus, and appear inline on touch.
- [ ] Inspect toggles with no layout shift and shows only measured or authored values ("not yet measured" where nothing was measured).
- [ ] Every decision shown has `verified: true` and evidence.

**Projects**
- [ ] Each of the five meets section 38.
- [ ] Each experience works with keyboard only and has a working static fallback.
- [ ] Iframe previews load only after a click and have titles.
- [ ] Live links are correct and match the verified values in content.

**Responsive**
- [ ] 320, 390, 768, 1024, 1440 and 1920 px render without horizontal scroll.
- [ ] No hover-only information on touch.
- [ ] Targets are at least 44 px on touch.

**Accessibility**
- [ ] One H1 per page, logical headings, landmarks present.
- [ ] Focus is visible everywhere and never obscured.
- [ ] Screen reader pass on home, a project, decisions and contact.
- [ ] Reduced motion and lite mode verified.
- [ ] Contrast checked in light, night and Inspect.

**Performance**
- [ ] Lab gates in section 29 pass in CI and the real-device checks pass.
- [ ] Field monitoring is live and reports p75 LCP, INP and CLS by device class.
- [ ] No layout shift when fonts, images or iframes load.

**SEO and sharing**
- [ ] Unique titles and descriptions per route.
- [ ] OG and Twitter previews render correctly for home and each project.
- [ ] Sitemap and robots correct, canonical host enforced, JSON-LD validates.

**Security and privacy**
- [ ] Headers present and CSP reports no violations on any route.
- [ ] No cookies set. Analytics respect DNT and GPC.

**Content**
- [ ] No banned phrases, no em dashes, no fake metrics, no performance-score claims in project copy.
- [ ] No proprietary PitchMatter material. Employer name approved; no product name and no work description is published.

## 42. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation | Early warning |
|---|---|---|---|---|
| **Overengineering** (a bespoke system before any content exists) | High | High | Release R0 after Phase 4 with plain pages. Build experiences one at a time. Every dependency needs a written reason | Phase 5 passes 40 hours |
| **Excessive animation** | Medium | High | Five signature moments only. Avoid list in section 25. Reduced motion and lite mode are built first, not last | Anyone asks "what is that animation for" |
| **Performance regression** | Medium | High | CI lab gates, lazy chunks, no WebGL in v1, real-device passes | A lab gate fails, or INP rises in field data (logged, not a gate) |
| **Mobile complexity** | Medium | High | Separate mobile strategy (section 27), mobile is reviewed alongside desktop in every phase | A feature only works with hover |
| **Accessibility problems** | Medium | High | Content-first HTML, native elements, automated plus manual testing, single-character shortcut switch | axe violations in CI, manual pass fails |
| **Long development time** | High | Medium | Phased releases, time-boxed experiences (12 hours each), cut order in section 5 | A project experience exceeds its box |
| **Visitors get lost** | Low | High | Plain labels, persistent frame, breadcrumb, palette, `/brief`, 404 with Contents | Low `nav_method` diversity, high exits from project pages |
| **Portfolio chrome** (visitors remember the mechanics, not the work) | Medium | High | Content beats chrome (section 11). Default state is Quiet. Notes are one sentence. Project facts are readable without any layer. The memorability test (G5) checks that reviewers recall projects and decisions. Cut unnecessary interaction before adding more | Reviewers recall the gimmick but not the projects |
| **Fake-feeling Inspect** | Medium | High | Measured or authored values only, "not yet measured" instead of placeholders | Any hard-coded metric in code review |
| **Content quality** (a technically impressive site with generic decision records) | High | High | Write every decision from actual project evidence: Phase 1 seeds name their source. Review each record for specificity and remove any that could describe almost any developer project. Mark `verified` only after review. Keep each under 120 words | Decisions read as generic advice rather than specific choices |
| **Unverified claims published** | Medium | High | `verified` flag, the production content gate and the `[CONFIRM` scan (section 40). Open facts listed in Appendix A | Gate is bypassed |
| **Confidentiality breach** (PitchMatter) | Low | High | Pattern-level descriptions only, written approval, `public: false` default on entries | Any PitchMatter screenshot in the repo |
| **Browser support gaps** (View Transitions, Popover) | Medium | Low | Progressive enhancement with instant fallbacks, tested in latest Chrome, Safari and Firefox | A feature breaks navigation rather than degrades |
| **WebGL compatibility** | Low | Low | No WebGL in v1. Lab piece has conditions and a fallback | Only if a Lab piece is added |
| **Maintenance burden** | Medium | Medium | One project file plus its decision files, typed schemas, few dependencies, scheduled dependency updates | Adding a project touches more than content and one component |

## 43. Definition of Done

The portfolio is done when every MUST in this document is implemented or deferred in writing with a reason, and all of the following are true. Cut-first features (section 5) are not required for done. Shipping one before the core is complete counts as scope creep.

1. **Product.** The recruiter fast path works: role, stack, employer (approved wording) and a contact route are visible on `/` with zero interaction, `/brief` exists and fits a 1440x900 viewport, and contact is two interactions or fewer from anywhere.
2. **Product.** Brief, Work, About, Experience and Contact each exist and work. Every published project is reachable in two interactions or fewer.
3. **Product.** Each published project page meets section 38 and has a static fallback for its experience.
4. **Content.** No invented claims. Every `[CONFIRM]` is resolved or its fact is removed, and no `[CONFIRM` marker remains in published content.
5. **Content.** At least 15 verified decision records, at least 3 per shipped project, at least 2 across the portfolio `reversed` or `open` (section 16.2). Each passes the specificity test and carries evidence.
6. **Content.** Project evidence exists for every published project (section 38), and interpretation does not outrun it.
7. **UX.** Every page is readable without the enhancement layers (annotation, Inspect, transitions, palette).
8. **UX.** Mobile works independently of hover and has been tested on real hardware.
9. **UX.** Keyboard navigation works on every route, reduced motion works, single-character shortcuts can be switched off, and every optional layer can be skipped.
10. **Technical.** Build and CI pass, including the content gate and the lab gates in section 29.
11. **Technical.** Field performance is monitored separately (p75 LCP, INP, CLS by device class) and first-week data has been reviewed. Field numbers are not a release gate.
12. **Technical.** Static fallbacks exist and work. Inspect works on every route and shows only measured or authored values.
13. **Technical.** WCAG 2.2 AA is verified by automated and manual testing.
14. **Technical.** SEO assets (titles, descriptions, OG images, JSON-LD, sitemap, robots, canonical) are live and validated.
15. **Technical.** Analytics are cookieless and respect DNT and GPC. Security headers are deployed and the CSP reports no violations.
16. **Technical.** The source repository is public, with a README explaining decisions about the site itself (project zero).
17. **Quality.** No proprietary PitchMatter material, no fake metrics, no unsupported performance claims, no banned phrases, and no em dashes in site copy.
18. **Quality.** No accidental scope creep: every shipped feature traces to a line in this PRD, and no cut-first feature shipped ahead of the core.
19. **Concept.** Content beats chrome. The memorability test (G5) has been run with five reviewers and recorded. If reviewers recalled only mechanics, chrome was cut before launch, and any interaction whose removal loses no information has been removed.
20. **Concept.** Each signature moment has a purpose (section 11), and Quiet remains the default state: the site returns to it after every interaction.

## 44. Future Enhancements

- **Writing:** short notes that expand a decision record into an essay, with RSS.
- **Decision map:** an SVG visualization of decisions by theme, only if the data is rich enough to justify it.
- **Activity strip:** a GitHub commit history strip on About, including the honest 2023 gap.
- **Lab WebGL piece:** one lazily loaded, desktop-only piece meeting section 19 conditions.
- **Case study depth:** a second tier of "full record" pages per decision.
- **Print and PDF brief:** generated from the same content as `/brief`.
- **Localization:** only if a real audience appears.
- **Site changelog:** a running list of changes to the portfolio, written as decisions.
- **Contact form:** only if email proves insufficient, with a server action, rate limiting and bot protection.
- **Additional projects:** PitchMatter work (pattern level, with approval), DealBridge CRM case study, Branch Watch tracker story.

---

## Appendix A. Open items for the owner (resolve in Phase 1)

The canonical inventory of `[CONFIRM]` facts, grouped by category. Resolve or defer each in writing. A deferred fact stays out of public copy.

1. **Identity.** Public role title for `siteIdentity.role`. The drafts in the SEO title and subline are voice samples.
2. **Employment and confidentiality.** PitchMatter wording: what may be said publicly about DealBridge CRM (`employer`, `currentWork`) and what must stay private. Written approval from the company if required.
3. **Employment and confidentiality.** Experience Log facts: titles, dates and the Blueskills branch count, checked against the CV (section 18).
4. **Projects.** Project years and origins: RentIt, Marginalia, Guardrail, FX Checker and Space Tourism.
5. **Projects.** Feature truth: Guardrail's enforced rules, FX Checker's data source and states, RentIt's booking statuses and access rules, Space Tourism's sections, Marginalia's AI integration.
6. **Repositories and links.** Live URLs for every project. Drafted here: Marginalia https://marginalia-u6x8.vercel.app/ (confirm it is the current deployment), Space Tourism (section 32) and RentIt (section 35). No URL is drafted for Guardrail or FX Checker.
7. **Repositories and links.** Repository names and visibility: RentIt, Guardrail, Foreign Exchange Checker, Space Tourism and Marginalia, plus the site's own source repository (section 43).
8. **Assets.** CV file: final PDF at the `siteIdentity.cv` path. No class of degree or CGPA.
9. **Assets.** Photo: whether to include one on About (v1 default: none).
10. **Contact.** Public email address, and whether to publish a phone number (default: no).
11. **Availability.** Exact wording and reply time.
12. **Lab.** Which small projects to list, and whether Branch Watch relates to the Blueskills work.
13. **Domain and SEO.** Domain name for canonical URLs and OG images.
14. **About and timeline.** The 2023 gap: confirm it is accurate and that the owner wants it shown, that it does not contradict the Log's 2023 entry (President, NAGS), and (optionally) whether the activity strip supports it.

## Appendix B. Rules for implementing agents

1. **Build order follows phases.** Deliver Release R0 (Phase 4) as a working, deployed site before any bespoke experience.
2. **Content first.** Write real copy and real decisions from the repositories. No lorem ipsum and no invented metrics or features. Where a fact is uncertain, stop and ask, or leave `verified: false` on a branch. Unverified content never reaches `main` (section 40).
3. **Dependencies:** the dependency rule in section 33 applies. List any addition, with the reason, the measured benefit and the size, in the PR.
4. **Motion:** follow section 25 exactly. If an animation is not listed, do not add it. If removing it loses no information, remove it.
5. **Accessibility is not a phase:** write semantic HTML from the first component. Every interactive element gets a keyboard path and focus style when created.
6. **Measure, do not guess:** Inspect data must come from real measurement or authored content.
7. **No scope creep:** do not add WebGL, smooth scroll, a CMS, a form, or a component library, and do not start a cut-first feature (section 5) before the core is complete.
8. **Small commits:** commit and push after each working step, with Conventional Commit messages. Keep PRs reviewable.
9. **Style:** no em dashes in any site copy or documentation. Sentence case headings on site UI.
10. **When the PRD and reality conflict,** record a decision (using the Decision model), adjust the PRD, and continue.
