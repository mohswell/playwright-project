import { articleCommentResponse } from "@/types/schema";
import { test, expect } from "../../../fixtures";
import {
  generateCommentData,
  generateArticleData,
} from "../../../helpers/faker";
import { httpStatusCodes } from "../../../helpers/utils";

test.describe("Article Comments", () => {
  let articleSlug: string;

  // Create a fresh article before each test
  test.beforeEach(async ({ articles }) => {
    const articleData = generateArticleData();
    const createArticleResponse = await articles.create(articleData);
    expect(createArticleResponse.status).toBe(httpStatusCodes.created);
    articleSlug = createArticleResponse.body.article.slug;
  });

  test(
    "User can create a comment on an article",
    { tag: "@API" },
    async ({ comments }) => {
      const commentData = generateCommentData(); // returns { comment: { body: "..." } }
      const createCommentResponse = await comments.create(
        articleSlug,
        commentData
      );

      expect(createCommentResponse.status).toBe(httpStatusCodes.ok);
      expect(createCommentResponse.body.comment.body).toBe(
        commentData.comment.body
      );
    }
  );

  test(
    "User can fetch comments for an article",
    { tag: "@API" },
    async ({ comments }) => {
      const response = await comments.fetch(articleSlug);
      expect(response.status).toBe(httpStatusCodes.ok);
      expect(Array.isArray(response.body.comments)).toBe(true);
    }
  );

  test(
    "User can delete a comment from an article",
    { tag: "@API" },
    async ({ comments }) => {
      const commentData = generateCommentData();
      const createCommentResponse = await comments.create(articleSlug, commentData);
      expect(createCommentResponse.status).toBe(httpStatusCodes.ok);

      const deleteCommentResponse = await comments.delete(
        articleSlug,
        createCommentResponse.body.comment.id
      );
      expect(deleteCommentResponse.status).toBe(httpStatusCodes.ok);
      // Optional: verify comment no longer exists
      const fetchResp = await comments.fetch(articleSlug);
      expect(
        fetchResp.body.comments.some((c: articleCommentResponse) => c.comment.id === createCommentResponse.body.comment.id)
      ).toBe(false);
    }
  );
});
