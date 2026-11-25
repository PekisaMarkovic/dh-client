import { ISite } from "@/interfaces";

/**
 * The content of the site when the api does not answer (it is down and nothing is cached yet). There is nothing of any company in the code:
 * the site is a draft, so a neutral "coming soon" page is shown until the api answers again.
 */
export const fallbackSite: ISite = {
  status: "draft",
  name: "",
  city: null,
  address: null,
  phone: null,
  instagram: null,
  workingHours: null,
  logo: null,
  hero: { title: null, subtitle: null, text: null, buttonText: null, image: null },
  featured: { title: null, buttonText: null, drinks: [] },
  story: { title: null, paragraph1: null, paragraph2: null, buttonText: null, image: null },
  promo: { title: null, text: null, buttonText: null, image: null },
  seo: { title: null, description: null, menuTitle: null, menuDescription: null, image: null },
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
