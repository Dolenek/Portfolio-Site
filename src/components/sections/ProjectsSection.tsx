import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import type { Project } from "../../data/projects";
import { projects } from "../../data/projects";
import { createStaggerFade } from "../../utils/animation";
import { cn } from "../../utils/cn";
import "./ProjectsSection.css";

const PROJECT_CARD_VARIANTS = createStaggerFade({ distance: 40, duration: 0.7, stagger: 0.12 });

type ProjectCopy = {
  title: string;
  summary: string;
  impact: string;
};

type ProjectCopyMap = Record<string, ProjectCopy>;

type ProjectCardProps = {
  project: Project;
  copy?: ProjectCopy;
  align: "left" | "right";
  index: number;
  techLabel: string;
};

const ProjectCard = ({ project, copy, align, index, techLabel }: ProjectCardProps) => {
  const hasImage = Boolean(project.previewImage);
  const previewStyle = hasImage
    ? undefined
    : ({
        backgroundImage: `linear-gradient(135deg, ${project.previewGradient[0]}, ${project.previewGradient[1]})`
      } as const);
  const previewAlt = `${copy?.title ?? project.id} preview`;

  return (
    <motion.li
      className={cn("projects-river__node", {
        "projects-river__node--left": align === "left",
        "projects-river__node--right": align === "right"
      })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={PROJECT_CARD_VARIANTS}
      custom={index}
    >
      <article className="projects-river__card">
        <div className="projects-river__media" style={previewStyle}>
          {project.previewImage ? (
            <img
              src={project.previewImage}
              alt={previewAlt}
              className="projects-river__media-image"
              loading="lazy"
            />
          ) : null}
          <div className="projects-river__media-noise" aria-hidden="true" />
        </div>

        <div className="projects-river__base">
          <h3 className="projects-river__base-name" aria-hidden="true">
            {copy?.title ?? project.id}
          </h3>
        </div>

        <div className="projects-river__overlay">
          <div className="projects-river__overlay-body">
            <div className="projects-river__overlay-copy">
              <h3 className="projects-river__name">{copy?.title ?? project.id}</h3>
              <p className="projects-river__summary">{copy?.summary}</p>
              <p className="projects-river__impact">{copy?.impact}</p>
            </div>

            <div className="projects-river__overlay-footer">
              <div className="projects-river__stack-group" aria-label={techLabel}>
                <span className="projects-river__stack-label">{techLabel}</span>
                <ul className="projects-river__stack">
                  {project.tech.map((tech) => (
                    <li key={tech} className="projects-river__stack-item">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="projects-river__links">
                {project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-river__link"
                    aria-label={`${copy?.title ?? project.id} GitHub`}
                  >
                    <Github className="projects-river__link-icon" />
                  </a>
                ) : null}
                {project.links.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-river__link"
                    aria-label={`${copy?.title ?? project.id} demo`}
                  >
                    <ExternalLink className="projects-river__link-icon" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </article>
    </motion.li>
  );
};

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const projectCopy = t("projects.items", { returnObjects: true }) as ProjectCopyMap;
  const techLabel = t("projects.techLabel");

  return (
    <section id="projects" data-section="projects" className="projects-river container-xl">
      <header className="projects-river__header">
        <h2 className="projects-river__title">{t("projects.heading")}</h2>
        <p className="projects-river__subtitle">{t("projects.subheading")}</p>
      </header>

      <ol className="projects-river__list">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            copy={projectCopy[project.id]}
            align={index % 2 === 0 ? "left" : "right"}
            index={index}
            techLabel={techLabel}
          />
        ))}
      </ol>
    </section>
  );
};
