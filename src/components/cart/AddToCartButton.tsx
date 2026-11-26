"use client";

import { useTranslation } from "react-i18next";
import CartIcon from "@/icons/CartIcon";
import { IDrink } from "@/interfaces";
import { useCart } from "@/hooks/use-cart";

type Props = {
  drink: IDrink;
  // overlay: over the image, it comes on hover; corner: the round button next to the price, always visible
  variant: "overlay" | "corner";
};

/** Puts the drink in the cart and opens the cart; nothing when the site does not let the visitors order */
const AddToCartButton = ({ drink, variant }: Props) => {
  const { t } = useTranslation("cart");
  const { isEnabled, add } = useCart();

  if (!isEnabled) return null;

  const onClick = () => add({ drinkId: drink.drinkId, name: drink.name, price: drink.price, imageUrl: drink.image?.url ?? null });
  const label = t("add", { name: drink.name });

  if (variant === "overlay") {
    return (
      // the same action as the corner button, so it is skipped by the keyboard and the screen readers
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClick}
        className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 bg-brand-dark/60 opacity-0 transition duration-200 group-hover:opacity-100"
      >
        <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-brand text-brand-dark shadow-lg transition duration-200 group-hover:scale-100 motion-reduce:scale-100">
          <CartIcon className="h-7 w-7" />
        </span>
        <span className="text-sm font-semibold text-white">{t("addShort")}</span>
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
