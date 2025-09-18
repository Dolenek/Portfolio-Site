import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { profile } from "../../data/profile";
import "./HeroSection.css";

type CSSVariableStyles = CSSProperties & Record<string, string>;

type StarConfig = {
  top: number;
  startOffset: number;
  size: number;
  travelDuration: number;
  travelDelay: number;
  twinkleDuration: number;
  twinkleDelay: number;
  distance: number;
  opacity: number;
  verticalShift: number;
};

type CloudConfig = {
  top: string;
  left: string;
  scale: number;
  duration: number;
  delay: number;
  floatX: string;
  floatY: string;
};

type HeroHeadline = {
  lead: string;
  accent: string;
  trail: string;
};

const formatCssNumber = (value: number) => {
  const rounded = Math.round(value * 100) / 100;
  if (Math.abs(rounded) < 0.005) {
    return "0";
  }
  return rounded.toString().replace(/\.0+$/, "");
};

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 9184.233) * 43758.5453;
  return x - Math.floor(x);
};

const createHeroStarField = (count: number): StarConfig[] => {
  const stars: StarConfig[] = [];

  for (let index = 0; index < count; index += 1) {
    const base = index + 1;
    const top = 4 + pseudoRandom(base) * 46;
    const startOffset = 12 + pseudoRandom(base + 11) * 60;
    const size = 1 + Math.round(pseudoRandom(base + 23) * 2);
    const travelDuration = 26 + pseudoRandom(base + 31) * 26;
    const travelDelay = -pseudoRandom(base + 37) * travelDuration;
    const twinkleDuration = 3.2 + pseudoRandom(base + 41) * 3.4;
    const twinkleDelay = pseudoRandom(base + 47) * 6.5;
    const distance = 160 + pseudoRandom(base + 53) * 90 + startOffset * 0.4;
    const opacity = 0.4 + pseudoRandom(base + 59) * 0.4;
    const verticalShift = (pseudoRandom(base + 67) - 0.5) * 16;

    stars.push({
      top,
      startOffset,
      size,
      travelDuration,
      travelDelay,
      twinkleDuration,
      twinkleDelay,
      distance,
      opacity,
      verticalShift
    });
  }

  return stars;
};



type MountainVariant = "day" | "night";



const HERO_MOUNTAIN_BASE_PATHS = {
  back: "M0 336 Q220 296 440 318 T880 314 T1210 330 T1440 320 L1440 400 L0 400 Z",
  mid: "M0 366 Q260 308 540 340 T1040 338 T1380 358 T1440 350 L1440 400 L0 400 Z",
  front: "M0 398 Q320 300 660 344 T1200 368 T1440 352 L1440 400 L0 400 Z"
} as const;



type MountainLayer = keyof typeof HERO_MOUNTAIN_BASE_PATHS;



type MountainGradientStop = {

  offset: string;

  color: string;

  opacity: number;

};



type MountainGradientConfig = {

  id: string;

  stops: readonly MountainGradientStop[];

};



type MountainCluster = {

  key: string;

  layer: MountainLayer;

  gradient: MountainGradientConfig;

  transform: string;

  opacity: number;

  blur?: number;

  dropShadow?: string;

  mixBlendMode?: CSSProperties["mixBlendMode"];

};



const HERO_MOUNTAIN_CLUSTERS: Record<MountainVariant, readonly MountainCluster[]> = {
  night: [
    {
      key: "night-far-haze",
      layer: "back",
      gradient: {
        id: "hero-night-gradient-far-haze",
        stops: [
          { offset: "0%", color: "#091631", opacity: 0.6 },
          { offset: "60%", color: "#07122a", opacity: 0.74 },
          { offset: "100%", color: "#030817", opacity: 0.88 }
        ]
      },
      transform: "translate(-120 38) scale(1.45)",
      opacity: 0.5,
      blur: 30,
      mixBlendMode: "screen"
    },
    {
      key: "night-far-ridge",
      layer: "back",
      gradient: {
        id: "hero-night-gradient-far-ridge",
        stops: [
          { offset: "0%", color: "#102243", opacity: 0.66 },
          { offset: "60%", color: "#0b1a3b", opacity: 0.78 },
          { offset: "100%", color: "#07112a", opacity: 0.88 }
        ]
      },
      transform: "translate(80 12) scale(1.28)",
      opacity: 0.62,
      blur: 18,
      mixBlendMode: "screen"
    },
    {
      key: "night-mid-ridge",
      layer: "mid",
      gradient: {
        id: "hero-night-gradient-mid-ridge",
        stops: [
          { offset: "0%", color: "#152f5c", opacity: 0.72 },
          { offset: "55%", color: "#102551", opacity: 0.86 },
          { offset: "100%", color: "#081636", opacity: 0.96 }
        ]
      },
      transform: "translate(-100 -6) scale(1.3)",
      opacity: 0.7,
      blur: 12,
      mixBlendMode: "screen"
    },
    {
      key: "night-mid-highlight",
      layer: "mid",
      gradient: {
        id: "hero-night-gradient-mid-highlight",
        stops: [
          { offset: "0%", color: "#1e3e76", opacity: 0.78 },
          { offset: "55%", color: "#163167", opacity: 0.9 },
          { offset: "100%", color: "#0b1f4c", opacity: 0.98 }
        ]
      },
      transform: "translate(40 -16) scale(1.24)",
      opacity: 0.78,
      blur: 8,
      mixBlendMode: "screen"
    },
    {
      key: "night-front-base",
      layer: "front",
      gradient: {
        id: "hero-night-gradient-front-base",
        stops: [
          { offset: "0%", color: "#2c58a6", opacity: 1 },
          { offset: "55%", color: "#1d3f84", opacity: 1 },
          { offset: "100%", color: "#10275e", opacity: 1 }
        ]
      },
      transform: "translate(-40 -58) scale(1.36)",
      opacity: 0.95,
      dropShadow: "0 44px 90px rgba(5, 11, 30, 0.78)",
      mixBlendMode: "normal"
    },
    {
      key: "night-front-highlight-left",
      layer: "front",
      gradient: {
        id: "hero-night-gradient-front-highlight-left",
        stops: [
          { offset: "0%", color: "#3568c2", opacity: 0.9 },
          { offset: "55%", color: "#244b9a", opacity: 0.88 },
          { offset: "100%", color: "#183679", opacity: 0.8 }
        ]
      },
      transform: "translate(-240 -34) scale(1.24)",
      opacity: 0.7,
      blur: 6,
      mixBlendMode: "screen"
    },
    {
      key: "night-front-highlight-right",
      layer: "front",
      gradient: {
        id: "hero-night-gradient-front-highlight-right",
        stops: [
          { offset: "0%", color: "#2e63bd", opacity: 0.88 },
          { offset: "55%", color: "#214491", opacity: 0.86 },
          { offset: "100%", color: "#173379", opacity: 0.78 }
        ]
      },
      transform: "translate(180 -36) scale(1.2)",
      opacity: 0.66,
      blur: 7,
      mixBlendMode: "screen"
    }
  ],
  day: [
    {
      key: "day-far-haze",
      layer: "back",
      gradient: {
        id: "hero-day-gradient-far-haze",
        stops: [
          { offset: "0%", color: "#dde8f6", opacity: 0.55 },
          { offset: "60%", color: "#e5eef9", opacity: 0.65 },
          { offset: "100%", color: "#f0f6fc", opacity: 0.75 }
        ]
      },
      transform: "translate(-120 40) scale(1.42)",
      opacity: 0.5,
      blur: 28,
      mixBlendMode: "multiply"
    },
    {
      key: "day-far-ridge",
      layer: "back",
      gradient: {
        id: "hero-day-gradient-far-ridge",
        stops: [
          { offset: "0%", color: "#d1dff0", opacity: 0.6 },
          { offset: "60%", color: "#dce7f5", opacity: 0.7 },
          { offset: "100%", color: "#e8f0fa", opacity: 0.78 }
        ]
      },
      transform: "translate(70 16) scale(1.28)",
      opacity: 0.6,
      blur: 18,
      mixBlendMode: "multiply"
    },
    {
      key: "day-mid-ridge",
      layer: "mid",
      gradient: {
        id: "hero-day-gradient-mid-ridge",
        stops: [
          { offset: "0%", color: "#c9d8eb", opacity: 0.65 },
          { offset: "55%", color: "#d6e1f2", opacity: 0.75 },
          { offset: "100%", color: "#e3ebf7", opacity: 0.85 }
        ]
      },
      transform: "translate(-80 -4) scale(1.24)",
      opacity: 0.68,
      blur: 12,
      mixBlendMode: "multiply"
    },
    {
      key: "day-mid-highlight",
      layer: "mid",
      gradient: {
        id: "hero-day-gradient-mid-highlight",
        stops: [
          { offset: "0%", color: "#c0d2e9", opacity: 0.68 },
          { offset: "55%", color: "#cedcf0", opacity: 0.78 },
          { offset: "100%", color: "#dce6f6", opacity: 0.88 }
        ]
      },
      transform: "translate(40 -12) scale(1.18)",
      opacity: 0.72,
      blur: 6,
      mixBlendMode: "multiply"
    },
    {
      key: "day-front-base",
      layer: "front",
      gradient: {
        id: "hero-day-gradient-front-base",
        stops: [
          { offset: "0%", color: "#b7cbea", opacity: 0.85 },
          { offset: "55%", color: "#c9daf2", opacity: 0.92 },
          { offset: "100%", color: "#d9e5f8", opacity: 0.95 }
        ]
      },
      transform: "translate(-30 -36) scale(1.28)",
      opacity: 0.9,
      dropShadow: "0 32px 70px rgba(148, 163, 184, 0.35)",
      mixBlendMode: "normal"
    },
    {
      key: "day-front-highlight",
      layer: "front",
      gradient: {
        id: "hero-day-gradient-front-highlight",
        stops: [
          { offset: "0%", color: "#c7d9f3", opacity: 0.85 },
          { offset: "55%", color: "#d5e4f9", opacity: 0.88 },
          { offset: "100%", color: "#e2ecfb", opacity: 0.9 }
        ]
      },
      transform: "translate(140 -26) scale(1.18)",
      opacity: 0.68,
      blur: 8,
      mixBlendMode: "multiply"
    }
  ]
} as const;



const HeroMountainsSvg = ({ variant }: { variant: MountainVariant }) => {

  const clusters = HERO_MOUNTAIN_CLUSTERS[variant];



  return (

    <svg className="hero-mountain-svg" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" xmlnsXlink="http://www.w3.org/1999/xlink">

      <defs>

        {Object.entries(HERO_MOUNTAIN_BASE_PATHS).map(([layer, d]) => (

          <path key={layer} id={`hero-mountain-shape-${layer}`} d={d} />

        ))}

        {clusters.map((cluster) => (

          <linearGradient key={cluster.gradient.id} id={cluster.gradient.id} x1="0" y1="0" x2="0" y2="1">

            {cluster.gradient.stops.map((stop) => (

              <stop

                key={`${cluster.gradient.id}-${stop.offset}`}

                offset={stop.offset}

                stopColor={stop.color}

                stopOpacity={stop.opacity}

              />

            ))}

          </linearGradient>

        ))}

      </defs>



      {clusters.map((cluster) => {

        const filterParts: string[] = [];

        if (cluster.blur) {

          filterParts.push(`blur(${cluster.blur}px)`);

        }

        if (cluster.dropShadow) {

          filterParts.push(`drop-shadow(${cluster.dropShadow})`);

        }

        const filterValue = filterParts.join(" ");



        return (

          <use

            key={cluster.key}

            href={`#hero-mountain-shape-${cluster.layer}`}
            xlinkHref={`#hero-mountain-shape-${cluster.layer}`}

            fill={`url(#${cluster.gradient.id})`}

            opacity={cluster.opacity}

            transform={cluster.transform}

            className={`hero-mountain-path hero-mountain-path--${cluster.layer}`}

            style={{

              filter: filterValue || undefined,

              mixBlendMode: cluster.mixBlendMode

            }}

          />

        );

      })}

    </svg>

  );

};



const HERO_STAR_FIELD = createHeroStarField(120);



const CLOUD_CONFIGS: readonly CloudConfig[] = [
  { top: "18%", left: "6%", scale: 0.85, duration: 30, delay: 0, floatX: "26px", floatY: "-10px" },
  { top: "30%", left: "38%", scale: 1.1, duration: 32, delay: 4, floatX: "24px", floatY: "-8px" },
  { top: "22%", left: "68%", scale: 0.95, duration: 28, delay: 2, floatX: "20px", floatY: "-6px" }
] as const;

const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: TRANSITION_EASE
    }
  })
};

const HeroBackdrop = () => (
  <div className="hero-backdrop">
    <div className="hero-day dark:hidden">
      <div className="hero-sun" />
      <div className="hero-mountains hero-mountains--day">
        <HeroMountainsSvg variant="day" />
      </div>
      {CLOUD_CONFIGS.map((cloud, index) => {
        const style: CSSVariableStyles = {
          top: cloud.top,
          left: cloud.left,
          animationDelay: `${cloud.delay}s`,
          "--cloud-duration": `${cloud.duration}s`,
          "--cloud-scale": `${cloud.scale}`,
          "--float-x": cloud.floatX,
          "--float-y": cloud.floatY
        };

        return <div key={`cloud-${index}`} className="hero-cloud" style={style} />;
      })}
    </div>

    <div className="hero-night hidden dark:block">
      <div className="hero-mountains hero-mountains--night">
        <HeroMountainsSvg variant="night" />
      </div>
      {HERO_STAR_FIELD.map((star, index) => {
        const style: CSSVariableStyles = {
          top: `${formatCssNumber(star.top)}%`,
          left: `calc(-${formatCssNumber(star.startOffset)}vw - 30px)`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          "--hero-star-distance": `${formatCssNumber(star.distance)}vw`,
          "--hero-star-travel": `${formatCssNumber(star.travelDuration)}s`,
          "--hero-star-travel-delay": `${formatCssNumber(star.travelDelay)}s`,
          "--hero-star-twinkle": `${formatCssNumber(star.twinkleDuration)}s`,
          "--hero-star-twinkle-delay": `${formatCssNumber(star.twinkleDelay)}s`,
          "--hero-star-peak-opacity": `${formatCssNumber(star.opacity)}`,
          "--hero-star-vertical": `${formatCssNumber(star.verticalShift)}px`
        };

        return <span key={`star-${index}`} className="hero-star" style={style} />;
      })}
      <div className="hero-moon" />
    </div>
  </div>
);

export const HeroSection = () => {
  const { t } = useTranslation();

  const headline = t("hero.headline", { returnObjects: true }) as HeroHeadline;
  const intro = t("hero.intro");
  const subheadline = t("hero.subheadline");
  const description = t("hero.description");
  const portraitCaption = t("hero.portraitCaption");

  const initials = profile.name
    .split(/\s+/)
    .map((segment) => segment.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      id="home"
      data-section="hero"
      className="relative isolate min-h-[75vh] overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-20"
    >
      <HeroBackdrop />
      <div className="container-xl relative z-10 grid items-center gap-16 lg:grid-cols-[minmax(0,_420px)_minmax(0,_1fr)]">
        <motion.div
          className="hero-portrait-wrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: TRANSITION_EASE }}
        >
          <div className="hero-portrait-card">
            <div className="hero-portrait-glow" />
            <div className="hero-portrait-inner">
              <div className="hero-portrait-ring">
                <span className="hero-portrait-initials">{initials}</span>
              </div>
              <p className="hero-portrait-caption">{portraitCaption}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 text-slate-900 dark:text-white"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          custom={0}
        >
          <motion.p
            className="text-base font-medium text-slate-700 dark:text-white/70 sm:text-lg"
            variants={containerVariants}
            custom={0.05}
          >
            {intro}
          </motion.p>

          <motion.h1
            className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
            variants={containerVariants}
            custom={0.1}
          >
            {headline.lead}{" "}
            <span className="hero-headline-accent">{headline.accent}</span>{" "}
            {headline.trail}
          </motion.h1>

          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-white/60"
            variants={containerVariants}
            custom={0.18}
          >
            {subheadline}
          </motion.p>

          <motion.p
            className="max-w-2xl text-base text-slate-600 dark:text-white/70 sm:text-lg"
            variants={containerVariants}
            custom={0.24}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
