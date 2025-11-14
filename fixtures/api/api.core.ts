import { test as base } from "@playwright/test";
import { API_URL } from "../../env";
import { APIClient } from "../../services/api.service";
import { ArticleService } from "../../services/articles.service";
import { AuthService } from "../../services/auth.service";

type Fixtures = {
  api: APIClient;
  auth: AuthService;
  articles: ArticleService;
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
});

export { expect } from "@playwright/test";
