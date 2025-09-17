import { Outlet } from "react-router-dom";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const AppLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-transparent to-slate-200 dark:from-brand/20 dark:to-slate-950" />
        <div className="absolute inset-0 bg-[length:32px_32px] bg-grid-light opacity-40 dark:bg-grid-dark dark:opacity-30" />
        <div className="absolute left-1/2 top-32 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-brand/30 blur-[120px] dark:bg-brand/20" />
      </div>

      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};
