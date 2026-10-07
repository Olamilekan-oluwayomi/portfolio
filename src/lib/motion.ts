"use client";
import { useEffect, useSyncExternalStore } from "react";

// PRD.md sections 25, 28 and 29. Overrides only reduce motion.
export type MotionPreference = "full" | "reduced" | "lite";
type Hints = { saveData?: boolean; deviceMemory?: number; hardwareConcurrency?: number; reducedData?: boolean; reducedMotion?: boolean; lite?: boolean; reduce?: boolean };
export function resolveMotion(hints: Hints): MotionPreference {
  if (hints.lite || hints.saveData || hints.reducedData || (hints.deviceMemory !== undefined && hints.deviceMemory <= 4) || (hints.hardwareConcurrency !== undefined && hints.hardwareConcurrency <= 4)) return "lite";
  return hints.reduce || hints.reducedMotion ? "reduced" : "full";
}
let preference: MotionPreference = "reduced";
const listeners = new Set<() => void>();
let started = false;
const temporary = new Map<string, boolean>();
function stored(key: string) { try { return localStorage.getItem(key) === "on"; } catch { return temporary.get(key) ?? false; } }
function refresh() {
  const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  preference = resolveMotion({ saveData: device.connection?.saveData, deviceMemory: device.deviceMemory, hardwareConcurrency: device.hardwareConcurrency, reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches, reducedData: matchMedia("(prefers-reduced-data: reduce)").matches, lite: stored("annotated-lite"), reduce: stored("annotated-reduce-motion") });
  document.documentElement.dataset.motion = preference;
  document.documentElement.dataset.lite = String(preference === "lite");
  listeners.forEach(listener => listener());
}
function start() {
  if (started) return;
  started = true;
  refresh();
  ["(prefers-reduced-motion: reduce)", "(prefers-reduced-data: reduce)"].forEach(query => matchMedia(query).addEventListener("change", refresh));
  window.addEventListener("storage", refresh);
  (navigator as Navigator & { connection?: EventTarget }).connection?.addEventListener("change", refresh);
}
function subscribe(listener: () => void) { start(); listeners.add(listener); return () => { listeners.delete(listener); }; }
export function useMotionPreference() { return useSyncExternalStore(subscribe, () => preference, () => "reduced" as MotionPreference); }
export function motionPreference() { start(); return preference; }
export function toggleMotionSetting(setting: "lite" | "reduce-motion") {
  const key = `annotated-${setting}`;
  const next = !stored(key);
  try { localStorage.setItem(key, next ? "on" : "off"); } catch { temporary.set(key, next); }
  refresh();
  return setting === "lite" ? preference === "lite" : preference !== "full";
}
export function MotionSetup() { useEffect(start, []); return null; }
