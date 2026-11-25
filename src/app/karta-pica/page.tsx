import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MainLink from "@/components/core/buttons/MainLink";
import EmptyComponent from "@/components/core/empty/EmptyComponent";
import PageSize from "@/components/core/pagination/PageSize";
import Pagination from "@/components/core/pagination/Pagination";
import Heading from "@/components/core/typography/Heading";
import Paragraph from "@/components/core/typography/Paragraph";
import DrinksGrid from "@/components/drinks/DrinksGrid";
import DrinksGridSkeleton from "@/components/drinks/DrinksGridSkeleton";
import { menuJsonLd, jsonLdString, menuSeo, pageMetadata } from "@/lib/seo";
import { DRINKS_PAGE_SIZE, DRINKS_PAGE_SIZES, getDrinks } from "@/services/drink-service";
import { getSiteOrFallback } from "@/services/site-service";
import { t } from "@/translations/translate";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const PATH = "/karta-pica";

/** ?page=3 -> 3, anything that is not a whole number from 1 up is the first page */
const parsePage = (value: string | string[] | undefined) => {
  const page = Number(Array.isArray(value) ? value[0] : value);

  return Number.isInteger(page) && page >= 1 ? page : 1;
};

/** ?perPage=30 -> 30, only the offered sizes, anything else is the default */
const parsePerPage = (value: string | string[] | undefined) => {
  const size = Number(Array.isArray(value) ? value[0] : value);

  return (DRINKS_PAGE_SIZES as readonly number[]).includes(size) ? size : DRINKS_PAGE_SIZE;
};

/** /karta-pica, /karta-pica?page=3, /karta-pica?page=3&perPage=50 (the defaults are left out) */
const hrefOf = (page: number, perPage = DRINKS_PAGE_SIZE) => {
  const query = new URLSearchParams();

  if (page > 1) query.set("page", String(page));
  if (perPage !== DRINKS_PAGE_SIZE) query.set("perPage", String(perPage));

  return query.size ? `${PATH}?${query}` : PATH;
};

// every page of the menu has its own title and address (canonical), so Google indexes them one by one
export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parsePage(params.page);
  const perPage = parsePerPage(params.perPage);
  const site = await getSiteOrFallback();
  const { title, description } = menuSeo(site);
  const metadata = pageMetadata(site, { title: page === 1 ? title : `${title} (${t("g:pagination.page", { page })})`, description, path: hrefOf(page, perPage) });

  // another page size shows the same drinks again: Google indexes only the default pages (the sitemap lists them)
  return perPage === DRINKS_PAGE_SIZE ? metadata : { ...metadata, robots: { index: false } };
}

// the drinks of one page, it is the only part that waits for the api
async function DrinksPage({ page, perPage }: { page: number; perPage: number }) {
  const result = await getDrinks(page, perPage);

  // the real reason (no connection, timeout, the answer of the api) instead of a general text
  if ("error" in result) {
    return (
      <EmptyComponent text={t("drinks:loadError")} hint={result.error} action={<MainLink href={hrefOf(page, perPage)} variant="outlined" text={t("drinks:retry")} />} />
    );
  }

  const { drinks } = result;

  const totalPages = drinks.meta.totalPages ?? 1;

  // a page past the last one does not exist
  if (page > totalPages && page > 1) notFound();

  if (!drinks.items.length) return <EmptyComponent text={t("drinks:empty")} />;

  const site = await getSiteOrFallback();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(menuJsonLd(site, drinks.items, (page - 1) * drinks.meta.itemsPerPage + 1)) }} />
      <DrinksGrid drinks={drinks.items} />
      <Pagination page={page} totalPages={totalPages} buildHref={(p) => hrefOf(p, perPage)} />
    </>
  );
}

// reads the address; the page sizes stay on the screen while the drinks of a new page load
async function DrinksMenu({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const perPage = parsePerPage(params.perPage);

  return (
    <>
      {/* a new size starts again on the first page */}
      <PageSize label={t("drinks:perPage")} value={perPage} options={DRINKS_PAGE_SIZES} buildHref={(size) => hrefOf(1, size)} />
      {/* a new key on every page and size: the skeleton shows while the next page loads, not the old drinks */}
      <Suspense key={`${page}-${perPage}`} fallback={<DrinksGridSkeleton count={perPage} />}>
        <DrinksPage page={page} perPage={perPage} />
      </Suspense>
    </>
  );
}

export default function DrinksMenuPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12">
      <header className="flex flex-col gap-2">
        <Heading as="h1" size="4xl" text={t("drinks:title")} />
        <Paragraph text={t("drinks:subtitle")} />
      </header>
      <Suspense fallback={<DrinksGridSkeleton count={DRINKS_PAGE_SIZE} withToolbar />}>
        <DrinksMenu searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
