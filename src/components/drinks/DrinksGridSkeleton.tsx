import { MENU_COLUMNS } from "@/components/drinks/DrinksGrid";
import { t } from "@/translations/translate";

type Props = {
  // how many cards to draw (the page size, so the page does not jump when the drinks come)
  count: number;
  // true: also the sidebar of the categories and the bar with the search (the first load, before the address is read)
  withToolbar?: boolean;
};

const BLOCK = "rounded-md bg-stone-800 motion-safe:animate-pulse";

const Cards = ({ count }: { count: number }) => (
  // the same grid as DrinksGrid
  <ul aria-hidden="true" className={`grid gap-4 ${MENU_COLUMNS}`}>
    {Array.from({ length: count }, (_, index) => (
      <li key={index} className="flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-surface">
        <div className="aspect-square w-full bg-stone-800/60 motion-safe:animate-pulse" />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className={`${BLOCK} h-4 w-4/5`} />
          <span className={`${BLOCK} h-4 w-1/2`} />
          <span className={`${BLOCK} mt-3 h-5 w-2/5`} />
          <span className={`${BLOCK} h-3 w-1/3`} />
        </div>
      </li>
    ))}
  </ul>
);

/** The menu while the drinks load: grey blocks in the shape and the layout of the real ones */
const DrinksGridSkeleton = ({ count, withToolbar }: Props) => (
  <div role="status" aria-live="polite">
    <span className="sr-only">{t("drinks:loading")}</span>

    {withToolbar ? (
      // the same layout as the menu: the categories, then the search and the drinks
      <div aria-hidden="true" className="flex flex-col gap-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <div className="flex gap-2 overflow-hidden lg:flex-col">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className={`${BLOCK} h-9 w-24 shrink-0 rounded-full lg:h-10 lg:w-full lg:rounded-lg`} />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <span className={`${BLOCK} h-10 w-full sm:max-w-xs`} />
            <span className={`${BLOCK} h-9 w-64`} />
          </div>
          <Cards count={count} />
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-6">
        <span aria-hidden="true" className={`${BLOCK} h-8 w-48`} />
        <Cards count={count} />
      </div>
    )}
  </div>
);

export default DrinksGridSkeleton;
