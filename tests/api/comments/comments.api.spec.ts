import { articleCommentResponse } from '@/types/schema';
import { test, expect } from '@/fixtures';
import { generateCommentData } from '@/helpers/faker';
import { httpStatusCodes } from '@/helpers/utils';

test.describe('Article Comments', () => {
    test(
        'User can create a comment on an article',
        { tag: '@API' },
        async ({ comments, createdArticle }) => {
            const commentData = generateCommentData(); // returns { comment: { body: "..." } }
            const createCommentResponse = await comments.create(
                createdArticle.slug,
                commentData
            );

            expect(createCommentResponse.status).toBe(httpStatusCodes.ok);
            expect(createCommentResponse.body.comment.body).toBe(
                commentData.comment.body
            );
        }
    );

    test(
        'User can fetch comments for an article',
        { tag: '@API' },
        async ({ comments, createdArticle }) => {
            const response = await comments.fetch(createdArticle.slug);
            expect(response.status).toBe(httpStatusCodes.ok);
            expect(Array.isArray(response.body.comments)).toBe(true);
        }
    );

    test(
        'User can delete a comment from an article',
        { tag: '@API' },
        async ({ comments, createdArticle }) => {
            const commentData = generateCommentData();
            const createCommentResponse = await comments.create(
                createdArticle.slug,
                commentData
            );
            expect(createCommentResponse.status).toBe(httpStatusCodes.ok);

            const deleteCommentResponse = await comments.delete(
                createdArticle.slug,
                createCommentResponse.body.comment.id
            );
            expect(deleteCommentResponse.status).toBe(httpStatusCodes.ok);
            // Optional: verify comment no longer exists
            const fetchResp = await comments.fetch(createdArticle.slug);
            expect(
                fetchResp.body.comments.some(
                    (c: articleCommentResponse) =>
                        c.comment.id === createCommentResponse.body.comment.id
                )
            ).toBe(false);
        }
    );
});
