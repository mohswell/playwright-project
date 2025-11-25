import { test } from '@/fixtures';
import { generateCommentData, generateRandomArticle } from '@/helpers/faker';

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

    test(
        'Users can like Articles and save to favorites successfully',
        { tag: '@Smoke' },
        async ({ articlePage }) => {
            await articlePage.clickLike();
        }
    );

    test(
        'Users can comment on Articles successfully',
        { tag: '@Smoke' },
        async ({ articlePage }) => {
            await articlePage.navigateToFirstArticle();
            const commentText = generateCommentData().comment.body;
            await articlePage.commentOnArticle(commentText);
        }
    );
});
