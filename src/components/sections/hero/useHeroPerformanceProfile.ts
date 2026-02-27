import { useMemo } from "react";

import {
  createHeroCloudField,
  createHeroStarField,
  type CloudConfig,
  type StarConfig
} from "./sceneConfig";

type HeroPerformanceProfile = {
  clouds: CloudConfig[];
  stars: StarConfig[];
  reduceVisualEffects: boolean;
  disableTwinkle: boolean;
};

type RuntimeSignals = {
  isChrome: boolean;
  isBrave: boolean;
  isLowMemory: boolean;
  isLowCpu: boolean;
  prefersReducedMotion: boolean;
  isSmallViewport: boolean;
};

const readRuntimeSignals = (): RuntimeSignals => {
  if (typeof window === "undefined") {
    return {
      isChrome: false,
      isBrave: false,
      isLowMemory: false,
      isLowCpu: false,
      prefersReducedMotion: false,
      isSmallViewport: false
    };
  }

  const ua = window.navigator.userAgent;
  const isChrome = /\bChrome\//.test(ua) && !/\bEdg\//.test(ua) && !/\bOPR\//.test(ua);
  const isBrave = Boolean((window.navigator as Navigator & { brave?: unknown }).brave);
  const deviceMemory = (window.navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const hardwareConcurrency = window.navigator.hardwareConcurrency;

  return {
    isChrome,
    isBrave,
    isLowMemory: typeof deviceMemory === "number" && deviceMemory <= 4,
    isLowCpu: typeof hardwareConcurrency === "number" && hardwareConcurrency <= 4,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    isSmallViewport: window.matchMedia("(max-width: 768px)").matches
  };
};

const resolveAnimationBudget = (signals: RuntimeSignals) => {
  let starCount = 96;
  let cloudCount = 11;
  let reduceVisualEffects = false;
  let disableTwinkle = false;

  const shouldUseLeanProfile =
    signals.prefersReducedMotion ||
    signals.isLowMemory ||
    signals.isLowCpu ||
    (signals.isChrome && !signals.isBrave);

  if (shouldUseLeanProfile) {
    starCount = 52;
    cloudCount = 7;
    reduceVisualEffects = true;
    disableTwinkle = true;
  }

  if (signals.isSmallViewport) {
    starCount = Math.min(starCount, 40);
    cloudCount = Math.min(cloudCount, 5);
  }

  if (signals.prefersReducedMotion) {
    starCount = Math.min(starCount, 20);
    cloudCount = Math.min(cloudCount, 3);
  }

  return { starCount, cloudCount, reduceVisualEffects, disableTwinkle };
};

export const useHeroPerformanceProfile = (): HeroPerformanceProfile => {
  const signals = useMemo(() => readRuntimeSignals(), []);
  const budget = useMemo(() => resolveAnimationBudget(signals), [signals]);

  const stars = useMemo(() => createHeroStarField(budget.starCount), [budget.starCount]);
  const clouds = useMemo(() => createHeroCloudField(budget.cloudCount), [budget.cloudCount]);

  return {
    stars,
    clouds,
    reduceVisualEffects: budget.reduceVisualEffects,
    disableTwinkle: budget.disableTwinkle
  };
};
