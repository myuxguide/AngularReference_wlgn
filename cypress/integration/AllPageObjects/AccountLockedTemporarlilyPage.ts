/// <reference types ="cypress" />

export default class AccountIsLocked {


    pageTitle()
    {
        const title = cy.get('#yourAccountLocked-title', {timeout:10000})
        title.contains(' Your account is locked temporarily. ')
    }

    pageTitleText()
    {
        const text = cy.get('#subtitle-text', {timeout:10000})
        text.contains('You exceeded the maximum number of failed login attempts. We have locked your account to prevent unauthorized access. You may attempt to log in again in 1 hour').should('be.visible')
    }
    verifySeperateLine() {
        const line = cy.get('[class="fdx-c-line fdx-c-line--default fdx-o-grid__item--9"]')
        line.should('be.visible')
    }
    verifyNeedHelpGainingAccessButton() {
        const needHelpGainingAccessButton = cy.get('#needHelpGainingAcess',{timeout:10000})
        needHelpGainingAccessButton.should('be.visible').contains('Need help gaining access to your account?')
    }

     verifyForgotButton()
    {
        const forgotButton = cy.get('#requestCode-btn',{timeout:10000})
        forgotButton.should('be.visible').contains('FORGOT YOUR USER ID OR PASSWORD?')
    }

    verifyCustomerSuportLink()
    {
        const customerSuportLink = cy.get('#support-link',{timeout:10000})
        customerSuportLink.should('be.visible').contains('CUSTOMER SUPPORT')
    }

    clickForgotButton()
    {
        const forgotButton = cy.get('#requestCode-btn',{timeout:10000})
        forgotButton.click()
    }
    
    clickCustomerSuportLink()
    {
        const customerSuportLink = cy.get('#support-link',{timeout:10000})
        customerSuportLink.should('be.visible').contains('CUSTOMER SUPPORT')
        customerSuportLink.click()
    }
 
}

