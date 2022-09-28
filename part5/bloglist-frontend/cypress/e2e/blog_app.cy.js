const user = {
  name: "Cypress Test User",
  username: "cypress-test-user",
  password: "password1234"
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function () {
    it('login button can be clicked with empty form resulting in wrong username or password notification', function() {
      cy.contains('login').click()
      cy.contains('Wrong username or password')
    })

    it('user can login', function() {
      cy.get('input:first').type(user.username)
      cy.get('input:last').type(user.password)
      cy.contains('login').click()
      cy.contains('Logged in as Cypress Test User')
    })
  })

})