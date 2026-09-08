import fs from "node:fs";
import path from "node:path";
import { projectSchema, type Project, type ProjectCategory } from "./schemas";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function readProjects(): Project[] {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".json"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
    const json = JSON.parse(raw);
    const result = projectSchema.safeParse(json);

    if (!result.success) {
      throw new Error(
        `content/projects/${file} noto'g'ri formatda: ${result.error.message}`
      );
    }

    return result.data;
  });

  return projects.sort((a, b) => a.order - b.order);
}

let cache: Project[] | null = null;

export function getAllProjects(): Project[] {
  if (!cache) cache = readProjects();
  return cache;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getProjectCategories(): ProjectCategory[] {
  return Array.from(new Set(getAllProjects().map((p) => p.category)));
}

export function getFeaturedProjects(limit = 3): Project[] {
  const all = getAllProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}
