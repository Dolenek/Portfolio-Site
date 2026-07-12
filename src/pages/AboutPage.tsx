import { Fragment, useMemo } from "react";

import { ArrowLeft } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { RevealOnView } from "../components/common/RevealOnView";
import { Seo } from "../components/common/Seo";
import { siteMeta } from "../data/siteMeta";
import { buildLocalizedUrl, resolveLocale } from "../utils/seo";

type TimelineItem = {
  id: string;
  title: string;
  period: string;
  location: string;
  link?: {
    label: string;
    href: string;
  };
  description: string;
  tags: string[];
};

const ABOUT_HIGHLIGHT_CLASS_NAME =
  "bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent";

const ABOUT_PROJECTS_LINK_CLASS_NAME = [
  ABOUT_HIGHLIGHT_CLASS_NAME,
  "border-b border-dashed border-blue-400/80 pb-0.5 no-underline transition hover:border-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
].join(" ");

export const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const timeline = t("about.timeline", { returnObjects: true }) as TimelineItem[];
  const structuredData = useMemo(() => {
    const locale = resolveLocale(i18n.resolvedLanguage ?? i18n.language);
    const localeConfig = siteMeta.locales[locale];
    const homepageUrl = buildLocalizedUrl("/", locale);
    const aboutUrl = buildLocalizedUrl("/about", locale);

    return [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: aboutUrl,
        name: t("seo.about.title"),
        description: t("seo.about.description"),
        inLanguage: localeConfig.hrefLang,
        isPartOf: {
          "@type": "WebSite",
          url: homepageUrl,
          name: t("seo.siteName")
        },
        breadcrumb: {
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
              name: t("seo.about.breadcrumb"),
              item: aboutUrl
            }
          ]
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
            name: t("seo.about.breadcrumb"),
            item: aboutUrl
          }
        ]
      }
    ];
  }, [i18n.language, i18n.resolvedLanguage, t]);

  const renderDivider = (labelKey: string) => (
    <div className="flex items-center gap-3 px-1 text-base sm:text-lg">
      <span className="h-px flex-1 bg-slate-300 dark:bg-slate-800" />
      <span className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-sm shadow-slate-900/20 dark:bg-white dark:text-slate-900">
        {t(labelKey)}
      </span>
      <span className="h-px flex-1 bg-slate-300 dark:bg-slate-800" />
    </div>
  );

  return (
    <>
      <Seo
        titleKey="seo.about.title"
        descriptionKey="seo.about.description"
        path="/about"
        structuredData={structuredData}
      />

      <div className="container-xl pb-24 pt-12 sm:pt-16">
        <button
          onClick={() => navigate("/", { state: { scrollTo: "hero" } })}
          className="group mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-800/70 dark:bg-slate-900/80 dark:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          {t("about.backCta")}
        </button>

        <RevealOnView as="section" className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{t("about.title")}</h1>
          <p className="whitespace-pre-line text-lg text-slate-600 dark:text-slate-300">
            <Trans
              i18nKey="about.intro"
              components={{
                highlight: <span className={ABOUT_HIGHLIGHT_CLASS_NAME} />,
                projectsLink: <Link className={ABOUT_PROJECTS_LINK_CLASS_NAME} to="/projects" />
              }}
            />
          </p>
        </RevealOnView>

        <RevealOnView as="section" className="mt-16" disableOnMobile rootMargin="-120px 0px">
          <h2 className="sr-only">{t("about.timelineHeading")}</h2>
          <div className="mt-8 space-y-6">
            {timeline.map((item, index) => (
              <Fragment key={item.id}>
                {index === 0 ? renderDivider("about.experienceDivider") : null}
                <div
                  className="group relative flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800/70 dark:bg-slate-900/70"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.location}
                        {item.link ? (
                          <>
                            {" "}
                            {t("about.timelineAt")}{" "}
                            <a
                              href={item.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-brand transition hover:underline"
                            >
                              {item.link.label}
                            </a>
                          </>
                        ) : null}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white dark:bg-white dark:text-slate-900">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                  {item.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200/70 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 transition group-hover:border-brand group-hover:text-brand dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                {item.id === "cloud-software-specialist" ? (
                  renderDivider("about.educationDivider")
                ) : null}
              </Fragment>
            ))}
          </div>
        </RevealOnView>
      </div>
    </>
  );
};
