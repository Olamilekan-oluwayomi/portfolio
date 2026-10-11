// Keep the native modal open until its exit finishes, then hand off navigation.
export function finishMenuExit(surface: HTMLElement | null, animate: boolean, finish: () => void): Animation | undefined {
  if (!surface || !animate || typeof surface.animate !== "function") { finish(); return; }
  const styles = getComputedStyle(surface);
  const animation = surface.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: parseFloat(styles.getPropertyValue("--dur-base")),
    easing: styles.getPropertyValue("--ease-in-out").trim(),
  });
  // Cancelling on unmount or another modal handoff must not trigger stale navigation.
  void animation.finished.then(finish, () => {});
  return animation;
}
