import { test } from "@/fixtures";
import { generateUserBio, generateUserImage } from "@/helpers/faker";

test.describe('Settings Functionality', () => {

  test('should display the settings page', async ({ settingsPage }) => {
    await test.step('Verify Navigation Settings Page', async () => {
      await settingsPage.settingsButton.click();
      await settingsPage.settingsPageTitle.isVisible();
    });
  });

  test('should update the user profile settings successfully', async ({ settingsPage }) => {
    await test.step('Verify User Profile Update', async () => {
      await settingsPage.updateSettings({
        profilePictureUrl: generateUserImage().profilePictureUrl,
        bio: generateUserBio().bio
      });
    });
    await settingsPage.assertSettingsUpdated();
  });

}

