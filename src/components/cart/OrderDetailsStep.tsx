"use client";

import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import MainButton from "@/components/core/buttons/MainButton";
import DatePickerField from "@/components/core/input/DatePickerField";
import InputText from "@/components/core/input/InputText";
import Paragraph from "@/components/core/typography/Paragraph";
import { useCart } from "@/hooks/use-cart";
import { useErrorToast } from "@/hooks/use-error-toast";
import { pickupDateRange } from "@/lib/pickup-date";
import { sendOrder } from "@/services/order-service";
import { ORDER_DETAILS_VALIDATION, OrderDetailsValues } from "@/validations/order";

type Props = {
  onBack: () => void;
  onSent: (orderId: number) => void;
};

/** Step 2: who orders, where the courier brings it and the day (today until 15:00, then tomorrow; at most a month ahead) */
const OrderDetailsStep = ({ onBack, onSent }: Props) => {
  const { t } = useTranslation(["cart", "g"]);
  const showError = useErrorToast();
  const { items, clear } = useCart();
  const { first, last } = useMemo(() => pickupDateRange(), []);
  const methods = useForm<OrderDetailsValues>({
    resolver: ORDER_DETAILS_VALIDATION,
    defaultValues: { fullName: "", email: "", phone: "", address: "", pickupDate: first },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: OrderDetailsValues) =>
      sendOrder({ ...values, items: items.map((item) => ({ drinkId: item.drinkId, quantity: item.quantity })) }),
    onSuccess: ({ orderId }) => {
      clear();
      onSent(orderId);
    },
    onError: showError,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => mutate(values))}
        noValidate
        // the scrollbar goes into the padding of the panel; nothing scrolls sideways
        className="-mr-4 flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto pr-4"
      >
        <InputText isRequired name="fullName" label={t("cart:fullName")} autoComplete="name" />
        <InputText isRequired name="email" type="email" label={t("cart:email")} autoComplete="email" />
        <InputText isRequired name="phone" type="tel" label={t("cart:phone")} autoComplete="tel" />
        <InputText isRequired name="address" label={t("cart:address")} placeholder={t("cart:addressPlh")} autoComplete="street-address" />
        <DatePickerField isRequired name="pickupDate" label={t("cart:pickupDate")} min={first} max={last} />
        <Paragraph text={t("cart:pickupHint")} size="sm" />

        <div className="mt-auto flex gap-3 pt-4">
          <MainButton text={t("cart:back")} variant="outlined" onClick={onBack} disabled={isPending} />
          <MainButton htmlType="submit" text={t("cart:send")} size="full" isLoading={isPending} />
        </div>
      </form>
    </FormProvider>
  );
};

export default OrderDetailsStep;
