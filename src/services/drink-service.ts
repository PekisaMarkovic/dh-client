import { cacheLife, cacheTag } from "next/cache";
import DrinkApis from "@/api/drinks";
import { IDrink, Paginated } from "@/interfaces";
import { getApi } from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";

export const DRINKS_PAGE_SIZE = 10;

// a page of drinks, or why it could not be loaded (the real reason: no connection, timeout, the answer of the api)
export type DrinksResult = { drinks: Paginated<IDrink> } | { error: string };

/**
 * One page of the drinks of the company of this site (sorted by name).
 * The answer is cached for a few minutes and shared by all visitors, so the api is not asked on every visit.
 *
 * It never throws: an error inside a cached function would fail `next build` when the api is down. A failed answer is
 * an `error` and it is cached for a few seconds only.
 */
export async function getDrinks(page = 1, limit = DRINKS_PAGE_SIZE): Promise<DrinksResult> {
  "use cache";
  cacheLife("minutes");
  cacheTag("drinks");

  try {
    const { data } = await getApi().get<Paginated<IDrink>>(DrinkApis.getDrinks(), { params: { page, limit } });

    return { drinks: data };
  } catch (error) {
    cacheLife("seconds");

    return { error: getApiErrorMessage(error) };
  }
}
