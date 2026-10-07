import type { workIndex } from "@/content/work-index";
import { publishedProjectSlugs } from "@/content/release";

type WorkListing = (typeof workIndex)[number];

// Original editorial illustrations, never screenshots or simulated interfaces.
// Project facts and external destinations: src/content/work-index.ts.
function ProjectCover({ project }: { project: WorkListing }) {
  return <div className={`project-cover cover-${project.slug}`} aria-hidden="true">
    <div className="cover-registration"><span>{project.title}</span><span>↗</span></div>
    <div className="cover-art">
      {project.slug === "rentit" && <><svg className="rentit-plan" viewBox="0 0 400 400" fill="none"><path d="M40 360V160L200 40l160 120v200H40Z" /><path d="M80 330V180l120-90 120 90v150H80Z M160 330V220h80v110 M40 160h320 M200 40v180 M80 180h240" /><circle cx="200" cy="180" r="100" /><path d="M0 200h400 M200 0v400" className="plan-guide" /></svg><span className="cover-wordmark">Rent<span>It.</span></span><span className="cover-side-label">Property marketplace</span></>}
      {project.slug === "marginalia" && <><div className="manuscript-sheet"><span className="manuscript-running">Research / Reading / Sources</span><span className="manuscript-mark">M<span>*</span></span><span className="manuscript-title">Marginalia</span><span className="manuscript-rule" /></div><span className="manuscript-bracket bracket-left">[</span><span className="manuscript-bracket bracket-right">]</span></>}
      {project.slug === "space-tourism" && <><svg className="orbital-illustration" viewBox="0 0 400 400" fill="none"><circle cx="200" cy="200" r="100" /><ellipse cx="200" cy="200" rx="176" ry="62" transform="rotate(-35 200 200)" /><ellipse cx="200" cy="200" rx="148" ry="45" transform="rotate(-35 200 200)" /><path d="M100 200h200 M104 175h192 M113 150h174 M134 125h132 M104 225h192 M113 250h174 M134 275h132" /><circle cx="337" cy="116" r="7" fill="currentColor" /></svg><span className="space-title">Space<br /><span>tourism.</span></span></>}
      {project.slug === "foreign-exchange-checker" && <><div className="exchange-route"><span>↗</span><span>↙</span></div><span className="exchange-ticket"><span className="eyebrow">Foreign exchange</span><span className="exchange-mark">FX</span><span className="eyebrow">Checker <span>↔</span></span></span></>}
    </div>
    <div className="cover-caption"><span>Editorial illustration</span><span>{project.year}</span></div>
  </div>;
}

export function ProjectPanel({ project, index }: { project: WorkListing; index: number }) {
  const id = `project-${project.slug}`;
  const published = publishedProjectSlugs.includes(project.slug);
  return <li className={`project-panel project-${project.slug}`}>
    <article aria-labelledby={`${id}-title`} id={id}>
      <a className="cover-link" href={published ? `/work/${project.slug}` : project.live} target={published ? undefined : "_blank"} rel={published ? undefined : "noopener noreferrer"} aria-label={published ? `Read ${project.title} case study` : `Open ${project.title} live (opens in new tab)`}><ProjectCover project={project} /></a>
      <div className="project-details">
        <div className="project-topline"><span className="project-number">{String(index + 1).padStart(2, "0")}</span><span>{project.category}</span><span className="project-year">{project.year}</span></div>
        <h3 id={`${id}-title`}>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        {"note" in project && <p className="project-note">{project.note}</p>}
        <div className="project-bottomline"><ul className="stack-tags" aria-label="Technology">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul><div className="project-links">{publishedProjectSlugs.includes(project.slug) && <a href={`/work/${project.slug}`}>Case study <span aria-hidden="true">↗</span></a>}<a href={project.live} target="_blank" rel="noopener noreferrer">Open live <span aria-hidden="true">↗</span><span className="sr-only">, {project.title} (opens in new tab)</span></a><a href={project.repo} target="_blank" rel="noopener noreferrer">Source <span aria-hidden="true">↗</span><span className="sr-only">, {project.title} (opens in new tab)</span></a></div></div>
      </div>
    </article>
  </li>;
}
