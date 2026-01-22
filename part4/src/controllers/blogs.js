const blogsController = require("express").Router();
const assert = require("assert");

const Blog = require("../models/blog");
const User = require("../models/user");

blogsController.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsController.post("/", async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "unauthorized" });
  }

  assert.ok(user);
  const blog = new Blog({ ...request.body, user: user.id });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogsController.delete("/:id", async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "unauthorized" });
  }
  await Blog.deleteOne({ _id: request.params.id, user: request.user.id });
  response.status(204).end();
});

blogsController.put("/:id", async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "unauthorized" });
  }
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: request.params.id, user: user.id },
    request.body,
    { new: true, runValidators: true },
  );
  response.json(updatedBlog);
});

module.exports = blogsController;
