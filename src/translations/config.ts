import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enDrinks from "@/translations/en/drinks.json";
import enErrors from "@/translations/en/errors.json";
import enGeneral from "@/translations/en/general.json";
import enHome from "@/translations/en/home.json";
import enContact from "@/translations/en/contact.json";
import srDrinks from "@/translations/sr/drinks.json";
import srErrors from "@/translations/sr/errors.json";
import srGeneral from "@/translations/sr/general.json";
import srHome from "@/translations/sr/home.json";
import srContact from "@/translations/sr/contact.json";

export const LANGUAGES = ["sr", "en"] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = "sr";

// the value of the `lang` attribute of <html> (SEO)
export const HTML_LANG: Record<Language, string> = { sr: "sr-Latn", en: "en" };

// the locale of Open Graph (Facebook, Viber...)
export const OG_LOCALE: Record<Language, string> = { sr: "sr_RS", en: "en_US" };

export const resources = {
  sr: { g: srGeneral, home: srHome, drinks: srDrinks, contact: srContact, er: srErrors },
  en: { g: enGeneral, home: enHome, drinks: enDrinks, contact: enContact, er: enErrors },
} as const;

// The resources are bundled and the init is synchronous, so the server and the browser render the same text.
// Server components use `translate`, client components use `useTranslation` from react-i18next.
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: "g",
    ns: Object.keys(resources[DEFAULT_LANGUAGE]),
    interpolation: { escapeValue: false },
    initAsync: false,
  });
} else {
  // the dev server loaded the json again after a change: the new texts replace the old ones without a restart
  for (const [lng, namespaces] of Object.entries(resources)) {
    for (const [ns, texts] of Object.entries(namespaces)) i18n.addResourceBundle(lng, ns, texts, true, true);
  }
}

export default i18n;
