import axios from "axios";
import { t } from "@/translations/translate";

type ApiErrorBody = {
  statusCode?: number;
  message?: string | string[];
  errors?: string[];
};

/**
 * Reads the message the api sent (`message`, or the `errors` list for validation problems).
 * When the api sent nothing readable it says what happened (no connection, timeout, the status of the answer).
 */
export const getApiErrorMessage = (error: unknown, fallback = t("g:errorMessage")) => {
  if (axios.isCancel(error)) return error.message || fallback;

  if (!axios.isAxiosError<ApiErrorBody>(error)) return fallback;

  if (!error.response) {
    return error.code === "ECONNABORTED" || error.code === "ETIMEDOUT" ? t("g:errors.timeout") : t("g:errors.network");
  }

  const body = error.response.data;
  const status = error.response.status;

  if (!body || typeof body !== "object") {
    return status === 413 ? t("g:errors.tooLarge") : t("g:errors.status", { status });
  }

  if (Array.isArray(body.errors) && body.errors.length) return body.errors.join(". ");
  if (Array.isArray(body.message) && body.message.length) return body.message.join(". ");
  if (typeof body.message === "string" && body.message.trim()) return body.message;

  return t("g:errors.status", { status });
};
