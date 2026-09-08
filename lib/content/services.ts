import fs from "node:fs";
import path from "node:path";
import { servicesFileSchema, type Service } from "./schemas";

const SERVICES_FILE = path.join(process.cwd(), "content", "services.json");

let cache: Service[] | null = null;

export function getAllServices(): Service[] {
  if (cache) return cache;

  const raw = fs.readFileSync(SERVICES_FILE, "utf-8");
  const json = JSON.parse(raw);
  const result = servicesFileSchema.safeParse(json);

  if (!result.success) {
    throw new Error(
      `content/services.json noto'g'ri formatda: ${result.error.message}`
    );
  }

  cache = result.data.sort((a, b) => a.order - b.order);
  return cache;
}
