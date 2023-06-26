/// <reference types="cypress" />

describe('Browser',function(){

    it('cy.url() - get the current URL', () => {
        cy.visit('https://example.cypress.io/commands/location')
        cy.url().should('eq', 'https://example.cypress.io/commands/location')
      })

    it('Get browser information', () => {
        cy.visit('https://example.cypress.io/commands/location')
        cy.location().should((location) => {
          expect(location.hash).to.be.empty
          expect(location.href).to.eq('https://example.cypress.io/commands/location')
          expect(location.host).to.eq('example.cypress.io')
          expect(location.hostname).to.eq('example.cypress.io')
          expect(location.origin).to.eq('https://example.cypress.io')
          expect(location.pathname).to.eq('/commands/location')
          expect(location.port).to.eq('')
          expect(location.protocol).to.eq('https:')
          expect(location.search).to.be.empty
        })
      })

      it('Checking the hash', () => {
        // https://on.cypress.io/hash
        cy.hash().should('be.empty')
      })

      it('Moving using dropdown menues', () => {
        cy.visit('https://example.cypress.io')
        cy.get('.navbar-nav').contains('Commands').click()
        cy.get('.dropdown-menu').contains('Navigation').click()
      })

      it('Moving trough the browser: back and forwards', () => {
        //Stating website
        cy.visit('https://example.cypress.io')
        cy.get('.navbar-nav').contains('Commands').click()
        cy.get('.dropdown-menu').contains('Navigation').click()
        //Moving back and forwards
        cy.go('back')
        cy.go('forward')
        cy.go(-1)//Back
        cy.go(1)//Forward
      })

      it('Reload the page', () => {
        cy.visit('https://example.cypress.io/commands/navigation')
        cy.reload()
        cy.reload(true)//Reload without using the cache
      })

})