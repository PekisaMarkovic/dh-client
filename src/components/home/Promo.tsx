import MainLink from "@/components/core/buttons/MainLink";
import { BottleIcon } from "@/components/core/icons";
import SiteImage from "@/components/core/SiteImage";
import Heading from "@/components/core/typography/Heading";
import Paragraph from "@/components/core/typography/Paragraph";
import { ISite } from "@/interfaces";
import { text } from "@/lib/site";

// text on the left, a picture on the right, on a background that fades to black
const Promo = ({ site }: { site: ISite }) => {
  const { promo } = site;

  return (
    <section className="bg-gradient-to-b from-black to-brand-dark">
      <div className="mx-auto grid max-w-4xl items-center gap-10 px-4 py-20 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          {text(promo.title) && <Heading text={text(promo.title)} size="3xl" color="white" />}
          {text(promo.text) && <Paragraph size="lg" color="white" text={text(promo.text)} />}
          {text(promo.buttonText) && (
            <div>
              <MainLink href="/#contact-form" text={text(promo.buttonText)} />
            </div>
          )}
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-gradient-to-br from-amber-400 via-orange-500 to-red-800 shadow-xl">
          {promo.image ? (
            <SiteImage image={promo.image} fallbackAlt={site.name} sizes="(min-width: 768px) 400px, 100vw" />
          ) : (
            <div aria-hidden="true" className="flex h-full items-center justify-center text-black/30">
              <BottleIcon className="h-32 w-32" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Promo;
