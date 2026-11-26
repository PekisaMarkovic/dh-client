import DrinkImage from "@/components/drinks/DrinkImage";
import { IDrink } from "@/interfaces";
import { t } from "@/translations/translate";
import { formatPrice } from "@/utils/money";

type Props = {
  drink: IDrink;
  priority?: boolean;
  sizes?: string;
  // the site lets the visitors order: the cart is shown
  canOrder?: boolean;
};

const CartIcon = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2.5 3h2.6l2.4 11.6a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21.5 7H6" />
  </svg>
);

// one drink of the menu, a list item (<li>)
// shortcut: the cart only shows the way, it does nothing yet; make it a button when ordering is built
const DrinkCard = ({ drink, priority, sizes, canOrder }: Props) => (
  <li className="group flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-surface transition hover:border-brand/60">
    <div className="relative">
      <DrinkImage image={drink.image} name={drink.name} priority={priority} sizes={sizes} />
      {canOrder && (
        // on hover the cart comes over the image and asks for a click
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-dark/60 opacity-0 transition duration-200 group-hover:opacity-100"
        >
          <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-brand text-brand-dark shadow-lg transition duration-200 group-hover:scale-100 motion-reduce:scale-100">
            <CartIcon className="h-7 w-7" />
          </span>
          <span className="text-sm font-semibold text-white">{t("drinks:addToCart")}</span>
        </div>
      )}
    </div>
    <div className="flex flex-1 flex-col gap-1 p-4">
      <h3 className="font-semibold leading-snug">{drink.name}</h3>
      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
        <div>
          <p className="text-lg font-bold text-brand">{t("drinks:price", { price: formatPrice(drink.price) })}</p>
          <p className={`text-xs ${drink.inStock ? "text-green-400" : "text-stone-500"}`}>{drink.inStock ? t("drinks:inStock") : t("drinks:outOfStock")}</p>
        </div>
        {canOrder && (
          // always visible, also on a phone that has no hover
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand text-brand transition group-hover:bg-brand group-hover:text-brand-dark"
          >
            <CartIcon className="h-5 w-5" />
          </span>
        )}
      </div>
    </div>
  </li>
);

export default DrinkCard;
