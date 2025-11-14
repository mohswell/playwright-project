import { APIRequestContext, APIResponse } from "@playwright/test";

export interface ApiServiceResponse<T> {
  status: number;
  ok: boolean;
  body: T;
}


export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export interface ApiRequestParams<TBody = unknown> {
  request: APIRequestContext;
  method: HttpMethod;
  url: string;
  baseUrl?: string;
  body?: TBody;
  headers?: Record<string, string>;
  token?: string;
}

export interface ApiResponseData<TResponse = unknown> {
  status?: number;
  body?: TResponse | null;
  raw?: APIResponse;
  headers?: Record<string, string>;
}
