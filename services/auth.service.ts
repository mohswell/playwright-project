import { apiEndpoints } from "../helpers/utils";
import { LoginRequest, LoginResponse } from "../types/schema";
import { APIClient, ApiResponse } from "./api.service";

export class AuthService {
  constructor(private client: APIClient) {}

  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.client.post<LoginResponse, LoginRequest>(
      apiEndpoints.auth.login,
      data
    );
  }

  async signup(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.client.post<LoginResponse, LoginRequest>(
      apiEndpoints.auth.signup,
      data
    );
  }
}
