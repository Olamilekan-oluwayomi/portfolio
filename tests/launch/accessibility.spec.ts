import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = ["/", "/brief", "/work", "/about", "/experience", "/contact", "/work/rentit", "/work/marginalia", "/work/space-tourism", "/work/foreign-exchange-checker"];
for (const route of routes) {
  for (const mode of ["paper", "night", "inspect"] as const) {
    test(`${route} ${mode}: WCAG automated scan`, async ({ page }, testInfo) => {
      await page.goto(route);
      await page.waitForFunction(() => Boolean(document.documentElement.dataset.motion));
      if (mode === "night") await page.getByRole("button", { name: "Dark theme", exact: true }).click();
      if (mode === "inspect") {
        await page.getByRole("button", { name: /^Inspect/ }).click();
        await page.getByRole("button", { name: "Close Inspect", exact: true }).waitFor();
      }
      await page.evaluate(() => document.fonts.ready);
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      await testInfo.attach("axe-results", { body: JSON.stringify(result), contentType: "application/json" });
      expect(result.violations).toEqual([]);
    });
  }
  test(`${route}: 320px reflow and static reading path`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
test("Contact: clipboard contains the complete email", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  const button = page.getByRole("button", { name: /^Copy .*@/ });
  const label = await button.getAttribute("aria-label");
  await button.click();
  await expect(page.getByRole("status").filter({ hasText: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(label?.slice(5));
});
