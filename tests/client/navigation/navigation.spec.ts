import { test, expect } from '@/fixtures';

test.describe('Navigation functionality for logged in users', () => {
    test(
        'Profile icon is visible for logged in users',
        { tag: '@Smoke' },
        async ({ navBarPage }) => {
            await expect(navBarPage.navBar).toBeVisible();
            await expect(navBarPage.profileIcon).toBeVisible();
        }
    );

    test(
        'Clicking Settings link opens the Settings page',
        { tag: '@Smoke' },
        async ({ navBarPage }) => {
            await navBarPage.settingsButton.click();
            await expect(navBarPage.settingsPageTitle).toBeVisible();
        }
    );

    test(
        'Clicking conduit icon navigates home',
        { tag: '@Smoke' },
        async ({ navBarPage }) => {
            await expect(navBarPage.homePageHeading).toBeVisible();
        }
    );

    test(
        'Clicking Article link navigates to editor successfully',
        { tag: '@Smoke' },
        async ({ navBarPage }) => {
            await navBarPage.navigateToEditorPage();
        }
    );
});
