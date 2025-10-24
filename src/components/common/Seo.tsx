import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { profile } from "../../data/profile";
import { siteMeta, type SupportedLocale } from "../../data/siteMeta";
import { buildLocalizedUrl, resolveLocale } from "../../utils/seo";

const MANAGED_ATTRIBUTE = "data-seo-managed";
const JSON_LD_ELEMENT_ID = "seo-jsonld";
const DEFAULT_OG_TYPE = "website";

type MetaKey = "name" | "property";

type CanonicalOptions = {
  path?: string;
};

type StructuredData =
  | Record<string, unknown>
  | ReadonlyArray<Record<string, unknown>>
  | null
  | undefined;

export type SeoProps = CanonicalOptions & {
  titleKey: string;
  descriptionKey: string;
  index?: boolean;
  ogType?: "website" | "profile" | "article";
  structuredData?: StructuredData | (() => StructuredData);
};

const upsertMeta = (key: MetaKey, identifier: string, content: string, scope: string) => {
  if (!content) {
    return;
  }

  const selector = `meta[${key}="${identifier}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(key, identifier);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
  element.setAttribute(MANAGED_ATTRIBUTE, scope);
};

const removeManagedMeta = (scope: string) => {
  const selector = `meta[${MANAGED_ATTRIBUTE}="${scope}"]`;
  document.head.querySelectorAll(selector).forEach((node) => node.remove());
};

const upsertLink = (rel: string, attrs: Record<string, string>, scope: string) => {
  const selector = `link[rel="${rel}"][${MANAGED_ATTRIBUTE}="${scope}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    element.setAttribute(MANAGED_ATTRIBUTE, scope);
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([attr, value]) => {
    if (attr !== "rel") {
      element?.setAttribute(attr, value);
    }
  });
};

const removeManagedLinks = (scope: string) => {
  const selector = `link[${MANAGED_ATTRIBUTE}="${scope}"]`;
  document.head.querySelectorAll(selector).forEach((node) => node.remove());
};

const resolveStructuredData = (input: SeoProps["structuredData"]) => {
  if (typeof input === "function") {
    return input();
  }
  return input ?? null;
};

export const Seo = ({
  titleKey,
  descriptionKey,
  path = "/",
  index = true,
  ogType = DEFAULT_OG_TYPE,
  structuredData
}: SeoProps) => {
  const { i18n, t } = useTranslation();

  const locale = useMemo(
    () => resolveLocale(i18n.resolvedLanguage ?? i18n.language),
    [i18n.language, i18n.resolvedLanguage]
  );
  const localeConfig = siteMeta.locales[locale];
  const siteName = t("seo.siteName");
  const socialImageAlt = t("seo.ogImageAlt");
  const title = t(titleKey);
  const description = t(descriptionKey);
  const canonicalUrl = buildLocalizedUrl(path, locale);
  const socialImageUrl = new URL(siteMeta.socialImage, siteMeta.baseUrl).toString();
  const structuredDataPayload = useMemo(
    () => resolveStructuredData(structuredData),
    [structuredData]
  );

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", localeConfig.htmlLang);
    html.setAttribute("dir", "ltr");
    html.setAttribute("data-locale", locale);
  }, [locale, localeConfig.htmlLang]);

  useEffect(() => {
    upsertMeta("name", "description", description, "meta-description");
    upsertMeta("name", "author", profile.name, "meta-author");
    upsertMeta("name", "robots", index ? "index,follow" : "noindex,nofollow", "meta-robots");
    upsertMeta("name", "language", localeConfig.htmlLang, "meta-language");

    upsertMeta("property", "og:type", ogType, "meta-og");
    upsertMeta("property", "og:title", title, "meta-og");
    upsertMeta("property", "og:description", description, "meta-og");
    upsertMeta("property", "og:url", canonicalUrl, "meta-og");
    upsertMeta("property", "og:site_name", siteName, "meta-og");
    upsertMeta("property", "og:image", socialImageUrl, "meta-og");
    upsertMeta("property", "og:image:alt", socialImageAlt || profile.portraitAlt, "meta-og");
    upsertMeta("property", "og:locale", localeConfig.ogLocale, "meta-og-locale");

    upsertMeta("name", "twitter:card", "summary_large_image", "meta-twitter");
    upsertMeta("name", "twitter:title", title, "meta-twitter");
    upsertMeta("name", "twitter:description", description, "meta-twitter");
    upsertMeta("name", "twitter:image", socialImageUrl, "meta-twitter");
    upsertMeta("name", "twitter:image:alt", socialImageAlt || profile.portraitAlt, "meta-twitter");

    removeManagedMeta("meta-og-locale-alternate");

    (Object.keys(siteMeta.locales) as SupportedLocale[])
      .filter((key) => key !== locale)
      .forEach((alternate) => {
        const alternateLocale = siteMeta.locales[alternate];
        const element = document.createElement("meta");
        element.setAttribute("property", "og:locale:alternate");
        element.setAttribute("content", alternateLocale.ogLocale);
        element.setAttribute(MANAGED_ATTRIBUTE, "meta-og-locale-alternate");
        document.head.appendChild(element);
      });
  }, [
    canonicalUrl,
    description,
    index,
    locale,
    localeConfig.htmlLang,
    localeConfig.ogLocale,
    socialImageAlt,
    ogType,
    siteName,
    socialImageUrl,
    title
  ]);

  useEffect(() => {
    upsertLink("canonical", { href: canonicalUrl }, "canonical");

    removeManagedLinks("alternate");

    (Object.keys(siteMeta.locales) as SupportedLocale[]).forEach((lang) => {
      const config = siteMeta.locales[lang];
      const href = buildLocalizedUrl(path, lang);
      upsertLink(
        "alternate",
        { href, hrefLang: config.hrefLang },
        "alternate"
      );
    });

    const defaultHref = buildLocalizedUrl(path, siteMeta.defaultLocale);
    upsertLink(
      "alternate",
      { href: defaultHref, hrefLang: "x-default" },
      "alternate-default"
    );
  }, [canonicalUrl, path]);

  useEffect(() => {
    const existing = document.getElementById(JSON_LD_ELEMENT_ID);
    if (!structuredDataPayload || structuredDataPayload === null) {
      existing?.remove();
      return;
    }

    const script = existing ?? document.createElement("script");
    script.type = "application/ld+json";
    script.id = JSON_LD_ELEMENT_ID;
    script.text = JSON.stringify(structuredDataPayload);
    if (!existing) {
      document.head.appendChild(script);
    }

    return () => {
      script.remove();
    };
  }, [structuredDataPayload]);

  return null;
};
