/// <reference types="Cypress" />

describe('Introduction',function(){

    it('First code: getting and clicking elements',function(){
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        //Get element
        cy.get('.search-keyword').type('ca')
        cy.wait(1000)
        //Get elements from the full page
        console.log("Log not syncronized")
        cy.get('.product:visible').should('have.length',4)
        //Get elements only inside an specific element
        cy.get('.products').as('productList')
        cy.get('@productList').find('.product').should('have.length',4).then(function(){console.log("Log syncronized")})
        //Click on a specific child element (static --> always the same product id)
        cy.get('@productList').find('.product').eq(1).contains('ADD TO CART').click() 
        //Iterate and add items to the cart
        cy.get('@productList').find('.product').each(($el, index, $list) => {
            const textVegetable = $el.find('h4.product-name').text()
            if (textVegetable.includes('Cashews')) {
                cy.wrap($el).find('button').click()
            }
        })
    })

    it('Usgin the function text to get the text of an element', function(){
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        const validLogo = 'GREENKART'
        //Get the text of the logo
        cy.get('.brand').should('have.text',validLogo)
        const logo = cy.get('.brand ').then(function(logo){
            cy.log(logo.text())
        })
    })

    it('Add element to the cart and continue with the purchase',function(){
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        //Add elements to the cart
        cy.get('.search-keyword').type('ca')
        cy.wait(500)
        //Click on a specific child element (static --> always the same product id)
        cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click() 
        //Prodcede with the checkout
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
    })

    it('Wortking with checkboxes',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //Check and uncheck specific options
        cy.get('input#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        //Check and uncheck all options
        cy.get('input[type="checkbox"]').check([])
        cy.get('input[type="checkbox"]').uncheck([])
        //Check multiple checkboxes in the same line
        cy.get('input[type="checkbox"]').check(['option1','option3'])
    })

    it('Working with dropdowns',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        const country = 'India'
        const countryStart = 'IND'
        //Select and option from an statis dropdown (and validate it)
        cy.get('select').select('option2').should('have.value','option2')
        //Select an option from a dinymic deopdown and validate its value
        cy.get('#autocomplete').type(countryStart)
        cy.get('.ui-menu-item').each(($el, index, $list) =>{
            if($el.text()===country){
                cy.wrap($el).click()
            }
        })
        cy.get('#autocomplete').should('have.value',country)
    })

    it('Checking visibility and invisibility',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('.displayed-class').as('hideShow')
        cy.get('@hideShow').should('be.visible')
        //Hide the element (and validate)
        cy.get('#hide-textbox').click()
        cy.get('@hideShow').should('not.be.visible')
        //Show the element (and validate)
        cy.get('#show-textbox').click()
        cy.get('@hideShow').should('be.visible')
    })

    it('Working with radio buttons',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('input[value="radio2"]').check().should('be.checked')
    })


})


