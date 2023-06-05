/// <reference types="Cypress" />
describe('Complex elements', function(){

    it('Working with alerts',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //Alets are accepted by Cypress by default
        cy.get('#alertbtn').click()
        cy.get('input[value="Confirm"]').click()
        //Validate the text of an alert window
        cy.on('window:alert',(textToValidate)=>{
            expect(textToValidate).to.equal('Hello , share this practice page and share your knowledge')
        })
        //Validate the text of a confirmation window
        cy.on('window:confirm',(textToValidate)=>{
            expect(textToValidate).to.equal('Hello , Are you sure you want to confirm?')
        })
    })

    it('Working with child tabs and moving within browser',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.contains('Home').click()
        cy.url().should('include','rahulshettyacademy')
        //Going back and moving forward
        cy.go('back')
        cy.go('forward')
        cy.go('back')
        //Use jquery function to remove attirubte "target" on the link
        cy.get('#opentab').invoke('removeAttr','target').click()         
    })

    it('Working with web tables',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        const courseName ='Master Selenium Automation in simple Python Language'
        const coursePrice='25'
        cy.get('tr td:nth-child(2)').each(($el,index,$list)=>{
            if($el.text()===courseName){
                cy.get('tr td:nth-child(2)').eq(index).next().then(function(realPrice){
                    expect(realPrice.text()).to.equal(coursePrice)
                })
            }
        })
    })

    it.only('Mouse move',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //Use mouse move to show a menu and click an option
        cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include','top')
        //Perform the same action but without opening the menu
        cy.contains('Reload').click({force: true})
        cy.url().should('not.contain','top')
    })
    

    
})