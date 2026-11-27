"use client";

import { useTranslation } from "react-i18next";
import MainButton from "@/components/core/buttons/MainButton";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

// "Podešavanja kolačića" in the footer: shows the banner again, so the choice can be changed
const CookieSettingsButton = () => {
  const { t } = useTranslation("g");
  const { reset } = useCookieConsent();

  return <MainButton text={t("cookies.settings")} variant="text" size="small" onClick={reset} />;
};

export default CookieSettingsButton;
