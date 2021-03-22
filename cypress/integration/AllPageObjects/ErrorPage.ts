/// <reference types="cypress"  />

export default class ErrorPage {
    pageLoad(value) {
        cy.visit(value)
        return this
    }
    pageTitle() {
        const title = cy.get('#title', { timeout: 10000 })
        title.contains(' We are having trouble establishing a connection. Please refresh the page. ').should('be.visible')
    }

}

