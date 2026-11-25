export interface IImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

// what the api shows to a site about a drink (GET /public/drinks)
export interface IDrink {
  drinkId: number;
  name: string;
  price: number;
  inStock: boolean;
  image: IImage | null;
}

export interface PaginationMeta {
  totalItems?: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PaginationMeta;
}

// the content of the site (GET /public/site), a text that is null means "use the default text of the site"
// draft: the site shows a "coming soon" page and is hidden from Google, published: the real site
export type SiteStatus = "draft" | "published";

export interface ISite {
  status: SiteStatus;
  name: string;
  city: string | null;
  address: string | null;
  phone: string | null;
  instagram: string | null;
  workingHours: string | null;
  logo: IImage | null;
  hero: { title: string | null; subtitle: string | null; text: string | null; buttonText: string | null; image: IImage | null };
  featured: { title: string | null; buttonText: string | null; drinks: IDrink[] };
  story: { title: string | null; paragraph1: string | null; paragraph2: string | null; buttonText: string | null; image: IImage | null };
  promo: { title: string | null; text: string | null; buttonText: string | null; image: IImage | null };
  // what Google and the social networks show, image is the picture shown when the site is shared
  seo: { title: string | null; description: string | null; menuTitle: string | null; menuDescription: string | null; image: IImage | null };
}
