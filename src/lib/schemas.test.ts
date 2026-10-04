import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { copyIssues, decisionSchema, publicationIssues } from "./schemas";
import { loadContent } from "./content";
import { permitsAnalytics } from "./analytics";

// Synthetic validation fixture, never published or presented as project evidence.
const draft = { id: "fixture", projectSlug: "site", title: "Validate a fixture", context: "Test input.", options: ["Accept", "Reject"], choice: "Reject malformed input.", tradeoff: "Requires a validation step.", status: "open", theme: "data", evidence: [{ label: "Test fixture", ref: "src/lib/schemas.test.ts" }] };
describe("content integrity", () => {
  it("defaults verification to false", () => expect(decisionSchema.parse(draft).verified).toBe(false));
  it.each([{ evidence: [] }, { options: ["One"] }, { theme: "unknown" }, { context: "word ".repeat(121) }, { unexpected: "field" }])("rejects malformed decision %j", change => {
    expect(decisionSchema.safeParse({ ...draft, ...change }).success).toBe(false);
  });
  it("blocks an unverified site decision", () => {
    expect(publicationIssues({ projects: [], decisions: [decisionSchema.parse(draft)] }, [], "R0")).toContain("fixture: decision is unverified");
  });
  it("enforces portfolio totals from R2", () => expect(publicationIssues({ projects: [], decisions: [] }, [], "R2")).toHaveLength(2));
  it("rejects an absent published project", () => expect(publicationIssues({ projects: [], decisions: [] }, ["missing"], "R0")[0]).toContain("does not exist"));
  it("scans nested public copy", () => expect(copyIssues({ copy: ["[CONFIRM role]", `one${String.fromCodePoint(0x2014)}two`, "passionate developer"] })).toHaveLength(3));
  it("also scans published MDX bodies", () => expect(publicationIssues({ projects: [], decisions: [], bodies: [{ projectSlug: "site", body: "[CONFIRM text]" }] }, [], "R0")).toContain("site body: Unresolved confirmation marker"));
  it("fails the loader with a source path on malformed frontmatter", () => {
    const root = mkdtempSync(join(tmpdir(), "annotated-content-"));
    mkdirSync(join(root, "projects")); mkdirSync(join(root, "decisions"));
    writeFileSync(join(root, "decisions/broken.mdx"), "---\nid: broken\n---\n");
    expect(() => loadContent(root)).toThrow("broken.mdx");
  });
});
describe("analytics privacy", () => {
  it("respects DNT and GPC independently", () => {
    expect(permitsAnalytics({ doNotTrack: "1" })).toBe(false);
    expect(permitsAnalytics({ globalPrivacyControl: true })).toBe(false);
    expect(permitsAnalytics({ doNotTrack: "0", globalPrivacyControl: false })).toBe(true);
  });
});
