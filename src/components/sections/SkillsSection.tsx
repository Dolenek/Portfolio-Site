import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { skillHighlights } from "../../data/skills";
import { createStaggerFade } from "../../utils/animation";
import "./SkillsSection.css";

const ICON_VARIANTS = createStaggerFade({ distance: 24, duration: 0.6, stagger: 0.08 });

type HighlightLabelMap = Record<string, string>;

export const SkillsSection = () => {
  const { t } = useTranslation();
  const labels = t("skills.highlightLabels", { returnObjects: true }) as HighlightLabelMap;

  return (
    <section id="skills" data-section="skills" className="skills-panel container-xl">
      <header className="skills-panel__header">
        <p className="skills-panel__eyebrow">{t("skills.eyebrow")}</p>
        <h2 className="skills-panel__title">{t("skills.heading")}</h2>
        <p className="skills-panel__subtitle">{t("skills.subheading")}</p>
      </header>

      <motion.ul
        className="skills-panel__icon-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {skillHighlights.map(({ id, Icon, accent }, index) => {
          const label = labels[id] ?? id;
          return (
            <motion.li key={id} className="skills-panel__icon-item" variants={ICON_VARIANTS} custom={index}>
              <button
                type="button"
                className={`skills-panel__icon-trigger bg-gradient-to-br ${accent}`}
                aria-label={label}
              >
                <Icon className="skills-panel__icon-glyph" aria-hidden="true" />
              </button>
              <span className="skills-panel__icon-tooltip" aria-hidden="true">
                {label}
              </span>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
};
