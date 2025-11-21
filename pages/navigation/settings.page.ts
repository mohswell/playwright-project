import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base.page";
import { EMAIL, PASSWORD, USER_NAME } from "../../env";
/**
 * This is the page object for the Settings functionality.
 * @export
 * @class SettingsPage
 * @typedef {SettingsPage}
 */
export class SettingsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Form inputs */
  get form(): {
    profilePictureUrl: Locator;
    username: Locator;
    bio: Locator;
    email: Locator;
    password: Locator;
  } {
    return {
      profilePictureUrl: this.page.getByRole("textbox", {
        name: "URL of profile picture",
      }),
      username: this.page.getByRole("textbox", { name: "Username" }),
      bio: this.page.getByRole("textbox", { name: "Short bio about you" }),
      email: this.page.getByRole("textbox", { name: "Email" }),
      password: this.page.getByRole("textbox", { name: "New Password" }),
    };
  }

  get actions(): {
    saveSettings: Locator;
    logout: Locator;
  } {
    return {
      saveSettings: this.page.getByRole("button", { name: "Update Settings" }),
      logout: this.page.getByRole("button", {
        name: "Or click here to logout.",
      }),
    };
  }

  /**
   * Asserts the username input field has value for the logged in user.
   * @returns {Promise<void>} Resolves when the assertion is complete.
   */
  async assertUsernameValue(): Promise<void> {
    const usernameValue = await this.form.username.inputValue();
    expect(usernameValue).toBe( USER_NAME!);
  }

  /**
   * Asserts the password input field has value for the logged in user.
   * @returns {Promise<void>} Resolves when the assertion is complete.
   */
  async assertPasswordValue(): Promise<void> {
    const passwordValue = await this.form.password.inputValue();
    // password is stored in env; keep existing behavior
    expect(passwordValue).toBe(PASSWORD!);
  }

  /**
   * Navigates to the Logout page from the settings link.
   * @returns {Promise<void>} Resolves when navigation is complete.
   */
  async logOut(): Promise<void> {
    await this.settingsButton.click();
    await expect(this.settingsPageTitle).toBeVisible();
    await this.actions.logout.click();
    await expect(this.defaultPageHeading).toBeVisible();
  }

  /**
   * Updates user settings with provided values.
   * @param {Object} params - The parameters for updating settings.
   * @param {string} params.profilePictureUrl - The new profile picture URL.
   * @param {string} params.bio - The new bio.
   */
  async updateSettings(params: { profilePictureUrl?: string, bio?: string }): Promise<void> {
    await this.settingsButton.click();
    if (params.profilePictureUrl) {
      await this.form.profilePictureUrl.fill(params.profilePictureUrl);
    }
    if (params.bio) {
      await this.form.bio.fill(params.bio);
    }
    await this.form.username.fill(USER_NAME!);
    await this.form.email.fill(EMAIL!);
    await this.actions.saveSettings.click();
  }

  async assertSettingsUpdated(): Promise<void> {
    await expect(this.settingsPageTitle).toBeVisible();
  }
}
