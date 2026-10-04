import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Installed direct-package footprint, excluding nested dependencies.
// Client transfer is measured separately by scripts/check-budgets.mjs.
function size(path) {
  return readdirSync(path).filter(name => name !== "node_modules").reduce((sum, name) => {
    const full = join(path, name);
    return sum + (statSync(full).isDirectory() ? size(full) : statSync(full).size);
  }, 0);
}
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const rows = ["# Dependency footprint", "", "Measured from installed package files by `scripts/dependency-sizes.mjs`.", "These are disk bytes excluding nested dependencies, not browser transfer.", "First-load gzip transfer is checked separately by `scripts/check-budgets.mjs`.", "Versions are pinned in `package.json` and resolved in `package-lock.json`.", "", "| Package | Version | Direct package bytes | Scope |", "| --- | --- | ---: | --- |"];
for (const group of ["dependencies", "devDependencies"]) {
  for (const [name, version] of Object.entries(pkg[group] ?? {})) rows.push(`| ${name} | ${version} | ${size(join("node_modules", name))} | ${group} |`);
}
writeFileSync("docs/phase-3-dependency-sizes.md", `${rows.join("\n")}\n`);
