import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = blog => {
    const updatedBlog = {
      ...blog, likes: blog.likes + 1
    }

    blogService
      .update(updatedBlog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : returnedBlog))
      })
  }

  const removeBlog = blog => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const showAllBlogInfo = () => {
    return (
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          {' '}
          <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {
          blog.user.name === user.name ?
            <button onClick={() => removeBlog(blog)}>remove</button>
            : []
        }
      </div>
    )
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      {' '}
      <button onClick={() => setShowFullInfo(!showFullInfo)}>
        {showFullInfo ? 'hide' : 'view'}
      </button>
      {
        showFullInfo ? showAllBlogInfo() : []
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
