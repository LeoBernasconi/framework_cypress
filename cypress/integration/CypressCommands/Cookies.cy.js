/// <reference types="cypress" />

describe('Cookies', function(){

  beforeEach(() => {
    Cypress.Cookies.debug(true)
    cy.visit('https://example.cypress.io/commands/cookies')
    cy.clearCookies()
  })

  it('Get and validate a cookie', () => {
    cy.get('#getCookie .set-a-cookie').click()
    cy.getCookie('token').should('have.property', 'value', '123ABC')
  })

  it('Get and specific cookie', () => {
    cy.getCookie('auth_key')
  })

  it('Validate value of a cookie', () => {
    cy.get('#getCookies .set-a-cookie').click()
    cy.getCookies().should('have.length', 1).should((cookies) => {
      // each cookie has these properties
      expect(cookies[0]).to.have.property('name', 'token')
      expect(cookies[0]).to.have.property('value', '123ABC')
      expect(cookies[0]).to.have.property('httpOnly', false)
      expect(cookies[0]).to.have.property('secure', false)
      expect(cookies[0]).to.have.property('domain')
      expect(cookies[0]).to.have.property('path')
    })
  })

  it('Clear cookies and validate that there are none', () => {
    cy.clearCookies()
    cy.getCookies().should('be.empty')
  })

  it('Clear a specific cookie and validate that there are none', () => {
    cy.clearCookie('token').should('be.null')
    cy.getCookie('token').should('be.null')
  })

  it('cy.getAllCookies() - get all browser cookies', () => {
    cy.setCookie('key', 'value')
    cy.setCookie('key', 'value', { domain: '.example.com' })
    cy.getAllCookies().should('have.length', 2).should((cookies) => {
      // each cookie has these properties
      //Cookie 1
      expect(cookies[0]).to.have.property('name', 'key')
      expect(cookies[0]).to.have.property('value', 'value')
      expect(cookies[0]).to.have.property('httpOnly', false)
      expect(cookies[0]).to.have.property('secure', false)
      expect(cookies[0]).to.have.property('domain')
      expect(cookies[0]).to.have.property('path')
      //Cookie 2
      expect(cookies[1]).to.have.property('name', 'key')
      expect(cookies[1]).to.have.property('value', 'value')
      expect(cookies[1]).to.have.property('httpOnly', false)
      expect(cookies[1]).to.have.property('secure', false)
      expect(cookies[1]).to.have.property('domain', '.example.com')
      expect(cookies[1]).to.have.property('path')
    })
  })

  it('cy.setCookie() - set a browser cookie', () => {
    cy.setCookie('team', 'Ferro')
    cy.getCookie('team').should('have.property', 'value', 'Ferro')
  })

})