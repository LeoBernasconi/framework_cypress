/// <reference types="Cypress" />

describe('Identify elements', function(){

  it('Identifying elements: using attributes',()=>{
    cy.visit('https://example.cypress.io/commands/actions')
    //Class
    cy.get('.action-email').should('exist')//Not declaring element type
    cy.get('input.action-email').should('exist')//Declaring element type: input
    //Id
    cy.get('#email1').should('exist')//Not declaring element type
    cy.get('input#email1').should('exist')//Declaring element type: input
    //Xpath
    cy.get('*[type="email"]').should('exist')//Not declaring element type
    cy.get('input[type="email"]').should('exist')//Declaring element type: input
    //CSS
    cy.get('input[type="email"]').clear().type('Leopa 1')//Indicating element type
    cy.wait(1000)
    cy.get('*[type="email"]').clear().type('Leopa 2')//Without indicating element type
    //Contains
    cy.contains('Submit').should('exist')
    //Identify an array and navigate throw items
    cy.get('input[value="checkbox1"]').eq(0).check()
    cy.get('input[value="checkbox1"]').eq(1).check()
    cy.get('input[value="checkbox1"]').eq(2).check()
    //cy.get('input[value="checkbox1"]').eq(3).check() --> Not existent element --> FAIL
  })

  it('Identifying elements: Partial value  in the attribute',()=>{
    //Id like "some_value_65498736123"
    cy.get('div[id^="some_value-"]')
  })

  it('Identifying element: parent and children',()=>{
    cy.visit('https://example.cypress.io/todo')
    //Get the children by element type (indicanting the element typ (li))
    cy.get('.todo-list li').should('exist')
    //Get the parent
    cy.contains('Pay electric bill').parent().should('exist')
    //Find a specific children given a parent element
    cy.get('.filters').contains('Completed').should('exist')
    cy.contains('Pay electric bill').parent().find('.destroy').should('exist')
    //Another example of parent
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.traversal-mark').parent().should('contain', 'Morbi leo risus')
    //Parent until: search for parent until mathing the choosen one
      cy.get('.clothes-nav').find('.active').parentsUntil('.clothes-nav').should('have.length', 2)
  })

  it('Identifying element: First and last',()=>{
    cy.visit('https://example.cypress.io/todo')
    //Get the first and last element of an array of elements 
    cy.get('.todo-list li').first().should('exist')//First
    cy.get('.todo-list li').last().should('exist')//Last
    //Another example
    cy.visit('https://example.cypress.io/commands/querying')
    cy.get('#querying .well>button:first').should('contain', 'Button')
    //Another example
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.traversal-table td').first().should('contain', '1')//First
    cy.get('.traversal-buttons .btn').last().should('contain', 'Submit')//Last
  })

  it('Next and Prev: getting the nexts and prevs elements on the DOm', () => {
    cy.visit('https://example.cypress.io/commands/traversal')
    //Simple next
    cy.get('.traversal-ul').contains('apples').next().should('contain', 'oranges')
    //Next all: getting all elements next to the selected one
    cy.get('.traversal-next-all').contains('oranges').nextAll().should('have.length', 3)
    //Next until: search the next elements until getting the choosen one
    cy.get('#veggies').nextUntil('#nuts').should('have.length', 3)
    //Seimple prev
    cy.get('.birds').find('.active').prev().should('contain', 'Lorikeets')
    //Prev all: getting all elements previous to the selected one
    cy.get('.fruits-list').find('.third').prevAll().should('have.length', 2)
    //Prev until: search the previous elements until getting the choosen one
    cy.get('.foods-list').find('#nuts').prevUntil('#veggies').should('have.length', 3)
  })

  it('Siblings: get all sibling DOM elements', () => {
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.traversal-pills .active').siblings().should('have.length', 2)
  })

  it('Navigating breadcrumb', () => {
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.traversal-breadcrumb').children('.active').should('contain', 'Data')
  })

  it('Closest: get closest ancestor DOM element', () => {
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.traversal-badge').closest('ul').should('have.class', 'list-group')
  })

  it('Filter: filter elements that match a selector', () => {
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.traversal-nav>li').filter('.active').should('contain', 'About')
  })

  it('Not: remove elements (opposite then filter)', () => {
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.traversal-disabled .btn')
      .not('[disabled]').should('not.contain', 'Disabled')
  })

  it('Find: get descendant elements of a selector', () => {
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7)
  })

})