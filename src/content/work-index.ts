// R0 listing facts, not published case-study records (PRD.md section 39).
// Years, origins, live URLs and repository visibility: docs/phase-1-exit.md
// Appendix A items 4, 6 and 7. Features and stack: the referenced truth sheets.
export const workIndex = [
  {
    slug: "rentit", title: "RentIt", year: 2026, category: "Item rental marketplace",
    summary: "Item listings, booking requests and messaging in one marketplace.",
    stack: ["React", "Supabase", "Zod"],
    live: "https://rentitdaily.vercel.app/",
    repo: "https://github.com/Olamilekan-oluwayomi/rentit",
    evidence: "docs/truth/rentit.md",
  },
  {
    slug: "marginalia", title: "Marginalia", year: 2026, category: "Research assistant concept",
    summary: "An AI research assistant concept with visible citations and manuscript interaction.",
    note: "An existing account is required.",
    stack: ["Next.js", "Supabase", "TypeScript"],
    live: "https://marginalia-u6x8.vercel.app/",
    repo: "https://github.com/Olamilekan-oluwayomi/Marginalia",
    evidence: "docs/truth/marginalia.md",
  },
  {
    slug: "space-tourism", title: "Space Tourism", year: 2026, category: "Frontend Mentor implementation",
    summary: "A responsive space tourism site with destinations, crew and technology sections.",
    stack: ["React", "React Router", "Tailwind CSS"],
    live: "https://space-tourismx.vercel.app/",
    repo: "https://github.com/Olamilekan-oluwayomi/space-tourism-website-main",
    evidence: "docs/truth/space-tourism.md",
  },
  {
    slug: "foreign-exchange-checker", title: "Foreign Exchange Checker", year: 2026, category: "Frontend Mentor implementation",
    summary: "Currency conversion, rate history, saved pairs and a manual conversion log.",
    stack: ["React", "Redux Toolkit", "Frankfurter"],
    live: "https://foreign-exchange-checker-eight.vercel.app/",
    repo: "https://github.com/Olamilekan-oluwayomi/foreign-exchange-checker",
    evidence: "docs/truth/foreign-exchange-checker.md",
  },
] as const;
