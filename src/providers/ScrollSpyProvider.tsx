import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

export type SectionId = "hero" | "projects" | "skills" | "contact";

type ScrollSpyContextValue = {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  scrollToSection: (section: SectionId) => void;
  scrollToTop: () => void;
};

const ScrollSpyContext = createContext<ScrollSpyContextValue | undefined>(undefined);

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: [0.15, 0.4, 0.6]
};

type Props = {
  children: ReactNode;
};

export const ScrollSpyProvider = ({ children }: Props) => {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible[0]) {
        const sectionId = visible[0].target.getAttribute("data-section") as SectionId | null;
        if (sectionId) {
          setActiveSection(sectionId);
        }
      }
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const scrollToSection = useCallback((section: SectionId) => {
    const target = document.querySelector<HTMLElement>(`[data-section="${section}"]`);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const value = useMemo(
    () => ({ activeSection, setActiveSection, scrollToSection, scrollToTop }),
    [activeSection, scrollToSection, scrollToTop]
  );

  return <ScrollSpyContext.Provider value={value}>{children}</ScrollSpyContext.Provider>;
};

export const useScrollSpy = () => {
  const context = useContext(ScrollSpyContext);

  if (!context) {
    throw new Error("useScrollSpy must be used within ScrollSpyProvider");
  }

  return context;
};
