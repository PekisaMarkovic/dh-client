import type { Metadata } from "next";
import { IDrink, IImage, ISite } from "@/interfaces";
import { text } from "@/lib/site";
import { DEFAULT_LANGUAGE, OG_LOCALE } from "@/translations/config";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4350").replace(/\/+$/, "");

const ogImages = (image: IImage | null, fallbackAlt: string) =>
  image ? [{ url: image.url, width: image.width, height: image.height, alt: image.altText || fallbackAlt }] : undefined;

/** The title, the description, the pictures and the canonical address of a page, for Google and for the social networks (Open Graph, Twitter) */
export const pageMetadata = (site: ISite, page: { title: string; description?: string; path: string }): Metadata => ({
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
    images: ogImages(site.seo.image, site.name),
  },
  twitter: {
    card: site.seo.image ? "summary_large_image" : "summary",
    title: page.title,
    description: page.description,
    images: site.seo.image ? [site.seo.image.url] : undefined,
  },
});

/** The title and the description of the home page, from the dashboard (tab SEO). The name of the site is the title until it is filled in */
export const homeSeo = (site: ISite) => ({
  title: text(site.seo.title) || site.name,
  description: text(site.seo.description) || undefined,
});

/** The title and the description of the menu page */
export const menuSeo = (site: ISite) => ({
  title: text(site.seo.menuTitle) || site.name,
  description: text(site.seo.menuDescription) || undefined,
});

/** The icon of the browser tab: the logo of the site, a default icon until a logo is uploaded */
export const siteIcons = (site: ISite): Metadata["icons"] =>
  site.logo ? { icon: [{ url: site.logo.url, type: "image/webp" }], shortcut: [site.logo.url], apple: [site.logo.url] } : { icon: "/favicon.ico" };

// a JSON-LD block is put in a <script>, so "<" must never end it
export const jsonLdString = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

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
  image: [site.seo.image?.url, site.hero.image?.url, site.logo?.url].filter(Boolean),
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
