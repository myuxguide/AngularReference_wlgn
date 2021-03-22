/// <reference types="cypress"  />

export default class FailPage {
    pageLoad(value) {
        cy.visit(value)
        return this
    }
    pageTitle() {
        const title = cy.get('#fail-title',{timeout:10000})
        title.contains(' You have exceeded the number of allowed verification attempts. ').should('be.visible')
    }
    verifyTryAgainLink() {
        const createOneLink = cy.get('#try-again',{timeout:10000})
        createOneLink.should('be.visible').contains('TRY AGAIN')
    }

    clickTryAgainLink() {
        const createOneLink = cy.get('#try-again')
        createOneLink.should('be.visible').contains('TRY AGAIN')
        createOneLink.click()

    }
	
	verifySeperateLine() {
        const line = cy.get('[class="fdx-c-line fdx-c-line--default fdx-o-grid__item--10"]')
        line.should('be.visible')
    }

    verifyNeedHelpText() {
        const needhelptext = cy.get('.fdx-u-font-size--h4')
        needhelptext.contains(' Need help? ').should('be.visible')
    }

    verifyCustomerSupportLink()
    {
        const customerSuportLink = cy.get('#support-link')
        customerSuportLink.should('be.visible').contains('CUSTOMER SUPPORT')
    }

    clickCustomerSupportLink() {
        const customerSuportLink = cy.get('#support-link')
        customerSuportLink.should('be.visible').contains('CUSTOMER SUPPORT')
        customerSuportLink.click()
    }
}

