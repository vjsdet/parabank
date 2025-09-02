import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async login(username: string, password: string) {
        await this.page.goto('/index.htm');
        await this.page.fill('input[name="username"]', username);
        await this.page.fill('input[name="password"]', password);
        await this.page.click('input[value="Log In"]');
    }

    async isLoginSuccessful() {
        return this.page.locator('text=Accounts Overview').isVisible();
    }
}