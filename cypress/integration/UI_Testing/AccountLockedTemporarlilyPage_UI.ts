/**
 * This test suite is for PI05-Sprint05:: Automation scripts
 * Author - Girija (3981341)
 * Date- 21/01/2021
 */


/// <reference types ="cypress" />

// import all clasees which are required for this suite

import AccountIsLocked from '../AllPageObjects/AccountLockedTemporarlilyPage'
import AllReusableMethods from '../AllPageObjects/AllReusableMethods'
import LoginCredentialsPage from '../AllPageObjects/Login_CredentialsPage'


describe('PI05_sprint05:Automation testing scripts', function () {
    const lcp = new LoginCredentialsPage() //lcp --> login credentials page
    const arm = new AllReusableMethods()   //arm -->  all reusable methods
    const al =  new AccountIsLocked()     //al --> accountTemporalilyPage

    beforeEach(function () {            // this function will fetch the test data from fixture\testdata.json
        cy.fixture('testdata').then(function (data) {
            this.data = data;
        })
    })

    it('US#545050 :TC-004:Verify the title "Your account is locked temporarily." below the account locked sign displayed on the"Your account is locked temporarily." page.', function () {
      lcp.pageLoad(this.data.lockedScreenUrl)
      arm.pageWait()
      al.pageTitle()

   })

   it('US#545050 :TC-005:Verify the verbiage "You exceeded the maximum number of failed login attempts.We have locked your account to prevent unauthorized access.You may attempt to log in again in 1 hour." .page', function () {
       lcp.pageLoad(this.data.lockedScreenUrl)
       arm.pageWait()
       al.pageTitle()
       al.pageTitleText()

    })

    it('US#545050 :TC-006:Verify the a separation Line below verbiage "You exceeded the maximum number of failed login attempts.We have locked your account to prevent unauthorized access.You may attempt to log in again in 1 hour." page.', function () {
       lcp.pageLoad(this.data.lockedScreenUrl)
       arm.pageWait()
       al.pageTitleText()
       al.verifySeperateLine()

    })
    
    it('US#545050 :TC-007:Verify the veribiage "Need help gaining access to your account?" below the  separation Line is displayed on the"Your account is locked temporarily." page." (1 hour should be in bold) is displayed on the"Your account is locked temporarily." page.', function () {
       lcp.pageLoad(this.data.lockedScreenUrl)
       arm.pageWait()
       al.pageTitle()
       al.verifySeperateLine()
       al.verifyNeedHelpGainingAccessButton()

    })

    it('US#545050 :TC-008:Verify the "FORGOT YOUR USER ID OR PASSWORD?" Link below "Need help gaining access to your account?" verbiage is displayed on the"Your account is locked temporarily. " page. ', function () {
       lcp.pageLoad(this.data.lockedScreenUrl)
       arm.pageWait()
       al.verifyNeedHelpGainingAccessButton()
       al.verifyForgotButton()

    })

    it('US#545050 :TC-009:Verify the  "CUSTOMER SUPPORT" Link below "FORGOT YOUR USER ID OR PASSWORD?" Link is displayed on the"Your account is locked temporarily. " page.', function () {
       lcp.pageLoad(this.data.lockedScreenUrl)
       arm.pageWait()
       al.verifyForgotButton()
       al.verifyCustomerSuportLink()

    })

    it('US#545050 :TC-033:Verify that all available text is properly visible on "Your account is locked temporarily. " page.', function () {
       lcp.pageLoad(this.data.lockedScreenUrl)
       arm.pageWait()
       al.pageTitle()
       al.pageTitleText()
       al.verifyNeedHelpGainingAccessButton()
       al.verifyForgotButton()
       al.verifyCustomerSuportLink()


    })

    it('US#558905 :TC-023:Verify that user is able to scroll the page UP/DOWN on "Your account is locked temporarily. " page', function () {
       lcp.pageLoad(this.data.lockedScreenUrl)
       arm.pageWait()
       al.pageTitle()
       arm.scrollToTop()
       arm.scrollToBottom()
   })
   it('US#545051:TC-01:"Verify whether the customer support button is available or not on Account Locked Temporarily Page. " page', function () {
       lcp.pageLoad(this.data.lockedScreenUrl) 
       arm.pageWait()
       al.pageTitle()
       al.verifyCustomerSuportLink()
     
  })
  it('US#546680:TC-01:"Verify whether the forgot your user id or password button is visible or not on Account Locked Temporarily Page" page', function () {
     
      lcp.pageLoad(this.data.lockedScreenUrl)
      arm.pageWait()
      al.pageTitle()
      al.verifyForgotButton()
   
})

})