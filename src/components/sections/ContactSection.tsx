import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { profile } from "../../data/profile";
import { createStaggerFade } from "../../utils/animation";

const CONTACT_CARD_VARIANTS = createStaggerFade({ distance: 20, duration: 0.6, stagger: 0 });

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
        variants={CONTACT_CARD_VARIANTS}
      >
        <div className="grid justify-items-stretch gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex w-full max-w-xl flex-col items-start text-left lg:max-w-none">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-white">
              {t("contact.heading.lead")} {" "}
              <span className="bg-gradient-to-r from-[#61dafb] via-[#21a1f1] to-[#087ea4] bg-clip-text text-transparent">
                {t("contact.heading.accent")}
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 lg:max-w-none">
              {t("contact.description")}
            </p>
            <Link to="/about" className="mt-4 inline-flex items-center text-sm font-semibold text-brand transition hover:underline">
              {t("contact.learnMore")}
            </Link>
          </div>

          <div className="flex w-full max-w-xl flex-col gap-4 lg:max-w-none">
            <button
              onClick={copyEmail}
              className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-4 transition hover:border-brand hover:shadow-lg hover:shadow-brand/10 dark:border-slate-800/70 dark:bg-slate-950/70"
            >
              <div className="flex flex-1 min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/30 transition group-hover:scale-105 dark:bg-white dark:text-slate-900">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-left">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {t("contact.emailLabel")}
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white break-all">{profile.email}</p>
                </div>
              </div>
              <span className="ml-auto text-sm font-medium text-brand">
                {copied ? t("contact.copied") : t("contact.copy")}
              </span>
            </button>

            <div className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-start">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-4 transition hover:border-brand hover:shadow-lg hover:shadow-brand/10 dark:border-slate-800/70 dark:bg-slate-950/70 sm:flex-1 sm:min-w-[220px]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/30 transition group-hover:scale-105 dark:bg-white dark:text-slate-900">
                  <Github className="h-5 w-5" />
                </span>
                <div className="min-w-0">
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
                className="group flex w-full items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-4 transition hover:border-brand hover:shadow-lg hover:shadow-brand/10 dark:border-slate-800/70 dark:bg-slate-950/70 sm:flex-1 sm:min-w-[220px]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/30 transition group-hover:scale-105 dark:bg-white dark:text-slate-900">
                  <Linkedin className="h-5 w-5" />
                </span>
                <div className="min-w-0">
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



