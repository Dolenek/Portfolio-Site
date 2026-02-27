export type ProjectMetric = {
  label: string;
  value: string;
};

export type ArchitectureBullet = {
  title: string;
  detail: string;
};

export type ProjectDecision = {
  title: string;
  rationale: string;
  tradeoff: string;
};

export type ProjectCaseStudy = {
  problem: string;
  constraints: string[];
  architecture: ArchitectureBullet[];
  decisions: ProjectDecision[];
  outcomes: ProjectMetric[];
  nextImprovements: string[];
};
