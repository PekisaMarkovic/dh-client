import { notFound } from "next/navigation";
import { ICategory } from "@/interfaces";
import { DRINKS_PAGE_SIZE, DRINKS_PAGE_SIZES } from "@/services/drink-service";

/**
 * What the address of the drinks menu says, read and written in one place:
 * /karta-pica/vino?pretraga=tikves&page=2&perPage=50 (every category is its own page).
 */

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// the slug of the category in the path, undefined on /karta-pica
export type SlugParam = Promise<string | undefined>;

export type MenuState = {
  page: number;
  perPage: number;
  category: ICategory | null;
  search: string;
};

export const MENU_PATH = "/karta-pica";

// the api searches at most this many characters
const MAX_SEARCH = 100;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/** ?page=3 -> 3, anything that is not a whole number from 1 up is the first page */
const parsePage = (value: string | string[] | undefined) => {
  const page = Number(first(value));

  return Number.isInteger(page) && page >= 1 ? page : 1;
};

/** ?perPage=30 -> 30, only the offered sizes, anything else is the default */
const parsePerPage = (value: string | string[] | undefined) => {
  const size = Number(first(value));

  return (DRINKS_PAGE_SIZES as readonly number[]).includes(size) ? size : DRINKS_PAGE_SIZE;
};

/** The category of the path, null on /karta-pica; a slug the menu does not have is a 404 */
const parseCategory = (slug: string | undefined, categories: ICategory[]) => {
  if (!slug) return null;

  return categories.find((category) => category.slug === slug) ?? notFound();
};

export const readMenuState = async (searchParams: SearchParams, slugParam: SlugParam, categories: ICategory[]): Promise<MenuState> => {
  const params = await searchParams;

  return {
    page: parsePage(params.page),
    perPage: parsePerPage(params.perPage),
    category: parseCategory(await slugParam, categories),
    search: (first(params.pretraga) ?? "").trim().slice(0, MAX_SEARCH),
  };
};

/** /karta-pica/vino, or /karta-pica for all the drinks */
export const menuPathOf = (category: ICategory | null) => (category ? `${MENU_PATH}/${category.slug}` : MENU_PATH);

/** The address of a state of the menu, the defaults are left out */
export const menuHrefOf = ({ page, perPage, category, search }: MenuState) => {
  const query = new URLSearchParams();

  if (search) query.set("pretraga", search);
  if (page > 1) query.set("page", String(page));
  if (perPage !== DRINKS_PAGE_SIZE) query.set("perPage", String(perPage));

  const path = menuPathOf(category);

  return query.size ? `${path}?${query}` : path;
};
