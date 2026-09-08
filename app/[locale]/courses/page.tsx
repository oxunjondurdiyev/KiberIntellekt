import { getTranslations } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { PageHero } from "@/components/shared/page-hero";
import { CourseCard } from "@/components/courses/course-card";
import { getAllCourses } from "@/lib/content/courses";
import type { AppLocale } from "@/i18n/routing";
import { buildLanguageAlternates, canonicalUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "courses" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: canonicalUrl(locale, "/courses"),
      languages: buildLanguageAlternates("/courses"),
    },
  };
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "courses" });
  const courses = getAllCourses();

  return (
    <div>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <StaggerItem key={course.slug}>
              <CourseCard
                course={course}
                locale={locale}
                levelLabel={t(`levels.${course.level}`)}
                statusLabel={t(`statuses.${course.status}`)}
                durationLabel={t("durationLabel")}
                hoursSuffix={t("hoursSuffix")}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
