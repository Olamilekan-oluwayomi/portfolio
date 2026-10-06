import type { Metadata } from "next";
import { siteIdentity } from "@/content/identity";
import { CopyEmail } from "@/components/copy-email";

// Route contract: PRD.md sections 12 and 20. One email address, links, no form.
export const metadata: Metadata = {
  title: `Contact | ${siteIdentity.name}`,
  description: `${siteIdentity.availability} Email ${siteIdentity.email}.`,
};

export default function ContactPage() {
  return <article className="contact-page">
    <p className="eyebrow">Contact</p>
    <h1 className="sr-only">Contact {siteIdentity.name}</h1>
    <CopyEmail />
    <a className="contact-mailto" href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a>
    <p className="contact-availability">{siteIdentity.availability}</p>
    <ul className="contact-secondary">
      <li><a href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className="sr-only"> (opens in new tab)</span></a></li>
      <li><a href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (opens in new tab)</span></a></li>
      {siteIdentity.cv && <li><a href={siteIdentity.cv}>Curriculum vitae</a></li>}
    </ul>
  </article>;
}
