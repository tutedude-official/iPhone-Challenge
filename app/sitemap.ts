import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tutedude-iphone-challenge.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
