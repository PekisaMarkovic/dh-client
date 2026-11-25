import type { NextConfig } from "next";

// debug: public values, secrets only as set/length. Remove after the cache issue is solved.
for (const k of ["API_URL", "NEXT_PUBLIC_SITE_URL", "SHOW_DRAFT", "IMAGE_HOSTS"]) console.log(`[build env] ${k}=${process.env[k] ?? "(not set)"}`);
for (const k of ["ACCESS_KEY", "REVALIDATE_SECRET"]) console.log(`[build env] ${k}: ${process.env[k] ? `set (${process.env[k]!.length} chars)` : "(not set)"}`);

// the hosts the drink images are served from (Cloudflare R2 public url or a custom domain), IMAGE_HOSTS adds more
const imageHosts = ["**.r2.dev", ...(process.env.IMAGE_HOSTS ?? "").split(",").map((h) => h.trim()).filter(Boolean)];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageHosts.map((hostname) => ({ protocol: "https", hostname })),
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
