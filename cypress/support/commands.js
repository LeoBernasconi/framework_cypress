// For more comprehensive examples of custom commands please read more here: https://on.cypress.io/custom-commands

import ShopPage from "../pageObjects/ShopPage"
const shopPage = new ShopPage()

Cypress.Commands.add('selectProduct', (product) => {
    shopPage.title_productName().each((el,index,list)=>{
        if(el.text().includes(product)){
            shopPage.button_add().eq(index).click()
        }
    })
})

Cypress.Commands.add('getToken',()=>{
    cy.request(
        'POST',
        'https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            userEmail: "leobernasconi@gmail.com", 
            userPassword: "Vaso2424"
        }).then(function(response){
            expect(response.status).to.eq(200)
            Cypress.env('token',response.body.token)
        })
})

Cypress.Commands.add('fastLogin',(url)=>{
    cy.getToken().then(function(){
        cy.visit(url,{
            onBeforeLoad: function(window){
                window.localStorage.setItem('token',Cypress.env('token'))
            } 
        })
    })
})
