import type { Metadata } from "next";
import { siteIdentity } from "@/content/identity";
import { timeline } from "@/content/timeline";
import { siteNotes } from "@/content/annotations";
import { SiteNote } from "@/components/annotations";
import { loadContent } from "@/lib/content";

// Route contract: PRD.md sections 12 and 17. The Record, timeline 2023 to 2026.
export const metadata: Metadata = {
  title: `About | ${siteIdentity.name}`,
  description: "The Record: 2023 to 2026, and a decision count by theme instead of adjectives.",
};

export default function AboutPage() {
  const { decisions } = loadContent();
  const themeCounts = new Map<string, number>();
  for (const decision of decisions) themeCounts.set(decision.theme, (themeCounts.get(decision.theme) ?? 0) + 1);
  const counts = [...themeCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return <article className="record-page">
    <p className="eyebrow">About</p>
    <h1 className="page-title">The Record</h1>
    <dl className="about-facts">
      <div><dt>Based</dt><dd>{siteIdentity.location}</dd></div>
      <div><dt>Role</dt><dd>{siteIdentity.role}</dd></div>
      <div><dt>Currently</dt><dd>{siteIdentity.employer}</dd></div>
      <div><dt>Stack</dt><dd>{siteIdentity.stackLine}</dd></div>
    </dl>
    <ol className="record-list">
      {timeline.map(entry => <li key={entry.year} className="record-row">
        <span className="record-year">{entry.year}</span>
        <div className="record-line">
          <p>{entry.line}</p>
          {entry.caption && <p className="record-caption">{entry.caption}</p>}
        </div>
        {entry.artifacts.map(artifact => artifact.href
          ? <a key={artifact.label} className="record-artifact" href={artifact.href} target="_blank" rel="noopener noreferrer">{artifact.label} ↗<span className="sr-only"> (opens in new tab)</span></a>
          : <span key={artifact.label} className="record-artifact">{artifact.label}</span>)}
      </li>)}
    </ol>
    <section className="how-i-work" aria-labelledby="how-i-work-heading">
      <h2 id="how-i-work-heading">How I work</h2>
      <p>{decisions.length} recorded decisions, counted by theme.</p>
      <ul className="theme-counts">{counts.map(([theme, count]) => <li key={theme}><span>{theme}</span><span>{count}</span></li>)}</ul>
      <SiteNote note={siteNotes["theme-counts"]} />
      <p className="muted">Every decision keeps its options, choice and trade-off inside a case study.</p>
    </section>
  </article>;
}
