import type { Metadata } from "next";
import { IDrink, IImage, ISite } from "@/interfaces";
import { findPage, HOME_SLUG, MENU_SLUG, text } from "@/lib/site";
import { DEFAULT_LANGUAGE, OG_LOCALE } from "@/translations/config";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4350").replace(/\/+$/, "");

const ogImages = (image: IImage | null, fallbackAlt: string) =>
  image ? [{ url: image.url, width: image.width, height: image.height, alt: image.altText || fallbackAlt }] : undefined;

/** The picture shown when a page is shared: its own, or the one of the home page */
const shareImage = (site: ISite, slug: string) => findPage(site, slug)?.seo.image ?? findPage(site, HOME_SLUG)?.seo.image ?? null;

/** The title, the description, the pictures and the canonical address of a page, for Google and for the social networks (Open Graph, Twitter) */
export const pageMetadata = (site: ISite, page: { title: string; description?: string; path: string; slug?: string }): Metadata => {
  const image = shareImage(site, page.slug ?? HOME_SLUG);

  return {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: page.title,
    description: page.description,
    url: page.path,
    locale: OG_LOCALE[DEFAULT_LANGUAGE],
    images: ogImages(image, site.name),
  },
  twitter: {
    card: image ? "summary_large_image" : "summary",
    title: page.title,
    description: page.description,
    images: image ? [image.url] : undefined,
  },
  };
};

/** The title and the description of a page, from the dashboard (tab SEO of the page). The name of the site is the title until it is filled in */
export const pageSeo = (site: ISite, slug: string) => {
  const seo = findPage(site, slug)?.seo;

  return { title: text(seo?.title) || site.name, description: text(seo?.description) || undefined };
};

export const homeSeo = (site: ISite) => pageSeo(site, HOME_SLUG);

export const menuSeo = (site: ISite) => pageSeo(site, MENU_SLUG);

/** The icon of the browser tab and of Google results: the logo made square (/site-icon), a default icon until a logo is uploaded */
export const siteIcons = (site: ISite): Metadata["icons"] => {
  if (!site.logo) return { icon: "/favicon.ico" };

  // a new logo is a new address, so browsers and Google load it again
  const url = `/site-icon?v=${encodeURIComponent(site.logo.url.split("/").pop() ?? "")}`;

  return { icon: [{ url, type: "image/png", sizes: "192x192" }], shortcut: [url], apple: [url] };
};

// a JSON-LD block is put in a <script>, so "<" must never end it
export const jsonLdString = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

/** The picture of the first hero of the home page */
const heroImage = (site: ISite) => findPage(site, HOME_SLUG)?.sections.find((section) => section.type === "hero")?.image;

/** The local business (the store) for Google: name, address, phone, logo, pictures and the social page */
export const localBusinessJsonLd = (site: ISite) => ({
  "@context": "https://schema.org",
  "@type": "LiquorStore",
  "@id": `${siteUrl}/#store`,
  name: site.name,
  url: siteUrl,
  ...(homeSeo(site).description ? { description: homeSeo(site).description } : {}),
  ...(site.phone ? { telephone: site.phone } : {}),
  address: { "@type": "PostalAddress", streetAddress: site.address ?? undefined, addressLocality: site.city ?? undefined, addressCountry: "RS" },
  ...(site.logo ? { logo: site.logo.url } : {}),
  image: [shareImage(site, HOME_SLUG)?.url, heroImage(site)?.url, site.logo?.url].filter(Boolean),
  ...(site.instagram ? { sameAs: [site.instagram] } : {}),
});

/** The page of the drinks menu for Google: a list of the drinks with their prices */
export const menuJsonLd = (site: ISite, drinks: IDrink[], firstPosition: number) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: menuSeo(site).title,
  itemListElement: drinks.map((drink, index) => ({
    "@type": "ListItem",
    position: firstPosition + index,
    item: {
      "@type": "Product",
      name: drink.name,
      ...(drink.image ? { image: drink.image.url } : {}),
      offers: {
        "@type": "Offer",
        price: drink.price,
        priceCurrency: "RSD",
        availability: drink.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    },
  })),
});
