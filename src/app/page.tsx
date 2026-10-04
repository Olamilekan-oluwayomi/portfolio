import { siteIdentity } from "@/content/identity";

export default function Home() {
  return <section className="opening" aria-labelledby="name">
    <h1 id="name">{siteIdentity.name}</h1>
    <p className="lead">{siteIdentity.role}</p>
    <p className="meta">{siteIdentity.stackLine}</p>
    <p className="meta">Currently at {siteIdentity.employer}</p>
    <a href={`mailto:${siteIdentity.email}`}>Get in touch</a>
  </section>;
}
