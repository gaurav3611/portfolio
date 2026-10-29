import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";

// Generated at build time (required for the static export; fine for every host).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
