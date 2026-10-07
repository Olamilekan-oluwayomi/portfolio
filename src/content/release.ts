import type { Release } from "@/lib/schemas";

// Approved by the owner on 2026-10-06 after verification of copy, decisions and figures.
// The release remains below portfolio-wide R2 because portfolio checks run from R2 onward.
export const release: Release = "R1";
// RentIt publication figures are deferred: docs/implementation-status.md.
export const publishedProjectSlugs: string[] = ["marginalia", "space-tourism", "foreign-exchange-checker"];
