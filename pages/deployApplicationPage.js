import { expect, Locator, Page } from '@playwright/test';

exports.DeployApplicationPage = class DeployApplicationPage {
    constructor(page) {
        this.page = page;
        this.buttonContinue = page.getByRole('button', { name: 'Continue' })
        this.buttonDeploy = page.getByRole('button', { name: 'Deploy' }).nth(1)
        this.buttonRollback = page.getByRole('button', { name: 'Rollback' }).first()
        this.buttonSaveAndClose = page.getByRole('button', { name: 'Save and close' })
        this.popupButtonYes = page.getByRole('button', { name: 'Yes' });
        this.buttonFinish = page.getByRole('button', { name: 'Finish' });
        this.popupMessageSuccess = page.getByRole('button', { name: 'toast' });
    }

    async rollbackApplication(appname, depPkg, envname ) {
        await this.page.getByTitle('Applications/' + appname + '/' + depPkg).click();
        await this.page.getByTitle('Applications/' + appname + '/' + depPkg, { exact: true }).locator('i').nth(1).click();
        await this.page.getByRole('link', { name: 'Deploy', exact: true }).click();
        await this.page.getByLabel(envname+'Environments/'+envname).check();
        await this.buttonContinue.click();
        await this.buttonDeploy.click();
        await this.page.waitForSelector('button:text("Rollback")', { visible: true, clickable: true });
        await this.buttonRollback.click();
        await this.popupButtonYes.click();
        await this.buttonFinish.click();
    }

    async deployApplication(appname, envname, deppkgName ) {
        await this.page.getByTitle('Applications/' + appname + '/' + deppkgName).click();
        await this.page.getByTitle('Applications/' + appname + '/' + deppkgName, { exact: true }).locator('i').nth(1).click();
        await this.page.getByRole('link', { name: 'Deploy', exact: true }).click();
        await this.page.getByLabel(envname+'Environments/'+envname).check();
        await this.buttonContinue.click();
        await this.buttonDeploy.click();
        await this.buttonFinish.click();
    }

    async upgradeApplication(appname, envname, deppkgNameToUpgrade, deppkgNameInstalled ) {
        await this.page.getByTitle('Applications/' + appname + '/' + deppkgNameToUpgrade).click();
        await this.page.getByTitle('Applications/' + appname + '/' + deppkgNameToUpgrade, { exact: true }).locator('i').nth(1).click();
        await this.page.getByRole('link', { name: 'Deploy', exact: true }).click();
        await this.page.getByLabel("Environments/"+envname+' (currently deployed: '+deppkgNameInstalled+')').check();
        await this.buttonContinue.click();
        await this.buttonDeploy.click();
        await this.buttonFinish.click();
    }
}