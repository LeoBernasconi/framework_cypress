describe('API testing',function(){

    it('First intercept endpoint',function(){
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        cy.intercept({
            method:'GET',
            url:'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
        },
        {
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
          expect(response.body).to.have.property('Msg','successfully added')
          expect(response.status).to.eq(200)
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


})