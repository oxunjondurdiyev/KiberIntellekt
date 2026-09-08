import { ArrowRight, Award, BrainCircuit, GraduationCap, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { SocialLinks } from "@/components/shared/social-links";
import { Kicker } from "@/components/shared/kicker";
import { DecorativeOrbs } from "@/components/shared/decorative-orbs";
import { ProjectCard } from "@/components/projects/project-card";
import { CourseCard } from "@/components/courses/course-card";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getAllCourses } from "@/lib/content/courses";
import type { AppLocale } from "@/i18n/routing";

const focusIcons = [BrainCircuit, ShieldCheck, Award, GraduationCap];

type FocusItem = { title: string; description: string };

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "home" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const tCourses = await getTranslations({ locale, namespace: "courses" });

  const featuredProjects = getFeaturedProjects(3);
  const courses = getAllCourses().slice(0, 3);
  const focusItems = t.raw("focusAreas.items") as FocusItem[];

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0 -z-20 opacity-70 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_10%,black,transparent)]"
          aria-hidden="true"
        />
        <DecorativeOrbs />

        <div className="mx-auto max-w-4xl px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8">
          <Reveal>
            <Kicker>{t("hero.eyebrow")}</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-balance mt-8 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.5rem]">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-balance mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/projects">
                  {t("hero.ctaPrimary")}
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker className="mx-auto">{t("focusAreas.title")}</Kicker>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("focusAreas.subtitle")}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusItems.map((item, index) => {
            const Icon = focusIcons[index % focusIcons.length];
            return (
              <StaggerItem key={item.title}>
                <div className="card-hover h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 text-primary">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      {featuredProjects.length > 0 && (
        <section className="relative overflow-hidden border-y border-border/60 bg-secondary/30 py-20">
          <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>{t("projectsTeaser.title")}</Kicker>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("projectsTeaser.subtitle")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t("projectsTeaser.cta")}
                <ArrowRight size={14} />
              </Link>
            </Reveal>

            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <StaggerItem key={project.slug}>
                  <ProjectCard
                    project={project}
                    locale={locale}
                    categoryLabel={tProjects(`categories.${project.category}`)}
                    viewDetailsLabel={tProjects("viewDetails")}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker>{t("coursesTeaser.title")}</Kicker>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t("coursesTeaser.subtitle")}
            </h2>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t("coursesTeaser.cta")}
            <ArrowRight size={14} />
          </Link>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <StaggerItem key={course.slug}>
              <CourseCard
                course={course}
                locale={locale}
                levelLabel={tCourses(`levels.${course.level}`)}
                statusLabel={tCourses(`statuses.${course.status}`)}
                durationLabel={tCourses("durationLabel")}
                hoursSuffix={tCourses("hoursSuffix")}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="relative overflow-hidden border-t border-border/60 bg-secondary/30 py-20">
        <DecorativeOrbs className="opacity-70" />
        <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t("social.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("social.subtitle")}</p>
          <SocialLinks className="mt-8 justify-center" />
        </Reveal>
      </section>
    </>
  );
}
