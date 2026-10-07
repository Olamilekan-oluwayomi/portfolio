import { z } from "zod";
import { hasExperience } from "./experience";

// Contracts and limits: PRD.md sections 16.2, 35 and 38.
const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const words = (min: number, max: number) => text.refine(value => {
  const count = value.split(/\s+/u).length;
  return count >= min && count <= max;
}, `Must contain ${min} to ${max} words`);
const url = z.url().refine(value => /^https?:\/\//u.test(value), "Must use HTTP or HTTPS");
const evidence = z.array(z.strictObject({ label: text, ref: text })).min(1);
export const themeSchema = z.enum(["state", "data", "motion", "a11y", "performance", "architecture", "ux", "security"]);
export const decisionSchema = z.strictObject({
  id: slug, projectSlug: slug, title: text, context: text,
  options: z.array(text).min(2).max(3), choice: text, tradeoff: text, result: text.optional(),
  status: z.enum(["kept", "reversed", "open"]), theme: themeSchema,
  anchor: z.strictObject({ figureId: text.optional(), chapterId: text.optional() }).optional(),
  evidence, verified: z.boolean().default(false),
}).refine(record => [record.title, record.context, ...record.options, record.choice, record.tradeoff, record.result ?? ""].join(" ").trim().split(/\s+/u).length <= 120,
  "Visible decision text must contain at most 120 words");

export const projectSchema = z.strictObject({
  slug, title: text, tagline: text.max(90), kind: z.enum(["product", "implementation", "concept", "experiment"]),
  year: z.number().int(), status: z.enum(["live", "testnet", "concept", "archived"]),
  role: text, order: z.number().int().nonnegative(), featured: z.boolean(),
  summary: text.min(120).max(155), premise: words(60, 90),
  stack: z.array(z.strictObject({ name: text, category: z.enum(["framework", "language", "styling", "data", "state", "validation", "tooling"]), why: text })).min(1),
  links: z.strictObject({ live: url.optional(), repo: url.optional(), caseStudy: z.string().startsWith("/work/") }),
  media: z.array(z.strictObject({ id: text, kind: z.enum(["screenshot", "video", "diagram", "illustration"]), src: text, poster: text.optional(), alt: text, caption: text, width: z.number().int().positive(), height: z.number().int().positive() })),
  experience: z.strictObject({ mode: z.enum(["walkthrough", "resizer", "console", "state-gallery", "manuscript"]), component: text }),
  problems: z.array(z.strictObject({ title: text, body: words(40, 80) })).min(2).max(3),
  reversals: words(60, 100), seo: z.strictObject({ title: text, description: text.min(120).max(155), ogImage: text.optional() }),
  evidence, verified: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;
export type Decision = z.infer<typeof decisionSchema>;
export type Release = "R0" | "R1" | "R2" | "R3";
export type Collection = { projects: Project[]; decisions: Decision[]; bodies?: { projectSlug: string; body: string }[] };

const banned = ["passionate developer", "turning ideas into reality", "crafting digital experiences", "results-driven", "innovative solutions", "self-taught", "aspiring", "learner", "seamless experiences", "cutting-edge", "transformative", "best-in-class", "AI-powered"];
export function copyIssues(value: unknown): string[] {
  const strings: string[] = [];
  function visit(item: unknown) {
    if (typeof item === "string") strings.push(item);
    else if (Array.isArray(item)) item.forEach(visit);
    else if (item && typeof item === "object") Object.values(item).forEach(visit);
  }
  visit(value);
  return strings.flatMap(line => {
    const findings: string[] = [];
    if (line.includes("[CONFIRM")) findings.push("Unresolved confirmation marker");
    if (line.includes(String.fromCodePoint(0x2014))) findings.push("Em dash in content");
    banned.forEach(phrase => { if (line.toLowerCase().includes(phrase.toLowerCase())) findings.push(`Banned phrase: ${phrase}`); });
    return findings;
  });
}

export function publicationIssues(collection: Collection, published: string[], release: Release): string[] {
  const issues: string[] = [];
  const records = collection.decisions.filter(record => record.projectSlug === "site" || published.includes(record.projectSlug));
  for (const id of published) {
    const project = collection.projects.find(item => item.slug === id);
    if (!project) { issues.push(`${id}: published project does not exist`); continue; }
    if (!project.verified) issues.push(`${id}: project is unverified`);
    if (!project.links.live) issues.push(`${id}: live URL is missing`);
    if (!project.links.repo) issues.push(`${id}: repository URL or written private-source deferral is required`);
    const figures = project.media.filter(media => media.kind !== "illustration");
    const minimum = hasExperience(project.experience.component) ? 2 : 4;
    if (figures.length < minimum) issues.push(`${id}: at least ${minimum} evidence figures are required; illustrations do not count`);
    if (id === "rentit") {
      for (const step of ["browse", "listing", "request", "conversation", "management"]) {
        if (!figures.some(figure => figure.id === step && figure.kind === "screenshot")) issues.push(`rentit: ${step} journey screenshot is required; supporting screens do not substitute for that step`);
      }
    }
    if (!project.seo.ogImage) issues.push(`${id}: OG image is missing`);
    if (records.filter(record => record.projectSlug === id && record.verified).length < 3) issues.push(`${id}: fewer than three owner-verified decisions`);
    issues.push(...copyIssues(project).map(issue => `${id}: ${issue}`));
  }
  for (const record of records) {
    if (!record.verified) issues.push(`${record.id}: decision is unverified`);
    issues.push(...copyIssues(record).map(issue => `${record.id}: ${issue}`));
  }
  for (const item of collection.bodies ?? []) {
    if (item.projectSlug === "site" || published.includes(item.projectSlug)) issues.push(...copyIssues(item.body).map(issue => `${item.projectSlug} body: ${issue}`));
  }
  if (release === "R2" || release === "R3") {
    if (records.filter(record => record.verified).length < 15) issues.push("Portfolio has fewer than 15 owner-verified decisions");
    if (records.filter(record => record.verified && record.status !== "kept").length < 2) issues.push("Portfolio has fewer than two owner-verified reversed or open decisions");
  }
  return issues;
}
