import { memo } from "react";
import { ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { profile } from "../../data/profile";
import { useTheme } from "../../providers/useTheme";
import { MOTION_EASE } from "../../utils/animation";
import { HeroBackdrop } from "./hero/HeroBackdrop";
import { useHeroPerformanceProfile } from "./hero/useHeroPerformanceProfile";
import "./hero/HeroBackdrop.css";
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

const HeroSectionComponent = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { clouds, stars, reduceVisualEffects, disableTwinkle } = useHeroPerformanceProfile();

  const headline = t("hero.headline", { returnObjects: true }) as HeroHeadline;
  const intro = t("hero.intro");
  const hasHeadlineTrail = headline.trail.trim().length > 0;

  return (
    <section
      id="home"
      data-section="hero"
      className="hero-section relative isolate -mt-16 min-h-[78vh] overflow-hidden pb-24 pt-16 font-mono sm:-mt-20 sm:pb-32 sm:pt-20"
    >
      <HeroBackdrop
        theme={theme}
        clouds={clouds}
        stars={stars}
        reduceVisualEffects={reduceVisualEffects}
        disableTwinkle={disableTwinkle}
      />

      <div className="container-xl relative z-10 flex min-h-[calc(78vh-4rem)] items-center">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          custom={0}
        >
          <motion.h1
            className="hero-title text-3xl font-bold leading-tight tracking-normal sm:text-4xl lg:text-5xl"
            variants={containerVariants}
            custom={0.05}
          >
            {intro} <span className="hero-headline-accent">{headline.lead}</span>{" "}
            <span className="hero-headline-accent">{headline.accent}</span>
            {hasHeadlineTrail ? ` ${headline.trail}` : null}
          </motion.h1>

          <motion.p
            className="hero-copy mt-6 max-w-2xl text-base font-medium leading-8 sm:text-lg"
            variants={containerVariants}
            custom={0.12}
          >
            <Trans
              i18nKey="hero.description"
              components={{
                highlight: <span className="hero-copy-highlight" />
              }}
            />
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4 text-sm font-semibold"
            variants={containerVariants}
            custom={0.2}
          >
            <a className="hero-social-link" href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" aria-hidden="true" />
              {t("hero.links.github")}
            </a>
            <span className="hero-link-divider" aria-hidden="true">
              |
            </span>
            <Link className="hero-social-link" to="/about">
              {t("hero.links.about")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const HeroSection = memo(HeroSectionComponent);
