"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/schemas";
import { journeyIndex, rentitJourney } from "@/content/rentit-journey";

export default function RentitWalkthrough({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const controls = useRef<HTMLDivElement>(null);
  const step = rentitJourney[active];
  const media = project.media.find(item => item.id === step.mediaIds[0] && item.kind === "screenshot");
  function select(index: number, focus = false) {
    setActive(index);
    if (focus) controls.current?.querySelectorAll<HTMLButtonElement>("button")[index]?.focus();
  }
  return <div className="rentit-widget">
    <div className="rentit-steps" ref={controls} role="group" aria-label="Booking walkthrough steps">
      {rentitJourney.map((item, index) => <button type="button" key={item.id} aria-pressed={active === index} aria-controls="rentit-journey-panel" tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => {
        const next = journeyIndex(index, event.key);
        if (next !== undefined) { event.preventDefault(); select(next, true); }
      }}><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</button>)}
    </div>
    <p className="rentit-status" role="status">Step {active + 1} of {rentitJourney.length}: {step.title}</p>
    <section id="rentit-journey-panel" aria-labelledby="rentit-journey-heading" className="rentit-panel">
      <h3 id="rentit-journey-heading">{step.title}</h3><p>{step.text}</p>
      {media && <figure>
        <div className="rentit-frame">
          <div className="rentit-capture" key={media.id} style={{ aspectRatio: `${media.width} / ${media.height}` }}>
            <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 639px) 100vw, 70vw" />
            <a className="rentit-pin" href="#rentit-active-note" style={{ left: `${step.x}%`, top: `${step.y}%` }} aria-label={`Read note 1 for ${step.title}`}>1</a>
          </div>
        </div>
        <figcaption>{media.caption}</figcaption>
      </figure>}
      <aside id="rentit-active-note" className="rentit-note" aria-label="Capture note"><span>01</span><p>{step.note}{"decision" in step && <> <a href={`#${step.decision}-heading`}>Read the decision</a>.</>}</p></aside>
      <p className="rentit-limit">{step.limit}</p>
      <p className="rentit-source">Source: {step.ref}</p>
      <a href={`#rentit-step-${step.id}`}>Read this step and its figures below</a>
    </section>
    <div className="rentit-navigation"><button type="button" onClick={() => select((active + rentitJourney.length - 1) % rentitJourney.length)}>Previous step</button><button type="button" onClick={() => select((active + 1) % rentitJourney.length)}>Next step</button></div>
  </div>;
}
