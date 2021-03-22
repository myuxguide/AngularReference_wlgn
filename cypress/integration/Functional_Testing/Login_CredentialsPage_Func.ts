/**
 * This test suite is for PI01.1:: Automation scripts
 * Author - saiUmesh(3874289)
 * Date- 01/22/2021
 */

/// <reference types ="cypress" />

// import all clasees which are required for this suite

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
   it('B-545044: TC01_Verify that Dont have a user ID?Create one label is displayed ( with link in Create one) on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.pageTitleText()
   })
   it('B-545044: TC02_Verify that Enter your user ID and password to log in label is displayed on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.pageTitle()
   })
   it('B-545044: TC03_Verify that Password label is displayed on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyPasswordLabel()
   })
   it('B-545044: TC04_Verify that user ID label is displayed on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.VerifyUserIdLabel()
   })
   it('B-545044: TC05_Verify that user ID text box is displayed on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
   })
   it('B-545044: TC06_Verify that Password text box is displayed on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyPassword()
   })

   it('B-545044: TC07_Verify that user is able to provide intput to user ID text box on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
      lcp.enterUserID(this.data.UserID)
   })
   it('B-545044: TC08_Verify that user is able to provide intput to Password text box on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyPassword()
      lcp.enterPassword(this.data.Password)
   })
   it('B-545044: TC09_Verify that Remember me on this device label is displayed along with checkbox on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyRemembermeOnDevice()
   })
   it('B-545044: TC10_Verify that LOG IN button is displayed in Orange color on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.VerifyLoginButtonColour()
   })
   it('B-545044: TC11_Verify that LOG IN button is clickable on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.clickLoginButton()
   })
   it('B-545044: TC12_Verify that FORGOT YOUR USER ID OR PASSWORD? Link is displayed below LOG IN button on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyForgotUserIdButton()
   })
   it('B-545044: TC13_Verify that FORGOT YOUR USER ID OR PASSWORD? Link is clickable on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.clickForgotUserIdButton()
   })
   it('B-545044: TC14_Verify that Need help? Lable is displayed below FORGOT YOUR USER ID OR PASSWORD? Link on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyNeedHelpText()
   })
   it('B-545044: TC15_Verify that CUSTOMER SUPPORT Link is displayed below Need Help? Label button on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyCustomerSupportLink()
   })
   it('B-545044: TC16_Verify that CUSTOMER SUPPORT Link is clickable on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.clickCustomerSupportLink()
   })



   it('B-545045: TC02_Verify that the CUSTOMER SUPPORT page is displayed when CUSTOMER SUPPORT link is clicked in Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.clickCustomerSupportLink

   })

   it('B-545045: TC03_Verify that "Both user ID and password are required to log in." ERROR message is displayed when user ID is left blank on Enter your user ID and password to log in page (SUBMIT button click)', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterPassword(this.data.Password)
      lcp.clickLoginButton()
      lcp.VerifyUseridandPasswordError()


   })

   it('B-545045: TC04_Verify that "Both user ID and password are required to log in." ERROR message is displayed when Password ID is left blank on Enter your user ID and password to log in page (SUBMIT button click)', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterUserID(this.data.UserID)
      lcp.clickLoginButton()
      lcp.VerifyUseridandPasswordError()
   })

   it('B-545045: TC05_Verify that "Both user ID and password are required to log in." ERROR message is displayed when User ID and Password is left blank on Enter your user ID and password to log in page (SUBMIT button click)', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.clickLoginButton()
      lcp.VerifyUseridandPasswordError()
   })

   it('B-545045: TC06_Verify that "Both user ID and password are required to log in." ERROR message is displayed when user ID is left blank on Enter your user ID and password to log in page (focus change)', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
      lcp.enterPassword(this.data.Password)
      lcp.VerifyUseridandPasswordError()
   })
   it('B-545045: TC07_Verify that "Both user ID and password are required to log in." ERROR message is displayed when Password is left blank on Enter your user ID and password to log in page (focus change)', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyPassword()
      lcp.enterUserID(this.data.UserID)
      lcp.VerifyUseridandPasswordError()
   })
   it('B-545045: TC08_Verify that "Both user ID and password are required to log in." ERROR message is displayed when both USERID and Password is left blank on Enter your user ID and password to log in page (focus change)', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
      lcp.verifyPassword()
      lcp.VerifyUseridandPasswordError()
   })
   it('B-545045: TC09_Verify UserID accepts the value with 34 characters on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
      lcp.enterUserID(this.data.UserID34char)
      cy.get('#userId').should('have.value', this.data.UserID34char)
   })
   it('B-545045: TC10_Verify UserID accepts the value with 35 characters on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
      lcp.enterUserID(this.data.UserID35char)
      cy.get('#userId').should('have.value', this.data.UserID35char)

   })
   it('B-545045: TC11_Verify that user is not allowed to enter UserID more than 35 characters on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
      lcp.enterUserID(this.data.UserID36charError)
      cy.get('#userId').should('not.have.value', this.data.UserID36charError)
   })
   it('B-545045: TC12_Verify Password accepts the value with 34 characters on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
      lcp.enterPassword(this.data.UserID34char)
      cy.get('#password').should('have.value', this.data.Password34char)
   })
   it('B-545045: TC13_Verify Password accepts the value with 35 characters on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
      lcp.enterPassword(this.data.UserID35char)
      cy.get('#password').should('have.value', this.data.Password35char)
   })
   it('B-545045: TC14_Verify Password accepts the value with 35 characters on Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.verifyUserID()
      lcp.enterPassword(this.data.UserID35char)
      cy.get('#password').should('not.have.value', this.data.Password36charError)
   })

   it('B-545045: TC15_Verify that the ERROR message is displayed and user ID, password is retained in Enter your User ID and password to log in page when invalid user ID and password are provided as input', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterUserID(this.data.UserIDWrong)
      lcp.enterPassword(this.data.PasswordWrong)
      lcp.clickLoginButton()
      lcp.VerifyLoginAlert()
      lcp.verifyEnterUserIdValue(this.data.UserIDWrong)
   })

   // it('B-545045: TC16_Verify that user is navigated to new page when user clicked on LOGIN button after providing valid User ID and Password in Enter your user ID and password to log in page', function () {

   //    lcp.pageLoad(this.data.releaseUrl)
   //    arm.pageWait()
   //    lcp.enterUserID(this.data.UserID)
   //    lcp.enterPassword(this.data.Password)
   //    lcp.clickLoginButton()
   //    arm.verifyPageUrl(this.data.loginSuccessUrl)
   // })

   //   it('B-545045: TC17_Verify that the ERROR message is displayed and user ID, password is retained in Enter your User ID and password to log in page when locked user ID and password are provided as input',function(){

   //      lcp.pageLoad(this.data.releaseUrl)
   //      arm.pageWait()
   //      lcp.enterUserID(this.data.LockedUserID)
   //      lcp.enterPassword(this.data.LockedPassword)
   //      lcp.clickLoginButton()
   //      lcp.VerifyLoginAlert()
   //      lcp.verifyEnterUserIdValue(this.data.LockedUserID)
   //   })

   it('B-565812: Verify the 200 success response for the WLGN Login page API call', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterUserID(this.data.UserID)
      lcp.enterPassword(this.data.Password)
      lcp.clickLoginButton()
      cy.request('POST', this.data.WiremockURL, this.data.LoginMethod).then((response) => {
         expect(response.status).equal(200)
      })


   })

   it('B-565812: Verify that "Login incorrect. Either the user ID or password combination is incorrect or the account has been locked. Please try again or reset your password" ERROR message is displayed when locked  user ID and Password is provided in Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterUserID(this.data.UserIDWrong)
      lcp.enterPassword(this.data.PasswordWrong)
      lcp.clickLoginButton()
      lcp.VerifyLoginAlert()

   })

   it('B-565812: Verify that user navigated to Error page when 401 credentials are provided as input in Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterUserID(this.data.UserID401)
      lcp.enterPassword(this.data.Password401)
      lcp.clickLoginButton()
      arm.verifyPageUrl(this.data.errorUrl)

   })

   it('B-565812: Verify that user navigated to Error page when 403 credentials are provided as input in Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterUserID(this.data.UserID401)
      lcp.enterPassword(this.data.Password403)
      lcp.clickLoginButton()
      arm.verifyPageUrl(this.data.errorUrl)

   })

   it('B-565812: Verify that user navigated to Error page when 404 credentials are provided as input in Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterUserID(this.data.UserID401)
      lcp.enterPassword(this.data.Password404)
      lcp.clickLoginButton()
      arm.verifyPageUrl(this.data.errorUrl)

   })

   it('B-565812: Verify that user navigated to Error page when 500 credentials are provided as input in Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterUserID(this.data.UserID401)
      lcp.enterPassword(this.data.Password500)
      lcp.clickLoginButton()
      arm.verifyPageUrl(this.data.errorUrl)

   })
   //   it('US#565827 :TC_002_Verify user navigated to the"Your account is locked temporarily. " page on the 5th attempt of wrong user id and password . ', function () {

   //      lcp.pageLoad(this.data.releaseUrl)
   //      arm.pageWait()
   //      lcp.pageTitle()
   //      lcp.enterUserID(this.data.userIdLock)
   //      lcp.enterPassword(this.data.passwordLock)
   //      lcp.clickLoginButton()
   //      arm.pageWait()
   //      lcp.enterUserID(this.data.userIdLock)
   //      lcp.enterPassword(this.data.passwordLock)
   //      lcp.clickLoginButton()
   //      arm.pageWait()
   //      lcp.enterUserID(this.data.userIdLock)
   //      lcp.enterPassword(this.data.passwordLock)
   //      lcp.clickLoginButton()
   //      arm.pageWait()
   //      lcp.enterUserID(this.data.userIdLock)
   //      lcp.enterPassword(this.data.passwordLock)
   //      lcp.clickLoginButton()
   //      arm.pageWait()
   //      lcp.enterUserID(this.data.userIdLock)
   //      lcp.enterPassword(this.data.passwordLock)
   //      lcp.clickLoginButton()
   //      arm.verifyPageUrl(this.data.lockedScreenUrl)

   //  })

   //  it('US#565827 :TC_003_Verify User can see the Error Message "Login incorrect Either user ID or password combination" is incorrect or the account has been locked.Please try again or reset your password" when Account is locked  temporarily in "Enter your user ID and password to log in" Screen.', function () {

   //      lcp.pageLoad(this.data.releaseUrl)
   //      arm.pageWait()
   //      lcp.pageTitle()
   //      lcp.verifyUserID()
   //      lcp.enterUserID(this.data.userIdLock)
   //      lcp.verifyPassword()
   //      lcp.enterPassword(this.data.passwordLock)
   //      lcp.clickLoginButton()
   //      lcp.VerifyLoginAlert()

   // })
   it('B-601388 :TC_01_Verify that the icon is available to view Password and user able to view Password once click on it in Login-Credentials page.', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.pageTitle()
      lcp.verifyUserID()
      lcp.enterUserID(this.data.UserID)
      lcp.verifyPassword()
      lcp.enterPassword(this.data.Password)
      lcp.verifyShowButton()
      lcp.clickShowButton()

   })
   it('B-565812:Verify that user navigated to Error page when 400 credentials are provided as input in Enter your user ID and password to log in page', function () {

      lcp.pageLoad(this.data.releaseUrl)
      arm.pageWait()
      lcp.enterUserID(this.data.UserIDWrong)
      lcp.enterPassword(this.data.PasswordWrong)
      lcp.clickLoginButton()
      lcp.VerifyLoginAlert()

   })


})