import type { MetadataRoute } from "next";
import { pages } from "@/lib/pseo";

const siteUrl = "https://getpestpros.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
  ];

  for (const page of pages) {
    urls.push({
      url: new URL(page.slug, siteUrl).toString(),
      lastModified: new Date(),
    });
  }

  return urls;
}
