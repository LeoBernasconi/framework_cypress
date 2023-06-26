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

    it('Database connection', function(){
        cy.sqlServer('select * from Persons').then(function(result){
            console.log(result[0])//print the first element of the array
            console.log(result[0][1])//print the second column of the first element of the array
        })
    })

})