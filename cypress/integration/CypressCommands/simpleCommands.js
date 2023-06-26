/// <reference types="Cypress" />

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
      //Forcing the click on an element (when it is not visible)
      cy.contains('Submit').click({force: true})
      //Double click
      cy.get('.action-div').dblclick()
      //Right click
      cy.get('.rightclick-action-div').rightclick()
      //Multiple clicks in a group of elements
      cy.get('.action-labels>.label').click({ multiple: true })
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
      cy.get('.action-email')
        //Send keyword arrows
        .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
        //Send other keywords commands
        .type('{del}{selectall}{backspace}')
        .type('{alt}{ctrl}{cmd}{shift}')
      //Write waiting some time between each character
      cy.get('.action-email').clear().type('Ferro', { delay: 250 }).should('have.value', 'Ferro')
      //Force writing something (even having input element disable/not visible)
      cy.get('.action-disabled').type('Leopa', { force: true }).should('have.value', 'Leopa')
    })

    it('Debugging commands',()=>{
      cy.visit('https://example.cypress.io/commands/actions')
      //Highlight an element on the DOM (using focus)
      cy.get('.action-focus').focus()
      //Highlight an element on the DOM (using blur)
      cy.get('.action-blur').type('About to blur').blur()
    })

    it('Assertions',()=>{
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
      cy.visit('https://example.cypress.io/commands/actions')
      //Validate the text of an element
      cy.contains('Submit').should('have.text', 'Submit')
      cy.contains('Submit').should('contain', 'Submit')
      cy.contains('Submit').should('have.html', 'Submit')
      //Validate the element type
      cy.contains('Submit').should('match', 'button')
      //Validate if a checkbox/radio_button is checked/unchecked
      cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check().should('be.checked')      
      cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').uncheck().should('not.be.checked') 
      //Validate the visibility of an element
      cy.contains('Submit').should('be.visible')
      cy.get('#scroll-horizontal button').should('not.be.visible')
      //Validate the value of a select
      cy.get('.action-select').should('have.value', '--Select a fruit--') 
      cy.get('.action-select').select('apples').should('have.value', 'fr-apples')
      //Validate multiple values in a Select
      cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas'])
        .invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']) 
      //Validate that a Select element contains an option
      cy.get('.action-select-multiple').invoke('val').should('include', 'fr-oranges')
      //Validating the value of a input-range element
      cy.get('.trigger-input-range').invoke('val', 25).trigger('change')
        .get('input[type=range]').siblings('p').should('have.text', '25')
      //Validating multiple assertions
      cy.contains('Submit').should('exist').and('have.attr', 'type')    
      //Force assertions
      expect(true).to.be.true  
      expect(false).to.be.false  
      expect(0).to.equal(0)
      //Validating values of variables
      const name = 'Ferro'
      expect(name).to.equal('Ferro')
    })

    it.only('Logging data',()=>{
      //Log on the briowser console
      console.log('Ferro')
      //Log on the Cypress UI
      cy.log('Ferro')
    })



    it('Clicking the DOM', () => {
      cy.visit('https://example.cypress.io/commands/actions')
      //Clicking an element by screen section
      cy.get('#action-canvas').click('topLeft')
      cy.get('#action-canvas').click('top')
      cy.get('#action-canvas').click('topRight')
      cy.get('#action-canvas').click('left')
      cy.get('#action-canvas').click('right')
      cy.get('#action-canvas').click('bottomLeft')
      cy.get('#action-canvas').click('bottom')
      cy.get('#action-canvas').click('bottomRight')
      //Clicking an element by coordinates (x and y)
      cy.get('#action-canvas')
        .click(80, 75)
        .click(170, 75)
        .click(80, 165)
        .click(100, 185)
        .click(125, 190)
        .click(150, 185)
        .click(170, 165)
    })

    it('Radio and checkbox : check and uncheck', () => {
      cy.visit('https://example.cypress.io/commands/actions')
      //Check/Uncheck a checkbox (or a group of checks)
      cy.get('input[value="checkbox3"]').eq(0).check()
      cy.get('input[value="checkbox3"]').eq(0).uncheck()
      //Force the check/uncheck (even if the checkbox is disabled)
      cy.get('.action-checkboxes [type="checkbox"]').check({ force: true })
      cy.get('.action-checkboxes [type="checkbox"]').uncheck({ force: true })
      //Check/Uncheck only those checkboxs enabled
      cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check()
      cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').uncheck()
      //Check a radio button
      cy.get('#optionsRadios1').check()
      //Check a disable radio button
      cy.get('#optionsRadios3').check({ force: true })
      //Check only enable radio buttons
      cy.get('.action-radios [type="radio"]').not('[disabled]').check()
      //Check some radio buttons on a group of radio buttons
      cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2'])
    })

    it('Selecting options of a Select element', () => {
      cy.visit('https://example.cypress.io/commands/actions')
      //Select a unique option by text
      cy.get('.action-select').select('apples')
      //Select multiple options
      cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas'])
      //Select a unique option by value
      cy.get('.action-select').select('fr-bananas')
    })

    it('Scrolling the screen', () => {
      cy.visit('https://example.cypress.io/commands/actions')
      //Scrolling to find an element
      cy.get('#scroll-horizontal button').scrollIntoView().should('be.visible')
      //Scroll to the botton/top of the screen
      cy.scrollTo('center')
      cy.scrollTo('bottom')
      cy.scrollTo('top')
      cy.scrollTo('topLeft')
      cy.scrollTo('left')
      cy.scrollTo('bottomLeft')
      cy.scrollTo('topRight')
      cy.scrollTo('right')
      cy.scrollTo('bottomRight')
      //Scroll having an element as reference 
      cy.get('#scrollable-horizontal').scrollTo('right')//same 9 commands as before
      //Scroll to specific coordinates (X / Y)
      cy.get('#scrollable-vertical').scrollTo(250, 250)
      //Scroll to a specific  % of the width (width / height)
      cy.get('#scrollable-both').scrollTo('75%', '25%')
      //Control the duration of the scroll (in ms)
      cy.scrollTo('top', { duration: 2000 })
    })

    it('Using alias',()=>{
      cy.visit('https://example.cypress.io/commands/aliasing')
      //Alias on an element
      cy.contains('Get Comment').as('buttonComment')
      cy.get('@buttonComment').click().should('exist')
      //Alias on an endpoint
      cy.intercept('GET', '**/comments/*').as('getComment')
      cy.get('.network-btn').click()
      cy.wait('@getComment').its('response.statusCode').should('eq', 200)
    })
})