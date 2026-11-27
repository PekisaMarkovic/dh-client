import { ComponentType } from "react";
import Heading from "@/components/core/typography/Heading";
import DrinksTeaser from "@/components/sections/DrinksTeaser";
import Hero from "@/components/sections/Hero";
import Info from "@/components/sections/Info";
import Story from "@/components/sections/Story";
import TextSection from "@/components/sections/TextSection";
import { IPage, ISection, ISite, SectionType } from "@/interfaces";
import { HOME_SLUG } from "@/lib/site";

/** One component per kind of section: a new kind is added here and TypeScript asks for its component */
const SECTIONS: { [Type in SectionType]: ComponentType<{ section: Extract<ISection, { type: Type }>; site: ISite }> } = {
  hero: Hero,
  featured: DrinksTeaser,
  story: Story,
  info: Info,
  text: TextSection,
};

/**
 * The sections of a page in the order the admin set in the dashboard (a kind the site does not know yet is left out).
 * Every page has exactly one h1: the title of its first hero, or, without a hero, the name of the page on top
 */
const PageSections = ({ page, site }: { page: IPage; site: ISite }) => {
  const mainHero = page.sections.find((section) => section.type === "hero");

  return (
    <>
      {!mainHero && (
        <div className="mx-auto max-w-3xl px-4 pt-16">
          <Heading as="h1" size="4xl" text={page.slug === HOME_SLUG ? site.name : page.title} />
        </div>
      )}
      {page.sections.map((section) => {
        const Section = SECTIONS[section.type] as ComponentType<{ section: ISection; site: ISite; isMain?: boolean }> | undefined;

        return Section ? <Section key={section.sectionId} section={section} site={site} isMain={section === mainHero} /> : null;
      })}
    </>
  );
};

export default PageSections;
