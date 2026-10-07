import type { Release } from "@/lib/schemas";

// Approved by the owner on 2026-10-06 after verification of copy, decisions and figures.
// The release remains below portfolio-wide R2 because portfolio checks run from R2 onward.
export const release: Release = "R1";
// Owner requested RentIt's case-study link on 2026-10-07. Remaining capture
// gaps stay explicit on the page: PRD.md Appendix F, docs/rentit-publication.json.
export const publishedProjectSlugs: string[] = ["rentit", "marginalia", "space-tourism", "foreign-exchange-checker"];
