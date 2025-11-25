import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * This is the page object for the Articles functionality.
 * @export
 * @class ArticlesPage
 */

export class ArticlePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getPage() {
        return this.page;
    }

    getFavoriteButton(): Locator {
        return this.page.locator('button:has(i.ion-heart)').first();
    }

    /** Form inputs */
    get form(): {
        articleTitle: Locator;
        articleAbout: Locator;
        articleDescription: Locator;
        articleTags: Locator;
        articleSubmitButton: Locator;
    } {
        return {
            articleTitle: this.page.getByRole('textbox', {
                name: 'Article Title',
            }),
            articleAbout: this.page.getByRole('textbox', {
                name: "What's this article about?",
            }),
            articleDescription: this.page.getByRole('textbox', {
                name: 'Write your article (in markdown)',
            }),
            articleTags: this.page.getByRole('textbox', { name: 'Enter tags' }),
            articleSubmitButton: this.page.getByRole('button', {
                name: 'Publish Article',
            }),
        };
    }

    get actions(): {
        publishArticle: Locator;
    } {
        return {
            publishArticle: this.form.articleSubmitButton,
        };
    }

    get articleView() {
        return {
            title: this.page.locator('.article-page h1'),

            description: this.page.locator('.article-content p'),

            author: this.page.locator('.article-meta .author').first(),

            tags: this.page.locator('.tag-list .tag-default'),
        };
    }

    /**
     * Creates an article
     * @param {string} params.title - The title of the article.
     * @param {string} params.about - A brief description about the article.
     * @param {string} params.description - The full content of the article.
     * @param {string[]} params.tags - Tags associated with the article.
     */

    async createArticle(params: {
        title: string;
        about: string;
        description: string;
        tags: string[];
    }): Promise<void> {
        await super.navigateToArticlePage();
        await this.form.articleTitle.fill(params.title);
        await this.form.articleAbout.fill(params.about);
        await this.form.articleDescription.fill(params.description);
        await this.form.articleTags.fill(params.tags.join(', '));
        await this.actions.publishArticle.click();
    }

    async assertArticleCreated(params: {
        title: string;
        description: string;
        tags: string[];
    }) {
        // Wait for page title to show
        await expect(this.articleView.title).toBeVisible();

        await expect(this.articleView.title).toHaveText(params.title);
        await expect(this.articleView.description).toContainText(
            params.description
        );

        // Tags (the RealWorld app groups tags like "lorem, ipsum")
        // So check each tag exists inside the <li> element
        for (const tag of params.tags) {
            await expect(
                this.articleView.tags.filter({ hasText: tag })
            ).toBeVisible();
        }
    }

    async clickLike() {
        const btn = this.getFavoriteButton();

        const countText = await btn.innerText();
        const initialCount = parseInt(countText.trim(), 10);

        await btn.click();

        await expect(btn).toHaveText(String(initialCount + 1));
    }
}
