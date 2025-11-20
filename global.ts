import { request } from "@playwright/test";
import { API_URL, EMAIL, PASSWORD } from "./env";
import { apiEndpoints, assertValue } from "./helpers/utils";
import { LoginRequest, LoginResponse } from "./types/schema";
import { AUTH_TOKEN_PATH } from "./types/constants";

async function globalTestSetup() {
  const reqContext = await request.newContext();

  const loginData: LoginRequest = {
    user: { email: EMAIL, password: PASSWORD },
  };

  // use type for login requets and login response

  const response = await reqContext.post(
    `${API_URL}/${apiEndpoints.auth.login}`,
    {
      data: loginData,
    }
  );

  const body: LoginResponse = await response.json();
  const token = body.user.token;

  assertValue(token, "Login failed, token missing");

  // Save token in Playwright storage state
  await reqContext.storageState({ path: AUTH_TOKEN_PATH });
}

export default globalTestSetup;
