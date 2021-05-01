import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const likes = component.container.querySelector('#likes')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'some random title' },
  })
  fireEvent.change(author, {
    target: { value: 'someone' },
  })
  fireEvent.change(url, {
    target: { value: 'https://www.someoneworkingurl.com' },
  })
  fireEvent.change(likes, {
    target: { value: 0 },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('some random title')
  expect(createBlog.mock.calls[0][0].author).toBe('someone')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.someoneworkingurl.com')
  expect(createBlog.mock.calls[0][0].likes).toBe(0)
})
