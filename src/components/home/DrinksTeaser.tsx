import MainLink from "@/components/core/buttons/MainLink";
import SectionTitle from "@/components/core/typography/SectionTitle";
import DrinksGrid from "@/components/drinks/DrinksGrid";
import { ISite } from "@/interfaces";
import { text } from "@/lib/site";

/**
 * The recommended drinks come in pairs (2, 4, ... 10): one per row on a phone, two on a tablet and on a wide screen
 * full rows, so no row is half empty (4 in one row, 6 = 2 x 3, 8 = 2 x 4, 10 = 2 x 5)
 */
const WIDE_COLUMNS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-3",
  8: "lg:grid-cols-4",
  10: "lg:grid-cols-5",
};

const teaserColumns = (count: number) => `grid-cols-1 ${count > 1 ? "sm:grid-cols-2" : ""} ${WIDE_COLUMNS[count] ?? "lg:grid-cols-5"}`;

// the recommended drinks of the landing page (the admin picks them in the dashboard, the first drinks of the menu when none are picked).
// When there are none (the api is down) the section is left out, the landing page must not break
const DrinksTeaser = ({ site }: { site: ISite }) => {
  const { featured } = site;

  if (!featured.drinks.length) return null;

  return (
    <section className="bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20">
        {text(featured.title) && <SectionTitle text={text(featured.title)} />}
        <DrinksGrid
          drinks={featured.drinks}
          columns={teaserColumns(featured.drinks.length)}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          canOrder={site.isOrderingAllowed}
        />
        {text(featured.buttonText) && (
          <div className="flex justify-center">
            <MainLink href="/karta-pica" text={text(featured.buttonText)} />
          </div>
        )}
      </div>
    </section>
  );
};

export default DrinksTeaser;
