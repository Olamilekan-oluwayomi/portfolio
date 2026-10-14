import { StructuredData, personData } from "@/components/structured-data";
import type { Metadata } from "next";
import { siteIdentity } from "@/content/identity";
import { timeline } from "@/content/timeline";
import { siteNotes } from "@/content/annotations";
import { SiteNote } from "@/components/annotations";
import { loadContent } from "@/lib/content";
import { publishedProjectSlugs } from "@/content/release";

// Route contract: PRD.md sections 12 and 17. The Record, timeline 2023 to 2026.
export const metadata: Metadata = {
  title: `About | ${siteIdentity.name}`,
  description: "The Record: 2023 to 2026, and a decision count by theme instead of adjectives.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const decisions = loadContent().decisions.filter(decision => decision.verified && (decision.projectSlug === "site" || publishedProjectSlugs.includes(decision.projectSlug)));
  const themeCounts = new Map<string, number>();
  for (const decision of decisions) themeCounts.set(decision.theme, (themeCounts.get(decision.theme) ?? 0) + 1);
  const counts = [...themeCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return <article className="record-page">
    <link rel="preload" href="/fonts/instrument-serif-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <StructuredData items={[personData]} />
    <div className="record-intro">
      <div className="record-title-block">
        <p className="eyebrow">About</p>
        <h1 className="record-title">The <em>Record</em></h1>
        <a className="record-work-link" href="/work">Explore the work <span aria-hidden="true">↗</span></a>
      </div>
      <dl className="about-facts">
        <div className="about-role"><dt>Role</dt><dd>{siteIdentity.role}</dd></div>
        <div><dt>Currently at</dt><dd>{siteIdentity.employer}</dd></div>
        <div><dt>Based in</dt><dd>{siteIdentity.location}</dd></div>
        <div className="about-stack"><dt>Stack</dt><dd>{siteIdentity.stackLine}</dd></div>
      </dl>
    </div>
    <section className="record-history" aria-labelledby="record-timeline-heading">
      <div className="record-section-heading"><h2 id="record-timeline-heading">The timeline</h2><p className="eyebrow">{timeline[0].year} to {timeline[timeline.length - 1].year}</p></div>
      <ol className="record-list">
      {timeline.map((entry, index) => <li key={entry.year} className="record-row" data-gap={entry.intentionallyBlank || undefined} data-latest={index === timeline.length - 1 || undefined}>
        <time className="record-year" dateTime={String(entry.year)}>{entry.year}</time>
        <div className="record-line">
          <p>{entry.line}</p>
          {entry.caption && <p className="record-caption">{entry.caption}</p>}
        </div>
        {entry.artifacts.map(artifact => artifact.href
          ? <a key={artifact.label} className="record-artifact" href={artifact.href} target="_blank" rel="noopener noreferrer">{artifact.label} ↗<span className="sr-only"> (opens in new tab)</span></a>
          : <span key={artifact.label} className="record-artifact">{artifact.label}</span>)}
      </li>)}
      </ol>
    </section>
    <section className="how-i-work" aria-labelledby="how-i-work-heading">
      <div className="record-thinking">
        <h2 id="how-i-work-heading">How I work</h2>
        <p className="record-total"><span>{decisions.length}</span> recorded decisions</p>
        <p className="muted">Recorded decisions keep their options, choice and trade-off.</p>
      </div>
      <div className="record-themes">
        <p className="eyebrow">Counted by theme</p>
        <ul className="theme-counts">{counts.map(([theme, count]) => <li key={theme}>
          <div className="theme-count-label"><span>{theme}</span><span>{count}<span className="sr-only"> decisions</span></span></div>
          <span className="theme-track" aria-hidden="true"><span style={{ width: `${count / decisions.length * 100}%` }} /></span>
        </li>)}</ul>
        <SiteNote note={siteNotes["theme-counts"]} />
      </div>
    </section>
  </article>;
}
