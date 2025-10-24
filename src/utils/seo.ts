import { siteMeta, type SupportedLocale } from "../data/siteMeta";

const ensureLeadingSlash = (value: string) => (value.startsWith("/") ? value : `/${value}`);

export const resolveLocale = (language: string | undefined): SupportedLocale => {
  const fallback = siteMeta.defaultLocale;
  if (!language) {
    return fallback;
  }

  const normalized = language.toLowerCase();
  if (normalized.startsWith("cs") || normalized.startsWith("cz")) {
    return "cs";
  }
  if (normalized.startsWith("en")) {
    return "en";
  }
  return fallback;
};

export const buildLocalizedUrl = (path: string, locale: SupportedLocale) => {
  const normalizedPath = ensureLeadingSlash(path);
  const url = new URL(normalizedPath, siteMeta.baseUrl);

  if (locale !== siteMeta.defaultLocale) {
    url.searchParams.set("lang", locale);
  }

  return url.toString();
};

