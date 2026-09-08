"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, FileText, Video } from "lucide-react";
import type { CourseModule } from "@/lib/content/schemas";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function SyllabusAccordion({
  modules,
  locale,
  comingSoonLabel,
  videoLabel,
  textLabel,
}: {
  modules: CourseModule[];
  locale: AppLocale;
  comingSoonLabel: string;
  videoLabel: string;
  textLabel: string;
}) {
  return (
    <Accordion.Root type="multiple" className="space-y-3">
      {modules.map((module, index) => (
        <Accordion.Item
          key={module.slug}
          value={module.slug}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
              <span className="font-semibold text-foreground">
                <span className="mr-2 text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                {module.title[locale]}
              </span>
              <ChevronDown
                size={18}
                className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="radix-accordion-content">
            <ul className="divide-y divide-border border-t border-border">
              {module.lessons.map((lesson) => {
                const Icon = lesson.type === "video" ? Video : FileText;
                const hasContent = Boolean(lesson.videoUrl || lesson.content);
                return (
                  <li
                    key={lesson.slug}
                    className="flex items-center gap-3 px-6 py-3 text-sm"
                  >
                    <Icon size={16} className="shrink-0 text-primary" />
                    <span className="flex-1 text-foreground/90">
                      {lesson.title[locale]}
                    </span>
                    <span
                      className={cn(
                        "text-xs",
                        hasContent
                          ? "text-muted-foreground"
                          : "italic text-muted-foreground/70"
                      )}
                    >
                      {hasContent
                        ? lesson.type === "video"
                          ? videoLabel
                          : textLabel
                        : comingSoonLabel}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
