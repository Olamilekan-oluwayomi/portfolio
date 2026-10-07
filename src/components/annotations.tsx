"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { ConceptId, NoteRecord } from "@/content/annotations";
import { useShell } from "./shell";
import { useDialog } from "./use-dialog";

// PRD.md section 26 and Appendix C: inline reading order and pointer/keyboard parity.
export function HeroConcepts({ notes }: { notes: ({ id: ConceptId } & NoteRecord)[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [touch, setTouch] = useState(false);
  const [sheet, setSheet] = useState(false);
  const list = useRef<HTMLUListElement>(null);
  const dialog = useDialog(sheet, () => { setSheet(false); setOpen(null); });
  const prefix = useId();
  function show(id: string) { window.dispatchEvent(new CustomEvent("annotated-note-open", { detail: prefix })); setOpen(id); }
  useEffect(() => {
    const other = (event: Event) => { if ((event as CustomEvent<string>).detail !== prefix) { setOpen(null); setSheet(false); } };
    window.addEventListener("annotated-note-open", other);
    return () => window.removeEventListener("annotated-note-open", other);
  }, [prefix]);
  useEffect(() => {
    const media = matchMedia("(hover: none)");
    const update = () => { setTouch(media.matches); setOpen(null); setSheet(false); };
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.closest("dialog")) return;
      if (event.key === "Escape" && open) { event.preventDefault(); event.stopImmediatePropagation(); setOpen(null); setSheet(false); }
    };
    const outside = (event: PointerEvent) => {
      if (!list.current?.contains(event.target as Node) && !dialog.current?.contains(event.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", close, true);
    window.addEventListener("pointerdown", outside);
    return () => { window.removeEventListener("keydown", close, true); window.removeEventListener("pointerdown", outside); };
  }, [open, dialog]);
  useEffect(() => {
    const clamp = () => {
      if (!list.current || touch) return;
      for (const item of Array.from(list.current.children)) {
        const anchor = item.querySelector("button");
        const note = item.querySelector(".concept-note");
        if (!(anchor instanceof HTMLElement) || !(note instanceof HTMLElement)) continue;
        note.style.transform = "";
        const box = note.getBoundingClientRect();
        const shift = Math.max(16 - box.left, Math.min(0, innerWidth - 16 - box.right));
        note.style.transform = `translateX(${shift}px)`;
        const anchorBox = anchor.getBoundingClientRect();
        note.style.setProperty("--leader-x", `${anchorBox.left + anchorBox.width / 2 - box.left - shift}px`);
      }
    };
    clamp(); window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, [touch]);
  const selected = notes.find(note => note.id === open);
  return <>
    <ul className="hero-concepts" aria-label="Concepts" ref={list}>
      {notes.map((item, index) => <li key={item.id}
        onMouseEnter={touch ? undefined : () => show(item.id)}
        onMouseLeave={touch ? undefined : event => { if (!event.currentTarget.contains(document.activeElement)) setOpen(null); }}
        onBlur={touch ? undefined : event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}>
        <button type="button" className="concept-anchor" aria-expanded={open === item.id} aria-controls={touch ? prefix + "-sheet" : `${prefix}-${item.id}`}
          aria-haspopup={touch ? "dialog" : undefined}
          onFocus={touch ? undefined : () => show(item.id)}
          onClick={() => { if (touch) { show(item.id); setSheet(true); } else if (open === item.id) setOpen(null); else show(item.id); }}>
          <span className="note-number" aria-hidden="true">{index + 1}</span>{item.label}
        </button>
        <aside id={`${prefix}-${item.id}`} className="concept-note" aria-label="Decision note" data-open={open === item.id ? "true" : "false"}>
          <span className="note-label">{item.label}</span><p>{item.note}</p>
        </aside>
        <details className="touch-note"><summary>{item.label}: read the note</summary><p>{item.note}</p></details>
      </li>)}
    </ul>
    <dialog id={prefix + "-sheet"} className="note-sheet" ref={dialog} aria-label={selected ? `${selected.label} decision note` : "Decision note"}>
      <div className="sheet-head"><span className="note-label">{selected?.label}</span><button className="dialog-close" onClick={() => dialog.current?.close()}>Close</button></div>
      <p>{selected?.note}</p>
    </dialog>
  </>;
}

export function SiteNote({ note }: { note: NoteRecord }) {
  const { decisionOn } = useShell();
  const [open, setOpen] = useState(false);
  const [touch, setTouch] = useState(false);
  const [sheet, setSheet] = useState(false);
  const id = useId();
  const slot = useRef<HTMLDivElement>(null);
  const dialog = useDialog(sheet, () => { setSheet(false); setOpen(false); });
  useEffect(() => {
    const query = matchMedia("(hover: none)");
    const update = () => { setTouch(query.matches); setSheet(false); setOpen(false); };
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const other = (event: Event) => { if ((event as CustomEvent<string>).detail !== id) { setOpen(false); setSheet(false); } };
    const outside = (event: PointerEvent) => { if (!slot.current?.contains(event.target as Node)) setOpen(false); };
    window.addEventListener("annotated-note-open", other); window.addEventListener("pointerdown", outside);
    return () => { window.removeEventListener("annotated-note-open", other); window.removeEventListener("pointerdown", outside); };
  }, [id]);
  useEffect(() => { if (!decisionOn) { setOpen(false); setSheet(false); } }, [decisionOn]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if ((event.target as HTMLElement)?.closest("dialog")) return; if (event.key === "Escape" && open) { event.preventDefault(); event.stopImmediatePropagation(); setOpen(false); } };
    window.addEventListener("keydown", close, true);
    return () => window.removeEventListener("keydown", close, true);
  }, [open]);
  return <div className="site-note-slot" ref={slot} data-visible={decisionOn ? "true" : "false"}>
    <button className="site-note-marker" type="button" aria-expanded={open} aria-controls={touch ? id + "-sheet" : id} aria-haspopup={touch ? "dialog" : undefined} onClick={() => { window.dispatchEvent(new CustomEvent("annotated-note-open", { detail: id })); if (touch) { setOpen(true); setSheet(true); } else setOpen(value => !value); }} tabIndex={decisionOn ? 0 : -1}>+ <span>{note.label}</span></button>
    <aside id={id} className="site-note" aria-label="Decision note" hidden={!decisionOn || !open}>
      <span className="note-label">{note.label}</span><p>{note.note}</p>
    </aside>
    <details className="site-note-inline"><summary>{note.label}</summary><aside aria-label="Decision note"><p>{note.note}</p></aside></details>
    <dialog id={id + "-sheet"} className="note-sheet" ref={dialog} aria-label={note.label}><div className="sheet-head"><span className="note-label">{note.label}</span><button className="dialog-close" onClick={() => dialog.current?.close()}>Close</button></div><p>{note.note}</p></dialog>
  </div>;
}
