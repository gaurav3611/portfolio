import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

// Generated at build time (required for the static export; fine for every host).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
