describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'itsmattiboys',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('user can login with good credentials', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('itsmattiboys')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'itsmattiboys' })
    })

    it('a new note can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type(' I dont remember cypress URL')
      cy.get('#likes').type(0)
      cy.contains('submit').click()
      cy.contains('a blog created by cypress')
    })

    it('user can like a blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type(' I dont remember cypress URL')
      cy.get('#likes').type(0)
      cy.contains('submit').click()
      cy.contains('a blog created by cypress')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('users can delete a blog created by them', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type(' I dont remember cypress URL')
      cy.get('#likes').type(0)
      cy.contains('submit').click()
      cy.contains('a blog created by cypress')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('new blog')
    })

    it.only('the blogs are sorted by likes', function () {
      cy.createBlog({
        title: 'first blog',
        author: 'cypress',
        url: 'Cypress official website',
        likes: 21,
      })
      cy.login({ username: 'mluukkai', password: 'itsmattiboys' })
      cy.createBlog({
        title: 'second blog',
        author: 'cypress',
        url: 'Cypress official website',
        likes: 12,
      })
      cy.login({ username: 'mluukkai', password: 'itsmattiboys' })
      cy.createBlog({
        title: 'third blog',
        author: 'cypress',
        url: 'Cypress official website',
        likes: 18,
      })
      cy.login({ username: 'mluukkai', password: 'itsmattiboys' })
    })
  })
})
