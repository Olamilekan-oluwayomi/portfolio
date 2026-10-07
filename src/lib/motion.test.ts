import { describe, expect, it } from "vitest";
import { resolveMotion } from "./motion";
describe("motion preferences", () => {
  it("uses full motion when signals are absent", () => expect(resolveMotion({})).toBe("full"));
  it("never overrides system reduction with a false visitor setting", () => expect(resolveMotion({ reducedMotion: true, reduce: false })).toBe("reduced"));
  it("uses lite for constrained devices or data", () => {
    for (const hints of [{ saveData: true }, { deviceMemory: 4 }, { hardwareConcurrency: 4 }, { lite: true }, { reducedData: true }]) expect(resolveMotion(hints)).toBe("lite");
  });
});
