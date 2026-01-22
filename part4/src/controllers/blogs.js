const blogsController = require("express").Router();
const assert = require("assert");

const Blog = require("../models/blog");
const User = require("../models/user");

blogsController.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsController.post("/", async (request, response) => {
  const randomUser = await User.findOne({});
  assert.ok(randomUser);
  const blog = new Blog({ ...request.body, user: randomUser._id });

  const result = await blog.save();

  randomUser.blogs = randomUser.blogs.concat(result._id);
  await randomUser.save();

  response.status(201).json(result);
});

blogsController.delete("/:id", async (request, response) => {
  await Blog.deleteOne({ _id: request.params.id });
  response.status(204).end();
});

blogsController.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: request.params.id, user: request.user.id },
    request.body,
    { new: true, runValidators: true },
  );
  response.json(updatedBlog);
});

module.exports = blogsController;
