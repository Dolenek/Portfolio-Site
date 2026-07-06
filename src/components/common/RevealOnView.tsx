import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from "react";

import { cn } from "../../utils/cn";

type RevealTag = "div" | "section" | "ul" | "li";

type RevealOnViewProps = HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  children: ReactNode;
  delay?: number;
  rootMargin?: string;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay"?: string;
};

const useRevealState = (elementRef: React.RefObject<HTMLElement | null>, rootMargin: string) => {
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasRevealed || typeof IntersectionObserver === "undefined") {
      setHasRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasRevealed(true);
        observer.disconnect();
      }
    }, { root: null, rootMargin, threshold: 0.12 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, hasRevealed, rootMargin]);

  return hasRevealed;
};

export const RevealOnView = ({
  as = "div",
  children,
  className,
  delay = 0,
  rootMargin = "-80px 0px",
  style,
  ...rest
}: RevealOnViewProps) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const hasRevealed = useRevealState(elementRef, rootMargin);
  const revealStyle: RevealStyle = {
    ...style,
    "--reveal-delay": `${delay}ms`
  };

  return createElement(
    as,
    {
      ...rest,
      ref: elementRef,
      className: cn("reveal-on-view", hasRevealed && "reveal-on-view--visible", className),
      style: revealStyle
    },
    children
  );
};
