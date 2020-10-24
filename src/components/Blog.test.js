import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM } from '@testing-library/dom'
import { render } from '@testing-library/react'

import Blog from './Blog'

let component

const blog = {
  title : 'a new  blog',
  author:' author of the blog',
  url:'http://localhost:8081',
  likes: 2

}
beforeEach(() => {

  const handlerError = jest.fn()
  const updateBlog = jest.fn()



  component = render(<Blog blog={blog} updateBlog={updateBlog} handlerError={handlerError}/>)


})
describe('default render of Blog component',() => {

  test('component displaying a blog renders the blog"s title and author', () => {

    const node = component.container.querySelector('blog-info')

    expect(node).toBeDefined()
  })


  test('the component displaying a blog does not render its  number of likes by default' , () => {
    const node = component.queryByText('likes')

    expect(node).toEqual(null)
  })

  test('the component displaying a blog does not render its url  by default' , () => {
    const node = component.queryByText(blog.url)

    expect(node).toEqual(null)
  })

})

describe('render blog Component when "viev" button is clicked',() => {
  test('likes must be visible when view button is clicked',() => {
    const button = component.container.querySelector('.btn-view')
    fireEvent.click(button)
    expect(component.queryByText('likes')).toBeDefined()

  })
  test('url must be visible when view button is clicked',() => {
    const button = component.container.querySelector('.btn-view')
    fireEvent.click(button)
    expect(component.queryByText(blog.url)).toBeDefined()

  })


})

describe('click twice the button view',() => {

  test('likes  must not be visible when view button is clicked twice ',() => {
    const button = component.container.querySelector('.btn-view')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(component.queryByText('likes')).toBeNull()

  })
})


describe('click likes button',() => {
  test('ensures that if the like button is clicked twice, the event handler   received as props is called twice',() => {

  })
})



