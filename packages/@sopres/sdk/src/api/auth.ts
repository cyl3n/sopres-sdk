/**
 * soPres SDK - Auth API
 */

import type { HTTPClient } from "../client";
import type {
  AuthAPI,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ApiResponse,
} from "../types";

export class AuthAPIImpl implements AuthAPI {
  constructor(private client: HTTPClient) {}

  /**
   * Login with email and password
   */
  async login(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await this.client.post<AuthResponse>(
      "/api/v1/auth/login",
      credentials,
    );

    // Auto-store tokens
    if (response.success && response.data) {
      this.client.setAccessToken(response.data.accessToken);
      this.client.setRefreshToken(response.data.refreshToken);
    }

    return response;
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await this.client.post<AuthResponse>(
      "/api/v1/auth/register",
      data,
    );

    // Auto-store tokens
    if (response.success && response.data) {
      this.client.setAccessToken(response.data.accessToken);
      this.client.setRefreshToken(response.data.refreshToken);
    }

    return response;
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<
    ApiResponse<{ accessToken: string; refreshToken: string }>
  > {
    const response = await this.client.post<{
      accessToken: string;
      refreshToken: string;
    }>("/api/v1/auth/refresh", {});

    // Auto-store new tokens
    if (response.success && response.data) {
      this.client.setAccessToken(response.data.accessToken);
      this.client.setRefreshToken(response.data.refreshToken);
    }

    return response;
  }

  /**
   * Logout (invalidate refresh token)
   */
  async logout(): Promise<ApiResponse<{ success: true }>> {
    const response = await this.client.post<{ success: true }>(
      "/api/v1/auth/logout",
      {},
    );

    // Clear tokens
    this.client.clearTokens();

    return response;
  }
}
