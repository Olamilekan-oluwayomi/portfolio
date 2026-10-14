import type { MetadataRoute } from "next";
import { siteIdentity } from "@/content/identity";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(process.env.VERCEL_ENV === "preview" ? { disallow: "/" } : { allow: "/" }) },
    sitemap: new URL("/sitemap.xml", siteIdentity.domain).href,
  };
}
