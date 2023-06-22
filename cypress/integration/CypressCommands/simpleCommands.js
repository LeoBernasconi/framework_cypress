describe('Simple commands',function(){

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
    })

    it('Identifying element: parent and children',()=>{
      cy.visit('https://example.cypress.io/todo')
      //Get the children by element type
      cy.get('.todo-list li').should('exist')
      //Get the parent
      cy.contains('Pay electric bill').parent().should('exist')
      //Find a specific children given a parent element
      cy.get('.filters').contains('Completed').should('exist')
      cy.contains('Pay electric bill').parent().find('.destroy').should('exist')
    })

    it('Identifying element: other ways',()=>{
      cy.visit('https://example.cypress.io/todo')
      //Get the first and last element of an array of elements 
      cy.get('.todo-list li').first().should('exist')//First
      cy.get('.todo-list li').last().should('exist')//Last
    })

    it('Interacting with elements: simple commands',()=>{
      cy.visit('https://example.cypress.io/commands/actions')
      //Click an element
      cy.contains('Submit').click()
    })

    it('typing text and forcing keyword commands',()=>{
      cy.visit('https://example.cypress.io/commands/actions')
      //Type a text
      cy.get('#email1').type('Leopa')
      //Empty an input element
      cy.get('#email1').clear()
      //Force an [ENTER]
      const voucherCode = 5555
      cy.get('#couponCode1').type(voucherCode + '{enter}')
    })

    it('Validating elements',()=>{
      cy.visit('https://example.cypress.io/todo')
      //Validate its existence
      cy.get('.todo-list li').should('exist')
      cy.get('.todo-list lu').should('not.exist')
      //Validate its length
      cy.get('.todo-list li').should('have.length', 2)
      //Validate the text of an element
      cy.contains('Active').should('have.text','Active')
      cy.contains('Active').should('not.have.text','random text')
      //Validate the value of a specific atribute 
      cy.get('.toggle-all').invoke('attr', 'type').should('eq', 'checkbox')
      cy.get('.toggle-all').should('have.attr','type','checkbox')
      //Validate the existence of an attribute
      cy.get('.toggle-all').should('have.attr','type')
      //Validate the class
      cy.get('.destroy').should('have.class', 'todo-button')
      //Validate the id
      cy.get('#toggle-all').should('have.id', 'toggle-all')      
    })

})