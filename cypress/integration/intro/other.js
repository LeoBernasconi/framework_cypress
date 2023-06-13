/// <reference types="Cypress" />
const neatCSV = require('neat-csv')
let productName

describe('Other useful scenarios',async()=>{

    it('Login with fast login',()=>{
        cy.getToken().then(function(){
            cy.visit('https://rahulshettyacademy.com/client',{
                onBeforeLoad: function(window){
                    window.localStorage.setItem('token',Cypress.env('token'))
                } 
            })
        })
    })

    it('Login with fast and easy login',()=>{
        const url='https://rahulshettyacademy.com/client'
        cy.fastLogin(url)
    })

    it.only('Downloading CSV files',()=>{
        cy.fastLogin('https://rahulshettyacademy.com/client')
        //Proceed with the checkout and download the CSV
        cy.get(".card-body b").eq(1).then(function(ele)
            {
            productName =  ele.text();
            })
        cy.get(".card-body button:last-of-type").eq(1).click();
        cy.get("[routerlink*='cart']").click();
        cy.contains("Checkout").click();
        cy.get("[placeholder*='Country']").type("ind")
        cy.get('.ta-results button').each(($e1, index, $list) => {
        if($e1.text()===" India"){
            cy.wrap($e1).click()
            }
        })
        cy.get(".action__submit").click();
        cy.wait(2000)
        cy.contains('CSV').click();
        //Read the CSV file
        cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_leobernasconi.csv")
        .then(async(text)=>
        {
          const csv =  await neatCSV(text)
          console.log(csv)
          //Validate the product name
          const actualProductCSV = csv[0]["Product Name"]
          expect(productName).to.equal(actualProductCSV)
        })
    })
})