import type { Metadata } from "next";
import { MenuPage, menuMetadata, SearchParams } from "@/app/karta-pica/menu";

type Params = Promise<{ kategorija: string }>;

// /karta-pica/vino: the menu of one category, its own page for Google
export function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  return menuMetadata(searchParams, params.then((p) => p.kategorija));
}

export default function CategoryMenuPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  return <MenuPage searchParams={searchParams} slugParam={params.then((p) => p.kategorija)} />;
}
