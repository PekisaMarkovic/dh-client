import { ComponentType } from "react";
import DrinksTeaser from "@/components/sections/DrinksTeaser";
import Hero from "@/components/sections/Hero";
import Info from "@/components/sections/Info";
import Story from "@/components/sections/Story";
import { IPage, ISection, ISite, SectionType } from "@/interfaces";

/** One component per kind of section: a new kind is added here and TypeScript asks for its component */
const SECTIONS: { [Type in SectionType]: ComponentType<{ section: Extract<ISection, { type: Type }>; site: ISite }> } = {
  hero: Hero,
  featured: DrinksTeaser,
  story: Story,
  info: Info,
};

/** The sections of a page in the order the admin set in the dashboard (a kind the site does not know yet is left out) */
const PageSections = ({ page, site }: { page: IPage; site: ISite }) =>
  page.sections.map((section) => {
    const Section = SECTIONS[section.type] as ComponentType<{ section: ISection; site: ISite }> | undefined;

    return Section ? <Section key={section.sectionId} section={section} site={site} /> : null;
  });

export default PageSections;
