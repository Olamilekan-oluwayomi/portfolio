import { siteIdentity } from "@/content/identity";
import { workIndex } from "@/content/work-index";

export default function Home() {
  const name = siteIdentity.name.split(" ");
  return <>
    <section className="hero" aria-labelledby="name">
      <div className="hero-topline"><span className="eyebrow">A portfolio of interfaces & decisions</span><span className="location-label">{siteIdentity.location}</span></div>
      <div className="hero-composition">
        <p className="hero-intro">Hello, I’m</p>
        <div className="name-frame">
          <p className="employer-label">Currently at {siteIdentity.employer}</p>
          <h1 id="name">{name[0]}<br />{name.slice(1).join(" ")}</h1>
          <span className="handle handle-tl" aria-hidden="true" /><span className="handle handle-tr" aria-hidden="true" /><span className="handle handle-bl" aria-hidden="true" /><span className="handle handle-br" aria-hidden="true" />
          <p className="role-label">{siteIdentity.role} <span aria-hidden="true">↗</span></p>
        </div>
        <p className="hero-subline">Every interface is a set of decisions.</p>
        <p className="stack-line">{siteIdentity.stackLine}</p>
        <div className="hero-actions"><a className="primary-link" href="#work">Explore my work <span aria-hidden="true">↘</span></a><a className="brief-link" href="/brief">The 30-second brief <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="hero-bottomline"><p><span className="availability-mark" aria-hidden="true" />{siteIdentity.availability}</p><span className="scroll-label">Scroll to explore <span aria-hidden="true">↓</span></span></div>
    </section>

    <section className="selected-work" id="work" aria-labelledby="work-title">
      <div className="section-heading"><div><p className="eyebrow">The things I’ve built</p><h2 id="work-title">Selected <span>work.</span></h2></div><span className="section-index">{String(workIndex.length).padStart(2, "0")} projects / {workIndex[0].year}</span></div>
      <ol className="project-grid">{workIndex.map((project, index) => <li key={project.slug} className={`project-card project-${project.slug}`}>
        <article aria-labelledby={`project-${project.slug}`}>
          <div className="project-topline"><span className="project-number">{String(index + 1).padStart(2, "0")}</span><span className="project-category">{project.category}</span><span>{project.year}</span></div>
          <div className="project-content"><h3 id={`project-${project.slug}`}>{project.title}</h3><p>{project.summary}</p>{"note" in project && <p className="project-note">{project.note}</p>}</div>
          <div className="project-bottomline"><ul className="stack-tags" aria-label="Technology">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul><div className="project-links"><a href={project.live} target="_blank" rel="noopener noreferrer">Open live <span aria-hidden="true">↗</span><span className="sr-only">, {project.title} (opens in new tab)</span></a><a href={project.repo} target="_blank" rel="noopener noreferrer">Source <span aria-hidden="true">↗</span><span className="sr-only">, {project.title} (opens in new tab)</span></a></div></div>
        </article>
      </li>)}</ol>
    </section>

    <section className="about-home" id="about" aria-labelledby="about-title"><p className="eyebrow">A little context</p><div className="about-columns"><h2 id="about-title">Frontend.<br />With a point<br />of view.</h2><div className="about-copy"><p className="about-lead">{siteIdentity.role}, based in {siteIdentity.location}.</p><p>Currently at {siteIdentity.employer}.<br />{siteIdentity.stackLine}</p><a className="text-link" href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">Find me on GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in new tab)</span></a></div></div></section>

    <section className="contact-home" id="contact" aria-labelledby="contact-title"><p className="eyebrow">Have something in mind?</p><div className="contact-heading"><h2 id="contact-title">Let’s talk.</h2><a className="contact-arrow" href={`mailto:${siteIdentity.email}`} aria-label={`Email ${siteIdentity.name}`}><span aria-hidden="true">↗</span></a></div><a className="contact-email" href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a></section>
  </>;
}
