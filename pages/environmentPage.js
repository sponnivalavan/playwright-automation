import { expect, Locator, Page } from '@playwright/test';

exports.EnvironmentPage = class EnvironmentPage {
    constructor(page) {
        this.page = page;
        this.linkEnvironment = page.getByText('Environments').nth(1)
        this.linkNewEnvironment = page.getByRole('link', { name: 'New' })
        this.linkChooseEnvironment = page.getByRole('link', { name: 'Environment' })
        this.inputEnvName = page.locator('input[name="name"]');
        this.inputChooseInfra = page.locator('.xl-react-autocomplete-wrapper .with-search input[type="text"] ').first()
        this.buttonSaveAndClose = page.getByRole('button', { name: 'Save and close' })
        this.popupMessageSuccess = page.getByRole('button', { name: 'toast' });

    }

    async createEnvironment(envName, infraName) {
        await this.linkEnvironment.click()
        await this.page.locator('div:nth-child(3) > .infinite-tree-node > i:nth-child(4)').click();
        await this.linkNewEnvironment.click();
        await this.linkChooseEnvironment.click();
        await this.inputEnvName.click();
        await this.inputEnvName.fill(envName)
        await this.inputChooseInfra.fill('Infrastructure/'+ infraName)
        await this.page.locator('.yt-option > span:nth-child(1) > div:nth-child(1) > strong:nth-child(1)').click()
        await this.buttonSaveAndClose.click()
        await this.popupMessageSuccess.click();
    }
}