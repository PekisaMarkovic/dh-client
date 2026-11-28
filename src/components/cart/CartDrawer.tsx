"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CartItemsStep from "@/components/cart/CartItemsStep";
import CartSteps from "@/components/cart/CartSteps";
import OrderSentStep from "@/components/cart/OrderSentStep";
import SidePanel from "@/components/core/SidePanel";
import { useCart } from "@/hooks/use-cart";

// step 2 has the date picker (a big library): it is loaded only when the visitor gets there
const OrderDetailsStep = dynamic(() => import("@/components/cart/OrderDetailsStep"));

type Step = "cart" | "details" | "sent";

/**
 * The cart, a panel from the right that opens when a drink is added (or with the van in the header).
 * Step 1: the drinks and the total; step 2: the contact, the address and the day; then the order is sent.
 */
const CartDrawer = () => {
  const { t } = useTranslation("cart");
  const { isEnabled, isOpen, close } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [orderId, setOrderId] = useState<number | null>(null);

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
    <SidePanel
      isOpen={isOpen}
      onClose={handleClose}
      side="right"
      label={t("title")}
      closeLabel={t("close")}
      title={<h2 className="font-display text-2xl text-foreground">{t("title")}</h2>}
    >
      {step !== "sent" && <CartSteps step={step === "cart" ? 1 : 2} />}

      {step === "cart" && <CartItemsStep onNext={() => setStep("details")} />}
      {step === "details" && <OrderDetailsStep onBack={() => setStep("cart")} onSent={handleSent} />}
      {step === "sent" && orderId && <OrderSentStep orderId={orderId} />}
    </SidePanel>
  );
};

export default CartDrawer;
