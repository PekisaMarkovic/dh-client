"use client";

import { useTranslation } from "react-i18next";
import { MAX_QUANTITY } from "@/providers/CartProvider";

type Props = {
  name: string;
  value: number;
  onChange: (quantity: number) => void;
};

const BUTTON =
  "flex h-8 w-8 items-center justify-center text-lg text-foreground transition hover:text-brand disabled:cursor-not-allowed disabled:opacity-40";

/** − 2 +, the number can also be typed */
const QuantityStepper = ({ name, value, onChange }: Props) => {
  const { t } = useTranslation("cart");

  return (
    <div className="flex items-center rounded-full border border-stone-700">
      <button type="button" className={BUTTON} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={t("less", { name })}>
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={MAX_QUANTITY}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={t("quantity", { name })}
        className="w-10 bg-transparent text-center text-sm font-semibold text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button type="button" className={BUTTON} onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY} aria-label={t("more", { name })}>
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
