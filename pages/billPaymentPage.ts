import { Page } from '@playwright/test';

export class BillPaymentPage {
    constructor(private page: Page) {}

    async payBill(payeeName: string, account: number, amount: number, fromAccount: string) {
        await this.page.goto('/parabank/billpay.htm');
        await this.page.fill('input[name$="name"]', payeeName);
        await this.page.fill('input[name$="street"]', 'Street 1');
        await this.page.fill('input[name$="city"]', 'Delhi');
        await this.page.fill('input[name$="state"]', 'Delhi');
        await this.page.fill('input[name$="zipCode"]', '110001');
        await this.page.fill('input[name$="phoneNumber"]', '9876543210');
        await this.page.fill('input[name$="accountNumber"]', account.toString());
        await this.page.fill('input[name$="verifyAccount"]', account.toString());
        await this.page.fill('input[name="amount"]', amount.toString());
        await this.page.selectOption('select[name="fromAccountId"]', fromAccount);
        await this.page.click('input[value="Send Payment"]');
        await this.page.waitForSelector('#billpayResult>h1');
    }

    async isPaymentSuccessful() {
        return this.page.locator('text=Bill Payment Complete').isVisible();
    }
}