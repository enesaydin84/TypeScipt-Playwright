import { test, expect } from '../../src/fixtures/page.fixtures';
// Or if you want to use the alias:
// import { test, expect } from '@fixtures/page.fixtures';

test.describe('Authentication Scenario', () => {

    test('should reject login with invalid credentials', async ({ loginPage }) => {
        // 1. ARRANGE
        // The fixture has already created 'loginPage' for us.
        // We just need to go there.
        await loginPage.goto();

        // 2. ACT
        // We perform the business logic using the exposed method.
        await loginPage.login('invalid_user@test.com', 'WrongPass123');

        // 3. ASSERT
        // We verify the outcome.
        const errorText = await loginPage.getErrorMessage();
        
        // Note: In a real app, you'd match the actual error text.
        // For this template, we just check if any error appeared.
        console.log(`Error message received: ${errorText}`);
        expect(errorText).toBeTruthy(); 
    });

    /**
     * An example of how easy it is to add a second test
     * without duplicating setup code.
     */
    test('should validate page title', async ({ loginPage }) => {
        await loginPage.goto();
        const title = await loginPage.getTitle();
        expect(title).toContain('Login'); 
    });

});