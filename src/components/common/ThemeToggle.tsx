import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../providers/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const label = theme === "dark" ? t("nav.themeToggle.light") : t("nav.themeToggle.dark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="group relative flex h-9 w-9 items-center justify-center text-slate-700 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-slate-100"
    >
      <Sun className="h-4 w-4 shrink-0 transition duration-300 group-hover:scale-110 dark:hidden" />
      <Moon className="hidden h-4 w-4 shrink-0 transition duration-300 group-hover:scale-110 dark:block" />
      <span className="sr-only">{label}</span>
    </button>
  );
};
