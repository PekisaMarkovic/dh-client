import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { isMaintenance } from "@/lib/site";
import { getSiteOrFallback } from "@/services/site-service";

// a draft site is closed for the search engines until it is published
export default async function robots(): Promise<MetadataRoute.Robots> {
  if (isMaintenance(await getSiteOrFallback())) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
