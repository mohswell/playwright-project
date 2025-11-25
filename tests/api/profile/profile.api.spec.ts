import { EMAIL, USER_NAME } from '@/env';
import { test, expect } from '@/fixtures';
import { generateUserImage, generateUserBio } from '@/helpers/faker';
import { httpStatusCodes } from '@/helpers/utils';

test.describe('User Profile', () => {
    test(
        'Fetch user profile by username',
        { tag: '@API' },
        async ({ profile }) => {
            const response = await profile.fetch(USER_NAME);
            expect(response.status).toBe(httpStatusCodes.ok);
            expect(response.body.profile.username).toBeDefined();
        }
    );

    test(
        'Update the user profile settings successfully',
        { tag: '@API' },
        async ({ profile }) => {
            const response = await profile.update({
                user: {
                    username: USER_NAME,
                    bio: generateUserBio().bio,
                    image: generateUserImage().profilePictureUrl,
                    email: EMAIL,
                },
            });

            await expect(response.status).toBe(httpStatusCodes.ok);
            await expect(response.body.user.email).toBeDefined();
            await expect(response.body.user.username).toBe(USER_NAME);
        }
    );
});
