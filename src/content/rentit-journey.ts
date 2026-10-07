// Narrative and capture boundaries: docs/evidence/rentit/README.md and PRD.md §16.3.
export const rentitJourney = [
  { id: "browse", title: "Browse", mediaIds: ["browse"], text: "Search and filter listings before choosing an item.", ref: "rentit:src/shared/lib/constants.js", limit: "The capture shows filters and three results. Search and filter changes were not tested.", note: "Location and price filters sit above the results, with sorting alongside them.", x: 33, y: 31 },
  { id: "listing", title: "Inspect the listing", mediaIds: ["listing"], text: "Read the listing details before choosing a rental window.", ref: "rentit:src/features/bookings/components/AvailabilityCalendar.jsx", limit: "This is the owner's availability view. The gallery and renter date-selection view remain uncaptured.", note: "The owner calendar manages blocked dates. It is distinct from the renter's booking calendar.", x: 83, y: 36 },
  { id: "request", title: "Request a booking", mediaIds: ["profile", "owner-bookings"], text: "The booking hook checks profile requirements and reads availability again before inserting a pending request.", ref: "rentit:src/features/bookings/hooks/useCreateBooking.js", limit: "These supporting captures show the profile form and owner booking list. They do not show a renter submitting a request or the profile-completion prompt.", note: "Profile fields are visible here; the requirement to complete a profile is evidenced by the source, not this still.", x: 79, y: 65 },
  { id: "conversation", title: "Continue the conversation", mediaIds: ["conversation"], text: "Message history belongs to the booking, keeping the conversation in context.", ref: "rentit:src/features/messages/hooks/useMessages.js", limit: "The supplied conversation shows greetings and a composer. Real-time delivery and access enforcement remain unverified.", note: "The listing heading stays above the conversation, tying the thread to the rental.", x: 27, y: 16 },
  { id: "management", title: "Manage the listing", mediaIds: ["management"], text: "Owners can edit, hide and restore an existing listing through the listing hook.", ref: "rentit:src/features/listings/hooks/useListing.js", limit: "Edit, Remove from Browse and Delete are visible. A completed mutation and the hidden-listing restore state remain uncaptured.", note: "Edits and visibility changes use UPDATE rather than the former upsert path.", decision: "rentit-update-existing-listings", x: 81, y: 60 },
] as const;

export function journeyIndex(index: number, key: string): number | undefined {
  const count = rentitJourney.length;
  if (key === "ArrowRight" || key === "ArrowDown") return (index + 1) % count;
  if (key === "ArrowLeft" || key === "ArrowUp") return (index + count - 1) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return undefined;
}
