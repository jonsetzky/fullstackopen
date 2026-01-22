const usersController = require("express").Router();

const User = require("../models/user");

usersController.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersController.post("/", async (request, response) => {
  const user = new User(request.body);

  const result = await user.save();
  response.status(201).json(result);
});

// blogsController.delete("/:id", async (request, response) => {
//   await Blog.deleteOne({ _id: request.params.id });
//   response.status(204).end();
// });

// blogsController.put("/:id", async (request, response) => {
//   const updatedBlog = await Blog.findOneAndUpdate(
//     { _id: request.params.id },
//     request.body,
//     { new: true, runValidators: true },
//   );
//   response.json(updatedBlog);
// });

module.exports = { usersController };
