import { request } from "@playwright/test";
import { API_URL, EMAIL, PASSWORD } from "./env";
import { apiEndpoints, assertValue } from "./helpers/utils";
import type { LoginRequest, LoginResponse } from "./types/schema";

async function globalSetup() {
  const req = await request.newContext();
  const loginData: LoginRequest = {
    user: { email: EMAIL, password: PASSWORD },
  };
  const res = await req.post(`${API_URL}/${apiEndpoints.auth.login}`, {
    data: loginData,
  });
  const body: LoginResponse = await res.json();

  process.env.API_TOKEN = assertValue(
    body.user.token,
    "Login failed, token missing"
  );
  await req.dispose();
}

export default globalSetup;
