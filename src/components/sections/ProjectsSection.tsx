import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { featuredProjects, type Project } from "../../data/projects";
import { ProjectCard } from "./projects/ProjectCard";
import "./projects/ProjectsSection.base.css";
import "./projects/ProjectsSection.responsive.css";

type ProjectCopy = {
  title: string;
  summary: string;
  impact: string;
};

type ProjectCopyMap = Record<string, ProjectCopy>;

type ProjectActionLabels = {
  github: string;
  demo: string;
};

type ProjectsSectionProps = {
  alignOffset?: number;
  headingKey?: string;
  introKey?: string;
  items?: Project[];
  sectionId?: string;
  showHeader?: boolean;
  showMoreLink?: boolean;
  trackInScrollSpy?: boolean;
};

const ProjectsSectionComponent = ({
  alignOffset = 0,
  headingKey = "projects.heading",
  introKey,
  items = featuredProjects,
  sectionId = "projects",
  showHeader = true,
  showMoreLink = true,
  trackInScrollSpy = true
}: ProjectsSectionProps) => {
  const { t } = useTranslation();
  const projectCopy = t("projects.items", { returnObjects: true }) as ProjectCopyMap;
  const techLabel = t("projects.techLabel");
  const actionLabels = t("projects.actions", { returnObjects: true }) as ProjectActionLabels;

  return (
    <section
      id={sectionId}
      data-section={trackInScrollSpy ? sectionId : undefined}
      className="projects-river"
      aria-label={showHeader ? undefined : t(headingKey)}
    >
      {showHeader ? (
        <header className="projects-river__header">
          <h2 className="projects-river__title">{t(headingKey)}</h2>
          {introKey ? <p className="projects-river__subtitle">{t(introKey)}</p> : null}
        </header>
      ) : null}

      <ol className="projects-river__list">
        {items.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            copy={projectCopy[project.id]}
            align={(index + alignOffset) % 2 === 0 ? "left" : "right"}
            techLabel={techLabel}
            actionLabels={actionLabels}
          />
        ))}
      </ol>

      {showMoreLink ? (
        <div className="projects-river__more">
          <Link to="/projects" className="projects-river__more-link">
            <span>{t("projects.moreCta")}</span>
            <ArrowRight className="projects-river__more-icon" />
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export const ProjectsSection = memo(ProjectsSectionComponent);
