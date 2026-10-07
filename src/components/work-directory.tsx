"use client";
import { useState } from "react";

// Homepage index with a reserved preview area (PRD.md Appendix C.3).
// Rows keep their anchors; previews are decorative and lazy below the first frame.
// Optimized src/srcSet use the configured Next image endpoint in the server page.
// The plain img avoids an additional client image component on the homepage.

export type PreviewProject = { slug: string; title: string; src: string; srcSet?: string; sizes?: string; width: number; height: number };

export function WorkDirectory({ projects }: { projects: PreviewProject[] }) {
  const [active, setActive] = useState(0);
  return <div className="work-directory">
    <p className="eyebrow">Index <span>({String(projects.length).padStart(2, "0")})</span></p>
    <ol>
      {projects.map((project, index) => <li key={project.slug} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
        <a href={`#project-${project.slug}`}><span>{String(index + 1).padStart(2, "0")}</span>{project.title}<span aria-hidden="true">↘</span></a>
      </li>)}
    </ol>
    <div className="work-preview" aria-hidden="true">
      {projects.map((project, index) => <div key={project.slug} className="work-preview-frame" data-active={index === active ? "true" : "false"}>
        {project.src ? <img src={project.src} srcSet={project.srcSet} sizes={project.sizes} alt="" width={project.width} height={project.height} loading="lazy" decoding="async" /> : <p className="preview-unavailable">{project.title}<span>Preview pending evidence</span></p>}
      </div>)}
      <span className="preview-chip">{projects[active]?.title}</span>
    </div>
  </div>;
}
