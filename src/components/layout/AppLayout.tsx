import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const AppLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen flex-col bg-[#e3ebf8] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
      >
        {t("nav.skipToContent")}
      </a>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-transparent to-[#e3ebf8] dark:from-brand/20 dark:to-slate-950" />
        <div className="absolute inset-0 bg-[length:32px_32px] bg-grid-light opacity-40 dark:bg-grid-dark dark:opacity-30" />
      </div>

      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
