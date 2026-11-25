"use client";

import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MainButton from "@/components/core/buttons/MainButton";
import InputText from "@/components/core/input/InputText";
import InputTextarea from "@/components/core/input/InputTextarea";
import Modal from "@/components/core/modal/Modal";
import customToast from "@/components/core/toast/CustomToast";
import Heading from "@/components/core/typography/Heading";
import SectionTitle from "@/components/core/typography/SectionTitle";
import Paragraph from "@/components/core/typography/Paragraph";
import { useErrorToast } from "@/hooks/use-error-toast";
import { sendContact } from "@/services/contact-service";
import { CONTACT_VALIDATION, ContactValues } from "@/validations/contact";

const EMPTY: ContactValues = { name: "", phone: "", email: "", message: "" };

const ContactForm = () => {
  const { t } = useTranslation(["contact", "g"]);
  const showError = useErrorToast();
  const [isSentOpen, setIsSentOpen] = useState(false);
  const methods = useForm<ContactValues>({ resolver: CONTACT_VALIDATION, defaultValues: EMPTY });

  const { mutate, isPending } = useMutation({
    mutationFn: sendContact,
    onSuccess: () => {
      customToast.success(t("contact:sent"));
      setIsSentOpen(true);
      methods.reset(EMPTY);
    },
    onError: showError,
  });

  return (
    <div id="contact-form" className="flex flex-col gap-6 rounded-md border border-brand/40 p-6">
      <SectionTitle text={t("contact:title")} line="below" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((values) => mutate(values))} noValidate className="flex flex-col gap-4">
          <InputText isRequired name="name" label={t("contact:name")} autoComplete="name" />
          <InputText isRequired name="phone" type="tel" label={t("contact:phone")} autoComplete="tel" />
          <InputText name="email" type="email" label={t("contact:email")} autoComplete="email" />
          <InputTextarea name="message" rows={5} label={t("contact:message")} placeholder={t("contact:messagePlh")} />
          <MainButton htmlType="submit" size="full" text={t("g:button.submit")} isLoading={isPending} />
        </form>
      </FormProvider>

      <Modal isOpen={isSentOpen} onClose={() => setIsSentOpen(false)} title={t("contact:sentTitle")}>
        <div className="flex flex-col items-center gap-4 text-center">
          <Heading as="h3" size="2xl" text={t("contact:sentTitle")} align="center" />
          <Paragraph text={t("contact:sent")} align="center" />
          <MainButton text={t("g:button.close")} onClick={() => setIsSentOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default ContactForm;
