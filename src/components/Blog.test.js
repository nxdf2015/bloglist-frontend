

import React  from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/dom'
import { render } from '@testing-library/react'

import Blog from './Blog'
import FormBlog from './FormBlog'




let component

const blog = {
  title: 'a new  blog',
  author: 'author of the blog',
  url: 'http://localhost:8081',
  likes: 2,
}

const updateBlog = jest.fn()
const handlerError = jest.fn()

beforeEach(() => {
  component = render(
    <Blog blog={blog} updateBlog={updateBlog} handlerError={handlerError} />
  )
})
describe('default render of Blog component', () => {
  test('component displaying a blog renders the blog"s title and author', () => {
    const node = component.container.querySelector('blog-info')

    expect(node).toBeDefined()
  })

  test('the component displaying a blog does not render its  number of likes by default', () => {
    const node = component.queryByText('likes')

    expect(node).toEqual(null)
  })

  test('the component displaying a blog does not render its url  by default', () => {
    const node = component.queryByText(blog.url)

    expect(node).toEqual(null)
  })
})

describe('render blog Component when "viev" button is clicked', () => {
  test('likes must be visible when view button is clicked', () => {
    const button = component.container.querySelector('.btn-view')
    fireEvent.click(button)
    expect(component.queryByText('likes')).toBeDefined()
  })
  test('url must be visible when view button is clicked', () => {
    const button = component.container.querySelector('.btn-view')
    fireEvent.click(button)
    expect(component.queryByText(blog.url)).toBeDefined()
  })
})

describe('click twice the button view', () => {
  test('likes  must not be visible when view button is clicked twice ', () => {
    const button = component.container.querySelector('.btn-view')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(component.queryByText('likes')).toBeNull()
  })
})

describe('click likes button', () => {
  test('ensures that if the like button is clicked twice, the event handler   received as props is called twice', () => {
    const btnView = component.container.querySelector('.btn-view')
    fireEvent.click(btnView)
    const btnLike = component.container.querySelector('.btn-click')

    fireEvent.click(btnLike)
    fireEvent.click(btnLike)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})

describe('create blog',  () => {
  test('the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const handlerAddBlog = jest.fn()
    const newBlog =  {
      title: 'a new  blog',
      author: 'author of the blog',
      url: 'http://localhost:8081',

    }

    const formBlogComponent = render(<FormBlog addBlog={handlerAddBlog}/>)

    const btnSubmit = formBlogComponent.container.querySelector('button[type=submit]')
    const form = formBlogComponent.container.querySelector('#create-form').elements


    fireEvent.change(form.author, { target : { value : newBlog.author } })
    fireEvent.change(form.title ,{ target : { value : newBlog.title } })
    fireEvent.change(form.url,{ target : { value : newBlog.url } })

    fireEvent.submit(btnSubmit)

    expect(handlerAddBlog.mock.calls).toHaveLength(1)
    expect(handlerAddBlog.mock.calls[0][0]).toEqual(newBlog)

  })
})
