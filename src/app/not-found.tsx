import Link from "next/link";
import { publishedProjectSlugs } from "@/content/release";
import { workIndex } from "@/content/work-index";

// Route contract: PRD.md sections 21 and 36. The heading, then the Contents list.
export default function NotFound() {
  const published = workIndex.filter(project => publishedProjectSlugs.includes(project.slug));
  return <section className="not-found">
    <h1 className="page-title">This page has no decisions attached.</h1>
    <nav aria-label="Contents">
      <p className="eyebrow">Contents</p>
      <ul>{published.map(project => <li key={project.slug}>
        <Link href={`/work/${project.slug}`}><span>{project.title}</span><span aria-hidden="true">{project.year}</span></Link>
      </li>)}</ul>
    </nav>
    <p><Link href="/">Return home</Link></p>
  </section>;
}
