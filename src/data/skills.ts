type SkillHighlightId =
  | "csharp"
  | "javascript"
  | "python"
  | "react"
  | "sql"
  | "mssql"
  | "linux";

export type SkillHighlight = {
  id: SkillHighlightId;
  accent: string;
  initial: string;
  iconSrc?: string;
};

export const skillHighlights: SkillHighlight[] = [
  {
    id: "csharp",
    initial: "C#",
    accent: "from-indigo-500/70 via-slate-600/60 to-blue-700/70",
    iconSrc: "/skills/csharp.svg"
  },
  {
    id: "javascript",
    initial: "JS",
    accent: "from-amber-400/70 via-orange-500/60 to-amber-600/70",
    iconSrc: "/skills/javascript.svg"
  },
  {
    id: "python",
    initial: "PY",
    accent: "from-blue-500/70 via-amber-400/60 to-blue-700/70",
    iconSrc: "/skills/python.svg"
  },
  {
    id: "react",
    initial: "R",
    accent: "from-cyan-400/70 via-sky-400/60 to-blue-500/70",
    iconSrc: "/skills/react.svg"
  },
  {
    id: "sql",
    initial: "SQL",
    accent: "from-slate-400/70 via-slate-500/60 to-slate-600/70",
    iconSrc: "/skills/postgresql.svg"
  },
  {
    id: "mssql",
    initial: "MS",
    accent: "from-sky-600/90 via-blue-600/75 to-indigo-500/65",
    iconSrc: "/skills/mssql.svg"
  },
  {
    id: "linux",
    initial: "LX",
    accent: "from-zinc-800/80 via-slate-800/60 to-neutral-900/80",
    iconSrc: "/skills/linux.svg"
  }
];
