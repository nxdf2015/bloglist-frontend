const user = { 'username':'hellas','name':'arto hellas', 'password' : 'secret' }

describe('Blog app', function () {

  beforeEach(function () {
    cy.request('get', 'http://localhost:3001/api/testing/reset')
    cy.request('post','http://localhost:3001/api/users',user)


    cy.visit('http://localhost:3000/')
  })

  it('login form is shown by default', function () {
    cy.contains('login')
    cy.get('[data-test=login-form]')
  })

  describe('login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('[data-test=login-form]').as('form')
      cy.get('@form').get('input[name=username').type(user.username)
      cy.get('@form').get('input[name=password').type(user.password)

      cy.get('@form').get('button[type=submit').click()
      cy.contains(`${user.username} logged in`)
    })

    it('fails with wrong credentials', function() {

      cy.get('[data-test=login-form]').as('form')
      cy.get('@form').get('input[name=username').type(user.username)
      cy.get('@form').get('input[name=password').type('invalid password')
      cy.get('@form').get('button[type=submit').click()
      cy.clock()
      cy.contains('invalid credential').should('have.css' ,'color','rgb(255, 0, 0)')
      cy.tick(2000)
      cy.contains('log in to application')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('[data-test=login-form]').as('form')
      cy.get('@form').get('input[name=username').type(user.username)
      cy.get('@form').get('input[name=password').type(user.password)
      cy.get('@form').get('button[type=submit').click()


    })

    it('A blog can be created', function() {

      cy.get('button[data-test=show-form-blog]').click()
      cy.contains('create new')
    })
  })

})
