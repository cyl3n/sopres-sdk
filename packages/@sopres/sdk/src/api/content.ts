/**
 * soPres SDK - Content API
 */

import type { Page } from "@sopres/core";
import type { HTTPClient } from "../client";
import type { ContentAPI, ListOptions, ApiResponse } from "../types";

export class ContentAPIImpl implements ContentAPI {
  constructor(private client: HTTPClient) {}

  /**
   * List all pages with pagination and filtering
   */
  async list(options: ListOptions = {}): Promise<ApiResponse<Page[]>> {
    const queryString = this.client.buildQueryString(options);
    return this.client.get<Page[]>(`/api/v1/content${queryString}`);
  }

  /**
   * Get a single page by ID
   */
  async get(id: string): Promise<ApiResponse<Page>> {
    return this.client.get<Page>(`/api/v1/content/${id}`);
  }

  /**
   * Get a single page by slug
   */
  async getBySlug(slug: string): Promise<ApiResponse<Page>> {
    const queryString = this.client.buildQueryString({ slug });
    const response = await this.client.get<Page[]>(
      `/api/v1/content${queryString}`,
    );

    // Extract first result
    if (response.data && response.data.length > 0) {
      return {
        success: true,
        data: response.data[0],
      };
    }

    throw new Error(`Page with slug "${slug}" not found`);
  }

  /**
   * Search pages by query
   */
  async search(
    query: string,
    options: ListOptions = {},
  ): Promise<ApiResponse<Page[]>> {
    const queryString = this.client.buildQueryString({
      ...options,
      search: query,
    });
    return this.client.get<Page[]>(`/api/v1/content${queryString}`);
  }
}
