import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
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
        setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : returnedBlog))
      })
  }

  const showAllBlogInfo = () => {
    return (
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a> {blog.author}
        </div>
        <div>
          {blog.likes} likes
          {' '}
          <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
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

export default Blog
