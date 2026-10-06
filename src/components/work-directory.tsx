"use client";
import { useState } from "react";

// Homepage index with a reserved preview area (PRD.md Appendix C.3).
// Rows keep their anchors; previews are decorative and lazy below the first frame.
// Plain img keeps next/image out of the homepage first-load budget (PRD.md section 25).

export type PreviewProject = { slug: string; title: string; src: string; width: number; height: number };

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
        <img src={project.src} alt="" width={project.width} height={project.height} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
      </div>)}
      <span className="preview-chip">View <span>↗</span></span>
    </div>
  </div>;
}
