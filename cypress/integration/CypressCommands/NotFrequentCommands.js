/// <reference types="cypress" />

describe('Not requent commands',function(){

    it('Make an element visible',()=>{
        cy.visit('https://example.cypress.io/commands/connectors')
        cy.get('.connectors-div').should('not.be.visible')
        //Use invoke (show) to show the element
        cy.get('.connectors-div').invoke('show')
        cy.get('.connectors-div').should('be.visible')
    })

    it('Submit a form', () => {
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('#couponCode1').clear().type('654')
        cy.get('.action-form').submit()
      })

    it('Select a value of a input-range element', () => {
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('.trigger-input-range').invoke('val', 60).trigger('change')
    })

    it('Wait (milliseconds)', () => {
        cy.wait(1000)
    })


})