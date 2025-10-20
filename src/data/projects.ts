export type ProjectId =
  | "kuchar-v-akci"
  | "portfolio"
  | "discord-automation"
  | "smithing-master-bot"
  | "mobile-game-unity";

export type Project = {
  id: ProjectId;
  year: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
  };
  accent: string;
  previewGradient: [string, string];
  previewImage?: string;
};

export const projects: Project[] = [
  {
    id: "kuchar-v-akci",
    year: "2025",
    tech: ["React", "TypeScript", "Supabase", "n8n"],
    links: {
      github: "https://github.com/Dolenek/KucharVAkci",
      demo: "https://www.receptyvakci.com"
    },
    accent: "from-lime-400/40 via-emerald-400/30 to-amber-400/35",
    previewGradient: ["#b9f6a5", "#1d4c3a"],
    previewImage: "/projects/KucharVAkci.png"
  },
  {
    id: "portfolio",
    year: "2025",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    links: {
      github: "https://github.com/Dolenek/Portfolio-Site"
    },
    accent: "from-emerald-400/40 via-teal-400/30 to-cyan-400/30",
    previewGradient: ["#3ab795", "#0b3d5d"],
    previewImage: "/projects/SiteScreen.png"
  },
  {
    id: "discord-automation",
    year: "2024",
    tech: ["C#", "Selenium", ".NET", "WebView2"],
    links: {
      github: "https://github.com/Dolenek/Projekt-ERDB"
    },
    accent: "from-brand/40 via-blue-400/30 to-indigo-500/40",
    previewGradient: ["#4c6ef5", "#0e2344"],
    previewImage: "/projects/ERDB.png"
  },
  {
    id: "mobile-game-unity",
    year: "2022",
    tech: ["Unity", "C#", "Android"],
    links: {
      github: "https://github.com/Dolenek/Magicians-Cauldron"
    },
    accent: "from-sky-400/40 via-blue-500/25 to-indigo-600/35",
    previewGradient: ["#5ec9ff", "#1b2a6b"],
    previewImage: "/projects/UnityGame.png"
  },
  {
    id: "smithing-master-bot",
    year: "2023",
    tech: ["Python", "pyautogui", "BlueStacks"],
    links: {
      github: "https://github.com/Dolenek/Smithing-Master-Bot"
    },
    accent: "from-amber-400/40 via-orange-400/30 to-rose-500/30",
    previewGradient: ["#ff903b", "#5a1f53"]
  }
];
