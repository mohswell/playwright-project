import { Page, Locator, expect } from '@playwright/test';
import { USER_NAME } from '../env';

export class BasePage {
    constructor(protected page: Page) {}

    // Navigation locators
    get conduitIcon(): Locator {
        // Scope to the navigation bar to avoid matching duplicate 'conduit' links
        return this.page
            .getByRole('navigation')
            .getByRole('link', { name: 'conduit' })
            .first();
    }

    get homePageLink(): Locator {
        return this.page.getByRole('link', { name: 'Home', exact: true });
    }

    get signInNavigationLink(): Locator {
        return this.page.getByRole('link', { name: 'Sign in', exact: true });
    }

    get signUpNavigationLink(): Locator {
        return this.page.getByRole('link', { name: 'Sign up', exact: true });
    }

    get createArticleButton(): Locator {
        return this.page.getByRole('link', { name: 'Create article' });
    }

    get newArticleButton(): Locator {
        return this.page.getByRole('link', { name: 'New Article' });
    }

    get settingsButton(): Locator {
        return this.page
            .getByRole('link', { name: 'Settings' })
            .first();
    }

    get profileIcon(): Locator {
        return this.page.getByRole('link', { name: USER_NAME });
    }

    get editProfileSettingsButton(): Locator {
        return this.page.getByRole('link', {
            name: 'Edit Profile Settings',
            exact: true,
        });
    }

    // Page headings
    get homePageHeading(): Locator {
        return this.page.getByRole('heading', { name: 'conduit' });
    }

    get homePageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Home', exact: true });
    }

    get homePageMessage(): Locator {
        return this.page.getByText(
            'A place to learn and practice test automation.'
        );
    }

    get bondarAcademyLink(): Locator {
        return this.page.getByRole('link', {
            name: 'www.bondaracademy.com',
            exact: true,
        });
    }

    get signInPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Sign in' });
    }

    get signUpPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Sign up' });
    }

    get settingsPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Your Settings' });
    }

    get defaultPageHeading(): Locator {
        return this.page.getByRole('heading', { name: 'conduit' });
    }

    // Common actions
    async navigateToHomePage(): Promise<void> {
        await this.homePageLink.click();
        await expect(this.homePageHeading).toBeVisible();
    }

    async navigateToSignInPage(): Promise<void> {
        await this.signInNavigationLink.click();
        await expect(this.signInPageTitle).toBeVisible();
    }

    async navigateToSignUpPage(): Promise<void> {
        await this.signUpNavigationLink.click();
        await expect(this.signUpPageTitle).toBeVisible();
    }

    async assertHomepageDisplayed(): Promise<void> {
        await expect(this.homePageTitle).toBeVisible();
        await expect(this.homePageMessage).toBeVisible();
        await expect(this.bondarAcademyLink).toBeVisible();
    }
}
