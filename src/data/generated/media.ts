export type ResponsiveImageSource = {
  type: string;
  srcSet: string;
};

export type ResponsiveImage = {
  src: string;
  width: number;
  height: number;
  sizes: string;
  sources: readonly ResponsiveImageSource[];
};

export const projectPreviewImages = {
  chatContext: {
    src: "/assets/generated/projects/chat-context-1600.jpeg",
    width: 1600,
    height: 833,
    sizes: "(max-width: 900px) calc(100vw - 2rem), 720px",
    sources: [
      {
        type: "image/avif",
        srcSet: "/assets/generated/projects/chat-context-480.avif 480w, /assets/generated/projects/chat-context-800.avif 800w, /assets/generated/projects/chat-context-1200.avif 1200w, /assets/generated/projects/chat-context-1600.avif 1600w"
      },
      {
        type: "image/webp",
        srcSet: "/assets/generated/projects/chat-context-480.webp 480w, /assets/generated/projects/chat-context-800.webp 800w, /assets/generated/projects/chat-context-1200.webp 1200w, /assets/generated/projects/chat-context-1600.webp 1600w"
      }
    ]
  },
  deadlockPatchNotes: {
    src: "/assets/generated/projects/deadlock-patch-notes-1600.jpeg",
    width: 1600,
    height: 840,
    sizes: "(max-width: 900px) calc(100vw - 2rem), 720px",
    sources: [
      {
        type: "image/avif",
        srcSet: "/assets/generated/projects/deadlock-patch-notes-480.avif 480w, /assets/generated/projects/deadlock-patch-notes-800.avif 800w, /assets/generated/projects/deadlock-patch-notes-1200.avif 1200w, /assets/generated/projects/deadlock-patch-notes-1600.avif 1600w"
      },
      {
        type: "image/webp",
        srcSet: "/assets/generated/projects/deadlock-patch-notes-480.webp 480w, /assets/generated/projects/deadlock-patch-notes-800.webp 800w, /assets/generated/projects/deadlock-patch-notes-1200.webp 1200w, /assets/generated/projects/deadlock-patch-notes-1600.webp 1600w"
      }
    ]
  },
  levneDeskovky: {
    src: "/assets/generated/projects/levne-deskovky-1200.jpeg",
    width: 1200,
    height: 775,
    sizes: "(max-width: 900px) calc(100vw - 2rem), 720px",
    sources: [
      {
        type: "image/avif",
        srcSet: "/assets/generated/projects/levne-deskovky-480.avif 480w, /assets/generated/projects/levne-deskovky-800.avif 800w, /assets/generated/projects/levne-deskovky-1200.avif 1200w"
      },
      {
        type: "image/webp",
        srcSet: "/assets/generated/projects/levne-deskovky-480.webp 480w, /assets/generated/projects/levne-deskovky-800.webp 800w, /assets/generated/projects/levne-deskovky-1200.webp 1200w"
      }
    ]
  },
  kucharVAkci: {
    src: "/assets/generated/projects/kuchar-v-akci-1200.jpeg",
    width: 1200,
    height: 921,
    sizes: "(max-width: 900px) calc(100vw - 2rem), 720px",
    sources: [
      {
        type: "image/avif",
        srcSet: "/assets/generated/projects/kuchar-v-akci-480.avif 480w, /assets/generated/projects/kuchar-v-akci-800.avif 800w, /assets/generated/projects/kuchar-v-akci-1200.avif 1200w"
      },
      {
        type: "image/webp",
        srcSet: "/assets/generated/projects/kuchar-v-akci-480.webp 480w, /assets/generated/projects/kuchar-v-akci-800.webp 800w, /assets/generated/projects/kuchar-v-akci-1200.webp 1200w"
      }
    ]
  },
  portfolio: {
    src: "/assets/generated/projects/portfolio-1600.jpeg",
    width: 1600,
    height: 923,
    sizes: "(max-width: 900px) calc(100vw - 2rem), 720px",
    sources: [
      {
        type: "image/avif",
        srcSet: "/assets/generated/projects/portfolio-480.avif 480w, /assets/generated/projects/portfolio-800.avif 800w, /assets/generated/projects/portfolio-1200.avif 1200w, /assets/generated/projects/portfolio-1600.avif 1600w"
      },
      {
        type: "image/webp",
        srcSet: "/assets/generated/projects/portfolio-480.webp 480w, /assets/generated/projects/portfolio-800.webp 800w, /assets/generated/projects/portfolio-1200.webp 1200w, /assets/generated/projects/portfolio-1600.webp 1600w"
      }
    ]
  },
  discordAutomation: {
    src: "/assets/generated/projects/discord-automation-1200.jpeg",
    width: 1200,
    height: 710,
    sizes: "(max-width: 900px) calc(100vw - 2rem), 720px",
    sources: [
      {
        type: "image/avif",
        srcSet: "/assets/generated/projects/discord-automation-480.avif 480w, /assets/generated/projects/discord-automation-800.avif 800w, /assets/generated/projects/discord-automation-1200.avif 1200w"
      },
      {
        type: "image/webp",
        srcSet: "/assets/generated/projects/discord-automation-480.webp 480w, /assets/generated/projects/discord-automation-800.webp 800w, /assets/generated/projects/discord-automation-1200.webp 1200w"
      }
    ]
  },
  mobileGameUnity: {
    src: "/assets/generated/projects/mobile-game-unity-1200.jpeg",
    width: 1200,
    height: 675,
    sizes: "(max-width: 900px) calc(100vw - 2rem), 720px",
    sources: [
      {
        type: "image/avif",
        srcSet: "/assets/generated/projects/mobile-game-unity-480.avif 480w, /assets/generated/projects/mobile-game-unity-800.avif 800w, /assets/generated/projects/mobile-game-unity-1200.avif 1200w"
      },
      {
        type: "image/webp",
        srcSet: "/assets/generated/projects/mobile-game-unity-480.webp 480w, /assets/generated/projects/mobile-game-unity-800.webp 800w, /assets/generated/projects/mobile-game-unity-1200.webp 1200w"
      }
    ]
  }
} as const;

export const siteImages = {
  favicon32: "/assets/generated/brand/favicon-32.png",
  appleTouchIcon: "/assets/generated/brand/apple-touch-icon.png",
  socialImage: "/assets/generated/brand/social-1024.jpg",
  profilePortrait: "/assets/generated/brand/social-1024.jpg"
} as const;

export const skillImages = {
  aiAssistedEngineering: "/assets/generated/skills/ai-assisted-engineering-96.webp"
} as const;
