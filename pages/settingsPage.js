import { expect, Locator, Page } from '@playwright/test';

exports.SettingsPage = class SettingsPage {
    constructor(page) {
        this.page = page;
        this.textAreaLoginScreenMessage = page.locator('textarea[name=\"loginScreenMessage\"]')
        this.buttonSave = page.getByRole('button', { name: 'Save' });
        this.checkBoxAnalyticalGuidance = page.locator('div.xl-react-dip-dynamic-form-element:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)')
        this.textColor = page.getByRole('group', { name: 'Instance customization' }).locator('span div')
        this.selectColor = page.locator('.popover-content > div:nth-child(4)');
        this.inputInstanceName = page.locator('input[name="instanceName"]');
        this.labelHeader = page.locator('div.instance-name:nth-child(1) > label:nth-child(1)')
        this.selectColorDefault = page.locator('.popover-content > div').first();
        this.inputInstanceNameDefault = page.getByRole('group', { name: 'Instance customization' }).locator('i').first();
        this.logoDigitalAi = page.getByTestId('primary-logo')
        this.checkAllowUsersOptOut = page.locator('div.xl-react-dip-dynamic-form-element:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)')
        this.linkUserProfile = page.locator('.userProfile > span:nth-child(2)')
        this.titleProductAnalyticsGuidance = page.locator('.pendo-header-title')
        this.menuSettings = page.locator('.settings > span:nth-child(2)')
        this.menuSettingsAbout = page.locator('.about > span:nth-child(2)')
        this.menuSettingsMaintenanceMode = page.locator('.maintenanceMode > span:nth-child(2)')
        this.menuSettingsRenewLicense = page.locator('.renewLicense > span:nth-child(2)')
        this.menuSettingsSysInfo = page.locator('.systemInformation > span:nth-child(2)')
        this.menuSettingsViewAs = page.locator('.viewAs > span:nth-child(2)')
        this.linkAbout = page.locator('.about > span:nth-child(2)')
        this.popupTitleAbout = page.locator('span.title:nth-child(1)')
        this.popupAboutTextServerVersion = page.locator('.server-version')
        this.popupIconCloseWindow = page.locator('i.close-icon:nth-child(1)')
        this.popupTitleSysInfo = page.locator('span.title:nth-child(1)')
        this.popupTextSysInfo = page.locator('.statistics-title > h3:nth-child(1)')
        this.iconHelp = page.locator('.icon-help')
        this.linkOnlineDoc = page.locator('.onlineDocumentation')
    }

    async addTextAreaLoginScreenMessage(message) {
        await this.textAreaLoginScreenMessage.fill(message);
        await this.buttonSave.click();
    }

    async removeTextAreaLoginScreenMessage() {
        await this.textAreaLoginScreenMessage.fill('')
        await this.buttonSave.click();
    }

    async checkAnalyticsGuidance() {
        const checkBoxAnalyticsGuidance = await this.checkBoxAnalyticalGuidance
        const isEnabled = await checkBoxAnalyticsGuidance.isEnabled();
        return isEnabled
    }

    async getTextColor() {
        await this.textColor.click()
    }

    async getSelectColor() {
        await this.selectColor.click()
    }

    async getDefaultValues() {
        await this.textColor.click()
        await this.selectColorDefault.click()
        await this.inputInstanceNameDefault.click()
        await this.buttonSave.click()
    }

    async getInputInstanceName(message) {
        await this.inputInstanceName.fill(message)
        await this.buttonSave.click()
    }

    async getButtonSave(){
        await this.buttonSave.click()
    }

    async getButtonSaveCheckDisabled(){
        const buttonSaveCheck = await this.buttonSave
        const isDisabled = await buttonSaveCheck.isDisabled();
        return isDisabled

    }

    async getLabelHeader() {
        const labelHeaderElement = await this.labelHeader
        const textContent = await labelHeaderElement.textContent()
        return textContent
    }

    async getDigitalAiLogo() {
        const logoDigitalAi = await this.logoDigitalAi
        const isVisible = await logoDigitalAi.isVisible()
        return isVisible
    }

    async fileUpload(file) {
        await this.page.setInputFiles('input[name="ajax_upload_file_input"]', "utility/images/test1.jpg")
        await this.page.waitForSelector('button:has-text("Save")', { visible: true })
        await this.page.click('button:has-text("Save")', {timeout: 9000});
    }

    async fileUploadRemove(file) {
        //await this.page.locator('div').filter({ hasText: 'BrowseImport a logo (max size 1 MB)' }).locator('i').nth(3).click();
        //i.close-icon:nth-child(3)
        await this.page.locator('i.close-icon:nth-child(3)').click();
        await this.page.waitForSelector('button:has-text("Save")', { visible: true })
        await this.page.click('button:has-text("Save")', {timeout: 9000});
    }

    async getCheckAllowusersOptOut() {
        await this.checkAllowUsersOptOut.click()
        await this.buttonSave.click()
        await this.page.waitForTimeout(2000);
    }

}