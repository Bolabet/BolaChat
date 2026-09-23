import type { MetadataRoute } from "next";
import { markets, marketCodes } from "@/config/markets";

export default function sitemap(): MetadataRoute.Sitemap {
  const marketEntries: MetadataRoute.Sitemap = marketCodes.map((code) => ({
    url: markets[code].seo.canonicalUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: "https://bolachat.io",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...marketEntries,
  ];
}
