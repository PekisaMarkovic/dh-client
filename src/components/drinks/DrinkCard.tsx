import AddToCartButton from "@/components/cart/AddToCartButton";
import DrinkDetails from "@/components/drinks/DrinkDetails";
import DrinkImage from "@/components/drinks/DrinkImage";
import DrinkPrice from "@/components/drinks/DrinkPrice";
import { IDrink } from "@/interfaces";

type Props = {
  drink: IDrink;
  priority?: boolean;
  sizes?: string;
};

// one drink of the menu, a list item (<li>). A click on the card opens the detail of the drink, the cart button next to the price
// puts it in the cart right away (it shows only when the site lets the visitors order)
const DrinkCard = ({ drink, priority, sizes }: Props) => (
  <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-surface transition hover:border-brand/60">
    {/* the whole card opens the detail, the cart button lies above it */}
    <DrinkDetails drink={drink} />
    <div className="relative">
      <DrinkImage image={drink.image} name={drink.name} priority={priority} sizes={sizes} />
      {/* on hover the picture gets a little darker: the card can be clicked */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/0 transition duration-200 group-hover:bg-black/20" />
    </div>
    <div className="flex flex-1 flex-col gap-1 p-4">
      <h3 className="font-semibold leading-snug">{drink.name}</h3>
      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
        <DrinkPrice price={drink.price} inStock={drink.inStock} />
        {/* always visible, also on a phone that has no hover */}
        <div className="relative z-10">
          <AddToCartButton drink={drink} variant="corner" />
        </div>
      </div>
    </div>
  </li>
);

export default DrinkCard;
