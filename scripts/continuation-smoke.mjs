import { writeFileSync } from "node:fs";

const base = process.argv[2] ?? "http://127.0.0.1:3005";
const routes = ["/", "/brief", "/work", "/about", "/experience", "/contact", "/work/rentit", "/work/marginalia", "/work/space-tourism", "/work/foreign-exchange-checker"];
const results = [];
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  const html = await response.text();
  if (!response.ok) throw new Error(`${route}: HTTP ${response.status}`);
  if ([...html.matchAll(/<h1\b/g)].length !== 1) throw new Error(`${route}: expected one H1`);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  const fragments = [...html.matchAll(/\bhref="#([^"]+)"/g)].map(match => match[1]);
  for (const fragment of fragments) {
    if (!ids.has(decodeURIComponent(fragment))) throw new Error(`${route}: unresolved #${fragment}`);
  }
  if (route.startsWith("/work/")) {
    if (!html.includes("Jump to a figure")) throw new Error(`${route}: missing static figure navigation`);
    for (const chapter of ["premise", "experience", "decisions", "stack", "problems", "reflection"]) {
      if (!ids.has(chapter)) throw new Error(`${route}: missing ${chapter}`);
    }
  }
  results.push({ route, status: response.status, resolvedFragments: fragments.length });
}
writeFileSync("docs/continuation-smoke-results.json", JSON.stringify({ results, limits: "HTTP and server-rendered HTML only. Browser geometry, live interactions, screen readers and physical devices remain unverified." }, null, 2) + "\n");
console.log(`Passed ${results.length} routes, one H1 per route and all local fragment targets.`);
