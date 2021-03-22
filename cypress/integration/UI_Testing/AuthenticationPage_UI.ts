/**
 * This test suite is for PI01.1:: Automation scripts
 * Author - Grishma Patel(3913851) --> 562261
 * Date- 02/17/2021
 */

/// <reference types ="cypress" />

// import all clasees which are required for this suite
import AllReusableMethods from '../AllPageObjects/AllReusableMethods'
import AuthenticatePage from '../AllPageObjects/AuthenticatePage'
import LoginCredentialsPage from '../AllPageObjects/Login_CredentialsPage'

describe('PI-001- CIAM - USE A DIFFERENT VERIFICATION METHOD Link on Authentication Page', function () {
  const arm = new AllReusableMethods()              // arm--> (A)ll (R)eusable (M)ethods
  const ap = new AuthenticatePage()             //ap-->AuthenticatePage
  const lcp = new LoginCredentialsPage()             //lcp-->logincredentialspage

  beforeEach(function () {            // this function will fetch the test data from fixture\testdata.json
    cy.fixture('testdata').then(function (data) {
      this.data = data;
    })
  })


  it('US#562261 :TC-001:Verify that the USE A DIFFERENT VERIFICATION METHOD link is clickable.', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.verifyTestLink()
  })

  it('US#562261 : TC-002 : Verify that the Choose a verification method pop-up is displayed when the user clicked on USE A DIFFERENT VERIFICATION METHOD link.', function () {
    lcp.pageLoad(this.data.releaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userName)
    lcp.enterPassword(this.data.password)
    lcp.clickLoginButton()
    cy.request('POST', this.data.mockValdateLoginURL, this.data.mockDataParams).then((response) => {
      expect(response.status).equal(200)
      ap.pageLoad(this.data.authenticateUrl)
      arm.pageWait()
      ap.clickTestLink()
    })
  })

  it('US#562261 : TC03_Verify that the Choose a verification method pop-up is displayed (Email & phone call) when the user clicked on USE A DIFFERENT VERIFICATION METHOD link.', function () {
    lcp.pageLoad(this.data.releaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userName)
    lcp.enterPassword(this.data.password)
    lcp.clickLoginButton()
    cy.request('POST', this.data.mockValdateLoginURL, this.data.mockDataParams).then((response) => {
      expect(response.status).equal(200)
      ap.pageLoad(this.data.authenticateUrl)
      arm.pageWait()
      ap.clickTestLink()
      ap.verifyEmailBtn()
    })
  })

  it('US#562261 : TC04_Verify that the Choose a verification method pop-up is displayed (SMS & phone call) when the user clicked on USE A DIFFERENT VERIFICATION METHOD link.', function () {
    lcp.pageLoad(this.data.releaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userName)
    lcp.enterPassword(this.data.password)
    lcp.clickLoginButton()
    cy.request('POST', this.data.mockValdateLoginURL, this.data.mockDataParams).then((response) => {
      expect(response.status).equal(200)
      ap.pageLoad(this.data.authenticateUrl)
      arm.pageWait()
      ap.clickTestLink()
      ap.verifyEmailBtn()
      ap.verifySmsBtn()
    })
  })

  it('US#545060 : TC01_Verify that the login button is clickable on Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()

    ap.clickSubmitBtn()
  })

  it('US#545060 : TC02_Verify that the login button is clickable on Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()

    ap.clickSubmitBtn()
  })
  it('US#562261 :TC-001:Verify that the USE A DIFFERENT VERIFICATION METHOD link is clickable.', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.verifyTestLink()
  })

  it('US#562261 : TC-002 : Verify that the Choose a verification method pop-up is displayed when the user clicked on USE A DIFFERENT VERIFICATION METHOD link.', function () {
    lcp.pageLoad(this.data.releaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userName)
    lcp.enterPassword(this.data.password)
    lcp.clickLoginButton()
    cy.request('POST', this.data.mockValdateLoginURL, this.data.mockDataParams).then((response) => {
      expect(response.status).equal(200)
      ap.pageLoad(this.data.authenticateUrl)
      arm.pageWait()
      ap.clickTestLink()
    })
  })
    it('US#545060 : TC01_Verify that the "SUBMIT" button is clickable on Verify your Identity screen', function () {
        ap.pageLoad(this.data.authenticateUrl)
        arm.pageWait()
    })
  it('US#562261 : TC03_Verify that the Choose a verification method pop-up is displayed (Email & phone call) when the user clicked on USE A DIFFERENT VERIFICATION METHOD link.', function () {
    lcp.pageLoad(this.data.releaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userName)
    lcp.enterPassword(this.data.password)
    lcp.clickLoginButton()
    cy.request('POST', this.data.mockValdateLoginURL, this.data.mockDataParams).then((response) => {
      expect(response.status).equal(200)
      ap.pageLoad(this.data.authenticateUrl)
      arm.pageWait()
      ap.clickTestLink()
      ap.verifyEmailBtn()
    })
  })

  it('US#562261 : TC04_Verify that the Choose a verification method pop-up is displayed (SMS & phone call) when the user clicked on USE A DIFFERENT VERIFICATION METHOD link.', function () {
    lcp.pageLoad(this.data.releaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userName)
    lcp.enterPassword(this.data.password)
    lcp.clickLoginButton()
    cy.request('POST', this.data.mockValdateLoginURL, this.data.mockDataParams).then((response) => {
      expect(response.status).equal(200)
      ap.pageLoad(this.data.authenticateUrl)
      arm.pageWait()
      ap.clickTestLink()
      ap.verifyEmailBtn()
      ap.verifySmsBtn()
    })
  })
  
  it('US#545057 :TC-001:Verify that the Verify your identity title is displayed on Verify your identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
  })
  it('US#545057 :TC-002:Verify that the Enter the code we texted to the number on your Profile (***-***-1234). Verification codes sent via text are valid for 10 minutes. Message is displayed as Title2 on Verify your identity screen when the user selected SMS option to verify', function () {
    ap.pageLoad(this.data.mockReleaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userIDForSMS)
    lcp.enterPassword(this.data.Password)
    lcp.clickLoginButton()
    arm.pageWait()
    ap.pageTitleTextforSMS()
  })
  it('US#545057 :TC-003:Verify that the Enter the code you received via phone call to the number on your Profile (***-***-1234). Verification codes sent via Phone are valid for 10 minutes. Message is displayed as Title2 on Verify your identity screen when the user selected phone call option to verify', function () {
    ap.pageLoad(this.data.mockReleaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userIDForPhone)
    lcp.enterPassword(this.data.Password)
    lcp.clickLoginButton()
    arm.pageWait()
    ap.pageTitleTextforPhone()
  })
  it('US#545057 :TC-004:Verify that the Enter the code we sent to the emailed on your Profile (nf****@t***.com). Verification codes sent via email are valid for 10 minutes). Message is displayed as Title2 on Verify your identity screen when the user selected EMAIL option to verify', function () {
    ap.pageLoad(this.data.mockReleaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userIdForEmail)
    lcp.enterPassword(this.data.Password)
    lcp.clickLoginButton()
    arm.pageWait()
    ap.pageTitleTextforEmail()
  })
  it('US#545057 :TC-005:Verify that the 6 Digit Verification code entry option below Dynamic message is displayed on Verify your identity screen when the user selected SMS option to verify', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.verifyFirstBox()
    ap.verifySecondBox()
    ap.verifyThirdBox()
    ap.verifyFifthBox()
    ap.verifySixthBox()
  })
  it('US#545057 :TC-006:Verify that the Check Box with Trust this device in the future? Text is displayed on Verify your identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.VerifyTrustmeDeviceCheckbox()
  })
  it('US#545057 :TC-007:Verify that the SUBMIT button is displayed on Verify your identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySubmitButton()
  })

  it('US#545057 :TC-008:Verify that the USE A DIFFERENT VERIFICATION METHOD link is displayed on Verify your identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyDifferentVerificationButton()
  })
  it('US#545057 :TC-009:Verify that a separation line below USE A DIFFERENT VERIFICATION METHOD link is displayed on Verify your identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySeperateLine()
  })
  it('US#545057 :TC-010:Verify that the Didnt receive a code? If you havent received a code after a few minutes, you can request a new one. note is displayed below the USE A DIFFERENT VERIFICATION METHOD Link. on Verify your identity screen ', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyPageReceiveCodeTitleText()
  })
  it('US#545057 :TC-011:Verify that the REQUEST NEW CODE link is displayed below the note on Verify your identity screen ', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyRequestNewCodeButton()
  })
  it('US#545057 :TC-012:Verify that the Need Help? below REQUEST NEW CODE link is displayed on Verify your identity screen ', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyPageNeedHelpText()
  })
  it('US#545057 :TC-013:Verify that the CUSTOMER SUPPORT link is clickable below Need Help? Is displayed on Verify your identity screen ', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyCustomerSupportButton()
    ap.clickCustomerSupportButton()
  })

  it('B-557713:TC-02: Verify refresh (Right click & F5)functionality of the browser on Authenticate Page.', function () {
    if(!this.data.isDecouple){
        lcp.pageLoad(this.data.mockReleaseUrl)
        arm.pageWait()
        lcp.enterUserID(this.data.userIdForEmail)
        lcp.enterPassword(this.data.PasswordWrong)
        lcp.clickLoginButton()
        arm.verifyPageUrl(this.data.authenticate_Url)
        arm.pageReload()
        arm.verifyPageUrl(this.data.releaseUrl)
        lcp.verifyEnterUserIdValue('')
        lcp.verifyPasswordValue('')
    }
  })

})