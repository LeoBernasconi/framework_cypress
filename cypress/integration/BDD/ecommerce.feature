Feature: E2E ecommerce validation

    Scenario: Ecommerce product delivery
    Given I open the ecommerce page
    When I add items to the cart
    And Validate the total prices
    Then Select the country, submit and verify the final message

    Scenario: Filling the form to shop
    Given I open the ecommerce page
    When I fill the form details
    Then Validate the form behaviour

