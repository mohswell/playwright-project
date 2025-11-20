import { EMAIL, PASSWORD } from "../../../env";
import { expect, test } from "../../../fixtures";
import { httpStatusCodes, isError } from "../../../helpers/utils";
import invalidCredentials from "../../../test_data/users.data.json";

test.describe("Authentication Setup", () => {
  test(
    "User can login successfully",
    { tag: "@API" },
    async ({ auth, api }) => {
      const loginResponse = await auth.login({
        user: { email: EMAIL, password: PASSWORD },
      });

      expect(loginResponse.body.user.token).toBeTruthy();
      expect(loginResponse.status).toBe(httpStatusCodes.ok);

      // Set the token on the API client so other services can use it
      api.setAuthToken(loginResponse.body.user.token);
    }
  );

  test(
    "Displays login error message for incorrect email or password",
    { tag: "@API" },
    async ({ auth }) => {
      const invalidLoginResponse = await auth.login({
        user: {
          email: invalidCredentials.invalidEmails[0],
          password: invalidCredentials.invalidPasswords[0],
        },
      });

      expect(invalidLoginResponse.status).toBe(httpStatusCodes.forbidden);
      expect(invalidLoginResponse.ok).toBe(false);
      expect(isError(invalidLoginResponse)).toBe(true);

      expect(invalidLoginResponse.body.errors["email or password"][0]).toBe("is invalid");
      // expect body to be error: {"errors":{"email or password":["is invalid"]}}
    }
  );
});
// TODO: ADD SIGNUP IN ANOTHER FILE
// test.describe("Verify API Validation for Log In / Sign Up", () => {

//   test(
//     "Verify API Validation for Sign Up",
//     { tag: "@Api" },
//     async ({ apiRequest }) => {
//       await test.step("Verify API Validation for Invalid Email", async () => {
//         for (const invalidEmail of invalidCredentials.invalidEmails) {
//           const { status, body } = await apiRequest<ErrorResponse>({
//             method: "POST",
//             url: "api/users",
//             baseUrl: process.env.API_URL,
//             body: {
//               user: {
//                 email: invalidEmail,
//                 password: "8charact",
//                 username: "testuser",
//               },
//             },
//           });

//           expect(status).toBe(422);
//           expect(ErrorResponseSchema.parse(body)).toBeTruthy();
//         }
//       });

//       await test.step("Verify API Validation for Invalid Password", async () => {
//         for (const invalidPassword of invalidCredentials.invalidPasswords) {
//           const { status, body } = await apiRequest<ErrorResponse>({
//             method: "POST",
//             url: "api/users",
//             baseUrl: process.env.API_URL,
//             body: {
//               user: {
//                 email: "validEmail@test.com",
//                 password: invalidPassword,
//                 username: "testuser",
//               },
//             },
//           });

//           expect(status).toBe(422);
//           expect(ErrorResponseSchema.parse(body)).toBeTruthy();
//         }
//       });

//       await test.step("Verify API Validation for Invalid Email", async () => {
//         for (const invalidUsername of invalidCredentials.invalidUsernames) {
//           const { status, body } = await apiRequest<ErrorResponse>({
//             method: "POST",
//             url: "api/users",
//             baseUrl: process.env.API_URL,
//             body: {
//               user: {
//                 email: "validEmail@test.com",
//                 password: "8charact",
//                 username: invalidUsername,
//               },
//             },
//           });

//           expect(status).toBe(422);
//           expect(ErrorResponseSchema.parse(body)).toBeTruthy();
//         }
//       });
//     }
//   );
// });
