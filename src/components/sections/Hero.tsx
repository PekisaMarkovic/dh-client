import MainLink from "@/components/core/buttons/MainLink";
import SiteImage from "@/components/core/SiteImage";
import Heading from "@/components/core/typography/Heading";
import Paragraph from "@/components/core/typography/Paragraph";
import { IHeroSection, ISite } from "@/interfaces";
import { text } from "@/lib/site";

// a big title in two colors over the background picture (a dark layer keeps the text readable), a warm glow when there is no picture
const Hero = ({ section: hero, site }: { section: IHeroSection; site: ISite }) => {
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      {hero.image ? (
        <>
          <SiteImage image={hero.image} fallbackAlt={site.name} sizes="100vw" priority />
          <div aria-hidden="true" className="absolute inset-0 bg-black/60" />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(245,158,11,0.22),transparent_65%)]" />
      )}
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-24 text-center sm:py-36">
        {text(hero.title) && (
          <Heading as="h1" size="6xl" color="brand" align="center" text={text(hero.title)} className="[text-shadow:3px_3px_0_rgba(194,65,12,0.6)]" />
        )}
        {text(hero.subtitle) && (
          <p className="font-display text-4xl text-accent [text-shadow:3px_3px_0_rgba(0,0,0,0.5)] sm:text-7xl">{text(hero.subtitle)}</p>
        )}
        {text(hero.text) && <Paragraph size="lg" color="white" align="center" className="mt-2 max-w-xl opacity-80" text={text(hero.text)} />}
        {text(hero.buttonText) && <MainLink href="/karta-pica" text={text(hero.buttonText)} size="large" className="mt-6" />}
      </div>
    </section>
  );
};

export default Hero;
