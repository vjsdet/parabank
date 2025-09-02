import { Page } from '@playwright/test';

export class FundsTransferPage {
    constructor(private page: Page) {}

    async transferFunds(fromAccount: string, toAccount: string, amount: number) {
        await this.page.goto('/parabank/transfer.htm');
        await this.page.selectOption('select#fromAccountId', fromAccount);
        await this.page.selectOption('select#toAccountId', toAccount);
        await this.page.fill('#amount', amount.toString());
        await this.page.click('input[value="Transfer"]');
        await this.page.waitForSelector('#showResult>h1');
    }

    async isTransferSuccessful(): Promise<boolean> {
        return this.page.locator('text=Transfer Complete!').isVisible();
    }
}