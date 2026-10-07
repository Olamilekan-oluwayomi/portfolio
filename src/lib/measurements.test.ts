import { describe, expect, it } from "vitest";
import { summarizeResources } from "./measurements";
const entry = (name: string, initiatorType: string, transferSize: number) => ({ name, initiatorType, transferSize } as PerformanceResourceTiming);
describe("resource measurements", () => {
  it("does not fabricate bytes before resources are observed", () => {
    expect(summarizeResources([])).toEqual({ javascript: null, fonts: null, requests: 0 });
  });
  it("reports observed script and font transfer sizes separately", () => {
    expect(summarizeResources([entry("/app.js", "script", 120), entry("/font.woff2", "css", 80), entry("/figure.webp", "img", 50)]))
      .toEqual({ javascript: 120, fonts: 80, requests: 3 });
  });
  it("does not treat unavailable or cached timing as measured network bytes", () => {
    expect(summarizeResources([entry("/cached.js", "script", 0), entry("/loaded.js", "script", 120)]).javascript).toBeNull();
  });
});
