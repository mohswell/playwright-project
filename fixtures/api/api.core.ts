import { API_URL } from '@/env';
import { generateArticleData } from '@/helpers/faker';
import {
    APIClient,
    AuthService,
    ArticleService,
    TagsService,
    ProfileService,
    ArticleCommentsService as CommentsService,
} from '@/services';
import { Article } from '@/types/schema';
import { test as base, expect } from '@playwright/test';

type Fixtures = {
    api: APIClient;
    auth: AuthService;
    articles: ArticleService;
    tags: TagsService;
    comments: CommentsService;
    profile: ProfileService;
    createdArticle: Article;
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
    },
    profile: async ({ api }, use) => {
        await use(new ProfileService(api));
    },
    // Create a fresh article for tests that need article data.
    // Tests can accept `createdArticle` to get the Article object (includes slug/title).
    createdArticle: async ({ articles }, use) => {
        const articleData = generateArticleData();
        const createResp = await articles.create(articleData);
        expect(createResp.status).toBeGreaterThanOrEqual(200);
        expect(createResp.status).toBeLessThan(300);
        const article = createResp.body.article as Article;
        await use(article);
    },
});

export { expect };
