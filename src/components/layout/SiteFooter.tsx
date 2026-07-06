import { useTranslation } from "react-i18next";

export const SiteFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200/60 bg-white/90 py-6 text-sm text-slate-500 md:backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-950/90 dark:text-slate-400">
      <div className="container-xl flex flex-wrap items-center justify-between gap-4">
        <p>{t("footer.note", { year: new Date().getFullYear() })}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Dolenek"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
