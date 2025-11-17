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

      expect(articleResponse.body.article.title).toBe(articleData.article.title);
      expect(articleResponse.status).toBe(httpStatusCodes.created);
    }
  );

  test('Users Can update articles',{tag:'@API'}, async ({  
    articles
  }) => {

  });  
});
