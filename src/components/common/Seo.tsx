import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { profile } from "../../data/profile";
import { siteMeta, type SupportedLocale } from "../../data/siteMeta";
import { buildLocalizedUrl, resolveLocale } from "../../utils/seo";

const MANAGED_ATTRIBUTE = "data-seo-managed";
const LINK_SCOPE_ATTRIBUTE = "data-seo-link-scope";
const LINK_KEY_ATTRIBUTE = "data-seo-link-key";
const JSON_LD_ELEMENT_ID = "seo-jsonld";
const DEFAULT_OG_TYPE = "website";

type MetaKey = "name" | "property";

type StructuredData =
  | Record<string, unknown>
  | ReadonlyArray<Record<string, unknown>>
  | null
  | undefined;

export type SeoProps = {
  titleKey: string;
  descriptionKey: string;
  title?: string;
  description?: string;
  path?: string;
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

type LinkOptions = {
  rel: string;
  attrs: Record<string, string>;
  scope: string;
  key: string;
  preferAnyExistingRel?: boolean;
};

const upsertManagedLink = ({
  rel,
  attrs,
  scope,
  key,
  preferAnyExistingRel = false
}: LinkOptions) => {
  const managedSelector = `link[rel="${rel}"][${LINK_SCOPE_ATTRIBUTE}="${scope}"][${LINK_KEY_ATTRIBUTE}="${key}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(managedSelector);

  if (!element && preferAnyExistingRel) {
    element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  }

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  element.setAttribute("rel", rel);
  element.setAttribute(MANAGED_ATTRIBUTE, "true");
  element.setAttribute(LINK_SCOPE_ATTRIBUTE, scope);
  element.setAttribute(LINK_KEY_ATTRIBUTE, key);

  Object.entries(attrs).forEach(([attr, value]) => {
    if (attr !== "rel") {
      element?.setAttribute(attr, value);
    }
  });
};

const removeManagedLinks = (scope: string) => {
  const selector = `link[${LINK_SCOPE_ATTRIBUTE}="${scope}"]`;
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
  title: titleOverride,
  description: descriptionOverride,
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
  const title = titleOverride ?? t(titleKey);
  const description = descriptionOverride ?? t(descriptionKey);
  const canonicalUrl = buildLocalizedUrl(path, locale);
  const socialImageUrl = new URL(siteMeta.socialImage, siteMeta.baseUrl).toString();
  const structuredDataPayload = useMemo(() => resolveStructuredData(structuredData), [structuredData]);

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
    upsertManagedLink({
      rel: "canonical",
      attrs: { href: canonicalUrl },
      scope: "canonical",
      key: "page",
      preferAnyExistingRel: true
    });

    removeManagedLinks("alternate");

    (Object.keys(siteMeta.locales) as SupportedLocale[]).forEach((lang) => {
      const config = siteMeta.locales[lang];
      const href = buildLocalizedUrl(path, lang);
      upsertManagedLink({
        rel: "alternate",
        attrs: { href, hrefLang: config.hrefLang },
        scope: "alternate",
        key: lang
      });
    });

    const defaultHref = buildLocalizedUrl(path, siteMeta.defaultLocale);
    upsertManagedLink({
      rel: "alternate",
      attrs: { href: defaultHref, hrefLang: "x-default" },
      scope: "alternate",
      key: "default"
    });
  }, [canonicalUrl, path]);

  useEffect(() => {
    const existing = document.getElementById(JSON_LD_ELEMENT_ID);

    if (!structuredDataPayload) {
      existing?.remove();
      return;
    }

    const script = existing instanceof HTMLScriptElement ? existing : document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.id = JSON_LD_ELEMENT_ID;
    script.textContent = JSON.stringify(structuredDataPayload);

    if (!existing) {
      document.head.appendChild(script);
    }

    return () => {
      script.remove();
    };
  }, [structuredDataPayload]);

  return null;
};
