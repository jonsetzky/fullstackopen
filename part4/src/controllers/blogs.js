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

blogsController.delete("/:id", async (request, response) => {
  await Blog.deleteOne({ _id: request.params.id });
  response.status(204).end();
});

blogsController.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: request.params.id },
    request.body,
    { new: true, runValidators: true },
  );
  response.json(updatedBlog);
});

module.exports = { blogsController };
