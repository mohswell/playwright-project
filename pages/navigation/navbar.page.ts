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
  }

  /**
   * Navigates to the Home page using the Conduit icon.
   * @returns {Promise<void>} Resolves when navigation is complete.
   */
  async navigateToHomePageByIcon(): Promise<void> {
    await this.conduitIcon.click();
    await expect(this.homePageHeading).toBeVisible();
  }


  async navigateToEditorPage(): Promise<void> {
    await this.newArticleButton.click();
    await expect(this.submitArticleButton).toBeVisible();
  }

  /**
   * Logs out the currently logged-in user.
   * @returns {Promise<void>} Resolves when the logout process is complete.
   */
  async logOut(): Promise<void> {
    await this.navigateToHomePage();
    // prefer to navigate via settings button then logout
    await this.settingsButton.click();
    await expect(this.settingsPageTitle).toBeVisible();
    await this.logoutButton.click();
    await expect(this.signInNavigationLink).toBeVisible();
  }
}
