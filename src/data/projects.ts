import { projectPreviewImages, type ResponsiveImage } from "./generated/media";

type ProjectId =
  | "chat-context"
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
  previewImage?: ResponsiveImage;
};

export const featuredProjects: Project[] = [
  {
    id: "chat-context",
    year: "2026",
    tech: ["Electron", "JavaScript", "Python", "FastAPI", "PostgreSQL", "pgvector", "Docker"],
    links: {
      github: "https://github.com/Dolenek/ChatContextRAG"
    },
    previewGradient: ["#15243a", "#1aa69a"],
    previewImage: projectPreviewImages.chatContext
  },
  {
    id: "deadlock-patch-notes",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Go", "PostgreSQL", "OpenAPI", "Docker"],
    links: {
      github: "https://github.com/Dolenek/DeadlockPatchNotes",
      demo: "https://www.deadlockpatchnotes.com"
    },
    previewGradient: ["#25364f", "#c27a3d"],
    previewImage: projectPreviewImages.deadlockPatchNotes
  },
  {
    id: "levne-deskovky",
    year: "2025",
    tech: ["React", "TypeScript", "Go", "PostgreSQL", "Redis", "Playwright", "Docker"],
    links: {
      github: "https://github.com/Dolenek/DeskovkyLevne",
      demo: "https://www.deskovkylevne.com"
    },
    previewGradient: ["#f9d976", "#b8325f"],
    previewImage: projectPreviewImages.levneDeskovky
  }
];

export const additionalProjects: Project[] = [
  {
    id: "kuchar-v-akci",
    year: "2025",
    tech: ["React", "TypeScript", "Supabase", "n8n"],
    links: {
      github: "https://github.com/Dolenek/KucharVAkci",
      demo: "https://www.receptyvakci.com"
    },
    previewGradient: ["#b9f6a5", "#1d4c3a"],
    previewImage: projectPreviewImages.kucharVAkci
  },
  {
    id: "portfolio",
    year: "2025",
    tech: ["React", "Tailwind CSS", "Framer Motion", "i18next"],
    links: {
      github: "https://github.com/Dolenek/Portfolio-Site"
    },
    previewGradient: ["#3ab795", "#0b3d5d"],
    previewImage: projectPreviewImages.portfolio
  },
  {
    id: "discord-automation",
    year: "2024",
    tech: ["C#", "Selenium", ".NET", "WebView2"],
    links: {
      github: "https://github.com/Dolenek/Projekt-ERDB"
    },
    previewGradient: ["#4c6ef5", "#0e2344"],
    previewImage: projectPreviewImages.discordAutomation
  },
  {
    id: "mobile-game-unity",
    year: "2022",
    tech: ["Unity", "C#", "Android"],
    links: {
      github: "https://github.com/Dolenek/Magicians-Cauldron"
    },
    previewGradient: ["#5ec9ff", "#1b2a6b"],
    previewImage: projectPreviewImages.mobileGameUnity
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
