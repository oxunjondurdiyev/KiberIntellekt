import { Briefcase, Compass, GraduationCap, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getCv } from "@/lib/content/about";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { Prose } from "@/components/shared/prose";
import type { AppLocale } from "@/i18n/routing";
import { buildLanguageAlternates, canonicalUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: canonicalUrl(locale, "/about"),
      languages: buildLanguageAlternates("/about"),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "about" });
  const cv = getCv();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          {t("subtitle")}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <Prose content={cv.bio[locale]} className="text-lg" />
      </Reveal>

      <Reveal delay={0.1} className="mt-16">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
          <Briefcase size={22} className="text-primary" />
          {t("experienceTitle")}
        </h2>
        <div className="mt-6 space-y-8 border-l border-border pl-6">
          {cv.experience.map((item, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
              <p className="text-sm text-muted-foreground">
                {item.period.start} – {item.period.end ?? t("present")}
              </p>
              <h3 className="mt-1 font-semibold text-foreground">
                {item.role[locale]}
              </h3>
              <p className="text-sm text-primary">
                {item.organization[locale]}
              </p>
              {item.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description[locale]}
                </p>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-16">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
          <GraduationCap size={22} className="text-primary" />
          {t("educationTitle")}
        </h2>
        <div className="mt-6 space-y-8 border-l border-border pl-6">
          {cv.education.map((item, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
              <p className="text-sm text-muted-foreground">
                {item.period.start} – {item.period.end ?? t("present")}
              </p>
              <h3 className="mt-1 font-semibold text-foreground">
                {item.degree[locale]}
              </h3>
              <p className="text-sm text-primary">
                {item.institution[locale]}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        <Reveal delay={0.1}>
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
            <Sparkles size={22} className="text-primary" />
            {t("expertiseTitle")}
          </h2>
          <StaggerGroup className="mt-6 flex flex-wrap gap-2">
            {cv.expertiseAreas.map((area) => (
              <StaggerItem key={area[locale]}>
                <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                  {area[locale]}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
            <Compass size={22} className="text-primary" />
            {t("researchTitle")}
          </h2>
          <ul className="mt-6 space-y-3">
            {cv.researchDirections.map((dir) => (
              <li
                key={dir[locale]}
                className="flex gap-2 text-sm text-foreground/90"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {dir[locale]}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
