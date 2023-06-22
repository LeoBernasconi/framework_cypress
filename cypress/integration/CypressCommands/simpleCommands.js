describe('Simple commands',function(){

    //Execute this code before each test
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo')
      })
    
      it('Get elements and make simple validations', () => {
        //Get elements with the class "todo-list li" and check that there are two elements
        cy.get('.todo-list li').should('have.length', 2)
        //Validate the text of the first and the last element 
        cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')//First
        cy.get('.todo-list li').last().should('have.text', 'Walk the dog')//Last
      })

      it('Type text, type ENTER and make simple assertions', () => {
        //Define variable
        const newItem = 'Feed the cat'
        //Type and ENTER
        cy.get('[data-test=new-todo]').type(newItem + '{enter}')
        //Simple validations
        cy.get('.todo-list li')
          .should('have.length', 3)
          .last()
          .should('have.text', newItem)
      })

      it('Visiting parent and children', () => {
        cy.contains('Pay electric bill')
          .parent()//Go to the parent
          .find('input[type=checkbox]')//Find within children
          .check()
        //Validate a property of the parent
        cy.contains('Pay electric bill')
          .parents('li')
          .should('have.class', 'completed')//Validate class
      })
    
      //A context is defined so do some test based on the same first action --> click a check
      context('with a checked task', () => {

        beforeEach(() => {
          cy.contains('Pay electric bill')
            .parent()
            .find('input[type=checkbox]')
            .check()
        })
    
        it('can filter for uncompleted tasks', () => {
          cy.contains('Active').click()
          cy.contains('Pay electric bill').should('not.exist')//Validate existence
        })
    
        it('can delete all completed tasks', () => {
          cy.contains('Clear completed').click()
          cy.get('.todo-list li')
            .should('have.length', 1)
            .should('not.have.text', 'Pay electric bill')//Validate that a text is not present
        })
      })
    
})