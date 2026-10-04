import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { decisionSchema, projectSchema, type Collection } from "./schemas";

export function loadContent(root = join(process.cwd(), "src/content")): Collection {
  const bodies: NonNullable<Collection["bodies"]> = [];
  function load<T>(folder: string, schema: { parse: (value: unknown) => T }): T[] {
    return readdirSync(join(root, folder)).filter(file => file.endsWith(".mdx")).sort().map(file => {
      const path = join(root, folder, file);
      try {
        const parsed = matter(readFileSync(path, "utf8"));
        const data = schema.parse(parsed.data);
        const projectSlug = folder === "projects" ? parsed.data.slug : parsed.data.projectSlug;
        bodies.push({ projectSlug, body: parsed.content });
        return data;
      } catch (error) { throw new Error(`${path}: ${error instanceof Error ? error.message : String(error)}`); }
    });
  }
  const projects = load("projects", projectSchema);
  const decisions = load("decisions", decisionSchema);
  for (const [name, ids] of [["project", projects.map(item => item.slug)], ["decision", decisions.map(item => item.id)]] as const) {
    if (new Set(ids).size !== ids.length) throw new Error(`Duplicate ${name} identifier`);
  }
  decisions.forEach(record => {
    if (record.projectSlug !== "site" && !projects.some(project => project.slug === record.projectSlug)) throw new Error(`${record.id}: unknown project ${record.projectSlug}`);
  });
  return { projects: projects.sort((a, b) => a.order - b.order), decisions, bodies };
}
