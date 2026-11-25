import DrinkImage from "@/components/drinks/DrinkImage";
import { IDrink } from "@/interfaces";
import { t } from "@/translations/translate";
import { formatPrice } from "@/utils/money";

type Props = {
  drink: IDrink;
  priority?: boolean;
  sizes?: string;
};

// one drink of the menu, a list item (<li>)
const DrinkCard = ({ drink, priority, sizes }: Props) => (
  <li className="flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-surface transition hover:border-brand/60">
    <DrinkImage image={drink.image} name={drink.name} priority={priority} sizes={sizes} />
    <div className="flex flex-1 flex-col gap-1 p-4">
      <h3 className="font-semibold leading-snug">{drink.name}</h3>
      <p className="mt-auto pt-2 text-lg font-bold text-brand">{t("drinks:price", { price: formatPrice(drink.price) })}</p>
      <p className={`text-xs ${drink.inStock ? "text-green-400" : "text-stone-500"}`}>{drink.inStock ? t("drinks:inStock") : t("drinks:outOfStock")}</p>
    </div>
  </li>
);

export default DrinkCard;
