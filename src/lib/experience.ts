// Implemented enhancements and static figures: PRD.md sections 16.3 and 38.
// RentIt remains a review-only reading path until real publication figures exist.
export const experienceComponents = new Set(["marginalia", "space-tourism", "foreign-exchange-checker"]);
export function hasExperience(component: string): boolean { return experienceComponents.has(component); }
