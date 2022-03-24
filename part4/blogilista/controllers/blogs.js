const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
//  const blog = new Blog(request.body)
//
//  blog
//    .save()
//    .then(result => {
//      response.status(201).json(result)
//    })
})

module.exports = blogsRouter
