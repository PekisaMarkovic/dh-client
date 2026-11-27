"use client";

import { useTranslation } from "react-i18next";
import MainButton from "@/components/core/buttons/MainButton";
import Paragraph from "@/components/core/typography/Paragraph";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

/**
 * Asks the visitor about the cookies of other sites (the Google map) until a choice is made.
 * It floats over the bottom of the page (fixed), so it never moves the content when it appears.
 */
const CookieBanner = () => {
  const { t } = useTranslation("g");
  const { isAsking, accept, reject } = useCookieConsent();

  if (!isAsking) return null;

  return (
    <div role="dialog" aria-label={t("cookies.title")} className="fixed inset-x-0 bottom-0 z-[900] p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-stone-700 bg-surface p-4 shadow-2xl sm:flex-row sm:items-center sm:p-5">
        <Paragraph text={t("cookies.text")} size="sm" className="flex-1" />
        <div className="flex shrink-0 gap-2">
          <MainButton text={t("cookies.reject")} variant="alternative" size="medium" onClick={reject} />
          <MainButton text={t("cookies.accept")} variant="contained" size="medium" onClick={accept} />
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
