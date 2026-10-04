"use client";
import { useEffect } from "react";

// Theme preference contract: PRD.md section 24.
export function ThemeToggle() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem("annotated-theme");
      if (saved === "paper" || saved === "night") document.documentElement.setAttribute("data-theme", saved);
    } catch { /* System preference remains available without storage. */ }
  }, []);
  function toggle() {
    const root = document.documentElement;
    const explicit = root.getAttribute("data-theme");
    const night = explicit === "night" || (!explicit && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const theme = night ? "paper" : "night";
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("annotated-theme", theme); } catch { /* Theme still changes when storage is unavailable. */ }
  }
  return <button className="theme-control" type="button" onClick={toggle} aria-label="Switch between light and dark theme"><span aria-hidden="true">◐</span></button>;
}
