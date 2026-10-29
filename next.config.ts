import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // STATIC_EXPORT=1 builds plain files into out/ for static hosts (Netlify). Every route is prerendered.
  output: process.env.STATIC_EXPORT ? "export" : undefined,
};

export default nextConfig;
