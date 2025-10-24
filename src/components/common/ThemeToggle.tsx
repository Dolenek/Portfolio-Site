import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../providers/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const label = theme === "dark" ? t("nav.themeToggle.light") : t("nav.themeToggle.dark");

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      <Sun className="h-4 w-4 shrink-0 transition duration-300 group-hover:scale-110 dark:hidden" />
      <Moon className="hidden h-4 w-4 shrink-0 transition duration-300 group-hover:scale-110 dark:block" />
      <span className="sr-only">{label}</span>
    </button>
  );
};
