import { siteIdentity } from "@/content/identity";
import { workIndex } from "@/content/work-index";
import { ProjectPanel } from "@/components/work/project-panel";

export default function Home() {
  const name = siteIdentity.name.split(" ");
  return <>
    <section className="hero" aria-labelledby="name">
      <div className="hero-topline">
        <p className="eyebrow"><span className="registration-mark" aria-hidden="true" />Annotated <span className="muted">/ Personal portfolio</span></p>
        <p className="hero-location">{siteIdentity.location}</p>
      </div>
      <div className="hero-grid">
        <div className="hero-identity">
          <p className="hero-intro">Hello, I’m</p>
          <div className="name-frame">
            <h1 id="name">{name[0]}<br />{name.slice(1).join(" ")}</h1>
            <span className="handle handle-tl" aria-hidden="true" /><span className="handle handle-tr" aria-hidden="true" />
            <span className="handle handle-bl" aria-hidden="true" /><span className="handle handle-br" aria-hidden="true" />
            <p className="role-label">{siteIdentity.role}<span aria-hidden="true">↗</span></p>
          </div>
          <p className="stack-line">{siteIdentity.stackLine}</p>
          <div className="hero-actions">
            <a className="primary-link" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
            <a className="brief-link" href="/brief">The 30-second brief <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <aside className="hero-context" aria-label="Introduction">
          <span className="context-bracket" aria-hidden="true">[ ]</span>
          <p className="hero-statement">Every interface<br />is a set of <em>decisions.</em></p>
          <div className="employment-label"><span className="eyebrow">Currently at</span><span>{siteIdentity.employer}</span></div>
          <p className="availability"><span className="availability-mark" aria-hidden="true" />{siteIdentity.availability}</p>
          <a className="text-link" href={`mailto:${siteIdentity.email}`}>Let’s talk <span aria-hidden="true">↗</span></a>
        </aside>
      </div>
      <div className="hero-bottomline"><span className="eyebrow">Interfaces. And what goes into them.</span><a href="#work">Selected work <span aria-hidden="true">↓</span></a></div>
    </section>

    <section className="selected-work" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <div><p className="eyebrow">A selection of builds</p><h2 id="work-title">The work<span className="accent">, so far.</span></h2></div>
        <p className="section-index"><span>{String(workIndex.length).padStart(2, "0")}</span> projects<br />{workIndex[0].year}</p>
      </div>
      <ol className="project-grid">{workIndex.map((project, index) => <ProjectPanel key={project.slug} project={project} index={index} />)}</ol>
    </section>

    <section className="about-home" id="about" aria-labelledby="about-title">
      <p className="eyebrow">A little context</p>
      <div className="about-columns">
        <h2 id="about-title">Frontend.<br />With a <span className="accent">point</span><br />of view.</h2>
        <div className="about-copy">
          <p className="about-lead">{siteIdentity.role}, based in {siteIdentity.location}.</p>
          <p>Currently at {siteIdentity.employer}.<br />{siteIdentity.stackLine}</p>
          <div className="profile-links">
            <a className="text-link" href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in new tab)</span></a>
            <a className="text-link" href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (opens in new tab)</span></a>
          </div>
        </div>
      </div>
    </section>

    <section className="contact-home" id="contact" aria-labelledby="contact-title">
      <div className="contact-topline"><p className="eyebrow">Have something in mind?</p><span aria-hidden="true">↙</span></div>
      <div className="contact-heading"><h2 id="contact-title">Let’s <span className="accent">talk.</span></h2><a className="contact-arrow" href={`mailto:${siteIdentity.email}`} aria-label={`Email ${siteIdentity.name}`}><span aria-hidden="true">↗</span></a></div>
      <a className="contact-email" href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a>
    </section>
  </>;
}
