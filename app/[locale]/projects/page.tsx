import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { getAllProjects, getProjectCategories } from "@/lib/content/projects";
import { projectCategorySchema } from "@/lib/content/schemas";
import type { AppLocale } from "@/i18n/routing";
import { buildLanguageAlternates, canonicalUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: canonicalUrl(locale, "/projects"),
      languages: buildLanguageAlternates("/projects"),
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "projects" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const projects = getAllProjects();
  const categories = getProjectCategories();

  const categoryLabels = Object.fromEntries(
    projectCategorySchema.options.map((category) => [
      category,
      t(`categories.${category}`),
    ])
  );

  return (
    <div>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <ProjectGallery
          projects={projects}
          categories={categories}
          locale={locale}
          allLabel={tCommon("allCategories")}
          categoryLabels={categoryLabels}
          viewDetailsLabel={t("viewDetails")}
          emptyLabel={t("emptyState")}
        />
      </div>
    </div>
  );
}
