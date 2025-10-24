import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { siteMeta, type SupportedLocale } from "../../data/siteMeta";

const LANGUAGE_SEQUENCE: SupportedLocale[] = ["cs", "en"];

const normalizeLanguage = (value: string | undefined): SupportedLocale => {
  const fallback = LANGUAGE_SEQUENCE[0];
  if (!value) {
    return fallback;
  }

  const normalized = value.toLowerCase();
  if (normalized.startsWith("cz")) {
    return "cs";
  }

  const match = LANGUAGE_SEQUENCE.find((lang) => normalized.startsWith(lang));
  return match ?? fallback;
};

export const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = useMemo(
    () => normalizeLanguage(i18n.resolvedLanguage ?? i18n.language),
    [i18n.language, i18n.resolvedLanguage]
  );

  const nextLanguage = useMemo(() => {
    const currentIndex = LANGUAGE_SEQUENCE.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % LANGUAGE_SEQUENCE.length;
    return LANGUAGE_SEQUENCE[nextIndex];
  }, [currentLanguage]);

  const currentLabelKey = `nav.languageToggle.${currentLanguage}` as const;
  const nextLabelKey = `nav.languageToggle.${nextLanguage}` as const;
  const visualLabel = t(currentLabelKey);
  const actionLabel = t("nav.languageToggle.switch", { lang: t(nextLabelKey) });

  const handleToggle = useCallback(() => {
    if (nextLanguage === currentLanguage) {
      return;
    }

    void i18n.changeLanguage(nextLanguage).then(() => {
      if (typeof window === "undefined") {
        return;
      }

      const url = new URL(window.location.href);
      if (nextLanguage === siteMeta.defaultLocale) {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", nextLanguage);
      }
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    });
  }, [currentLanguage, i18n, nextLanguage]);

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={actionLabel}
      className="group inline-flex h-9 min-w-[2.75rem] items-center justify-center rounded-full border border-slate-200/80 bg-white px-3 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-700 shadow-sm transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-100"
    >
      <span className="leading-none transition duration-300 group-hover:scale-110">{visualLabel}</span>
      <span className="sr-only">{t("nav.languageToggle.label")}</span>
    </button>
  );
};
