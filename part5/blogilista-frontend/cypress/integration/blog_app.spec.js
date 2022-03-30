describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user =  {
      username: 'tommijuslin',
      password: 'enkerro'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tommijuslin')
      cy.get('#password').type('enkerro')
      cy.contains('login').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tommijuslin')
      cy.get('#password').type('entieda')
      cy.contains('login').click()

      cy.contains('wrong username or password')
        .should('have.css', 'color', 'rgb(254, 0, 0)')
    })
  })
})