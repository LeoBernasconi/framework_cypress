class ShopPage{

    title_productName(){
        return cy.get('H4.card-title')
    }

    button_add(){
        return cy.get('button.btn-info')
    }

    button_checkout(){
        return cy.contains('Checkout')
    }

}

export default ShopPage;