import { BasePage } from '@pages/BasePage';
import { type Page, type Locator } from '@playwright/test';

export class LoginPage extends BasePage {
    /**
     * ENCAPSULATION:
     * We make locators 'private'. 
     * Tests should NEVER access these directly (e.g., loginPage.emailInput.fill...).
     * This prevents tests from breaking if you change a selector ID.
     */
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        // INHERITANCE: Pass the 'page' and the specific URL to the BasePage
        super(page, '/index.html');

        // Initialize Locators
        // We use user-facing attributes (Role, Placeholder) for better resilience
        this.emailInput = page.getByLabel('Email Address');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Sign In' });
        this.errorMessage = page.locator('.alert-error');
    }

    /**
     * ABSTRACTION:
     * This method exposes a high-level business action.
     * The test says "Login", it doesn't care about the 3 steps required to do it.
     */
    async login(user: string, pass: string) {
        await this.emailInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    /**
     * UPDATED METHOD
     * Now waits for the element to become visible before grabbing text.
     */
    async getErrorMessage(): Promise<string | null> {
        try {
            // Wait up to 5 seconds for the error to appear (handling the 500ms delay)
            await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
            return await this.errorMessage.textContent();
        } catch  {
            // If it never appears, return null
            return null;
        }
    }
}