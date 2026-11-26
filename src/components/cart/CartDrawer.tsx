"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CartItemsStep from "@/components/cart/CartItemsStep";
import CartSteps from "@/components/cart/CartSteps";
import OrderDetailsStep from "@/components/cart/OrderDetailsStep";
import OrderSentStep from "@/components/cart/OrderSentStep";
import { useCart } from "@/hooks/use-cart";

type Step = "cart" | "details" | "sent";

/**
 * The side panel of the cart, it comes from the right when a drink is added.
 * Step 1: the drinks and the total; step 2: the contact and the day; then the order is sent.
 */
const CartDrawer = () => {
  const { t } = useTranslation("cart");
  const { isEnabled, isOpen, close } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [orderId, setOrderId] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // while it is open: Escape closes it, the page behind does not scroll, the focus is in the panel
  useEffect(() => {
    if (!isOpen) return;

    const overflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close();

    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  if (!isEnabled) return null;

  const handleClose = () => {
    close();
    // a sent order is done, the next time the cart starts from the beginning
    if (step === "sent") setStep("cart");
  };

  const handleSent = (id: number) => {
    setOrderId(id);
    setStep("sent");
  };

  return (
    // inert while closed: nothing in it can be focused or read
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} inert={!isOpen}>
      <div
        aria-hidden="true"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col gap-5 border-l border-stone-800 bg-surface p-6 shadow-2xl outline-none transition-transform duration-300 motion-reduce:transition-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="cart-title" className="font-display text-2xl text-foreground">
            {t("title")}
          </h2>
          <button type="button" onClick={handleClose} aria-label={t("close")} className="text-2xl text-stone-400 transition hover:text-brand">
            ✕
          </button>
        </div>

        {step !== "sent" && <CartSteps step={step === "cart" ? 1 : 2} />}

        {step === "cart" && <CartItemsStep onNext={() => setStep("details")} />}
        {step === "details" && <OrderDetailsStep onBack={() => setStep("cart")} onSent={handleSent} />}
        {step === "sent" && orderId && <OrderSentStep orderId={orderId} />}
      </div>
    </div>
  );
};

export default CartDrawer;
