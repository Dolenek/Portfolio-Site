export const siteMeta = {
  baseUrl: "https://www.jakubdolenek.xyz",
  fallbackUrl: "https://jakubdolenek.xyz",
  socialImage: "/JD.png",
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
  defaultLocale: "cs"
} as const;

export type SupportedLocale = keyof typeof siteMeta.locales;
