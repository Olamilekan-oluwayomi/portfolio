import type { Metadata } from "next";
import { siteIdentity } from "@/content/identity";
import { formatLogDates, log } from "@/content/log";

// Route contract: PRD.md sections 12, 18 and 35. The Log, reverse chronological,
// each entry a native details element with no JavaScript dependency.
export const metadata: Metadata = {
  title: `Experience | ${siteIdentity.name}`,
  description: "The Log: work history, service and education, reverse chronological.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  const entries = log.filter(entry => entry.public);
  return <article className="log-page">
    <link rel="preload" href="/fonts/instrument-serif-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <header className="log-intro">
      <div><p className="eyebrow">Experience</p><h1 className="record-title">The <em>Log</em></h1></div>
      <p className="log-caption">Work, service and education.<br />Most recent first.</p>
    </header>
    <ol className="log-list">
      {entries.map(entry => <li key={entry.id} className="log-entry">
        {entry.summary ? <details>
          <summary>
            <span className="log-dates">{formatLogDates(entry.start, entry.end)}</span>
            <span className="log-heading"><span className="log-role">{entry.role}</span><span className="log-org">{entry.org}</span></span>
            <span className="log-toggle"><span className="log-expand">View details</span><span className="log-collapse">Close details</span><span className="log-toggle-mark" aria-hidden="true" /></span>
          </summary>
          <div className="log-detail">
            <p>{entry.summary}</p>
            <p className="log-location">{entry.location}</p>
            {entry.evidence.map(item => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">{item.label} ↗<span className="sr-only"> (opens in new tab)</span></a>)}
          </div>
        </details> : <div className="log-plain">
          <span className="log-dates">{formatLogDates(entry.start, entry.end)}</span>
          <span className="log-heading"><span className="log-role">{entry.role}</span><span className="log-org">{entry.org}</span></span>
        </div>}
      </li>)}
    </ol>
  </article>;
}
