
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
      
  it('US#545051:TC-02:"Verify whether the customer support button is clickable or not on Account Locked Temporarily Page. " page', function () {
     
    lcp.pageLoad(this.data.lockedScreenUrl)
    al.pageTitle()
    al.clickCustomerSuportLink()
   
    
})
  
it('US#546680:TC-02:"Verify whether the forgot your user id or password button is clickable or not on Account Locked Temporarily Page" page', function () {
     
    lcp.pageLoad(this.data.lockedScreenUrl)
    al.pageTitle()
    al.clickForgotButton()
    
    
})
it('US#546680:TC-03:"Verify user is navigating to forgot your user id or password page after clicking the reset id password button in account locked temporarily page" page', function () {
     
    lcp.pageLoad(this.data.lockedScreenUrl)
    al.pageTitle()
    al.clickForgotButton()
    arm.verifyPageUrl(this.data.loginSolutionsUrl)
    
})

})