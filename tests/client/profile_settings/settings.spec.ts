import { expect, test } from '@/fixtures';
import { generateUserBio, generateUserImage } from '@/helpers/faker';

test.describe('Settings Functionality', () => {
    test('should display the settings page', async ({
        settingsPage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'tag', description: '@Smoke' });

        await settingsPage.settingsButton.click();
        await expect(settingsPage.settingsPageTitle).toBeVisible();
    });

    test('should update the user profile settings successfully', async ({
        settingsPage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'tag', description: '@Smoke' });

        await settingsPage.updateSettings({
            profilePictureUrl: generateUserImage().profilePictureUrl,
            bio: generateUserBio().bio,
        });

        await settingsPage.assertSettingsUpdated();
    });
});
