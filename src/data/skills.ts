import type { LucideIcon } from "lucide-react";
import { CircuitBoard, Cloud, Sparkles, Workflow } from "lucide-react";

export type SkillCategoryId = "networking" | "automation" | "cloud" | "frontend";

export type SkillCategory = {
  id: SkillCategoryId;
  Icon: LucideIcon;
};

export const skillCategories: SkillCategory[] = [
  {
    id: "networking",
    Icon: CircuitBoard
  },
  {
    id: "automation",
    Icon: Workflow
  },
  {
    id: "cloud",
    Icon: Cloud
  },
  {
    id: "frontend",
    Icon: Sparkles
  }
];
