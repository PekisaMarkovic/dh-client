"use client";

import { useTranslation } from "react-i18next";
import MainButton from "@/components/core/buttons/MainButton";
import Heading from "@/components/core/typography/Heading";
import Paragraph from "@/components/core/typography/Paragraph";
import { useCart } from "@/hooks/use-cart";

/** After the order is sent: the number and what happens next (an email is on its way) */
const OrderSentStep = ({ orderId }: { orderId: number }) => {
  const { t } = useTranslation("cart");
  const { close } = useCart();

  return (
    <div role="status" className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-3xl text-brand-dark">
        ✓
      </span>
      <Heading as="h3" size="2xl" align="center" text={t("sentTitle", { number: orderId })} />
      <Paragraph text={t("sent")} align="center" />
      <MainButton text={t("continueShopping")} onClick={close} />
    </div>
  );
};

export default OrderSentStep;
