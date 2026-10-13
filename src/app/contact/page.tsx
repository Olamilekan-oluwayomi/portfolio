import type { Metadata } from "next";
import { siteIdentity } from "@/content/identity";
import { CopyEmail } from "@/components/copy-email";

// Route contract: PRD.md sections 12 and 20. One email address, links, no form.
export const metadata: Metadata = {
  title: `Contact | ${siteIdentity.name}`,
  description: `${siteIdentity.availability} Email ${siteIdentity.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <article className="contact-page">
    <header className="contact-intro">
      <p className="eyebrow">Contact</p>
      <h1 className="contact-title">Let’s <em>talk.</em></h1>
    </header>
    <div className="contact-grid">
      <section className="contact-email-panel" aria-labelledby="contact-email-heading">
        <h2 className="contact-panel-label" id="contact-email-heading">Email</h2>
        <CopyEmail />
        <a className="contact-mailto" href={`mailto:${siteIdentity.email}`}>Send an email <span aria-hidden="true">↗</span></a>
      </section>
      <section className="contact-status-panel" aria-labelledby="contact-status-heading">
        <h2 className="contact-panel-label" id="contact-status-heading"><span className="availability-mark" aria-hidden="true" />Availability</h2>
        <p className="contact-availability">{siteIdentity.availability}</p>
        <p className="contact-location">{siteIdentity.location}</p>
      </section>
    </div>
    <ul className="contact-secondary">
      <li><a href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer"><span className="contact-link-label">LinkedIn<span className="sr-only"> (opens in new tab)</span></span><span aria-hidden="true">↗</span></a></li>
      <li><a href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer"><span className="contact-link-label">GitHub<span className="sr-only"> (opens in new tab)</span></span><span aria-hidden="true">↗</span></a></li>
      {siteIdentity.cv && <li><a href={siteIdentity.cv}><span className="contact-link-label">Curriculum vitae</span><span className="contact-link-format">PDF</span><span aria-hidden="true">↗</span></a></li>}
    </ul>
  </article>;
}
