import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
const socket = createServer();
await new Promise(resolve => socket.listen(0, "127.0.0.1", resolve));
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const base = `http://127.0.0.1:${port}`;
const routes = ["/", "/brief", "/work", "/about", "/experience", "/contact", "/work/rentit", "/work/marginalia", "/work/space-tourism", "/work/foreign-exchange-checker"];
mkdirSync("artifacts/launch/lighthouse", { recursive: true });
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], { stdio: "ignore", windowsHide: true });
let chrome;
try {
  let ready = false;
  for (let i=0; i<120; i++) { try { ready = (await fetch(base)).ok; } catch {} if (ready) break; await new Promise(resolve=>setTimeout(resolve,1000)); }
  if (!ready) throw new Error("Production audit server did not start");
  chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"] });
  const checks = [];
  for (const route of routes) {
    const runs = [];
    for (let run=1; run<=3; run++) {
      const result = await lighthouse(base + route, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"], formFactor: "mobile", throttlingMethod: "simulate", throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 }, screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false } });
      if (!result || result.lhr.runtimeError) throw new Error(JSON.stringify(result?.lhr.runtimeError));
      writeFileSync(`artifacts/launch/lighthouse/${route.replaceAll("/", "_") || "home"}-${run}.json`, JSON.stringify(result.lhr));
      const a=result.lhr.audits;
      runs.push({ lcp: a["largest-contentful-paint"].numericValue, cls: a["cumulative-layout-shift"].numericValue, tbt: a["total-blocking-time"].numericValue, transferBytes: a["resource-summary"].details.items.find(item=>item.resourceType === "total").transferSize });
      console.log(route, "run", run, JSON.stringify(runs.at(-1)));
    }
    const median = key => runs.map(item=>item[key]).sort((a,b)=>a-b)[1];
    const metrics = Object.fromEntries(["lcp", "cls", "tbt", "transferBytes"].map(key=>[key,median(key)]));
    const passed = metrics.lcp <= 2000 && metrics.cls <= 0.05 && metrics.tbt <= 150 && (route !== "/" || metrics.transferBytes <= 512000);
    checks.push({ route, runs, median: metrics, passed });
    writeFileSync("docs/launch-performance-results.json", JSON.stringify({ source: "PRD.md section 29; scripts/audit-performance.mjs", profile: "390x844 mobile, simulated 150ms RTT, 1638.4Kbps, 4x CPU; median of three runs", checkedBase: base, thresholds: { lcp: 2000, cls: 0.05, tbt: 150, homeTransferBytes: 512000 }, checks, status: checks.length < routes.length ? "running" : checks.every(item=>item.passed) ? "passed" : "failed", fieldMetrics: "unverified" }, null, 2)+"\n");
  }
  if (checks.some(item=>!item.passed)) process.exitCode=1;
} finally { if (chrome) await chrome.kill(); server.kill(); }
