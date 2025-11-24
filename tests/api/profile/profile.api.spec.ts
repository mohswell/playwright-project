import { USER_NAME } from '@/env';
import { test, expect } from '@/fixtures';
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
});
