import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/loginPage"
import { CIExplorerSideBarPage } from "../pages/ciExplorerSideBarPage"
import { SettingsPage } from "../pages/settingsPage"
import { UserManagementPage } from "../pages/userManagementPage"
import { ApplicationsPage} from "../pages/applicationsPage";
import { InfrastructurePage } from "../pages/infrastructurePage";
import { EnvironmentPage } from "../pages/environmentPage"
import { DeployApplicationPage } from "../pages/deployApplicationPage"

test.describe('Maintenance Release Test Suite', () => {
    test.beforeEach(async ({ page }) => {
        const Login = new LoginPage(page)
        await Login.gotoLoginPage(process.env.HOSTNAME)
        await Login.login(process.env.UNAME,process.env.PWD)
    });

    test('Verify login screen customization with message', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)

        // Verify the login page does not display any message by default
        expect(Login.getAuthMessage(), '');

        // Navigate to Settings page and add login screen message
        await CIExplorerSideBar.getIconSettings()
        await CIExplorerSideBar.getMenuSettings()
        await Settings.addTextAreaLoginScreenMessage('welcome to digital.ai')

        // Logout and login to verify if the message is displayed
        await Login.logout();
        expect(Login.getAuthMessage(), 'welcome to digital.ai');

        //Login and remove the message from settings. Verify message is not displayed in login page.
        await Login.login(process.env.UNAME,process.env.PWD)
        await CIExplorerSideBar.getIconSettings()
        await CIExplorerSideBar.getMenuSettings()
        await Settings.removeTextAreaLoginScreenMessage()
        await Login.logout();
        expect(Login.getAuthMessage(), '');
    });

    test('Verify that admin user can not delete admin user', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)

        // Navigate to user management page and verify that no delete option for admin user
        await CIExplorerSideBar.getIconBack();
        await CIExplorerSideBar.getUserManagement();
        await CIExplorerSideBar.getUsers();
        await CIExplorerSideBar.getAdminUserNoDeleteOption()
    });

    test('Verify is stitch section is displayed', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        await CIExplorerSideBar.getIconBack();

        // Verify if stitch available by admin in default
        const stitchText = await CIExplorerSideBar.getTitleStitch()
        expect(stitchText).toBe( 'Stitch');

        // Verify if gitops is available
        const gitOpsText = await CIExplorerSideBar.getListGitOps()
        expect(gitOpsText).toBe( 'GitOps');

        // Verify if Local sources is available
        const localSourcesText = await CIExplorerSideBar.getListLocalSources()
        expect(localSourcesText).toBe( 'Local sources');

        // Verify rules and macros is available
        const rulesAndMacrosText = await CIExplorerSideBar.getListRulesAndMacros()
        expect(rulesAndMacrosText).toBe( 'Rules and Macros');
    });

    test('Verify Features is present in settings tab', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)

        // Navigate to Settings and verify Features tab available
        await CIExplorerSideBar.getIconSettings()
        await CIExplorerSideBar.getMenuSettings()
        await CIExplorerSideBar.getFeatures()

        // Verify Analytics and guidance is enabled by default.
        const isEnabled = await Settings.checkAnalyticsGuidance()
        expect(isEnabled.toString()).toBe("true");
    });

    test('Validate settings tab for deploy', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)

        // Navigate to Settings and verify Features tab available
        await CIExplorerSideBar.getIconSettings()
        await CIExplorerSideBar.getMenuSettings()

        // Change the header color to yellow
        await Settings.getTextColor()
        await Settings.getSelectColor()

        // Provide a Instance Name e.g. xld_prod and hit save
        await Settings.getInputInstanceName('xld_prod')
        const labelHeaderText = await Settings.getLabelHeader()
        expect(labelHeaderText).toBe('xld_prod');

        //Revert to Default
        await Settings.getDefaultValues()
    });

    test('Verify Logo file is displayed in settings tab', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)

        // Navigate to Settings page, check save button disabled and digital ai image logo displayed
        await CIExplorerSideBar.getIconSettings()
        await CIExplorerSideBar.getMenuSettings()
        const saveButtonDisabled = await Settings.getButtonSaveCheckDisabled()
        expect(saveButtonDisabled.toString()).toBe("true");
        const logoDigitalAiVisible = await Settings.getDigitalAiLogo()
        expect(logoDigitalAiVisible.toString()).toBe("true");

        // New logo file to be uploaded and displayed
        const filepath = "utility/images/test1.jpg"
        await Settings.fileUpload(filepath)

        //Revert to Default
        //await Settings.fileUploadRemove(filepath)
    });

    test('Verify Pendo toggle for user profile', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)

        // Navigate to Settings and verify Features tab available
        await CIExplorerSideBar.getIconSettings()
        await CIExplorerSideBar.getMenuSettings()
        await CIExplorerSideBar.getFeatures()

        // Verify Allow users to opt-out option is available and disabled by default
        await Settings.getCheckAllowusersOptOut()

        // Verify help link near product analytics and guidance takes to documentation page of xl-deploy on click.
        await Login.buttonAvatar.click()
        await Settings.linkUserProfile.click()
        const productAnyalticsGuidanceText = await Settings.titleProductAnalyticsGuidance.textContent()
        expect(productAnyalticsGuidanceText).toBe('Product analytics and guidance');
        const isEnabled = await Settings.checkAnalyticsGuidance()
        expect(isEnabled.toString()).toBe("true");

        // Revert back to original settings
        await CIExplorerSideBar.getIconSettings()
        await CIExplorerSideBar.getMenuSettings()
        await CIExplorerSideBar.getFeatures()
        await Settings.getCheckAllowusersOptOut()
    });

    test('Verify list displayed in settings icons perform actions as expected', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)

        // Click on settings in top right corner and verify below list is displayed
        await CIExplorerSideBar.getIconSettings()
        const menuSettingsText = await Settings.menuSettings.textContent()
        expect(menuSettingsText).toBe('Settings')
        const menuSettingsRenewLicenseText = await Settings.menuSettingsRenewLicense.textContent()
        expect(menuSettingsRenewLicenseText).toBe('Renew license')
        const menuSettingsViewAsText = await Settings.menuSettingsViewAs.textContent()
        expect(menuSettingsViewAsText).toBe('View as')
        const menuSettingsMaintenanceModeText = await Settings.menuSettingsMaintenanceMode.textContent()
        expect(menuSettingsMaintenanceModeText).toBe('Maintenance mode')
        const menuSettingsAboutText = await Settings.menuSettingsAbout.textContent()
        expect(menuSettingsAboutText).toBe('About')
        const menuSettingsSysInfoText = await Settings.menuSettingsSysInfo.textContent()
        expect(menuSettingsSysInfoText).toBe('System information')

        // Verify if about and system information displays information as expected
        await Settings.linkAbout.click()
        const popupAboutTitleText = await Settings.popupTitleAbout.textContent()
        expect(popupAboutTitleText).toBe('About')
        await expect(Settings.popupAboutTextServerVersion).toContainText('Server version:')
        await Settings.popupIconCloseWindow.click()

        await CIExplorerSideBar.getIconSettings()
        await Settings.menuSettingsSysInfo.click()
        const popupSysInfoTitleText = await Settings.popupTitleSysInfo.textContent()
        expect(popupSysInfoTitleText).toBe('System information')
        await expect(Settings.popupTextSysInfo).toContainText('Deploy system information')
        await Settings.popupIconCloseWindow.click()

        // Check help link and docs page working
        await Settings.iconHelp.click()
        await expect(Settings.linkOnlineDoc).toHaveAttribute('href','https://docs.xebialabs.com');
    });

    test('Verify password strength criteria in GUI', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)
        const UserManagement = new UserManagementPage(page)

        // Login as admin and navigate to user management and create new user
        await CIExplorerSideBar.getIconBack();
        await CIExplorerSideBar.getUserManagement();
        await CIExplorerSideBar.getUsers();

        let username = UserManagement.generate_random_string(8)
        let rolename = UserManagement.generate_random_string(5)
        await UserManagement.addUser(username)
        await UserManagement.linkRoles.click()
        await UserManagement.addRoleToUser(username, rolename)
        await UserManagement.linkPermissions.click()
        await UserManagement.assignLoginAndReportPermissionsToRole(rolename)

        // Logout and login as created user
        await Login.logout()
        let password = username + "U1"
        console.log("password:" + password)
        await Login.login(username,password)

        // Login as admin and change password to the user
        await Login.logout()
        await Login.login(process.env.UNAME,process.env.PWD)
        console.log("admin user logged in :")
        await CIExplorerSideBar.getIconBack();
        await CIExplorerSideBar.getUserManagement();
        await CIExplorerSideBar.getUsers();
        await UserManagement.changePassword(username)

        // Verify user is able to login to GUI with new password
        await Login.logout()
        let password2 = username + "P2"
        console.log("password:" + password2)
        await Login.login(username,password2)
    });

    test('Verify that User with deploy_admin_read_only role shall have view permission for XLD', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)
        const UserManagement = new UserManagementPage(page)

        /// Create User, Role, Assign Role to user and give deploy permissions
        await CIExplorerSideBar.getIconBack();
        await CIExplorerSideBar.getUserManagement();
        await CIExplorerSideBar.getUsers();
        let username = UserManagement.generate_random_string(8)
        await UserManagement.addUser(username)
        await UserManagement.linkRoles.click()
        await UserManagement.assignDeployAdminReadRoleToUser(username)

        // Logout and login as created user
        await Login.logout()
        let password = username + "U1"
        console.log("password:" + password)
        await Login.login(username,password)

        //var checkAppPermissions = appModule.checkAppPermissions()

        // Relogin as admin and unassign the permissions
        await Login.logout()
        await Login.login(process.env.UNAME,process.env.PWD)
        console.log("admin user logged in :")
        await CIExplorerSideBar.getIconBack();
        await CIExplorerSideBar.getUserManagement();
        await UserManagement.linkRoles.click()
        await UserManagement.unAssignDeployAdminReadRoleToUser(username)
    });

    test('Applications:Create CMD application package', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)
        const UserManagement = new UserManagementPage(page)
        const Applications = new ApplicationsPage(page)

        // Create new application
        let appname = UserManagement.generate_random_string(5)
        await Applications.createApp(appname)

        // Create new deployment package inside the above created application
        let deppkgName = UserManagement.generate_random_string(5)
        await(Applications.createAppDepPkg(appname, deppkgName))

        // Create new multiple cmd type applications inside package
        let cmdName1 = UserManagement.generate_random_string(5)
        let cmd1 = "systeminfo"
        await(Applications.createAppCmd(appname, deppkgName, cmdName1 ,cmd1))
        let cmdName2 = UserManagement.generate_random_string(5)
        let cmd2 = "dir"
        await(Applications.createAppCmd(appname, deppkgName, cmdName2 ,cmd2))
    });

    test.only('Deployment:Update deployment and verify the task', async ({ page }) => {
        const Login = new LoginPage(page);
        const CIExplorerSideBar = new CIExplorerSideBarPage(page)
        const Settings = new SettingsPage(page)
        const UserManagement = new UserManagementPage(page)
        const Applications = new ApplicationsPage(page)
        const Infrastructure = new InfrastructurePage(page)
        const Environment = new EnvironmentPage(page)
        const DeployApplication = new DeployApplicationPage(page)

        // Create localhost in infrastructure ci
        let infraName = UserManagement.generate_random_string(5)
        await(Infrastructure.createInfra(infraName))
        console.log("infra:"+infraName)

        // Create an environment for above created localhost
        let envName = UserManagement.generate_random_string(5)
        await(Environment.createEnvironment(envName,infraName))
        console.log("env:"+envName)

        // Create application packages
        let appname = UserManagement.generate_random_string(5)
        await Applications.createApp(appname)
        console.log("app:"+appname)
        let deppkgName = UserManagement.generate_random_string(5)
        await(Applications.createAppDepPkg(appname, deppkgName))
        let cmdName1 = UserManagement.generate_random_string(5)
        let cmd1 = "systeminfo"
        await(Applications.createAppCmd(appname, deppkgName, cmdName1 ,cmd1))

        let deppkgUpgradeName = UserManagement.generate_random_string(5)
        await(Applications.createAppDepPkgUpgrade(appname, deppkgUpgradeName))
        let cmdName2 = UserManagement.generate_random_string(5)
        let cmd2 = "dir"
        await(Applications.createAppCmdExeForUpgrade(appname, deppkgUpgradeName, cmdName2 ,cmd2))

        // Rollback Application
        await(DeployApplication.rollbackApplication(appname, deppkgName, envName))

        // Deploy Application
        await(DeployApplication.deployApplication(appname, envName, deppkgName))

        // Upgrade Application
        await(DeployApplication.upgradeApplication(appname, envName, deppkgUpgradeName, deppkgName))
    });
})
