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

type MountainLayerDefinition = {
  key: string;
  d: string;
};

const HERO_MOUNTAIN_LAYERS: readonly MountainLayerDefinition[] = [
  {
    key: "ridge-back",
    d: "M0 260 C 150 238 280 246 420 254 S 720 246 890 260 S 1180 280 1310 266 S 1390 254 1440 260 L1440 400 L0 400 Z"
  },
  {
    key: "ridge-mid",
    d: "M0 280 C 180 264 340 274 520 292 S 880 286 1040 304 S 1290 322 1385 308 S 1425 294 1440 300 L1440 400 L0 400 Z"
  },
  {
    key: "ridge-fore",
    d: "M0 316 C 160 300 340 318 560 334 S 940 322 1120 342 S 1330 354 1440 346 L1440 400 L0 400 Z"
  },
  {
    key: "ridge-front",
    d: "M0 350 C 220 330 450 346 700 352 S 1120 360 1330 370 S 1405 376 1440 380 L1440 400 L0 400 Z"
  }
] as const;

type MountainLayerKey = (typeof HERO_MOUNTAIN_LAYERS)[number]["key"];

type MountainGradientStop = {
  offset: string;
  color: string;
  opacity?: number;
};

type MountainVariantPalette = Record<
  MountainLayerKey,
  {
    stops: readonly MountainGradientStop[];
    opacity?: number;
  }
>;

const HERO_MOUNTAIN_PALETTE: Record<MountainVariant, MountainVariantPalette> = {
  day: {
    "ridge-back": {
      stops: [
        { offset: "0%", color: "#e9f3ff" },
        { offset: "100%", color: "#cadaf5" }
      ],
      opacity: 0.58
    },
    "ridge-mid": {
      stops: [
        { offset: "0%", color: "#dee9fb" },
        { offset: "100%", color: "#bcd1f1" }
      ],
      opacity: 0.72
    },
    "ridge-fore": {
      stops: [
        { offset: "0%", color: "#d1e1f8" },
        { offset: "100%", color: "#a7c2ea" }
      ],
      opacity: 0.88
    },
    "ridge-front": {
      stops: [
        { offset: "0%", color: "#c6d6f2" },
        { offset: "100%", color: "#f8fafc" }
      ]
    }
  },
  night: {
    "ridge-back": {
      stops: [
        { offset: "0%", color: "#1e3760" },
        { offset: "100%", color: "#142a4a" }
      ],
      opacity: 0.6
    },
    "ridge-mid": {
      stops: [
        { offset: "0%", color: "#162e56" },
        { offset: "100%", color: "#0d203d" }
      ],
      opacity: 0.72
    },
    "ridge-fore": {
      stops: [
        { offset: "0%", color: "#0e233f" },
        { offset: "100%", color: "#08172c" }
      ],
      opacity: 0.9
    },
    "ridge-front": {
      stops: [
        { offset: "0%", color: "#020617" },
        { offset: "100%", color: "#020617" }
      ]
    }
  }
};

const HeroMountainsSvg = ({ variant }: { variant: MountainVariant }) => {
  const palette = HERO_MOUNTAIN_PALETTE[variant];

  return (
    <svg
      className="hero-mountain-svg"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {HERO_MOUNTAIN_LAYERS.map((layer) => {
          const gradient = palette[layer.key];

          return (
            <linearGradient
              key={`${variant}-${layer.key}-gradient`}
              id={`hero-mountain-${variant}-${layer.key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              {gradient.stops.map((stop) => (
                <stop
                  key={`${variant}-${layer.key}-${stop.offset}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity={stop.opacity ?? 1}
                />
              ))}
            </linearGradient>
          );
        })}
      </defs>

      {HERO_MOUNTAIN_LAYERS.map((layer) => {
        const gradient = palette[layer.key];

        return (
          <path
            key={`${variant}-${layer.key}`}
            d={layer.d}
            fill={`url(#hero-mountain-${variant}-${layer.key})`}
            opacity={gradient.opacity ?? 1}
            className={`hero-mountain-path hero-mountain-path--${layer.key}`}
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
      className="relative isolate -mt-16 min-h-[75vh] overflow-hidden pb-24 pt-16 sm:-mt-20 sm:pb-32 sm:pt-20"
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








