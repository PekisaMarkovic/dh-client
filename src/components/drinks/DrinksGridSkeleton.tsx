import DrinkCardSkeletons from "@/components/drinks/DrinkCardSkeletons";
import { SKELETON_BLOCK } from "@/components/drinks/skeleton";
import { t } from "@/translations/translate";

type Props = {
  // how many cards to draw (the page size, so the page does not jump when the drinks come)
  count: number;
  // true: also the sidebar of the categories and the bar with the search (the first load, before the address is read)
  withToolbar?: boolean;
};

/** The menu while the drinks load: grey blocks in the shape and the layout of the real ones */
const DrinksGridSkeleton = ({ count, withToolbar }: Props) => (
  <div role="status" aria-live="polite">
    <span className="sr-only">{t("drinks:loading")}</span>

    {withToolbar ? (
      // the same layout as the menu: the categories, then the search and the drinks
      <div aria-hidden="true" className="flex flex-col gap-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <div className="flex gap-2 overflow-hidden lg:flex-col">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className={`${SKELETON_BLOCK} h-9 w-24 shrink-0 rounded-full lg:h-10 lg:w-full lg:rounded-lg`} />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <span className={`${SKELETON_BLOCK} h-10 w-full sm:max-w-xs`} />
            <span className={`${SKELETON_BLOCK} h-9 w-64`} />
          </div>
          <DrinkCardSkeletons count={count} />
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-6">
        <span aria-hidden="true" className={`${SKELETON_BLOCK} h-8 w-48`} />
        <DrinkCardSkeletons count={count} />
      </div>
    )}
  </div>
);

export default DrinksGridSkeleton;
