import Link from "next/link";
import ChipScroller from "@/components/drinks/ChipScroller";
import { ICategory } from "@/interfaces";

type Props = {
  label: string;
  allLabel: string;
  categories: ICategory[];
  // the category of the page, null = all drinks
  value: number | null;
  // the page of a category (null = all drinks)
  buildHref: (category: ICategory | null) => string;
};

// a phone: chips in one row that scrolls sideways; a wide screen: the list in the sidebar of a shop
const ITEM =
  "flex h-9 shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition lg:h-10 lg:rounded-lg lg:border-transparent lg:px-3";
const IDLE = "border-stone-700 bg-surface text-foreground hover:border-brand hover:text-brand lg:bg-transparent lg:hover:bg-surface";
const ACTIVE = "border-brand bg-brand text-brand-dark lg:border-brand";

/** The categories of the menu, every one is a link to its own page */
const CategoryFilter = ({ label, allLabel, categories, value, buildHref }: Props) => {
  if (!categories.length) return null;

  const item = (category: ICategory | null) => {
    const isActive = (category?.categoryId ?? null) === value;

    return (
      <li key={category?.categoryId ?? "all"}>
        <Link href={buildHref(category)} aria-current={isActive ? "page" : undefined} className={`${ITEM} ${isActive ? ACTIVE : IDLE}`}>
          {category?.name ?? allLabel}
          {category && <span className={`text-xs ${isActive ? "text-brand-dark/70" : "text-stone-400"}`}>{category.drinksCount}</span>}
        </Link>
      </li>
    );
  };

  return (
    <ChipScroller label={label} activeKey={String(value)} className="-mx-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
      <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-stone-400 lg:block">{label}</p>
      <ul className="flex gap-2 lg:flex-col lg:gap-1">
        {item(null)}
        {categories.map(item)}
      </ul>
    </ChipScroller>
  );
};

export default CategoryFilter;
