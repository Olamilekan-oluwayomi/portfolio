"use client";
import { useSyncExternalStore } from "react";

// Document-scoped Web Vitals. SPA navigation is never mislabeled as a new page load.
// PRD.md sections 26 and 29; GoogleChrome/web-vitals README, SPA limitations.
type Measurements = { route: string; lcp: number | null; inp: number | null; cls: number | null };
let state: Measurements = { route: "", lcp: null, inp: null, cls: null };
let started = false;
const listeners = new Set<() => void>();
const server = state;
function publish(metric: "lcp" | "inp" | "cls", value: number) {
  state = { ...state, [metric]: value }; listeners.forEach(listener => listener());
}
export function startMeasurements() {
  if (started) return;
  started = true;
  const navigation = performance.getEntriesByType("navigation")[0];
  state = { ...state, route: new URL(navigation?.name ?? location.href).pathname };
  listeners.forEach(listener => listener());
  void import("web-vitals").then(({ onLCP, onINP, onCLS }) => {
    onLCP(metric => publish("lcp", metric.value), { reportAllChanges: true });
    onINP(metric => publish("inp", metric.value), { reportAllChanges: true });
    onCLS(metric => publish("cls", metric.value), { reportAllChanges: true });
  }).catch(() => { /* Unsupported metrics remain unmeasured. */ });
}
function subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
export function useMeasurements() { return useSyncExternalStore(subscribe, () => state, () => server); }

export function summarizeResources(entries: PerformanceResourceTiming[]) {
  const scripts = entries.filter(entry => entry.initiatorType === "script" || /\.m?js(?:\?|$)/u.test(entry.name));
  const fonts = entries.filter(entry => /\.woff2?(?:\?|$)/u.test(entry.name));
  // Zero transferSize can mean a cache hit or unavailable timing. Do not guess which.
  const bytes = (items: PerformanceResourceTiming[]) => items.length && items.every(entry => entry.transferSize > 0) ? items.reduce((sum, entry) => sum + entry.transferSize, 0) : null;
  return { javascript: bytes(scripts), fonts: bytes(fonts), requests: entries.length };
}
