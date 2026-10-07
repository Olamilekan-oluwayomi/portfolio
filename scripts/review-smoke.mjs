import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";

// HTTP and initial-HTML checks only. Browser interactions are not inferred.
const base = process.argv[2];
assert(base, "Supply the local server URL");
const routes = ["/", "/brief", "/work", "/about", "/experience", "/contact", "/work/rentit", "/work/marginalia", "/work/space-tourism", "/work/foreign-exchange-checker"];
const pages = new Map();
const checks = [];
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, route);
  assert(response.headers.get("content-security-policy")?.includes("frame-src https://space-tourismx.vercel.app"), route + ": restricted frame policy");
  const html = await response.text();
  pages.set(route, html);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, route + ": one H1");
  checks.push({ route, status: response.status, oneH1: true });
}
for (const [route, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const target = new URL(href, new URL(route, base));
    const destination = pages.get(target.pathname);
    assert(destination, route + ": internal route exists: " + href);
    if (target.hash) assert(destination.includes('id="' + decodeURIComponent(target.hash.slice(1)) + '"'), route + ": anchor exists: " + href);
  }
}
const home = pages.get("/");
for (const slug of ["rentit", "marginalia", "space-tourism", "foreign-exchange-checker"]) assert(home.includes('href="#project-' + slug + '"'), "Index includes " + slug);
assert(home.includes('aria-label="Read Marginalia case study"'));
assert(/<a\b[^>]*href="\/work\/rentit"/.test(home), "RentIt case-study link exists");
assert(home.includes('aria-label="Read RentIt case study"'), "RentIt cover opens its case study");
assert(home.includes("rentit-browse.png"), "RentIt preview uses the actual browse capture");
assert(!home.includes("&amp;w=1080"), "Preview widths match optimizer configuration");
assert(home.includes("srcSet=") || home.includes("srcset="), "Optimized preview source sets");
for (const route of routes.filter(route => route.startsWith("/work/"))) {
  const html = pages.get(route);
  assert(!html.includes("Capture 1"), "Descriptive figure headings: " + route);
  assert(!html.includes("to be confirmed in owner review"), "No pending caption: " + route);
  assert(html.includes("<figure"), "Static figures available: " + route);
}
assert(pages.get("/work/space-tourism").includes("Explore viewport widths"));
assert(pages.get("/work/foreign-exchange-checker").includes("Explore the interface states"));
assert(pages.get("/work/marginalia").includes("Read with sources visible"));
const rental = pages.get("/work/rentit");
assert(!rental.includes("Review preview. Not published."), "RentIt uses its published case-study presentation");
assert(rental.includes("do not show a renter submitting a request"), "Missing request capture remains explicit");
const missing = await fetch(new URL("/missing-review-route", base));
assert.equal(missing.status, 404);
const image = [...home.matchAll(/<img\b[^>]*src="([^"]+)"/g)].find(match => match[1].startsWith("/_next/image"));
assert(image, "Optimized preview exists");
const imageResponse = await fetch(new URL(image[1].replaceAll("&amp;", "&"), base), { headers: { Accept: "image/webp" } });
assert.equal(imageResponse.status, 200, "Optimized image endpoint");
assert(imageResponse.headers.get("content-type")?.startsWith("image/"));
const imageBytes = (await imageResponse.arrayBuffer()).byteLength;
const candidates = new Set([...home.matchAll(/src[Ss]et="([^"]+)"/g)].flatMap(match => match[1].replaceAll("&amp;", "&").split(", ").map(item => item.split(" ")[0])));
for (const candidate of candidates) {
  const response = await fetch(new URL(candidate, base), { headers: { Accept: "image/webp" } });
  assert.equal(response.status, 200, "Preview source-set candidate: " + candidate);
  await response.arrayBuffer();
}
const report = { checks, internalLinksAndAnchors: "passed", restrictedFrameHeaders: "passed", rentitCaseStudy: "published route and preview links passed", previewSourceSetCandidates: { count: candidates.size, status: "all 200" }, missingRoute: missing.status, optimizedPreview: { status: imageResponse.status, bytes: imageBytes }, browserInteraction: "unverified", screenReader: "unverified", viewports: "unverified" };
writeFileSync("docs/review-smoke-results.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
