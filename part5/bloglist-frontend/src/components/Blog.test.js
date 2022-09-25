import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('check author and title is rendered correctly', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'J. Smith',
    id: '1234567890',
    url: 'testing.com'
  }

  const mockLikeBlogHandler = jest.fn()
  const mockDeleteBlogHandler = jest.fn()
  const { container } = render(<Blog blog={blog} deleteBlogHandler={mockDeleteBlogHandler} likeBlogHandler={mockLikeBlogHandler}/>)

  const blogText = container.querySelector('.blog')
  const likesText = container.querySelector('.likes')
  const urlText = container.querySelector('.url')

  screen.debug()

  expect(blogText).toHaveTextContent(/Component testing is done with react-testing-library J. Smith 1234567890/)
  expect(blogText).toBeVisible()
  expect(likesText).not.toBeVisible()
  expect(urlText).not.toBeVisible()
})