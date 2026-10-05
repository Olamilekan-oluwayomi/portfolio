import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

// PRD.md section 29. Measure distinct first-load scripts from generated HTML.
const root = ".next";
const pages = [];
function walk(path) {
  for (const file of readdirSync(path)) {
    const full = join(path, file);
    if (statSync(full).isDirectory()) walk(full);
    else if (file.endsWith(".html")) pages.push(full);
  }
}
// Next 16.3 uses route-cache/APP_PAGE/<source hash>/$/<route>.html when
// an adapter is enabled. See next/dist/server/lib/route-cache-key.js.
for (const directory of ["server/app", "server/route-cache/APP_PAGE"]) {
  const path = join(root, directory);
  if (existsSync(path)) walk(path);
}
let failed = false;
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  // Next emits its legacy compatibility chunk with `noModule`. Current Chrome,
  // Safari and Firefox support modules, so that chunk is not transferred to them.
  const scripts = new Set([...html.matchAll(/<script\b[^>]*src="([^"?]+)(?:\?[^\"]*)?"[^>]*>/g)]
    .filter(match => !/\bnomodule\b/iu.test(match[0]))
    .map(match => match[1]).filter(src => src.startsWith("/_next/")));
  const chunks = [...scripts].map(src => ({ src, size: gzipSync(readFileSync(join(root, src.slice("/_next/".length)))).length }));
  const bytes = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
  const home = page === join(root, "server/app/index.html") || page.endsWith(join("$", "index.html"));
  const limit = home ? 140 * 1024 : 170 * 1024;
  console.log(`${page}: ${bytes} gzip bytes of first-load JavaScript (limit ${limit})`);
  if (bytes > limit) for (const chunk of chunks) console.log(`  ${chunk.size} ${chunk.src}`);
  if (bytes > limit) failed = true;
}
const fonts = readdirSync("design/fonts").filter(file => file.endsWith(".woff2")).reduce((sum, file) => sum + statSync(join("design/fonts", file)).size, 0);
console.log(`Fonts: ${fonts} bytes (limit ${150 * 1024})`);
if (!pages.length) {
  console.error("No generated HTML found; JavaScript budgets cannot be checked.");
  for (const path of [".next/server/app", ".next/server/route-cache"]) {
    console.error(`${path}: ${existsSync(path) ? readdirSync(path).join(", ") : "missing"}`);
  }
}
if (!pages.length || fonts > 150 * 1024 || failed) process.exit(1);
