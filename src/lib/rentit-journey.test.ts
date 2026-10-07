import { describe, expect, it } from "vitest";
import { journeyIndex, rentitJourney } from "@/content/rentit-journey";
import { loadContent } from "./content";
describe("RentIt walkthrough navigation and evidence", () => {
  it("supports arrow navigation and endpoint keys", () => {
    expect(journeyIndex(0, "ArrowLeft")).toBe(4);
    expect(journeyIndex(4, "ArrowDown")).toBe(0);
    expect(journeyIndex(2, "Home")).toBe(0);
    expect(journeyIndex(2, "End")).toBe(4);
    expect(journeyIndex(2, "Tab")).toBeUndefined();
  });
  it("keeps every available stage tied to a real screenshot and marks the request gap", () => {
    const project = loadContent().projects.find(item => item.slug === "rentit")!;
    for (const step of rentitJourney) {
      for (const id of step.mediaIds) expect(project.media.some(media => media.id === id && media.kind === "screenshot")).toBe(true);
    }
    expect(project.media.some(media => media.id === "request")).toBe(false);
    expect(rentitJourney[2].limit).toContain("do not show a renter submitting");
  });
});
