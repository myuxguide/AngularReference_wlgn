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
    const fail= new FailPage()

    beforeEach(function () {            // this function will fetch the test data from fixture\testdata.json
        cy.fixture('testdata').then(function (data) {
            this.data = data;
        })
    })

    it('US#565881 :TC-001:Verify user navigated to "You have exceeded the number of allowed verification attempts" page.', function () {
      fail.pageLoad(this.data.failUrl)
      arm.pageWait()
   })

   it('US#565881 :TC-002:Verify user navigated to new tab  when user click  "CUSTOMER SUPPORT LINK" on You have exceeded the number of allowed verification attempts Screen.(for- US)', function () {
       fail.pageLoad(this.data.failUrl)
       arm.pageWait()
       fail.clickCustomerSupportLink()

    })
    it('US#565878 :TC-001:Verify user navigated to "You have exceeded the number of allowed verification attempts" page.', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
     })
     it('US#565878 :TC-002:Verify user navigated to new tab  when user click  "CUSTOMER SUPPORT LINK" on You have exceeded the number of allowed verification attempts Screen.(for- US)', function () {
        fail.pageLoad(this.data.failUrl)
        arm.pageWait()
        fail.clickTryAgainLink()
 
     })
})