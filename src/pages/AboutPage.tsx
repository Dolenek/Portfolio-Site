import { useEffect, useRef, useState } from "react";

import { ArrowLeft } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { MOTION_EASE } from "../utils/animation";
import { useScrollTopReset } from "../hooks/useScrollTopReset";

type TimelineItem = {
  id: string;
  title: string;
  period: string;
  location: string;
  link?: {
    label: string;
    href: string;
  };
  description: string;
  tags: string[];
};

const TIMELINE_VARIANTS = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: MOTION_EASE },
  },
} as const;

export const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const timeline = t("about.timeline", { returnObjects: true }) as TimelineItem[];
  const [hasTimelineAnimated, setHasTimelineAnimated] = useState(false);
  const timelineControls = useAnimation();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineInView = useInView(timelineRef, { margin: "-120px 0px 0px 0px" });

  useEffect(() => {
    if (timelineInView && !hasTimelineAnimated) {
      timelineControls.start("visible");
      setHasTimelineAnimated(true);
    }
  }, [timelineControls, timelineInView, hasTimelineAnimated]);

  useScrollTopReset(() => {
    timelineControls.set("hidden");
  }, { enabled: !hasTimelineAnimated });

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
        className="max-w-3xl space-y-6"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: MOTION_EASE }}
      >
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{t("about.title")}</h1>
        <p className="whitespace-pre-line text-lg text-slate-600 dark:text-slate-300">
          <Trans
            i18nKey="about.intro"
            components={{
              highlight: (
                <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent" />
              ),
            }}
          />
        </p>
      </motion.section>

      <motion.section
        ref={timelineRef}
        className="mt-16"
        initial="hidden"
        animate={timelineControls}
        variants={TIMELINE_VARIANTS}
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
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.location}
                    {item.link ? (
                      <>
                        {" "}
                        {t("about.timelineAt")}{" "}
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-brand transition hover:underline"
                        >
                          {item.link.label}
                        </a>
                      </>
                    ) : null}
                  </p>
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
    </div>
  );
};
