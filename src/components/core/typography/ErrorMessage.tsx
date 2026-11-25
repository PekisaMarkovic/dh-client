"use client";

import { useTranslation } from "react-i18next";

type Props = {
  // the name of the field that has an error, its text comes from the `er` translations
  name?: string | null;
  // a ready text, shown instead
  message?: string;
};

const ErrorMessage = ({ name, message }: Props) => {
  const { t } = useTranslation("er");

  const text = message ?? (name ? t("input", { field: t(`fields.${name}`) }) : null);

  return text ? (
    <span role="alert" className="text-sm text-red-400">
      {text}
    </span>
  ) : null;
};

export default ErrorMessage;
