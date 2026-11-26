import DrinkCard from "@/components/drinks/DrinkCard";
import { IDrink } from "@/interfaces";

type Props = {
  drinks: IDrink[];
  // the columns of the grid, the menu page uses the default
  columns?: string;
  // the width of a card on each screen, it has to match the columns (see DrinkImage)
  sizes?: string;
};

// the first row is above the fold, its images are loaded right away
const PRIORITY_COUNT = 4;

// the menu: next to the sidebar of the categories, 3 or 4 drinks in a row on a wide screen
export const MENU_COLUMNS = "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4";

const DrinksGrid = ({ drinks, columns = MENU_COLUMNS, sizes }: Props) => (
  <ul className={`grid gap-4 ${columns}`}>
    {drinks.map((drink, index) => (
      <DrinkCard key={drink.drinkId} drink={drink} priority={index < PRIORITY_COUNT} sizes={sizes} />
    ))}
  </ul>
);

export default DrinksGrid;
