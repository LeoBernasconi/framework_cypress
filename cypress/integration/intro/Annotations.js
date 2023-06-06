/// <reference types="Cypress" />

describe('Annotations',function(){

    //To be executed before the entire spec
    before(function(){
        cy.fixture('example').then(function(data){this.data=data})
    })

    it('Implementing some validations',function(){
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        //Complete some field son the form
        cy.get('input[name="name"]:nth-child(2)').eq(0).type(this.data.name)
        cy.get('#exampleFormControlSelect1').select(this.data.gender)
        //Validations
        cy.get('input[name="name"]').eq(1).should('have.value',this.data.name) //Value of an element
        cy.get('input[name="name"]').eq(0).should('have.attr','minlength','2') //Some attribute of the element
        cy.get('#inlineRadio3').should('be.disabled') //That a element is not enable
    })

    it.only('some',function(){
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.contains('Shop').click()
        this.data.productList.forEach(function(product){
            cy.selectProduct(product)            
        });



    })

})