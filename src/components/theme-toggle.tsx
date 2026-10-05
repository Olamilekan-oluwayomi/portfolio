"use client";
import { useEffect, useSyncExternalStore } from "react";

function isNight() {
  const explicit = document.documentElement.getAttribute("data-theme");
  return explicit === "night" || (!explicit && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function subscribe(onChange: () => void) {
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  function syncStoredTheme(event: StorageEvent) {
    if (event.key !== "annotated-theme" && event.key !== null) return;
    const saved = event.newValue;
    if (saved === "paper" || saved === "night") {
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    onChange();
  }
  preference.addEventListener("change", onChange);
  window.addEventListener("annotated-theme-change", onChange);
  window.addEventListener("storage", syncStoredTheme);
  return () => {
    observer.disconnect();
    preference.removeEventListener("change", onChange);
    window.removeEventListener("annotated-theme-change", onChange);
    window.removeEventListener("storage", syncStoredTheme);
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
    const theme = isNight() ? "paper" : "night";
    root.setAttribute("data-theme", theme);
    window.dispatchEvent(new Event("annotated-theme-change"));
    try { localStorage.setItem("annotated-theme", theme); } catch { /* Theme still changes when storage is unavailable. */ }
  }
  return <button className="theme-control" type="button" onClick={toggle} aria-label="Dark theme" aria-pressed={night}><span aria-hidden="true">◐</span></button>;
}
