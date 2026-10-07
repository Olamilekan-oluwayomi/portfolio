import Image from "next/image";
import Link from "next/link";
import type { Decision, Project } from "@/lib/schemas";
import styles from "./case-study.module.css";
import { ProjectExperience } from "../project-experience";
import { figureStory } from "@/content/figure-stories";
import { workIndex } from "@/content/work-index";
import { publishedProjectSlugs } from "@/content/release";
import { rentitJourney } from "@/content/rentit-journey";

// Chapter titles and intros per project, authored from PRD.md section 16.3.
const experienceChapters: Record<string, { title: string; intro: string }> = {
  rentit: { title: "Follow a booking", intro: "Follow the source-backed journey through the supplied screens. Each step separates visible interface evidence from behavior established in code. The complete reading path below works without JavaScript." },
  marginalia: { title: "Read it with the sources visible", intro: "Read claims beside the captures and repository evidence that support them. Open a numbered source or show all sources inline. The figures below remain readable without the source reader." },
  "space-tourism": { title: "Resize the viewport", intro: "Explore the source-backed breakpoint choices, then load the live site to resize its actual viewport. The supplied desktop captures below remain the static reading path." },
  "foreign-exchange-checker": { title: "State gallery", intro: "Compare the interface states documented in the source. The gallery labels its recreations and uses a captured conversion example rather than current rates. The original captures follow below." },
};
const defaultExperienceChapter = { title: "The experience", intro: "The bespoke piece for this case study has not been built yet." };

// Hero background matches the homepage cover colour for the same project.
const heroColorClass: Record<string, string | undefined> = {
  rentit: undefined,
  marginalia: styles.heroMint,
  "space-tourism": styles.heroSpace,
  "foreign-exchange-checker": styles.heroFx,
};

// A title word of 8+ rendered characters (the trailing period is inline) cannot
// wrap at the mobile display size, so the h1 needs the long-title scale.
const hasLongTitleWord = (title: string): boolean =>
  `${title}.`.split(/\s+/).some(word => word.length >= 8);

function chapterList(slug: string): [string, string][] {
  const experience = experienceChapters[slug] ?? defaultExperienceChapter;
  return [
    ["premise", "The premise"], ["experience", experience.title], ["decisions", "Decisions"],
    ["stack", "The tools"], ["problems", "Problems and fixes"], ["reflection", "What I would change"],
  ];
}

function Section({ id, index, title, children }: { id: string; index: string; title: string; children: React.ReactNode }) {
  return <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}>
    <div className={styles.margin}><span>{index}</span><h2 id={`${id}-heading`}>{title}</h2></div>
    <div className={styles.sectionBody}>{children}</div>
  </section>;
}

function InlineCode({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/g).map((part, index) => part.startsWith("`")
    ? <code key={index}>{part.slice(1, -1)}</code> : part);
}

export function CaseStudy({ project, decisions, draft, issues }: { project: Project; decisions: Decision[]; draft: boolean; issues: string[] }) {
  const rejected = decisions.filter(decision => decision.status !== "kept");
  const published = workIndex.filter(item => publishedProjectSlugs.includes(item.slug));
  const next = published[(published.findIndex(item => item.slug === project.slug) + 1) % published.length];
  return <article className={styles.page}>
    <nav className={styles.back} aria-label="Breadcrumb"><Link href="/work">Work</Link><span aria-hidden="true">/</span><span>{project.title}</span></nav>
    {draft && <aside className={styles.preview} aria-label="Publication review status">
      <strong>Review preview. Not published.</strong>
      <p>The supplied screens support this walkthrough. A renter request, the completion prompt and capture pixel-density evidence remain incomplete. This preview does not authorize publication.</p>
      <details><summary>Publication requirements</summary><ul>{issues.map(issue => <li key={issue}>{issue}</li>)}</ul></details>
    </aside>}
    <header data-inspect="CaseStudy" data-inspect-type="Project" data-inspect-color={project.slug === "space-tourism" ? "--space-ink" : "--card-ink"} className={`${styles.hero}${heroColorClass[project.slug] ? ` ${heroColorClass[project.slug]}` : ""}`}>
      <div className={styles.registration}><span>Annotated / Case study</span><span>{project.year} / {project.status}</span></div>
      <div className={styles.heroGrid}>
        <div><h1 className={hasLongTitleWord(project.title) ? styles.longTitle : undefined}>{project.title}<span aria-hidden="true">.</span></h1><p className={styles.tagline}>{project.tagline}</p></div>
        <div className={styles.role}><span>Contribution</span><strong>{project.role}</strong><p>{project.summary}</p></div>
      </div>
      <div className={styles.heroFoot}><ul className={styles.chips} aria-label="Technology">{project.stack.map(tool => <li key={tool.name}>{tool.name}</li>)}</ul><div className={styles.links}>
        {project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer">Open live ↗<span className="sr-only"> (opens in new tab)</span></a>}
        {project.links.repo && <a href={project.links.repo} target="_blank" rel="noopener noreferrer">Source ↗<span className="sr-only"> (opens in new tab)</span></a>}
      </div></div>
    </header>
    <nav className={styles.contents} aria-label="Case-study chapters">{chapterList(project.slug).map(([id, title], index) => <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{title}</a>)}</nav>
    <Section id="premise" index="01" title="The premise"><p className={styles.lead}>{project.premise}</p></Section>
    <Section id="experience" index="02" title={(experienceChapters[project.slug] ?? defaultExperienceChapter).title}>
      <p className={styles.intro}>{(experienceChapters[project.slug] ?? defaultExperienceChapter).intro}</p>
      <ProjectExperience project={project} decisions={decisions} />
      {project.slug !== "rentit" && project.media.length > 0 && <ol className={styles.walkthrough}>{project.media.map((item, index) => <li key={item.id}>
        <div className={styles.stepLabel}><span>{String(index + 1).padStart(2, "0")}</span><h3>{figureStory(item.src)?.title ?? item.caption}</h3></div>
        <figure id={`figure-${item.id}`} data-inspect="CaseStudy" data-inspect-type={'Project["media"][number]'}><Image src={item.src} width={item.width} height={item.height} alt={item.alt} sizes="(max-width: 767px) 100vw, 70vw" /><figcaption>{item.caption} {figureStory(item.src)?.decision && <a href={`#${figureStory(item.src)?.decision}-heading`}>Read the related decision</a>}</figcaption></figure>
      </li>)}</ol>}
      {project.slug === "rentit" && <ol className={styles.walkthrough}>{rentitJourney.map((step, index) => {
        const figures = project.media.filter(item => (step.mediaIds as readonly string[]).includes(item.id) && item.kind === "screenshot");
        return <li id={`rentit-step-${step.id}`} key={step.id}><div className={styles.stepLabel}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3></div><p>{step.text}</p>
          {figures.map(media => <figure id={`figure-${media.id}`} key={media.id}><Image src={media.src} width={media.width} height={media.height} alt={media.alt} sizes="(max-width: 767px) 100vw, 70vw" /><figcaption>{media.caption}</figcaption></figure>)}
          <aside className={styles.captureLimit} aria-label="Capture evidence boundary"><p>{step.limit}</p></aside>
          {"decision" in step && <a href={`#${step.decision}-heading`}>Read the listing-update decision</a>}
          <p className={styles.sourceRef}>Source: {step.ref}</p>
        </li>;
      })}</ol>}
      {project.slug === "rentit" && <div className={styles.supporting}><h3>Creating and overseeing listings</h3><p>Supporting owner views, separate from the renter's request flow.</p>{project.media.filter(item => ["new-listing", "dashboard"].includes(item.id)).map(media => <figure id={`figure-${media.id}`} key={media.id}><Image src={media.src} width={media.width} height={media.height} alt={media.alt} sizes="(max-width: 767px) 100vw, 70vw" /><figcaption>{media.caption}</figcaption></figure>)}</div>}
      {project.slug === "rentit" && <div className={styles.permissions}>
        <h3>Permission map</h3>
        <p>Source behavior and migration intent, not a certification of the deployed database.</p>
        <dl>
          <div><dt>Anonymous</dt><dd>The listing-detail route is public. Booking submission requires sign-in.<code>rentit:src/App.jsx; src/features/bookings/hooks/useCreateBooking.js</code></dd></div>
          <div><dt>Renter</dt><dd>The booking hook checks profile requirements and inserts a pending request with the current user as renter. The renter booking view filters by user id.<code>rentit:src/features/bookings/hooks/useCreateBooking.js; useBookings.js</code></dd></div>
          <div><dt>Owner</dt><dd>The owner view queries bookings for owned listing ids. The listing UPDATE migration checks ownership of both the existing and resulting row.<code>rentit:src/features/bookings/hooks/useBookings.js; supabase/migrations/20260802000000_listings_update_policy.sql</code></dd></div>
          <div><dt>Participants</dt><dd>The message INSERT migration checks sender identity, completed profile and participation as renter or listing owner. Applied production policies remain unverified.<code>rentit:supabase/migrations/20260726010000_require_complete_profile.sql; 20260730000000_profile_completion_location.sql</code></dd></div>
        </dl>
      </div>}
    </Section>
    <Section id="decisions" index="03" title="Decisions"><div className={styles.decisions}>{decisions.map((decision, index) => <article className={styles.decision} key={decision.id} aria-labelledby={`${decision.id}-heading`}>
      <div className={styles.decisionTop}><span>Decision {String(index + 1).padStart(2, "0")}</span><span>{decision.theme} / {decision.status}</span></div>
      <h3 id={`${decision.id}-heading`}>{decision.title}</h3><p>{decision.context}</p>
      <dl><dt>Options</dt><dd><ul>{decision.options.map(option => <li key={option}>{option}</li>)}</ul></dd><dt>Choice</dt><dd>{decision.choice}</dd><dt>Trade-off</dt><dd>{decision.tradeoff}</dd>{decision.result && <><dt>Result</dt><dd>{decision.result}</dd></>}</dl>
      <details className={styles.evidence}><summary>Evidence{draft && !decision.verified ? " / owner flag pending" : ""}</summary><ul>{decision.evidence.map(item => <li key={item.ref}><span>{item.label}</span><code>{item.ref}</code></li>)}</ul></details>
    </article>)}</div></Section>
    <Section id="stack" index="04" title="The tools"><dl className={styles.stack}>{project.stack.map(tool => <div key={tool.name}><dt>{tool.name}</dt><dd>{tool.why}</dd></div>)}</dl></Section>
    <Section id="problems" index="05" title="Problems and fixes"><div className={styles.problems}>{project.problems.map(problem => <section key={problem.title}><h3>{problem.title}</h3><p><InlineCode text={problem.body} /></p></section>)}</div></Section>
    <Section id="reflection" index="06" title="What I would change"><p className={styles.lead}>{project.reversals}</p>{rejected.length > 0 && <div className={styles.rejected}>
      <h3>What I rejected</h3>
      {rejected.map(decision => <article key={decision.id} className={styles.rejectedEntry}>
        <p className={styles.rejectedTop}><span className={styles.rejectedStatus}>{decision.status}</span>{decision.title}</p>
        <p>{decision.context}</p>
      </article>)}
    </div>}</Section>
    <footer className={styles.exit}><p>Read the reasoning. Try the product.</p><div className={styles.links}><Link href="/work">Back to Work</Link>{next && <Link href={`/work/${next.slug}`}>Next: {next.title}</Link>}{project.links.repo && <a href={project.links.repo} target="_blank" rel="noopener noreferrer">Source<span className="sr-only"> (opens in new tab)</span></a>}{project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer">Open {project.title} ↗<span className="sr-only"> (opens in new tab)</span></a>}</div></footer>
    {project.links.live && <div className={styles.mobileLive}><a href={project.links.live} target="_blank" rel="noopener noreferrer">Open {project.title} ↗<span className="sr-only"> (opens in new tab)</span></a><a href="#decisions">Read decisions</a></div>}
  </article>;
}
