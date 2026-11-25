import type { NextConfig } from "next";

// debug: names only, never values (secrets). Remove after the cache issue is solved.
console.log("[build env names]", Object.keys(process.env).sort().join(", "));

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
