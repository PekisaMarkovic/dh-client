"use client";

import { useTranslation } from "react-i18next";
import MainButton from "@/components/core/buttons/MainButton";
import Paragraph from "@/components/core/typography/Paragraph";
import CartItemRow from "@/components/cart/CartItemRow";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, lineTotalCents } from "@/utils/money";

type Props = {
  onNext: () => void;
};

/** Step 1: the drinks in the cart, their quantities and the total */
const CartItemsStep = ({ onNext }: Props) => {
  const { t } = useTranslation("cart");
  const { items, close } = useCart();

  if (!items.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <Paragraph text={t("empty")} align="center" />
        <MainButton text={t("continueShopping")} variant="outlined" onClick={close} />
      </div>
    );
  }

  const totalCents = items.reduce((sum, item) => sum + lineTotalCents(item.price, item.quantity), 0);

  return (
    <>
      {/* -mr/pr: the scrollbar goes into the padding of the panel, not over the remove buttons and the amounts */}
      <ul className="-mr-4 flex-1 divide-y divide-stone-800 overflow-y-auto pr-4">
        {items.map((item) => (
          <CartItemRow key={item.drinkId} item={item} />
        ))}
      </ul>

      <div className="flex flex-col gap-4 border-t border-stone-800 pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-stone-300">{t("total")}</span>
          <span className="text-2xl font-bold text-brand">{t("price", { price: formatPrice(totalCents / 100) })}</span>
        </div>
        <MainButton text={t("next")} size="full" onClick={onNext} />
      </div>
    </>
  );
};

export default CartItemsStep;
