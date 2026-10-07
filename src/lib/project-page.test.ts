import { describe, expect, it } from "vitest";
import { loadContent } from "./content";
import { projectPageContent } from "./project-page";

const drafts = loadContent();
describe("project-page publication boundary", () => {
  it("does not expose the real RentIt draft on the production route", () => {
    expect(projectPageContent(drafts, "rentit", [], "R0")).toBeUndefined();
  });
  it("blocks RentIt illustrations from satisfying the evidence figure gate", () => {
    const illustrations = { ...drafts, projects: drafts.projects.map(project => project.slug === "rentit" ? { ...project, media: project.media.map(media => ({ ...media, kind: "illustration" as const })) } : project) };
    const page = projectPageContent(illustrations, "rentit", ["rentit"], "R1");
    expect(page).toBeUndefined();
  });
  it("keeps preview mode honest for the unpublished project route", () => {
    const page = projectPageContent(drafts, "rentit", [], "R1", true);
    expect(page).toBeDefined();
    expect(page?.draft).toBe(true);
    expect(page?.project.slug).toBe("rentit");
  });
  it("publishes the owner-approved case study without inventing a request capture", () => {
    const page = projectPageContent(drafts, "rentit", ["rentit"], "R1");
    expect(page?.draft).toBe(false);
    expect(page?.project.media.some(media => media.id === "request")).toBe(false);
  });
  it("does not fabricate content for an unknown project, even in preview", () => {
    expect(projectPageContent(drafts, "missing-project", [], "R0", true)).toBeUndefined();
  });
});
