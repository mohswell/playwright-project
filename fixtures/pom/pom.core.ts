import { test as base, expect } from "@playwright/test";
import { SignInPage, SignUpPage, ProfilePage, SettingsPage, Homepage, NavBarPage } from "../../pages";
import { URL } from "../../env";

export type FrameworkFixtures = {
  signInPage: SignInPage;
  signUpPage: SignUpPage;
  profilePage: ProfilePage;
  settingsPage: SettingsPage;
  navBarPage: NavBarPage;
  homePage: Homepage;
  baseUrl: string;
};

export const test = base.extend<FrameworkFixtures>({
  homePage: async ({ page }, use) => {
    await use(new Homepage(page));
  },
    signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
    signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
    profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
    settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
    navBarPage: async ({ page }, use) => {
    await use(new NavBarPage(page));
  },

  // articlePage: async ({ page }, use) => {
  //   await use(new ArticlePage(page));
  // },

  page: async ({ page }, use) => {
    await page.goto(URL);
    await use(page);      // Hand over control to the test
  },
});

export { expect };
