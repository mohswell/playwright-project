import type { ArticleRequest } from "../types/schema";
import ArticleDataJson from "../test_data/articles.data.json";

/**
 * Generate an ArticleRequest payload using only the required fields.
 */
export function generateArticleData(): ArticleRequest {
  const json = ArticleDataJson as {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };

  return {
    article: {
      title: json.title,
      description: json.description,
      body: json.body,
      tagList: json.tagList,
    },
  };
}
