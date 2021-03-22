/// <reference types="cypress"  />

export default class ChooseVarificationScreenPage {
    pageLoad(value) {
        cy.visit(value)
        return this
    }

    PageTitle(){
        cy.get('#verifyMethodSubtitle').should('be.visible').contains(' We\'ll send you a verification code using the contact information on your profile. ')
    }

    // verifyTestLink() {
    //     const createTestLink = cy.get('#testLink-btn')
    //     createTestLink.should('be.visible').contains('Test Link')
    // }

    // clickTestLink() {
    //     const createTestLink = cy.get('#testLink-btn')
    //     createTestLink.should('be.visible').contains('Test Link')
    //     createTestLink.click()
    // }

    verifyPageTitle() {
        const pageTitle = cy.get('#verifyMethodTitle')
        pageTitle.should('be.visible').contains(' Choose a verification method ')
    }

    verifyPageSubTitle() {
        const pageSubTitle = cy.get('#verifyMethodSubtitle')
        pageSubTitle.should('be.visible').contains(" We'll send you a verification code using the contact information on your profile. ")
    }

    verifyNotPageTitle() {
        const pageTitle = cy.get('#verifyMethodTitle')
        pageTitle.should('not.be.visible')
    }

    verifySmsButton() {
        const email = cy.get('[id="sms-btn"]')
        email.contains('EMAIL').should('be.visible')
    }

    clickSmsButton() {
        const emailButton = cy.get('[id="sms-btn"]')
        emailButton.should('be.visible').contains(' SMS TEXT')
        emailButton.click()
    }

    verifyEmailButton() {
        const email = cy.get('[id="email-btn"]')
        email.contains('SMS TEXT').should('be.visible')
    }

    clickEmailButton() {
        const emailButton = cy.get('[id="email-btn"]')
        emailButton.should('be.visible').contains(' EMAIL')
        emailButton.click()
    }

    verifyConfirmButton() {
        const confrimButton = cy.get('#confirm-btn')
        confrimButton.should('be.visible').contains(' CONFIRM ')
    }

    verifyConfirmButtonEnabled() {
        const confrimButton = cy.get('#confirm-btn').should('be.enabled')
    }

    clickConfirmButton() {
        const confrimButton = cy.get('#confirm-btn')
        confrimButton.should('be.visible').contains(' CONFIRM ')
        confrimButton.click()
    }

    verifyCancelButton() {
        const cancelButton = cy.get('[id="cancelBtn"]').scrollIntoView().should('be.visible')
        cancelButton.contains('CANCEL').should('be.visible')
    }

    verifyPhoneButton() {
        const phone = cy.get('#phone-btn')
        phone.contains('PHONE CALL').should('be.visible')
    }
    verifyPhoneButtonNotDisplayed() {
        const phone = cy.get('#phone-btn')
        phone.should('not.be.visible')
    }
    verifyPhoneFormat() {
        const phone = cy.get('[id="phoneResponse"]')
        phone.should('be.visible')
    }


    verifyEmailButtonPrimary() {
        const email = cy.get('[id="email-btn"]')
        email.contains('EMAIL').should('be.visible')
    }

    verifyEmailButtonNotDisplayed() {
        const email = cy.get('[id="email-btn"]')
        email.should('not.be.visible')
    }
    verifyEmailFormat() {
        const emailFormat = cy.get('[id="emailResponse"]')
        emailFormat.should('be.visible')
    }


    verifySmsButtonPrimary() {
        const sms = cy.get('[id="sms-btn"]')
        sms.contains('SMS TEXT').should('be.visible')
    }

    verifySmsButtonNotDisplayed() {
        const sms = cy.get('[id="sms-btn"]')
        sms.should('not.be.visible')
    }

    verifySmsFormat() {
        const sms = cy.get('[id="smsResponse"]')
        sms.should('be.visible')
    }


    clickCancelButton() {
        const createCancelButton = cy.get('#cancelBtn').scrollIntoView()
        createCancelButton.click()
    }


}