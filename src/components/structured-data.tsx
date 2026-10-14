import { siteIdentity } from "@/content/identity";
export const personData = { "@type": "Person", "@id": `${siteIdentity.domain}/#person`, name: siteIdentity.name, jobTitle: siteIdentity.role, url: siteIdentity.domain, sameAs: [siteIdentity.links.github, siteIdentity.links.linkedin] };
export function StructuredData({ items }: { items: object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": items }).replace(/</g, "\\u003c") }} />;
}
