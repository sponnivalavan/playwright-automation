import { expect, Locator, Page } from '@playwright/test';

exports.ApplicationsPage = class ApplicationsPage {
    constructor(page) {
        this.page = page;
        this.linkNew = page.getByRole('link', { name: 'New' }).click();
        this.linkApplication = page.getByRole('link', { name: 'Application' });
        this.inputAppName = page.locator('input[name="name"]');
        this.buttonSaveAndClose = page.getByRole('button', { name: 'Save and close' })
        this.linkAppDepPkg = page.getByRole('link', { name: 'Deployment Package' })
        this.popupMessageSuccess = page.getByRole('button', { name: 'toast' });
        this.textDepPkg = page.getByText('deppkg1')
        this.linkCommand = page.getByRole('link', { name: 'Command' })
        this.textAreaCommand= page.locator('textarea[name="commandLine"]')
    }

    async createApp(appname) {
        // Create Application
        await this.page.getByTestId('primaryNav').getByText('Applications').nth(1).click();
        await this.page.locator('div.infinite-tree-item:nth-child(2) > div:nth-child(1) > i:nth-child(4)').click()
        await this.page.locator('.new > a:nth-child(1) > span:nth-child(2)').click()
        await this.linkApplication.click()
        await this.inputAppName.fill(appname)
        await this.buttonSaveAndClose.click()
        await this.popupMessageSuccess.click()
    }

    async createAppDepPkg(appname, deppkgname) {
        await this.page.locator('div.infinite-tree-item:nth-child(2) > div:nth-child(1) > a:nth-child(1)').click()
        await this.page.getByTitle('Applications/' + appname).locator('a').click();
        await this.page.getByTitle('Applications/' + appname).locator('i').nth(1).click();
        await this.page.locator('.new > a:nth-child(1) > span:nth-child(2)').click()
        await this.page.locator('.deploymentPackage > span:nth-child(2)').click()
        await this.inputAppName.fill(deppkgname)
        await this.buttonSaveAndClose.click()
        await this.popupMessageSuccess.click()
    }

    async createAppDepPkgUpgrade(appname, deppkgUpgradeName) {
        //await this.page.locator('div.infinite-tree-item:nth-child(2) > div:nth-child(1) > a:nth-child(1)').click()
        await this.page.getByTestId('primaryNav').getByText('Applications').nth(1).click();
        await this.page.getByTitle('Applications/' + appname).locator('a').first().click();
        await this.page.getByTitle('Applications/' + appname).locator('i').nth(1).click();
        await this.page.locator('.new > a:nth-child(1) > span:nth-child(2)').click()
        await this.page.locator('.deploymentPackage > span:nth-child(2)').click()
        await this.inputAppName.fill(deppkgUpgradeName)
        await this.buttonSaveAndClose.click()
        await this.popupMessageSuccess.click()
    }

    async createAppCmd(appname, depPkg, cmdname, cmd) {
        await this.page.getByTitle('Applications/' + appname + '/' + depPkg).click();
        await this.page.getByTitle('Applications/' + appname + '/' + depPkg, { exact: true }).locator('i').nth(1).click();
        await this.page.locator('.new > a:nth-child(1) > span:nth-child(2)').click()
        await this.page.locator('.cmd > a:nth-child(1) > span:nth-child(2)').click()
        await this.page.locator('.command > span:nth-child(2)').click()
        await this.inputAppName.fill(cmdname)
        await this.textAreaCommand.fill(cmd)
        await this.buttonSaveAndClose.click()
        await this.popupMessageSuccess.click()
    }

    async createAppCmdExeForUpgrade(appname, depPkg, cmdname, cmd) {
        await this.page.locator('.infinite-tree-selected > .infinite-tree-node > .infinite-tree-toggler').click()
        await this.page.getByTitle('Applications/' + appname + '/' + depPkg).click();
        await this.page.getByTitle('Applications/' + appname + '/' + depPkg, { exact: true }).locator('i').nth(1).click();
        await this.page.locator('.new > a:nth-child(1) > span:nth-child(2)').click()
        await this.page.locator('.cmd > a:nth-child(1) > span:nth-child(2)').click()
        await this.page.locator('.command > span:nth-child(2)').click()
        await this.inputAppName.fill(cmdname)
        await this.textAreaCommand.fill(cmd)
        await this.buttonSaveAndClose.click()
        await this.popupMessageSuccess.click()
    }

}