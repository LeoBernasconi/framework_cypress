/// <reference types="cypress" />
const requiredExample = require('../../fixtures/files.json')

describe('Files', function(){

    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/files')
        cy.fixture('files.json').as('files')//Load the file
      })

    it('Load a fixture', () => {
        cy.intercept('GET', '**/comments/*', { fixture: 'files.json' }).as('getComment')
        cy.get('.fixture-btn').click()
        cy.wait('@getComment').its('response.body')
            .should('have.property', 'name')
            .and('include', 'Using fixtures to represent data')
    })

    it('Create and write a file based on a response', () => {
        cy.request('https://jsonplaceholder.cypress.io/users').then((response) => {
            cy.writeFile('cypress/fixtures/users.json', response.body)
        })
        //Validate the value of the 1st row in the file
        cy.fixture('users').should((users) => {
            expect(users[0].name).to.exist
        })
    })

    it('Create and write a file based on hardcoaded text', () => {
        cy.writeFile('cypress/fixtures/profile.json', {
            id: 123,
            name: 'Ferro',
            email: 'ferro@gmail.com',
        })
        //Validate the name of the file
        cy.fixture('profile').should((profile) => {
            expect(profile.name).to.eq('Ferro')
        })
    })

})