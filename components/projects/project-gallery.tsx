"use client";

import { useMemo, useState } from "react";
import { ListFilter } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { ProjectCard } from "./project-card";
import type { Project, ProjectCategory } from "@/lib/content/schemas";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function ProjectGallery({
  projects,
  categories,
  locale,
  allLabel,
  categoryLabels,
  viewDetailsLabel,
  emptyLabel,
}: {
  projects: Project[];
  categories: ProjectCategory[];
  locale: AppLocale;
  allLabel: string;
  categoryLabels: Record<string, string>;
  viewDetailsLabel: string;
  emptyLabel: string;
}) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.category === active),
    [projects, active]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <ListFilter size={16} className="mr-1 shrink-0 text-muted-foreground" />
        <button
          type="button"
          onClick={() => setActive("all")}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-foreground/70 hover:bg-secondary"
          )}
        >
          {allLabel}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground/70 hover:bg-secondary"
            )}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          {emptyLabel}
        </p>
      ) : (
        <StaggerGroup
          key={active}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard
                project={project}
                locale={locale}
                categoryLabel={categoryLabels[project.category]}
                viewDetailsLabel={viewDetailsLabel}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
