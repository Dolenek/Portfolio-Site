import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { useScrollSpy, type SectionId } from "../providers/ScrollSpyProvider";

type LocationState = {
  scrollTo?: SectionId;
} | null;

export const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollToSection, scrollToTop } = useScrollSpy();

  useEffect(() => {
    const state = (location.state as LocationState) ?? undefined;
    if (!state?.scrollTo) {
      return;
    }

    if (state.scrollTo === "hero") {
      scrollToTop();
    } else {
      scrollToSection(state.scrollTo);
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate, scrollToSection, scrollToTop]);

  return (
    <div className="space-y-28 pb-24 pt-12 sm:space-y-32 sm:pt-16">
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
};
