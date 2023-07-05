/// <reference types="cypress" />

describe('Connectors',function(){

  beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/connectors')
    })

  it('Each: Iterate over an array of elements',()=>{
      //Get the text of each one of the elements on the array
      cy.get('.connectors-each-ul>li').each((el, index, $list) => {
        console.log(el.text())
        cy.log(el.text())
        if (el.text()==='William Grey') {
          cy.log("We've found it!!")
          //Depending on the element type, different actions may take palce here, such as click.
        }
      })
  })

  it('Its: Get properties of an object',()=>{
    //Properties of an array of elements
    cy.get('.connectors-its-ul>li').its('length').should('be.gt', 2)
    //Properties of an array of texts
    cy.wrap(['Ferro', 'Carril', 'Oeste']).its(2).should('eq', 'Oeste')
    //Properties of a json file
    cy.wrap({ name:'Leopa', age: 39 }).its('age').should('eq', 39)
  })

  it('Its: Other examples',()=>{
    //Title
    cy.title().its('length').should('eq', 24)
    //Windows session
    const sesion = cy.window().its('sessionStorage')
    cy.log(sesion)
    //Nested json files
    const user = {
      contacts: {
        work: {
          name: 'Kamil',
          age: 40
        },title:"Sir",
        team: "Ferro"
      },
    }
    cy.wrap(user).its('contacts.work.name').should('eq', 'Kamil')
    cy.wrap(user).its('contacts.work.age').should('eq', 40)
    cy.wrap(user).its('contacts.team').should('eq', 'Ferro')
  })

  it('Invoke: to get an attribute',()=>{
    cy.get('h1').parent().invoke('attr', 'class').should('equal', 'container')
  })

  it('Invoke: Execute a function',()=>{
    //Define the function
    const fn = (a, b, c) => {
      return a + b + c
    }
    //Call the function
    cy.wrap({ sum: fn }).invoke('sum', 2, 4, 6)
      .should('be.gt', 10)//Be grater
      .and('be.lt', 20)//Be lower
  })

  it('Spread: Store values of an array in variables', () => {
    //Define the array
    const arr = ['Ferro', 'Carril', 'Oeste']
    //Store the values and validate them
    cy.wrap(arr).spread((first, second, third) => {
      expect(first).to.eq('Ferro')
      expect(second).to.eq('Carril')
      expect(third).to.eq('Oeste')
    })
  })

})