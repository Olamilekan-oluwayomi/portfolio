"use client";
import dynamic from "next/dynamic";
import { Component, useState, type ReactNode } from "react";
import type { Decision, Project } from "@/lib/schemas";

const Space = dynamic(() => import("./experiences").then(module => module.SpaceResizer), { loading: () => <p role="status">Loading viewport controls</p> });
const Gallery = dynamic(() => import("./experiences").then(module => module.StateGallery), { loading: () => <p role="status">Loading state gallery</p> });
const Sources = dynamic(() => import("./experiences").then(module => module.ManuscriptSources), { loading: () => <p role="status">Loading source reader</p> });
const Rental = dynamic(() => import("./rentit-walkthrough"), { loading: () => <p role="status">Loading booking walkthrough</p> });
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p role="status">The interactive view could not load. Continue with the figures below.</p> : this.props.children; }
}
export function ProjectExperience({ project, decisions }: { project: Project; decisions: Decision[] }) {
  const [active, setActive] = useState(false);
  return <Boundary>{active ? project.slug === "rentit" ? <Rental project={project} /> : project.slug === "space-tourism" ? <Space project={project} /> : project.slug === "foreign-exchange-checker" ? <Gallery project={project} /> : <Sources project={project} decisions={decisions} /> : <button className="experience-button" type="button" onClick={() => setActive(true)}>{project.slug === "rentit" ? "Follow the booking walkthrough" : project.slug === "space-tourism" ? "Explore viewport widths" : project.slug === "foreign-exchange-checker" ? "Explore the interface states" : "Read with sources visible"}</button>}</Boundary>;
}
