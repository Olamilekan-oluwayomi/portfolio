import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { siteIdentity } from "@/content/identity";
import "@/styles/globals.css";

const display = localFont({ src: "../../design/fonts/instrument-serif-regular.woff2", variable: "--font-display-loaded", display: "swap", weight: "400", adjustFontFallback: "Times New Roman" });
const italic = localFont({ src: "../../design/fonts/instrument-serif-italic.woff2", variable: "--font-italic-loaded", display: "swap", weight: "400", style: "italic", preload: false, adjustFontFallback: "Times New Roman" });
const ui = localFont({ src: "../../design/fonts/geist-var.woff2", variable: "--font-ui-loaded", display: "swap", weight: "400 500" });
const mono = localFont({ src: "../../design/fonts/geist-mono-var.woff2", variable: "--font-mono-loaded", display: "swap", weight: "400 500" });

export const metadata: Metadata = {
  title: `${siteIdentity.name}, ${siteIdentity.role}`,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${italic.variable} ${ui.variable} ${mono.variable}`}>
    <body>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="frame"><Link href="/">{siteIdentity.name}</Link><a href={`mailto:${siteIdentity.email}`}>Contact</a></header>
      <main id="main" className="frame" tabIndex={-1}>{children}</main>
      <footer className="frame">
        <a href={siteIdentity.links.github} target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in new tab)</span></a>
        <a href={siteIdentity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span className="sr-only">(opens in new tab)</span></a>
        <a href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a>
      </footer>
    </body>
  </html>;
}
