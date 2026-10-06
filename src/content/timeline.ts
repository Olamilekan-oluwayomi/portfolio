// About timeline rows: PRD.md section 17.
// Owner decisions: docs/phase-1-exit.md item 14 (2023 gap confirmed 2026-10-02,
// 2025 and 2024 rows approved 2026-10-03, artifact cells deferred where no link exists).
export type TimelineYear = {
  year: 2023 | 2024 | 2025 | 2026;
  line: string;
  caption?: string;
  artifacts: { label: string; href?: string }[];
  intentionallyBlank?: boolean;
};

export const timeline: TimelineYear[] = [
  { year: 2023, line: "Empty on purpose.", caption: "No commits. Left blank.", artifacts: [], intentionallyBlank: true },
  { year: 2024, line: "Came back.", artifacts: [] },
  { year: 2025, line: "In service. Kept building.", artifacts: [] },
  { year: 2026, line: "Building professionally.", artifacts: [{ label: "PitchMatter" }] },
];
