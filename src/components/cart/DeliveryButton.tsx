"use client";

import { useTranslation } from "react-i18next";
import DeliveryVanIcon from "@/icons/DeliveryVanIcon";
import { useCart } from "@/hooks/use-cart";

/**
 * The cart in the header: a van that races (it bounces, the speed lines fly behind it) and the number of drinks.
 * It opens the side panel of the cart; nothing when the site does not let the visitors order.
 */
const DeliveryButton = () => {
  const { t } = useTranslation("cart");
  const { isEnabled, count, open } = useCart();

  if (!isEnabled) return null;

  return (
    <button
      type="button"
      onClick={open}
      aria-label={t("open", { count })}
      className="group relative flex items-center gap-2 rounded-full bg-brand py-2 pl-3 pr-4 font-bold text-brand-dark shadow-lg transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <span aria-hidden="true" className="relative flex h-7 w-10 items-center justify-end overflow-hidden">
        {/* the speed lines: they fly from the van to the left, one after the other */}
        <span className="absolute left-0 top-2 h-0.5 w-3 rounded-full bg-brand-dark/70 motion-safe:animate-speed-line" />
        <span className="absolute left-1 top-3.5 h-0.5 w-4 rounded-full bg-brand-dark/70 motion-safe:animate-speed-line [animation-delay:0.2s]" />
        <span className="absolute left-0 top-5 h-0.5 w-2.5 rounded-full bg-brand-dark/70 motion-safe:animate-speed-line [animation-delay:0.4s]" />
        <DeliveryVanIcon className="relative h-7 w-7 motion-safe:animate-van" />
      </span>
      <span>{t("delivery")}</span>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-brand-dark shadow">
          {count}
        </span>
      )}
    </button>
  );
};

export default DeliveryButton;
