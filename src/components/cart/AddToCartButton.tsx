"use client";

import { useTranslation } from "react-i18next";
import CartIcon from "@/icons/CartIcon";
import { IDrink } from "@/interfaces";
import { useCart } from "@/hooks/use-cart";

type Props = {
  drink: IDrink;
  // corner: the round button next to the price on the card; full: the wide button in the detail of the drink
  variant: "corner" | "full";
  // after the drink is in the cart (the detail closes itself)
  onAdded?: () => void;
};

/** Puts the drink in the cart and opens the cart; nothing when the site does not let the visitors order */
const AddToCartButton = ({ drink, variant, onAdded }: Props) => {
  const { t } = useTranslation("cart");
  const { isEnabled, add } = useCart();

  if (!isEnabled) return null;

  const onClick = () => {
    add({ drinkId: drink.drinkId, name: drink.name, price: drink.price, imageUrl: drink.image?.url ?? null });
    onAdded?.();
  };
  const label = t("add", { name: drink.name });

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-brand-dark transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <CartIcon className="h-5 w-5" />
        {t("addShort")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand text-brand transition group-hover:bg-brand group-hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <CartIcon className="h-5 w-5" />
    </button>
  );
};

export default AddToCartButton;
