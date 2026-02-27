import { siteMeta, type SupportedLocale } from "./siteMeta";
import type { ProjectId } from "./projects";
import type { ProjectCaseStudy } from "./projectCaseStudyTypes";
import { projectCaseStudiesCs } from "./case-studies/cs";
import { projectCaseStudiesEn } from "./case-studies/en";

const projectCaseStudiesByLocale: Record<SupportedLocale, Record<ProjectId, ProjectCaseStudy>> = {
  cs: projectCaseStudiesCs,
  en: projectCaseStudiesEn
};

export const resolveProjectCaseStudyLocale = (language: string | undefined): SupportedLocale => {
  const normalized = language?.toLowerCase();
  if (normalized?.startsWith("cs") || normalized?.startsWith("cz")) {
    return "cs";
  }
  if (normalized?.startsWith("en")) {
    return "en";
  }
  return siteMeta.defaultLocale;
};

export const getProjectCaseStudy = (projectId: ProjectId, language: string | undefined) => {
  const locale = resolveProjectCaseStudyLocale(language);
  return projectCaseStudiesByLocale[locale][projectId];
};
