import { useEffect, useRef } from "react";

type Callback = () => void;

type Options = {
  enabled?: boolean;
};

const isAtTop = () => window.scrollY <= 0;

export const useScrollTopReset = (callback: Callback, options: Options = {}) => {
  const { enabled = true } = options;
  const callbackRef = useRef<Callback>(callback);
  const lastAtTopRef = useRef<boolean>(isAtTop());

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    lastAtTopRef.current = isAtTop();

    const handleScroll = () => {
      const atTop = isAtTop();

      if (atTop && !lastAtTopRef.current) {
        callbackRef.current();
      }

      lastAtTopRef.current = atTop;
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        lastAtTopRef.current = isAtTop();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [enabled]);
};
