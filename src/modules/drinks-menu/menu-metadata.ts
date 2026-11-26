import type { Metadata } from "next";
import { menuSeo, pageMetadata } from "@/lib/seo";
import { menuHrefOf, readMenuState, SearchParams, SlugParam } from "@/modules/drinks-menu/menu-state";
import { DRINKS_PAGE_SIZE, getCategories } from "@/services/drink-service";
import { getSiteOrFallback } from "@/services/site-service";
import { t } from "@/translations/translate";

/** The title and the canonical address of a page of the menu, e.g. "Karta pića: Vino (Strana 2)" */
export const menuMetadata = async (searchParams: SearchParams, slugParam: SlugParam): Promise<Metadata> => {
  const categories = await getCategories();
  const state = await readMenuState(searchParams, slugParam, categories);
  const site = await getSiteOrFallback();
  const { title, description } = menuSeo(site);

  const fullTitle = [
    state.category ? `${title}: ${state.category.name}` : title,
    state.page > 1 ? `(${t("g:pagination.page", { page: state.page })})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const metadata = pageMetadata(site, { title: fullTitle, description, path: menuHrefOf(state) });

  // Google indexes the menu and the page of every category; a search or another page size shows the same drinks again
  const isIndexed = !state.search && state.perPage === DRINKS_PAGE_SIZE;

  return isIndexed ? metadata : { ...metadata, robots: { index: false } };
};
