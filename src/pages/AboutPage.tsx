import { ArrowLeft, MapPin, Target, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { profile } from "../data/profile";

const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

type TimelineItem = {
  id: string;
  title: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
};

type ValueItem = {
  title: string;
  description: string;
};

export const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const snapshot = t("about.snapshot", { returnObjects: true }) as Record<string, string>;
  const timeline = t("about.timeline", { returnObjects: true }) as TimelineItem[];
  const values = t("about.values", { returnObjects: true }) as ValueItem[];

  return (
    <div className="container-xl pb-24 pt-12 sm:pt-16">
      <button
        onClick={() => navigate("/", { state: { scrollTo: "hero" } })}
        className="group mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-800/70 dark:bg-slate-900/80 dark:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
        {t("about.backCta")}
      </button>

      <motion.section
        className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: TRANSITION_EASE }}
      >
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{t("about.title")}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">{t("about.intro")}</p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-800/70 dark:bg-slate-900/80">
              <MapPin className="mb-3 h-6 w-6 text-brand" />
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{t("about.title")}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{snapshot.location}</p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-800/70 dark:bg-slate-900/80">
              <Target className="mb-3 h-6 w-6 text-brand" />
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Focus</p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{snapshot.focus}</p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-800/70 dark:bg-slate-900/80">
              <UserCheck className="mb-3 h-6 w-6 text-brand" />
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Mindset</p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{snapshot.mindset}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 dark:border-slate-800/70 dark:bg-slate-900/80">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/20 via-transparent to-transparent blur-3xl" />
          <h2 className="text-lg font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
            {profile.name}
          </h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            {t("hero.description")}
          </p>
          <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>{snapshot.focus}</p>
            <p>{snapshot.mindset}</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: TRANSITION_EASE }}
      >
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{t("about.timelineHeading")}</h2>
        <div className="mt-8 space-y-6">
          {timeline.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800/70 dark:bg-slate-900/70"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.location}</p>
                </div>
                <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white dark:bg-white dark:text-slate-900">
                  {item.period}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200/70 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 transition group-hover:border-brand group-hover:text-brand dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: TRANSITION_EASE }}
      >
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{t("about.valuesHeading")}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800/70 dark:bg-slate-900/70"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-3xl transition duration-500 group-hover:bg-brand/20" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{value.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{value.description}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};
