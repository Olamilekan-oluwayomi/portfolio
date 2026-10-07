"use client";
import dynamic from "next/dynamic";
import { MotionSetup, motionPreference, useMotionPreference, toggleMotionSetting } from "@/lib/motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { siteIdentity } from "@/content/identity";
import { publishedProjectSlugs } from "@/content/release";
import { workIndex } from "@/content/work-index";
import type { PaletteDecision } from "@/lib/palette";
import { useDialog } from "./use-dialog";

const Palette = dynamic(() => import("./palette"), { ssr: false });
const ShortcutSheet = dynamic(() => import("./shortcut-sheet"), { ssr: false });
const Inspect = dynamic(() => import("./inspect"), { ssr: false });

type ShellContextValue = {
  openPalette: () => void;
  openMenu: () => void;
  announce: (message: string) => void;
  shortcutsOn: boolean;
  toggleShortcuts: () => void;
  decisionOn: boolean;
  toggleDecisions: () => void;
  inspectOn: boolean;
  toggleInspect: () => void;
};

const ShellContext = createContext<ShellContextValue | null>(null);

export function useShell(): ShellContextValue {
  const value = useContext(ShellContext);
  if (!value) throw new Error("useShell must be used inside the Shell provider");
  return value;
}

// Navigation contract: PRD.md section 14. Only released routes are listed.
const publishedProjects = workIndex.filter(project => publishedProjectSlugs.includes(project.slug));
const sequenceRoutes: Record<string, string> = { h: "/", w: "/work", a: "/about", e: "/experience", c: "/contact" };

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable;
}

export function Shell({ decisions, children }: { decisions: PaletteDecision[]; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [paletteMounted, setPaletteMounted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [shortcutsOn, setShortcutsOn] = useState(true);
  const [decisionOn, setDecisionOn] = useState(false);
  const [inspectOn, setInspectOn] = useState(false);
  const inspectOrigin = useRef<HTMLElement | null>(null);
  const motion = useMotionPreference();
  const [status, setStatus] = useState("");
  const pending = useRef<string | null>(null);
  const pendingTimer = useRef<number | undefined>(undefined);
  const statusTimer = useRef<number | undefined>(undefined);
  const menuDialog = useDialog(menuOpen, () => setMenuOpen(false));

  const announce = useCallback((message: string) => {
    setStatus(message);
    window.clearTimeout(statusTimer.current);
    statusTimer.current = window.setTimeout(() => setStatus(""), 3000);
  }, []);

  const openPalette = useCallback(() => {
    pending.current = null;
    window.clearTimeout(pendingTimer.current);
    setMenuOpen(false);
    setSheetOpen(false);
    setPaletteMounted(true);
    setPaletteOpen(true);
  }, []);

  const openMenu = useCallback(() => {
    pending.current = null;
    window.clearTimeout(pendingTimer.current);
    setMenuOpen(true);
  }, []);

  const toggleShortcuts = useCallback(() => {
    const next = !shortcutsOn;
    setShortcutsOn(next);
    try { localStorage.setItem("annotated-shortcuts", next ? "on" : "off"); } catch { /* The setting survives only while storage is available. */ }
    announce(next ? "Single-character shortcuts on" : "Single-character shortcuts off");
  }, [shortcutsOn, announce]);

  const toggleDecisions = useCallback(() => {
    setDecisionOn(current => {
      const next = !current;
      try { localStorage.setItem("annotated-decision-mode", next ? "on" : "off"); } catch { /* The setting survives only while storage is available. */ }
      announce(next ? "Decision mode on" : "Decision mode off");
      return next;
    });
  }, [announce]);

  const toggleInspect = useCallback(() => {
    const next = !inspectOn;
    if (next) {
      const active = document.activeElement;
      inspectOrigin.current = active instanceof HTMLElement && !active.closest("dialog") ? active : document.querySelector<HTMLElement>(matchMedia("(max-width: 639px)").matches ? ".menu-trigger" : ".palette-trigger");
    }
    const update = async () => {
      const { flushSync } = await import("react-dom");
      document.documentElement.dataset.inspectMode = String(next);
      flushSync(() => setInspectOn(next));
      if (!next) (inspectOrigin.current?.isConnected ? inspectOrigin.current : document.querySelector<HTMLElement>(".wordmark"))?.focus({ preventScroll: true });
    };
    if (motionPreference() === "full" && document.startViewTransition) {
      const transition = document.startViewTransition(update);
      transition.types?.add(next ? "inspect-on" : "inspect-off");
      void transition.finished.catch(() => {});
    } else void update();
  }, [inspectOn]);
  useEffect(() => { void import("@/lib/measurements").then(module => module.startMeasurements()); }, []);

  // Decision Mode and shortcut settings persist across visits and sync across tabs (PRD.md section 14, Appendix C).
  useEffect(() => {
    try {
      if (localStorage.getItem("annotated-shortcuts") === "off") setShortcutsOn(false);
      if (localStorage.getItem("annotated-decision-mode") === "on") setDecisionOn(true);
    } catch { /* Defaults stay clean without storage. */ }
    function sync(event: StorageEvent) {
      if (event.key === "annotated-shortcuts") setShortcutsOn(event.newValue !== "off");
      if (event.key === "annotated-decision-mode") setDecisionOn(event.newValue === "on");
    }
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => () => window.clearTimeout(statusTimer.current), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const modifier = event.metaKey || event.ctrlKey;
      if (modifier && (event.key === "k" || event.key === "K")) {
        event.preventDefault();
        pending.current = null;
        window.clearTimeout(pendingTimer.current);
        setMenuOpen(false);
        setSheetOpen(false);
        if (paletteOpen) { setPaletteOpen(false); return; }
        setPaletteMounted(true);
        setPaletteOpen(true);
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (menuOpen || sheetOpen || paletteOpen) return;
      if (event.key === "Escape" && inspectOn) { event.preventDefault(); toggleInspect(); return; }
      if (isTypingTarget(event.target)) return;
      const key = event.key;
      if (pending.current !== null) {
        window.clearTimeout(pendingTimer.current);
        pending.current = null;
        if (shortcutsOn && key !== "Escape" && sequenceRoutes[key]) {
          event.preventDefault();
          router.push(sequenceRoutes[key]);
        }
        return;
      }
      if (!shortcutsOn) return;
      if (key === "/") {
        event.preventDefault();
        setPaletteMounted(true);
        setPaletteOpen(true);
      } else if (key === "g") {
        pending.current = "g";
        window.clearTimeout(pendingTimer.current);
        pendingTimer.current = window.setTimeout(() => { pending.current = null; }, 1500);
      } else if (key === "?") {
        event.preventDefault();
        setSheetOpen(open => !open);
      } else if (key === "i") {
        event.preventDefault(); toggleInspect();
      } else if (key === "d") {
        event.preventDefault();
        toggleDecisions();
      } else if (key === "[" || key === "]") {
        const match = /^\/work\/([^/]+)$/u.exec(window.location.pathname);
        const index = match ? publishedProjects.findIndex(project => project.slug === match[1]) : -1;
        if (index === -1) return;
        const offset = key === "]" ? 1 : -1;
        const next = publishedProjects[(index + offset + publishedProjects.length) % publishedProjects.length];
        event.preventDefault();
        router.push(`/work/${next.slug}`);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcutsOn, menuOpen, sheetOpen, paletteOpen, router, toggleDecisions, inspectOn, toggleInspect]);

  const value = useMemo<ShellContextValue>(() => ({ openPalette, openMenu, announce, shortcutsOn, toggleShortcuts, decisionOn, toggleDecisions, inspectOn, toggleInspect }), [openPalette, openMenu, announce, shortcutsOn, toggleShortcuts, decisionOn, toggleDecisions, inspectOn, toggleInspect]);

  return <ShellContext.Provider value={value}>
    <MotionSetup />
    {children}
    {inspectOn && <Inspect route={pathname} decisions={decisions} onClose={toggleInspect} />}
    <div className="shell-status sr-only" role="status" aria-live="polite">{status}</div>
    {paletteMounted && <Palette open={paletteOpen} onClose={() => setPaletteOpen(false)} decisions={decisions} shortcutsOn={shortcutsOn} decisionOn={decisionOn} inspectOn={inspectOn} motion={motion} announce={announce} onToggleShortcuts={toggleShortcuts} onToggleDecisions={toggleDecisions} onToggleInspect={toggleInspect} onToggleLite={() => announce(toggleMotionSetting("lite") ? "Lite mode on" : "Lite mode off")} onToggleReduce={() => announce(toggleMotionSetting("reduce-motion") ? "Reduced motion on" : "System motion preference")} onOpenSheet={() => { setPaletteOpen(false); setSheetOpen(true); }} />}
    <dialog className="mobile-menu" ref={menuDialog} aria-label="Menu">
      <div className="mobile-menu-head"><span className="eyebrow">Menu</span><button type="button" className="dialog-close" onClick={() => menuDialog.current?.close()}>Close</button></div>
      <nav aria-label="Mobile navigation">
        <Link href="/work" onClick={() => menuDialog.current?.close()}>Work</Link>
        <Link href="/about" onClick={() => menuDialog.current?.close()}>About</Link>
        <Link href="/experience" onClick={() => menuDialog.current?.close()}>Experience</Link>
        <Link href="/contact" onClick={() => menuDialog.current?.close()}>Contact</Link>
      </nav>
      <button type="button" className="menu-jump" onClick={openPalette}>Jump to <span aria-hidden="true">⌘K</span></button>
      <button type="button" className="menu-decisions" aria-pressed={decisionOn} onClick={toggleDecisions}>Decision mode: {decisionOn ? "on" : "off"} <span aria-hidden="true">D</span></button>
      <div className="menu-external">
        <button type="button" className="menu-decisions" aria-pressed={inspectOn} onClick={() => { setMenuOpen(false); toggleInspect(); }}>Inspect: {inspectOn ? "on" : "off"}</button>
        <a href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (opens in new tab)</span></a>
        <a href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className="sr-only"> (opens in new tab)</span></a>
        <a href={`mailto:${siteIdentity.email}`}>Email</a>
      </div>
    </dialog>
    {sheetOpen && <ShortcutSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />}
    {!pathname.startsWith("/work/") && <a className="mobile-email" href={`mailto:${siteIdentity.email}`}>Email <span aria-hidden="true">↗</span></a>}
    <div className={pathname.startsWith("/work/") ? "spacer-live" : "spacer-pill"} aria-hidden="true" />
  </ShellContext.Provider>;
}
