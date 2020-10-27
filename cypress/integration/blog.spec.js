const user = { 'username':'hellas','name':'arto hellas', 'password' : 'secret' }
const secondUser ={ 'username':'alfred','name':'alfred  hellas', 'password' : 'secret' }

const blog = { title : 'title of the blog' , author:'author' , url : 'url' }



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
      cy.get('@form').get('input[name=username').type('invalid user name')
      cy.get('@form').get('input[name=password').type('invalid password')
      cy.get('@form').get('button[type=submit').click()

      cy.contains('invalid credential').should('have.css' ,'color','rgb(255, 0, 0)')

      cy.contains('Log in to application')
    })
  })

  describe('When logged in ', function() {
    beforeEach(function() {
      //log user
      cy.get('[data-test=login-form]').as('form')
      cy.get('@form').get('input[name=username').type(user.username)
      cy.get('@form').get('input[name=password').type(user.password)
      cy.get('@form').submit()

      //show form to create blog
      cy.get('button[data-test=show-form-blog]').click()
      cy.contains('create new')

      //create blog
      cy.get('form[data-test=create-form]').as('create-form')
      cy.get('@create-form').get('input[name=title]').type(blog.title)
      cy.get('@create-form').get('input[name=author]').type(blog.author)
      cy.get('@create-form').get('input[name=url]').type(blog.url)
      cy.get('@create-form').submit()

    })

    it('A blog can be created', function() {
      cy.contains(`A new blog ${blog.title} by ${blog.author} added`)

      cy.contains(blog.title)
      cy.get('[data-test=list-blog').children().should('have.length',1 )
    })

    it('a user can like a blog',function(){


      cy.contains(blog.title).parent()

      cy.get('.btn-view').click()
      cy.get('.btn-like').click()
      cy.contains('likes 1')
    })

    it('the user which created the blog can remove it',function(){
      cy.get('.btn-view').click()
      cy.contains('remove').click()
      cy.get('[data-test=list-blog').get('.blog-container').should('have.length',0 )
    })


    it('second  user logged  can\'t remove the blog of the first user',function(){
      // create another user
      cy.request('POST','http://localhost:3001/api/users',secondUser)

      //log out first user
      cy.contains('logout').click()
      //log in first user
      cy.get('[data-test=login-form]').as('form')
      cy.get('@form').get('input[name=username').type(secondUser.username)
      cy.get('@form').get('input[name=password').type(secondUser.password)
      cy.get('@form').submit()

      //show blog
      cy.get('.btn-view').click()

      // remove blog
      cy.contains('remove').click()

      cy.contains('you must logged and author of the blog to remove it')

    })

    it('when a user click on sorted button then blogs are sorted by likes in descending order',function(){

      cy.fixture('data.js')
        .then(data =>  {
          data.forEach(blog => {

            cy.get('button[data-test=show-form-blog]').click()

            //create blog
            cy.get('form[data-test=create-form]').as('create-form')
            cy.get('@create-form').get('input[name=title]').type(blog.title)
            cy.get('@create-form').get('input[name=author]').type(blog.author)
            cy.get('@create-form').get('input[name=url]').type(blog.url)
            cy.get('@create-form').submit()
          })
        })

      cy.contains('sort by like').click()

      cy.get('[data-test=list-blog]').children().as('children')
        .then(children => {
          let sorted =    children.map((item,index) => {
            return  index < children.length ?  item.blog.like > children[index+1] : true}

          ).get().every(t => t)


          expect(sorted).to.be.true

        })

    })

  })

})







