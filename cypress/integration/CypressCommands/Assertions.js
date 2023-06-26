describe('Assertions',function(){

    it('Assert existence',()=>{
        cy.visit('https://example.cypress.io/todo')
        //Validate its existence
        cy.get('.todo-list li').should('exist')
        cy.get('.todo-list lu').should('not.exist')
    })

    it('Assert length of an array',()=>{
        cy.visit('https://example.cypress.io/todo')
        cy.get('.todo-list li').should('have.length', 2)
    })

    it('Assert text',()=>{
        cy.visit('https://example.cypress.io/todo')
        cy.contains('Active').should('have.text','Active')
        cy.contains('Active').should('not.have.text','random text')     
    })

    it('Assert specific atribute ',()=>{
        cy.visit('https://example.cypress.io/todo')
        cy.get('.toggle-all').invoke('attr', 'type').should('eq', 'checkbox')
        cy.get('.toggle-all').should('have.attr','type','checkbox')
        //Validate the existence of an attribute
        cy.get('.toggle-all').should('have.attr','type')
    })

    it('Assert class value',()=>{
        cy.visit('https://example.cypress.io/todo')
        cy.get('.destroy').should('have.class', 'todo-button')
    })

    it('Assert id value',()=>{
        cy.visit('https://example.cypress.io/todo')
        cy.get('#toggle-all').should('have.id', 'toggle-all')
    })

    it('Assert the text of an element',()=>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.contains('Submit').should('have.text', 'Submit')
        cy.contains('Submit').should('contain', 'Submit')
        cy.contains('Submit').should('have.html', 'Submit')
    })

    it('Assert the element type',()=>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.contains('Submit').should('match', 'button')
    })

    it('Assert checked/unchecked elements',()=>{
        cy.visit('https://example.cypress.io/commands/actions')
        //Validate if a checkbox/radio_button is checked/unchecked
        cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check().should('be.checked')      
        cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').uncheck().should('not.be.checked')
    })

    it('Assert visibility',()=>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.contains('Submit').should('be.visible')
        cy.get('#scroll-horizontal button').should('not.be.visible')
    })

    it('Assert value of a select',()=>{
        cy.visit('https://example.cypress.io/commands/actions')
        //Simple value of a select
        cy.get('.action-select').should('have.value', '--Select a fruit--') 
        cy.get('.action-select').select('apples').should('have.value', 'fr-apples') 
        //Multiple values in a Select
        cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas'])
        .invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']) 
        //Containing an option
        cy.get('.action-select-multiple').invoke('val').should('include', 'fr-oranges')       
    })

    it.skip('Assert: hidden elements',()=>{
        //It's failing
        cy.visit('https://example.cypress.io/cypress-api')
        let hiddenP = Cypress.$('.dom-p p.hidden').get(0)
        let visibleP = Cypress.$('.dom-p p.visible').get(0)
        // our first paragraph has css class 'hidden'
        expect(Cypress.dom.isHidden(hiddenP)).to.be.true
        expect(Cypress.dom.isHidden(visibleP)).to.be.false
    })


    it('Assert input-range element',()=>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('.trigger-input-range').invoke('val', 25).trigger('change')
        .get('input[type=range]').siblings('p').should('have.text', '25')
    })

    it('Assert value of variables',()=>{
        const name = 'Ferro'
        expect(name).to.equal('Ferro')
    })

    it('Forcing assertions',()=>{
        expect(true).to.be.true  
        expect(false).to.be.false  
        expect(0).to.equal(0)
    })

    it('And: multiple assertions',()=>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.contains('Submit').should('exist').and('have.attr', 'type')   
    })

})