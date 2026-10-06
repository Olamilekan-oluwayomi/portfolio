import type { Metadata } from "next";
import Link from "next/link";
import { siteIdentity } from "@/content/identity";
import { publishedProjectSlugs } from "@/content/release";
import { loadContent } from "@/lib/content";

// Route contract: PRD.md section 12, /work is the Contents page with status and stack.
export const metadata: Metadata = {
  title: `Work | ${siteIdentity.name}`,
  description: "Published case studies with status, stack and links to the live products.",
};

export default function WorkPage() {
  const { projects } = loadContent();
  return <article className="work-page">
    <p className="eyebrow">Contents</p>
    <h1 className="page-title">Work</h1>
    <ol className="work-list">
      {projects.map((project, index) => {
        const published = publishedProjectSlugs.includes(project.slug);
        return <li key={project.slug}>
          <span className="work-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div className="work-entry">
            <p className="work-meta">{project.year} / {project.status}</p>
            <h2>{published ? <Link href={`/work/${project.slug}`}>{project.title}</Link> : project.title}</h2>
            <p>{project.tagline}</p>
            <ul className="stack-tags" aria-label={`Technology for ${project.title}`}>{project.stack.map(tool => <li key={tool.name}>{tool.name}</li>)}</ul>
            <div className="project-links">
              {published && <Link href={`/work/${project.slug}`}>Case study</Link>}
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">Open live ↗<span className="sr-only">, {project.title} (opens in new tab)</span></a>
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer">Source ↗<span className="sr-only">, {project.title} (opens in new tab)</span></a>
            </div>
          </div>
        </li>;
      })}
    </ol>
  </article>;
}
