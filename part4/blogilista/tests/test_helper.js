const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React Blog',
    author: 'Tommi Juslin',
    url: 'www.tommi.com/blogi',
    likes: 1
  },
  {
    title: 'Bob Blog',
    author: 'Bob Blogstein',
    url: 'www.blogstein.com/blog',
    likes: 100
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
