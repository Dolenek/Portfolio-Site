import { memo, useState } from "react";
import { Github, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { RevealOnView } from "../common/RevealOnView";
import { profile } from "../../data/profile";

const ContactSectionComponent = () => {
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
      <RevealOnView
        className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800/70 dark:bg-slate-900/80"
        rootMargin="-120px 0px"
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
              type="button"
              onClick={copyEmail}
              className="group grid w-full grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-x-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-4 transition hover:border-brand hover:shadow-lg hover:shadow-brand/10 dark:border-slate-800/70 dark:bg-slate-950/70"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/30 transition group-hover:scale-105 dark:bg-white dark:text-slate-900">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {t("contact.emailLabel")}
                </p>
                <p className="max-w-full whitespace-nowrap text-[0.82rem] font-semibold text-slate-900 dark:text-white sm:text-sm">
                  {profile.email}
                </p>
              </div>
              <span className="justify-self-end rounded-full bg-brand/10 px-2.5 py-1.5 text-xs font-semibold text-brand">
                {copied ? t("contact.copied") : t("contact.copy")}
              </span>
            </button>
            <span className="sr-only" aria-live="polite">{copied ? t("contact.copied") : ""}</span>

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
            </div>
          </div>
        </div>
      </RevealOnView>
    </section>
  );
};

export const ContactSection = memo(ContactSectionComponent);
