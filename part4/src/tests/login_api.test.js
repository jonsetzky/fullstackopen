const { test, after, describe, before } = require("node:test");
const assert = require("node:assert");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");

const api = supertest(app);

describe("login", () => {
  before(async () => {
    await User.deleteOne({ username: "logintestuser" });
    await api
      .post("/api/users")
      .send({
        username: "logintestuser",
        name: "Test User",
        password: "testpassword",
      })
      .expect(201);
  });
  test("succeeds with valid credentials", async () => {
    const response = await api
      .post("/api/login")
      .send({
        username: "logintestuser",
        password: "testpassword",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const decodedToken = jwt.verify(response.body.token, process.env.SECRET);
    assert.strictEqual(decodedToken.username, "logintestuser");
  });
  test("fails 401 with invalid credentials", async () => {
    await api
      .post("/api/login")
      .send({
        username: "logintestuser",
        password: "wrongpassword",
      })
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});

after(async () => {
  await User.deleteOne({ username: "logintestuser" });
  await mongoose.connection.close();
});
