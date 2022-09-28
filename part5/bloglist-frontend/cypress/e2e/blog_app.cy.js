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
      cy.contains(`Logged in as ${user.name}`)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type(user.username)
      cy.get('input:last').type(user.password)
      cy.contains('login').click()
      cy.contains(`Logged in as ${user.name}`)
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get(`[aria-label="Title"]`).type('Test Blog')
      cy.get(`[aria-label="Author"]`).type('Test Author')
      cy.get(`[aria-label="URL"]`).type('testurl.com')
      cy.contains('Create').click()
      cy.contains('Test Blog Test Author')
    })

    it('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get(`[aria-label="Title"]`).type('Test Blog')
      cy.get(`[aria-label="Author"]`).type('Test Author')
      cy.get(`[aria-label="URL"]`).type('testurl.com')
      cy.contains('Create').click()
      cy.contains('show').click()
      cy.contains('Likes: 0')
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })
  })

})