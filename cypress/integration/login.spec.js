beforeEach(function(){
  cy.request('get','http://localhost:3001/api/testing/reset')
  cy.visit('http://localhost:3000/')
})

describe('default display of the application',function(){
  it('checking that the application displays the login form by default',function(){
    cy.contains('login')
    cy.get('[data-test=login-form]')
  })
})