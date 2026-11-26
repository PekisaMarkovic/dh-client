import type { Metadata } from "next";
import DrinksMenuPage from "@/modules/drinks-menu/DrinksMenuPage";
import { menuMetadata } from "@/modules/drinks-menu/menu-metadata";
import { SearchParams } from "@/modules/drinks-menu/menu-state";

type Props = {
  searchParams: SearchParams;
};

// /karta-pica: all the drinks, no category
const allDrinks = Promise.resolve(undefined);

export const generateMetadata = ({ searchParams }: Props): Promise<Metadata> => menuMetadata(searchParams, allDrinks);

const Page = ({ searchParams }: Props) => <DrinksMenuPage searchParams={searchParams} slugParam={allDrinks} />;

export default Page;
