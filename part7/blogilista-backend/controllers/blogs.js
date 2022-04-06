const { userExtractor } = require("../utils/middleware");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (!blog) {
    return response.status(401).json({ error: "no blog with that id found" });
  }

  if (blog.user.toString() === user._id.toString()) {
    await Blog.deleteOne(blog);
    user.blogs = user.blogs.filter(
      (b) => JSON.stringify(b) !== JSON.stringify(blog._id)
    );
    await user.save();
    return response.status(204).end();
  } else {
    return response.status(401).json({ error: "unauthorised" });
  }
});

blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
