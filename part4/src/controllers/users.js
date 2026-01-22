const usersController = require("express").Router();

const User = require("../models/user");

usersController.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersController.post("/", async (request, response) => {
  const user = new User(request.body);

  const result = await user.save();
  response.status(201).json(result);
});

module.exports = usersController;
