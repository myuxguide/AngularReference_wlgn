/**
 * This test suite is for PI01.1:: Functional Automation scripts US#545068
 * Author - Jimish Shah (3981340)
 * Date- 02/05/2021
 */

/// <reference types ="cypress" />

import AllReusableMethods from '../AllPageObjects/AllReusableMethods'
import ChooseVarificationScreenPage from '../AllPageObjects/ChooseVarificationScreenPage'
import LoginCredentialsPage from '../AllPageObjects/Login_CredentialsPage'

describe('PI-01.2- CIAM Verify that the Cancel button is available in WLGN - Choose a verification method Screen', function(){

    let arm = new AllReusableMethods()      //arm => All Reusable Method
    let cvs = new  ChooseVarificationScreenPage() //cvs => Choose Verification Screen Page
    const lcp = new LoginCredentialsPage() //lcp --> login credentials page

    beforeEach(function () {            // this function will fetch the test data from fixture\testdata.json
        cy.fixture('testdata').then(function (data) {
            this.data = data;
        })
    })

    // it('US#545067 :TC-001: Verify that user navigate  to "Choose a verification method " Screen', function () {
    //     lcp.pageLoad(this.data.releaseUrl)
    //     arm.pageWait()
    //     cvs.verifyTestLink()
    //     cvs.clickTestLink()
    //     cvs.verifyPageTitle()
    //  })

    // it('US#545067 :TC-002: Verify that User should get the code as per selected Verification Code option once user click on CONFIRM button on "Choose a verification method " Screen.', function () {
    //     lcp.pageLoad(this.data.releaseUrl)
    //     arm.pageWait()
    //     cvs.verifyTestLink()
    //     cvs.clickTestLink()
    //     cvs.clickEmailButton()
    //     cvs.clickConfirmButton()
    //     cy.request('POST', this.data.WiremockURLpin, this.data.mockDataPin).then((response) => {
    //         expect(response.status).equal(200)
    //     })
    //  })
    //  it('US#545067 :TC-006: Verify that CONFIRM Button is enabled only when user select any one of the Verification Option in Popup.', function () {
    //     lcp.pageLoad(this.data.releaseUrl)
    //     arm.pageWait()
    //     cvs.verifyTestLink()
    //     cvs.clickTestLink()
    //     cvs.clickEmailButton()
    //     cvs.verifyConfirmButton()
    //     cvs.verifyConfirmButtonEnabled()
    //  })
    //  it('US#545067 :TC-007: Verify that "Choose a verification method" Screen get closed once user clicks on CONFIRM Button.', function () {
    //     lcp.pageLoad(this.data.releaseUrl)
    //     arm.pageWait()
    //     cvs.verifyTestLink()
    //     cvs.clickTestLink()
    //     cvs.clickEmailButton()
    //     cvs.clickConfirmButton()
    //     arm.pageWait()
    //     cvs.verifyNotPageTitle()
    //  })
    //  it('US#545067 :TC-009: Verify that user Navigates to "Error Page" when No Response is generated in Wiremock/API Failure.', function () {
    //     lcp.pageLoad(this.data.releaseUrl)
    //     arm.pageWait()
    //     cvs.verifyTestLink()
    //     cvs.clickTestLink()
    //     cvs.clickSmsButton()
    //     cvs.clickConfirmButton()
    //     arm.pageWait()
    //     arm.verifyPageUrl(this.data.errorUrl);
    //  })

    //  it('US#545068 :TC_001_Verify that the "CANCEL" is clickable in WLGN - Verification Method Screen ', function(){
    //     cvs.pageLoad(this.data.releaseUrl)
    //     arm.pageWait()
    //     cvs.clickTestLink()
    //     cvs.clickCancelButton()
    // })
     
})