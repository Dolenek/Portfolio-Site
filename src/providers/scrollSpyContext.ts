import { createContext } from "react";

export type SectionId = "hero" | "projects" | "contact";

export type ScrollSpyContextValue = {
  activeSection: SectionId;
  scrollToSection: (section: SectionId) => void;
  scrollToTop: () => void;
};

export const ScrollSpyContext = createContext<ScrollSpyContextValue | undefined>(undefined);
