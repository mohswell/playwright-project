import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../base.page";

/**
 * This is the page object for the Sign In functionality.
 * @export
 * @class SignInPage
 * @typedef {SignInPage}
 */
export class SignInPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getPage() {
    return this.page;
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
    await super.navigateToSignInPage();
  }

  async assertSignInFormDisplayed(): Promise<void> {
    await expect(this.signInPageTitle).toBeVisible();
  }

  async assertEmailOrPasswordInvalidErrorVisible(): Promise<void> {
    await expect(this.form.emailOrPasswordInvalidError).toBeVisible();
  }

  async assertUserIsLoggedIn(): Promise<void> {
    await expect(this.profileIcon).toBeVisible();
  }
}
