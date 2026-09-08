import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CoverImage } from "@/components/shared/cover-image";
import type { Project } from "@/lib/content/schemas";
import type { AppLocale } from "@/i18n/routing";

export function ProjectCard({
  project,
  locale,
  categoryLabel,
  viewDetailsLabel,
}: {
  project: Project;
  locale: AppLocale;
  categoryLabel: string;
  viewDetailsLabel: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <CoverImage
        src={project.coverImage}
        alt={project.title[locale]}
        className="aspect-[16/10] w-full"
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {categoryLabel}
        </span>
        <h3 className="mt-4 font-semibold text-foreground">
          {project.title[locale]}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
          {project.shortDescription[locale]}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          {viewDetailsLabel}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
