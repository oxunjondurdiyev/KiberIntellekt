import { Briefcase, Compass, GraduationCap, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getCv } from "@/lib/content/about";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { Prose } from "@/components/shared/prose";
import { DecorativeOrbs } from "@/components/shared/decorative-orbs";
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
    <div>
      <div className="relative overflow-hidden border-b border-border/60">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0 -z-20 opacity-60 [mask-image:radial-gradient(ellipse_60%_65%_at_20%_0%,black,transparent)]"
          aria-hidden="true"
        />
        <DecorativeOrbs className="opacity-70" />
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              {t("subtitle")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <Prose content={cv.bio[locale]} className="text-lg" />
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal delay={0.1}>
          <h2 className="flex items-center gap-3 font-display text-2xl font-bold">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 text-primary">
              <Briefcase size={20} />
            </span>
            {t("experienceTitle")}
          </h2>
          <div className="mt-8 space-y-8 border-l border-border pl-6">
            {cv.experience.map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full bg-gradient-brand shadow-[0_0_0_4px_var(--background)]" />
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
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description[locale]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <h2 className="flex items-center gap-3 font-display text-2xl font-bold">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 text-primary">
              <GraduationCap size={20} />
            </span>
            {t("educationTitle")}
          </h2>
          <div className="mt-8 space-y-8 border-l border-border pl-6">
            {cv.education.map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full bg-gradient-brand shadow-[0_0_0_4px_var(--background)]" />
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
            <h2 className="flex items-center gap-3 font-display text-2xl font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 text-primary">
                <Sparkles size={20} />
              </span>
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
            <h2 className="flex items-center gap-3 font-display text-2xl font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 text-primary">
                <Compass size={20} />
              </span>
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
    </div>
  );
}
