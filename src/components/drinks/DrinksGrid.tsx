import DrinkCard from "@/components/drinks/DrinkCard";
import { IDrink } from "@/interfaces";

type Props = {
  drinks: IDrink[];
};

// the first row is above the fold, its images are loaded right away
const PRIORITY_COUNT = 4;

const DrinksGrid = ({ drinks }: Props) => (
  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
    {drinks.map((drink, index) => (
      <DrinkCard key={drink.drinkId} drink={drink} priority={index < PRIORITY_COUNT} />
    ))}
  </ul>
);

export default DrinksGrid;
