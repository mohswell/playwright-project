import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base.page";
/**
 * This is the page object for the Homepage functionality.
 * @export
 * @class Homepage
 * @typedef {Homepage}
 */
export class Homepage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Asserts the homepage is displayed correctly.
   */
  async assertHomepageDisplayed(): Promise<void> {
    await super.assertHomepageDisplayed();
  }
}
