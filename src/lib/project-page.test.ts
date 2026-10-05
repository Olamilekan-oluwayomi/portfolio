import { describe, expect, it } from "vitest";
import { loadContent } from "./content";
import { projectPageContent } from "./project-page";

const drafts = loadContent();
describe("project-page publication boundary", () => {
  it("does not expose the real RentIt draft on the production route", () => {
    expect(projectPageContent(drafts, "rentit", [], "R0")).toBeUndefined();
  });
  it("does not treat adding a slug as verification", () => {
    expect(projectPageContent(drafts, "rentit", ["rentit"], "R0")).toBeUndefined();
  });
  it("provides an explicitly marked review preview with the real missing requirements", () => {
    const page = projectPageContent(drafts, "rentit", [], "R0", true);
    expect(page?.draft).toBe(true);
    expect(page?.issues).toContain("rentit: project is unverified");
    expect(page?.issues).toContain("rentit: fewer than three owner-verified decisions");
    expect(page?.decisions).toHaveLength(3);
  });
  it("does not fabricate content for an unknown project, even in preview", () => {
    expect(projectPageContent(drafts, "missing-project", [], "R0", true)).toBeUndefined();
  });
});
