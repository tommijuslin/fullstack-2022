import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, showMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })
    showMessage(`a new blog ${title} by ${author} added`, 'success')
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='blogForm'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
          />
        </div>
        <div>
          author
          <input
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired
}

export default BlogForm
