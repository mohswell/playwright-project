import { APIClient, ApiResponse } from './api.service';
import { apiEndpoints } from '../helpers/utils';
import { profileResponse, userRequest, userResponse } from '../types/schema';

export class ProfileService {
    constructor(private client: APIClient) {}

    fetch(
        username: string
    ): Promise<ApiResponse<{ profile: profileResponse[] }>> {
        return this.client.get<{ profile: profileResponse[] }>(
            apiEndpoints.profile(username)
        );
    }

    update(user: userRequest): Promise<ApiResponse<{ profile: userResponse }>> {
        return this.client.put(apiEndpoints.user, { user });
    }
}
