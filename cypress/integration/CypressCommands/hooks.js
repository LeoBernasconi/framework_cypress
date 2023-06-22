describe('Higher structure level',()=>{

    before(() => {
        //To be executed before the entire describe
      })

      beforeEach(() => {
        //To be executed before each test (it)
      })

      AfterEach(() => {
        //To be executed after each test (it)
      })

      After(() => {
        //To be executed after the entire describe
      })

    context('Second structure level',()=>{

        before(() => {
            //Hooks could be visible only for specific context
          })

        it('Test inside the context',()=>{
        })

    })

    it('Test outside the context',()=>{
    })

})