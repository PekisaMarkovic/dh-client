import { Suspense } from "react";
import Heading from "@/components/core/typography/Heading";
import Paragraph from "@/components/core/typography/Paragraph";
import DrinksGridSkeleton from "@/components/drinks/DrinksGridSkeleton";
import DrinksMenu from "@/modules/drinks-menu/DrinksMenu";
import { SearchParams, SlugParam } from "@/modules/drinks-menu/menu-state";
import { DRINKS_PAGE_SIZE } from "@/services/drink-service";
import { t } from "@/translations/translate";

type Props = {
  searchParams: SearchParams;
  slugParam: SlugParam;
};

/** The page of the drinks menu (/karta-pica and /karta-pica/<category>) */
const DrinksMenuPage = ({ searchParams, slugParam }: Props) => (
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

export default DrinksMenuPage;
