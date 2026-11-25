import { cacheLife, cacheTag } from "next/cache";
import SiteApis from "@/api/site";
import { ISite } from "@/interfaces";
import { getApi } from "@/lib/api";
import { fallbackSite } from "@/lib/site";

/**
 * The content of this site from the database (texts, pictures, contact data, the recommended drinks).
 * The answer is cached for a few minutes and shared by all visitors, so a change in the dashboard shows within a minute or so
 * (or at once: the api calls /api/revalidate after a change).
 *
 * It never throws: an error inside a cached function would fail `next build` when the api is down. A failed answer is
 * null and it is cached for a few seconds only, so the next visit asks the api again.
 */
async function getSite(): Promise<ISite | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("site");

  try {
    const { data } = await getApi().get<ISite>(SiteApis.getSite());

    return data;
  } catch {
    cacheLife("seconds");

    return null;
  }
}

/** The site, or the neutral fallback (a draft, nothing of any company) when the api does not answer */
export const getSiteOrFallback = async (): Promise<ISite> => (await getSite()) ?? fallbackSite;
