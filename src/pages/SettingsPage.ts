import { BasePage } from "@pages/BasePage";
import { type Page, type Locator } from "@playwright/test";

export class SettingsPage extends BasePage{
    private readonly notificationsCheckbox: Locator;
    private readonly saveButton: Locator;
    private readonly successMessage: Locator;

    constructor(page:Page){
        // We point to our new dummy HTML file
        super(page,'/settings.html');

        this.notificationsCheckbox=page.getByLabel('Enable Notifications');
        this.saveButton=page.getByRole('button', {name:'Save Changes'});
        this.successMessage=page.locator('#message');
    }

    async toggleNotifications(){
        // Check the box if it isn't already checked
        if(!await this.notificationsCheckbox.isChecked()){
            await this.notificationsCheckbox.check();
        }
    }

    async save(){
        await this.saveButton.click();
    }

    async getSuccessText(): Promise<String>{
        await this.successMessage.waitFor({state:'visible'});
        return (await this.successMessage.textContent() || '');
    }
}