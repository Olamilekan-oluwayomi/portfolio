import type { workIndex } from "@/content/work-index";

type WorkListing = (typeof workIndex)[number];

// Original typographic covers, not screenshots or recreated product interfaces.
// Actual title, category, stack and links: src/content/work-index.ts.
function ProjectCover({ project }: { project: WorkListing }) {
  const title = project.slug === "foreign-exchange-checker" ? "FX" : project.title;
  return <div className={`project-cover cover-${project.slug}`} aria-hidden="true">
    <span className="cover-registration">{project.category}</span>
    <div className="cover-art">
      {project.slug === "rentit" && <><span className="cover-wordmark">Rent<span>It</span></span><span className="cover-cross cover-cross-top">+</span><span className="cover-cross cover-cross-bottom">+</span></>}
      {project.slug === "marginalia" && <><span className="manuscript-mark">M</span><span className="manuscript-bracket bracket-left">[</span><span className="manuscript-bracket bracket-right">]</span><span className="manuscript-title">{title}</span></>}
      {project.slug === "space-tourism" && <><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit-point" /><span className="space-title">Space<br /><span>tourism</span></span></>}
      {project.slug === "foreign-exchange-checker" && <><span className="exchange-mark">FX<span>↔</span></span><span className="exchange-title">Foreign exchange<br />checker</span></>}
    </div>
    <span className="cover-caption">Project cover<span>↗</span></span>
  </div>;
}

export function ProjectPanel({ project, index }: { project: WorkListing; index: number }) {
  const id = `project-${project.slug}`;
  return <li className={`project-panel project-${project.slug}`}>
    <article aria-labelledby={id}>
      <a className="cover-link" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live (opens in new tab)`}><ProjectCover project={project} /></a>
      <div className="project-details">
        <div className="project-topline"><span className="project-number">{String(index + 1).padStart(2, "0")}</span><span>{project.category}</span><span className="project-year">{project.year}</span></div>
        <h3 id={id}>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        {"note" in project && <p className="project-note">{project.note}</p>}
        <div className="project-bottomline">
          <ul className="stack-tags" aria-label="Technology">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>
          <div className="project-links">
            <a href={project.live} target="_blank" rel="noopener noreferrer">Open live <span aria-hidden="true">↗</span><span className="sr-only">, {project.title} (opens in new tab)</span></a>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">Source <span aria-hidden="true">↗</span><span className="sr-only">, {project.title} (opens in new tab)</span></a>
          </div>
        </div>
      </div>
    </article>
  </li>;
}
