import { faker } from '@faker-js/faker';
import type { ArticleRequest } from '@/types/schema';

/**
 * Generate a unique ArticleRequest payload for tests.
 */
export function generateArticleData(): ArticleRequest {
    return {
        article: {
            title: `${faker.string.alphanumeric({ length: 8 })} - ${faker.lorem.words(
                2
            )}`,
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            tagList: [
                faker.lorem.word(),
                faker.lorem.word(),
                faker.lorem.word(),
            ],
        },
    };
}

/**
 * Generate a unique Comment for tests.
 */
export function generateCommentData() {
    return {
        comment: {
            body: faker.lorem.sentence(),
        },
    };
}

/**
 * Generate a unique User Image URL payload for tests.
 */
export function generateUserImage() {
    return {
        profilePictureUrl: faker.image.avatar(),
    };
}

/**
 * Generate a unique User Biography for tests.
 */
export function generateUserBio() {
    return {
        bio: faker.lorem.sentence(),
    };
}

/**
 * Generate random articles with title, about, description, and tags
 *
 */
export function generateRandomArticle() {
    return {
        title: faker.lorem.words(3),
        about: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(2),
        tags: [faker.lorem.word(), faker.lorem.word()],
    };
}
