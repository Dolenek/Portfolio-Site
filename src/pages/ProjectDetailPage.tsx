import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Seo } from "../components/common/Seo";
import { getProjectCaseStudy } from "../data/projectCaseStudies";
import { findProjectBySlug } from "../data/projects";
import { siteMeta } from "../data/siteMeta";
import { buildLocalizedUrl, resolveLocale } from "../utils/seo";

export const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const project = slug ? findProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const title = t(`projects.items.${project.id}.title`);
  const summary = t(`projects.items.${project.id}.summary`);
  const impact = t(`projects.items.${project.id}.impact`);
  const caseStudy = getProjectCaseStudy(project.id, i18n.resolvedLanguage ?? i18n.language);

  const locale = resolveLocale(i18n.resolvedLanguage ?? i18n.language);
  const localeConfig = siteMeta.locales[locale];
  const projectUrl = buildLocalizedUrl(`/projects/${project.slug}`, locale);
  const homepageUrl = buildLocalizedUrl("/", locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: summary,
    url: projectUrl,
    inLanguage: localeConfig.hrefLang,
    author: {
      "@type": "Person",
      name: "Jakub Dolének"
    },
    isPartOf: {
      "@type": "WebSite",
      name: t("seo.siteName"),
      url: homepageUrl
    }
  };

  return (
    <>
      <Seo
        titleKey="seo.project.title"
        descriptionKey="seo.project.description"
        title={`${title} | ${t("seo.siteName")}`}
        description={summary}
        path={`/projects/${project.slug}`}
        structuredData={structuredData}
      />

      <div className="container-xl pb-24 pt-12 sm:pt-16">
        <button
          onClick={() => navigate("/", { state: { scrollTo: "projects" } })}
          className="group mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-800/70 dark:bg-slate-900/80 dark:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          {t("projects.backToProjects")}
        </button>

        <article className="space-y-8">
          <header className="space-y-4 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800/70 dark:bg-slate-900/80 sm:p-8">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">{title}</h1>
            <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">{summary}</p>
            <p className="text-base font-semibold text-slate-700 dark:text-slate-200">{impact}</p>

            <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-950/50">
                <p className="text-xs uppercase tracking-[0.2em]">{t("projects.meta.role")}</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{project.role}</p>
              </div>
              <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-950/50">
                <p className="text-xs uppercase tracking-[0.2em]">{t("projects.meta.team")}</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{project.teamSize}</p>
              </div>
              <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-950/50">
                <p className="text-xs uppercase tracking-[0.2em]">{t("projects.meta.duration")}</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{project.duration}</p>
              </div>
              <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-950/50">
                <p className="text-xs uppercase tracking-[0.2em]">{t("projects.meta.year")}</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{project.year}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              ) : null}
              {project.links.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("projects.liveDemo")}
                </a>
              ) : null}
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("projects.caseStudy.problem")}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{caseStudy.problem}</p>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("projects.caseStudy.constraints")}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                {caseStudy.constraints.map((constraint) => (
                  <li key={constraint}>{constraint}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/80">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("projects.caseStudy.architecture")}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {caseStudy.architecture.map((block) => (
                <div key={block.title} className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-950/50">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-100">{block.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{block.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/80">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("projects.caseStudy.decisions")}</h2>
            <div className="mt-4 space-y-4">
              {caseStudy.decisions.map((decision) => (
                <div key={decision.title} className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-950/50">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{decision.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    <strong>{t("projects.caseStudy.rationale")}:</strong> {decision.rationale}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    <strong>{t("projects.caseStudy.tradeoff")}:</strong> {decision.tradeoff}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("projects.caseStudy.outcomes")}</h2>
              <ul className="mt-4 space-y-3">
                {caseStudy.outcomes.map((outcome) => (
                  <li key={outcome.label} className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-950/50">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{outcome.label}</p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{outcome.value}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("projects.caseStudy.next")}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                {caseStudy.nextImprovements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:underline"
            >
              {t("projects.backHome")}
            </Link>
          </div>
        </article>
      </div>
    </>
  );
};
