import { ExternalLink, FolderGit, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { projects } from "../../data/projects";
import { cn } from "../../utils/cn";

const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 + index * 0.08,
      ease: TRANSITION_EASE
    }
  })
};

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const projectCopy = t("projects.items", { returnObjects: true }) as Record<
    string,
    {
      title: string;
      summary: string;
      impact: string;
    }
  >;

  return (
    <section id="projects" data-section="projects" className="container-xl">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
            {t("projects.heading")}
          </h2>
          <p className="mt-2 max-w-3xl text-base text-slate-600 dark:text-slate-300">
            {t("projects.subheading")}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => {
          const copy = projectCopy[project.id];
          return (
            <motion.article
              key={project.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800/70 dark:bg-slate-900/70"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              custom={index}
            >
              <div
                className={cn(
                  "absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition duration-500 group-hover:opacity-100 dark:opacity-40",
                  project.accent
                )}
              />
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/30 transition group-hover:scale-105 dark:bg-white dark:text-slate-900">
                    <FolderGit className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {copy?.title ?? project.id}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                      {project.year}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {project.links.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-300"
                      aria-label={`${copy?.title ?? project.id} GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  ) : null}
                  {project.links.demo ? (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-300"
                      aria-label={`${copy?.title ?? project.id} demo`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{copy?.summary}</p>
              <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">{copy?.impact}</p>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  {t("projects.techLabel")}
                </span>
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200/70 bg-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] transition group-hover:border-brand group-hover:text-brand dark:border-slate-700 dark:bg-slate-900/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
