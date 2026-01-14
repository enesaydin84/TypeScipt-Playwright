import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

// 1. Declare the Types of your fixtures
// If you add a 'CheckoutPage' later, you just add it to this list.
type MyFixtures = {
    loginPage: LoginPage;
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

});

// 3. Export 'expect' so we don't have to import it from @playwright/test in every file
export { expect } from '@playwright/test';