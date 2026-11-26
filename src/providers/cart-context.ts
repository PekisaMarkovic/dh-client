"use client";

import { createContext } from "react";

/** One drink in the cart, with what the cart shows (the api takes only the id and the quantity) */
export type CartItem = {
  drinkId: number;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};

export type CartContextValue = {
  // false when the site does not let the visitors order: nothing of the cart is shown
  isEnabled: boolean;
  items: CartItem[];
  count: number;
  isOpen: boolean;
  add: (item: Omit<CartItem, "quantity">) => void;
  setQuantity: (drinkId: number, quantity: number) => void;
  remove: (drinkId: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);
