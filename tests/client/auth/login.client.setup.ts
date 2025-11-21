import { saveStorageState } from '@/helpers/utils';
import { EMAIL, PASSWORD } from '../../../env';
import { test } from '../../../fixtures';
import { STORAGE_PATH } from '../../../types/constants';

test.describe('Sign In Functionality', () => {
    test(
        'Verify Successful Loading of Sign In Page',
        { tag: '@Smoke' },
        async ({ signInPage }) => {
            await signInPage.navigateToSignInPage();
            await signInPage.assertSignInFormDisplayed();
        }
    );

    test(
        'User can successfully log in',
        { tag: '@Smoke' },
        async ({ signInPage }) => {
            await signInPage.signIn(EMAIL, PASSWORD);
            // Wait until the UI shows the logged-in user
            await signInPage.assertUserIsLoggedIn();

            await saveStorageState(signInPage.getPage(), STORAGE_PATH);
        }
    );
});
