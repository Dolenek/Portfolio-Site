import { ExternalLink, Github } from "lucide-react";

import type { Project } from "../../../data/projects";
import { cn } from "../../../utils/cn";

type ProjectCopy = {
  title: string;
  summary: string;
  impact: string;
};

type ProjectActionLabels = {
  github: string;
  demo: string;
};

type ProjectCardProps = {
  project: Project;
  copy?: ProjectCopy;
  align: "left" | "right";
  techLabel: string;
  actionLabels: ProjectActionLabels;
};

type ProjectTitleProps = {
  project: Project;
  projectTitle: string;
};

const ProjectMedia = ({ project, projectTitle }: ProjectTitleProps) => {
  const previewStyle = project.previewImage
    ? undefined
    : ({
        backgroundImage: `linear-gradient(135deg, ${project.previewGradient[0]}, ${project.previewGradient[1]})`
      } as const);
  const mediaHref = project.links.demo ?? project.links.github;
  const mediaLabel = project.links.demo ? "Live" : "GitHub";
  const mediaContent = project.previewImage ? (
    <img
      src={project.previewImage}
      alt={`${projectTitle} preview`}
      className="projects-river__media-image"
      loading="lazy"
      decoding="async"
    />
  ) : null;

  if (!mediaHref) {
    return (
      <div className="projects-river__media" style={previewStyle}>
        {mediaContent}
      </div>
    );
  }

  return (
    <a
      href={mediaHref}
      target="_blank"
      rel="noopener noreferrer"
      className="projects-river__media"
      style={previewStyle}
      aria-label={`${projectTitle} ${mediaLabel}`}
    >
      {mediaContent}
    </a>
  );
};

const ProjectCopyBlock = ({ copy, projectTitle }: Pick<ProjectTitleProps, "projectTitle"> & { copy?: ProjectCopy }) => (
  <div className="projects-river__copy">
    <h3 className="projects-river__name">{projectTitle}</h3>
    <p className="projects-river__summary">{copy?.summary}</p>
    <p className="projects-river__impact">{copy?.impact}</p>
  </div>
);

const ProjectStack = ({ project, techLabel }: { project: Project; techLabel: string }) => (
  <div className="projects-river__stack-group" aria-label={techLabel}>
    <span className="sr-only">{techLabel}</span>
    <ul className="projects-river__stack">
      {project.tech.map((tech) => (
        <li key={tech} className="projects-river__stack-item">
          {tech}
        </li>
      ))}
    </ul>
  </div>
);

const ProjectLinks = ({ project, projectTitle, labels }: ProjectTitleProps & { labels: ProjectActionLabels }) => (
  <div className="projects-river__links">
    {project.links.github ? (
      <a
        href={project.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="projects-river__link projects-river__link--icon"
        aria-label={`${projectTitle} ${labels.github}`}
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
        aria-label={`${projectTitle} ${labels.demo}`}
      >
        <ExternalLink className="projects-river__link-icon" />
        <span>{labels.demo}</span>
      </a>
    ) : null}
  </div>
);

type ProjectFooterProps = {
  project: Project;
  projectTitle: string;
  actionLabels: ProjectActionLabels;
};

const ProjectFooter = ({ project, projectTitle, actionLabels }: ProjectFooterProps) => (
  <div className="projects-river__footer">
    <ProjectLinks project={project} projectTitle={projectTitle} labels={actionLabels} />
  </div>
);

export const ProjectCard = ({
  project,
  copy,
  align,
  techLabel,
  actionLabels
}: ProjectCardProps) => {
  const projectTitle = copy?.title ?? project.id;

  return (
    <li
      className={cn("projects-river__node", {
        "projects-river__node--left": align === "left",
        "projects-river__node--right": align === "right"
      })}
    >
      <article
        className={cn("projects-river__card", {
          "projects-river__card--reversed": align === "right"
        })}
      >
        <ProjectMedia project={project} projectTitle={projectTitle} />

        <div className="projects-river__content">
          <ProjectStack project={project} techLabel={techLabel} />
          <ProjectCopyBlock copy={copy} projectTitle={projectTitle} />
          <ProjectFooter
            project={project}
            actionLabels={actionLabels}
            projectTitle={projectTitle}
          />
        </div>
      </article>
    </li>
  );
};
