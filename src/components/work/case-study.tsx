import Image from "next/image";
import type { Decision, Project } from "@/lib/schemas";
import styles from "./case-study.module.css";

const chapters = [
  ["premise", "The premise"], ["experience", "Follow a booking"], ["decisions", "Decisions"],
  ["stack", "The tools"], ["problems", "Problems and fixes"], ["reflection", "What I would change"],
] as const;

// Authored from docs/rentit-case-study.md and its source references, not a simulated app.
const rentitSteps = [
  { id: "browse", title: "Browse", text: "Search and filter listings before choosing an item.", ref: "rentit:src/shared/lib/constants.js" },
  { id: "listing", title: "Inspect the listing", text: "Read the listing details and select dates. Availability and booking require sign-in.", ref: "rentit:src/features/bookings/components/AvailabilityCalendar.jsx" },
  { id: "request", title: "Request a booking", text: "Complete the profile requirements and submit a request. The hook checks availability again before inserting a pending booking.", ref: "rentit:src/features/bookings/hooks/useCreateBooking.js" },
  { id: "conversation", title: "Continue the conversation", text: "Message history is attached to the booking, keeping the conversation in that context.", ref: "rentit:src/features/messages/hooks/useMessages.js" },
  { id: "management", title: "Manage the listing", text: "The owner can edit, hide and restore an existing listing.", ref: "rentit:src/features/listings/hooks/useListing.js" },
];

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
  return <article className={styles.page}>
    <a className={styles.back} href="/#work">← Back to selected work</a>
    {draft && <aside className={styles.preview} aria-label="Publication review status">
      <strong>Review preview. Not published.</strong>
      <p>Purpose, contribution, decision reasoning and stack reasons confirmed. Reflection review, real journey figures and owner-edited verification flags are still required.</p>
      <details><summary>Publication requirements</summary><ul>{issues.map(issue => <li key={issue}>{issue}</li>)}</ul></details>
    </aside>}
    <header className={styles.hero}>
      <div className={styles.registration}><span>Annotated / Case study</span><span>{project.year} / {project.status}</span></div>
      <div className={styles.heroGrid}>
        <div><h1>{project.title}<span aria-hidden="true">.</span></h1><p className={styles.tagline}>{project.tagline}</p></div>
        <div className={styles.role}><span>Contribution</span><strong>{project.role}</strong><p>{project.summary}</p></div>
      </div>
      <div className={styles.heroFoot}><ul className={styles.chips} aria-label="Technology">{project.stack.map(tool => <li key={tool.name}>{tool.name}</li>)}</ul><div className={styles.links}>
        {project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer">Open live ↗<span className="sr-only"> (opens in new tab)</span></a>}
        {project.links.repo && <a href={project.links.repo} target="_blank" rel="noopener noreferrer">Source ↗<span className="sr-only"> (opens in new tab)</span></a>}
      </div></div>
    </header>
    <nav className={styles.contents} aria-label="Case-study chapters">{chapters.map(([id, title], index) => <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{title}</a>)}</nav>
    <Section id="premise" index="01" title="The premise"><p className={styles.lead}>{project.premise}</p></Section>
    <Section id="experience" index="02" title="Follow a booking">
      <p className={styles.intro}>The exchange, from choosing an item to managing its listing. This static reading path works without JavaScript.</p>
      {project.slug === "rentit" && <ol className={styles.walkthrough}>{rentitSteps.map((step, index) => {
        const media = project.media.find(item => item.id === step.id && item.kind === "screenshot");
        return <li key={step.id}><div className={styles.stepLabel}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3></div><p>{step.text}</p>
          {media ? <figure><Image src={media.src} width={media.width} height={media.height} alt={media.alt} sizes="(max-width: 767px) 100vw, 70vw" /><figcaption>{media.caption}</figcaption></figure> : draft && <p className={styles.figurePending}>Real figure pending. No recreated application screen.</p>}
          <p className={styles.sourceRef}>Source: {step.ref}</p>
        </li>;
      })}</ol>}
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
    <Section id="reflection" index="06" title="What I would change">{draft && <p className={styles.sourceRef}>Proposed reflection. Owner confirmation pending: docs/rentit-case-study.md.</p>}<p className={styles.lead}>{project.reversals}</p></Section>
    <footer className={styles.exit}><p>Read the reasoning. Try the product.</p><div className={styles.links}><a href="/#work">Back to Work</a>{project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer">Open {project.title} ↗<span className="sr-only"> (opens in new tab)</span></a>}</div></footer>
    {project.links.live && <div className={styles.mobileLive}><a href={project.links.live} target="_blank" rel="noopener noreferrer">Open {project.title} ↗<span className="sr-only"> (opens in new tab)</span></a><a href="#decisions">Read decisions</a></div>}
  </article>;
}
