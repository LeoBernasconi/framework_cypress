import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"; 
 

 Given('I open the ecommerce page',()=>{
    cy.visit(Cypress.env('url') + '/angularpractice/')
 })

 When('I add items to the cart',()=>{
    homePage.link_shop().click()
    //Add product to the cart
    this.data.productList.forEach(function(product){
        cy.selectProduct(product)            
    });
    //Proceed with the checkout
    shopPage.button_checkout().click()
 })

 And('Validate the total prices',()=>{
    var totalValue=0
    cy.get('tr td:nth-child(4) strong').each((tableValue,index,list)=>{
        const value = tableValue.text()
        var formatValue = value.split(" ")
        formatValue = formatValue[1].trim()
        totalValue = Number(totalValue) + Number(formatValue)
    }).then(function(){cy.log(totalValue)})
    cy.get('h3 > strong').then(function(totalTicket){
        var value = totalTicket.text()
        var formatTicket = value.split(" ")
        formatTicket = formatTicket[1].trim()
        expect(Number(formatTicket)).to.be.equal(Number(totalValue))
    })
 })

 Then('Select the country, submit and verify the final message',()=>{
    kartPage.button_checkout().click()
    deliveryPage.input_country().type('India')
    deliveryPage.a_country().click()
    deliveryPage.check_termsAndConditions().click({force:true})
    deliveryPage.button_purchase().click()
    //Validate the message
    cy.get('.alert').then(function(message){
        const userMessage = message.text()
        expect(userMessage.includes('Success')).to.be.true
    })
 })

 When('I fill the form details',()=>{
    homePage.input_name().type(this.data.name)
    homePage.input_gender().select(this.data.gender)
 })

 Then('Validate the form behaviour',()=>{
    homePage.input_secondName().should('have.value',this.data.name)
    homePage.input_name().should('have.attr','minlength','2')
    homePage.select_entrepreneur().should('be.disabled')
 })
