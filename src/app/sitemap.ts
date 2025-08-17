import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const lastmod = new Date();

  const paths = [
    "/",
    "/how-it-works",
    "/performance",
    "/pricing",
    "/faq",
    "/contact",
    "/legal/terms",
    "/legal/privacy",
    "/legal/risk",
  ];

  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: lastmod,
  }));
}
