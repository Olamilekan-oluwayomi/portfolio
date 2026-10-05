import { publicationIssues, type Collection, type Release } from "./schemas";

// PRD.md sections 16.2, 38 and 40: a preview cannot authorize publication.
export function projectPageContent(collection: Collection, slug: string, published: readonly string[], release: Release, preview = false) {
  const project = collection.projects.find(item => item.slug === slug);
  if (!project) return undefined;
  const issues = publicationIssues(collection, [slug], release);
  const eligible = published.includes(slug) && issues.length === 0;
  if (!eligible && !preview) return undefined;
  return {
    project,
    decisions: collection.decisions.filter(item => item.projectSlug === slug),
    draft: !eligible,
    issues,
  };
}
