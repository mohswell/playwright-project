import { expect, test } from '../../../fixtures';
import { httpStatusCodes } from '../../../helpers/utils';
import { ArticleRequest } from '../../../types/schema';

test.describe('Articles API', () => {
    test(
        'User can access articles successfully',
        { tag: '@API' },
        async ({ articles }) => {
            const articleResponse = await articles.fetch();

            expect(articleResponse.body.articles.length).toBeGreaterThan(0);
            expect(articleResponse.status).toBe(httpStatusCodes.ok);
        }
    );

    test(
        'User can update articles successfully',
        { tag: '@API' },
        async ({ articles, createdArticle }) => {
            const newTitle = `Updated - ${Date.now()}`;

            const updatedData: ArticleRequest = {
                article: {
                    title: newTitle,
                },
            };

            const updateResponse = await articles.update(
                createdArticle.slug,
                updatedData
            );

            expect(updateResponse.status).toBe(httpStatusCodes.ok);
            expect(updateResponse.body.article.title).toBe(newTitle);
        }
    );

    test(
        'User can delete articles successfully',
        { tag: '@API' },
        async ({ articles, createdArticle }) => {
            const deleteResponse = await articles.delete(createdArticle.slug);

            expect(deleteResponse.status).toBe(httpStatusCodes.noContent);
        }
    );
});
