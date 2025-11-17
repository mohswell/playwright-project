import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../base.page";
/**
 * This is the page object for the Sign Up functionality.
 * @export
 * @class SignUpPage
 * @typedef {SignUpPage}
 */
export class SignUpPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // inherits navigation and titles from BasePage

  get form(): {
    usernameInput: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    emailInvalidError: Locator;
    emailAlreadyTakenError: Locator;
    usernameAlreadyTakenError: Locator;
    passwordTooShortError: Locator;
  } {
    return {
      usernameInput: this.page.getByRole("textbox", { name: "Username" }),
      emailInput: this.page.getByRole("textbox", { name: "Email" }),
      passwordInput: this.page.getByRole("textbox", { name: "Password" }),
      emailInvalidError: this.page.getByText("email is invalid", {
        exact: true,
      }),
      emailAlreadyTakenError: this.page.getByText(
        "email has already been taken",
        { exact: true }
      ),
      usernameAlreadyTakenError: this.page.getByText(
        "username has already been taken",
        { exact: true }
      ),
      passwordTooShortError: this.page.getByText(
        "password is too short (minimum is 8 characters)",
        { exact: true }
      ),
    };
  }

  get actions(): {
    signUpButton: Locator;
  } {
    return {
      signUpButton: this.page.getByRole("button", { name: "Sign up" }),
    };
  }
  /**
   * Signs in using provided email and password.
   *
   * @param email - The email address to sign in with.
   * @param password - The password to sign in with.
   */
  async signUp(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.form.usernameInput.fill(username);
    await this.form.emailInput.fill(email);
    await this.form.passwordInput.fill(password);
    await this.actions.signUpButton.click();
  }

  async assertSignUpFormDisplayed(): Promise<void> {
    await expect(this.signUpPageTitle).toBeVisible();
  }

  /**
   * Asserts the error message for invalid email is displayed.
   */
  async assertEmailInvalidErrorDisplayed(): Promise<void> {
    await expect(this.form.emailInvalidError).toBeVisible();
  }

  /**
   * Asserts the error message for email already taken is displayed.
   */
  async assertEmailAlreadyTakenErrorDisplayed(): Promise<void> {
    await expect(this.form.emailAlreadyTakenError).toBeVisible();
  }

  /**
   * Asserts the error message for username already taken is displayed.
   */
  async assertUsernameAlreadyTakenErrorDisplayed(): Promise<void> {
    await expect(this.form.usernameAlreadyTakenError).toBeVisible();
  }
  /**
   * Asserts the error message for password too short is displayed.
   */
  async assertPasswordTooShortErrorDisplayed(): Promise<void> {
    await expect(this.form.passwordTooShortError).toBeVisible();
  }
}
