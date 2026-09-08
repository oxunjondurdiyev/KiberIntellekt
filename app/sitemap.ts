import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { canonicalUrl } from "@/lib/seo";
import { getAllProjects } from "@/lib/content/projects";
import { getAllCourses } from "@/lib/content/courses";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/courses",
  "/certificates",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of routing.locales) {
      entries.push({
        url: canonicalUrl(locale, path),
        lastModified: new Date(),
      });
    }
  }

  for (const project of getAllProjects()) {
    for (const locale of routing.locales) {
      entries.push({
        url: canonicalUrl(locale, `/projects/${project.slug}`),
        lastModified: project.publishedAt,
      });
    }
  }

  for (const course of getAllCourses()) {
    for (const locale of routing.locales) {
      entries.push({
        url: canonicalUrl(locale, `/courses/${course.slug}`),
      });
    }
  }

  return entries;
}
