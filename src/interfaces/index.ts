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
  /** a short description (at most 150 characters), shown in the detail of the drink */
  description: string | null;
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

/** A category of the menu (only the ones that have drinks) */
export interface ICategory {
  categoryId: number;
  name: string;
  /** the name in the address: /karta-pica/<slug> */
  slug: string;
  drinksCount: number;
}

type Text = string | null;

/** The kinds of sections a page can have, the site has one component per kind */
export type SectionType = "hero" | "featured" | "story" | "info" | "text";

// every section of a page, a text that is null is not filled in (the section leaves it out)
export interface IHeroSection {
  sectionId: number;
  type: "hero";
  title: Text;
  subtitle: Text;
  text: Text;
  buttonText: Text;
  image: IImage | null;
}

/** the recommended drinks (the admin picks them, the first drinks of the menu when none are picked) */
export interface IFeaturedSection {
  sectionId: number;
  type: "featured";
  title: Text;
  buttonText: Text;
  drinks: IDrink[];
}

export interface IStorySection {
  sectionId: number;
  type: "story";
  title: Text;
  paragraph1: Text;
  paragraph2: Text;
  buttonText: Text;
  image: IImage | null;
}

export interface IInfoSection {
  sectionId: number;
  type: "info";
  title: Text;
  text: Text;
  buttonText: Text;
  image: IImage | null;
}

/** free text from the rich text editor of the dashboard (e.g. the page "O nama"): HTML the api already sanitized */
export interface ITextSection {
  sectionId: number;
  type: "text";
  html: Text;
}

export type ISection = IHeroSection | IFeaturedSection | IStorySection | IInfoSection | ITextSection;

/** A published page: its address ("" is the home page), what Google shows and its sections in order */
export interface IPage {
  title: string;
  slug: string;
  /** in the main menu of the header (at most 5), else in the footer */
  isInMenu: boolean;
  // image is the picture shown when the page is shared
  seo: { title: Text; description: Text; image: IImage | null };
  sections: ISection[];
}

export interface ISite {
  status: SiteStatus;
  /** true when the visitors can order drinks (for now it is only turned on in the database) */
  isOrderingAllowed: boolean;
  name: string;
  city: Text;
  address: Text;
  phone: Text;
  instagram: Text;
  workingHours: Text;
  logo: IImage | null;
  /** the published pages in the order of the menu */
  pages: IPage[];
}
