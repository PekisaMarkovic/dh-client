import { t } from "@/translations/translate";

type Props = {
  // how many cards to draw (the page size, so the page does not jump when the drinks come)
  count: number;
  // true: also the bar with the page sizes (the first load, before the address is read)
  withToolbar?: boolean;
};

const BLOCK = "rounded-md bg-stone-800 motion-safe:animate-pulse";

/** The menu while the drinks load: grey cards in the shape and the grid of the real ones */
const DrinksGridSkeleton = ({ count, withToolbar }: Props) => (
  <div role="status" aria-live="polite" className="flex flex-col gap-8">
    <span className="sr-only">{t("drinks:loading")}</span>

    {withToolbar && (
      <div aria-hidden="true" className="flex items-center justify-end gap-2">
        <span className={`${BLOCK} h-4 w-24`} />
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={`${BLOCK} h-9 w-10 rounded-full`} />
        ))}
      </div>
    )}

    {/* the same grid as DrinksGrid */}
    <ul aria-hidden="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
  </div>
);

export default DrinksGridSkeleton;
