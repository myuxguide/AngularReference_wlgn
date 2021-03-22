/**
 * This test suite is for PI05-Sprint05:: Automation scripts
 * Author - Girija (3981341)
 * Date- 01/02/2021
 */


/// <reference types ="cypress" />

// import all clasees which are required for this suite

import AllReusableMethods from '../AllPageObjects/AllReusableMethods'
import LoginCredentialsPage from '../AllPageObjects/Login_CredentialsPage'
import ErrorPage from '../AllPageObjects/ErrorPage'


describe('PI05_sprint05:Automation testing scripts', function () {
    const lcp = new LoginCredentialsPage() //lcp --> login credentials page
    const arm = new AllReusableMethods()   //arm -->  all reusable methods
    const error = new ErrorPage()              //Error--> Error page methods

    beforeEach(function () {            // this function will fetch the test data from fixture\testdata.json
        cy.fixture('testdata').then(function (data) {
            this.data = data;
        })
    })

    it('US#631522 :TC-1:Verify refresh functionality of the browser on Error page', function () {
        error.pageLoad(this.data.mockReleaseUrl)
        lcp.enterUserID(this.data.errorUserName)
        lcp.enterPassword(this.data.password)
        lcp.clickLoginButton()
        arm.pageWait()
        arm.verifyPageUrl(this.data.errorUrl)
        error.pageTitle()
        arm.pageReload()
        arm.verifyPageUrl(this.data.releaseUrl)
    })

    it('US#631522 :TC-1:Verify browser back click functionality of the browser on Error page', function () {
        error.pageLoad(this.data.mockReleaseUrl)
        lcp.enterUserID(this.data.errorUserName)
        lcp.enterPassword(this.data.password)
        lcp.clickLoginButton()
        arm.pageWait()
        arm.verifyPageUrl(this.data.errorUrl)
        error.pageTitle()
        arm.browserBackButton()
        arm.pageWait()
        arm.verifyPageUrl(this.data.releaseUrl)
    })


})