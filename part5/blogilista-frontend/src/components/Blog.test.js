import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('only blog title and author are shown by default', () => {
  const blog = {
    title: 'test blog',
    author: 'tester',
    url: 'www.testblog.com',
    likes: 5
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('test blog')
  expect(div).toHaveTextContent('tester')
  expect(div).not.toHaveTextContent('www.testblog.com')
  expect(div).not.toHaveTextContent('likes')
})