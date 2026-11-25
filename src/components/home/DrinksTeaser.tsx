import MainLink from "@/components/core/buttons/MainLink";
import SectionTitle from "@/components/core/typography/SectionTitle";
import DrinksGrid from "@/components/drinks/DrinksGrid";
import { ISite } from "@/interfaces";
import { text } from "@/lib/site";

// the recommended drinks of the landing page (the admin picks them in the dashboard, the first drinks of the menu when none are picked).
// When there are none (the api is down) the section is left out, the landing page must not break
const DrinksTeaser = ({ site }: { site: ISite }) => {
  const { featured } = site;

  if (!featured.drinks.length) return null;

  return (
    <section className="bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20">
        {text(featured.title) && <SectionTitle text={text(featured.title)} />}
        <DrinksGrid drinks={featured.drinks} />
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
