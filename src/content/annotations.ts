// Owner-approved interactive brief, 2026-10-06: PRD.md Appendix C and
// docs/prd-amendments.md section I. Every note cites the code, truth sheet
// or PRD line it annotates, so nothing here is invented (Appendix B rules 2 and 10).

export type ConceptId = "hierarchy" | "interaction" | "accessibility" | "performance";

export type NoteRecord = { label: string; note: string; source: string };

// Hero concept anchors: one contextual example each, from real project evidence.
export const conceptNotes: ({ id: ConceptId } & NoteRecord)[] = [
  {
    id: "hierarchy",
    label: "Hierarchy",
    note: "In RentIt's browse grid, price and location filters sit beside search and categories, the two facts a renter weighs first.",
    source: "docs/truth/rentit.md:112",
  },
  {
    id: "interaction",
    label: "Interaction",
    note: "RentIt rechecks availability at submit time and reports a failure inline where the booking happens, not in a separate dialog.",
    source: "docs/truth/rentit.md:121, docs/truth/rentit.md:208",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    note: "Space Tourism's selection controls are named native buttons that expose aria-pressed instead of using the ARIA tabs pattern.",
    source: "docs/truth/space-tourism.md:77 to :79",
  },
  {
    id: "performance",
    label: "Performance",
    note: "Text is the LCP element on the homepage: no hero image or canvas loads before the name.",
    source: "src/app/page.tsx",
  },
];

// Decision Mode site notes: a small number, one per placement, always checkable.
export const siteNotes: Record<"static-dot" | "grid-gap" | "no-card-border" | "one-spine" | "theme-counts", NoteRecord> = {
  "static-dot": {
    label: "Why the dot does not blink",
    note: "The availability marker stays static: the site holds still unless you act, so nothing pulses or loops for attention.",
    source: "PRD.md section 11.2",
  },
  "grid-gap": {
    label: "Why this spacing",
    note: "The work grid holds 96px between projects and 48px between columns, enough separation to read each project as its own entry without boxing it into a card.",
    source: "src/styles/globals.css, .project-grid",
  },
  "no-card-border": {
    label: "Why no card border",
    note: "Project surfaces use color, scale and rules instead of borders, shadows or rounded corners, so the page reads as an editorial spread rather than a dashboard.",
    source: "docs/homepage-direction.md, src/styles/globals.css",
  },
  "one-spine": {
    label: "Why one spine",
    note: "Every case study runs through the same eight blocks, header to exit, so projects can be compared block by block instead of page by page.",
    source: "PRD.md section 16.1",
  },
  "theme-counts": {
    label: "Why counts, not adjectives",
    note: "The About page counts recorded decisions by theme instead of describing them, so the summary stays checkable against the records themselves.",
    source: "src/app/about/page.tsx",
  },
};

export type SiteNoteId = keyof typeof siteNotes;
