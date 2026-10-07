import { siteIdentity } from "@/content/identity";
import { workIndex } from "@/content/work-index";
import { log, formatLogDates } from "@/content/log";

export const metadata = { title: `The brief | ${siteIdentity.name}` };
export default function Brief() {
  return <article className="brief-page">
    <p className="eyebrow">The 30-second brief</p>
    <h1 className="page-title">{siteIdentity.name}</h1>
    <p className="brief-role">{siteIdentity.role} · {siteIdentity.location}</p>
    <p>Currently at {siteIdentity.employer}. {siteIdentity.availability}</p>
    <p className="stack-line">{siteIdentity.stackLine}</p>
    <h2>Selected work</h2>
    <ul className="brief-projects">{workIndex.map(project => <li key={project.slug}>
      <div><strong>{project.title}</strong><p>{project.summary}</p>{"note" in project && <p>{project.note}</p>}</div>
      <div className="project-links">
        <a href={project.live} target="_blank" rel="noopener noreferrer">Open live<span className="sr-only">, {project.title} (opens in new tab)</span> ↗</a>
        <a href={project.repo} target="_blank" rel="noopener noreferrer">Source<span className="sr-only">, {project.title} (opens in new tab)</span> ↗</a>
      </div>
    </li>)}</ul>
    <h2>Experience and education</h2>
    <ul className="brief-log">{log.filter(entry => entry.public).map(entry => <li key={entry.id}><span>{entry.role}, {entry.org}</span><span>{formatLogDates(entry.start, entry.end)}</span></li>)}</ul>
    <div className="brief-contact"><a href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a><a href={siteIdentity.links.linkedin}>LinkedIn</a><a href={siteIdentity.links.github}>GitHub</a>{siteIdentity.cv && <a href={siteIdentity.cv}>CV</a>}</div>
  </article>;
}
