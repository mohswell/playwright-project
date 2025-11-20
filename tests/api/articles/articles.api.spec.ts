import { expect, test } from "../../../fixtures";
import { generateArticleData } from "../../../helpers/faker";
import { httpStatusCodes } from "../../../helpers/utils";
import { ArticleRequest } from "../../../types/schema";

test.describe("Articles", () => {
  let createdArticle: { slug: string; title: string };

  // Runs before each test to create a new article
  test.beforeEach(async ({ articles }) => {
    const articleData = generateArticleData();
    const createResponse = await articles.create(articleData);

    expect(createResponse.status).toBe(httpStatusCodes.created);
    createdArticle = createResponse.body.article;
  });

  test("User can access articles successfully", async ({ articles }) => {
    const articleResponse = await articles.fetch();

    expect(articleResponse.body.articles.length).toBeGreaterThan(0);
    expect(articleResponse.status).toBe(httpStatusCodes.ok);
  });

  test("User can update articles successfully", async ({ articles }) => {    
    const newTitle = `Updated - ${Date.now()}`;

    const updatedData: ArticleRequest = {
      article: {
        ...createdArticle,
        title: newTitle,
      },
    };

    const updateResponse = await articles.update(
      createdArticle.slug,
      updatedData
    );

    expect(updateResponse.status).toBe(httpStatusCodes.ok);
    expect(updateResponse.body.article.title).toBe(newTitle);
  });

  test("User can delete articles successfully", async ({ articles }) => {
    const deleteResponse = await articles.delete(createdArticle.slug);
    
    expect(deleteResponse.status).toBe(httpStatusCodes.noContent);
  });
});
