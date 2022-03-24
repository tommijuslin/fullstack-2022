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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
