
export default class AllReusableMethods {


    verifyHomePageTitle(value) {
        const currentpagetitle = cy.title().should('eq', value)
    }

    verifyPageUrl(value) {
        const currentpageurl = cy.url().should('include', value)
    }

    scrollToBottom() {
        cy.scrollTo('bottom')
        const bottomtitle = cy.get('.caas-c-footer__bottom__title')
        bottomtitle.should('be.visible')
    }

    scrollToTop() {
        cy.scrollTo('top')
        const toptitle = cy.get('.fxg-header__logo')
        toptitle.should('be.visible')
    }

    LanguageDropDownClickForSpanish(){

        cy.get('#dropdownMenu').click()
        cy.get(':nth-child(2) > .caas-c-footer__dropdown__menu__link').click({ multiple: true })

    }
    
    VerifyCustomerSupportESPLink(value){
        
        cy.window().then(win => {
            const stub = cy.stub(win, 'open').as('windowopen')
        })
        cy.get('#support-link').invoke('removeAttr', '_blank').click()
        cy.get('@windowopen').should('be.calledWith', value)

    }

    VerifyHomePageLink(value){
        
        cy.window().then(win => {
            const stub = cy.stub(win, 'open').as('windowopen')
        })
        cy.get('#submit-btn').invoke('removeAttr', '_blank').click()
        cy.get('@windowopen').should('be.calledWith', value)

    }

    pageReload() {
        cy.reload()
    }
    pageWait(){
        cy.wait(10000)
    }

    browserBackButton() {
        cy.go('back')
    }

    browserForwordButton() {
        cy.go('forward')
    }

}
