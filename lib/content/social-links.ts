import fs from "node:fs";
import path from "node:path";
import { socialLinksSchema, type SocialLinks } from "./schemas";

const SOCIAL_LINKS_FILE = path.join(
  process.cwd(),
  "content",
  "social-links.json"
);

let cache: SocialLinks | null = null;

export function getSocialLinks(): SocialLinks {
  if (cache) return cache;

  const raw = fs.readFileSync(SOCIAL_LINKS_FILE, "utf-8");
  const json = JSON.parse(raw);
  const result = socialLinksSchema.safeParse(json);

  if (!result.success) {
    throw new Error(
      `content/social-links.json noto'g'ri formatda: ${result.error.message}`
    );
  }

  cache = result.data;
  return cache;
}
