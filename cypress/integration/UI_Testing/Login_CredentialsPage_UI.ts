/**
 * This test suite is for PI01.1:: Automation scripts
 * Author - Jimish Shah (3981340)
 * Author - Girija (3981341)-->545049
 * Author - Manasa (3981328)-->545046,545048
 * Date- 01/13/2021
 */

/// <reference types ="cypress" />

// import all clasees which are required for this suite
import { LowerCasePipe } from '@angular/common'
import { LocalePathnameService } from '@fedex/caas/lib/module/common/locale/locale-pathname.service'
import AllReusableMethods from '../AllPageObjects/AllReusableMethods'
import LoginCredentialsPage from '../AllPageObjects/Login_CredentialsPage'


describe('PI-005- CIAM - Design & Develop Enter your user ID and password to log in Screen', function () {
    const arm = new AllReusableMethods()              // arm--> (A)ll (R)eusable (M)ethods
    const lcp = new LoginCredentialsPage()             //lcp-->logincredentialspage


    beforeEach(function () {            // this function will fetch the test data from fixture\testdata.json
        cy.fixture('testdata').then(function (data) {
            this.data = data;
        })
    })

    it('US#545046 :TC_001_Verify That - Verify that user navigates to "Enter your user ID and password to log in" Screen ', function () {

        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.pageTitle()
    })


    it('US#545048 :TC-001:Verify the "FORGOT YOUR USER ID OR PASSWORD?" Link is displayed on the Enter your user ID and password to log in page.', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.pageTitle()


    })

    it('US#545048 :TC-002:Verify User should navigate to "Forgot your password or user ID?" Screen to select RESET PASSWORD or RETRIEVE USER ID Method  When User click on the "FORGOT YOUR USER ID OR PASSWORD?" Link page.', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyForgotUserIdButton()
        lcp.clickForgotUserIdButton()
        arm.verifyPageUrl(this.data.loginSolutionsUrl)
    })

    it('US#545049 :TC-001:Verify the "CUSTOMER SUPPORT LINK"  below the Need help? verbiage is displayed on the Enter your user ID and password to log in page.', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyNeedHelpText()
        lcp.verifyCustomerSupportLink()

    })

    it('US#545049 : TC-002 : Verify the user navigated to new tab when clicks on "CUSTOMER SUPPORT LINK" on Enter your user ID and password to log in page.(for- US).', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyCustomerSupportLink()
        lcp.clickCustomerSupportLink()

    })

    it('US#545049 :TC-008:Verify the "CUSTOMER SUPPORT LINK"  below the Need help? verbiage is displayed on the Enter your user ID and password to log in page.', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyCustomerSupportLink()
    })

    it('US#545049 :TC-009:Verify the user navigated to new tab when clicks on "CUSTOMER SUPPORT LINK" on Enter your user ID and password to log in page.(for- US).', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyCustomerSupportLink()
        lcp.clickCustomerSupportLink()

    })

    it('US#545049 :TC-014:Verify that all links & buttons on the Enter your user ID and password to log in page is clickable.', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyCreateOneLink()
        lcp.clickCreateOneLink()
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyForgotUserIdButton()
        lcp.clickForgotUserIdButton()
        arm.verifyPageUrl(this.data.loginSolutionsUrl)
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyCustomerSupportLink()
        lcp.clickCustomerSupportLink()

    })

    it('US#545049 :TC-017:Verify that user is able to scroll the page UP/DOWN on Enter your user ID and password to log in page.', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        arm.scrollToTop()
        arm.scrollToBottom()
    })

    it('US#545047 :TC-01:Verify that user enter valid User id and password and click on "Remember me on this device" check box on "Enter your user ID and password to login" Screen.', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyUserID()
        lcp.enterUserID(this.data.UserID);
        lcp.enterPassword(this.data.Password);
        lcp.clickRememberMeCheckBox();
    })

    it('US#545047 :TC-02:Verify user can see Browser cookies Pre-Populate User id and Password If user already logged In.', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.enterUserID(this.data.UserID)
        lcp.enterPassword(this.data.Password)
        lcp.clickRememberMeCheckBox()
        lcp.clickLoginButton()
        arm.pageWait()
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyEnterUserIdValue(this.data.UserID)

    })
    it('D-35642 :TC-01:Verify that the ERROR message "Both user ID and password are required to log in." is aligned properly after removal of *', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.verifyPassword()
        lcp.enterUserID(this.data.UserID)
        lcp.VerifyUseridandPasswordError()
        
 
    })
    it('D-35642:TC-02:Verify that the ERROR message "Login incorrect. Either the user ID or password combination is incorrect or the account has been locked. Please try again or reset your password." is aligned properly after removal of *', function () {
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.enterUserID(this.data.UserIDWrong)
        lcp.enterPassword(this.data.PasswordWrong)
        lcp.clickLoginButton()
        lcp.VerifyLoginAlert() 
    })
    // it.only('B-566955:TC-01: Decouple 2FA. Verify user logged in and navigate to WLGN home page once user click on login button"', function () {
    //     lcp.pageLoad(this.data.releaseUrl)
    //     arm.pageWait()
    //     lcp.enterUserID(this.data.successUSERID)
    //     lcp.enterPassword(this.data.successPassword)
    //     lcp.clickLoginButton()
    //     arm.pageWait()
    //     if(this.data.isDecouple){
    //         arm.verifyPageUrl(this.data.homeUrl)
    //     }else{
    //         arm.verifyPageUrl(this.data.authenticateUrl)
    //     }
    // })
    it('Verify the Link of Customer Support Link after Navigating into Spanish Language', function () { 

        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        arm.LanguageDropDownClickForSpanish()
        arm.VerifyCustomerSupportESPLink(this.data.CustomerSupportESPUrl)
     
     })

     it('B-557713:TC-01: Verify refresh (Right click & F5)functionality of the browser on Login Credential Page.', function () {        
        lcp.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        lcp.enterUserID(this.data.userIdForEmail)
        lcp.enterPassword(this.data.PasswordWrong)
        arm.pageReload()
        arm.verifyPageUrl(this.data.releaseUrl)
        lcp.verifyEnterUserIdValue('')
        lcp.verifyPasswordValue('')       
    })

})

