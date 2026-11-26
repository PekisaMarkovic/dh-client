import type { Metadata } from "next";
import { MenuPage, menuMetadata, SearchParams } from "@/app/karta-pica/menu";

const noSlug = Promise.resolve(undefined);

export function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  return menuMetadata(searchParams, noSlug);
}

export default function DrinksMenuPage({ searchParams }: { searchParams: SearchParams }) {
  return <MenuPage searchParams={searchParams} slugParam={noSlug} />;
}
