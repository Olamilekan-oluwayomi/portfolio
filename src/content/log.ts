// The Log: PRD.md sections 18 and 35 (ExperienceEntry).
// Facts: docs/phase-1-exit.md item 3 (owner confirmed the five drafted entries
// against the CV on 2026-10-02; the CV file itself is still deferred, item 8).
// PitchMatter carries company, role and dates only (item 2, residual closed
// 2026-10-03). The Blueskills evidence link is deferred until the owner states
// the Branch Watch relationship (item 12), so evidence stays empty.
export type ExperienceEntry = {
  id: string;
  org: string;
  role: string;
  type: "internship" | "full-time" | "service" | "leadership" | "education";
  start: string;
  end: string | null;
  location: string;
  summary: string;
  evidence: { label: string; href: string }[];
  public: boolean;
};

export const log: ExperienceEntry[] = [
  {
    id: "pitchmatter",
    org: "PitchMatter",
    role: "Frontend Developer Intern",
    type: "internship",
    start: "2026-08",
    end: null,
    location: "Oyo State, Nigeria",
    summary: "",
    evidence: [],
    public: true,
  },
  {
    id: "blueskills",
    org: "Blueskills",
    role: "Field Supervisor",
    type: "full-time",
    start: "2025-10",
    end: null,
    location: "Oyo State, Nigeria",
    summary: "Oversees 32 branches across Oyo State, with branch reporting and tracking.",
    evidence: [],
    public: true,
  },
  {
    id: "nysc",
    org: "Ministry of Establishment and Training, Oyo State",
    role: "NYSC",
    type: "service",
    start: "2025",
    end: "2026",
    location: "Oyo State, Nigeria",
    summary: "National service placement.",
    evidence: [],
    public: true,
  },
  {
    id: "degree",
    org: "Obafemi Awolowo University",
    role: "B.Sc. Geography",
    type: "education",
    start: "2024",
    end: "2024",
    location: "Oyo State, Nigeria",
    summary: "",
    evidence: [],
    public: true,
  },
  {
    id: "nags",
    org: "NAGS",
    role: "President",
    type: "leadership",
    start: "2023",
    end: "2024",
    location: "Oyo State, Nigeria",
    summary: "Student association leadership.",
    evidence: [],
    public: true,
  },
];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function label(value: string): string {
  const match = /^(\d{4})-(\d{2})$/u.exec(value);
  return match ? `${months[Number(match[2]) - 1]} ${match[1]}` : value;
}

export function formatLogDates(start: string, end: string | null): string {
  if (end === null) return `${label(start)} to present`;
  if (end === start) return label(start);
  return `${label(start)} to ${label(end)}`;
}
