import { expect, Locator, Page } from '@playwright/test';

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.inputBoxUserName = page.locator('input[name="username"]');
        this.inputBoxPassword = page.locator('input[name="password"]');
        this.buttonSubmit = page.locator('button[type="submit"]');
        this.authMessage = page.locator('.auth-message')
        this.buttonAvatar = page.locator('span.dot-typography')
        this.buttonLogout = page.locator('.logOut > span:nth-child(2)')
    }

    async gotoLoginPage(url){
        await this.page.goto(url);
    }

    async login(username, password) {
        await this.inputBoxUserName.fill(username);
        await this.inputBoxPassword.fill(password);
        await this.buttonSubmit.click();
    }

    async logout() {
        await this.buttonAvatar.click()
        await this.buttonLogout.click()
    }

    async getAuthMessage() {
        await this.authMessage
    }


}