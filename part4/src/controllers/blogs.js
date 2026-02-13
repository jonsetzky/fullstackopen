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

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({ error: "forbidden" });
  }

  await Blog.deleteOne({ _id: request.params.id });

  response.status(204).end();
});

blogsController.put("/:id", async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "unauthorized" });
  }
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: request.params.id },
    request.body,
    { new: true, runValidators: true },
  );
  response.json(updatedBlog);
});

blogsController.post("/:id/comment", async (request, response) => {
  if (!request.body?.comment)
    return response.status(400).json({ error: '"comment" field is missing' });

  if (typeof request.body.comment !== "string") {
    return response
      .status(400)
      .json({ error: '"comment" field must be a string' });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  blog.comments.push(request.body.comment);

  response.json(await blog.save());
});

module.exports = blogsController;
