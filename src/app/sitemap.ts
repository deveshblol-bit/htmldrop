import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/seo-pages";

const BASE = "https://htmldrop.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const seoPages = getAllSlugs().map((slug) => ({
    url: `${BASE}/for/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...seoPages,
  ];
}
