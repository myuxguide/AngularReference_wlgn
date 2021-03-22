/// <reference types="cypress"  />

export default class LoginCredentialsPage {
    pageLoad(value) {
        cy.visit(value)
        return this
    }

    pageTitle() {
        const title = cy.get('#title',{timeout:10000})
        title.contains('Enter your user ID and password to log in').should('be.visible')
    }

    pageTitleText() {
        const text = cy.get('#userIDSubTitle',{timeout:10000})
        text.contains('Don\'t have a user ID?').should('be.visible')
    }

    verifyCreateOneLink() {
        const createOneLink = cy.get('[class="fdx-c-link"]')
        createOneLink.should('be.visible').contains('Create one')
    }

    clickCreateOneLink() {

        const createOneLink = cy.get('[class="fdx-c-link"]')
        createOneLink.should('be.visible').contains('Create one')
        createOneLink.click()

    }

    verifyUserID() {
        const userid = cy.get('#userId',{timeout:10000}).should('be.visible').click()
    }

    VerifyUserIdLabel() {
        const useridLabel = cy.get('#userIdLabel',{timeout:10000})
        useridLabel.should('be.visible').contains('user ID')
    }

    enterUserID(value) {
        const userid = cy.get('#userId',{timeout:10000})
        userid.should('be.visible')
        userid.clear()
        userid.type(value)
        return this
    }

    verifyPassword() {
        const password = cy.get('#password').should('be.visible').click()
    }

    verifyPasswordLabel() {
        const passwordLabel = cy.get('#passwordLabel')
        passwordLabel.should('be.visible').contains('password')
    }

    enterPassword(value) {
        const password = cy.get('#password',{timeout:10000})
        password.should('be.visible')
        password.clear()
        password.type(value)
        return this
    }

    verifyLoginButton() {
        const logInButton = cy.get('#login-btn')
        logInButton.contains(' Log in ').should('be.visible')
    }

    // To verify submit button is clickable
    clickLoginButton() {
        const logInButton = cy.get('#login-btn')
        logInButton.contains(' Log in ').should('be.visible').click()

    }

    VerifyLoginButtonColour() {
        const Loginbtncolour = cy.get('#login-btn')
        Loginbtncolour.should('have.css', 'background-color', 'rgb(255, 98, 0)')

    }

    VerifyLoginAlert() {
        const alert = cy.get('#invalidCredentials')
        alert.should('have.text',' Login incorrect. Either the user ID or password combination is incorrect or the account has been locked. Please try again or reset your password. ')
    }

    VerifyUseridandPasswordError() {
        const error = cy.get('#numCharError')
        error.should('have.text',' Both user ID and password are required to log in. ')
    }

    verifyForgotUserIdButton() {
        const forgotUserId = cy.get('#requestCode-btn')
        forgotUserId.contains('FORGOT YOUR USER ID OR PASSWORD').should('be.visible')
    }

    clickForgotUserIdButton() {
        const forgotUserId = cy.get('#requestCode-btn')
        forgotUserId.contains('FORGOT YOUR USER ID OR PASSWORD').should('be.visible')
        forgotUserId.click()
    }

    verifyRemembermeOnDevice() {
        const Remember = cy.get('#checkBoxLabel').should('be.visible')
    }

    verifyNeedHelpText() {
        const needhelptext = cy.get('.fdx-u-font-size--h4')
        needhelptext.contains(' Need help? ').should('be.visible')
    }

    verifyCustomerSupportLink() {
        const customerSupportLink = cy.get('[class="fdx-c-button fdx-c-button--text fdx-u-mb--7 fdx-u-cursor--pointer"]')
        customerSupportLink.contains('CUSTOMER SUPPORT').should('be.visible')
    }

    clickCustomerSupportLink() {
        const customerSupportLink = cy.get('[class="fdx-c-button fdx-c-button--text fdx-u-mb--7 fdx-u-cursor--pointer"]')
        customerSupportLink.contains('CUSTOMER SUPPORT').should('be.visible')
        customerSupportLink.click()
    }

    //To verify incorrect values error message
    verifyIncorrectValuesError() {
        const alert = cy.get('#invalidCredentials')
        alert.should('have.text',' Login incorrect. Either the user ID or password combination is incorrect or the account has been locked. Please try again or reset your password. ')
    }

    verifyEnterUserIdValue(value) {
        const userid = cy.get('#userId')
        userid.should('have.value', value)

    }
    verifyPasswordValue(value) {
        const password = cy.get('#userId')
        password.should('have.value', value)

    }
    clickRememberMeCheckBox() {
        const clickCheckBox = cy.get('[class="fdx-c-form-group fdx-c-form-group--checkbox"]').click().find('#checkBox').check({force: true})
    }
    verifyShowButton(){
        const showButton = cy.get('#hideShow-btn')
        showButton.contains('SHOW').should('be.visible')
        
    }
    clickShowButton(){
        const showButton = cy.get('#hideShow-btn')
        showButton.contains('SHOW').should('be.visible')
        showButton.click()
    }

}