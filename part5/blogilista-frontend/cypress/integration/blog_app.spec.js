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
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'tommijuslin', password: 'enkerro'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('This is my blog')
      cy.get('#author').type('Tommi Juslin')
      cy.get('#url').type('www.tommi.com/blog')
      cy.get('#create-button').click()

      cy.contains('new blog')
      cy.contains('Tommi Juslin')
    })

    describe('Once a blog has been created', function() {
      beforeEach(function() {
        cy.get('#new-blog').click()
        cy.get('#title').type('This is my blog')
        cy.get('#author').type('Tommi Juslin')
        cy.get('#url').type('www.tommi.com/blog')
        cy.get('#create-button').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('1 likes')
      })

      it('A blog can be removed by its creator', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.blogList').should('not.contain', 'This is my blog')
      })

      it('Blogs are sorted by likes', function() {
        cy.get('#new-blog').click()
        cy.get('#title').type('Second blog')
        cy.get('#author').type('Bob Bobbins')
        cy.get('#url').type('www.bob.com/blog')
        cy.get('#create-button').click()

        cy.get('.blogList')
          .contains('Second blog')
          .contains('view')
          .click()

        cy.contains('like').click()
        cy.contains('hide').click()
        cy.get('.blogList>.blog').then(items => {
          expect(items[0]).to.contain.text('Second blog')
          expect(items[1]).to.contain.text('This is my blog')
        })
      })
    })
  })
})