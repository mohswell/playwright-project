import { apiEndpoints } from "../helpers/utils";
import {
  ArticlesQuery,
  ArticlesListResponse,
  Article,
  ArticleRequest,
} from "../types/schema";
import { APIClient, ApiResponse } from "./api.service";

export class ArticleService {
  constructor(private client: APIClient) {}

  list(query?: ArticlesQuery): Promise<ApiResponse<ArticlesListResponse>> {
    return this.client.get(apiEndpoints.articles.list, query);
  }

  detail(slug: string): Promise<ApiResponse<{ article: Article }>> {
    return this.client.get(apiEndpoints.articles.detail(slug));
  }

  create(data: ArticleRequest): Promise<ApiResponse<{ article: Article }>> {
    return this.client.post(apiEndpoints.articles.list, data);
  }

  delete(slug: string): Promise<ApiResponse<{}>> {
    return this.client.delete(apiEndpoints.articles.detail(slug));
  }
}
