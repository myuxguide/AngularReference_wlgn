/**
 * This test suite is for PI05-Sprint05:: Automation scripts
 * Author - Girija (3981341)
 * Date- 01/02/2021
 */


/// <reference types ="cypress" />

// import all clasees which are required for this suite

import AllReusableMethods from '../AllPageObjects/AllReusableMethods'
import LoginCredentialsPage from '../AllPageObjects/Login_CredentialsPage'
import FailPage from '../AllPageObjects/FailPage'


describe('PI05_sprint05:Automation testing scripts', function () {
    const lcp = new LoginCredentialsPage() //lcp --> login credentials page
    const arm = new AllReusableMethods()   //arm -->  all reusable methods
    const fail= new FailPage()              //fail--> fail page methods

    beforeEach(function () {            // this function will fetch the test data from fixture\testdata.json
        cy.fixture('testdata').then(function (data) {
            this.data = data;
        })
    })    

    it('US#565877 TC-01: Screen has title as "You have exceeded the number of allowed verification attempts."', function () {      
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.pageTitle()
    })

    it('US#565877 :TC-02:Verify that the "TRY AGAIN" link is available in WLGN - Choose a verification method Screen', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.verifyTryAgainLink()
    })
	
	it('US#565877 :TC-03:Verify that the "TRY AGAIN" link is clickable in WLGN - Choose a verification method Screen', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.clickTryAgainLink()
    })
	
	it('US#565877 :TC-04:Verify that the separation Line below TRY AGAIN link is visible in WLGN - Choose a verification method Screen', function () {
		fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.verifySeperateLine()
    })
	
	it('US#565877 :TC-05:Verify that the "Need Help?" below separation Line text is displayed in WLGN', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.verifySeperateLine()
		fail.verifyNeedHelpText()
    })
	
	it('US#565877 :TC-06:Verify that the CUSTOMER SUPPORT link is available in WLGN - Choose a verification method Screen', function () {
		fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.verifyCustomerSupportLink()
    })
	
	it('US#565877 :TC-07:Verify that the CUSTOMER SUPPORT link is clickable in WLGN - Choose a verification method Screen', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.clickCustomerSupportLink()
    })
	
	it('US#565877 :TC-10:Verify that user is able to scroll the page UP/DOWN on Enter your user ID and password to log in page', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        arm.scrollToTop()
        arm.scrollToBottom()
    });
	
	it('US#565877 :TC-11:Verify refresh functionality of the browser on Enter your user ID and password to log in page', function () {
        fail.pageLoad(this.data.releaseUrl)
        arm.pageWait()
        arm.pageReload()
    }) 

   it('US#565881 :TC-014:Verify that all links & buttons on the "You have exceeded the number of allowed verification attempts " page is clickable.', function () {
		fail.pageLoad(this.data.failUrl)
		arm.pageWait()
		fail.verifyCustomerSupportLink()
		fail.clickCustomerSupportLink()

	})
	
   it('US#565881 :TC-017:Verify that user is able to scroll the page UP/DOWN on  "You have exceeded the number of allowed verification attempts " page.', function () {
        lcp.pageLoad(this.data.failUrl)
        arm.pageWait()
        arm.scrollToTop()
        arm.scrollToBottom()
    })

   it('US#565881 :TC-015:Verify that all available text is properly visible on"You have exceeded the number of allowed verification attempts " page.', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.verifyNeedHelpText()
        fail.verifyCustomerSupportLink()

    })

   it('US#565878 :TC-007:CIAM - Develop - Try Again  Link on You have exceeded the number of allowed verification attempts.  Screen', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.clickTryAgainLink()

    })
 
   it('US#565878 :TC-008:CIAM - Develop - Try Again  Link on You have exceeded the number of allowed verification attempts.  Screen', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.clickTryAgainLink()

    })
   it('US#565881 :TC-010:Verify that user is able to scroll the page UP/DOWN on  "You have exceeded the number of allowed verification attempts " page.', function () {
        lcp.pageLoad(this.data.failUrl)
        arm.pageWait()
        arm.scrollToTop()
        arm.scrollToBottom()
    })
    

})