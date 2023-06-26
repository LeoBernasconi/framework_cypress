/// <reference types="cypress" />

describe('Windows', function(){

    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/window')
    })
    
    it('cy.window() - get the global window object', () => {
        // https://on.cypress.io/window
        cy.window().should('have.property', 'top')
    })
    
    it('cy.document() - get the document object', () => {
        // https://on.cypress.io/document
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })
    
    it('Title', () => {
        // https://on.cypress.io/title
        cy.title().should('include', 'Kitchen Sink')
    })

    it('Viewport: set a windows size', () => {
        cy.visit('https://example.cypress.io/commands/viewport')
        cy.viewport(320, 480)
        cy.viewport(2999, 2999)
      })

    it('Viewport: Simulating a device size', ()=>{
        cy.visit('https://example.cypress.io/commands/viewport')
        cy.viewport('macbook-15')
        cy.wait(200)
        cy.viewport('macbook-13')
        cy.wait(200)
        cy.viewport('macbook-11')
        cy.wait(200)
        cy.viewport('ipad-2')
        cy.wait(200)
        cy.viewport('ipad-mini')
        cy.wait(200)
        cy.viewport('iphone-6+')
        cy.wait(200)
        cy.viewport('iphone-6')
        cy.wait(200)
        cy.viewport('iphone-5')
        cy.wait(200)
        cy.viewport('iphone-4')
        cy.wait(200)
        cy.viewport('iphone-3')
        cy.wait(200)
        cy.viewport('ipad-2', 'portrait')
        cy.wait(200)
        cy.viewport('iphone-4', 'landscape')
        cy.wait(200)
        //Other devices at https://docs.cypress.io/api/commands/viewport
    })

    it.only('.add() - create a custom command', () => {
        Cypress.Commands.add('console', {
          prevSubject: true,
        }, (subject, method) => {
        // the previous subject is automatically received
        // and the commands arguments are shifted
  
          // allow us to change the console method used
          method = method || 'log'
  
          // log the subject to the console
          console[method]('The subject is', subject)
  
          // whatever we return becomes the new subject
          // we don't want to change the subject so
          // we return whatever was passed in
          return subject

          cy.get('button').console('info').then(($button) => {
            // subject is still $button
            })
        })
    })

})