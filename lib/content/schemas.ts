import { z } from "zod";

export const localeSchema = z.enum(["uz", "ru", "en"]);

export const localizedString = z.object({
  uz: z.string().min(1),
  ru: z.string().min(1),
  en: z.string().min(1),
});
export type LocalizedString = z.infer<typeof localizedString>;

const localizedRichText = localizedString;

const slug = z.string().regex(/^[a-z0-9-]+$/);

const period = z.object({
  start: z.string(),
  end: z.string().nullable(),
});

// ---------- Projects ----------

export const projectCategorySchema = z.enum([
  "ai-ml",
  "cybersecurity",
  "iso-quality-management",
  "research",
  "training",
  "other",
]);
export type ProjectCategory = z.infer<typeof projectCategorySchema>;

export const projectSchema = z.object({
  slug,
  title: localizedString,
  shortDescription: localizedString,
  detailedDescription: localizedRichText,
  technologies: z.array(z.string()).min(1),
  category: projectCategorySchema,
  result: localizedString,
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  externalLink: z.url().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  publishedAt: z.iso.date(),
});
export type Project = z.infer<typeof projectSchema>;

// ---------- Courses ----------

const lessonSchema = z.object({
  slug,
  title: localizedString,
  type: z.enum(["video", "text"]),
  durationMinutes: z.number().optional(),
  videoUrl: z.url().optional(),
  content: localizedRichText.optional(),
});
export type Lesson = z.infer<typeof lessonSchema>;

const moduleSchema = z.object({
  slug,
  title: localizedString,
  lessons: z.array(lessonSchema).default([]),
});
export type CourseModule = z.infer<typeof moduleSchema>;

export const courseCategorySchema = z.enum([
  "ai",
  "cybersecurity",
  "iso-standards",
  "other",
]);
export type CourseCategory = z.infer<typeof courseCategorySchema>;

export const courseLevelSchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);
export type CourseLevel = z.infer<typeof courseLevelSchema>;

export const courseStatusSchema = z.enum(["available", "coming-soon"]);
export type CourseStatus = z.infer<typeof courseStatusSchema>;

export const courseSchema = z.object({
  slug,
  name: localizedString,
  description: localizedString,
  longDescription: localizedRichText.optional(),
  level: courseLevelSchema,
  durationHours: z.number(),
  category: courseCategorySchema,
  coverImage: z.string().optional(),
  syllabus: z.array(moduleSchema).default([]),
  status: courseStatusSchema.default("coming-soon"),
  order: z.number().default(0),
});
export type Course = z.infer<typeof courseSchema>;

// ---------- Certificates ----------

export const certificateCategorySchema = z.enum([
  "ai",
  "cybersecurity",
  "iso-standardization",
  "teaching",
  "other",
]);
export type CertificateCategory = z.infer<typeof certificateCategorySchema>;

export const certificateSchema = z.object({
  slug,
  title: localizedString,
  issuer: z.string(),
  issueDate: z.iso.date(),
  category: certificateCategorySchema,
  image: z.string().optional(),
  credentialUrl: z.url().optional(),
  description: localizedString.optional(),
  order: z.number().default(0),
});
export type Certificate = z.infer<typeof certificateSchema>;

// ---------- Services ----------

export const serviceSchema = z.object({
  slug,
  icon: z.string(),
  title: localizedString,
  description: localizedString,
  highlights: z.array(localizedString).default([]),
  order: z.number().default(0),
});
export type Service = z.infer<typeof serviceSchema>;
export const servicesFileSchema = z.array(serviceSchema);

// ---------- About / CV ----------

const educationEntrySchema = z.object({
  period,
  degree: localizedString,
  institution: localizedString,
});

const experienceEntrySchema = z.object({
  period,
  role: localizedString,
  organization: localizedString,
  description: localizedString.optional(),
});

export const cvSchema = z.object({
  bio: localizedRichText,
  education: z.array(educationEntrySchema).default([]),
  experience: z.array(experienceEntrySchema).default([]),
  expertiseAreas: z.array(localizedString).default([]),
  researchDirections: z.array(localizedString).default([]),
});
export type Cv = z.infer<typeof cvSchema>;

// ---------- Social links ----------

export const socialLinksSchema = z.object({
  telegram: z.url().optional(),
  youtube: z.url().optional(),
  instagram: z.url().optional(),
  facebook: z.url().optional(),
  email: z.email().optional(),
});
export type SocialLinks = z.infer<typeof socialLinksSchema>;
