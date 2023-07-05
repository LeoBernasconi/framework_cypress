/// <reference types="cypress" />
const requiredExample = require('../../fixtures/files.json')
const neatCSV = require('neat-csv')
let productName

describe('Files - Fixture', function(){

    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/files')
        cy.fixture('files.json').as('files')//Load the file
      })

    it('Load a fixture', () => {
        cy.intercept('GET', '**/comments/*', { fixture: 'files.json' }).as('getComment')
        cy.get('.fixture-btn').click()
        cy.wait('@getComment').its('response.body')
            .should('have.property', 'name')
            .and('include', 'Using fixtures to represent data')
    })

    it('Create and write a file based on a response', () => {
        cy.request('https://jsonplaceholder.cypress.io/users').then((response) => {
            cy.writeFile('cypress/fixtures/users.json', response.body)
        })
        //Validate the value of the 1st row in the file
        cy.fixture('users').should((users) => {
            expect(users[0].name).to.exist
        })
    })

    it('Create and write a file based on hardcoaded text', () => {
        cy.writeFile('cypress/fixtures/profile.json', {
            id: 123,
            name: 'Ferro',
            email: 'ferro@gmail.com',
        })
        //Validate the name of the file
        cy.fixture('profile').should((profile) => {
            expect(profile.name).to.eq('Ferro')
        })
    })

})

describe('Files - Excel', function(){
    it('Downloading and validating CSV files',()=>{
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

    it('Downloading and validating Excel files',()=>{
        cy.fastLogin('https://rahulshettyacademy.com/client')
        //Proceed with the checkout and download the Excel file
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
        cy.contains('Excel').click();
        //Read the Excel file       
        const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_leobernasconi.xlsx"
        cy.task('excepToJsonConverter',filePath).then(function(result){
            cy.log(result)
            cy.log(result.data[1].A)
            expect(productName).to.equal(result.data[1].B)
        })
    })

    it('Fast assertion on Excel file',function(){
        const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_leobernasconi.xlsx"
        cy.readFile(filePath).then(function(text){
            text(text).to.include('Adidas')
        })
    })

})

describe('Files: json', ()=>{

    it('Getting several values of a field', () => {
        cy.request('https://jsonplaceholder.cypress.io/users')
          .then((response) => {
            let ids = Cypress._.chain(response.body).map('id').take(3).value()
            expect(ids).to.deep.eq([1, 2, 3])
          })
      })

})