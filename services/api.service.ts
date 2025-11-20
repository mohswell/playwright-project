import { APIRequestContext, APIResponse as PlaywrightAPIResponse } from "@playwright/test";
import { HEADER } from "../types/constants";

export interface ApiResponse<T> {
  status: number;
  ok: boolean;
  body: T | any;
}

export class APIClient {
  private request: APIRequestContext;
  private baseUrl: string;
  private token?: string;

  constructor(request: APIRequestContext, baseUrl: string, token?: string) {
    this.request = request;
    this.baseUrl = baseUrl;
    this.token = token;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  private buildHeaders(extra?: Record<string, string>) {
    return {
      "Content-Type": HEADER.CONTENT_TYPE,
      ...(this.token ? { Authorization: `Token ${this.token}` } : {}),
      ...extra,
    };
  }

  private async handleResponse<T>(
    response: PlaywrightAPIResponse
  ): Promise<ApiResponse<T>> {
    const body = await response.json().catch(() => ({} as T));
    return {
      status: response.status(),
      ok: response.ok(),
      body,
    };
  }

   async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const response = await this.request.get(`${this.baseUrl}${url}`, {
      headers: this.buildHeaders(),
      params,
    });
    return this.handleResponse<T>(response);
  }

  async post<T, B = any>(url: string, body?: B): Promise<ApiResponse<T>> {
    const response = await this.request.post(`${this.baseUrl}${url}`, {
      headers: this.buildHeaders(),
      data: body,
    });
    return this.handleResponse<T>(response);
  }

  async put<T, B = any>(url: string, body?: B): Promise<ApiResponse<T>> {
    const response = await this.request.put(`${this.baseUrl}${url}`, {
      headers: this.buildHeaders(),
      data: body,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.request.delete(`${this.baseUrl}${url}`, {
      headers: this.buildHeaders(),
    });
    return this.handleResponse<T>(response);
  }
}