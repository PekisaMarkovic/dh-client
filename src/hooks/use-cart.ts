"use client";

import { useContext } from "react";
import { CartContext } from "@/providers/cart-context";

/** The cart of the visitor; has to be inside <CartProvider> (it is, on every page: SiteShell) */
export const useCart = () => {
  const cart = useContext(CartContext);

  if (!cart) throw new Error("useCart has to be used inside <CartProvider>");

  return cart;
};
