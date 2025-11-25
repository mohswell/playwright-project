import { assertValue } from '@/helpers/utils';

export const URL = assertValue(
    process.env.URL!,
    'Missing environment variable: URL'
);

export const API_URL = assertValue(
    process.env.API_URL!,
    'Missing environment variable: API_URL'
);

export const USER_NAME = assertValue(
    process.env.USER_NAME!,
    'Missing environment variable: USER_NAME'
);
export const EMAIL = assertValue(
    process.env.EMAIL!,
    'Missing environment variable: EMAIL'
);
export const PASSWORD = assertValue(
    process.env.PASSWORD!,
    'Missing environment variable: PASSWORD'
);
