import { expect, Locator, Page } from '@playwright/test';

exports.InfrastructurePage = class InfrastructurePage {
    constructor(page) {
        this.page = page;
        this.textAreaLoginScreenMessage = page.locator('textarea[name=\"loginScreenMessage\"]')
        this.buttonSave = page.getByRole('button', { name: 'Save' });
        this.linkInfrastructure = page.getByText('Infrastructure').nth(1)
        this.inputInfraName = page.locator('input[name="name"]');
        this.linkNewInfra = page.getByRole('link', { name: 'New' })
        this.linkOverthereInfra = page.getByRole('link', { name: 'overthere' })
        this.linkLocalHostInfra = page.getByRole('link', { name: 'LocalHost' })
        this.selectWindowsOS = page.getByText('WINDOWS', { exact: true })
        this.inputOS = page.locator('.xl-react-autocomplete-wrapper .with-search input[type="text"] ').nth(1)
        this.buttonSaveAndClose = page.getByRole('button', { name: 'Save and close' })
        this.popupMessageSuccess = page.getByRole('button', { name: 'toast' });
    }

    async createInfra(infraName) {
        //await this.page.setViewportSize({ width: 1000, height: 1400 });
        await this.linkInfrastructure.click();
        await this.page.locator('div:nth-child(4) > .infinite-tree-node > i:nth-child(4)').click();
        await this.linkNewInfra.click();
        await this.linkOverthereInfra.click();
        await this.linkLocalHostInfra.click()
        await this.inputInfraName.fill(infraName);
        await this.inputOS.click()
        await this.selectWindowsOS.click()
        await this.page.waitForTimeout(2000);
        await this.buttonSaveAndClose.click()
        await this.page.waitForTimeout(2000);
        await this.popupMessageSuccess.click()
    }
}