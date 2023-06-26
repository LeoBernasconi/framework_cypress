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

    it('Wait for a specific time (milliseconds)', () => {
        cy.wait(1000)
    })

    it('Wait for a API response', () => {
        cy.visit('https://example.cypress.io/commands/waiting')
        cy.intercept('GET', '**/comments/*').as('getComment')
        cy.get('.network-btn').click()
        cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
      })

    it('Changing a configuration on the go, anda validating it', () => {
        //Example with page load timeout
        Cypress.config('pageLoadTimeout', 20000)
        expect(Cypress.config('pageLoadTimeout')).to.eq(20000)
        //Other commands may be change, among others
        Cypress.config('animationDistanceThreshold', 5)
        Cypress.config('baseUrl', null)
        Cypress.config('defaultCommandTimeout', 4000)
        Cypress.config('requestTimeout', 5000)
        Cypress.config('viewportHeight', 30000)
        Cypress.config('pageLoadTimeout', 660)
        Cypress.config('viewportWidth', 1000)
        Cypress.config('pageLoadTimeout', 60000)
        Cypress.config('waitForAnimations', true)
    })

    it('Get Cypress info', () => {
        console.log(Cypress.platform)
        console.log(Cypress.version)
    })

    it('Get Spec information', () => {
        console.log(Cypress.spec.name)
        console.log(Cypress.spec.relative)
        console.log(Cypress.spec.absolute)
        console.log(Cypress.spec.specType)
        cy.wrap(Cypress.spec).should('include.keys', ['name', 'relative', 'absolute'])
    })

    it('Environment variables: set and get', () => {
        cy.visit('https://rahulshettyacademy.com/locatorspractice/')
        //Setting simple variable
        Cypress.env('pass', 'Vaso2424')
        //Setting variables using a json
        Cypress.env({
            user: 'leobernasconi@gmail.com',
            type: 'website',
        })
        //Validating environment variable
        expect(Cypress.env()).to.have.property('user', 'leobernasconi@gmail.com')
        expect(Cypress.env()).to.have.property('pass', 'Vaso2424')
        //Using the environment variables
        cy.get('#inputUsername').type(Cypress.env('user'))
        cy.get('input[name="inputPassword"]').type(Cypress.env('pass'))
    })


})