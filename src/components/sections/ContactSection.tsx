import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { profile } from "../../data/profile";

const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: TRANSITION_EASE
    }
  }
};

export const ContactSection = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error("Failed to copy email", error);
    }
  };

  return (
    <section id="contact" data-section="contact" className="container-xl">
      <motion.div
        className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800/70 dark:bg-slate-900/80"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={containerVariants}
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
              {t("contact.heading")}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              {t("contact.description")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={copyEmail}
              className="group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-left transition hover:border-brand hover:shadow-lg hover:shadow-brand/10 dark:border-slate-800/70 dark:bg-slate-950/70"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/30 transition group-hover:scale-105 dark:bg-white dark:text-slate-900">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    {t("contact.emailLabel")}
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">{profile.email}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-brand">
                {copied ? t("contact.copied") : t("contact.copy")}
              </span>
            </button>

            <div className="flex flex-wrap gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 min-w-[220px] items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 transition hover:border-brand hover:shadow-lg hover:shadow-brand/10 dark:border-slate-800/70 dark:bg-slate-950/70"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/30 transition group-hover:scale-105 dark:bg-white dark:text-slate-900">
                  <Github className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    {t("contact.platforms.github")}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profile.github.replace("https://", "")}</p>
                </div>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 min-w-[220px] items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 transition hover:border-brand hover:shadow-lg hover:shadow-brand/10 dark:border-slate-800/70 dark:bg-slate-950/70"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/30 transition group-hover:scale-105 dark:bg-white dark:text-slate-900">
                  <Linkedin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    {t("contact.platforms.linkedin")}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">LinkedIn</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
