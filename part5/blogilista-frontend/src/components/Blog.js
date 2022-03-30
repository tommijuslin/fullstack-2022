import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          <button className='like' onClick={() => likeBlog(blog)}>like</button>
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
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
