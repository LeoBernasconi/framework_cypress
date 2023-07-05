/// <reference types="cypress" />
const { interfaces } = require("mocha")

describe('API testing',function(){ 

  it('First intercept endpoint',function(){
      cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
      //Command intercept --> manipulate endpoints (request/response)
      cy.intercept({
          method:'GET',
          url:'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      }, {
          statusCode:200,
          body:[{
              "book_name":"RestAssure with Java",
              "isbn":"RSU",
              "aisle":"2301"
          }]
      }).as('getBooks')
      cy.get('.btn-primary').click()
      cy.wait('@getBooks')
      //Validate the message on the web
      cy.get('p').should('have.text','Oops only 1 Book available')
  })

  it.skip('Calling an endpoint and validate the number of rows in the screen',function(){
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
    cy.intercept({
        method : 'GET',
        url : 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    },{
          statusCode : 200,
          body : [{
                "book_name": "RestAssured with Java",
                "isbn": "RSU",
                "aisle": "2301"    }]   
      }).as('bookretrievals')
      cy.get("button[class='btn btn-primary']").click()
      cy.wait('@bookretrievals').should(({request,response})=>
      {
          cy.get('tr').should('have.length',response.body.length+1)
      })
      cy.get('p').should('have.text','Sorry we have only one book available')
  })

  it('Validating a POST endpoint',function(){
    cy.request('POST', 'http://216.10.245.166',
      {
      "name":"Learn Appium Automation with Java",
      "isbn":"Leo",
      "aisle":"001",
      "author":"John foe"
      }).then(function(response){
        expect(response.status).to.eq(200)//Status code
        expect(response.status).to.be.oneOf([200, 201, 202, 203, 204])
        //Assert that the body contains a filed "Msg" with certain value
        //expect(response.body).to.have.property('Msg','successfully added') 
      })
  })

  it('Other validations', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments')
    .then((response) => {
      // https://on.cypress.io/assertions
      expect(response).property('status').to.equal(200)
      expect(response).property('body').to.have.property('length').and.be.oneOf([500, 501])
      expect(response).to.include.keys('headers', 'duration')
    })
  })

  it('Validating certain element of an array', () => {
    // will execute request
    // https://jsonplaceholder.cypress.io/comments?postId=1&id=3
    cy.request({
      url: 'https://jsonplaceholder.cypress.io/comments',
      qs: {
        postId: 1,
        id: 3,
      },
    })
    .its('body').should('be.an', 'array').and('have.length', 1).its('0')
      .should('contain', {
        postId: 1,
        id: 3,
      })
  })

  it('Call an endpoint and send the response to a second one', () => {
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body') // yields the response object
      .its('0') // yields the first element of the returned list
      // the above two commands its('body').its('0') can be written as its('body.0')
      .then((user) => {
        expect(user).property('id').to.be.a('number')
        // make a new post on behalf of the user
        cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
          userId: user.id,
          title: 'Cypress Test Runner',
          body: 'Fast, easy and reliable testing for anything that runs in a browser.',
        })
      })
      // note that the value here is the returned value of the 2nd request, which is the new post object
      .then((response) => {
        expect(response).property('status').to.equal(201) // new entity created
        expect(response).property('body').to.contain({
          title: 'Cypress Test Runner',
        })
        // we don't know the exact post id - only that it will be > 100 (since JSONPlaceholder has built-in 100 posts)
        expect(response.body).property('id').to.be.a('number').and.to.be.gt(100)
        // we don't know the user id here - since it was in above closure,  so in this test just confirm that the property is there
        expect(response.body).property('userId').to.be.a('number')
      })
  })

  it('Call and endpoint and save response in the shared test context', () => {
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body').its('0') // yields the first element of the returned list
      .as('user') // saves the object in the test context
      .then(function () {
        //By the time this callback runs the "as('user')" command has saved the user object in the test 
        //context.To access the test context we need to use the "function () { ... }" callback form,
        //otherwise "this" points at a wrong or undefined object!
        cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
          userId: this.user.id,
          title: 'Cypress Test Runner',
          body: 'Fast, easy and reliable testing for anything that runs in a browser.',
        })
        .its('body').as('post') // save the new post from the response
      })
      .then(function () {
        //When this callback runs, both "cy.request" API commands have finished and the test context 
        //has "user" and "post" objects set.
        expect(this.post, 'post has the right user id').property('userId').to.equal(this.user.id)
      })
  })

  it('Mocking the request and validatiing an error response',function(){
    cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
    cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',(req)=>{
      req.url='https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra'
      req.continue((res)=>{
        expect(res.statusCode).to.equal(404)
      })
    }).as('apiPromise')
    cy.get('.btn-primary').click()
    cy.wait('@apiPromise')

  })

  it('Calling an endpoint: high-level validations', () => {
    //Calling the endpoint
    cy.request({
      method: 'GET',
      url: 'https://swapi.dev/api/planets/3/',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
      },
      failOnStatusCode: false
    })
    //Validate the response
    .then((response) => {
        const responseBody = response.body;
        expect(response.duration).to.be.lessThan(4000)//Validate the duration of the response
        expect(response.status).to.equal(200);//Validate the status code of the response
        expect(responseBody.population).to.equal('1000');//Validate the value of a specific field (no arrays)
      })
  })

  it('1 Validating a POST endpoint',function(){

    cy.request({
      method: 'POST',
      url: 'http://216.10.245.166',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "name":"Learn Appium Automation with Java",
        "isbn":"Leo",
        "aisle":"002",
        "author":"John foe"
        },
      failOnStatusCode: false
    }).then((response)=> {
        const responseBody = response.body
        expect(response.status).to.equal(200)
        expect(responseBody.Msg).to.equal('successfully added')
      })
  })

  it('Calling an endpoint: Validations inside an array', () => {
    //Calling the endpoint
    cy.request({
      method: 'GET',
      url: 'https://swapi.dev/api/planets/',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
      },
      failOnStatusCode: false
    })
    //Validate the response
    .then((response) => { 
        const responseBody = response.body;
        console.log(responseBody)
        expect(response.duration).to.be.lessThan(40000)//Validate the duration of the response
        expect(response.status).to.equal(200)//Validate the status code of the response
        expect(responseBody.count).to.equal(60)  
        const planets = responseBody.results
        expect(planets).to.be.an('array').that.is.not.empty //Assert that the array is not empty
        planets.forEach((planet) => {
            //General validations
            expect(planet).to.have.property('diameter')
            expect(planet).to.have.property('population')
            //Validations on field "diameter"
            const diameter = planet.diameter
            expect(diameter).to.be.a('string') //Assert the datatype of a field
            expect(Number(diameter)).to.be.greaterThan(0); // Assert the value of a specific field (for all items in the array)
            //Validations on field "rotation_period"
            const rotation_period = planet.rotation_period
            expect(rotation_period).to.be.a('string')
            expect(Number(rotation_period)).to.be.at.least(0);
            //Validate the created date
            const createdDateTime = new Date(planet.created);
            const limitDate = new Date('2010-06-01');
            expect(createdDateTime.getTime()).to.be.greaterThan(limitDate.getTime());
            })
            //Validating items inside the arrays
            const firstPlanet = planets[0];
            expect(firstPlanet).to.have.property('name'); // Assert that the 'name' property exists in the first planet
            expect(firstPlanet.name).to.equal('Tatooine'); // Assert that the value of the 'name' property is equal to 'Tatooine'
      })
  })

  it('intercept: another example', () => {
    cy.visit('https://example.cypress.io/commands/network-requests')
    let message = 'whoa, this comment does not exist'
    cy.intercept('GET', '**/comments/*').as('getComment')
    cy.get('.network-btn').click()
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.intercept('POST', '**/comments').as('postComment')
    cy.get('.network-post').click()
    cy.wait('@postComment').should(({ request, response }) => {
      expect(request.body).to.include('email')
      expect(request.headers).to.have.property('content-type')
      expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
    })
    cy.intercept({
      method: 'PUT',
      url: '**/comments/*',
    }, {
      statusCode: 404,
      body: { error: message },
      headers: { 'access-control-allow-origin': '*' },
      delayMs: 500,
    }).as('putComment')
    cy.get('.network-put').click()
    cy.wait('@putComment')
    cy.get('.network-put-comment').should('contain', message)
  })

})