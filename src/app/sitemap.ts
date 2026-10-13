import type { MetadataRoute } from "next";
import { siteIdentity } from "@/content/identity";
import { publishedProjectSlugs } from "@/content/release";

// Public routes only: PRD.md section 30. Modification dates stay omitted until
// a reliable content-to-commit timestamp source exists (docs/deployment-identity.md).
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/brief", "/work", "/about", "/experience", "/contact",
    ...publishedProjectSlugs.map(slug => `/work/${slug}`)];
  return routes.map(route => ({ url: new URL(route, siteIdentity.domain).href }));
}
