import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const mockHandler = jest.fn()
  const blog = {
    title: 'A random title',
    author: 'Someone must have made it',
    url: 'https://www.someworkingaddress.com',
    likes: 10,
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleLikes={mockHandler}>
        <div className='testDiv' />
      </Blog>
    )
  })

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined()
  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent('A random title')
  })

  test('at start likes and URL are not displayed', () => {
    const div = component.container.querySelector('.togglable')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, likes and URL are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglable')
    expect(div).not.toHaveStyle('display: none')
  })

  test('test if likes work', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const like = component.getByText('like')

    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
