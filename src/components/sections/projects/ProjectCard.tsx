import { useCallback, type KeyboardEvent, type MouseEvent } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

import type { Project } from "../../../data/projects";
import { createStaggerFade } from "../../../utils/animation";
import { cn } from "../../../utils/cn";

type ProjectCopy = {
  title: string;
  summary: string;
  impact: string;
};

type ProjectCardProps = {
  project: Project;
  copy?: ProjectCopy;
  align: "left" | "right";
  index: number;
  techLabel: string;
  isTouchLayout: boolean;
  isActive: boolean;
  onToggle: (projectId: string) => void;
};

const PROJECT_CARD_VARIANTS = createStaggerFade({
  distance: 40,
  duration: 0.7,
  stagger: 0.12
});

export const ProjectCard = ({
  project,
  copy,
  align,
  index,
  techLabel,
  isTouchLayout,
  isActive,
  onToggle
}: ProjectCardProps) => {
  const hasImage = Boolean(project.previewImage);
  const previewStyle = hasImage
    ? undefined
    : ({
        backgroundImage: `linear-gradient(135deg, ${project.previewGradient[0]}, ${project.previewGradient[1]})`
      } as const);
  const previewAlt = `${copy?.title ?? project.id} preview`;

  const toggleOverlay = useCallback(() => {
    if (isTouchLayout) {
      onToggle(project.id);
    }
  }, [isTouchLayout, onToggle, project.id]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!isTouchLayout) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onToggle(project.id);
      }
    },
    [isTouchLayout, onToggle, project.id]
  );

  const stopOverlayToggle = useCallback((event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }, []);

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
      <article
        className={cn("projects-river__card", {
          "projects-river__card--touch": isTouchLayout,
          "projects-river__card--active": isTouchLayout && isActive
        })}
        role={isTouchLayout ? "button" : undefined}
        tabIndex={isTouchLayout ? 0 : undefined}
        aria-expanded={isTouchLayout ? isActive : undefined}
        aria-label={isTouchLayout ? copy?.title ?? project.id : undefined}
        onClick={toggleOverlay}
        onKeyDown={handleKeyDown}
      >
        <div className="projects-river__media" style={previewStyle}>
          {project.previewImage ? (
            <img
              src={project.previewImage}
              alt={previewAlt}
              className="projects-river__media-image"
              loading="lazy"
              decoding="async"
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

              <div className="projects-river__actions" onClick={stopOverlayToggle}>
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
        </div>
      </article>
    </motion.li>
  );
};
