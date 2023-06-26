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
        //Contains
        cy.contains('Submit').should('exist')
        //Identify an array and navigate throw items
        cy.get('input[value="checkbox1"]').eq(0).check()
        cy.get('input[value="checkbox1"]').eq(1).check()
        cy.get('input[value="checkbox1"]').eq(2).check()
        //cy.get('input[value="checkbox1"]').eq(3).check() --> Not existent element --> FAIL
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
      })
  
      it('Identifying element: First and last',()=>{
        cy.visit('https://example.cypress.io/todo')
        //Get the first and last element of an array of elements 
        cy.get('.todo-list li').first().should('exist')//First
        cy.get('.todo-list li').last().should('exist')//Last
      })
  

})