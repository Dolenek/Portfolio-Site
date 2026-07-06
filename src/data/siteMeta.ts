import { siteImages } from "./generated/media";

export const siteMeta = {
  baseUrl: "https://www.jakubdolenek.xyz",
  socialImage: siteImages.socialImage,
  locales: {
    cs: {
      htmlLang: "cs",
      hrefLang: "cs",
      ogLocale: "cs_CZ"
    },
    en: {
      htmlLang: "en",
      hrefLang: "en",
      ogLocale: "en_US"
    }
  } as const,
  defaultLocale: "en"
} as const;

export type SupportedLocale = keyof typeof siteMeta.locales;
