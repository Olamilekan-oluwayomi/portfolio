import { siteIdentity } from "@/content/identity";
import { workIndex } from "@/content/work-index";

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
    <a className="primary-link" href={`mailto:${siteIdentity.email}`}>{siteIdentity.email} <span aria-hidden="true">↗</span></a>
  </article>;
}
