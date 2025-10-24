import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import cs from "./locales/cs/common.json";
import en from "./locales/en/common.json";

export const resources = {
  cs: {
    translation: cs
  },
  en: {
    translation: en
  }
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "cs",
    supportedLngs: ["cs", "en"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupQuerystring: "lang",
      lookupLocalStorage: "portfolio-site-language",
      convertDetectedLanguage: (lng: string) => {
        const normalized = lng.toLowerCase();
        if (normalized.startsWith("cs") || normalized.startsWith("cz")) {
          return "cs";
        }
        if (normalized.startsWith("en")) {
          return "en";
        }
        return lng;
      }
    }
  });

export default i18n;
