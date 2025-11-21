import { test, expect } from "../../../fixtures";

test.describe("Navigation functionality", () => {
  test(
    "Profile icon is visible for logged in users",
    { tag: "@Smoke" },
    async ({ navBarPage }) => {
      await expect(navBarPage.navBar).toBeVisible();
      // guest should not see profile or create article link
      await expect(navBarPage.profileIcon).toBeVisible();
    }
  );

  test("Clicking 'Sign in' opens the Sign In page", async ({ navBarPage }) => {
    await navBarPage.navigateToSignInPage();
    // verify sign in heading visible
    await expect(navBarPage.signInPageTitle).toBeVisible();
  });

  test("Clicking 'Sign up' opens the Sign Up page", async ({ navBarPage }) => {
    await navBarPage.navigateToSignUpPage();
    await expect(navBarPage.signUpPageTitle).toBeVisible();
  });

  test("Clicking conduit icon navigates home", async ({ navBarPage }) => {
    await navBarPage.navigateToSignInPage();
    await navBarPage.navigateToHomePageByIcon();
    await expect(navBarPage.homePageHeading).toBeVisible();
  });
});
