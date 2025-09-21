import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGE_ORDER = ["en", "cz"] as const;

export const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = useMemo(() => {
    const resolved = i18n.resolvedLanguage ?? i18n.language ?? LANGUAGE_ORDER[0];
    const normalized = resolved.toLowerCase();
    return LANGUAGE_ORDER.find((lang) => normalized.startsWith(lang)) ?? LANGUAGE_ORDER[0];
  }, [i18n.language, i18n.resolvedLanguage]);

  const nextLanguage = useMemo(() => {
    const currentIndex = LANGUAGE_ORDER.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % LANGUAGE_ORDER.length;
    return LANGUAGE_ORDER[nextIndex];
  }, [currentLanguage]);

  const labelKey = `nav.languageToggle.${currentLanguage}` as const;
  const nextLabelKey = `nav.languageToggle.${nextLanguage}` as const;
  const visualLabel = t(labelKey);
  const actionLabel = t("nav.languageToggle.switch", { lang: t(nextLabelKey) });

  const handleToggle = useCallback(() => {
    if (nextLanguage !== currentLanguage) {
      void i18n.changeLanguage(nextLanguage);
    }
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


