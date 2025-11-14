import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the Navigation functionality.
 * @export
 * @class NavPage
 * @typedef {NavPage}
 */
export class NavBarPage {
    constructor(private page: Page) {}

    get navBar(): Locator {
        return this.page.getByRole('navigation');
    }
    get conduitIcon(): Locator {
        return this.navBar.getByRole('link', { name: 'conduit' });
    }
    get homePageLink(): Locator {
        return this.page.getByRole('link', {
            name: 'Home',
            exact: true,
        });
    }
    get newArticleButton(): Locator {
        return this.page.getByRole('link', {
            name: 'New Article',
        });
    }
    get settingsButton(): Locator {
        return this.page.getByRole('link', { name: 'Settings' });
    }
    get settingsPageTitle(): Locator {
        return this.page.getByRole('heading', {
            name: 'Your Settings',
        });
    }
    get logoutButton(): Locator {
        return this.page.getByRole('button', {
            name: 'Or click here to logout.',
        });
    }

    get copyrightText(): Locator {
        return this.page.getByText('An interactive learning project from Thinkster.');
    }
    get signInNavigationLink(): Locator {
        return this.page.getByRole('link', { name: 'Sign in' });
    }
    get signInPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Sign in' });
    }
    get emailInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Email' });
    }
    get passwordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Password' });
    }
    get signInButton(): Locator {
        return this.page.getByRole('button', { name: 'Sign in' });
    }
    get signUpNavigationLink(): Locator {
        return this.page.getByRole('link', { name: 'Sign up' });
    }
    get signUpPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Sign up' });
    }
    get homePageHeading(): Locator {
        return this.page.getByRole('heading', { name: 'conduit' });
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
    async navigateToSignInPage(): Promise<void> {
        await this.signInNavigationLink.click();

        await expect(this.signInPageTitle).toBeVisible();
    }

    /**
     * Navigates to the Sign Up page.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToSingUpPage(): Promise<void> {
        await this.signUpNavigationLink.click();

        await expect(this.signUpPageTitle).toBeVisible();
    }

    /**
     * Logs in the user using the provided email and password.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<void>} Resolves when the login process is complete.
     */
    async logIn(email: string, password: string): Promise<void> {
        await this.navigateToSignInPage();

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await this.page.waitForResponse(`${process.env.API_URL}api/tags`);

        await expect(
            this.page.getByRole('navigation').getByText(process.env.USER_NAME!)
        ).toBeVisible();
    }

    /**
     * Logs out the currently logged-in user.
     * @returns {Promise<void>} Resolves when the logout process is complete.
     */
    async logOut(): Promise<void> {
        await this.settingsButton.click();
        await expect(this.settingsPageTitle).toBeVisible();

        await this.logoutButton.click();

        await expect(this.homePageHeading).toBeVisible();
    }
}