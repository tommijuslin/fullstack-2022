const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (acc, cur) => {
    return acc + cur.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (acc, cur) => {
    return (acc.likes > cur.likes) ? acc : cur
  }

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const blogCounts = _.countBy(blogs, 'author')
  const mostBlogs = _.maxBy(_.keys(blogCounts), author => blogCounts[author])

  const author = {
    author: mostBlogs,
    blogs: blogCounts[mostBlogs]
  }

  return author
}

const mostLikes = (blogs) => {
  const authorsByLikes = _(blogs)
    .groupBy('author')
    .map((v, k) => { return { author: k, likes: _.sumBy(v, 'likes') }})
    .value()
  
  const author = _.maxBy(authorsByLikes, 'likes')

  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
