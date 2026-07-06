type ProjectId =
  | "deadlock-patch-notes"
  | "levne-deskovky"
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
  previewGradient: [string, string];
  previewImage?: string;
};

export const featuredProjects: Project[] = [
  {
    id: "deadlock-patch-notes",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Docker"],
    links: {
      github: "https://github.com/Dolenek/DeadlockPatchNotes",
      demo: "https://www.deadlockpatchnotes.com"
    },
    previewGradient: ["#25364f", "#c27a3d"],
    previewImage: "/projects/DeadlockPatchNotes.PNG"
  },
  {
    id: "levne-deskovky",
    year: "2025",
    tech: ["React", "TypeScript", "Go", "PostgreSQL", "Redis", "Tailwind CSS"],
    links: {
      github: "https://github.com/Dolenek/DeskovkyLevne",
      demo: "https://www.deskovkylevne.com"
    },
    previewGradient: ["#f9d976", "#b8325f"],
    previewImage: "/projects/DeskovkyLevne.PNG"
  },
  {
    id: "kuchar-v-akci",
    year: "2025",
    tech: ["React", "TypeScript", "Supabase", "n8n"],
    links: {
      github: "https://github.com/Dolenek/KucharVAkci",
      demo: "https://www.receptyvakci.com"
    },
    previewGradient: ["#b9f6a5", "#1d4c3a"],
    previewImage: "/projects/KucharVAkci.png"
  }
];

export const additionalProjects: Project[] = [
  {
    id: "portfolio",
    year: "2025",
    tech: ["React", "Tailwind CSS", "Framer Motion", "i18next"],
    links: {
      github: "https://github.com/Dolenek/Portfolio-Site"
    },
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
    previewGradient: ["#5ec9ff", "#1b2a6b"],
    previewImage: "/projects/UnityGame.png"
  },
  {
    id: "smithing-master-bot",
    year: "2023",
    tech: ["Python", "PyAutoGUI", "OpenCV", "BlueStacks"],
    links: {
      github: "https://github.com/Dolenek/Smithing-Master-Bot"
    },
    previewGradient: ["#ff903b", "#5a1f53"]
  }
];
