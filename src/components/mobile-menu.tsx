"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { siteIdentity } from "@/content/identity";
import { useShell } from "./shell";
import { useDialog } from "./use-dialog";

const routes = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

// Owner requested menu redesign and animation: PRD.md Appendix G.
export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { openPalette, decisionOn, toggleDecisions, inspectOn, toggleInspect } = useShell();
  const dialog = useDialog(open, onClose);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  return <dialog ref={dialog} className="mobile-menu" aria-label="Menu">
    <div className="mobile-menu-layout">
      <header className="mobile-menu-head">
        <Link className="menu-home" href="/" onClick={onClose} aria-label={`${siteIdentity.name}, home`}>[{siteIdentity.name.split(" ").map(part => part[0]).join("")}]<span className="eyebrow">Annotated</span></Link>
        <button type="button" className="dialog-close" onClick={onClose} autoFocus>Close <span aria-hidden="true">×</span></button>
      </header>
      <div className="menu-body">
        <p className="eyebrow menu-label">Explore</p>
        <nav aria-label="Mobile navigation"><ol>{routes.map((route, index) => {
          const current = pathname === route.href || pathname.startsWith(route.href + "/");
          return <li key={route.href}><Link href={route.href} aria-current={current ? "page" : undefined} onClick={onClose}><span className="menu-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="menu-title">{route.label}</span><span className="menu-route-mark" aria-hidden="true">{current ? "●" : "↗"}</span></Link></li>;
        })}</ol></nav>
        <button type="button" className="menu-jump" onClick={openPalette}>Jump to<span aria-hidden="true">↗</span></button>
        <div className="menu-view" role="group" aria-label="View controls">
          <button type="button" className="menu-decisions" aria-pressed={decisionOn} onClick={toggleDecisions}>Decisions<span>{decisionOn ? "On" : "Off"}</span></button>
          <button type="button" className="menu-decisions" aria-pressed={inspectOn} onClick={() => { onClose(); toggleInspect(); }}>Inspect<span>{inspectOn ? "On" : "Off"}</span></button>
        </div>
      </div>
      <footer className="menu-footer">
        <a className="menu-email" href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}<span aria-hidden="true">↗</span></a>
        <div className="menu-external">
          <a href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (opens in new tab)</span></a>
          <a href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className="sr-only"> (opens in new tab)</span></a>
          <Link href="/brief" onClick={onClose}>The brief ↗</Link>
        </div>
      </footer>
    </div>
  </dialog>;
}
