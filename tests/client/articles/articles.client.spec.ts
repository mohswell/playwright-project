import { test, expect } from '@/fixtures';
import { generateRandomArticle } from '@/helpers/faker';

test.describe('Articles functionality', () => {
    test(
        'Users can create Articles successfully',
        { tag: '@Smoke' },
        async ({ articlePage }) => {
            const articleData = generateRandomArticle();
            await articlePage.createArticle(articleData);

            await articlePage.assertArticleCreated({
                title: articleData.title,
                description: articleData.description,
                tags: articleData.tags,
            });
        }
    );
});
