import { memo, type CSSProperties } from "react";

import type { Theme } from "../../../providers/themeContext";
import { cn } from "../../../utils/cn";
import { HeroMountainsSvg } from "./HeroMountainsSvg";
import type { CloudConfig, StarConfig } from "./sceneConfig";
import { formatCssNumber } from "./sceneConfig";

type CSSVariableStyles = CSSProperties & Record<string, string>;

type HeroBackdropProps = {
  theme: Theme;
  clouds: CloudConfig[];
  stars: StarConfig[];
  reduceVisualEffects: boolean;
  disableTwinkle: boolean;
};

const HeroBackdropComponent = ({
  theme,
  clouds,
  stars,
  reduceVisualEffects,
  disableTwinkle
}: HeroBackdropProps) => {
  const isDarkTheme = theme === "dark";
  const renderStars = () =>
    stars.map((star, index) => {
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
    });

  const renderClouds = () =>
    clouds.map((cloud, index) => {
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
    });

  return (
    <div
      className={cn("hero-backdrop", {
        "hero-backdrop--reduced-effects": reduceVisualEffects,
        "hero-backdrop--no-twinkle": disableTwinkle
      })}
    >
      {isDarkTheme ? (
        <div className="hero-night">
          <div className="hero-mountains hero-mountains--night">
            <HeroMountainsSvg variant="night" />
          </div>

          {renderStars()}

          <div className="hero-moon" />
        </div>
      ) : (
        <div className="hero-day">
          <div className="hero-sun" />
          <div className="hero-mountains hero-mountains--day">
            <HeroMountainsSvg variant="day" />
          </div>

          {renderClouds()}
        </div>
      )}
    </div>
  );
};

export const HeroBackdrop = memo(HeroBackdropComponent);
