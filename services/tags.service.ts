import { APIClient, ApiResponse } from "./api.service";
import { apiEndpoints } from "../helpers/utils";
import { tagListResponse } from "../types/schema";

export class TagsService {
  constructor(private client: APIClient) {}

  /**
   * Fetch the list of tags
   */
  fetch(): Promise<ApiResponse<tagListResponse>> {
    return this.client.get<tagListResponse>(apiEndpoints.tags);
  }
}
