import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadContent } from "@/lib/content";
import { projectPageContent } from "@/lib/project-page";
import { publishedProjectSlugs, release } from "@/content/release";
import { siteIdentity } from "@/content/identity";
import { CaseStudy } from "@/components/work/case-study";

type Props = { params: Promise<{ slug: string }> };
const preview = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";
export const dynamicParams = false;

export function generateStaticParams() {
  const collection = loadContent();
  return collection.projects
    .filter(project => projectPageContent(collection, project.slug, publishedProjectSlugs, release, preview))
    .map(project => ({ slug: project.slug }));
}

function getPage(slug: string) {
  return projectPageContent(loadContent(), slug, publishedProjectSlugs, release, preview);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage((await params).slug);
  if (!page) return { title: "Project unavailable", robots: { index: false, follow: false } };
  return {
    title: `${page.draft ? "Review preview: " : ""}${page.project.seo.title} | ${siteIdentity.name}`,
    description: page.project.seo.description,
    ...(!page.draft ? { alternates: { canonical: page.project.links.caseStudy } } : {}),
    ...(page.draft ? { robots: { index: false, follow: false } } : {}),
    ...(!page.draft ? {
      openGraph: {
        title: page.project.seo.title,
        description: page.project.seo.description,
        type: "article",
        url: page.project.links.caseStudy,
        ...(page.project.seo.ogImage ? { images: [{ url: page.project.seo.ogImage }] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: page.project.seo.title,
        description: page.project.seo.description,
        ...(page.project.seo.ogImage ? { images: [page.project.seo.ogImage] } : {}),
      },
    } : {}),
  };
}

export default async function ProjectPage({ params }: Props) {
  const page = getPage((await params).slug);
  if (!page) notFound();
  return <CaseStudy {...page} />;
}
