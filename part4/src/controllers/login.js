const loginController = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

loginController.post("/", async (request, response) => {
  // todo
});

module.exports = loginController;
