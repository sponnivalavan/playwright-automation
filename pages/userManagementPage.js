import { expect, Locator, Page } from '@playwright/test';

exports.UserManagementPage = class UserManagementPage {
    constructor(page) {
        this.page = page;
        this.buttonAddUser = page.getByRole('button', { name: 'Add user' });
        this.buttonSave = page.getByRole('button', { name: 'Save' });
        this.inputUserName = page.locator('input[name="username"]')
        this.inputPassword = page.locator('input[name="password"]')
        this.inputConfirmPassword = page.locator('input[name="confirmPassword"]')
        this.linkRoles = page.getByTestId('sideNav-item-1')
        this.buttonAddRole = page.getByRole('button', { name: 'Add role' })
        this.inputRoleName = page.locator('input[name="name"]')
        this.inputUserToRole = page.locator('div').filter({ hasText: 'PrincipalsType in names for principals.' }).getByRole('textbox').nth(1)
        this.popupButtonAddRole = page.getByRole('button', { name: 'Add' });
        this.linkPermissions = page.getByTestId('sideNav-item-2');
        this.popupMessageSuccess = page.getByRole('button', { name: 'toast' });
        this.linkRemoveUserFromDefaultRole = page.locator('.react-tagsinput-remove')
    }

    async addUser(username) {
        await this.buttonAddUser.click()
        await this.buttonSave.isDisabled()
        await this.inputUserName.fill(username)
        await this.inputUserName.press('Tab');
        let password = username + "U1"
        await this.inputPassword.fill(password)
        await this.inputPassword.press('Tab')
        await this.inputConfirmPassword.fill(password)
        await this.buttonSave.click()
        await this.popupMessageSuccess.click()
        return username
    }

    async addRoleToUser(username, rolename) {
        await this.buttonAddRole.click()
        await this.inputRoleName.fill(rolename)
        await this.inputRoleName.press('Tab');
        await this.inputUserToRole.fill(username)
        await this.popupButtonAddRole.click()
        await this.buttonSave.click()
        await this.popupMessageSuccess.click()
    }

    async assignLoginAndReportPermissionsToRole(roleName) {
        for (let i = 4; i <= 5; i++) {
            await this.page.locator(`.permissions-pagination-table-component-${roleName}-${i} > input:nth-child(1)`).check()
        }
        await this.buttonSave.click()
    }

    async assignDeployAdminReadRoleToUser(username) {
        const idLocator = await this.page.locator('td:nth-child(1)', { hasText: 'deploy_admin_read_only' });
        const editLink = await this.page.locator('table tbody tr', { has: idLocator }).locator('button[class="edit table-action"]')
        await editLink.click()
        await this.page.locator('div').filter({ hasText: 'PrincipalsType in names for principals.' }).getByRole('textbox').nth(1).fill(username);
        await this.popupButtonAddRole.click()
        await this.buttonSave.click()
        await this.popupMessageSuccess.click()
    }

    async unAssignDeployAdminReadRoleToUser(username) {
        const idLocator = await this.page.locator('td:nth-child(1)', { hasText: 'deploy_admin_read_only' });
        const editLink = await this.page.locator('table tbody tr', { has: idLocator }).locator('button[class="edit table-action"]')
        await editLink.click()
        await this.page.locator('form').filter({ hasText: 'Role*Provide a unique name for the role.Principals'+username+'Type in names for prin' }).locator('a').click();
        await this.buttonSave.click()
        await this.popupMessageSuccess.click()
    }

    async changePassword(username){
        const idLocator = await this.page.locator('td:nth-child(1)', { hasText: username });
        const editLink = await this.page.locator('table tbody tr', { has: idLocator }).locator('button[class="edit table-action"]')
        await editLink.click()
        let password = username + "P2"
        await this.inputPassword.fill(password)
        await this.inputConfirmPassword.fill(password)
        await this.buttonSave.click()
    }

    generate_random_string(string_length) {
        let random_string = '';
        let random_ascii;
        for (let i = 0; i < string_length; i++) {
            random_ascii = Math.floor((Math.random() * 25) + 97);
            random_string += String.fromCharCode(random_ascii)
        }
        return random_string
    }

}