"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { siteIdentity } from "@/content/identity";
import { motionPreference } from "@/lib/motion";
import { finishMenuExit } from "@/lib/menu-transition";
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
  const router = useRouter();
  const { openPalette, decisionOn, toggleDecisions, inspectOn, toggleInspect } = useShell();
  const dialog = useDialog(open, onClose);
  const layout = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const animations = useRef<Animation[]>([]);
  useEffect(() => {
    closing.current = false;
    const surface = dialog.current;
    const content = layout.current;
    if (!open || !surface || !content || typeof surface.animate !== "function" || motionPreference() !== "full") return;
    const styles = getComputedStyle(surface);
    const duration = parseFloat(styles.getPropertyValue("--dur-slow"));
    const easing = styles.getPropertyValue("--ease-out").trim();
    animations.current = [
      surface.animate([{ opacity: 0 }, { opacity: 1 }], { duration, easing }),
      content.animate([{ transform: "translateY(16px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { duration, easing }),
    ];
    return () => animations.current.forEach(animation => animation.cancel());
  }, [open, dialog]);

  function dismiss(afterClose?: () => void) {
    if (closing.current) return;
    closing.current = true;
    animations.current.forEach(animation => animation.cancel());
    const surface = dialog.current;
    const finish = () => {
      surface?.close();
      onClose();
      afterClose?.();
    };
    const animation = finishMenuExit(surface, motionPreference() === "full", finish);
    animations.current = animation ? [animation] : [];
  }

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    dismiss(() => router.push(href));
  }
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  return <dialog ref={dialog} className="mobile-menu" aria-label="Menu" onCancel={event => { event.preventDefault(); dismiss(); }}>
    <div ref={layout} className="mobile-menu-layout">
      <header className="mobile-menu-head">
        <a className="menu-home" href="/" onClick={event => navigate(event, "/")} aria-label={`${siteIdentity.name}, home`}>[{siteIdentity.name.split(" ").map(part => part[0]).join("")}]<span className="eyebrow">Annotated</span></a>
        <button type="button" className="dialog-close" onClick={() => dismiss()} autoFocus>Close <span aria-hidden="true">×</span></button>
      </header>
      <div className="menu-body">
        <p className="eyebrow menu-label"><span>Navigation</span><span>({String(routes.length).padStart(2, "0")})</span></p>
        <nav aria-label="Mobile navigation"><ol>{routes.map((route, index) => {
          const current = pathname === route.href || pathname.startsWith(route.href + "/");
          return <li key={route.href}><a href={route.href} aria-current={current ? "page" : undefined} onClick={event => navigate(event, route.href)}><span className="menu-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className={`menu-title${route.label.length > 8 ? " menu-title-long" : ""}`}>{route.label}</span><span className="menu-route-mark" aria-hidden="true">{current ? "●" : "↗"}</span></a></li>;
        })}</ol></nav>
      </div>
      <footer className="menu-footer">
        <div className="menu-tools">
          <button type="button" className="menu-jump" onClick={() => dismiss(openPalette)}>Jump to<span aria-hidden="true">↗</span></button>
          <div className="menu-view" role="group" aria-label="View controls">
            <button type="button" className="menu-decisions" aria-pressed={decisionOn} onClick={toggleDecisions}>Decisions<span>{decisionOn ? "On" : "Off"}</span></button>
            <button type="button" className="menu-decisions" aria-pressed={inspectOn} onClick={() => dismiss(toggleInspect)}>Inspect<span>{inspectOn ? "On" : "Off"}</span></button>
          </div>
        </div>
        <a className="menu-email" href={`mailto:${siteIdentity.email}`}><span className="menu-contact-title">Let’s talk<span aria-hidden="true">↗</span></span><span className="menu-address">{siteIdentity.email}</span></a>
        <div className="menu-external">
          <a href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (opens in new tab)</span></a>
          <a href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className="sr-only"> (opens in new tab)</span></a>
          <a href="/brief" onClick={event => navigate(event, "/brief")}>The brief ↗</a>
        </div>
      </footer>
    </div>
  </dialog>;
}
