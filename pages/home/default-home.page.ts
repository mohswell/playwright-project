import { Page, Locator, expect } from "@playwright/test";

/**
 * This is the page object for the Homepage functionality.
 * @export
 * @class Homepage
 * @typedef {Homepage}
 */
export class Homepage {
  constructor(private page: Page) {}

  get navigation(): {
    conduitIcon: Locator;
    homePageLink: Locator;
    signInNavigationLink: Locator;
    signUpNavigationLink: Locator;
    homePageTitle: Locator;
    homePageMessage: Locator;
    bondarAcademyLink: Locator;
    globalFeedTab?: Locator;
    yourFeedTab?: Locator;
  } {
    return {
      conduitIcon: this.page.getByRole("link", { name: "conduit" }),
      homePageLink: this.page.getByRole("link", {
        name: "Home",
        exact: true,
      }),
      signInNavigationLink: this.page.getByRole("link", {
        name: "Sign in",
        exact: true,
      }),
      signUpNavigationLink: this.page.getByRole("link", {
        name: "Sign up",
        exact: true,
      }),
      homePageTitle: this.page.getByRole("heading", {
        name: "Home",
        exact: true,
      }),
      homePageMessage: this.page.getByText(
        "A place to learn and practice test automation."
      ),
      bondarAcademyLink: this.page.getByRole("link", {
        name: "www.bondaracademy.com",
        exact: true,
      }),
      globalFeedTab: this.page.getByRole("tab", { name: "Global Feed" }),
      yourFeedTab: this.page.getByRole("tab", { name: "Your Feed" }),
    };
  }

  /**
   * Asserts the homepage is displayed correctly.
   */
  async assertHomepageDisplayed(): Promise<void> {
    await expect(this.navigation.homePageTitle).toBeVisible();
    await expect(this.navigation.homePageMessage).toBeVisible();
    await expect(this.navigation.bondarAcademyLink).toBeVisible();
  }
}
