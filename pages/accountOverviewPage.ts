import { Page } from '@playwright/test';

export class AccountOverviewPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('/parabank/overview.htm');
    }

    async getAccountBalance(accountNumber: string): Promise<number> {
        const balanceText = (await this.page.locator(`xpath=//a[text()='${accountNumber}']/../following-sibling::td[1]`).innerText()).replace("$","");
        return parseFloat(balanceText.replace(/[^0-9.-]+/g, ''));
    }

    async getAllAccountNumbers(): Promise<string[]> {
        const accountLinks = this.page.locator('table#accountTable tbody tr td a');
        const count = await accountLinks.count();
        const accounts = [];
        for (let i = 0; i < count; i++) {
            accounts.push(await accountLinks.nth(i).innerText());
        }
        return accounts;
    }
}