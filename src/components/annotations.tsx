"use client";
import { useEffect, useRef, useState } from "react";
import type { ConceptId, NoteRecord } from "@/content/annotations";
import { useShell } from "./shell";

// Margin-note rules: PRD.md section 26 (lines 724 to 727) and PRD.md Appendix C.
// Notes live in the DOM in reading order; hover, focus or tap only changes visibility.
// Note records arrive as props from the server so they stay out of the client bundle.

export function HeroConcepts({ notes }: { notes: ({ id: ConceptId } & NoteRecord)[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [coarse, setCoarse] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    const update = () => setCoarse(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Keep every note inside the viewport: closed notes are opacity 0 but still
  // positioned, so they must not grow the page width at any breakpoint.
  useEffect(() => {
    const clamp = () => {
      const list = listRef.current;
      if (!list) return;
      const inline = window.matchMedia("(hover: none)").matches;
      for (const item of Array.from(list.children)) {
        const anchor = item.querySelector(".concept-anchor");
        const note = item.querySelector(".concept-note");
        if (!(anchor instanceof HTMLElement) || !(note instanceof HTMLElement)) continue;
        note.style.transform = "";
        note.style.removeProperty("--leader-x");
        if (inline) continue;
        const anchorBox = anchor.getBoundingClientRect();
        const noteBox = note.getBoundingClientRect();
        const shift = Math.min(0, window.innerWidth - 16 - noteBox.right);
        if (shift < 0) note.style.transform = `translateX(${shift}px)`;
        note.style.setProperty("--leader-x", `${anchorBox.left + anchorBox.width / 2 - (noteBox.left + shift)}px`);
      }
    };
    clamp();
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, [coarse]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    function onPointerDown(event: PointerEvent) {
      if (!listRef.current?.contains(event.target as Node)) setOpen(null);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return <ul className="hero-concepts" aria-label="Concepts" ref={listRef}>
    {notes.map(item => <li key={item.id}>
      <button
        type="button"
        className="concept-anchor"
        aria-expanded={coarse ? open === item.id : undefined}
        onClick={coarse ? () => setOpen(current => current === item.id ? null : item.id) : undefined}
        onMouseEnter={coarse ? undefined : () => setOpen(item.id)}
        onMouseLeave={coarse ? undefined : () => setOpen(current => current === item.id ? null : current)}
        onFocus={coarse ? undefined : () => setOpen(item.id)}
        onBlur={coarse ? undefined : () => setOpen(current => current === item.id ? null : current)}
      >{item.label}</button>
      <aside className="concept-note" aria-label="Decision note" data-open={open === item.id ? "true" : "false"}>
        <span className="note-label">{item.label}</span>
        <p>{item.note}</p>
      </aside>
    </li>)}
  </ul>;
}

// Decision Mode site note: visible only while the mode is on (PRD.md Appendix C.1).
export function SiteNote({ note }: { note: NoteRecord }) {
  const { decisionOn } = useShell();
  if (!decisionOn) return null;
  return <aside className="site-note" aria-label="Decision note">
    <span className="note-label">{note.label}</span>
    <p>{note.note}</p>
  </aside>;
}
