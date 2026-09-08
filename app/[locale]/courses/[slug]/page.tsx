import { ArrowLeft, Clock, Layers } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { CoverImage } from "@/components/shared/cover-image";
import { Prose } from "@/components/shared/prose";
import { SyllabusAccordion } from "@/components/courses/syllabus-accordion";
import { getAllCourses, getCourseBySlug } from "@/lib/content/courses";
import type { AppLocale } from "@/i18n/routing";
import { buildLanguageAlternates, canonicalUrl } from "@/lib/seo";

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as {
    locale: AppLocale;
    slug: string;
  };
  const course = getCourseBySlug(slug);
  if (!course) return {};
  const path = `/courses/${slug}`;
  return {
    title: course.name[locale],
    description: course.description[locale],
    alternates: {
      canonical: canonicalUrl(locale, path),
      languages: buildLanguageAlternates(path),
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as {
    locale: AppLocale;
    slug: string;
  };
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const t = await getTranslations({ locale, namespace: "courses" });
  const lessonCount = course.syllabus.reduce(
    (sum, m) => sum + m.lessons.length,
    0
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          {t("backToCourses")}
        </Link>
      </Reveal>

      <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {t(`levels.${course.level}`)}
        </span>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {t(`statuses.${course.status}`)}
        </span>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {course.name[locale]}
        </h1>
      </Reveal>

      <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock size={16} />
          {t("durationLabel")}: {course.durationHours} {t("hoursSuffix")}
        </span>
        <span className="flex items-center gap-1.5">
          <Layers size={16} />
          {lessonCount} {t("lessonsCount")}
        </span>
      </Reveal>

      <Reveal delay={0.15} className="mt-8">
        <CoverImage
          src={course.coverImage}
          alt={course.name[locale]}
          className="aspect-video w-full rounded-3xl"
          priority
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <Prose
          content={course.longDescription?.[locale] ?? course.description[locale]}
          className="text-lg"
        />
      </Reveal>

      {course.syllabus.length > 0 && (
        <Reveal delay={0.1} className="mt-10">
          <h2 className="font-display text-2xl font-bold">
            {t("syllabusTitle")}
          </h2>
          <div className="mt-6">
            <SyllabusAccordion
              modules={course.syllabus}
              locale={locale}
              comingSoonLabel={t("lessonComingSoon")}
              videoLabel={t("videoLesson")}
              textLabel={t("textLesson")}
            />
          </div>
        </Reveal>
      )}
    </div>
  );
}
