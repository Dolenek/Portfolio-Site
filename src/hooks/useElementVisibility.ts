import { useEffect, useState, type RefObject } from "react";

type VisibilityOptions = {
  rootMargin?: string;
  threshold?: number;
};

export const useElementVisibility = (
  elementRef: RefObject<Element | null>,
  { rootMargin = "0px", threshold = 0.05 }: VisibilityOptions = {}
) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    let isIntersecting = true;
    const updateVisibility = () => {
      setIsVisible(isIntersecting && document.visibilityState !== "hidden");
    };
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      updateVisibility();
    }, { root: null, rootMargin, threshold });

    observer.observe(element);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [elementRef, rootMargin, threshold]);

  return isVisible;
};
