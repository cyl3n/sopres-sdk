/**
 * soPres SDK - Media API
 */

import type { Media } from "@sopres/core";
import type { HTTPClient } from "../client";
import type { MediaAPI, ListOptions, ApiResponse } from "../types";

export class MediaAPIImpl implements MediaAPI {
  constructor(private client: HTTPClient) {}

  /**
   * List all media files with pagination
   */
  async list(options: ListOptions = {}): Promise<ApiResponse<Media[]>> {
    const queryString = this.client.buildQueryString(options);
    return this.client.get<Media[]>(`/api/v1/media${queryString}`);
  }

  /**
   * Get a single media file by ID
   */
  async get(id: string): Promise<ApiResponse<Media>> {
    return this.client.get<Media>(`/api/v1/media/${id}`);
  }

  /**
   * Upload a media file
   */
  async upload(
    file: File | Blob,
    metadata?: { alt?: string; caption?: string; folder?: string },
  ): Promise<ApiResponse<Media>> {
    const formData = new FormData();
    formData.append("file", file);

    if (metadata?.alt) {
      formData.append("alt", metadata.alt);
    }
    if (metadata?.caption) {
      formData.append("caption", metadata.caption);
    }
    if (metadata?.folder) {
      formData.append("folder", metadata.folder);
    }

    return this.client.post<Media>("/api/v1/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Delete a media file
   */
  async delete(id: string): Promise<ApiResponse<{ success: true }>> {
    return this.client.delete<{ success: true }>(`/api/v1/media/${id}`);
  }
}
