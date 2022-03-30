import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'test blog',
    author: 'tester',
    url: 'www.testblog.com',
    likes: 5,
    user: { id: '623e1b190f0eca27991fe9a5', name: 'Tommi Juslin' }
  }

  const user = { id: '623e1b190f0eca27991fe9a5', name: 'Tommi Juslin' }

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container
  })

  test('only blog title and author are shown by default', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent('likes')
  })

  test('clicking the view button shows all blog info', () => {
    const button = screen.getByText('view')
    fireEvent.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })
})
