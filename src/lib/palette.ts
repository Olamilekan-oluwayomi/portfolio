import { siteIdentity } from "@/content/identity";
import { workIndex } from "@/content/work-index";
import { publishedProjectSlugs } from "@/content/release";

// Command palette contract: PRD.md sections 14, 21 and 26.
export type CommandGroup = "Navigate" | "Open" | "Copy" | "View" | "Search decisions";
export type CommandAction =
  | { kind: "href"; href: string }
  | { kind: "external"; href: string }
  | { kind: "copy-email" }
  | { kind: "theme" }
  | { kind: "shortcuts" }
  | { kind: "decisions" }
  | { kind: "sheet" }
  | { kind: "inspect" }
  | { kind: "lite" }
  | { kind: "reduce-motion" };

export type Command = {
  id: string;
  group: CommandGroup;
  label: string;
  hint?: string;
  keywords?: string;
  always?: boolean;
  action: CommandAction;
};

export type PaletteDecision = { id: string; title: string; theme: string; projectSlug: string };

const routeCommands: Command[] = [
  { id: "go-home", group: "Navigate", label: "Home", hint: "/", action: { kind: "href", href: "/" } },
  { id: "go-work", group: "Navigate", label: "Work", hint: "g w", action: { kind: "href", href: "/work" } },
  { id: "go-about", group: "Navigate", label: "About", hint: "g a", action: { kind: "href", href: "/about" } },
  { id: "go-experience", group: "Navigate", label: "Experience", hint: "g e", action: { kind: "href", href: "/experience" } },
  { id: "go-contact", group: "Navigate", label: "Open contact", hint: "g c", always: true, action: { kind: "href", href: "/contact" } },
  { id: "go-brief", group: "Navigate", label: "The 30-second brief", action: { kind: "href", href: "/brief" } },
];

const viewCommands: Command[] = [
  { id: "view-theme", group: "View", label: "Toggle theme", keywords: "dark light night paper", action: { kind: "theme" } },
  { id: "view-sheet", group: "View", label: "Show shortcuts", keywords: "help keys", action: { kind: "sheet" } },
];

export function buildCommands(decisions: PaletteDecision[], shortcutsOn: boolean, decisionModeOn: boolean, inspectOn = false, motion: "full" | "reduced" | "lite" = "full"): Command[] {
  const projects = workIndex.map(project => {
    const published = publishedProjectSlugs.includes(project.slug);
    const commands: Command[] = [];
    if (published) {
      commands.push({ id: `open-${project.slug}`, group: "Navigate", label: `${project.title} case study`, keywords: project.category, action: { kind: "href", href: `/work/${project.slug}` } });
    }
    commands.push({ id: `live-${project.slug}`, group: "Open", label: `Open ${project.title} live`, keywords: project.category, action: { kind: "external", href: project.live } });
    commands.push({ id: `repo-${project.slug}`, group: "Open", label: `${project.title} source`, keywords: project.category, action: { kind: "external", href: project.repo } });
    return commands;
  }).flat();
  const profile: Command[] = [
    { id: "open-github", group: "Open", label: "GitHub", action: { kind: "external", href: siteIdentity.links.github } },
    { id: "open-linkedin", group: "Open", label: "LinkedIn", action: { kind: "external", href: siteIdentity.links.linkedin } },
  ];
  if (siteIdentity.cv) profile.push({ id: "open-cv", group: "Open", label: "Curriculum vitae", keywords: "cv resume pdf", action: { kind: "external", href: siteIdentity.cv } });
  const decisionCommands: Command[] = decisions.filter(decision => publishedProjectSlugs.includes(decision.projectSlug)).map(decision => ({
    id: `decision-${decision.id}`,
    group: "Search decisions",
    label: decision.title,
    hint: `${decision.theme} / ${decision.projectSlug}`,
    keywords: `${decision.theme} ${decision.projectSlug} ${decision.title}`,
    action: { kind: "href", href: `/work/${decision.projectSlug}#${decision.id}-heading` },
  }));
  return [
    ...routeCommands,
    ...projects,
    ...profile,
    { id: "copy-email", group: "Copy", label: "Copy email", hint: siteIdentity.email, action: { kind: "copy-email" } },
    ...viewCommands,
    { id: "view-inspect", group: "View", label: `Inspect: ${inspectOn ? "on" : "off"}`, keywords: "measurements vitals notes", action: { kind: "inspect" } },
    { id: "view-lite", group: "View", label: `Lite mode: ${motion === "lite" ? "on" : "off"}`, action: { kind: "lite" } },
    { id: "view-reduce-motion", group: "View", label: `Reduce motion: ${motion !== "full" ? "on" : "off"}`, action: { kind: "reduce-motion" } },
    { id: "view-shortcuts-toggle", group: "View", label: `Shortcuts: ${shortcutsOn ? "on" : "off"}`, keywords: "single character keys disable wcag", action: { kind: "shortcuts" } },
    { id: "view-decision-mode", group: "View", label: `Decision mode: ${decisionModeOn ? "on" : "off"}`, keywords: "annotation notes annotate margin", action: { kind: "decisions" } },
    ...decisionCommands,
  ];
}

function haystack(command: Command): string {
  return `${command.label} ${command.group} ${command.keywords ?? ""} ${command.hint ?? ""}`.toLowerCase();
}

// In-house substring and word-prefix scorer for fewer than 80 commands (PRD.md section 26).
export function scoreCommand(command: Command, tokens: string[]): number | null {
  const label = command.label.toLowerCase();
  const full = haystack(command);
  let total = 0;
  for (const token of tokens) {
    if (label.startsWith(token)) { total += 4; continue; }
    const words = label.split(/[\s/]+/u).filter(Boolean);
    if (words.some(word => word.startsWith(token))) { total += 3; continue; }
    if (label.includes(token)) { total += 2; continue; }
    if (full.includes(token)) { total += 1; continue; }
    return null;
  }
  return total;
}

export function searchCommands(commands: Command[], query: string): Command[] {
  const tokens = query.trim().toLowerCase().split(/\s+/u).filter(Boolean);
  if (tokens.length === 0) return commands;
  const scored = commands
    .map((command, index) => ({ command, index, score: scoreCommand(command, tokens) }))
    .filter(entry => entry.score !== null) as { command: Command; index: number; score: number }[];
  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  const found = scored.map(entry => entry.command);
  for (const pinned of commands.filter(command => command.always && !found.includes(command))) found.push(pinned);
  return found;
}
