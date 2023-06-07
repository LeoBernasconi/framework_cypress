class DeliveryPage{

    input_country(){
        return cy.get('#country')
    }

    button_purchase(){
        return cy.contains('Purchase')
    }

    a_country(){
        return cy.get('.suggestions > ul > li > a')
    }

    check_termsAndConditions(){
        return cy.get('#checkbox2')
    }

    message_successMessage(){
        
    }

}

export default DeliveryPage;