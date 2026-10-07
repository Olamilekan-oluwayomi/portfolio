"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Decision, Project } from "@/lib/schemas";
import { figureStory } from "@/content/figure-stories";
import { useDialog } from "./use-dialog";

// PRD.md section 33: ProjectExperience supplies an error boundary and static figures.
export function StateGallery({ project }: { project: Project }) {
  const states = [
    { label: "Result", text: "Captured example: 1,000 USD produces 892.54 EUR. This recreation uses that dated capture, never a rates API." },
    { label: "Missing result", text: "The converter renders a dash when no received amount is available." },
    { label: "History loading", text: "LOADING..." },
    { label: "History empty or failed", text: "No chart data available" },
    { label: "Search no results", text: "NO RESULTS" },
    { label: "Empty favorites", text: "NO PINNED PAIRS YET" },
    { label: "Empty log", text: "No conversions logged yet" },
    { label: "Missing comparison amount", text: "NO COMPARISON AVAILABLE" },
  ];
  const [active, setActive] = useState(0);
  const [amount, setAmount] = useState("1000");
  const tabs = useRef<HTMLDivElement>(null);
  const result = Number(amount) * (892.54 / 1000);
  const valid = amount.trim() !== "" && Number.isFinite(result) && Number(amount) >= 0;
  function move(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % states.length;
    else if (event.key === "ArrowLeft") next = (index + states.length - 1) % states.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = states.length - 1;
    else return;
    event.preventDefault(); setActive(next);
    (tabs.current?.children[next] as HTMLElement)?.focus();
  }
  return <div className="experience-widget">
    <p className="eyebrow">Recreated states / capture dated 2026-10-06</p>
    <div className="experience-tabs" role="tablist" aria-label="Currency interface states" ref={tabs}>{states.map((state, index) => <button type="button" key={state.label} role="tab" id={"fx-tab-" + index} aria-controls={"fx-state-" + index} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onKeyDown={event => move(event, index)} onClick={() => setActive(index)}>{state.label}</button>)}</div>
    {states.map((state, index) => <section key={state.label} role="tabpanel" id={"fx-state-" + index} aria-labelledby={"fx-tab-" + index} hidden={active !== index} tabIndex={0} className="state-panel">
      {index === 0 ? <><div className="snapshot-converter"><label>Send USD<input inputMode="decimal" type="number" min="0" step="any" value={amount} onChange={event => setAmount(event.target.value)} /></label><div><span>Receive EUR</span><output aria-live="polite">{valid ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(result) : "—"}</output></div></div><p>{state.text}</p></> : <><h3>{state.label}</h3><p>{state.text}</p></>}
      <p className="experience-source">Recreation, not the running application. Evidence: {index === 0 ? project.media[0]?.src : "docs/truth/foreign-exchange-checker.md, section 6"}.</p>
    </section>)}
  </div>;
}

export function SpaceResizer({ project }: { project: Project }) {
  const [width, setWidth] = useState(768);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [touch, setTouch] = useState(true);
  const [route, setRoute] = useState("");
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = matchMedia("(max-width: 639px), (hover: none)");
    const update = () => { setTouch(query.matches); if (query.matches) setLoaded(false); };
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!loaded || ready) return;
    const timer = window.setTimeout(() => setFailed(true), 12000);
    return () => clearTimeout(timer);
  }, [loaded, ready, route]);
  const annotation = width < 768 ? "Mobile route backgrounds are selected below 768px." : width < 1024 ? "Tablet route backgrounds are selected from 768px; Technology still uses landscape imagery." : "Desktop route backgrounds and Technology portrait imagery are selected from 1024px.";
  return <div className="experience-widget">
    <p className="eyebrow">Explore the responsive implementation</p>
    <div className="experience-tabs" role="group" aria-label="Viewport presets">{[375, 768, 1280].map(size => <button type="button" key={size} aria-pressed={width === size} onClick={() => setWidth(size)}>{size}px</button>)}</div>
    <p className="experience-annotation">{annotation} Source: docs/truth/space-tourism.md, section 5.</p>
    {touch ? <p>The supplied figures below are desktop captures. They remain the static reading path; captures at the three preset widths are pending.</p> : <>
      <label className="resizer-label">Viewport width: {width}px<input aria-label="Live preview viewport width" type="range" min="375" max="1280" step="1" value={width} onChange={event => setWidth(Number(event.target.value))} /></label>
      <div className="experience-tabs" role="group" aria-label="Live preview section">{["", "destination", "crew", "technology"].map(section => <button type="button" key={section} aria-pressed={route === section} onClick={() => { setRoute(section); setReady(false); setFailed(false); }}>{section || "home"}</button>)}</div>
      <div className="resizer-scroll" ref={frame}>
        <div className="resizer-frame" style={{ width }}>
          {loaded && !failed ? <><iframe title="Space Tourism live preview" src={new URL(route || "/", project.links.live).href} sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" onLoad={() => setReady(true)} onError={() => setFailed(true)} />{!ready && <p className="preview-loading" role="status">Loading live preview</p>}</> : <><Image src={project.media[0].src} width={project.media[0].width} height={project.media[0].height} alt={project.media[0].alt} sizes="(max-width: 767px) 100vw, 70vw" /><button className="load-preview" type="button" onClick={() => { setFailed(false); setReady(false); setLoaded(true); }}>{failed ? "Retry live preview" : "Load live preview"}</button></>}
        </div>
      </div>
      {failed && <p role="status">The preview could not load. Open the site directly or use the figures below.</p>}
      <p className="experience-source">Drag the range control or use its arrow keys. Width changes resize the actual embedded viewport; screenshots are never presented as captures at another width.</p>
    </>}
    <a href={project.links.live} target="_blank" rel="noopener noreferrer">Open Space Tourism directly<span className="sr-only"> (opens in new tab)</span></a>
  </div>;
}

export function ManuscriptSources({ project, decisions }: { project: Project; decisions: Decision[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  const dialog = useDialog(selected !== null, () => setSelected(null));
  const sources = [...project.media.slice(0, 3).map(media => ({ title: figureStory(media.src)?.title ?? media.caption, description: figureStory(media.src)?.caption ?? media.caption, ref: media.src, media })),
    ...decisions.map(decision => ({ title: decision.title, description: decision.choice, ref: decision.evidence[0].ref, media: undefined }))];
  const source = selected === null ? undefined : sources[selected];
  return <div className="experience-widget manuscript">
    <p className="eyebrow">A manuscript with its sources attached</p>
    <p className="manuscript-abstract">{project.premise}</p>
    <ol className="manuscript-claims">{sources.map((item, index) => <li key={item.ref}><p>{item.description} <button type="button" className="source-marker" onClick={() => setSelected(index)} aria-haspopup="dialog" aria-label={"Read source " + (index + 1) + ": " + item.title}>[{index + 1}]</button></p></li>)}</ol>
    <button type="button" className="experience-button" aria-expanded={all} aria-controls="manuscript-footnotes" onClick={() => setAll(value => !value)}>{all ? "Hide inline sources" : "Show all sources"}</button>
    <ol className="manuscript-footnotes" id="manuscript-footnotes" hidden={!all}>{sources.map((item, index) => <li key={item.ref}><strong>{index + 1}. {item.title}</strong><p>{item.description}</p><code>{item.ref}</code></li>)}</ol>
    <dialog className="source-sheet" ref={dialog} aria-label={source ? "Source: " + source.title : "Source evidence"}>
      <div className="sheet-head"><h3>{source?.title}</h3><button className="dialog-close" onClick={() => dialog.current?.close()}>Close</button></div>
      {source?.media && <Image src={source.media.src} width={source.media.width} height={source.media.height} alt={source.media.alt} sizes="(max-width: 767px) 100vw, 40vw" />}
      <p>{source?.description}</p><code>{source?.ref}</code>
    </dialog>
  </div>;
}
