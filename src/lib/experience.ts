// Implemented enhancements and static figures: PRD.md sections 16.3 and 38.
// RentIt supports a walkthrough; its remaining journey evidence still gates publication.
export const experienceComponents = new Set(["rentit", "marginalia", "space-tourism", "foreign-exchange-checker"]);
export function hasExperience(component: string): boolean { return experienceComponents.has(component); }
