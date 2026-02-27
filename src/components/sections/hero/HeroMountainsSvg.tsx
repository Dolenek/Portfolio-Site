import { HERO_MOUNTAIN_LAYERS, HERO_MOUNTAIN_PALETTE, type MountainVariant } from "./sceneConfig";

type HeroMountainsSvgProps = {
  variant: MountainVariant;
};

export const HeroMountainsSvg = ({ variant }: HeroMountainsSvgProps) => {
  const palette = HERO_MOUNTAIN_PALETTE[variant];

  return (
    <svg
      className="hero-mountain-svg"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {HERO_MOUNTAIN_LAYERS.map((layer) => {
          const gradient = palette[layer.key];

          return (
            <linearGradient
              key={`${variant}-${layer.key}-gradient`}
              id={`hero-mountain-${variant}-${layer.key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              {gradient.stops.map((stop) => (
                <stop
                  key={`${variant}-${layer.key}-${stop.offset}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity={stop.opacity ?? 1}
                />
              ))}
            </linearGradient>
          );
        })}
      </defs>

      {HERO_MOUNTAIN_LAYERS.map((layer) => {
        const gradient = palette[layer.key];

        return (
          <path
            key={`${variant}-${layer.key}`}
            d={layer.d}
            fill={`url(#hero-mountain-${variant}-${layer.key})`}
            opacity={gradient.opacity ?? 1}
            className={`hero-mountain-path hero-mountain-path--${layer.key}`}
          />
        );
      })}
    </svg>
  );
};
