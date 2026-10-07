import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";
import matter from "gray-matter";

// Owner authorized local-script crops on 2026-10-07. No resize, retouch or generated pixels.
// Originals are retained under ignored artifacts/. Crop coordinates are output-pixel bounds.
const rentalSources = [
  ["browse", "C:/Users/hp/AppData/Local/Temp/codex-clipboard-44d16t.png", 122, 1080],
  ["new-listing", "C:/Users/hp/AppData/Local/Temp/codex-clipboard-XnYgBw.png", 122, 1080],
  ["profile", "C:/Users/hp/AppData/Local/Temp/codex-clipboard-CPBuH6.png", 122, 1080],
  ["dashboard", "C:/Users/hp/AppData/Local/Temp/codex-clipboard-6fBzPI.png", 122, 990],
  ["owner-bookings", "C:/Users/hp/AppData/Local/Temp/codex-clipboard-WwP9lI.png", 122, 990],
  ["listing", "artifacts/rentit-owner-captures/listing-owner-availability-desktop.png", 122, 1080],
  ["conversation", "artifacts/rentit-owner-captures/conversation-desktop.png", 182, 1080],
  ["management", "artifacts/rentit-owner-captures/listing-management-desktop.png", 122, 990],
];
const descriptions = {
  browse: ["RentIt browse results with location and price filters, sort control and three item cards.", "Browse results with location and price filters and three available items. The laptop card has no visible photo in this capture."],
  "new-listing": ["RentIt New Listing form with title, description, category and daily-price fields.", "Upper portion of the New Listing form. An empty creation form does not show submission or editing an existing listing."],
  profile: ["RentIt profile form with photo controls, full name, location and bio fields.", "Profile fields and photo controls. This capture does not show a save result or the profile-completion prompt."],
  dashboard: ["RentIt owner dashboard with listing, booking and request summaries and recent bookings.", "Owner dashboard with recent bookings and a notification opt-in prompt. Captured counts are interface state, not portfolio outcome metrics. Earnings are labeled Coming soon."],
  "owner-bookings": ["RentIt Lending booking list with status filters and pending rows offering Approve and Decline.", "Owner-side booking management with Lending and Renting controls, status filters, and pending requests. It does not show renter submission or an approval outcome."],
  listing: ["RentIt PS5 listing description and host information beside an owner Manage Availability calendar.", "Listing detail in the owner's availability view. The gallery and renter date-selection controls are not in this capture."],
  conversation: ["RentIt booking conversation with PS5 listing context, incoming and outgoing greetings and a message composer.", "Booking-specific conversation with greetings and a composer. Broken image placeholders remain visible. A still does not establish real-time delivery."],
  management: ["RentIt My Listings view with an active PS5 listing and Edit, Remove from Browse and Delete controls.", "Existing-listing management with Edit, Remove from Browse and Delete controls. Completed mutations and the restore state were not captured."],
};
const records = [];
async function crop(source, target, rectangle, originalPath) {
  mkdirSync(dirname(originalPath), { recursive: true });
  if (!existsSync(originalPath)) copyFileSync(source, originalPath);
  const original = readFileSync(originalPath);
  const metadata = await sharp(original).metadata();
  mkdirSync(dirname(target), { recursive: true });
  const output = await sharp(original).extract(rectangle).png().toBuffer();
  // Compare decoded pixels rather than encoded PNG bytes, which can differ losslessly.
  const expected = await sharp(original).extract(rectangle).ensureAlpha().raw().toBuffer();
  const actual = await sharp(output).ensureAlpha().raw().toBuffer();
  if (!expected.equals(actual)) throw new Error(`Pixel preservation failed: ${target}`);
  writeFileSync(target, output);
  records.push({ target, originalPath, originalSize: [metadata.width, metadata.height], rectangle, originalSha256: createHash("sha256").update(original).digest("hex"), outputSha256: createHash("sha256").update(output).digest("hex"), retainedPixelsIdentical: true });
}
const rentalMedia = [];
for (const [id, source, top, bottom] of rentalSources) {
  const target = `public/figures/rentit/rentit-${id}.png`;
  const width = id === "conversation" ? 1920 : 1897;
  await crop(source, target, { left: 0, top, width, height: bottom - top }, `artifacts/case-study-originals/rentit/${id}.png`);
  const [alt, caption] = descriptions[id];
  rentalMedia.push({ id, kind: "screenshot", src: target.replace("public", ""), alt, caption, width, height: bottom - top });
}
for (const slug of ["marginalia", "space-tourism", "foreign-exchange-checker"]) {
  const path = `src/content/projects/${slug}.mdx`;
  const parsed = matter(readFileSync(path, "utf8"));
  for (const media of parsed.data.media) {
    if (media.kind !== "screenshot") continue;
    const target = `public${media.src}`;
    const originalPath = join("artifacts/case-study-originals", slug, media.src.split("/").pop());
    const original = await sharp(existsSync(originalPath) ? originalPath : target).metadata();
    // These files already have their tabs/address bar removed. Remove only the
    // observed 23px browser scrollbar, plus status overlays on two captures.
    const bottomTrim = ["marginalia-2026-10-06-134149.png", "space-tourism-2026-10-06-134326.png"].some(name => target.endsWith(name)) ? 33 : 1;
    await crop(target, target, { left: 0, top: 0, width: original.width - 23, height: original.height - bottomTrim }, originalPath);
    media.width = original.width - 23; media.height = original.height - bottomTrim;
  }
  writeFileSync(path, `---\n${JSON.stringify(parsed.data, null, 2)}\n---\n${parsed.content.replace(/^\s*\n/, "")}`);
}
const path = "src/content/projects/rentit.mdx";
const parsed = matter(readFileSync(path, "utf8"));
parsed.data.media = rentalMedia;
parsed.data.seo.ogImage = "/og/rentit-case-study.png";
parsed.data.evidence.push(...(parsed.data.evidence.some(item => item.ref === "docs/figure-crops.json") ? [] : [{ label: "Owner-supplied captures, crop bounds and pixel-preservation checks", ref: "docs/figure-crops.json" }]));
writeFileSync(path, `---\n${JSON.stringify(parsed.data, null, 2)}\n---\n${parsed.content.replace(/^\s*\n/, "")}`);
mkdirSync("public/og", { recursive: true });
copyFileSync("docs/evidence/rentit/rentit-og.png", "public/og/rentit-case-study.png");
writeFileSync("docs/figure-crops.json", `${JSON.stringify({ method: "Lossless extraction only; no scaling, retouching or generated pixels. RentIt dashboard crops also exclude the sidebar account footer. Capture CSS viewport and pixel density remain unverified.", records }, null, 2)}\n`);
console.log(`Cropped ${records.length} figures; all retained pixels identical to source crops.`);
