import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [
    common,
    nav,
    home,
    about,
    services,
    projects,
    courses,
    certificates,
    contact,
  ] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/nav.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/about.json`),
    import(`../messages/${locale}/services.json`),
    import(`../messages/${locale}/projects.json`),
    import(`../messages/${locale}/courses.json`),
    import(`../messages/${locale}/certificates.json`),
    import(`../messages/${locale}/contact.json`),
  ]);

  return {
    locale,
    messages: {
      common: common.default,
      nav: nav.default,
      home: home.default,
      about: about.default,
      services: services.default,
      projects: projects.default,
      courses: courses.default,
      certificates: certificates.default,
      contact: contact.default,
    },
  };
});
