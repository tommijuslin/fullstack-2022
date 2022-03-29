import { useState } from 'react'

const Blog = ({ blog }) => {
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
          <button>like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setShowFullInfo(!showFullInfo)}>
        {blog.title} {blog.author}
        {
          showFullInfo ? showAllBlogInfo() : []
        }
      </div>
    </div>  
  )
}

export default Blog
