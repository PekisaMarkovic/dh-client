"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddToCartButton from "@/components/cart/AddToCartButton";
import Modal from "@/components/core/modal/Modal";
import DrinkImage from "@/components/drinks/DrinkImage";
import { IDrink } from "@/interfaces";
import { formatPrice } from "@/utils/money";

/**
 * The detail of a drink in a modal (no own page): the picture, the name, the price, the stock and the description,
 * with the button that puts it in the cart. The trigger is an invisible button over the whole card.
 */
const DrinkDetails = ({ drink }: { drink: IDrink }) => {
  const { t } = useTranslation(["drinks"]);
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const description = drink.description?.trim();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t("drinks:details", { name: drink.name })}
        className="absolute inset-0 z-[1] cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      />
      <Modal isOpen={isOpen} onClose={close} title={drink.name}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button type="button" onClick={close} aria-label={t("drinks:close")} className="text-2xl leading-none text-stone-400 hover:text-white">
              ×
            </button>
          </div>
          {/* not wider than 260 px, so the description and the button fit on the screen without scrolling */}
          <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-xl">
            <DrinkImage image={drink.image} name={drink.name} sizes="260px" />
          </div>
          <h2 className="text-xl font-semibold leading-snug">{drink.name}</h2>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl font-bold text-brand">{t("drinks:price", { price: formatPrice(drink.price) })}</p>
            <p className={`text-sm ${drink.inStock ? "text-green-400" : "text-stone-500"}`}>
              {drink.inStock ? t("drinks:inStock") : t("drinks:outOfStock")}
            </p>
          </div>
          {description && <p className="text-stone-300">{description}</p>}
          <AddToCartButton drink={drink} variant="full" onAdded={close} />
        </div>
      </Modal>
    </>
  );
};

export default DrinkDetails;
