/// <reference types="Cypress" />
import HomePage from "../../pageObjects/HomePage"
import ShopPage from "../../pageObjects/ShopPage"
import KartPage from "../../pageObjects/KartPage"
import DeliveryPage from "../../pageObjects/DeliveryPage"


describe('Annotations',function(){

    const homePage = new HomePage()
    const shopPage = new ShopPage()
    const kartPage = new KartPage()
    const deliveryPage = new DeliveryPage()

    //To be executed before the entire spec
    before(function(){
        cy.fixture('example').then(function(data){this.data=data})
    })

    it('Implementing some validations',function(){
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        //Complete some field son the form
        homePage.input_name().type(this.data.name)
        homePage.input_gender().select(this.data.gender)
        //Validations
        homePage.input_secondName().should('have.value',this.data.name) //Value of an element
        homePage.input_name().should('have.attr','minlength','2') //Some attribute of the element
        homePage.select_entrepreneur().should('be.disabled') //That a element is not enable
    })

    it.only('Complete the purchase',function(){
        cy.visit(Cypress.env('url') + '/angularpractice/')
        homePage.link_shop().click()
        //Add product to the cart
        this.data.productList.forEach(function(product){
            cy.selectProduct(product)            
        });
        //Proceed with the checkout
        shopPage.button_checkout().click()
        //Validate the total purchase (against each line)
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
        //Continue with the purchase
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

})