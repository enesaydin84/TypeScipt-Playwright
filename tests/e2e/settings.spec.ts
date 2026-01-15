import {test,expect} from '@fixtures/page.fixtures';


test('should allow users to save preferences', async ({settingsPage}) => {
    // 1. Go to the page (fixture handles the 'new SettingsPage' logic)
    await settingsPage.goto();

    // 2. Perform actions
    await settingsPage.toggleNotifications();
    await settingsPage.save();

    // 3. Verify result
    const message= await settingsPage.getSuccessText();
    expect(message).toBe('Settings Saved!');
});