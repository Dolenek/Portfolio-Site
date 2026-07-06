import { useEffect, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Seo } from "../components/common/Seo";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { additionalProjects } from "../data/projects";
import { siteMeta } from "../data/siteMeta";
import { buildLocalizedUrl, resolveLocale } from "../utils/seo";

export const ProjectsPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const structuredData = useMemo(() => {
    const locale = resolveLocale(i18n.resolvedLanguage ?? i18n.language);
    const localeConfig = siteMeta.locales[locale];
    const homepageUrl = buildLocalizedUrl("/", locale);
    const projectsUrl = buildLocalizedUrl("/projects", locale);

    return [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: projectsUrl,
        name: t("seo.projects.title"),
        description: t("seo.projects.description"),
        inLanguage: localeConfig.hrefLang,
        isPartOf: {
          "@type": "WebSite",
          url: homepageUrl,
          name: t("seo.siteName")
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("seo.home.breadcrumb"),
            item: homepageUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("seo.projects.breadcrumb"),
            item: projectsUrl
          }
        ]
      }
    ];
  }, [i18n.language, i18n.resolvedLanguage, t]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <Seo
        titleKey="seo.projects.title"
        descriptionKey="seo.projects.description"
        path="/projects"
        structuredData={structuredData}
      />
      <div className="projects-section-band pt-12 sm:pt-16">
        <div className="container-xl mb-8">
          <button
            onClick={() => navigate("/", { state: { scrollTo: "projects" } })}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-800/70 dark:bg-slate-900/80 dark:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            {t("projects.morePage.backCta")}
          </button>
        </div>
        <ProjectsSection
          headingKey="projects.morePage.heading"
          introKey="projects.morePage.description"
          items={additionalProjects}
          showMoreLink={false}
        />
      </div>
    </>
  );
};
