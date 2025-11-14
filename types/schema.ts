import { DEFAULT_PROFILE_IMAGE } from "./constants";

// --- AUTH ---
export interface LoginRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface LoginResponse {
  user: {
    email: string;
    username: string;
    bio: string | null;
    image: string | typeof DEFAULT_PROFILE_IMAGE;
    token: string;
  };
}

export interface SignupRequest {
  user: {
    email: string;
    password: string;
    username: string;
  };
}

export interface SignupResponse {
  user: {
    id: number;
    email: string;
    username: string;
    bio: string | null;
    image: string | typeof DEFAULT_PROFILE_IMAGE;
    token: string;
  };
}

// --- USER ---
export interface User {
  id?: number;
  email: string;
  username: string;
  bio: string | null;
  image: string | typeof DEFAULT_PROFILE_IMAGE;
  token?: string;
}

export interface profileResponse {
  profile: {
    username: string;
    bio: string | null;
    image: string | typeof DEFAULT_PROFILE_IMAGE;
    following: boolean;
  };
}

export interface userRequest {
  user: User;
}

export interface userResponse {
  user: User;
}

// --- ARTICLE ---
export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string | null;
    image: string | null;
    following: boolean;
  };
}

export interface ArticlesListResponse {
  articles: Article[];
  articlesCount: number;
}

export interface ArticleRequest {
  article: {
    title: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}

export interface ArticleResponse {
  article: Article;
}

// --- QUERY PARAMS ---
export interface ArticlesQuery {
  tag?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface articleCommentRequest {
  comment: {
    body: string;
  };
}

export interface articleCommentResponse {
  comment: {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: {
      username: string;
      bio: string | null;
      image: string | typeof DEFAULT_PROFILE_IMAGE;
      following: boolean;
    };
  };
}

export interface followProfileRequest {}

export interface followProfileResponse {
  profile: {
    username: string;
    bio: string | null;
    image: string | typeof DEFAULT_PROFILE_IMAGE;
    following: boolean;
  };
}

export interface tagListResponse {
  tags: string[];
}

export interface favoriteArticleRequest {}

export interface favoriteArticleResponse {
  article: Article;
}
