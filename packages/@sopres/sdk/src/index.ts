/**
 * soPres SDK - Official JavaScript/TypeScript Client
 * @packageDocumentation
 */

import { HTTPClient } from "./client";
import { ContentAPIImpl } from "./api/content";
import { AuthAPIImpl } from "./api/auth";
import { MediaAPIImpl } from "./api/media";
import { ProjectAPIImpl } from "./api/project";

import type {
  SopresConfig,
  ISopresClient,
  ContentAPI,
  AuthAPI,
  MediaAPI,
  ProjectAPI,
} from "./types";

// Export all types
export * from "./types";

/**
 * soPres SDK Client
 *
 * @example
 * ```typescript
 * import { createsoPres } from '@sopres/sdk';
 *
 * const cms = createsoPres({
 *   apiUrl: 'https://api.example.com',
 * });
 *
 * // Login
 * const { data } = await cms.auth.login({
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 *
 * // Fetch content
 * const pages = await cms.content.list({ status: 'PUBLISHED' });
 * ```
 */
export class SopresClient implements ISopresClient {
  private httpClient: HTTPClient;

  public readonly content: ContentAPI;
  public readonly auth: AuthAPI;
  public readonly media: MediaAPI;
  public readonly projects: ProjectAPI;

  constructor(config: SopresConfig) {
    this.httpClient = new HTTPClient(config);

    // Initialize API modules
    this.content = new ContentAPIImpl(this.httpClient);
    this.auth = new AuthAPIImpl(this.httpClient);
    this.media = new MediaAPIImpl(this.httpClient);
    this.projects = new ProjectAPIImpl(this.httpClient);
  }

  /**
   * Set access token for authenticated requests
   */
  setAccessToken(token: string): void {
    this.httpClient.setAccessToken(token);
  }

  /**
   * Set refresh token for automatic token renewal
   */
  setRefreshToken(token: string): void {
    this.httpClient.setRefreshToken(token);
  }

  /**
   * Clear all stored tokens
   */
  clearTokens(): void {
    this.httpClient.clearTokens();
  }
}

/**
 * Alias for SopresClient for backward compatibility
 * @deprecated Use SopresClient instead
 */
export const soPres = SopresClient;
export type soPres = SopresClient;

/**
 * Create a new soPres SDK instance
 *
 * @param config - SDK configuration
 * @returns soPres client instance
 *
 * @example
 * ```typescript
 * const cms = createsoPres({
 *   apiUrl: 'https://api.example.com',
 *   accessToken: 'your-token' // optional
 * });
 * ```
 */
export function createsoPres(config: SopresConfig): SopresClient {
  return new SopresClient(config);
}

// Default export
export default { createsoPres, soPres };
