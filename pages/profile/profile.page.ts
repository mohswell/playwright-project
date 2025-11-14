import { Page, Locator, expect } from "@playwright/test";

/**
 * This is the page object for the Profile functionality.
 * @export
 * @class ProfilePage
 * @typedef {ProfilePage}
 */
export class ProfilePage {
  constructor(private page: Page) {}

  get navigation(): {
    conduitIcon: Locator;
    homePageLink: Locator;
    createArticleButton: Locator;
    settingsButton: Locator;
    profileIcon: Locator;
    profilePageTitle?: Locator;
  } {
    return {
      conduitIcon: this.page.getByRole("link", { name: "conduit" }),

      settingsButton: this.page.getByRole("link", {
        name: "Settings",
        exact: true,
      }),
      createArticleButton: this.page.getByRole("link", {
        name: "Create article",
      }),
      homePageLink: this.page.getByRole("link", {
        name: "Home",
        exact: true,
      }),
      profileIcon: this.page.getByRole("link", {
        name: process.env.USERNAME!,
      }),
      profilePageTitle: this.page.getByRole("heading", {
        name: process.env.USERNAME!,
      }),
    };
  }

  get actions(): {
    editProfileSettings: Locator;
    myPostsLink: Locator;
    favoritedPostsLink: Locator;
  } {
    return {
      editProfileSettings: this.page.getByRole("link", {
        name: "Edit Profile Settings",
        exact: true,
      }),
      myPostsLink: this.page.getByRole("link", {
        name: "My Posts",
      }),
      favoritedPostsLink: this.page.getByRole("link", {
        name: "Favorited Posts",
      }),
    };
  }

  get articlesSections(): {
    articlePreviews: Locator;
    noArticlesMessage: Locator;
  } {
    return {
      articlePreviews: this.page.locator(".article-preview"),
      noArticlesMessage: this.page.getByText("No articles are here... yet.", {
        exact: true,
      }),
    };
  }

  /**
   * Checks whether there are any visible article previews.
   * @returns {Promise<boolean>} True if articles exist, false otherwise.
   */
  async hasArticles(): Promise<boolean> {
    const count = await this.articlesSections.articlePreviews.count();
    if (count === 0) return false;

    // If the only `.article-preview` has the empty text, treat it as empty.
    const firstContent = await this.articlesSections.articlePreviews
      .first()
      .textContent();
    return !firstContent?.includes("No articles are here... yet.");
  }

  /**
   * Asserts either article cards or empty message are displayed.
   */
  async assertArticlesDisplay(): Promise<void> {
    if (await this.hasArticles()) {
      await expect(this.articlesSections.articlePreviews.first()).toBeVisible();
    } else {
      await expect(this.articlesSections.noArticlesMessage).toBeVisible();
    }
  }
}
