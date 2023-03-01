import { expect, Locator, Page } from '@playwright/test';

exports.CIExplorerSideBarPage = class CIExplorerSideBarPage {
    constructor(page) {
        this.page = page;
        this.iconBack = page.locator('.icon-back');
        this.iconSettings = page.locator('.icon-settings');
        this.iconTree = page.locator('.icon-tree');
        this.menuSettings = page.locator('.settings > span:nth-child(2)');
        this.linkUserManagement = page.locator('text="User management"').first();
        this.tableAdminUserRow = page.locator('tr:has-text("admin")');
        this.linkUsers = page.locator('text="Users"').first();
        this.linkFeatures = page.locator('text="Features"').first();
        this.titleStitch = page.locator("h6.MuiTypography-root")
        this.listGitOps = page.locator("li.MuiButtonBase-root:nth-child(6) > span:nth-child(1) > p:nth-child(2)")
        this.listLocalSources = page.locator('li.MuiButtonBase-root:nth-child(7) > span:nth-child(1) > p:nth-child(2)')
        this.listRulesAndMacros = page.locator('li.MuiButtonBase-root:nth-child(5) > span:nth-child(1) > p:nth-child(2)')
    }

    async getIconBack() {
        await this.iconBack.click()
    }

    async getIconSettings() {
        await this.iconSettings.click()
    }

    async getIconTree() {
        await this.iconTree.click()
    }

    async getMenuSettings() {
        await this.menuSettings.click()
    }

    async getUserManagement() {
        await this.linkUserManagement.click()
    }

    async getUsers() {
        await this.linkUsers.click()
    }

    async getFeatures() {
        await this.linkFeatures.click()
    }

    async getAdminUserNoDeleteOption() {
        const adminRow =  await this.tableAdminUserRow
        const adminRowTexts = await adminRow.locator(':scope').allInnerTexts()
        expect(adminRowTexts).not.toContain('Delete');
    }

    async getTitleStitch() {
        const stitchElement = await this.titleStitch
        const textContent = await stitchElement.textContent();
        return textContent
    }

    async getListGitOps() {
        const listGitOpsElement = await this.listGitOps
        const textContent = await listGitOpsElement.textContent();
        return textContent
    }

    async getListLocalSources() {
        const listLocalSourcesElement = await this.listLocalSources
        const textContent = await listLocalSourcesElement.textContent();
        return textContent
    }

    async getListRulesAndMacros() {
        const listRulesAndMacrosElement = await this.listRulesAndMacros
        const textContent = await listRulesAndMacrosElement.textContent();
        return textContent
    }


}