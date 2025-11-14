// import { EMAIL, PASSWORD } from "../../../env";
// import { expect, test } from "../../../fixtures";
// import { httpStatusCodes } from "../../../helpers/utils";

// test("User can login and list articles", async ({ auth, articles }) => {
//   const loginResponse = await auth.login({
//     user: { email: EMAIL, password: PASSWORD },
//   });

//   expect(loginResponse.body.user.token).toBeTruthy();
//   expect(loginResponse.status).toBe(httpStatusCodes.ok);

//   const list = await articles.list({ limit: 2 });
//   expect(list.body.articles.length).toBeGreaterThan(0);
// });


