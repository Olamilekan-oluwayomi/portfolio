"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { siteIdentity } from "@/content/identity";
import { publishedProjectSlugs } from "@/content/release";
import { workIndex } from "@/content/work-index";
import { buildCommands, type PaletteDecision } from "@/lib/palette";
import { useDialog } from "./use-dialog";

const Palette = dynamic(() => import("./palette"), { ssr: false });

type ShellContextValue = {
  openPalette: () => void;
  openMenu: () => void;
  announce: (message: string) => void;
  shortcutsOn: boolean;
  toggleShortcuts: () => void;
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
  const [status, setStatus] = useState("");
  const pending = useRef<string | null>(null);
  const pendingTimer = useRef<number | undefined>(undefined);
  const statusTimer = useRef<number | undefined>(undefined);
  const menuDialog = useDialog(menuOpen, () => setMenuOpen(false));
  const sheetDialog = useDialog(sheetOpen, () => setSheetOpen(false));

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

  const commands = useMemo(() => buildCommands(decisions, shortcutsOn), [decisions, shortcutsOn]);

  // Shortcut accessibility rule (WCAG 2.1.4): the setting persists across visits (PRD.md section 14).
  useEffect(() => {
    try {
      if (localStorage.getItem("annotated-shortcuts") === "off") setShortcutsOn(false);
    } catch { /* Default stays on without storage. */ }
    function sync(event: StorageEvent) {
      if (event.key === "annotated-shortcuts") setShortcutsOn(event.newValue !== "off");
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
  }, [shortcutsOn, menuOpen, sheetOpen, paletteOpen, router]);

  const value = useMemo<ShellContextValue>(() => ({ openPalette, openMenu, announce, shortcutsOn, toggleShortcuts }), [openPalette, openMenu, announce, shortcutsOn, toggleShortcuts]);

  return <ShellContext.Provider value={value}>
    {children}
    <div className="shell-status sr-only" role="status" aria-live="polite">{status}</div>
    {paletteMounted && <Palette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} announce={announce} onToggleShortcuts={toggleShortcuts} onOpenSheet={() => { setPaletteOpen(false); setSheetOpen(true); }} />}
    <dialog className="mobile-menu" ref={menuDialog} aria-label="Menu">
      <div className="mobile-menu-head"><span className="eyebrow">Menu</span><button type="button" className="dialog-close" onClick={() => menuDialog.current?.close()}>Close</button></div>
      <nav aria-label="Mobile navigation">
        <Link href="/work" onClick={() => menuDialog.current?.close()}>Work</Link>
        <Link href="/about" onClick={() => menuDialog.current?.close()}>About</Link>
        <Link href="/experience" onClick={() => menuDialog.current?.close()}>Experience</Link>
        <Link href="/contact" onClick={() => menuDialog.current?.close()}>Contact</Link>
      </nav>
      <button type="button" className="menu-jump" onClick={openPalette}>Jump to <span aria-hidden="true">⌘K</span></button>
      <div className="menu-external">
        <a href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (opens in new tab)</span></a>
        <a href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className="sr-only"> (opens in new tab)</span></a>
        <a href={`mailto:${siteIdentity.email}`}>Email</a>
      </div>
    </dialog>
    <dialog className="shortcut-sheet" ref={sheetDialog} aria-label="Keyboard shortcuts">
      <div className="sheet-head"><h2>Keyboard shortcuts</h2><button type="button" className="dialog-close" onClick={() => sheetDialog.current?.close()}>Close</button></div>
      <table>
        <tbody>
          <tr><th scope="row"><kbd>⌘K</kbd> <span className="muted">or</span> <kbd>Ctrl K</kbd></th><td>Open the command palette</td></tr>
          <tr><th scope="row"><kbd>/</kbd></th><td>Open the palette when focus is not in a field</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>h</kbd></th><td>Home</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>w</kbd></th><td>Work</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>a</kbd></th><td>About</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>e</kbd></th><td>Experience</td></tr>
          <tr><th scope="row"><kbd>g</kbd> <span className="muted">then</span> <kbd>c</kbd></th><td>Contact</td></tr>
          <tr><th scope="row"><kbd>[</kbd> <span className="muted">and</span> <kbd>]</kbd></th><td>Previous and next project on project pages</td></tr>
          <tr><th scope="row"><kbd>?</kbd></th><td>Show this sheet</td></tr>
          <tr><th scope="row"><kbd>Esc</kbd></th><td>Close the top layer and restore focus</td></tr>
        </tbody>
      </table>
      <button type="button" className="shortcuts-toggle" aria-pressed={shortcutsOn} onClick={toggleShortcuts}>Single-character shortcuts: {shortcutsOn ? "on" : "off"}</button>
      <p className="muted">Modifier shortcuts stay active when single-character shortcuts are off.</p>
    </dialog>
    {!pathname.startsWith("/work/") && <a className="mobile-email" href={`mailto:${siteIdentity.email}`}>Email <span aria-hidden="true">↗</span></a>}
    <div className={pathname.startsWith("/work/") ? "spacer-live" : "spacer-pill"} aria-hidden="true" />
  </ShellContext.Provider>;
}
