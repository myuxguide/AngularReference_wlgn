/**
 * This test suite is for PI01.3:: Automation scripts
 * Author - Grishma (3913851) --> 562261
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
      ap.verifyTestLink()
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

  it('US#545058:TC-001 :  Verify that the ERROR message is displayed when the user clicked on SUBMIT button without providing values', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.clickSubmitBtn()
    ap.verifyError()
  })

  it('US#545058:TC-002 :  Verify that the ERROR message is displayed when the user didn’t provided input for input box1 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.clickFirstBox()
    ap.clickSubmitBtn()
    ap.verifyinputBoxColour()
    ap.verifyError()
  })

  it('US#545058:TC-003 :  Verify that input Box 2 is Highlight with Red if no value entered in Blank Boxes and Error Message A 6-digit code is required. is displayed below the box', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)
    ap.enterValueSixthBox(1)
    ap.enterValueThirdBox(1)
    ap.enterValueFourthBox(1)
    ap.enterValueFifthBox(1)
    ap.clickSubmitBtn()
    ap.verifyinputBox2Colour()
    ap.verifyError()
  })

  it('US#545058:TC-004 :  Verify that input Box 3 is Highlight with Red if no value entered in Blank Boxes and Error Message A 6-digit code is required. is displayed below the box', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)
    ap.enterValueSixthBox(1)
    ap.enterValueSecondBox(1)
    ap.enterValueFourthBox(1)
    ap.enterValueFifthBox(1)
    ap.clickSubmitBtn()
    ap.verifyinputBox3Colour()
    ap.verifyError()
  })

  it('US#545058:TC-005 :  Verify that input Box 4 is Highlight with Red if no value entered in Blank Boxes and Error Message A 6-digit code is required. is displayed below the box', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)
    ap.enterValueSixthBox(1)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(1)
    ap.enterValueFifthBox(1)
    ap.clickSubmitBtn()
    ap.verifyinputBox4Colour()
    ap.verifyError()
  })

  it('US#545058:TC-006 :  Verify that input Box 5 is Highlight with Red if no value entered in Blank Boxes and Error Message A 6-digit code is required. is displayed below the box', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)
    ap.enterValueSixthBox(1)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(1)
    ap.enterValueFourthBox(1)
    ap.clickSubmitBtn()
    ap.verifyinputBox5Colour()
    ap.verifyError()
  })

  it('US#545058:TC-007 :  Verify that input Box 6 is Highlight with Red if no value entered in Blank Boxes and Error Message A 6-digit code is required. is displayed below the box', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)
    ap.enterValueFifthBox(1)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(1)
    ap.enterValueFourthBox(1)
    ap.clickSubmitBtn()
    ap.verifyinputBox6Colour()
    ap.verifyError()
  })

  it('US#545058:TC-008 :  Verify that incorrect code error', function () {
    lcp.pageLoad(this.data.mockReleaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userIdForEmail)
    lcp.enterPassword(this.data.password)
    lcp.clickLoginButton()
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFirstBox(4)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(0)
    ap.enterValueFourthBox(0)
    ap.enterValueFifthBox(0)
    ap.enterValueSixthBox(0)
    ap.clickSubmitBtn()
    ap.verifyOtpError()
  })

  it('US#545058:TC-009 :  Verify that expired code error', function () {
    lcp.pageLoad(this.data.mockReleaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userIdForEmail)
    lcp.enterPassword(this.data.password)
    lcp.clickLoginButton()
    ap.pageLoad(this.data.authenticateUrl)
    ap.enterValueFirstBox(4)
    ap.enterValueSecondBox(2)
    ap.enterValueThirdBox(0)
    ap.enterValueFourthBox(0)
    ap.enterValueFifthBox(0)
    ap.enterValueSixthBox(0)
    ap.clickSubmitBtn()

    ap.verifyOtpError()
  })

  it('US#545058:TC-010 :  Verify that user enter in input box1 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)

  })

  it('US#545058:TC-011 :  Verify that user enter in input box2 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueSecondBox(1)

  })

  it('US#545058:TC-012 :  Verify that user enter in input box3 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueThirdBox(1)

  })

  it('US#545058:TC-013 :  Verify that user enter in input box4 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFourthBox(1)

  })

  it('US#545058:TC-014 :  Verify that user enter in input box5 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFifthBox(1)

  })

  it('US#545058:TC-015 :  Verify that user enter in input box6 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueSixthBox(1)

  })

  it('US#545058:TC-016 :  Verify that user enter single digit input box1 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(81)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(1)
    ap.enterValueFourthBox(1)
    ap.enterValueFifthBox(1)
    ap.enterValueSixthBox(1)
    ap.verifyValueFirstBox(8)

  })

  it('US#545058:TC-017 :  Verify that user enter in input box2 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)
    ap.enterValueSecondBox(21)
    ap.enterValueThirdBox(1)
    ap.enterValueFourthBox(1)
    ap.enterValueFifthBox(1)
    ap.enterValueSixthBox(1)
    ap.verifyValueSecondBox(2)
  })

  it('US#545058:TC-018 :  Verify that user enter single digit in input box3 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(31)
    ap.enterValueFourthBox(1)
    ap.enterValueFifthBox(1)
    ap.enterValueSixthBox(1)
    ap.verifyValueThirdBox(3)

  })

  it('US#545058:TC-019 :  Verify that user enter in input box4 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(1)
    ap.enterValueFourthBox(41)
    ap.enterValueFifthBox(1)
    ap.enterValueSixthBox(1)
    ap.verifyValueFourthBox(4)

  })

  it('US#545058:TC-020 :  Verify that user enter in input box5 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.enterValueFirstBox(1)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(1)
    ap.enterValueFourthBox(1)
    ap.enterValueFifthBox(51)
    ap.enterValueSixthBox(1)
    ap.verifyValueFifthBox(5)

  })

  it('US#545058:TC-021 :  Verify that user enter in input box6 value', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    arm.verifyPageUrl(this.data.authenticateUrl)

    ap.enterValueFirstBox(1)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(1)
    ap.enterValueFourthBox(1)
    ap.enterValueFifthBox(1)
    ap.enterValueSixthBox(61)
    ap.verifyValueSixthBox(1)

  })
  it('US#545058 :TC-022:Verify that the user is not able to provide char as input for input box1 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFirstBox(this.data.charinput)
    ap.verifyNoValueFirstBox()

  })
  it('US#545058 :TC-023:Verify that the user is not able to provide char as input for input box2 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueSecondBox(this.data.charinput)
    ap.verifyNoValueSecondBox()

  })
  it('US#545058 :TC-024:Verify that the user is not able to provide char as input for input box3 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueThirdBox(this.data.charinput)
    ap.verifyNoValueThirdBox()
  })
  it('US#545058 :TC-025:Verify that the user is not able to provide char as input for input box4 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFourthBox(this.data.charinput)
    ap.verifyNoValueFourthBox()
  })
  it('US#545058 :TC-026:Verify that the user is not able to provide char as input for input box5 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFifthBox(this.data.charinput)
    ap.verifyNoValueFifthBox()
  })
  it('US#545058 :TC-027:Verify that the user is not able to provide char as input for input box6 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueSixthBox(this.data.charinput)
    ap.verifyNoValueSixthBox()
  })
  it('US#545058 :TC-028:Verify that the user is not able to provide special char as input for input box1 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFirstBox(this.data.specialchar)
    ap.verifyNoValueFirstBox()
  })
  it('US#545058 :TC-029:Verify that the user is not able to provide special char as input for input box2 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueSecondBox(this.data.specialchar)
    ap.verifyNoValueSecondBox()
  })
  it('US#545058 :TC-030:Verify that the user is not able to provide special char as input for input box3 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueThirdBox(this.data.specialchar)
    ap.verifyNoValueThirdBox()
  })
  it('US#545058 :TC-031:Verify that the user is not able to provide special char as input for input box4 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFourthBox(this.data.specialchar)
    ap.verifyNoValueFourthBox()
  })
  it('US#545058 :TC-032:Verify that the user is not able to provide special char as input for input box5 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFifthBox(this.data.specialchar)
    ap.verifyNoValueFifthBox()
  })
  it('US#545058 :TC-033:Verify that the user is not able to provide special char as input for input box6 in Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueSixthBox(this.data.specialchar)
    ap.verifyNoValueSixthBox()
  })
  it('US#545058 :TC-034:Verify that the user is able to delete input from input box1 in Verify your Identity screen using delete key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFirstBox(this.data.validinput)
    ap.enterDeleteKeyFirstBox()
    ap.verifyNoValueFirstBox()
  })
  it('US#545058 :TC-035:Verify that the user is able to delete input from input box2 in Verify your Identity screen using delete key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueSecondBox(this.data.validinput)
    ap.enterDeleteKeySecondBox()
    ap.verifyNoValueSecondBox()
  })
  it('US#545058 :TC-036:Verify that the user is able to delete input from input box3 in Verify your Identity screen using delete key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueThirdBox(this.data.validinput)
    ap.enterDeleteKeyThirdBox()
    ap.verifyNoValueThirdBox()
  })
  it('US#545058 :TC-037:Verify that the user is able to delete input from input box4 in Verify your Identity screen using delete key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFourthBox(this.data.validinput)
    ap.enterDeleteKeyFourthBox()
    ap.verifyNoValueFourthBox()
  })
  it('US#545058 :TC-038:Verify that the user is able to delete input from input box5 in Verify your Identity screen using delete key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFifthBox(this.data.validinput)
    ap.enterDeleteKeyFifthBox()
    ap.verifyNoValueFifthBox()
  })
  it('US#545058 :TC-039:Verify that the user is able to delete input from input box6 in Verify your Identity screen using delete key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueSixthBox(this.data.validinput)
    ap.enterDeleteKeySixthBox()
    ap.verifyNoValueSixthBox()
  })

  it('US#545058 :TC-040:Verify that the user is able to delete input from input box1 in Verify your Identity screen using Backspace key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFirstBox(this.data.validinput)
    ap.enterBackspaceFirstbox()
    ap.verifyNoValueFirstBox()

  })
  it('US#545058 :TC-041:Verify that the user is able to delete input from input box2 in Verify your Identity screen using Backspace key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueSecondBox(this.data.validinput)
    ap.enterBackspaceSecondbox()
    ap.verifyNoValueSecondBox()
  })
  it('US#545058 :TC-042:Verify that the user is able to delete input from input box3 in Verify your Identity screen using Backspace key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueThirdBox(this.data.validinput)
    ap.enterBackspaceThirdbox()
    ap.verifyNoValueThirdBox()
  })

  it('US#545058 :TC-043:Verify that the user is able to delete input from input box4 in Verify your Identity screen using Backspace key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFourthBox(this.data.validinput)
    ap.enterBackspaceFourthbox()
    ap.verifyNoValueFourthBox()
  })

  it('US#545058 :TC-044:Verify that the user is able to delete input from input box5 in Verify your Identity screen using Backspace key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueFifthBox(this.data.validinput)
    ap.enterBackspaceFifthbox()
    ap.verifyNoValueFifthBox()
  })
  it('US#545058 :TC-045:Verify that the user is able to delete input from input box6 in Verify your Identity screen using Backspace key', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.enterValueSixthBox(this.data.validinput)
    ap.enterBackspaceSixthbox()
    ap.verifyNoValueSixthBox()
  })
  it('US#545058:TC-046:Verify that the cursor is not moved to any where when user pressed left  arrow on Inputbox1 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFirstBox()
    ap.clickFirstBox()
    ap.clickLeftArrowFirstBox()
    ap.verifyCursorFirstBox()

  })
  it('US#545058:TC-047:Verify that the cursor is moved to Inputbox1 Highlighted with no cursor Blink when user pressed left arrow on Inputbox2 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySecondBox()
    ap.clickLeftArrowSecondBox()
    ap.verifyCursorFirstBox()
  })
  it('US#545058:TC-048 :Verify that the cursor is moved to Inputbox2 Highlighted with no cursor Blink when user pressed left arrow on Inputbox3 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyThirdBox()
    ap.clickLeftArrowThirdBox()
    ap.verifyCursorSecondBox()

  })
  it('US#545058:TC-049 :Verify that the cursor is moved to Inputbox3 Highlighted with no cursor Blink when user pressed left arrow on Inputbox4 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFourthBox()
    ap.clickLeftArrowFourthBox()
    ap.verifyCursorThirdBox()

  })
  it('US#545058:TC-050 :Verify that the cursor is moved to Inputbox4 Highlighted with no cursor Blink when user pressed left arrow on Inputbox5 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFifthBox()
    ap.clickLeftArrowFifthBox()
    ap.verifyCursorFourthBox()
  })
  it('US#545058:TC-051 :Verify that the cursor is moved to Inputbox5 Highlighted with no cursor Blink when user pressed left arrow on Inputbox6 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySixthBox()
    ap.clickLeftArrowSixthBox()
    ap.verifyCursorFifthBox()
  })
  it('US#545058:TC-052 :Verify that the cursor is moved to Inputbox2 Highlighted with no cursor Blink when user pressed right arrow on Inputbox1 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFirstBox()
    ap.clickRightArrowFirstBox()
    ap.verifyCursorSecondBox()

  })
  it('US#545058:TC-053 :Verify that the cursor is moved to Inputbox3 Highlighted with no cursor Blink when user pressed right arrow on Inputbox2 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySecondBox()
    ap.clickRightArrowSecondBox()
    ap.verifyCursorThirdBox()

  })
  it('US#545058:TC-054 :Verify that the cursor is moved to Inputbox4 Highlighted with no cursor Blink when user pressed right arrow on Inputbox3 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyThirdBox()
    ap.clickRightArrowThirdBox()
    ap.verifyCursorFourthBox()
  })
  it('US#545058:TC-055 :Verify that the cursor is moved to Inputbox5 Highlighted with no cursor Blink when user pressed right arrow on Inputbox4 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFourthBox()
    ap.clickRightArrowFourthBox()
    ap.verifyCursorFifthBox()

  })
  it('US#545058:TC-056 :Verify that the cursor is moved to Inputbox6 Highlighted with no cursor Blink when user pressed right arrow on Inputbox5 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFifthBox()
    ap.clickRightArrowFifthBox()
    ap.verifyCursorSixthBox()
  })
  it('US#545058:TC-057 :Verify that the cursor is not moved to any where when user pressed right  arrow on Inputbox6 in Verify your Identity screen ', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySixthBox()
    ap.clickRightArrowSixthBox()
    ap.verifyCursorSixthBox()
  })
  it('US#545058:TC-058 :  Verify that user navigate to home page when submit button is clicked', function () {
    lcp.pageLoad(this.data.mockReleaseUrl)
    arm.pageWait()
    lcp.enterUserID(this.data.userIdForEmail)
    lcp.enterPassword(this.data.password)
    lcp.clickLoginButton()
    ap.pageLoad(this.data.authenticateUrl)

    ap.enterValueFirstBox(1)
    ap.enterValueSecondBox(1)
    ap.enterValueThirdBox(1)
    ap.enterValueFourthBox(1)
    ap.enterValueFifthBox(1)
    ap.enterValueSixthBox(1)
    ap.clickSubmitBtn()

  })
  it('US#545058:TC-070 :Verify that the value on Inputbox1 is not increased when the user press up arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFirstBox()
    ap.enterValueFirstBox(this.data.validinput)
    ap.enterUpArrowFirstBox()
    ap.verifyValueFirstBox(this.data.validinput)
  })
  it('US#545058:TC-071 :Verify that the value on Inputbox2 is not increased when the user press up arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySecondBox()
    ap.enterValueSecondBox(this.data.validinput)
    ap.enterUpArrowSecondBox()
    ap.verifyValueSecondBox(this.data.validinput)
  })
  it('US#545058:TC-072 :Verify that the value on Inputbox3 is not increased when the user press up arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyThirdBox()
    ap.enterValueThirdBox(this.data.validinput)
    ap.enterUpArrowThirdBox()
    ap.verifyValueThirdBox(this.data.validinput)
  })
  it('US#545058:TC-073 :Verify that the value on Inputbox4 is not increased when the user press up arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFourthBox()
    ap.enterValueFourthBox(this.data.validinput)
    ap.enterUpArrowFourthBox()
    ap.verifyValueFourthBox(this.data.validinput)
  })
  it('US#545058:TC-074 :Verify that the value on Inputbox5 is not increased when the user press up arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFifthBox()
    ap.enterValueFifthBox(this.data.validinput)
    ap.enterUpArrowFifthBox()
    ap.verifyValueFifthBox(this.data.validinput)
  })

  it('US#545058:TC-075 :Verify that the value on Inputbox6 is not increased when the user press up arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySixthBox()
    ap.enterValueSixthBox(this.data.validinput)
    ap.enterUpArrowSixthBox()
    ap.verifyValueSixthBox(this.data.validinput)
  })
  it('US#545058:TC-076 :Verify that the value on Inputbox1 is not increased when the user press down arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFirstBox()
    ap.enterValueFirstBox(this.data.validinput)
    ap.enterDownArrowFirstBox()
    ap.verifyValueFirstBox(this.data.validinput)
  })
  it('US#545058:TC-077 :Verify that the value on Inputbox2 is not increased when the user press down arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySecondBox()
    ap.enterValueSecondBox(this.data.validinput)
    ap.enterDownArrowSecondBox()
    ap.verifyValueSecondBox(this.data.validinput)
  })
  it('US#545058:TC-078 :Verify that the value on Inputbox3 is not increased when the user press down arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyThirdBox()
    ap.enterValueThirdBox(this.data.validinput)
    ap.enterDownArrowThirdBox()
    ap.verifyValueThirdBox(this.data.validinput)
  })
  it('US#545058:TC-079 :Verify that the value on Inputbox4 is not increased when the user press down arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFourthBox()
    ap.enterValueFourthBox(this.data.validinput)
    ap.enterDownArrowFourthBox()
    ap.verifyValueFourthBox(this.data.validinput)
  })
  it('US#545058:TC-080 :Verify that the value on Inputbox5 is not increased when the user press down arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifyFifthBox()
    ap.enterValueFifthBox(this.data.validinput)
    ap.enterDownArrowFifthBox()
    ap.verifyValueFifthBox(this.data.validinput)
  })

  it('US#545058:TC-081 :Verify that the value on Inputbox6 is not increased when the user press down arrow key in Verify your Identity screen', function () {

    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.pageTitle()
    ap.verifySixthBox()
    ap.enterValueSixthBox(this.data.validinput)
    ap.enterDownArrowSixthBox()
    ap.verifyValueSixthBox(this.data.validinput)

  })


  it('US#545060 : TC03_Verify that the use is navigated to FEDEX Home page when the user click "SUBMIT" button on Verify your Identity screen', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()

    // ap.clickSubmitBtn()
    arm.VerifyHomePageLink(this.data.homeUrl)
  })
  it('TC01_Verify that the REQUEST NEW CODE link is clickable', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.clickRequestNewCodeLink()
  })

  it('TC02_Verify that the code provide in boxes will be wiped out when REQUEST NEW CODE link is clicked', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.enterValueFirstBox(1)
    ap.clickRequestNewCodeLink()
    ap.verifyNoValueFirstBox()
  })

  it('TC02_Verify that the code provide in boxes will be wiped out when REQUEST NEW CODE link is clicked', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.enterValueSecondBox(2)
    ap.clickRequestNewCodeLink()
    ap.verifyNoValueSecondBox()
  })

  it('TC02_Verify that the code provide in boxes will be wiped out when REQUEST NEW CODE link is clicked', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.enterValueThirdBox(3)
    ap.clickRequestNewCodeLink()
    ap.verifyNoValueThirdBox()
  })

  it('TC02_Verify that the code provide in boxes will be wiped out when REQUEST NEW CODE link is clicked', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.enterValueFourthBox(4)
    ap.clickRequestNewCodeLink()
    ap.verifyNoValueFourthBox()
  })

  it('TC02_Verify that the code provide in boxes will be wiped out when REQUEST NEW CODE link is clicked', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.enterValueFifthBox(5)
    ap.clickRequestNewCodeLink()
    ap.verifyNoValueFifthBox()
  })

  it('TC02_Verify that the code provide in boxes will be wiped out when REQUEST NEW CODE link is clicked', function () {
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    ap.enterValueSixthBox(6)
    ap.clickRequestNewCodeLink()
    ap.verifyNoValueSixthBox()
  })


  it('TC01_Verify that the user is able to select Trust this device in the future functionality check box in Authenticate screen', function () {
    ap.pageLoad(this.data.releaseUrl);
    cy.wait(5000)
    lcp.enterUserID(this.data.userIDForSMS)
    lcp.enterPassword(this.data.Password)
    lcp.clickLoginButton()
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.verifyCheckBoxChecked()

  })

  it('TC01_Verify that the user is able to select Trust this device in the future functionality uncheck the checkbox in Authenticate screen', function () {
    ap.pageLoad(this.data.releaseUrl);
    cy.wait(5000)
    lcp.enterUserID(this.data.userIDForSMS)
    lcp.enterPassword(this.data.Password)
    lcp.clickLoginButton()
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.verifyCheckBoxUnChecked()

  })

  it('TC02_Verify that the You will not be asked for a verification code for this device in the future. Message is displayed when the user hover the Trust this device in the future Authenticate screen', function () {
    ap.pageLoad(this.data.releaseUrl);
    cy.wait(5000)
    lcp.enterUserID(this.data.userIDForSMS)
    lcp.enterPassword(this.data.Password)
    lcp.clickLoginButton()
    ap.pageLoad(this.data.authenticateUrl)
    arm.pageWait()
    arm.verifyPageUrl(this.data.authenticateUrl)
    ap.verifyQuestionMark()
    ap.hoverQuestionMark()

  })
})
