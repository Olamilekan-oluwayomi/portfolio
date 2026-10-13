import type { Metadata } from "next";
import Link from "next/link";
import { siteIdentity } from "@/content/identity";
import { publishedProjectSlugs } from "@/content/release";
import { siteNotes } from "@/content/annotations";
import { SiteNote } from "@/components/annotations";
import { loadContent } from "@/lib/content";

// Route contract: PRD.md section 12, /work is the Contents page with status and stack.
export const metadata: Metadata = {
  title: `Work | ${siteIdentity.name}`,
  description: "Published case studies with status, stack and links to the live products.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const { projects } = loadContent();
  return <article className="work-page">
    <header className="work-intro"><div><p className="eyebrow">Contents</p><h1 className="record-title">Selected <em>work.</em></h1></div><p className="work-intro-caption">{publishedProjectSlugs.length} published case studies<br />Status, stack and source.</p></header>
    <SiteNote note={siteNotes["one-spine"]} />
    <ol className="work-list">
      {projects.map((project, index) => {
        const published = publishedProjectSlugs.includes(project.slug);
        const preview = published ? project.media.find(media => media.kind === "screenshot") : undefined;
        return <li key={project.slug} className="work-row">
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
          {preview && <Link className="work-capture" href={project.links.caseStudy} aria-label={`Read ${project.title} case study`}><img src={`/_next/image?url=${encodeURIComponent(preview.src)}&w=640&q=75`} srcSet={[640, 960, 1440, 1920].map(width => `/_next/image?url=${encodeURIComponent(preview.src)}&w=${width}&q=75 ${width}w`).join(", ")} alt={preview.alt} width={preview.width} height={preview.height} sizes="(min-width: 1024px) 440px, (min-width: 768px) 38vw, 100vw" loading="lazy" decoding="async" /><span className="work-capture-label">View case study <span aria-hidden="true">?</span></span></Link>}
        </li>;
      })}
    </ol>
  </article>;
}
