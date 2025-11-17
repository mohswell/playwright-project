import { Locator, Page, expect } from "@playwright/test";
import { USER_NAME } from "../../env";

/**
 * This is the page object for the Sign In functionality.
 * @export
 * @class SignInPage
 * @typedef {SignInPage}
 */
export class SignInPage {
  constructor(private page: Page) {}

  getPage() {
    return this.page;
  }

  get navigation(): {
    homePageLink: Locator;
    conduitIcon: Locator;
    needAnAccountLink: Locator;
    signInNavigationLink: Locator;
    signInPageTitle: Locator;
    signUpNavigationLink: Locator;
    usernameLink: Locator;
    createArticleLink: Locator;
  } {
    return {
      homePageLink: this.page.getByRole("link", { name: "Home", exact: true }),
      conduitIcon: this.page.getByRole("link", { name: "conduit" }),
      needAnAccountLink: this.page.getByText("Need an account?"),
      signInNavigationLink: this.page.getByRole("link", { name: "Sign in" }),
      signUpNavigationLink: this.page.getByRole("link", { name: "Sign up" }),
      signInPageTitle: this.page.getByRole("heading", { name: "Sign in" }),
      usernameLink: this.page.getByRole("link", { name: USER_NAME }),
      createArticleLink: this.page.getByRole("link", { name: "New Article" }),
    };
  }

  get form(): {
    emailInput: Locator;
    passwordInput: Locator;
    emailOrPasswordInvalidError: Locator;
  } {
    return {
      emailInput: this.page.getByRole("textbox", { name: "Email" }),
      passwordInput: this.page.getByRole("textbox", { name: "Password" }),
      emailOrPasswordInvalidError: this.page.getByText(
        "email or password is invalid"
      ),
    };
  }

  get actions(): {
    signInButton: Locator;
  } {
    return {
      signInButton: this.page.getByRole("button", { name: "Sign in" }),
    };
  }
  /**
   * Signs in using provided email and password.
   *
   * @param email - The email address to sign in with.
   * @param password - The password to sign in with.
   */
  async signIn(email: string, password: string): Promise<void> {
    await this.navigateToSignInPage();
    await this.form.emailInput.fill(email);
    await this.form.passwordInput.fill(password);
    await this.actions.signInButton.click();
  }

  async navigateToSignInPage(): Promise<void> {
    await this.navigation.signInNavigationLink.click();
  }

  async assertSignInFormDisplayed(): Promise<void> {
    await expect(this.navigation.signInPageTitle).toBeVisible();
  }

  async assertEmailOrPasswordInvalidErrorVisible(): Promise<void> {
    await expect(this.form.emailOrPasswordInvalidError).toBeVisible();
  }

  async assertUserIsLoggedIn(): Promise<void> {
    await expect(this.navigation.usernameLink).toBeVisible();
  }
}
