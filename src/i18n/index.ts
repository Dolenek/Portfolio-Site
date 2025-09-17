import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import cz from "./locales/cz/common.json";
import en from "./locales/en/common.json";

export const resources = {
  en: {
    translation: en
  },
  cz: {
    translation: cz
  }
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "cz"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "portfolio-site-language"
    }
  });

export default i18n;
