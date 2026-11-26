import { cacheLife, cacheTag } from "next/cache";
import DrinkApis from "@/api/drinks";
import { ICategory, IDrink, Paginated } from "@/interfaces";
import { getApi } from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";

export const DRINKS_PAGE_SIZE = 20;
/** the page sizes a visitor can pick on the menu (the api allows at most 100) */
export const DRINKS_PAGE_SIZES = [10, 20, 30, 40, 50] as const;

// a page of drinks, or why it could not be loaded (the real reason: no connection, timeout, the answer of the api)
export type DrinksResult = { drinks: Paginated<IDrink> } | { error: string };

/**
 * One page of the drinks of the company of this site (sorted by name).
 * The answer is cached for a few minutes and shared by all visitors, so the api is not asked on every visit.
 *
 * It never throws: an error inside a cached function would fail `next build` when the api is down. A failed answer is
 * an `error` and it is cached for a few seconds only.
 */
/** categoryIds: the drinks in any of these categories (sorted, so the same choice is the same cached entry) */
export async function getDrinks(page = 1, limit = DRINKS_PAGE_SIZE, categoryIds: number[] = [], search = ""): Promise<DrinksResult> {
  "use cache";
  cacheLife("minutes");
  cacheTag("drinks");

  try {
    const { data } = await getApi().get<Paginated<IDrink>>(DrinkApis.getDrinks(), { params: { page, limit, categoryIds: categoryIds.length ? categoryIds.join(",") : undefined, search: search || undefined } });

    return { drinks: data };
  } catch (error) {
    cacheLife("seconds");

    return { error: getApiErrorMessage(error) };
  }
}

/**
 * The categories of the menu that have drinks, sorted by name (the filter of the menu).
 * Cached like the drinks; when the api does not answer the menu simply has no filter (an empty list, a few seconds).
 */
export async function getCategories(): Promise<ICategory[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("drinks");

  try {
    const { data } = await getApi().get<ICategory[]>(DrinkApis.getCategories());

    return data;
  } catch {
    cacheLife("seconds");

    return [];
  }
}
