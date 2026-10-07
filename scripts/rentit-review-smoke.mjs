import { readFileSync, writeFileSync } from "node:fs";
const base = process.argv[2] ?? "http://127.0.0.1:3005";
const results = [];
async function check(path, test) {
  const response = await fetch(`${base}${path}`);
  const body = await response.text();
  if (!response.ok || !test(body)) throw new Error(`Failed review check: ${path} (${response.status})`);
  results.push({ path, status: response.status });
  return body;
}
const body = await check("/work/rentit", html => !html.includes("Review preview. Not published.") && html.includes("Follow the booking walkthrough") && html.includes("do not show a renter submitting a request"));
if ([...body.matchAll(/<h1\b/g)].length !== 1) throw new Error("RentIt must have one H1");
for (const id of ["premise", "experience", "decisions", "stack", "problems", "reflection", "rentit-step-browse", "rentit-step-listing", "rentit-step-request", "rentit-step-conversation", "rentit-step-management"]) {
  if (!body.includes(`id="${id}"`)) throw new Error(`Missing static anchor: ${id}`);
}
for (const id of ["browse", "listing", "profile", "owner-bookings", "conversation", "management", "new-listing", "dashboard"]) {
  if (!body.includes(`/figures/rentit/rentit-${id}.png`) && !body.includes(encodeURIComponent(`/figures/rentit/rentit-${id}.png`))) throw new Error(`Missing static figure: ${id}`);
}
for (const record of JSON.parse(readFileSync("docs/figure-crops.json", "utf8")).records) {
  const path = record.target.replace("public", "");
  const response = await fetch(`${base}/_next/image?url=${encodeURIComponent(path)}&w=1440&q=75`, { headers: { accept: "image/avif,image/webp" } });
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`Image optimizer failed: ${path}`);
  const bytes = (await response.arrayBuffer()).byteLength;
  if (bytes > 120 * 1024) throw new Error(`1440px figure exceeds budget: ${path} (${bytes})`);
  results.push({ path, optimizerStatus: response.status, bytes });
}
const report = { results, staticReadingPath: "one H1, five journey anchors, six chapter anchors, eight supplied figures and explicit capture boundaries present in returned HTML", limits: "HTTP and image checks only. Browser interaction, viewport fit, screen readers, animation frame time and real devices remain unverified." };
writeFileSync("docs/rentit-smoke-results.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(`Review HTML and ${results.length - 1} optimized cropped figures passed.`);
