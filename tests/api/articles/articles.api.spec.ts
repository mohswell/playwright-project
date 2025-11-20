import { expect, test } from "../../../fixtures";
import { generateArticleData } from "../../../helpers/article-generator";
import { httpStatusCodes } from "../../../helpers/utils";

test.describe("Articles", () => {
  test(
    "User can access articles successfully",
    { tag: "@API" },
    async ({ articles }) => {
      const articleResponse = await articles.fetch();

      expect(articleResponse.body.articles.length).toBeGreaterThan(0); //toBeTruthy() also works
      expect(articleResponse.status).toBe(httpStatusCodes.ok);
    }
  );

  test(
    "User can create articles successfully",
    { tag: "@API" },
    async ({ articles }) => {
      const articleData = await generateArticleData();
      const articleResponse = await articles.create(articleData);

      expect(articleResponse.status).toBe(httpStatusCodes.created);
      expect(articleResponse.body.article.title).toBe(
        articleData.article.title
      );
    }
  );

  test("Users can update articles", { tag: "@API" }, async ({ articles }) => {
    const articleData = await generateArticleData();
    const createResponse = await articles.create(articleData);

    const updatedData = { ...articleData, article: { title: "Updated Title" } };
    const updateResponse = await articles.update(
      createResponse.body.article.slug,
      updatedData
    );

    expect(updateResponse.status).toBe(httpStatusCodes.ok);
    expect(updateResponse.body.article.title).toBe("Updated Title");
  });
});
