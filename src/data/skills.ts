export type SkillHighlightId =
  | "typescript"
  | "javascript"
  | "python"
  | "react"
  | "tailwind"
  | "framerMotion"
  | "firebase"
  | "supabase"
  | "sql"
  | "csharp"
  | "unity"
  | "linux"
  | "proxmox";

export type SkillHighlight = {
  id: SkillHighlightId;
  accent: string;
  initial: string;
  iconSrc?: string;
};

export const skillHighlights: SkillHighlight[] = [
  {
    id: "typescript",
    initial: "TS",
    accent: "from-sky-500/70 via-blue-600/60 to-indigo-600/70",
    iconSrc: "/skills/typescript.svg"
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
    id: "tailwind",
    initial: "TW",
    accent: "from-teal-500/70 via-cyan-500/60 to-emerald-500/70",
    iconSrc: "/skills/tailwindcss.svg"
  },
  {
    id: "framerMotion",
    initial: "FM",
    accent: "from-fuchsia-400/70 via-purple-500/60 to-violet-600/70",
    iconSrc: "/skills/framermotion.svg"
  },
  {
    id: "firebase",
    initial: "FB",
    accent: "from-orange-500/80 via-amber-500/60 to-yellow-500/70",
    iconSrc: "/skills/firebase.svg"
  },
  {
    id: "supabase",
    initial: "S",
    accent: "from-emerald-500/70 via-green-500/60 to-teal-600/70",
    iconSrc: "/skills/supabase.svg"
  },
  {
    id: "sql",
    initial: "SQL",
    accent: "from-slate-400/70 via-slate-500/60 to-slate-600/70",
    iconSrc: "/skills/postgresql.svg"
  },
  {
    id: "csharp",
    initial: "C#",
    accent: "from-indigo-500/70 via-slate-600/60 to-blue-700/70",
    iconSrc: "/skills/csharp.svg"
  },
  {
    id: "unity",
    initial: "U",
    accent: "from-slate-700/70 via-stone-700/60 to-slate-800/70",
    iconSrc: "/skills/unity.svg"
  },
  {
    id: "linux",
    initial: "LX",
    accent: "from-zinc-800/80 via-slate-800/60 to-neutral-900/80",
    iconSrc: "/skills/linux.svg"
  },
  {
    id: "proxmox",
    initial: "PX",
    accent: "from-orange-600/80 via-slate-700/60 to-orange-800/80",
    iconSrc: "/skills/proxmox.svg"
  }
];
