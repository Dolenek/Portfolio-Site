import { useTranslation } from "react-i18next";

import { siteMeta } from "../../data/siteMeta";
import { cn } from "../../utils/cn";

const LANGUAGES = [
  { code: "cs", labelKey: "nav.languageToggle.cs" },
  { code: "en", labelKey: "nav.languageToggle.en" }
] as const;

export const LocaleToggle = () => {
  const { i18n, t } = useTranslation();
  const resolved = i18n.resolvedLanguage ?? i18n.language;
  const current = resolved.toLowerCase().startsWith("cz") ? "cs" : resolved.split("-")[0];

  const handleSwitch = (code: string) => {
    const target = code === "cz" ? "cs" : code;
    void i18n.changeLanguage(target).then(() => {
      if (typeof window === "undefined") {
        return;
      }

      const url = new URL(window.location.href);
      if (target === siteMeta.defaultLocale) {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", target);
      }
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <span className="sr-only">{t("nav.languageToggle.label")}</span>
      {LANGUAGES.map((lang) => {
        const isActive = current === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleSwitch(lang.code)}
            className={cn(
              "flex h-7 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase tracking-wide transition",
              isActive
                ? "bg-brand text-brand-foreground shadow"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            )}
            aria-pressed={isActive}
          >
            {t(lang.labelKey)}
          </button>
        );
      })}
    </div>
  );
};
