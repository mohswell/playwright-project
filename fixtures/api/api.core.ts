import { test as base, expect } from "@playwright/test";
import { API_URL } from "../../env";
import { APIClient } from "../../services/api.service";
import { ArticleService } from "../../services/articles.service";
import { AuthService } from "../../services/auth.service";
import { TagsService } from "../../services/tags.service";
import { ArticleCommentsService as CommentsService } from "../../services/comments.service";

type Fixtures = {
  api: APIClient;
  auth: AuthService;
  articles: ArticleService;
  tags: TagsService;
  comments: CommentsService;
};

export const test = base.extend<Fixtures>({
  api: async ({ request }, use) => {
    const apiClient = new APIClient(request, API_URL);
    await use(apiClient);
  },
  auth: async ({ api }, use) => {
    await use(new AuthService(api));
  },
  articles: async ({ api }, use) => {
    await use(new ArticleService(api));
  },
  tags: async ({ api }, use) => {
    await use(new TagsService(api));
  },
  comments: async ({ api }, use) => {
    await use(new CommentsService(api));
  }
});

export { expect };
