import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { skillCategories } from "../../data/skills";
import { createStaggerFade } from "../../utils/animation";

const SKILL_CARD_VARIANTS = createStaggerFade();

type SkillCopy = {
  title: string;
  description: string;
  items: string[];
};

type SkillCopyMap = Record<string, SkillCopy>;

export const SkillsSection = () => {
  const { t } = useTranslation();
  const categories = t("skills.categories", { returnObjects: true }) as SkillCopyMap;

  return (
    <section id="skills" data-section="skills" className="container-xl">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
          {t("skills.heading")}
        </h2>
        <p className="mt-2 max-w-3xl text-base text-slate-600 dark:text-slate-300">
          {t("skills.subheading")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map(({ id, Icon }, index) => {
          const copy = categories[id];
          return (
            <motion.article
              key={id}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800/70 dark:bg-slate-900/70"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={SKILL_CARD_VARIANTS}
              custom={index}
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-3xl transition duration-500 group-hover:bg-brand/25" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{copy?.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{copy?.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {copy?.items?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200/70 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
