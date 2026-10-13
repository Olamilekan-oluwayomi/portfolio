import type { Metadata } from "next";
import Link from "next/link";
import { siteIdentity } from "@/content/identity";
import { loadContent } from "@/lib/content";
import { publishedProjectSlugs } from "@/content/release";
import { HeaderActions } from "@/components/header-actions";
import { Shell } from "@/components/shell";
import { ThemeToggle } from "@/components/theme-toggle";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteIdentity.domain),
  title: `${siteIdentity.name}, ${siteIdentity.role}`,
  openGraph: { title: `${siteIdentity.name}, ${siteIdentity.role}`, siteName: siteIdentity.name, locale: "en_NG", type: "website", images: [{ url: "/social-card.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/social-card.png"] },
  robots: { index: process.env.VERCEL_ENV !== "preview", follow: process.env.VERCEL_ENV !== "preview" },
};

// Persistent frame contract: PRD.md sections 14 and 36. Navigation lists only
// routes that exist in this release; Lab waits for /lab.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const decisions = loadContent().decisions.filter(decision => publishedProjectSlugs.includes(decision.projectSlug)).map(decision => ({ id: decision.id, title: decision.title, theme: decision.theme, projectSlug: decision.projectSlug }));
  return <html lang="en">
    <head>{["geist-var", "geist-mono-var", "instrument-serif-regular"].map(font => <link key={font} rel="preload" href={`/fonts/${font}.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />)}</head>
    <body>
      <Shell decisions={decisions}>
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="header-inner frame">
            <Link className="wordmark" href="/" aria-label={`${siteIdentity.name}, home`}>{siteIdentity.name.split(" ").map(part => part[0]).join("")}<span aria-hidden="true">.</span></Link>
            <nav className="main-nav" aria-label="Main navigation"><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/experience">Experience</Link><Link href="/contact">Contact</Link></nav>
            <div className="header-actions"><HeaderActions /><ThemeToggle /><a className="contact-link" href={`mailto:${siteIdentity.email}`}>Let’s talk <span aria-hidden="true">↗</span></a></div>
          </div>
        </header>
        <main data-inspect="RootLayout" data-inspect-spacing="--pad-x" id="main" className="frame" tabIndex={-1}>{children}</main>
        <footer className="site-footer frame">
          <span className="footer-name">{siteIdentity.name}</span>
          <a href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in new tab)</span></a>
          <a href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span className="sr-only">(opens in new tab)</span></a>
          <a href={siteIdentity.links.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <span className="sr-only">(opens in new tab)</span></a>
          <a href={siteIdentity.links.twitter} target="_blank" rel="noopener noreferrer">Twitter / X <span className="sr-only">(opens in new tab)</span></a>
          <a className="footer-email" href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a>
        </footer>
      </Shell>
    </body>
  </html>;
}
