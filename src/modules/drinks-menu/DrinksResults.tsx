import { notFound } from "next/navigation";
import MainLink from "@/components/core/buttons/MainLink";
import EmptyComponent from "@/components/core/empty/EmptyComponent";
import Pagination from "@/components/core/pagination/Pagination";
import DrinksGrid from "@/components/drinks/DrinksGrid";
import { jsonLdString, menuJsonLd } from "@/lib/seo";
import { MenuState, menuHrefOf } from "@/modules/drinks-menu/menu-state";
import { getDrinks } from "@/services/drink-service";
import { getSiteOrFallback } from "@/services/site-service";
import { t } from "@/translations/translate";

type Props = {
  state: MenuState;
};

/** The drinks of one page of the menu with their heading and the pages; it is the only part that waits for the api */
const DrinksResults = async ({ state }: Props) => {
  const categoryIds = state.category ? [state.category.categoryId] : [];
  const result = await getDrinks(state.page, state.perPage, categoryIds, state.search);

  // the real reason (no connection, timeout, the answer of the api) instead of a general text
  if ("error" in result) {
    const retry = <MainLink href={menuHrefOf(state)} variant="outlined" text={t("drinks:retry")} />;

    return <EmptyComponent text={t("drinks:loadError")} hint={result.error} action={retry} />;
  }

  const { items, meta } = result.drinks;
  const totalPages = meta.totalPages ?? 1;

  // a page past the last one does not exist
  if (state.page > totalPages && state.page > 1) notFound();

  if (!items.length) {
    if (!state.search) return <EmptyComponent text={t("drinks:empty")} />;

    const clearSearch = <MainLink href={menuHrefOf({ ...state, search: "", page: 1 })} variant="outlined" text={t("drinks:clearSearch")} />;

    return <EmptyComponent text={t("drinks:noResults", { search: state.search })} action={clearSearch} />;
  }

  const site = await getSiteOrFallback();
  const firstPosition = (state.page - 1) * meta.itemsPerPage + 1;
  const count = state.search
    ? t("drinks:resultsFor", { count: meta.totalItems, search: state.search })
    : t("drinks:results", { count: meta.totalItems });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(menuJsonLd(site, items, firstPosition)) }} />

      {/* the heading of the results, as in a shop: "Pivo  26 pića" */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-800 pb-3">
        <h2 className="font-display text-2xl text-foreground">{state.category?.name ?? t("drinks:allCategories")}</h2>
        <p className="text-sm text-stone-400">{count}</p>
      </div>

      <DrinksGrid drinks={items} canOrder={site.isOrderingAllowed} />
      <Pagination page={state.page} totalPages={totalPages} buildHref={(page) => menuHrefOf({ ...state, page })} />
    </>
  );
};

export default DrinksResults;
