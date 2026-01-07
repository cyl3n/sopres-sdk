/**
 * soPres SDK Types
 */

// Import and re-export core types from @sopres/core
import type {
  Page,
  Media,
  User,
  UserRole,
  ProjectWalkthrough,
} from "@sopres/core";
export type { Page, Media, User, UserRole, ProjectWalkthrough };

/**
 * SDK Configuration
 */
export interface SopresConfig {
  /** Base URL of your soPres API (e.g., 'https://api.example.com') */
  apiUrl: string;

  /** Access token for authenticated requests (optional) */
  accessToken?: string;

  /** Refresh token for token renewal (optional) */
  refreshToken?: string;

  /** Custom headers to include in all requests */
  headers?: Record<string, string>;

  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;

  /** Enable automatic token refresh (default: true) */
  autoRefreshToken?: boolean;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
}

/**
 * API Error response
 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * List query options
 */
export interface ListOptions {
  page?: number;
  limit?: number;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  locale?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  slug?: string; // For getBySlug
  [key: string]: string | number | undefined; // Index signature for buildQueryString compatibility
}

/**
 * Authentication credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

/**
 * Registration data
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

/**
 * SDK Client interface
 */
export interface ISopresClient {
  content: ContentAPI;
  auth: AuthAPI;
  media: MediaAPI;
  projects: ProjectAPI;
  setAccessToken(token: string): void;
  setRefreshToken(token: string): void;
}

/**
 * Content API interface
 */
export interface ContentAPI {
  list(options?: ListOptions): Promise<ApiResponse<Page[]>>;
  get(id: string): Promise<ApiResponse<Page>>;
  getBySlug(slug: string): Promise<ApiResponse<Page>>;
  search(query: string, options?: ListOptions): Promise<ApiResponse<Page[]>>;
}

/**
 * Auth API interface
 */
export interface AuthAPI {
  login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>>;
  register(data: RegisterData): Promise<ApiResponse<AuthResponse>>;
  refreshToken(): Promise<
    ApiResponse<{ accessToken: string; refreshToken: string }>
  >;
  logout(): Promise<ApiResponse<{ success: true }>>;
}

/**
 * Media API interface
 */
export interface MediaAPI {
  list(options?: ListOptions): Promise<ApiResponse<Media[]>>;
  get(id: string): Promise<ApiResponse<Media>>;
  upload(
    file: File | Blob,
    metadata?: { alt?: string; caption?: string },
  ): Promise<ApiResponse<Media>>;
  delete(id: string): Promise<ApiResponse<{ success: true }>>;
}

/**
 * Project API interface
 */
export interface ProjectAPI {
  list(options?: ListOptions): Promise<ApiResponse<ProjectWalkthrough[]>>;
  featured(): Promise<ApiResponse<ProjectWalkthrough[]>>;
  get(id: string): Promise<ApiResponse<ProjectWalkthrough>>;
  getBySlug(slug: string): Promise<ApiResponse<ProjectWalkthrough>>;
}
