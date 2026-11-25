import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MainLink from "@/components/core/buttons/MainLink";
import EmptyComponent from "@/components/core/empty/EmptyComponent";
import Pagination from "@/components/core/pagination/Pagination";
import Heading from "@/components/core/typography/Heading";
import Paragraph from "@/components/core/typography/Paragraph";
import DrinksGrid from "@/components/drinks/DrinksGrid";
import { menuJsonLd, jsonLdString, menuSeo, pageMetadata } from "@/lib/seo";
import { getDrinks } from "@/services/drink-service";
import { getSiteOrFallback } from "@/services/site-service";
import { t } from "@/translations/translate";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const PATH = "/karta-pica";

/** ?page=3 -> 3, anything that is not a whole number from 1 up is the first page */
const parsePage = (value: string | string[] | undefined) => {
  const page = Number(Array.isArray(value) ? value[0] : value);

  return Number.isInteger(page) && page >= 1 ? page : 1;
};

const hrefOf = (page: number) => (page === 1 ? PATH : `${PATH}?page=${page}`);

// every page of the menu has its own title and address (canonical), so Google indexes them one by one
export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const page = parsePage((await searchParams).page);
  const site = await getSiteOrFallback();
  const { title, description } = menuSeo(site);

  return pageMetadata(site, { title: page === 1 ? title : `${title} (${t("g:pagination.page", { page })})`, description, path: hrefOf(page) });
}

// the drinks of one page, it is the only part that waits for the api
async function DrinksPage({ searchParams }: { searchParams: SearchParams }) {
  const page = parsePage((await searchParams).page);

  const result = await getDrinks(page);

  // the real reason (no connection, timeout, the answer of the api) instead of a general text
  if ("error" in result) {
    return <EmptyComponent text={t("drinks:loadError")} hint={result.error} action={<MainLink href={hrefOf(page)} variant="outlined" text={t("drinks:retry")} />} />;
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
      <Pagination page={page} totalPages={totalPages} buildHref={hrefOf} />
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
      <Suspense fallback={<Paragraph text="..." />}>
        <DrinksPage searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
