import fs from "node:fs";
import path from "node:path";
import { courseSchema, type Course, type CourseCategory } from "./schemas";

const COURSES_DIR = path.join(process.cwd(), "content", "courses");

function readCourses(): Course[] {
  const files = fs
    .readdirSync(COURSES_DIR)
    .filter((file) => file.endsWith(".json"));

  const courses = files.map((file) => {
    const raw = fs.readFileSync(path.join(COURSES_DIR, file), "utf-8");
    const json = JSON.parse(raw);
    const result = courseSchema.safeParse(json);

    if (!result.success) {
      throw new Error(
        `content/courses/${file} noto'g'ri formatda: ${result.error.message}`
      );
    }

    return result.data;
  });

  return courses.sort((a, b) => a.order - b.order);
}

let cache: Course[] | null = null;

export function getAllCourses(): Course[] {
  if (!cache) cache = readCourses();
  return cache;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getAllCourses().find((course) => course.slug === slug);
}

export function getCourseCategories(): CourseCategory[] {
  return Array.from(new Set(getAllCourses().map((c) => c.category)));
}
