import { EMAIL, PASSWORD } from "../../../env";
import { expect, test } from "../../../fixtures";
import { STORAGE_PATH } from "../../../types/constants";

test.describe("Sign In Functionality", () => {
  test(
    "Verify Successful Loading of Sign In Page",
    { tag: "@Smoke" },
    async ({ signInPage }) => {
      await signInPage.navigateToSignInPage();
      await signInPage.assertSignInFormDisplayed();
    }
  );

  test(
    "User can successfully log in",
    { tag: "@Smoke" },
    async ({ signInPage }) => {
      await signInPage.signIn(EMAIL, PASSWORD);
      await signInPage.getPage().context().storageState({ path: STORAGE_PATH });

      await signInPage.assertUserIsLoggedIn();
    }
  );
});
