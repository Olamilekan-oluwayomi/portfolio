import type { Release } from "@/lib/schemas";

// RentIt is eligible as the first published case study. The release remains
// below portfolio-wide R2 because the site has not yet shipped the full project set.
export const release: Release = "R1";
export const publishedProjectSlugs: string[] = ["rentit"];
