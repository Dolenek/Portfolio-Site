import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { profile } from "../../data/profile";
import { MOTION_EASE } from "../../utils/animation";
import { HeroBackdrop } from "./hero/HeroBackdrop";
import "./hero/HeroBackdrop.css";
import "./hero/HeroPortrait.css";
import "./hero/HeroSection.css";

type HeroHeadline = {
  lead: string;
  accent: string;
  trail: string;
};

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: MOTION_EASE
    }
  })
};

export const HeroSection = () => {
  const { t } = useTranslation();

  const headline = t("hero.headline", { returnObjects: true }) as HeroHeadline;
  const intro = t("hero.intro");
  const subheadline = t("hero.subheadline");
  const description = t("hero.description");

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
      className="hero-section relative isolate -mt-16 min-h-[75vh] overflow-hidden pb-24 pt-16 sm:-mt-20 sm:pb-32 sm:pt-20"
    >
      <HeroBackdrop />

      <div className="container-xl relative z-10 grid items-center gap-16 lg:grid-cols-[minmax(0,_420px)_minmax(0,_1fr)]">
        <motion.div
          className="hero-portrait-wrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: MOTION_EASE }}
        >
          <div className="hero-portrait-card">
            <div className="hero-portrait-glow" />
            <div className="hero-portrait-inner">
              <div className="hero-portrait-media">
                {profile.portraitImage ? (
                  <img
                    src={profile.portraitImage}
                    alt={profile.portraitAlt ?? `${profile.name} portrait`}
                    className="hero-portrait-media-image"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="hero-portrait-placeholder">
                    <span className="hero-portrait-initials">{initials}</span>
                  </div>
                )}
                <div className="hero-portrait-media-overlay" aria-hidden="true" />
              </div>
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
            {headline.lead} <span className="hero-headline-accent">{headline.accent}</span> {headline.trail}
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
