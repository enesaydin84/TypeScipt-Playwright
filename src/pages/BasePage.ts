import { type Page, type Response } from '@playwright/test';

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

    /**
     * 1. Refresh the page.
     * Essential for: Resetting the UI state or recovering from a stuck loader.
     */
    async reload() {
        await this.page.reload({waitUntil:'domcontentloaded'});
    }

    /**
     * 2. Browser Navigation (Back/Forward).
     * Essential for: Testing browser history scenarios.
     */
    async goBack(){
        await this.page.goBack({waitUntil:'domcontentloaded'});
    }

    /**
     * 3. Take a Screenshot (On Demand).
     * Essential for: Custom reporting or capturing evidence at specific steps.
     * Note: Playwright does this automatically on failure, but sometimes you want it manually.
     */
    async takeScreenshot(name: string){
        await this.page.screenshot({path: `test-results/screenshots/${name}.png`});
    }

    /**
     * 4. Handle "Confirm" or "Alert" dialogs.
     * Essential for: Pages that pop up "Are you sure?" windows.
     * Usage: Call this BEFORE the action that triggers the alert.
     */
    async acceptDialog() {
        this.page.once('dialog', async (dialog) => {
            //console.log(`Accepted Dialog: ${dialog.message()}`);
            await dialog.accept();
        })
    }

    /**
     * 5. Global Keyboard Shortcuts.
     * Essential for: Closing modals (Escape) or submitting forms (Enter) globally.
     */
    async pressKey(key: 'Enter' | 'Escape' | 'Tab' | 'ArrowDown') {
        await this.page.keyboard.press(key);
    }
}