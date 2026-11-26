import { MENU_COLUMNS } from "@/components/drinks/DrinksGrid";
import { SKELETON_BLOCK } from "@/components/drinks/skeleton";

/** Grey cards in the shape and the grid of the real ones (DrinksGrid) */
const DrinkCardSkeletons = ({ count }: { count: number }) => (
  <ul aria-hidden="true" className={`grid gap-4 ${MENU_COLUMNS}`}>
    {Array.from({ length: count }, (_, index) => (
      <li key={index} className="flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-surface">
        <div className="aspect-square w-full bg-stone-800/60 motion-safe:animate-pulse" />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className={`${SKELETON_BLOCK} h-4 w-4/5`} />
          <span className={`${SKELETON_BLOCK} h-4 w-1/2`} />
          <span className={`${SKELETON_BLOCK} mt-3 h-5 w-2/5`} />
          <span className={`${SKELETON_BLOCK} h-3 w-1/3`} />
        </div>
      </li>
    ))}
  </ul>
);

export default DrinkCardSkeletons;
