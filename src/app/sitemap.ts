import type { MetadataRoute } from "next";
import { isMaintenance } from "@/lib/site";
import { siteUrl } from "@/lib/seo";
import { getCategories, getDrinks } from "@/services/drink-service";
import { getSiteOrFallback } from "@/services/site-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // nothing to index while the site is a draft
  if (isMaintenance(await getSiteOrFallback())) return [];

  // every page of the drinks menu is its own address, so Google finds all the drinks
  const first = await getDrinks(1);
  const totalPages = "drinks" in first ? (first.drinks.meta.totalPages ?? 1) : 1;
  const menu = Array.from({ length: totalPages }, (_, index) => ({ url: index === 0 ? `${siteUrl}/karta-pica` : `${siteUrl}/karta-pica?page=${index + 1}` }));

  // every category has its own page (/karta-pica/vino), the first page of it is enough for Google to find the rest
  const categories = (await getCategories()).map((category) => ({ url: `${siteUrl}/karta-pica/${category.slug}` }));

  // no lastModified: the current time is not cacheable and the pages change when the admin changes the site
  return [{ url: siteUrl }, ...menu, ...categories];
}
