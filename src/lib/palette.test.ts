import { describe, expect, it } from "vitest";
import { buildCommands, searchCommands, type Command } from "./palette";

const sample: Command[] = [
  { id: "work", group: "Navigate", label: "Work", action: { kind: "href", href: "/work" } },
  { id: "contact", group: "Navigate", label: "Open contact", always: true, action: { kind: "href", href: "/contact" } },
  { id: "live-rentit", group: "Open", label: "Open RentIt live", keywords: "property marketplace", action: { kind: "external", href: "https://rentitdaily.vercel.app/" } },
  { id: "copy-email", group: "Copy", label: "Copy email", action: { kind: "copy-email" } },
  { id: "dec-a", group: "Search decisions", label: "Replace unknown UPDATE policies", keywords: "security rentit", action: { kind: "href", href: "/work/rentit#decisions" } },
];

describe("searchCommands", () => {
  it("returns every command when the query is empty", () => {
    expect(searchCommands(sample, "")).toEqual(sample);
    expect(searchCommands(sample, "   ")).toEqual(sample);
  });

  it("ranks a label prefix above a keyword-only match", () => {
    const results = searchCommands(sample, "work");
    expect(results[0]?.id).toBe("work");
  });

  it("matches word prefixes inside a label", () => {
    const results = searchCommands(sample, "upd");
    expect(results.map(entry => entry.id)).toContain("dec-a");
  });

  it("excludes commands the query does not reach", () => {
    const results = searchCommands(sample, "politics");
    expect(results.map(entry => entry.id)).not.toContain("live-rentit");
  });

  it("always keeps the pinned contact command in non-matching results", () => {
    const results = searchCommands(sample, "politics");
    expect(results.map(entry => entry.id)).toContain("contact");
  });

  it("requires every token to match", () => {
    const results = searchCommands(sample, "rentit politics");
    expect(results.map(entry => entry.id)).not.toContain("live-rentit");
  });
});

describe("buildCommands", () => {
  const commands = buildCommands(
    [{ id: "rentit-policy", title: "Replace unknown UPDATE policies", theme: "security", projectSlug: "rentit" },
      { id: "marginalia-citation-protocol", title: "Resolve source markers server-side", theme: "data", projectSlug: "marginalia" },
      { id: "site-example", title: "Publish employer name only", theme: "ux", projectSlug: "site" }],
    true,
    false,
  );

  it("includes the standard navigate, copy and view groups", () => {
    const ids = commands.map(command => command.id);
    expect(ids).toContain("go-home");
    expect(ids).toContain("go-work");
    expect(ids).toContain("go-contact");
    expect(ids).toContain("copy-email");
    expect(ids).toContain("view-theme");
    expect(ids).toContain("view-sheet");
    expect(commands.find(command => command.id === "view-shortcuts-toggle")?.label).toBe("Shortcuts: on");
    expect(commands.find(command => command.id === "view-decision-mode")?.label).toBe("Decision mode: off");
  });

  it("links published projects to their case study and every project to live and source", () => {
    const ids = commands.map(command => command.id);
    expect(ids).toContain("open-rentit");
    expect(commands.find(command => command.id === "open-rentit")?.action).toEqual({ kind: "href", href: "/work/rentit" });
    expect(ids).toContain("open-marginalia");
    expect(ids).toContain("live-rentit");
    expect(ids).toContain("repo-rentit");
    expect(commands.find(command => command.id === "open-marginalia")?.action).toEqual({ kind: "href", href: "/work/marginalia" });
  });

  it("routes decision searches to the project chapter", () => {
    expect(commands.find(command => command.id === "decision-marginalia-citation-protocol")?.action).toEqual({ kind: "href", href: "/work/marginalia#marginalia-citation-protocol-heading" });
    expect(commands.find(command => command.id === "decision-rentit-policy")?.action).toEqual({ kind: "href", href: "/work/rentit#rentit-policy-heading" });
    expect(commands.find(command => command.id === "decision-site-example")).toBeUndefined();
  });

  it("reflects the shortcut setting in its label", () => {
    const off = buildCommands([], false, true);
    expect(off.find(command => command.id === "view-shortcuts-toggle")?.label).toBe("Shortcuts: off");
    expect(off.find(command => command.id === "view-decision-mode")?.label).toBe("Decision mode: on");
  });
});
