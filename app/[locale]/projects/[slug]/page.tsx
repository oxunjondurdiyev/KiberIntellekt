import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { CoverImage } from "@/components/shared/cover-image";
import { Prose } from "@/components/shared/prose";
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects";
import type { AppLocale } from "@/i18n/routing";
import { buildLanguageAlternates, canonicalUrl } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
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
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const path = `/projects/${slug}`;
  return {
    title: project.title[locale],
    description: project.shortDescription[locale],
    alternates: {
      canonical: canonicalUrl(locale, path),
      languages: buildLanguageAlternates(path),
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as {
    locale: AppLocale;
    slug: string;
  };
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          {t("backToProjects")}
        </Link>
      </Reveal>

      <Reveal delay={0.1} className="mt-6">
        <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {t(`categories.${project.category}`)}
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title[locale]}
        </h1>
      </Reveal>

      <Reveal delay={0.15} className="mt-8">
        <CoverImage
          src={project.coverImage}
          alt={project.title[locale]}
          className="aspect-video w-full rounded-3xl"
          priority
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <Prose content={project.detailedDescription[locale]} className="text-lg" />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid gap-8 rounded-2xl border border-border bg-card p-8 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t("technologiesLabel")}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t("resultLabel")}
          </h2>
          <p className="mt-3 text-sm text-foreground/90">
            {project.result[locale]}
          </p>
        </div>
      </Reveal>

      {project.gallery.length > 0 && (
        <Reveal delay={0.1} className="mt-10">
          <h2 className="font-display text-xl font-bold">
            {t("galleryLabel")}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((image) => (
              <CoverImage
                key={image}
                src={image}
                alt={project.title[locale]}
                className="aspect-video rounded-2xl"
              />
            ))}
          </div>
        </Reveal>
      )}

      {project.externalLink && (
        <Reveal delay={0.1} className="mt-10">
          <a
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("visitProject")}
            <ExternalLink size={16} />
          </a>
        </Reveal>
      )}
    </div>
  );
}
