import i18n from "@/translations/config";

/** `t("home:hero.tagline")` for server components (client components use useTranslation) */
export const t = (key: string, options: Record<string, unknown> = {}): string => String(i18n.t(key, options));
