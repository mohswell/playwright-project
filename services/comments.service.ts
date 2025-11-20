import { APIClient, ApiResponse } from "./api.service";
import { apiEndpoints } from "../helpers/utils";
import { articleCommentRequest, articleCommentResponse } from "../types/schema";

export class ArticleCommentsService {
  constructor(private client: APIClient) {}

  fetch(
    slug: string
  ): Promise<ApiResponse<{ comments: articleCommentResponse[] }>> {
    return this.client.get<{ comments: articleCommentResponse[] }>(
      apiEndpoints.articles.comments(slug)
    );
  }

  create(
    slug: string,
    data: articleCommentRequest
  ): Promise<ApiResponse<{ comment: articleCommentResponse }>> {
    return this.client.post<{ comment: articleCommentResponse }>(
      apiEndpoints.articles.comments(slug),
      data
    );
  }

  delete(slug: string, commentId: number): Promise<ApiResponse<{}>> {
    return this.client.delete(
      apiEndpoints.articles.commentsDetail(slug, commentId)
    );
  }
}
