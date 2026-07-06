import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import type { SectionId } from "../../providers/scrollSpyContext";

type RouteState = {
  scrollTo?: SectionId;
} | null;

const hasSectionScrollTarget = (state: unknown): state is RouteState => {
  return Boolean(
    state &&
      typeof state === "object" &&
      "scrollTo" in state &&
      typeof (state as RouteState)?.scrollTo === "string"
  );
};

export const RouteScrollReset = () => {
  const location = useLocation();

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    if (location.pathname === "/" && hasSectionScrollTarget(location.state)) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.state]);

  return null;
};
