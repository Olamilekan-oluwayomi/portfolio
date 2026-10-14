import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, sep } from "node:path";

// HTTP and initial-HTML checks only. Browser interactions are not inferred.
const base = process.argv[2];
// Supply the canonical host as an optional third argument for production SEO checks.
const canonical = process.argv[3];
assert(base, "Supply the local server URL");
const routes = ["/", "/brief", "/work", "/about", "/experience", "/contact", "/work/rentit", "/work/marginalia", "/work/space-tourism", "/work/foreign-exchange-checker"];
const pages = new Map();
const documents = new Map();
const checks = [];
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, route);
  assert(response.headers.get("content-security-policy")?.includes("frame-src https://space-tourismx.vercel.app"), route + ": restricted frame policy");
  const html = await response.text();
  pages.set(route, html);
  assert(/<link\b[^>]*rel="icon"[^>]*href="\/icon\.svg/.test(html), route + ": favicon is installed");
  if (route === "/" || route === "/about" || route.startsWith("/work/")) {
    const blocks = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    assert(blocks.some(block => block["@context"] === "https://schema.org" && Array.isArray(block["@graph"])), route + ": parseable structured data");
  }
  if (canonical) {
    const link = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    assert(link, route + ": canonical link exists");
    assert.equal(link[1].replace(/\/$/, ""), new URL(route, canonical).href.replace(/\/$/, ""), route + ": canonical host and path");
    assert(!html.includes('name="robots" content="noindex'), route + ": public route is indexable");
    if (route.startsWith("/work/")) {
      const image = html.match(/<meta\b[^>]*property="og:image"[^>]*content="([^"]+)"/);
      assert(image, route + ": social image exists");
      assert.equal(new URL(image[1]).origin, new URL(canonical).origin, route + ": social image uses canonical host");
    }
  }
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, route + ": one H1");
  checks.push({ route, status: response.status, oneH1: true });
}
for (const [route, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const target = new URL(href, new URL(route, base));
    if (target.pathname.endsWith(".pdf")) {
      assert(!/\btarget="_blank"/.test(match[0]), route + ": CV opens in the same tab");
      if (!documents.has(target.pathname)) {
        const response = await fetch(target);
        assert.equal(response.status, 200, route + ": PDF is available");
        assert(response.headers.get("content-type")?.startsWith("application/pdf"), "PDF content type");
        const bytes = Buffer.from(await response.arrayBuffer());
        assert.equal(bytes.subarray(0, 5).toString(), "%PDF-", "PDF signature");
        const publicRoot = resolve("public");
        const file = resolve(publicRoot, target.pathname.slice(1));
        assert(file.startsWith(publicRoot + sep), "PDF stays inside public assets");
        const hash = data => createHash("sha256").update(data).digest("hex");
        assert.equal(hash(bytes), hash(readFileSync(file)), "Served PDF matches the public file exactly");
        documents.set(target.pathname, { bytes: bytes.length, sha256: hash(bytes) });
      }
      continue;
    }
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
const contact = pages.get("/contact");
const experience = pages.get("/experience");
assert.equal([...experience.matchAll(/class="log-entry"/g)].length, 5, "Experience retains five public entries");
assert.equal([...experience.matchAll(/<details>/g)].length, 3, "Only the three entries with approved summaries expand");
assert.equal([...experience.matchAll(/class="log-expand">View details/g)].length, 3, "Expandable entries have explicit action labels");
assert(experience.includes('class="log-org">PitchMatter</span>'), "Experience retains the approved employer");
const email = contact.match(/href="mailto:([^"]+)"/)?.[1];
assert(email, "Contact provides a direct email alternative");
const copy = contact.match(/<button\b[^>]*class="contact-address"[^>]*>([\s\S]*?)<\/button>/);
assert(copy, "Contact has an email copy button");
assert.equal(copy[1].replace(/<[^>]*>/g, ""), email, "Wrapped copy-button text contains the complete email only");
assert(copy[0].includes('aria-label="Copy ' + email + '"'), "Copy button has an explicit action and address name");
const about = pages.get("/about");
const total = Number(about.match(/<p class="record-total"><span>(\d+)<\/span>/)?.[1]);
assert(Number.isFinite(total), "About has a recorded-decision total");
const themes = [...about.matchAll(/<div class="theme-count-label"><span>[^<]+<\/span><span>(\d+)/g)].map(match => Number(match[1]));
assert.equal(themes.reduce((sum, count) => sum + count, 0), total, "Theme counts sum to the displayed total");
const shares = [...about.matchAll(/<span class="theme-track" aria-hidden="true"><span style="width:([\d.]+)%"/g)].map(match => Number(match[1]));
assert.equal(shares.length, themes.length, "Each theme has one proportional bar");
assert(shares.every(share => share >= 0 && share <= 100), "Theme shares stay within their track");
assert(Math.abs(shares.reduce((sum, share) => sum + share, 0) - (total ? 100 : 0)) < 0.001, "Theme shares cover the recorded total");
const rental = pages.get("/work/rentit");
assert(!rental.includes("Review preview. Not published."), "RentIt uses its published case-study presentation");
assert(rental.includes("do not show a renter submitting a request"), "Missing request capture remains explicit");
const missing = await fetch(new URL("/missing-review-route", base));
assert.equal(missing.status, 404);
const iconResponse = await fetch(new URL("/icon.svg", base));
assert.equal(iconResponse.status, 200, "Public favicon available");
assert((await iconResponse.text()).includes("<svg"), "Favicon SVG signature");
const socialResponse = await fetch(new URL("/social-card.png", base));
assert.equal(socialResponse.status, 200, "Generic social image available");
const socialBytes = Buffer.from(await socialResponse.arrayBuffer());
assert.equal(socialBytes.subarray(1, 4).toString(), "PNG", "Social image PNG signature");
assert.equal(socialBytes.readUInt32BE(16), 1200, "Social image width");
assert.equal(socialBytes.readUInt32BE(20), 630, "Social image height");
checks.push({ route: "/icon.svg", status: iconResponse.status }, { route: "/social-card.png", status: socialResponse.status, width: 1200, height: 630 });
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
if (canonical) {
  const sitemap = await fetch(new URL("/sitemap.xml", base));
  assert.equal(sitemap.status, 200, "Sitemap available");
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]).sort();
  assert.deepEqual(urls, routes.map(route => new URL(route, canonical).href).sort(), "Sitemap contains exactly the public canonical routes");
  const robots = await fetch(new URL("/robots.txt", base));
  assert.equal(robots.status, 200, "Robots available");
  const policy = await robots.text();
  assert(policy.includes("Allow: /"), "Production allows crawling");
  assert(policy.includes("Sitemap: " + new URL("/sitemap.xml", canonical).href), "Robots references canonical sitemap");
}
const report = { checkedBase: base, checks, internalLinksAndAnchors: "passed", restrictedFrameHeaders: "passed", rentitCaseStudy: "published route and preview links passed", experienceNativeDisclosures: "passed", aboutThemeCountConsistency: "passed", contactEmailMarkup: "passed", previewSourceSetCandidates: { count: candidates.size, status: "all 200" }, publicDocuments: Object.fromEntries(documents), ...(canonical ? { canonicalHost: canonical, canonicalRoutesAndSocialImages: "passed", sitemapAndRobots: "passed" } : {}), missingRoute: missing.status, optimizedPreview: { status: imageResponse.status, bytes: imageBytes }, browserInteraction: "unverified", screenReader: "unverified", viewports: "unverified" };
writeFileSync("docs/review-smoke-results.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
