import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import { siteIdentity } from "../src/content/identity";
const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const font = readFileSync("design/fonts/instrument-serif-regular.woff2").toString("base64");
async function main() {
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<style>@font-face{font-family:Title;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;background:#faf9f5;color:#21211f;padding:68px;font-family:Title,serif}.label{font:24px monospace;color:#244bff}h1{margin:68px 0 38px;max-width:1000px;font-weight:400;font-size:100px;line-height:1.06}.role{display:inline-block;padding:14px 24px;background:#d5ff00;border:2px solid #21211f;font:28px monospace}.url{position:absolute;bottom:60px;right:68px;font:24px monospace}</style><div class="label">ANNOTATED</div><h1>${escape(siteIdentity.name)}</h1><div class="role">${escape(siteIdentity.role)}</div><div class="url">${escape(new URL(siteIdentity.domain).hostname)}</div>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/social-card.png" });
} finally { await browser.close(); }
}
void main();
