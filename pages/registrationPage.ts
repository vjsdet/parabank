import { Page } from '@playwright/test';

export class RegistrationPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('/parabank/register.htm');        
    }

    async registerNewUser(username: string, password: string) {
        await this.page.fill("input[id$='firstName']", 'Vijay');
        await this.page.fill("input[id$='lastName']", 'Lachwani');
        await this.page.fill("input[id$='street']", '123 Street');
        await this.page.fill("input[id$='city']", 'Delhi');
        await this.page.fill("input[id$='state']", 'Delhi');
        await this.page.fill("input[id$='zipCode']", '110001');
        await this.page.fill("input[id$='phoneNumber']", '9876543210');
        await this.page.fill("input[id$='ssn']", '123-45-6789');
        await this.page.fill("input[id$='username']", username);
        await this.page.fill("input[id$='password']", password);
        await this.page.fill("input[id$='repeatedPassword']", password);
        await this.page.click('input[value="Register"]');
    }

    async isRegistrationSuccessful() {
        await this.page.waitForSelector('#rightPanel>h1.title');
        return this.page.locator('text=Your account was created successfully. You are now logged in.').isVisible();
    }
}