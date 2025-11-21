import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base.page";

/**
 * This is the page object for the Navigation functionality.
 * @export
 * @class NavPage
 * @typedef {NavPage}
 */
export class NavBarPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getPage() {
    return this.page;
  }

  get navBar(): Locator {
    return this.page.getByRole("navigation");
  }

  get copyrightText(): Locator {
    return this.page.getByText(
      "An interactive learning project from Thinkster."
    );
  }

  /**
   * Navigates to the Home page using the Home link.
   * @returns {Promise<void>} Resolves when navigation is complete.
   */
  async navigateToHomePage(): Promise<void> {
    await this.homePageLink.click();
    await expect(this.homePageHeading).toBeVisible();
  }

  /**
   * Navigates to the Home page using the Conduit icon.
   * @returns {Promise<void>} Resolves when navigation is complete.
   */
  async navigateToHomePageByIcon(): Promise<void> {
    await this.conduitIcon.click();
    await expect(this.homePageHeading).toBeVisible();
  }

  /**
   * Navigates to the Sign In page.
   * @returns {Promise<void>} Resolves when navigation is complete.
   */
  async navigateToSignIn(): Promise<void> {
    await super.navigateToSignInPage();
  }

  /**
   * Navigates to the Sign Up page.
   * @returns {Promise<void>} Resolves when navigation is complete.
   */
  async navigateToSignUp(): Promise<void> {
    await super.navigateToSignUpPage();
  }

  /**
   * Logs in the user using the provided email and password.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<void>} Resolves when the login process is complete.
   */
  async logIn(email: string, password: string): Promise<void> {
    await this.navigateToSignInPage();
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
    try {
      await this.page.waitForResponse((r) => r.url().includes("/api/tags"), {
        timeout: 5000,
      });
    } catch {
      // ignore; subsequent assertions will fail if login didn't happen
    }

    await expect(this.profileIcon).toBeVisible();
  }

  /**
   * Logs out the currently logged-in user.
   * @returns {Promise<void>} Resolves when the logout process is complete.
   */
  async logOut(): Promise<void> {
    await super.navigateToHomePage();
    // prefer to navigate via settings button then logout
    await this.settingsButton.click();
    await expect(this.settingsPageTitle).toBeVisible();
    await this.page
      .getByRole("button", { name: "Or click here to logout." })
      .click();
    await expect(this.homePageHeading).toBeVisible();
  }
}
