/// <reference types ="cypress" />

export default class AuthenticatePage {
    pageLoad(value) {
        cy.visit(value)
        return this
    }
    pageTitle() {
        const title = cy.get('#title')
        title.should('be.visible').contains(' Verify your identity ')
    }
    //this method will verify page subtitle text
    pageTitleText() {
        const text = cy.get('#verifySubtitleCall')
        text.should('be.visible').contains('Enter the code you received via phone call.')

    }

    verifyTestLink() {
        const createTestLink = cy.get('#verifyOptionsLink-btn')
        createTestLink.should('be.visible').contains('USE A DIFFERENT VERIFICATION METHOD')
    }

    clickTestLink() {
        const createTestLink = cy.get('#verifyOptionsLink-btn')
        createTestLink.should('be.visible').contains('USE A DIFFERENT VERIFICATION METHOD')
        createTestLink.click()
    }

    verifyEmailBtn() {
        const verifyEmailBtn = cy.get('[id="email-btn"]')
        verifyEmailBtn.contains('EMAIL').should('be.visible')
    }

    verifySmsBtn() {
        const verifySmsBtn = cy.get('[id="sms-btn"]')
        verifySmsBtn.contains('SMS TEXT').should('be.visible')
    }


    clickFirstBox() {
        const firstBox = cy.get('#input1').click()
    }

    //This method will enter value in second input box on the reset your password verification code page
    verifyRequestNewCodeLink() {
        const createTestLink = cy.get('#requestCode-btn')
        createTestLink.should('be.visible').contains('REQUEST NEW CODE')
    }

    clickRequestNewCodeLink() {
        const createTestLink = cy.get('#requestCode-btn')
        createTestLink.should('be.visible').contains('REQUEST NEW CODE')
        createTestLink.click()
    }

    //This method will verify first input box on the reset your authenticate page
    verifyFirstBox() {
        const firstBox = cy.get('#input1').should('be.visible')
    }
    //This method will enter value in first input box on the reset your authenticate page
    enterValueFirstBox(value) {
        const firstBox = cy.get('#input1')
        firstBox.should('be.visible')
        firstBox.clear()
        firstBox.type(value)
        return this
    }

    //This method will verify no value in Frist input box on the reset your authenticate page
    verifyNoValueFirstBox() {
        const firstBox = cy.get('#input1')
        firstBox.should('not.have.value')
    }

    //This method will verify second input box on the reset your password verification code page
    //This method will verify second input box on the reset your authenticate page
    verifySecondBox() {
        const secondBox = cy.get('#input2').should('be.visible')
    }

    //This method will enter value in second input box on the reset your authenticate page
    enterValueSecondBox(value) {
        const secondBox = cy.get('#input2')
        secondBox.should('be.visible')
        secondBox.clear()
        secondBox.type(value)
        return this
    }

    //This method will verify no value in Second input box on the reset your authenticate page
    verifyNoValueSecondBox() {
        const secondBox = cy.get('#input2')
        secondBox.should('not.have.value')
    }

    //This method will verify third input box on the reset your authenticate page
    verifyThirdBox() {
        const thirdBox = cy.get('#input3').should('be.visible')
    }
    //This method will enter value in third input box on the reset your authenticate page
    enterValueThirdBox(value) {
        const thirdBox = cy.get('#input3')
        thirdBox.should('be.visible')
        thirdBox.clear()
        thirdBox.type(value)
        return this
    }

    //This method will verify no value in Third input box on the reset your authenticate page
    verifyNoValueThirdBox() {
        const thirdBox = cy.get('#input3')
        thirdBox.should('not.have.value')
    }

    //This method will verify forth input box on the reset your authenticate page
    verifyFourthBox() {
        const fourthBox = cy.get('#input4').should('be.visible')
    }
    //This method will enter value in Fourth input box on the reset your authenticate page
    enterValueFourthBox(value) {
        const fourthBox = cy.get('#input4')
        fourthBox.should('be.visible')
        fourthBox.clear()
        fourthBox.type(value)
        return this
    }

    //This method will verify no value in Fourth input box on the reset your authenticate page
    verifyNoValueFourthBox() {
        const fourthBox = cy.get('#input4')
        fourthBox.should('not.have.value')
    }

    //This method will verify fifth input box on the reset your authenticate page
    verifyFifthBox() {
        const fifthBox = cy.get('#input5').should('be.visible')
    }
    //This method will enter value in Fifth input box on the reset your authenticate page
    enterValueFifthBox(value) {
        const fifthBox = cy.get('#input5')
        fifthBox.should('be.visible')
        fifthBox.clear()
        fifthBox.type(value)
        return this
    }

    //This method will verify no value in fift input box on the reset your authenticate page
    verifyNoValueFifthBox() {
        const fifthBox = cy.get('#input5')
        fifthBox.should('not.have.value')
    }

    verifySixthBox() {
        const sixthBox = cy.get('#input6').should('be.visible')
    }
    //This method will enter value in sixth input box on the reset your authenticate page
    enterValueSixthBox(value) {
        const sixthBox = cy.get('#input6')
        sixthBox.should('be.visible')
        sixthBox.clear()
        sixthBox.type(value)
        return this
    }

    //This method will verify no value in Sixth input box on the reset your password verification code page
    verifyNoValueSixthBox() {
        const sixthBox = cy.get('#input6')
        sixthBox.should('not.have.value')
    }

    verifySubmitBtn() {
        const verifySubmitBtn = cy.get('[id="submit-btn"]')
        verifySubmitBtn.contains(' SUBMIT ').should('be.visible')
    }

    clickSubmitBtn() {
        const verifySubmitBtn = cy.get('[id="submit-btn"]')
        verifySubmitBtn.contains(' SUBMIT ').should('be.visible')
        verifySubmitBtn.click()
    }

    //this method will verify code for code required error message
    verifyCodeRequiredError() {
        const errorMessage = cy.get('[class="fdx-c-form-group__checkbox fdx-u-mt--5"]')
        errorMessage.should('be.visible').contains('Please check this box if you want to proceed.')
    }

    VerifyTrustmeDeviceCheckbox() {
        const clickCheckBox = cy.get('#checkBoxLabel').contains(' Trust this device in the future')
    }

    clickTrustmeDeviceCheckbox() {
        const clickCheckBox = cy.get('#checkBoxLabel').click().find('#checkBox').check({ force: true })
    }

    //this method will verify the continue button in verification code screen
    verifySubmitButton() {
        const continuebutton = cy.get('#submit-btn')
        continuebutton.should('be.visible').contains(' SUBMIT ')
    }

    verifyDifferentVerificationButton() {
        const continuebutton = cy.get('#verifyOptionsLink-btn')
        continuebutton.should('be.visible').contains('USE A DIFFERENT VERIFICATION METHOD')
    }
    //this method will verify text in verification code screen 
    verifyPageReceiveCodeTitleText() {
        const text = cy.get('#didntReceiveCode')
        text.should('be.visible').contains('Didn’t receive a code?')

    }
    //this method will verify the Request New Code button in verification code screen 
    verifyRequestNewCodeButton() {
        const requestCodeButton = cy.get('#requestCode-btn')
        requestCodeButton.should('be.visible').contains('REQUEST NEW CODE')
    }
    //this method will click the Request New Code button in verification code screen  
    clickRequestNewCodeButton() {
        const requestCodeButton = cy.get('#requestCode-btn')
        requestCodeButton.should('be.visible').contains('REQUEST NEW CODE')
        requestCodeButton.click()
    }
    //this method will verify the horizontal line in verification code screen
    verifySeperateLine() {
        const line = cy.get('[class="fdx-c-line fdx-c-line--grey--dark-3 fdx-o-grid__item--11"]')
        line.should('be.visible')
    }
    //this method will verify the Retrieve user Id button in verification code screen
    verifyRetrieveUidButton() {
        const requestCodeButton = cy.get('#retrieveUid-btn')
        requestCodeButton.should('be.visible').contains('RETRIEVE USER ID')
    }
    //this method will click the Retrieve user Id button in verification code screen    
    clickRetrieveUidButton() {
        const requestCodeButton = cy.get('#retrieveUid-btn')
        requestCodeButton.should('be.visible').contains('RETRIEVE USER ID')
        requestCodeButton.click()
    }
    //this method will verify the NeedHelp text in verification code screen 
    verifyPageNeedHelpText() {
        const text = cy.get('[class="fdx-u-font-size--h4 fdx-u-text--light fdx-u-mb--0"]')
        text.should('be.visible')
    }
    //this method will verify the customerSupport button in verification code screen 
    verifyCustomerSupportButton() {
        const customerSupportButton = cy.get('#support-link')
        customerSupportButton.should('be.visible').contains('CUSTOMER SUPPORT')
    }
    //this method will click the customerSupport button in verification code screen    
    clickCustomerSupportButton() {
        const customerSupportButton = cy.get('#support-link')
        customerSupportButton.should('be.visible').contains('CUSTOMER SUPPORT')
        customerSupportButton.click()
    }
    verifyError() {
        const errorMessage = cy.get('[class="fdx-u-display--flex fdx-u-flex-justify-content--center fdx-u-pb--4"]')
        errorMessage.should('be.visible').contains('A 6-digit code is required.')
    }
    enterBackspaceFirstbox() {
        cy.get('#input1').type('{backspace}')
    }
    enterBackspaceSecondbox() {
        cy.get('#input2').type('{backspace}')
    }
    enterBackspaceThirdbox() {
        cy.get('#input3').type('{backspace}')
    }
    enterBackspaceFourthbox() {
        cy.get('#input4').type('{backspace}')
    }
    enterBackspaceFifthbox() {
        cy.get('#input5').type('{backspace}')
    }
    enterBackspaceSixthbox() {
        cy.get('#input6').type('{backspace}')
    }
    enterDeleteKeyFirstBox() {
        cy.get('#input1').type('{del}')
    }
    enterDeleteKeySecondBox() {
        cy.get('#input2').type('{del}')
    }
    enterDeleteKeyThirdBox() {
        cy.get('#input3').type('{del}')
    }
    enterDeleteKeyFourthBox() {
        cy.get('#input4').type('{del}')
    }
    enterDeleteKeyFifthBox() {
        cy.get('#input5').type('{del}')
    }
    enterDeleteKeySixthBox() {
        cy.get('#input6').type('{del}')
    }
    clickLeftArrowFirstBox() {
        const leftArrow = cy.get('#input1').focus().type('{leftarrow}')
    }

    //This method will verify cursor for first box
    verifyCursorFirstBox() {
        cy.focused().should('have.attr', 'id', 'input1')
    }
    clickLeftArrowSecondBox() {

        const leftArrow = cy.get('#input2').focus().type('{leftarrow}')
    }
    //This method will press left arrow on third box
    clickLeftArrowThirdBox() {

        const leftArrow = cy.get('#input3').focus().type('{leftarrow}')
    }
    //This method will verify cursor for second box
    verifyCursorSecondBox() {
        cy.focused().should('have.attr', 'id', 'input2')
    }
    clickLeftArrowFourthBox() {

        const leftArrow = cy.get('#input4').focus().type('{leftarrow}')
    }
    verifyCursorThirdBox() {
        cy.focused().should('have.attr', 'id', 'input3')
    }
    clickLeftArrowFifthBox() {

        const leftArrow = cy.get('#input5').focus().type('{leftarrow}')
    }

    verifyCursorFourthBox() {
        cy.focused().should('have.attr', 'id', 'input4')
    }
    clickLeftArrowSixthBox() {

        const leftArrow = cy.get('#input6').focus().type('{leftarrow}')
    }

    verifyCursorFifthBox() {
        cy.focused().should('have.attr', 'id', 'input5')
    }
    verifyCursorSixthBox() {
        cy.focused().should('have.attr', 'id', 'input6')
    }
    clickRightArrowFirstBox() {
        const rightArrrow = cy.get('#input1').focus().type('{rightarrow}')
    }
    clickRightArrowSecondBox() {
        const rightArrow = cy.get('#input2').focus().type('{rightarrow}')
    }
    clickRightArrowThirdBox() {
        const rightArrow = cy.get('#input3').focus().type('{rightarrow}')
    }
    clickRightArrowFourthBox() {
        const rightArrow = cy.get('#input4').focus().type('{rightarrow}')
    }

    clickRightArrowFifthBox() {
        const rightArrow = cy.get('#input5').focus().type('{rightarrow}')
    }
    clickRightArrowSixthBox() {
        const rightArrow = cy.get('#input6').focus().type('{rightarrow}')
    }
    enterUpArrowFirstBox() {
        cy.get('#input1').type('{uparrow}')
    }
    enterUpArrowSecondBox() {
        cy.get('#input2').type('{uparrow}')
    }
    enterUpArrowThirdBox() {
        cy.get('#input3').type('{uparrow}')
    }
    enterUpArrowFourthBox() {
        cy.get('#input4').type('{uparrow}')
    }
    enterUpArrowFifthBox() {
        cy.get('#input5').type('{uparrow}')
    }
    enterUpArrowSixthBox() {
        cy.get('#input6').type('{uparrow}')
    }
    enterDownArrowFirstBox() {
        cy.get('#input1').type('{downarrow}')
    }
    enterDownArrowSecondBox() {
        cy.get('#input2').type('{downarrow}')
    }
    enterDownArrowThirdBox() {
        cy.get('#input3').type('{downarrow}')
    }
    enterDownArrowFourthBox() {
        cy.get('#input4').type('{downarrow}')
    }
    enterDownArrowFifthBox() {
        cy.get('#input5').type('{downarrow}')
    }
    enterDownArrowSixthBox() {
        cy.get('#input6').type('{downarrow}')
    }
    verifyValueFirstBox(value) {
        const firstBox = cy.get('#input1')
        firstBox.should('have.value', value)
    }
    verifyValueSecondBox(value) {
        const firstBox = cy.get('#input2')
        firstBox.should('have.value', value)
    }
    verifyValueThirdBox(value) {
        const firstBox = cy.get('#input3')
        firstBox.should('have.value', value)
    }
    verifyValueFourthBox(value) {
        const firstBox = cy.get('#input4')
        firstBox.should('have.value', value)
    }
    verifyValueFifthBox(value) {
        const firstBox = cy.get('#input5')
        firstBox.should('have.value', value)
    }
    verifyValueSixthBox(value) {
        const firstBox = cy.get('#input6')
        firstBox.should('have.value', value)
    }

    verifyOtpError() {
        const invalidErrorMessage = cy.get('[class="fdx-c-form-message--error fdx-u-font-size--super-small fdx-u-mt--2 fdx-u-mb--2"]')
        invalidErrorMessage.should('be.visible').contains('Code is incorrect or has expired. Please reenter the code or request a new code.')
    }

    verifyinputBoxColour() {
        const inputboxclr = cy.get('#input1').should('have.css', 'background-color', 'rgb(255, 255, 255)')

    }

    verifyinputBox2Colour() {
        const inputboxclr = cy.get('#input2').should('have.css', 'background-color', 'rgb(255, 255, 255)')

    }

    verifyinputBox3Colour() {
        const inputboxclr = cy.get('#input3').should('have.css', 'background-color', 'rgb(255, 255, 255)')

    }

    verifyinputBox4Colour() {
        const inputboxclr = cy.get('#input4').should('have.css', 'background-color', 'rgb(255, 255, 255)')

    }

    verifyinputBox5Colour() {
        const inputboxclr = cy.get('#input5').should('have.css', 'background-color', 'rgb(255, 255, 255)')

    }

    verifyinputBox6Colour() {
        const inputboxclr = cy.get('#input6').should('have.css', 'background-color', 'rgb(255, 255, 255)')

    }

    clickSecondBox() {
        const firstBox = cy.get('#input2').click()
    }
    pageTitleTextforSMS() {
        const text1 = cy.get('#SubtitleNumberOne')
        text1.should('be.visible').contains('Enter the code we texted to the number on your profile')
        cy.contains(' (***-***-1234). ')
        const text2 = cy.get('#SubtitleNumberTwo')
        text2.should('be.visible').contains('Verification codes sent via text are valid for 10 minutes.')

    }

    pageTitleTextforEmail() {
        const text1 = cy.get('#SubtitleCallOne')
        text1.contains('Enter the code we sent to the email on your profile')
        cy.contains(' (sh****@g*****.com). ')
        const text2 = cy.get('#SubtitleCallTwo')
        text2.should('be.visible').contains('Verification codes sent via email are valid for 10 minutes.')

    }

    pageTitleTextforPhone() {
        const text1 = cy.get('#SubtitlePhoneOne')
        text1.contains('Enter the code we sent to the phone number on your profile')
        cy.contains(' (***-***-1234). ')
        const text2 = cy.get('#SubtitlePhoneTwo')
        text2.should('be.visible').contains('Verification codes sent via phone are valid for 10 minutes.')

    }

    //This method will verify question mark icon on the authenticate page
    verifyQuestionMark() {
        cy.get('.fdx-c-icon').should('be.visible')
    }

    //This method will verify the text present inside tooltip box on the authenticate page
    hoverQuestionMark() {
        cy.get('.fdx-c-icon').click({ force: true })
        cy.get('.fdx-c-tooltip__main__body').should('be.visible').contains('You will not be asked for a verification code for this device in the future')
    }

    //This method will verify checkbox is checked on the authenticate page
    verifyCheckBoxChecked() {
        cy.get('#checkBox').check({ force: true }).should('be.checked')
    }

    //This method will verify checkbox is unchecked on the authenticate page
    verifyCheckBoxUnChecked() {
        cy.get('#checkBox').uncheck({ force: true }).should('not.be.checked')
    }

}