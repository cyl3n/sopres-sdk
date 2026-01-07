/**
 * soPres SDK - Project API
 */

import type { ProjectWalkthrough } from "@sopres/core";
import type { HTTPClient } from "../client";
import type { ProjectAPI, ListOptions, ApiResponse } from "../types";

export class ProjectAPIImpl implements ProjectAPI {
  constructor(private client: HTTPClient) {}

  /**
   * List all published projects
   */
  async list(
    options: ListOptions = {},
  ): Promise<ApiResponse<ProjectWalkthrough[]>> {
    const queryString = this.client.buildQueryString(options);
    return this.client.get<ProjectWalkthrough[]>(
      `/api/v1/public/projects${queryString}`,
    );
  }

  /**
   * Get featured projects
   */
  async featured(): Promise<ApiResponse<ProjectWalkthrough[]>> {
    return this.client.get<ProjectWalkthrough[]>(
      `/api/v1/public/projects/featured`,
    );
  }

  /**
   * Get a single project by ID or slug
   */
  async get(idOrSlug: string): Promise<ApiResponse<ProjectWalkthrough>> {
    return this.client.get<ProjectWalkthrough>(
      `/api/v1/public/projects/${idOrSlug}`,
    );
  }

  /**
   * Get a single project by slug (convience method, maps to get)
   */
  async getBySlug(slug: string): Promise<ApiResponse<ProjectWalkthrough>> {
    return this.get(slug);
  }
}
