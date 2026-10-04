"use client";
import { useEffect, useSyncExternalStore } from "react";

function isNight() {
  const explicit = document.documentElement.getAttribute("data-theme");
  return explicit === "night" || (!explicit && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function subscribe(onChange: () => void) {
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  preference.addEventListener("change", onChange);
  window.addEventListener("annotated-theme-change", onChange);
  return () => {
    preference.removeEventListener("change", onChange);
    window.removeEventListener("annotated-theme-change", onChange);
  };
}

// Theme preference contract: PRD.md section 24.
export function ThemeToggle() {
  const night = useSyncExternalStore(subscribe, isNight, () => false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("annotated-theme");
      if (saved === "paper" || saved === "night") {
        document.documentElement.setAttribute("data-theme", saved);
        window.dispatchEvent(new Event("annotated-theme-change"));
      }
    } catch { /* System preference remains available without storage. */ }
  }, []);
  function toggle() {
    const root = document.documentElement;
    const theme = night ? "paper" : "night";
    root.setAttribute("data-theme", theme);
    window.dispatchEvent(new Event("annotated-theme-change"));
    try { localStorage.setItem("annotated-theme", theme); } catch { /* Theme still changes when storage is unavailable. */ }
  }
  return <button className="theme-control" type="button" onClick={toggle} aria-label="Dark theme" aria-pressed={night}><span aria-hidden="true">◐</span></button>;
}
