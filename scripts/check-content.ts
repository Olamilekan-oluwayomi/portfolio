import { loadContent } from "../src/lib/content";
import { copyIssues, publicationIssues } from "../src/lib/schemas";
import { publishedProjectSlugs, release } from "../src/content/release";
import { siteIdentity } from "../src/content/identity";
import { workIndex } from "../src/content/work-index";

const collection = loadContent();
const issues = [...copyIssues(siteIdentity), ...copyIssues(workIndex), ...publicationIssues(collection, publishedProjectSlugs, release)];
const preview = process.env.VERCEL_ENV === "preview" || process.env.CONTENT_MODE === "preview";
if (issues.length) {
  console.error(issues.join("\n"));
  if (!preview) process.exit(1);
  console.warn("Preview only: content is not eligible for production.");
} else console.log(`Content gate passed: ${publishedProjectSlugs.length} published project pages (${release}).`);
