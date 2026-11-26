import { Suspense } from "react";
import PageSize from "@/components/core/pagination/PageSize";
import CategoryFilter from "@/components/drinks/CategoryFilter";
import DrinkSearch from "@/components/drinks/DrinkSearch";
import DrinksGridSkeleton from "@/components/drinks/DrinksGridSkeleton";
import DrinksResults from "@/modules/drinks-menu/DrinksResults";
import { menuHrefOf, menuPathOf, readMenuState, SearchParams, SlugParam } from "@/modules/drinks-menu/menu-state";
import { DRINKS_PAGE_SIZE, DRINKS_PAGE_SIZES, getCategories } from "@/services/drink-service";
import { t } from "@/translations/translate";

type Props = {
  searchParams: SearchParams;
  slugParam: SlugParam;
};

/**
 * The shop of the menu: the categories on the side, the search and the page sizes on top, the drinks below.
 * It reads the address; everything but the drinks stays on the screen while a new page loads.
 */
const DrinksMenu = async ({ searchParams, slugParam }: Props) => {
  const categories = await getCategories();
  const state = await readMenuState(searchParams, slugParam, categories);
  // what the search form keeps (the category is in its path): a new search starts again on the first page
  const keep: Record<string, string> = state.perPage !== DRINKS_PAGE_SIZE ? { perPage: String(state.perPage) } : {};

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-10">
      <aside className="lg:sticky lg:top-[calc(var(--header-height,0px)+1.5rem)]">
        <CategoryFilter
          label={t("drinks:categories")}
          allLabel={t("drinks:allCategories")}
          categories={categories}
          value={state.category?.categoryId ?? null}
          buildHref={(category) => menuHrefOf({ ...state, category, page: 1 })}
        />
      </aside>

      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <DrinkSearch
            action={menuPathOf(state.category)}
            value={state.search}
            label={t("drinks:search")}
            placeholder={t("drinks:searchPlh")}
            keep={keep}
          />
          <PageSize
            label={t("drinks:perPage")}
            value={state.perPage}
            options={DRINKS_PAGE_SIZES}
            buildHref={(perPage) => menuHrefOf({ ...state, perPage, page: 1 })}
          />
        </div>

        {/* a new key on every change: the skeleton shows while the next page loads, not the old drinks */}
        <Suspense key={menuHrefOf(state)} fallback={<DrinksGridSkeleton count={state.perPage} />}>
          <DrinksResults state={state} />
        </Suspense>
      </div>
    </div>
  );
};

export default DrinksMenu;
