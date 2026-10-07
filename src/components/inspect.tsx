"use client";
import { useEffect, useRef, useState } from "react";
import { useMeasurements, summarizeResources } from "@/lib/measurements";
import type { PaletteDecision } from "@/lib/palette";
import { useMotionPreference } from "@/lib/motion";

type Outline = { name: string; left: number; top: number; width: number; height: number };
type Authored = { name: string; type: string; font: string; size: string; color: string; spacing: string };
export default function Inspect({ route, decisions, onClose }: { route: string; decisions: PaletteDecision[]; onClose: () => void }) {
  const measurements = useMeasurements();
  const motion = useMotionPreference();
  const [outlines, setOutlines] = useState<Outline[]>([]);
  const [authored, setAuthored] = useState<Authored[]>([]);
  const [resources, setResources] = useState<ReturnType<typeof summarizeResources>>({ javascript: null, fonts: null, requests: 0 });
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const elements = [...document.querySelectorAll<HTMLElement>("[data-inspect]")];
      const annotated = elements.map(element => {
        const style = getComputedStyle(element);
        return { name: element.dataset.inspect ?? element.tagName, type: element.dataset.inspectType ?? "", font: style.fontFamily.split(",")[0], size: style.fontSize, color: element.dataset.inspectColor ?? "--ink", spacing: element.dataset.inspectSpacing ?? "no spacing token authored" };
      });
      setAuthored(annotated);
      const desktop = matchMedia("(min-width: 1024px)").matches;
      setOutlines(desktop && motion !== "lite" ? elements.flatMap(element => {
        const box = element.getBoundingClientRect();
        return box.bottom > 0 && box.top < innerHeight ? [{ name: element.dataset.inspect ?? element.tagName, left: box.left, top: box.top, width: box.width, height: box.height }] : [];
      }).slice(0, 12) : []);
      setResources(summarizeResources(performance.getEntriesByType("resource") as PerformanceResourceTiming[]));
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    measure(); close.current?.focus({ preventScroll: true });
    window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
    const observer = new PerformanceObserver(schedule);
    try { observer.observe({ type: "resource", buffered: true }); } catch { /* Text metrics still work. */ }
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [route, motion]);
  const sameDocumentRoute = measurements.route === route;
  const metric = (value: number | null, unit: string) => value === null ? "not yet measured" : unit === "score" ? value.toFixed(3) : `${Math.round(value)} ms`;
  const bytes = (value: number | null) => value === null ? "not yet measured" : `${value.toLocaleString()} bytes`;
  const relevant = decisions.filter(decision => decision.projectSlug === "site" || route === `/work/${decision.projectSlug}`);
  return <>
    <div className="inspect-overlay" aria-hidden="true">{outlines.map((outline, index) => <div key={outline.name + index} className="inspect-outline" style={{ left: outline.left, top: outline.top, width: outline.width, height: outline.height, animationDelay: `${index * 30}ms` }}><span>{outline.name}</span></div>)}</div>
    <section className="inspect-panel" aria-label="Page measurements">
      <div className="sheet-head"><h2>Page measurements</h2><button ref={close} className="dialog-close" onClick={onClose}>Close Inspect</button></div>
      <p className="inspect-route">{route}</p>
      <p className="inspect-caption">This visit on this device. Unavailable or cached transfer sizes are not estimated.</p>
      {!sameDocumentRoute && <p className="inspect-caption">Web Vitals belong to the document loaded at {measurements.route || "the initial route"}. <a href={route}>Reload this route to measure its page load.</a></p>}
      <dl className="inspect-values">
        <div><dt>LCP</dt><dd>{metric(sameDocumentRoute ? measurements.lcp : null, "ms")}</dd></div>
        <div><dt>INP</dt><dd>{metric(sameDocumentRoute ? measurements.inp : null, "ms")}</dd></div>
        <div><dt>CLS</dt><dd>{metric(sameDocumentRoute ? measurements.cls : null, "score")}</dd></div>
        <div><dt>JavaScript transferred</dt><dd>{bytes(resources.javascript)}</dd></div>
        <div><dt>Font transfer</dt><dd>{bytes(resources.fonts)}</dd></div>
        <div><dt>Resource requests recorded</dt><dd>{resources.requests}</dd></div>
      </dl>
      <p className="inspect-caption">Resource totals cover this document visit, including client navigation. The HTML document request is excluded.</p>
      <details><summary>Components, typography and tokens</summary><ul className="inspect-authored">{authored.map((item, index) => <li key={item.name + index}><strong>{item.name}</strong>{item.type && <code>{item.type}</code>}<span>{item.font} / {item.size}</span><code>{item.color} / {item.spacing}</code></li>)}</ul><p className="inspect-caption">Component, type and token names are authored. Font family and size are read from computed styles.</p></details>
      <details><summary>Decisions on this page</summary>{relevant.length ? <ul>{relevant.map(decision => <li key={decision.id}><a href={`/work/${decision.projectSlug}#${decision.id}-heading`}>{decision.title}</a></li>)}</ul> : <p className="inspect-caption">No published decision records are attached to this route.</p>}</details>
    </section>
  </>;
}
