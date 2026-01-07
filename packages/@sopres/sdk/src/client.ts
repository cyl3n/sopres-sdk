/**
 * soPres SDK - HTTP Client
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import type { soPresConfig, ApiResponse, ApiError } from "./types";

export class HTTPClient {
  private axiosInstance: AxiosInstance;
  private config: soPresConfig;

  constructor(config: soPresConfig) {
    this.config = {
      timeout: 30000,
      autoRefreshToken: true,
      ...config,
    };

    this.axiosInstance = axios.create({
      baseURL: this.config.apiUrl,
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json",
        ...this.config.headers,
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request/response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - Add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.config.accessToken) {
          config.headers.Authorization = `Bearer ${this.config.accessToken}`;
        }
        return config;
      },
      (error: unknown) =>
        Promise.reject(
          error instanceof Error ? error : new Error(String(error)),
        ),
    );

    // Response interceptor - Handle token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // If 401 and we have a refresh token, try to refresh
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          this.config.refreshToken &&
          this.config.autoRefreshToken
        ) {
          originalRequest._retry = true;

          try {
            const response = await axios.post<
              ApiResponse<{ accessToken: string; refreshToken: string }>
            >(`${this.config.apiUrl}/api/v1/auth/refresh`, {
              refreshToken: this.config.refreshToken,
            });

            const { accessToken, refreshToken } = response.data.data;
            this.setAccessToken(accessToken);
            this.setRefreshToken(refreshToken);

            // Retry original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return this.axiosInstance(originalRequest);
          } catch (refreshError: unknown) {
            // Refresh failed, clear tokens
            this.clearTokens();
            return Promise.reject(
              refreshError instanceof Error
                ? refreshError
                : new Error(String(refreshError)),
            );
          }
        }

        return Promise.reject(error);
      },
    );
  }

  /**
   * Set access token
   */
  setAccessToken(token: string): void {
    this.config.accessToken = token;
  }

  /**
   * Set refresh token
   */
  setRefreshToken(token: string): void {
    this.config.refreshToken = token;
  }

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    this.config.accessToken = undefined;
    this.config.refreshToken = undefined;
  }

  /**
   * GET request
   */
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(
      url,
      config,
    );
    return response.data;
  }

  /**
   * Build query string from options
   */
  buildQueryString(params: Record<string, unknown>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const stringValue =
          typeof value === "string"
            ? value
            : typeof value === "number" || typeof value === "boolean"
              ? String(value)
              : JSON.stringify(value);
        searchParams.append(key, stringValue);
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }
}
