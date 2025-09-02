import { Page } from '@playwright/test';

export class OpenAccountPage {
    constructor(private page: Page) {}

    async createSavingsAccount() {
        await this.page.goto('/parabank/openaccount.htm');
        await this.page.waitForTimeout(3000);
        await this.page.waitForSelector('#type');
        await this.page.selectOption('#type', 'SAVINGS');
        await this.page.evaluate(() => (document.querySelector('input[value="Open New Account"]') as HTMLInputElement | null)?.click());
        await this.page.waitForSelector('text=Account Opened!');
        return this.page.locator('#newAccountId').innerText();
    }
}