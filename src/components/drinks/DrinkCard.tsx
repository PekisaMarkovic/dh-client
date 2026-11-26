import AddToCartButton from "@/components/cart/AddToCartButton";
import DrinkImage from "@/components/drinks/DrinkImage";
import { IDrink } from "@/interfaces";
import { t } from "@/translations/translate";
import { formatPrice } from "@/utils/money";

type Props = {
  drink: IDrink;
  priority?: boolean;
  sizes?: string;
};

// one drink of the menu, a list item (<li>); the cart buttons show only when the site lets the visitors order
const DrinkCard = ({ drink, priority, sizes }: Props) => (
  <li className="group flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-surface transition hover:border-brand/60">
    <div className="relative">
      <DrinkImage image={drink.image} name={drink.name} priority={priority} sizes={sizes} />
      {/* on hover the cart comes over the image and asks for a click */}
      <AddToCartButton drink={drink} variant="overlay" />
    </div>
    <div className="flex flex-1 flex-col gap-1 p-4">
      <h3 className="font-semibold leading-snug">{drink.name}</h3>
      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
        <div>
          <p className="text-lg font-bold text-brand">{t("drinks:price", { price: formatPrice(drink.price) })}</p>
          <p className={`text-xs ${drink.inStock ? "text-green-400" : "text-stone-500"}`}>
            {drink.inStock ? t("drinks:inStock") : t("drinks:outOfStock")}
          </p>
        </div>
        {/* always visible, also on a phone that has no hover */}
        <AddToCartButton drink={drink} variant="corner" />
      </div>
    </div>
  </li>
);

export default DrinkCard;
