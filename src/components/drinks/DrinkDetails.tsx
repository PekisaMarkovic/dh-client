"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddToCartButton from "@/components/cart/AddToCartButton";
import Modal from "@/components/core/modal/Modal";
import Heading from "@/components/core/typography/Heading";
import Paragraph from "@/components/core/typography/Paragraph";
import DrinkImage from "@/components/drinks/DrinkImage";
import DrinkPrice from "@/components/drinks/DrinkPrice";
import { IDrink } from "@/interfaces";

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
      <Modal isOpen={isOpen} onClose={close} title={drink.name} closeLabel={t("drinks:close")}>
        <div className="flex flex-col gap-4">
          {/* not wider than 260 px, so the description and the button fit on the screen without scrolling */}
          <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-xl">
            <DrinkImage image={drink.image} name={drink.name} sizes="260px" />
          </div>
          <Heading as="h2" size="xl" color="white" text={drink.name} />
          <DrinkPrice price={drink.price} inStock={drink.inStock} size="large" />
          {description && <Paragraph text={description} />}
          <AddToCartButton drink={drink} variant="full" onAdded={close} />
        </div>
      </Modal>
    </>
  );
};

export default DrinkDetails;
