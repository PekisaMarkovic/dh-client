"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import QuantityStepper from "@/components/cart/QuantityStepper";
import BottleIcon from "@/icons/BottleIcon";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/providers/cart-context";
import { formatPrice, lineTotalCents } from "@/utils/money";

/** One drink in the cart: the image, the name, the price, the quantity and the amount */
const CartItemRow = ({ item }: { item: CartItem }) => {
  const { t } = useTranslation("cart");
  const { setQuantity, remove } = useCart();

  return (
    <li className="flex gap-3 py-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-stone-50">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt="" width={64} height={64} className="h-full w-full object-contain p-1" />
        ) : (
          <BottleIcon className="h-8 w-8 text-stone-300" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold leading-snug">{item.name}</p>
          <button
            type="button"
            onClick={() => remove(item.drinkId)}
            aria-label={t("remove", { name: item.name })}
            className="shrink-0 text-stone-500 transition hover:text-red-400"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-stone-400">{t("price", { price: formatPrice(item.price) })}</p>
        <div className="flex items-center justify-between gap-2">
          <QuantityStepper name={item.name} value={item.quantity} onChange={(quantity) => setQuantity(item.drinkId, quantity)} />
          <p className="font-bold text-brand">{t("price", { price: formatPrice(lineTotalCents(item.price, item.quantity) / 100) })}</p>
        </div>
      </div>
    </li>
  );
};

export default CartItemRow;
