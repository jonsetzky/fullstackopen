const blogsController = require("express").Router();

const Blog = require("../models/blog");

blogsController.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsController.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = { blogsController };
