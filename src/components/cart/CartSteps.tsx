"use client";

import { useTranslation } from "react-i18next";
import CartStep from "@/components/cart/CartStep";

type Props = {
  step: 1 | 2;
};

/** "1 Korpa — 2 Podaci": where the visitor is in the order */
const CartSteps = ({ step }: Props) => {
  const { t } = useTranslation("cart");
  const steps = [t("steps.cart"), t("steps.details")];

  return (
    <ol className="flex items-center gap-3 text-sm">
      {steps.map((label, index) => (
        <CartStep key={label} number={index + 1} label={label} isActive={index + 1 === step} isDone={index + 1 < step} hasPrevious={index > 0} />
      ))}
    </ol>
  );
};

export default CartSteps;
