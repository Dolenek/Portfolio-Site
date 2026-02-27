export type StarConfig = {
  top: number;
  startOffset: number;
  size: number;
  travelDuration: number;
  travelDelay: number;
  twinkleDuration: number;
  twinkleDelay: number;
  distance: number;
  opacity: number;
  verticalShift: number;
};

export type CloudConfig = {
  top: number;
  startOffset: number;
  scale: number;
  travelDuration: number;
  travelDelay: number;
  distance: number;
  floatY: number;
  opacity: number;
};

export type MountainVariant = "day" | "night";

export type MountainLayerDefinition = {
  key: string;
  d: string;
};

export type MountainGradientStop = {
  offset: string;
  color: string;
  opacity?: number;
};

export const formatCssNumber = (value: number) => {
  const rounded = Math.round(value * 100) / 100;
  if (Math.abs(rounded) < 0.005) {
    return "0";
  }
  return rounded.toString().replace(/\.0+$/, "");
};

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 9184.233) * 43758.5453;
  return x - Math.floor(x);
};

export const createHeroStarField = (count: number): StarConfig[] => {
  const stars: StarConfig[] = [];

  for (let index = 0; index < count; index += 1) {
    const base = index + 1;
    const top = 4 + pseudoRandom(base) * 46;
    const startOffset = 12 + pseudoRandom(base + 11) * 60;
    const size = 1 + Math.round(pseudoRandom(base + 23) * 2);
    const travelDuration = 26 + pseudoRandom(base + 31) * 26;
    const travelDelay = -pseudoRandom(base + 37) * travelDuration;
    const twinkleDuration = 3.2 + pseudoRandom(base + 41) * 3.4;
    const twinkleDelay = pseudoRandom(base + 47) * 6.5;
    const distance = 160 + pseudoRandom(base + 53) * 90 + startOffset * 0.4;
    const opacity = 0.4 + pseudoRandom(base + 59) * 0.4;
    const verticalShift = (pseudoRandom(base + 67) - 0.5) * 16;

    stars.push({
      top,
      startOffset,
      size,
      travelDuration,
      travelDelay,
      twinkleDuration,
      twinkleDelay,
      distance,
      opacity,
      verticalShift
    });
  }

  return stars;
};

export const createHeroCloudField = (count: number): CloudConfig[] => {
  const clouds: CloudConfig[] = [];

  for (let index = 0; index < count; index += 1) {
    const base = index + 200;
    const top = 8 + pseudoRandom(base) * 40;
    const startOffset = pseudoRandom(base + 7) * 32;
    const scale = 0.7 + pseudoRandom(base + 11) * 0.8;
    const travelDuration = 36 + pseudoRandom(base + 17) * 26;
    const travelDelay = -pseudoRandom(base + 23) * travelDuration;
    const distance = 130 + startOffset + pseudoRandom(base + 29) * 60;
    const floatY = (pseudoRandom(base + 31) - 0.5) * 32;
    const opacity = 0.55 + pseudoRandom(base + 37) * 0.2;

    clouds.push({
      top,
      startOffset,
      scale,
      travelDuration,
      travelDelay,
      distance,
      floatY,
      opacity
    });
  }

  return clouds;
};

export const HERO_MOUNTAIN_LAYERS: readonly MountainLayerDefinition[] = [
  {
    key: "ridge-back",
    d: "M0 260 C 150 238 280 246 420 254 S 720 246 890 260 S 1180 280 1310 266 S 1390 254 1440 260 L1440 400 L0 400 Z"
  },
  {
    key: "ridge-mid",
    d: "M0 280 C 180 264 340 274 520 292 S 880 286 1040 304 S 1290 322 1385 308 S 1425 294 1440 300 L1440 400 L0 400 Z"
  },
  {
    key: "ridge-fore",
    d: "M0 316 C 160 300 340 318 560 334 S 940 322 1120 342 S 1330 354 1440 346 L1440 400 L0 400 Z"
  },
  {
    key: "ridge-front",
    d: "M0 350 C 220 330 450 346 700 352 S 1120 360 1330 370 S 1405 376 1440 380 L1440 400 L0 400 Z"
  }
] as const;

type MountainLayerKey = (typeof HERO_MOUNTAIN_LAYERS)[number]["key"];

type MountainVariantPalette = Record<
  MountainLayerKey,
  {
    stops: readonly MountainGradientStop[];
    opacity?: number;
  }
>;

export const HERO_MOUNTAIN_PALETTE: Record<MountainVariant, MountainVariantPalette> = {
  day: {
    "ridge-back": {
      stops: [
        { offset: "0%", color: "#e9f3ff" },
        { offset: "100%", color: "#cadaf5" }
      ],
      opacity: 0.58
    },
    "ridge-mid": {
      stops: [
        { offset: "0%", color: "#dee9fb" },
        { offset: "100%", color: "#bcd1f1" }
      ],
      opacity: 0.72
    },
    "ridge-fore": {
      stops: [
        { offset: "0%", color: "#d1e1f8" },
        { offset: "100%", color: "#a7c2ea" }
      ],
      opacity: 0.88
    },
    "ridge-front": {
      stops: [
        { offset: "0%", color: "#c6d6f2" },
        { offset: "100%", color: "#f8fafc" }
      ]
    }
  },
  night: {
    "ridge-back": {
      stops: [
        { offset: "0%", color: "#1e3760" },
        { offset: "100%", color: "#142a4a" }
      ],
      opacity: 0.6
    },
    "ridge-mid": {
      stops: [
        { offset: "0%", color: "#162e56" },
        { offset: "100%", color: "#0d203d" }
      ],
      opacity: 0.72
    },
    "ridge-fore": {
      stops: [
        { offset: "0%", color: "#0e233f" },
        { offset: "100%", color: "#08172c" }
      ],
      opacity: 0.9
    },
    "ridge-front": {
      stops: [
        { offset: "0%", color: "#020617" },
        { offset: "100%", color: "#020617" }
      ]
    }
  }
};
