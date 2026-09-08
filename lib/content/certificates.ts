import fs from "node:fs";
import path from "node:path";
import {
  certificateSchema,
  type Certificate,
  type CertificateCategory,
} from "./schemas";

const CERTIFICATES_DIR = path.join(process.cwd(), "content", "certificates");

function readCertificates(): Certificate[] {
  const files = fs
    .readdirSync(CERTIFICATES_DIR)
    .filter((file) => file.endsWith(".json"));

  const certificates = files.map((file) => {
    const raw = fs.readFileSync(path.join(CERTIFICATES_DIR, file), "utf-8");
    const json = JSON.parse(raw);
    const result = certificateSchema.safeParse(json);

    if (!result.success) {
      throw new Error(
        `content/certificates/${file} noto'g'ri formatda: ${result.error.message}`
      );
    }

    return result.data;
  });

  return certificates.sort((a, b) => a.order - b.order);
}

let cache: Certificate[] | null = null;

export function getAllCertificates(): Certificate[] {
  if (!cache) cache = readCertificates();
  return cache;
}

export function getCertificateBySlug(slug: string): Certificate | undefined {
  return getAllCertificates().find((c) => c.slug === slug);
}

export function getCertificateCategories(): CertificateCategory[] {
  return Array.from(new Set(getAllCertificates().map((c) => c.category)));
}
