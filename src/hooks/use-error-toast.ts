"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import customToast from "@/components/core/toast/CustomToast";
import { getApiErrorMessage } from "@/lib/api-error";

/**
 * Shows the message the api sent for a failed request (or what happened: no connection, timeout, the status).
 * Use it in every catch block / onError that talks to the api.
 */
export const useErrorToast = () => {
  const { t } = useTranslation("g");

  return useCallback((error: unknown) => customToast.error(getApiErrorMessage(error, t("errorMessage"))), [t]);
};
