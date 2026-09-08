import { routing, type AppLocale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://kiberintellekt.uz";

/**
 * Builds hreflang alternates for a path shared across all locales
 * (e.g. "/projects/some-slug" -> languages for uz/ru/en + x-default).
 */
export function buildLanguageAlternates(path: string) {
  const cleanPath = path === "/" ? "" : path;
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${cleanPath}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${cleanPath}`;

  return languages;
}

export function canonicalUrl(locale: AppLocale, path: string) {
  const cleanPath = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${cleanPath}`;
}
