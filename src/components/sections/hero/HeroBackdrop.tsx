import type { CSSProperties } from "react";

import { HeroMountainsSvg } from "./HeroMountainsSvg";
import { HERO_DAY_CLOUDS, HERO_STAR_FIELD, formatCssNumber } from "./sceneConfig";

type CSSVariableStyles = CSSProperties & Record<string, string>;

export const HeroBackdrop = () => {
  return (
    <div className="hero-backdrop">
      <div className="hero-day dark:hidden">
        <div className="hero-sun" />
        <div className="hero-mountains hero-mountains--day">
          <HeroMountainsSvg variant="day" />
        </div>

        {HERO_DAY_CLOUDS.map((cloud, index) => {
          const style: CSSVariableStyles = {
            top: `${formatCssNumber(cloud.top)}%`,
            left: `calc(100vw + ${formatCssNumber(cloud.startOffset)}vw)`,
            animationDelay: `${formatCssNumber(cloud.travelDelay)}s`,
            "--cloud-duration": `${formatCssNumber(cloud.travelDuration)}s`,
            "--cloud-scale": `${formatCssNumber(cloud.scale)}`,
            "--cloud-distance": `${formatCssNumber(cloud.distance)}vw`,
            "--cloud-float-y": `${formatCssNumber(cloud.floatY)}px`,
            "--cloud-opacity": `${formatCssNumber(cloud.opacity)}`
          };

          return <div key={`cloud-${index}`} className="hero-cloud" style={style} />;
        })}
      </div>

      <div className="hero-night hidden dark:block">
        <div className="hero-mountains hero-mountains--night">
          <HeroMountainsSvg variant="night" />
        </div>

        {HERO_STAR_FIELD.map((star, index) => {
          const style: CSSVariableStyles = {
            top: `${formatCssNumber(star.top)}%`,
            left: `calc(-${formatCssNumber(star.startOffset)}vw - 30px)`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--hero-star-distance": `${formatCssNumber(star.distance)}vw`,
            "--hero-star-travel": `${formatCssNumber(star.travelDuration)}s`,
            "--hero-star-travel-delay": `${formatCssNumber(star.travelDelay)}s`,
            "--hero-star-twinkle": `${formatCssNumber(star.twinkleDuration)}s`,
            "--hero-star-twinkle-delay": `${formatCssNumber(star.twinkleDelay)}s`,
            "--hero-star-peak-opacity": `${formatCssNumber(star.opacity)}`,
            "--hero-star-vertical": `${formatCssNumber(star.verticalShift)}px`
          };

          return <span key={`star-${index}`} className="hero-star" style={style} />;
        })}

        <div className="hero-moon" />
      </div>
    </div>
  );
};
