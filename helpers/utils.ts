/**
 * Utility functions for various helper methods.
 */

import { Page } from "@playwright/test";
import { API_URL, URL } from "../env";
import { ApiResponse } from "../services/api.service";
import { ApiErrorResponse } from "../types/schema";

import fs from 'fs';
import path from 'path';

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

export function isError<T extends object>(
  res: ApiResponse<T>
): res is ApiResponse<ApiErrorResponse> {
  return "errors" in res.body;
}

export function isSuccess<T extends object>(
  res: ApiResponse<T>
): res is ApiResponse<T> {
  return !("errors" in res.body);
}


export async function saveStorageState(page: Page, storagePath: string) {
    const dir = path.dirname(storagePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    await page.context().storageState({ path: storagePath });
}


export const apiEndpoints = {
  auth: {
    login: "/users/login",
    signup: "/users",
  },
  articles: {
    list: "/articles",
    create: "/articles",
    detail: (slug: string) => `/articles/${slug}`,
    comments: (slug: string) => `/articles/${slug}/comments`,
    commentsDetail: (slug: string, commentId: number) =>
      `/articles/${slug}/comments/${commentId}`,
    favorite: (slug: string) => `/articles/${slug}/favorite`,
    feed: "/articles/feed",
  },
  tags: "/tags",
  user: "/user",
  profile: (username: string) => `/profile/${username}`,
  favorite: (slug: string) => `/articles/${slug}/favorite`,
  feed: "/articles/feed",
};

export const httpStatusCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
};

export const apiPath = {
  login: "/users/login",
  signup: "/users",
  articles: "/articles",
  articlesDetail: "/articles/{slug}",
  articlesComments: "/articles/{slug}/comments",
  tags: "/tags",
  user: "/user",
  profile: "/profile/{username}",
  favorite: "/articles/{slug}/favorite",
  feed: "/articles/feed",
  comments: "/comments",
};

export const environmentBaseUrls = {
  ci: {
    prefix: API_URL,
    suffix: ".com",
  },
  local: {
    api: API_URL,
    home: URL,
  },
  production: {
    api: API_URL,
    home: URL,
  },
  staging: {
    api: API_URL,
    home: URL,
  },
};

export const uiPages = {
  home: "/",
  signIn: "/login",
  signUp: "/register",
  settings: "/settings",
  profile: (username: string) => `/profile/${username}`,
  favorites: (username: string) => `/profile/${username}/favorites`,
  articleDetail: (slug: string) => `/article/${slug}`,
  articleCreate: "/editor",
};
