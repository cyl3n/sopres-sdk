// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

// Page Types
export interface Page {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content: string;
  excerpt?: string;
  status: PageStatus;
  locale: string;
  template: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords: string[];
  ogImage?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export enum PageStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface PageVersion {
  id: string;
  pageId: string;
  version: number;
  title: string;
  content: string;
  createdAt: Date;
}

// Media Types
export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  path: string;
  url: string;
  thumbnail?: string;
  alt?: string;
  caption?: string;
  folder?: string;
  createdAt: Date;
  updatedAt: Date;
  uploaderId: string;
}

// Pattern Types
export interface Pattern {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: string;
  template: string;
  styles?: string;
  script?: string;
  config: PatternConfig;
  preview?: string;
  isPublic: boolean;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export interface PatternConfig {
  fields: PatternField[];
}

export interface PatternField {
  name: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "boolean"
    | "select"
    | "image"
    | "color";
  label: string;
  required: boolean;
  default?: unknown;
  options?: string[];
}

// Form Types
export interface Form {
  id: string;
  name: string;
  slug: string;
  description?: string;
  fields: FormField[];
  settings: FormSettings;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormField {
  id: string;
  type:
    | "text"
    | "email"
    | "textarea"
    | "number"
    | "select"
    | "checkbox"
    | "radio"
    | "file";
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  validation?: FormFieldValidation;
  options?: string[];
}

export interface FormFieldValidation {
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

export interface FormSettings {
  submitText?: string;
  successMessage?: string;
  errorMessage?: string;
  redirectUrl?: string;
  emailNotification?: boolean;
  emailTo?: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  userId?: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

// Authentication Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Build Types
export interface BuildConfig {
  outputDir: string;
  cacheDir: string;
  parallelJobs: number;
  minify: boolean;
  sourcemap: boolean;
}

export interface BuildResult {
  success: boolean;
  duration: number;
  files: BuildFile[];
  errors: string[];
}

export interface BuildFile {
  path: string;
  size: number;
  type: "html" | "css" | "js" | "image" | "other";
}

// Settings Types
export interface Setting {
  id: string;
  key: string;
  value: unknown;
  group?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project Walkthrough Types
export interface ProjectWalkthrough {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: ProjectDifficulty;
  status: ProjectStatus;
  tags: string[];
  techStack: string[];
  screenshots: string[];
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  startDate?: Date;
  endDate?: Date;
  duration?: string;
  featured: boolean;
  coverImage?: string;
  publishStatus: "draft" | "published";
  authorId: string;
  author?: Partial<User>;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum ProjectStatus {
  PLANNED = "planned",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}
