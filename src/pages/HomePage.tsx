import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { Seo } from "../components/common/Seo";
import { useScrollSpy } from "../providers/useScrollSpy";
import type { SectionId } from "../providers/scrollSpyContext";
import { profile } from "../data/profile";
import { siteMeta } from "../data/siteMeta";
import { buildLocalizedUrl, resolveLocale } from "../utils/seo";

type LocationState = {
  scrollTo?: SectionId;
} | null;

export const HomePage = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollToSection, scrollToTop } = useScrollSpy();
  const structuredData = useMemo(() => {
    const locale = resolveLocale(i18n.resolvedLanguage ?? i18n.language);
    const localeConfig = siteMeta.locales[locale];
    const contactUrl = buildLocalizedUrl("/#contact", locale);
    const homepageUrl = buildLocalizedUrl("/", locale);
    const aboutUrl = buildLocalizedUrl("/about", locale);
    const portraitUrl = new URL(profile.portraitImage, siteMeta.baseUrl).toString();

    return [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${homepageUrl}#jakub-dolenek`,
        name: profile.name,
        url: homepageUrl,
        image: portraitUrl,
        email: `mailto:${profile.email}`,
        jobTitle: t("seo.person.jobTitle"),
        description: t("seo.person.description"),
        knowsLanguage: localeConfig.hrefLang,
        sameAs: [profile.github, profile.linkedin],
        address: {
          "@type": "PostalAddress",
          addressCountry: "CZ"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: homepageUrl,
        name: t("seo.siteName"),
        description: t("seo.home.description"),
        inLanguage: localeConfig.hrefLang,
        potentialAction: {
          "@type": "ContactAction",
          target: contactUrl,
          name: t("contact.heading.lead")
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: homepageUrl,
        name: t("seo.home.title"),
        description: t("seo.home.description"),
        inLanguage: localeConfig.hrefLang,
        isPartOf: {
          "@type": "WebSite",
          url: homepageUrl,
          name: t("seo.siteName")
        },
        primaryImageOfPage: portraitUrl,
        relatedLink: aboutUrl
      }
    ];
  }, [i18n.language, i18n.resolvedLanguage, t]);

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
    <>
      <Seo
        titleKey="seo.home.title"
        descriptionKey="seo.home.description"
        path="/"
        structuredData={structuredData}
      />
      <div className="space-y-28 pb-24 pt-12 sm:space-y-32 sm:pt-16">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </>
  );
};
