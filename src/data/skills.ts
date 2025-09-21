import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Binary,
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  Hexagon,
  Sparkles,
  Table,
  Wind,
  Workflow
} from "lucide-react";

export type SkillHighlightId =
  | "javascript"
  | "typescript"
  | "react"
  | "tailwind"
  | "framerMotion"
  | "python"
  | "supabase"
  | "postgresql"
  | "sql"
  | "node"
  | "githubActions"
  | "docker";

export type SkillHighlight = {
  id: SkillHighlightId;
  Icon: LucideIcon;
  accent: string;
};

export const skillHighlights: SkillHighlight[] = [
  {
    id: "javascript",
    Icon: Code2,
    accent: "from-amber-300/60 via-orange-400/40 to-amber-500/55"
  },
  {
    id: "typescript",
    Icon: Braces,
    accent: "from-sky-400/60 via-blue-500/40 to-indigo-500/55"
  },
  {
    id: "react",
    Icon: Atom,
    accent: "from-cyan-400/60 via-sky-400/40 to-blue-500/55"
  },
  {
    id: "tailwind",
    Icon: Wind,
    accent: "from-teal-400/60 via-emerald-400/40 to-cyan-500/55"
  },
  {
    id: "framerMotion",
    Icon: Sparkles,
    accent: "from-pink-400/60 via-purple-400/40 to-violet-500/55"
  },
  {
    id: "python",
    Icon: Binary,
    accent: "from-amber-400/60 via-rose-400/40 to-orange-500/55"
  },
  {
    id: "supabase",
    Icon: Cloud,
    accent: "from-emerald-400/60 via-green-400/40 to-teal-500/55"
  },
  {
    id: "postgresql",
    Icon: Database,
    accent: "from-blue-500/60 via-slate-500/40 to-indigo-600/55"
  },
  {
    id: "sql",
    Icon: Table,
    accent: "from-slate-400/60 via-slate-500/40 to-slate-600/55"
  },
  {
    id: "node",
    Icon: Hexagon,
    accent: "from-lime-400/60 via-emerald-400/40 to-green-500/55"
  },
  {
    id: "githubActions",
    Icon: Workflow,
    accent: "from-indigo-400/60 via-blue-500/40 to-sky-500/55"
  },
  {
    id: "docker",
    Icon: Container,
    accent: "from-sky-400/60 via-slate-400/40 to-blue-500/55"
  }
];
