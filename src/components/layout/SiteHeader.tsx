import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useScrollSpy } from "../../providers/useScrollSpy";
import type { SectionId } from "../../providers/scrollSpyContext";
import { profile } from "../../data/profile";
import { cn } from "../../utils/cn";
import { ThemeToggle } from "../common/ThemeToggle";
import { LanguageToggle } from "../common/LanguageToggle";

const NAV_ITEMS = [
  { id: "home", labelKey: "nav.home", kind: "home" as const },
  { id: "projects", labelKey: "nav.projects", kind: "section" as const, target: "projects" as SectionId },
  { id: "about", labelKey: "nav.about", kind: "route" as const, path: "/about" },
  { id: "contact", labelKey: "nav.contact", kind: "section" as const, target: "contact" as SectionId }
];

export const SiteHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { activeSection, scrollToSection, scrollToTop } = useScrollSpy();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavigate = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.kind === "route" && item.path) {
      navigate(item.path);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: item.kind === "home" ? "hero" : item.target }, replace: false });
      return;
    }

    if (item.kind === "home") {
      scrollToTop();
      return;
    }

    if (item.kind === "section" && item.target) {
      scrollToSection(item.target);
    }
  };

  const isActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.kind === "route") {
      return location.pathname.startsWith(item.path ?? "");
    }

    if (location.pathname !== "/") {
      return false;
    }

    if (item.kind === "home") {
      return activeSection === "hero";
    }

    return activeSection === item.target;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/40 bg-transparent backdrop-blur-md transition dark:border-slate-800/50 dark:bg-transparent">
      <div className="container-xl flex h-16 items-center justify-between gap-4">
        <button
          onClick={() => handleNavigate(NAV_ITEMS[0])}
          className="text-sm font-semibold uppercase tracking-widest text-slate-600 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-slate-300"
        >
          {profile.name}
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item)}
              className={cn(
                "text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              )}
              aria-current={isActive(item) ? "page" : undefined}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div id="mobile-nav" className="border-t border-slate-200/60 bg-white/90 backdrop-blur-md md:hidden dark:border-slate-800/60 dark:bg-slate-950/90">
          <div className="container-xl flex flex-col gap-2 py-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item)}
                className={cn(
                  "rounded-full px-4 py-2 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  isActive(item)
                    ? "bg-brand text-brand-foreground"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};

