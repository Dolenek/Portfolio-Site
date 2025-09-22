import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { skillHighlights } from "../../data/skills";
import { createStaggerFade } from "../../utils/animation";
import "./SkillsSection.css";

const CARD_VARIANTS = createStaggerFade({ distance: 28, duration: 0.55, stagger: 0.09 });

type SkillCardCopyMap = Record<string, string>;

export const SkillsSection = () => {
  const { t } = useTranslation();
  const cards = t("skills.cards", { returnObjects: true }) as SkillCardCopyMap;

  return (
    <section id="skills" data-section="skills" className="skills-panel container-xl">
      <header className="skills-panel__header">
        <p className="skills-panel__eyebrow">{t("skills.eyebrow")}</p>
        <h2 className="skills-panel__title">{t("skills.heading")}</h2>
        <p className="skills-panel__subtitle">{t("skills.subheading")}</p>
      </header>

      <motion.ul
        className="skills-panel__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {skillHighlights.map(({ id, accent, initial, iconSrc }, index) => {
          const title = cards[id] ?? id;
          return (
            <motion.li key={id} className="skills-panel__grid-item" variants={CARD_VARIANTS} custom={index}>
              <article className="skills-grid__card" tabIndex={0} aria-label={title}>
                <div className={`skills-grid__icon bg-gradient-to-br ${accent}`} aria-hidden="true">
                  {iconSrc ? (
                    <img src={iconSrc} alt="" className="skills-grid__icon-image" loading="lazy" />
                  ) : (
                    <span>{initial}</span>
                  )}
                </div>
                <div className="skills-grid__content">
                  <h3 className="skills-grid__title">{title}</h3>
                </div>
              </article>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
};
