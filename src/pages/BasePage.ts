import { type Page, type Locator, type Response } from '@playwright/test';

/**
 * Abstract Class: BasePage
 * Purpose: 
 * - Encapsulates the Playwright 'Page' object (Composition).
 * - Defines shared behavior for ALL pages (Inheritance).
 * - Prevents code duplication (DRY Principle).
 */
export abstract class BasePage {
    // We expose the page as public read-only so tests can verify URL/Title 
    // without the Page Object having to wrap every single assertion.
    public readonly page: Page;
    
    // The relative URL for this specific page (e.g., '/login')
    protected readonly url: string;

    constructor(page: Page, url: string = '/') {
        this.page = page;
        this.url = url;
    }

    /**
     * Navigates to the page's defined URL.
     * Uses the baseURL defined in playwright.config.ts
     */
    async goto(): Promise<Response | null> {
        return await this.page.goto(this.url);
    }

    /**
     * A unified wait method. 
     * Good for stability when pure Playwright auto-waiting isn't enough.
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Wrapper to verify we are actually on this page.
     * Useful for assertions in tests.
     */
    async waitForUrl() {
        // Matches the URL, allowing for query parameters
        await this.page.waitForURL(`**${this.url}**`);
    }

    /**
     * Example of a shared utility: getting the page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}