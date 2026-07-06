import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { projects } from "../../data/projects";
import { ProjectCard } from "./projects/ProjectCard";
import { useIsTouchLayout } from "./projects/useIsTouchLayout";
import "./projects/ProjectsSection.base.css";
import "./projects/ProjectsSection.overlay.css";
import "./projects/ProjectsSection.responsive.css";

type ProjectCopy = {
  title: string;
  summary: string;
  impact: string;
};

type ProjectCopyMap = Record<string, ProjectCopy>;

const ProjectsSectionComponent = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const isTouchLayout = useIsTouchLayout();
  const { t } = useTranslation();
  const projectCopy = t("projects.items", { returnObjects: true }) as ProjectCopyMap;
  const techLabel = t("projects.techLabel");

  useEffect(() => {
    if (!isTouchLayout && activeProjectId !== null) {
      setActiveProjectId(null);
    }
  }, [isTouchLayout, activeProjectId]);

  const handleToggle = useCallback((projectId: string) => {
    setActiveProjectId((current) => (current === projectId ? null : projectId));
  }, []);

  return (
    <section id="projects" data-section="projects" className="projects-river container-xl">
      <header className="projects-river__header">
        <h2 className="projects-river__title">{t("projects.heading")}</h2>
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
            isTouchLayout={isTouchLayout}
            isActive={activeProjectId === project.id}
            onToggle={handleToggle}
          />
        ))}
      </ol>
    </section>
  );
};

export const ProjectsSection = memo(ProjectsSectionComponent);
