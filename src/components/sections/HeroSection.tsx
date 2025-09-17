import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { profile } from "../../data/profile";
import "./HeroSection.css";

type CSSVariableStyles = CSSProperties & Record<string, string>;

type StarConfig = {
  top: string;
  left: string;
  size: number;
  delay: string;
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

const STAR_POSITIONS: readonly StarConfig[] = [
  { top: "8%", left: "14%", size: 2, delay: "0s" },
  { top: "16%", left: "28%", size: 2, delay: "1.2s" },
  { top: "11%", left: "40%", size: 3, delay: "0.8s" },
  { top: "6%", left: "54%", size: 2, delay: "2.1s" },
  { top: "18%", left: "66%", size: 2, delay: "1.6s" },
  { top: "22%", left: "78%", size: 3, delay: "0.4s" },
  { top: "13%", left: "8%", size: 2, delay: "1.9s" },
  { top: "26%", left: "22%", size: 2, delay: "2.8s" },
  { top: "20%", left: "48%", size: 2, delay: "3.2s" },
  { top: "9%", left: "72%", size: 2, delay: "2.5s" },
  { top: "14%", left: "86%", size: 2, delay: "0.9s" },
  { top: "24%", left: "60%", size: 2, delay: "1.3s" }
] as const;

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
        <div className="hero-mountain hero-mountain--back" />
        <div className="hero-mountain hero-mountain--mid" />
        <div className="hero-mountain hero-mountain--front" />
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
        <div className="hero-mountain hero-mountain--back" />
        <div className="hero-mountain hero-mountain--mid" />
        <div className="hero-mountain hero-mountain--front" />
      </div>
      {STAR_POSITIONS.map((star, index) => {
        const style: CSSProperties = {
          top: star.top,
          left: star.left,
          width: `${star.size}px`,
          height: `${star.size}px`,
          animationDelay: star.delay
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
