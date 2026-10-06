import type { Metadata } from "next";
import { siteIdentity } from "@/content/identity";
import { formatLogDates, log } from "@/content/log";

// Route contract: PRD.md sections 12, 18 and 35. The Log, reverse chronological,
// each entry a native details element with no JavaScript dependency.
export const metadata: Metadata = {
  title: `Experience | ${siteIdentity.name}`,
  description: "The Log: work history, service and education, reverse chronological.",
};

export default function ExperiencePage() {
  const entries = log.filter(entry => entry.public);
  return <article className="log-page">
    <p className="eyebrow">Experience</p>
    <h1 className="page-title">The Log</h1>
    <ol className="log-list">
      {entries.map(entry => <li key={entry.id} className="log-entry">
        {entry.summary ? <details>
          <summary>
            <span className="log-role">{entry.role}, {entry.org}</span>
            <time className="log-dates">{formatLogDates(entry.start, entry.end)}</time>
          </summary>
          <div className="log-detail">
            <p>{entry.summary}</p>
            <p className="log-location">{entry.location}</p>
            {entry.evidence.map(item => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">{item.label} ↗<span className="sr-only"> (opens in new tab)</span></a>)}
          </div>
        </details> : <div className="log-plain">
          <span className="log-role">{entry.role}, {entry.org}</span>
          <time className="log-dates">{formatLogDates(entry.start, entry.end)}</time>
        </div>}
      </li>)}
    </ol>
  </article>;
}
