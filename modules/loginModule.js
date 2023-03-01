//import { Page } from 'playwright';
import { expect, Locator, Page } from '@playwright/test';
//const {LoginPage} = require('../pages/loginPage');
import { LoginPage } from '../pages/loginPage'
const loginPage = new LoginPage(Page)

exports.LoginModule = class LoginModule {

    constructor(page) {
        this.page = page;
    }
    async gotoLoginPage(){
        await this.page.goto('http://localhost:4516');
    }

    async login(username, password) {
        await loginPage.userNameInputBox.fill(username);
        await loginPage.userNamePassword.fill(password);
        await loginPage.submitButton.click();
    }

    async logout() {
        // loginPage.getAvatarButton().click()
        // loginPage.getLogout().click()
    }

}