import { memo } from "react";
import { useTranslation } from "react-i18next";

import { RevealOnView } from "../common/RevealOnView";
import { skillHighlights } from "../../data/skills";
import "./SkillsSection.css";

type SkillCardCopyMap = Record<string, string>;

const SkillsSectionComponent = () => {
  const { t } = useTranslation();
  const cards = t("skills.cards", { returnObjects: true }) as SkillCardCopyMap;

  return (
    <section id="skills" data-section="skills" className="skills-panel container-xl">
      <header className="skills-panel__header">
        <h2 className="skills-panel__title">{t("skills.heading")}</h2>
      </header>

      <RevealOnView as="ul" className="skills-panel__grid" rootMargin="-80px 0px">
        {skillHighlights.map(({ id, accent, initial, iconSrc }, index) => {
          const title = cards[id] ?? id;
          const isAiAssistedEngineering = id === "ai-assisted-engineering";

          return (
            <RevealOnView
              key={id}
              as="li"
              className="skills-panel__grid-item"
              delay={index * 70}
              rootMargin="-80px 0px"
            >
              <article className="skills-grid__card" tabIndex={0} aria-label={title}>
                <div className={`skills-grid__icon bg-gradient-to-br ${accent}`} aria-hidden="true">
                  {iconSrc ? (
                    <img
                      src={iconSrc}
                      alt=""
                      className={`skills-grid__icon-image${
                        isAiAssistedEngineering ? " skills-grid__icon-image--ai-assisted" : ""
                      }`}
                      loading="lazy"
                      decoding="async"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <span>{initial}</span>
                  )}
                </div>
                <div className="skills-grid__content">
                  <h3 className="skills-grid__title">{title}</h3>
                </div>
              </article>
            </RevealOnView>
          );
        })}
      </RevealOnView>
    </section>
  );
};

export const SkillsSection = memo(SkillsSectionComponent);

