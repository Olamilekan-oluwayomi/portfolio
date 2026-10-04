// Phase 3 stub only. No requests until a provider is wired and privacy checked.
// Event names and privacy gating: PRD.md section 31.
export type CoreEvent = "page_view" | "project_open" | "external_click" | "contact_action" | "brief_view";
export type PrivacySignals = { doNotTrack?: string | null; globalPrivacyControl?: boolean };

export function permitsAnalytics(signals: PrivacySignals): boolean {
  return signals.doNotTrack !== "1" && signals.globalPrivacyControl !== true;
}

export function track(_event: CoreEvent, signals: PrivacySignals): void {
  if (!permitsAnalytics(signals)) return;
  // Intentionally no provider or network transport in the foundation.
  void _event;
}
