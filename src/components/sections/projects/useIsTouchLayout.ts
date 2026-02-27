import { useEffect, useState } from "react";

const TOUCH_MEDIA_QUERY = "(max-width: 768px)";

export const useIsTouchLayout = () => {
  const [isTouchLayout, setIsTouchLayout] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(TOUCH_MEDIA_QUERY);
    const updateMatch = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsTouchLayout(event.matches);
    };

    updateMatch(mediaQuery);

    const handleChange = (event: MediaQueryListEvent) => {
      updateMatch(event);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    mediaQuery.addListener(handleChange);
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  return isTouchLayout;
};
