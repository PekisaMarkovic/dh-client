"use client";

import { useTranslation } from "react-i18next";

type Props = {
  step: 1 | 2;
};

/** "1 Korpa — 2 Podaci": where the visitor is in the order */
const CartSteps = ({ step }: Props) => {
  const { t } = useTranslation("cart");
  const steps = [t("steps.cart"), t("steps.details")];

  return (
    <ol className="flex items-center gap-3 text-sm">
      {steps.map((label, index) => {
        const number = index + 1;
        const isActive = number === step;
        const isDone = number < step;

        return (
          <li key={label} aria-current={isActive ? "step" : undefined} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true" className="h-px w-6 bg-stone-700" />}
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                isActive || isDone ? "bg-brand text-brand-dark" : "border border-stone-600 text-stone-400"
              }`}
            >
              {number}
            </span>
            <span className={isActive ? "font-semibold text-foreground" : "text-stone-400"}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
};

export default CartSteps;
