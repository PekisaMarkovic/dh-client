import type { Metadata } from "next";
import DrinksMenuPage from "@/modules/drinks-menu/DrinksMenuPage";
import { menuMetadata } from "@/modules/drinks-menu/menu-metadata";
import { SearchParams } from "@/modules/drinks-menu/menu-state";

type Props = {
  params: Promise<{ kategorija: string }>;
  searchParams: SearchParams;
};

// /karta-pica/vino: the drinks of one category, its own page for Google
export const generateMetadata = ({ params, searchParams }: Props): Promise<Metadata> =>
  menuMetadata(
    searchParams,
    params.then((p) => p.kategorija),
  );

const Page = ({ params, searchParams }: Props) => <DrinksMenuPage searchParams={searchParams} slugParam={params.then((p) => p.kategorija)} />;

export default Page;
