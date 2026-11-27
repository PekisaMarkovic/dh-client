import { IPage, ISite } from "@/interfaces";

/**
 * The content of the site when the api does not answer (it is down and nothing is cached yet). There is nothing of any company in the code:
 * the site is a draft, so a neutral "coming soon" page is shown until the api answers again.
 */
export const fallbackSite: ISite = {
  status: "draft",
  isOrderingAllowed: false,
  name: "",
  city: null,
  address: null,
  phone: null,
  instagram: null,
  workingHours: null,
  logo: null,
  pages: [],
};

/**
 * The "coming soon" page is shown instead of the site while the site is a draft.
 * SHOW_DRAFT=true (in .env.local) shows the draft site anyway, for developing it.
 */
export const isMaintenance = (site: ISite) => site.status === "draft" && process.env.SHOW_DRAFT !== "true";

/** An address as it is written on the site: "street number, city" */
export const fullAddress = (site: ISite) => [site.address, site.city].filter(Boolean).join(", ");

export const mapsUrl = (site: ISite) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(site))}`;

/** "+381 15 000 000" -> "tel:+381150000000" */
export const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** A text from the database: trimmed, empty when there is none (the section then does not show it) */
export const text = (value: string | null | undefined) => value?.trim() ?? "";

/** The addresses of the home page and of the drinks menu, every site has both */
export const HOME_SLUG = "";
export const MENU_SLUG = "karta-pica";

/** The published page with this address */
export const findPage = (site: ISite, slug: string): IPage | undefined => site.pages.find((page) => page.slug === slug);

export const pageHref = (page: IPage) => `/${page.slug}`;

/** The pages in the main menu of the header (the admin picks them, the home page never: the logo leads there) */
export const navPages = (site: ISite) => site.pages.filter((page) => page.isInMenu && page.slug !== HOME_SLUG);

/** The other published pages, they are in the footer (e.g. the terms of use) */
export const footerPages = (site: ISite) => site.pages.filter((page) => !page.isInMenu && page.slug !== HOME_SLUG);
