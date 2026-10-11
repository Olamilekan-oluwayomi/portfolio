import { afterEach, describe, expect, it, vi } from "vitest";
import { finishMenuExit } from "./menu-transition";

afterEach(() => vi.unstubAllGlobals());

function surfaceWith(finished: Promise<Animation>) {
  const animation = { finished } as Animation;
  const animate = vi.fn(() => animation);
  vi.stubGlobal("getComputedStyle", () => ({ getPropertyValue: (property: string) => property === "--dur-base" ? "240ms" : "ease-out" }));
  return { surface: { animate } as unknown as HTMLElement, animate };
}

describe("menu exit handoff", () => {
  it("keeps navigation pending until the exit completes", async () => {
    let complete!: (animation: Animation) => void;
    const finished = new Promise<Animation>(resolve => { complete = resolve; });
    const { surface } = surfaceWith(finished);
    const navigate = vi.fn();
    const animation = finishMenuExit(surface, true, navigate);
    expect(navigate).not.toHaveBeenCalled();
    complete(animation!);
    await finished;
    expect(navigate).toHaveBeenCalledOnce();
  });

  it("does not navigate after an interrupted exit", async () => {
    let cancel!: (reason: Error) => void;
    const finished = new Promise<Animation>((_, reject) => { cancel = reject; });
    const { surface } = surfaceWith(finished);
    const navigate = vi.fn();
    finishMenuExit(surface, true, navigate);
    cancel(new Error("Animation cancelled"));
    await finished.catch(() => {});
    expect(navigate).not.toHaveBeenCalled();
  });

  it("closes immediately for reduced-motion and lite preferences", () => {
    const { surface, animate } = surfaceWith(new Promise(() => {}));
    const close = vi.fn();
    expect(finishMenuExit(surface, false, close)).toBeUndefined();
    expect(close).toHaveBeenCalledOnce();
    expect(animate).not.toHaveBeenCalled();
  });

  it("keeps navigation available without the animation API", () => {
    const close = vi.fn();
    finishMenuExit({} as HTMLElement, true, close);
    expect(close).toHaveBeenCalledOnce();
  });
});
