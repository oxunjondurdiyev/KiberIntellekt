import fs from "node:fs";
import path from "node:path";
import { cvSchema, type Cv } from "./schemas";

const CV_FILE = path.join(process.cwd(), "content", "about", "cv.json");

let cache: Cv | null = null;

export function getCv(): Cv {
  if (cache) return cache;

  const raw = fs.readFileSync(CV_FILE, "utf-8");
  const json = JSON.parse(raw);
  const result = cvSchema.safeParse(json);

  if (!result.success) {
    throw new Error(
      `content/about/cv.json noto'g'ri formatda: ${result.error.message}`
    );
  }

  cache = result.data;
  return cache;
}
