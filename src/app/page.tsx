import { siteIdentity } from "@/content/identity";
import { workIndex } from "@/content/work-index";
import { conceptNotes, siteNotes } from "@/content/annotations";
import { loadContent } from "@/lib/content";
import { HeroConcepts, SiteNote } from "@/components/annotations";
import { ProjectPanel } from "@/components/work/project-panel";
import { WorkDirectory } from "@/components/work-directory";
import { publishedProjectSlugs } from "@/content/release";

export default function Home() {
  const [firstName, ...lastName] = siteIdentity.name.split(" ");
  const { projects } = loadContent();
  const previews = workIndex.map(item => {
    const media = publishedProjectSlugs.includes(item.slug) ? projects.find(project => project.slug === item.slug)?.media.find(entry => entry.kind === "screenshot") : undefined;
    // Server-authored optimizer URLs avoid shipping the image component to this page.
    const optimized = (width: number) => media ? "/_next/image?url=" + encodeURIComponent(media.src) + "&w=" + width + "&q=75" : "";
    const props = media ? { src: optimized(640), srcSet: [640, 1080, 1920].map(width => optimized(width) + " " + width + "w").join(", "), sizes: "(min-width: 1440px) 480px, (min-width: 1024px) 40vw, 100vw" } : undefined;
    return { slug: item.slug, title: item.title, src: props?.src ?? "", srcSet: props?.srcSet, sizes: props?.sizes, width: media?.width ?? 1200, height: media?.height ?? 800 };
  });
  return <>
    <section className="hero" aria-labelledby="name">
      <div className="hero-topline">
        <p className="eyebrow"><span className="registration-mark" aria-hidden="true" />Annotated <span className="muted">/ An annotated build</span></p>
        <p className="hero-location">{siteIdentity.location}</p>
      </div>
      <div className="identity-poster">
        <div className="identity-preface"><p className="hero-intro">Hello, I’m</p></div>
        <div className="name-composition">
          <h1 data-inspect="Home" data-inspect-type="typeof siteIdentity" data-inspect-spacing="--hero-name-size" id="name"><span className="name-first">{firstName}</span><span className="name-frame"><span>{lastName.join(" ")}</span><i className="handle handle-tl" aria-hidden="true" /><i className="handle handle-tr" aria-hidden="true" /><i className="handle handle-bl" aria-hidden="true" /><i className="handle handle-br" aria-hidden="true" /></span></h1>
          <p className="role-label">{siteIdentity.role}</p>
        </div>
        <div className="identity-caption"><span className="eyebrow">Interfaces. And what goes into them.</span><span className="poster-mark" aria-hidden="true">[↗]</span></div>
      </div>
      <div className="hero-context">
        <div className="hero-lead"><p className="hero-statement">Every interface<br />is a set of <em>decisions.</em></p></div>
        <div className="hero-facts"><p className="employment-label"><span className="eyebrow">Currently at</span><span>{siteIdentity.employer}</span></p><ul className="hero-stack" aria-label="Technology stack">{siteIdentity.stackLine.split("·").map(skill => <li key={skill.trim()}>{skill.trim()}</li>)}</ul></div>
        <div className="hero-actions"><a className="primary-link" href="#work">Explore the work <span aria-hidden="true">↘</span></a><a className="brief-link" href="/brief">The 30-second brief <span aria-hidden="true">↗</span></a></div>
      </div>
      <SiteNote note={siteNotes["static-dot"]} />
      <div className="hero-bottomline"><p className="availability"><span className="availability-mark" aria-hidden="true" />{siteIdentity.availability}</p><a href={`mailto:${siteIdentity.email}`}>Let’s talk <span aria-hidden="true">↗</span></a></div>
      <div className="hero-concept-band"><span className="eyebrow">Explore the thinking</span><HeroConcepts notes={conceptNotes} /></div>
    </section>

    <section className="selected-work" id="work" aria-labelledby="work-title">
      <div className="section-heading"><div><p className="eyebrow">Selected work / {workIndex[0].year}</p><h2 id="work-title">Built.<br /><span className="accent">Considered.</span></h2></div><WorkDirectory projects={previews} /></div>
      <SiteNote note={siteNotes["grid-gap"]} />
      <ol className="project-grid">{workIndex.map((project, index) => <ProjectPanel key={project.slug} project={project} index={index} />)}</ol>
      <SiteNote note={siteNotes["no-card-border"]} />
    </section>

    <section className="about-home" id="about" aria-labelledby="about-title">
      <div className="about-margin"><p className="eyebrow">A little context</p><span className="about-symbol" aria-hidden="true">[<span>*</span>]</span></div>
      <div className="about-main"><h2 id="about-title">Frontend.<br />With a <span className="accent">point of view.</span></h2><div className="about-columns"><p className="about-lead">{siteIdentity.role},<br />based in {siteIdentity.location}.</p><div className="about-copy"><p>Currently at {siteIdentity.employer}.</p><p className="stack-line">{siteIdentity.stackLine}</p><div className="profile-links">
        <a className="text-link" href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in new tab)</span></a>
        <a className="text-link" href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (opens in new tab)</span></a>
        <a className="text-link" href={siteIdentity.links.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (opens in new tab)</span></a>
        <a className="text-link" href={siteIdentity.links.twitter} target="_blank" rel="noopener noreferrer">Twitter / X <span aria-hidden="true">↗</span><span className="sr-only"> (opens in new tab)</span></a>
      </div></div></div></div>
    </section>

    <section className="contact-home" id="contact" aria-labelledby="contact-title">
      <div className="contact-topline"><p className="eyebrow">Have something worth building?</p><span className="eyebrow">Contact / ↗</span></div>
      <a className="contact-heading" href={`mailto:${siteIdentity.email}`}><h2 id="contact-title">Let’s <span className="accent">talk.</span></h2><span className="contact-arrow" aria-hidden="true">↗</span><span className="sr-only"> Email {siteIdentity.name}</span></a>
      <div className="contact-bottomline"><a className="contact-email" href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a><p>{siteIdentity.availability}</p></div>
    </section>
  </>;
}
