import { Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CoverImage } from "@/components/shared/cover-image";
import type { Course } from "@/lib/content/schemas";
import type { AppLocale } from "@/i18n/routing";

export function CourseCard({
  course,
  locale,
  levelLabel,
  statusLabel,
  durationLabel,
  hoursSuffix,
}: {
  course: Course;
  locale: AppLocale;
  levelLabel: string;
  statusLabel: string;
  durationLabel: string;
  hoursSuffix: string;
}) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <CoverImage
        src={course.coverImage}
        alt={course.name[locale]}
        className="aspect-[16/10] w-full"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {levelLabel}
          </span>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {statusLabel}
          </span>
        </div>
        <h3 className="mt-4 font-semibold text-foreground">
          {course.name[locale]}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
          {course.description[locale]}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock size={14} />
          {durationLabel}: {course.durationHours} {hoursSuffix}
        </span>
      </div>
    </Link>
  );
}
