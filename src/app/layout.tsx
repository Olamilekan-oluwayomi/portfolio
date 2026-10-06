import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { siteIdentity } from "@/content/identity";
import { loadContent } from "@/lib/content";
import { HeaderActions } from "@/components/header-actions";
import { Shell } from "@/components/shell";
import { ThemeToggle } from "@/components/theme-toggle";
import "@/styles/globals.css";

const display = localFont({ src: "../../design/fonts/instrument-serif-regular.woff2", variable: "--font-display-loaded", display: "swap", weight: "400", preload: false, adjustFontFallback: "Times New Roman" });
const italic = localFont({ src: "../../design/fonts/instrument-serif-italic.woff2", variable: "--font-italic-loaded", display: "swap", weight: "400", style: "italic", preload: false, adjustFontFallback: "Times New Roman" });
const ui = localFont({ src: "../../design/fonts/geist-var.woff2", variable: "--font-ui-loaded", display: "swap", weight: "400 500" });
const mono = localFont({ src: "../../design/fonts/geist-mono-var.woff2", variable: "--font-mono-loaded", display: "swap", weight: "400 500" });

export const metadata: Metadata = {
  title: `${siteIdentity.name}, ${siteIdentity.role}`,
  robots: { index: false, follow: false },
};

// Persistent frame contract: PRD.md sections 14 and 36. Navigation lists only
// routes that exist in this release; Lab waits for /lab.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const decisions = loadContent().decisions.map(decision => ({ id: decision.id, title: decision.title, theme: decision.theme, projectSlug: decision.projectSlug }));
  return <html lang="en" className={`${display.variable} ${italic.variable} ${ui.variable} ${mono.variable}`}>
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
        <main id="main" className="frame" tabIndex={-1}>{children}</main>
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
