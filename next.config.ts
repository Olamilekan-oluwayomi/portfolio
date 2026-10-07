import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const config: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [640, 960, 1440, 1920], minimumCacheTTL: 31536000 },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "Content-Security-Policy", value: "frame-src https://space-tourismx.vercel.app; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    ] }];
  },
};

export default createMDX()(config);
