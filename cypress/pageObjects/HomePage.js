class HomePage{

    input_name(){
        return cy.get('input[name="name"]').eq(0)
    }

    input_secondName(){
        return cy.get('input[name="name"]').eq(1)
    }

    input_gender(){
        return cy.get('#exampleFormControlSelect1')
    }

    select_entrepreneur(){
        return cy.get('#inlineRadio3')
    }

    link_shop(){
        return cy.contains('Shop')
    }



}

export default HomePage;
