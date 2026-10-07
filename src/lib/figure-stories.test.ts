import { describe, expect, it } from "vitest";
import { loadContent } from "./content";
const { projects } = loadContent();
function image(slug: string, suffix: string) {
  return projects.find(project => project.slug === slug)?.media.find(media => media.src.endsWith(suffix));
}
describe("figure descriptions match the inspected capture", () => {
  it("distinguishes settings from a document upload captured in the same minute", () => {
    expect(image("marginalia", "134203.png")?.alt).toContain("document upload");
    expect(image("marginalia", "134215.png")?.alt).toContain("settings");
  });
  it("does not label every destination and crew capture as the Moon", () => {
    expect(image("space-tourism", "134326.png")?.alt).toContain("Moon");
    expect(image("space-tourism", "134336.png")?.alt).toContain("Mars");
    expect(image("space-tourism", "134347.png")?.alt).toContain("Douglas Hurley");
  });
  it("distinguishes comparison, empty log and favorites captures", () => {
    expect(image("foreign-exchange-checker", "134601.png")?.alt).toContain("comparison");
    expect(image("foreign-exchange-checker", "134610.png")?.alt).toContain("No conversions logged");
    expect(image("foreign-exchange-checker", "134617.png")?.alt).toContain("favorites");
  });
});
