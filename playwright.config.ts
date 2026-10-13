import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/launch", fullyParallel: true, workers: 2,
  timeout: 60000, retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["json", { outputFile: "artifacts/launch/playwright-results.json" }]],
  use: { baseURL: "http://127.0.0.1:3001", trace: "retain-on-failure", reducedMotion: "reduce" },
  projects: [{ name: "chromium", use: { browserName: "chromium", viewport: { width: 1440, height: 900 } } }],
  webServer: { command: "npm run start -- --hostname 127.0.0.1 --port 3001", url: "http://127.0.0.1:3001", reuseExistingServer: false, timeout: 120000 },
});
