"use client";

import { PropsWithChildren, useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { CartContext, CartItem } from "@/providers/cart-context";
import { cartStore } from "@/providers/cart-store";

type Props = PropsWithChildren<{
  // site.isOrderingAllowed
  isEnabled: boolean;
}>;

export const MAX_QUANTITY = 999;

/** The cart of the visitor (kept in the browser) and whether its side panel is open */
const CartProvider = ({ isEnabled, children }: Props) => {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  // a drink that is already in the cart gets one more
  const add = useCallback((item: Omit<CartItem, "quantity">) => {
    cartStore.update((list) =>
      list.some((i) => i.drinkId === item.drinkId)
        ? list.map((i) => (i.drinkId === item.drinkId ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) } : i))
        : [...list, { ...item, quantity: 1 }],
    );
    setIsOpen(true);
  }, []);

  // a typed quantity is a whole number from 1 to MAX_QUANTITY
  const setQuantity = useCallback((drinkId: number, quantity: number) => {
    const clamped = Math.min(Math.max(Math.trunc(quantity) || 1, 1), MAX_QUANTITY);

    cartStore.update((list) => list.map((i) => (i.drinkId === drinkId ? { ...i, quantity: clamped } : i)));
  }, []);

  const remove = useCallback((drinkId: number) => cartStore.update((list) => list.filter((i) => i.drinkId !== drinkId)), []);
  const clear = useCallback(() => cartStore.update(() => []), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      isEnabled,
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      isOpen: isEnabled && isOpen,
      add,
      setQuantity,
      remove,
      clear,
      open,
      close,
    }),
    [isEnabled, items, isOpen, add, setQuantity, remove, clear, open, close],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
