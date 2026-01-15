import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SettingsPage } from '@pages/SettingsPage';

// 1. Declare the Types of your fixtures
// If you add a 'CheckoutPage' later, you just add it to this list.
type MyFixtures = {
    loginPage: LoginPage;
    settingsPage: SettingsPage;
    // checkoutPage: CheckoutPage;
};

// 2. Extend the base test to include your POMs
export const test = base.extend<MyFixtures>({
    
    // We define 'loginPage' as a fixture
    loginPage: async ({ page }, use) => {
        // Set up the fixture (Arrange)
        const loginPage = new LoginPage(page);
        
        // Pass it to the test (Act)
        await use(loginPage);
        
        // Teardown logic goes here (if needed) - e.g., cleaning cookies
    },

    settingsPage: async ({ page }, use) => {
        // Set up the fixture (Arrange)
        const settingsPage = new SettingsPage(page);
        
        // Pass it to the test (Act)
        await use(settingsPage);
        
        // Teardown logic goes here (if needed) - e.g., cleaning cookies
    },

});

// 3. Export 'expect' so we don't have to import it from @playwright/test in every file
export { expect } from '@playwright/test';