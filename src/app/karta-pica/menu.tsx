import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MainLink from "@/components/core/buttons/MainLink";
import EmptyComponent from "@/components/core/empty/EmptyComponent";
import PageSize from "@/components/core/pagination/PageSize";
import Pagination from "@/components/core/pagination/Pagination";
import Heading from "@/components/core/typography/Heading";
import Paragraph from "@/components/core/typography/Paragraph";
import CategoryFilter from "@/components/drinks/CategoryFilter";
import DrinkSearch from "@/components/drinks/DrinkSearch";
import DrinksGrid from "@/components/drinks/DrinksGrid";
import DrinksGridSkeleton from "@/components/drinks/DrinksGridSkeleton";
import { ICategory } from "@/interfaces";
import { menuJsonLd, jsonLdString, menuSeo, pageMetadata } from "@/lib/seo";
import { DRINKS_PAGE_SIZE, DRINKS_PAGE_SIZES, getCategories, getDrinks } from "@/services/drink-service";
import { getSiteOrFallback } from "@/services/site-service";
import { t } from "@/translations/translate";

/**
 * The menu of the drinks, shared by /karta-pica and /karta-pica/<slug of a category>.
 * Every category is its own page (/karta-pica/vino), for the visitors and for Google.
 */

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
// the slug of the category in the path, undefined on /karta-pica
export type SlugParam = Promise<string | undefined>;

/** What the address of the menu says */
type MenuState = { page: number; perPage: number; category: ICategory | null; search: string };

const PATH = "/karta-pica";

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/** ?page=3 -> 3, anything that is not a whole number from 1 up is the first page */
const parsePage = (value: string | string[] | undefined) => {
  const page = Number(first(value));

  return Number.isInteger(page) && page >= 1 ? page : 1;
};

/** ?perPage=30 -> 30, only the offered sizes, anything else is the default */
const parsePerPage = (value: string | string[] | undefined) => {
  const size = Number(first(value));

  return (DRINKS_PAGE_SIZES as readonly number[]).includes(size) ? size : DRINKS_PAGE_SIZE;
};

/** The category of the path, null on /karta-pica; a slug the menu does not have is a 404 */
const parseCategory = (slug: string | undefined, all: ICategory[]) => {
  if (!slug) return null;

  return all.find((c) => c.slug === slug) ?? notFound();
};

const readState = async (searchParams: SearchParams, slugParam: SlugParam, all: ICategory[]): Promise<MenuState> => {
  const params = await searchParams;

  return {
    page: parsePage(params.page),
    perPage: parsePerPage(params.perPage),
    category: parseCategory(await slugParam, all),
    // the api searches at most 100 characters
    search: (first(params.pretraga) ?? "").trim().slice(0, 100),
  };
};

/** /karta-pica/vino, or /karta-pica for all the drinks */
const pathOf = (category: ICategory | null) => (category ? `${PATH}/${category.slug}` : PATH);

/** The address of a state of the menu, the defaults are left out */
const hrefOf = ({ page, perPage, category, search }: MenuState) => {
  const query = new URLSearchParams();

  if (search) query.set("pretraga", search);
  if (page > 1) query.set("page", String(page));
  if (perPage !== DRINKS_PAGE_SIZE) query.set("perPage", String(perPage));

  return query.size ? `${pathOf(category)}?${query}` : pathOf(category);
};

export async function menuMetadata(searchParams: SearchParams, slugParam: SlugParam): Promise<Metadata> {
  const all = await getCategories();
  const state = await readState(searchParams, slugParam, all);
  const site = await getSiteOrFallback();
  const { title, description } = menuSeo(site);
  // "Karta pića: Vino (Strana 2)"
  const fullTitle = [state.category ? `${title}: ${state.category.name}` : title, state.page > 1 ? `(${t("g:pagination.page", { page: state.page })})` : ""]
    .filter(Boolean)
    .join(" ");
  const metadata = pageMetadata(site, { title: fullTitle, description, path: hrefOf(state) });
  // Google indexes the menu and the page of every category; a search or another page size shows the same drinks again
  const isIndexed = !state.search && state.perPage === DRINKS_PAGE_SIZE;

  return isIndexed ? metadata : { ...metadata, robots: { index: false } };
}

// the drinks of one page, it is the only part that waits for the api
async function DrinksPage({ state }: { state: MenuState }) {
  const result = await getDrinks(
    state.page,
    state.perPage,
    state.category ? [state.category.categoryId] : [],
    state.search,
  );

  // the real reason (no connection, timeout, the answer of the api) instead of a general text
  if ("error" in result) {
    return <EmptyComponent text={t("drinks:loadError")} hint={result.error} action={<MainLink href={hrefOf(state)} variant="outlined" text={t("drinks:retry")} />} />;
  }

  const { drinks } = result;
  const totalPages = drinks.meta.totalPages ?? 1;

  // a page past the last one does not exist
  if (state.page > totalPages && state.page > 1) notFound();

  if (!drinks.items.length) {
    return state.search ? (
      <EmptyComponent
        text={t("drinks:noResults", { search: state.search })}
        action={<MainLink href={hrefOf({ ...state, search: "", page: 1 })} variant="outlined" text={t("drinks:clearSearch")} />}
      />
    ) : (
      <EmptyComponent text={t("drinks:empty")} />
    );
  }

  const site = await getSiteOrFallback();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(menuJsonLd(site, drinks.items, (state.page - 1) * drinks.meta.itemsPerPage + 1)) }} />
      {/* the heading of the results, as in a shop: "Pivo  26 pića" */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-800 pb-3">
        <h2 className="font-display text-2xl text-foreground">{state.category?.name ?? t("drinks:allCategories")}</h2>
        <p className="text-sm text-stone-400">
          {state.search ? t("drinks:resultsFor", { count: drinks.meta.totalItems, search: state.search }) : t("drinks:results", { count: drinks.meta.totalItems })}
        </p>
      </div>
      <DrinksGrid drinks={drinks.items} canOrder={site.isOrderingAllowed} />
      <Pagination page={state.page} totalPages={totalPages} buildHref={(page) => hrefOf({ ...state, page })} />
    </>
  );
}

// reads the address; the categories, the search and the page sizes stay on the screen while the drinks of a new page load
async function DrinksMenu({ searchParams, slugParam }: { searchParams: SearchParams; slugParam: SlugParam }) {
  const all = await getCategories();
  const state = await readState(searchParams, slugParam, all);
  // what the search form keeps (the category is in its path): a new search starts again on the first page
  const keep: Record<string, string> = state.perPage !== DRINKS_PAGE_SIZE ? { perPage: String(state.perPage) } : {};

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-10">
      <aside className="lg:sticky lg:top-24">
        <CategoryFilter
          label={t("drinks:categories")}
          allLabel={t("drinks:allCategories")}
          categories={all}
          value={state.category?.categoryId ?? null}
          buildHref={(category) => hrefOf({ ...state, category, page: 1 })}
        />
      </aside>

      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <DrinkSearch action={pathOf(state.category)} value={state.search} label={t("drinks:search")} placeholder={t("drinks:searchPlh")} keep={keep} />
          <PageSize label={t("drinks:perPage")} value={state.perPage} options={DRINKS_PAGE_SIZES} buildHref={(perPage) => hrefOf({ ...state, perPage, page: 1 })} />
        </div>

        {/* a new key on every change: the skeleton shows while the next page loads, not the old drinks */}
        <Suspense key={hrefOf(state)} fallback={<DrinksGridSkeleton count={state.perPage} />}>
          <DrinksPage state={state} />
        </Suspense>
      </div>
    </div>
  );
}

export function MenuPage({ searchParams, slugParam }: { searchParams: SearchParams; slugParam: SlugParam }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12">
      <header className="flex flex-col gap-2">
        <Heading as="h1" size="4xl" text={t("drinks:title")} />
        <Paragraph text={t("drinks:subtitle")} />
      </header>
      <Suspense fallback={<DrinksGridSkeleton count={DRINKS_PAGE_SIZE} withToolbar />}>
        <DrinksMenu searchParams={searchParams} slugParam={slugParam} />
      </Suspense>
    </div>
  );
}
