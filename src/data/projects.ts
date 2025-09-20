export type Project = {
  id: "network-automation" | "incident-simulator" | "portfolio";
  year: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
  };
  accent: string;
  previewGradient: [string, string];
};

export const projects: Project[] = [
  {
    id: "network-automation",
    year: "2024",
    tech: ["TypeScript", "Terraform", "Ansible"],
    links: {
      github: "https://github.com/Dolenek"
    },
    accent: "from-brand/40 via-blue-400/30 to-indigo-500/40",
    previewGradient: ["#4c6ef5", "#0e2344"]
  },
  {
    id: "incident-simulator",
    year: "2023",
    tech: ["React", "Docker", "Grafana"],
    links: {
      github: "https://github.com/Dolenek"
    },
    accent: "from-amber-400/40 via-orange-400/30 to-rose-500/30",
    previewGradient: ["#ff903b", "#5a1f53"]
  },
  {
    id: "portfolio",
    year: "2025",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    links: {
      github: "https://github.com/Dolenek/Portfolio-Site"
    },
    accent: "from-emerald-400/40 via-teal-400/30 to-cyan-400/30",
    previewGradient: ["#3ab795", "#0b3d5d"]
  }
];

