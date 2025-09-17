import { ArrowDownRight, ArrowRight, Mail, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { profile } from "../../data/profile";
import { useScrollSpy } from "../../providers/ScrollSpyProvider";

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

export const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { scrollToSection } = useScrollSpy();
  const highlights = t("hero.highlights", { returnObjects: true }) as string[];
  const snapshot = t("hero.snapshot", { returnObjects: true }) as Record<string, string>;

  return (
    <section id="home" data-section="hero" className="container-xl relative overflow-hidden">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="flex flex-col gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          custom={0}
        >
          <motion.span
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300"
            custom={0.1}
            variants={containerVariants}
          >
            <UserRound className="h-4 w-4" />
            {t("hero.eyebrow")}
          </motion.span>

          <motion.h1
            className="text-4xl font-semibold text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            variants={containerVariants}
            custom={0.15}
          >
            {t("hero.headline")}
          </motion.h1>

          <motion.p
            className="max-w-2xl text-lg text-slate-600 sm:text-xl dark:text-slate-300"
            variants={containerVariants}
            custom={0.2}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            variants={containerVariants}
            custom={0.25}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:shadow-xl hover:shadow-slate-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:bg-white dark:text-slate-900"
            >
              {t("hero.primaryCta")}
              <ArrowDownRight className="h-4 w-4 transition group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() => navigate("/about")}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              {t("hero.secondaryCta")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.ul className="grid gap-3 sm:grid-cols-3" variants={containerVariants} custom={0.3}>
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-brand hover:shadow-lg hover:shadow-brand/10 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-200"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: TRANSITION_EASE }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand/30 via-slate-200/40 to-transparent blur-3xl dark:from-brand/20 dark:via-slate-800/40" />
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/70 p-8 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/70">
            <div className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              {snapshot.title}
            </div>
            <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white/70 p-4 dark:border-slate-800/60 dark:bg-slate-900/70">
                <Mail className="h-9 w-9 rounded-full bg-brand/20 p-2 text-brand" />
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                    {snapshot.contactLabel}
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">{profile.email}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white/80 to-white/40 p-4 dark:border-slate-800/60 dark:from-slate-900/70 dark:to-slate-900/40">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                    {snapshot.focusLabel}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">{snapshot.focusValue}</p>
                </article>
                <article className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white/80 to-white/40 p-4 dark:border-slate-800/60 dark:from-slate-900/70 dark:to-slate-900/40">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                    {snapshot.locationLabel}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">{snapshot.locationValue}</p>
                </article>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
