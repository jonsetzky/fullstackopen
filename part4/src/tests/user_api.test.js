const { test, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");

const api = supertest(app);

describe("users", () => {
  test("are returned as json", async () => {
    await api
      .get("/api/users")
      .timeout(5000)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns correct amount of users", async () => {
    const response = await api.get("/api/users").timeout(5000).expect(200);

    assert.strictEqual(response.body.length, (await User.find({})).length);
  });

  test("can be created", async () => {
    const originalUsers = await api.get("/api/users").timeout(5000).expect(200);

    const newUser = {
      username: "testuser" + Math.round(Math.random() * 1000),
      name: "Test User",
      password: "testpassword",
    };
    await api.post("/api/users").send(newUser).expect(201);

    const updatedUsers = await api.get("/api/users").timeout(5000).expect(200);
    assert.strictEqual(updatedUsers.body.length, originalUsers.body.length + 1);
  });

  test("can be created without name", async () => {
    const originalUsers = await api.get("/api/users").timeout(5000).expect(200);

    const newUser = {
      username: "testuser" + Math.round(Math.random() * 1000),
      password: "testpassword",
    };
    await api.post("/api/users").send(newUser).expect(201);

    const updatedUsers = await api.get("/api/users").timeout(5000).expect(200);
    assert.strictEqual(updatedUsers.body.length, originalUsers.body.length + 1);
  });

  test("cannot be created without password", async () => {
    const originalUsers = await api.get("/api/users").timeout(5000).expect(200);

    const newUser = {
      username: "testuser" + Math.round(Math.random() * 10000),
      name: "Test User",
    };
    await api.post("/api/users").send(newUser).expect(400);

    const updatedUsers = await api.get("/api/users").timeout(5000).expect(200);
    assert.strictEqual(updatedUsers.body.length, originalUsers.body.length);
  });
  test("cannot be created without username", async () => {
    const originalUsers = await api.get("/api/users").timeout(5000).expect(200);

    const newUser = {
      name: "Test User",
      password: "testpassword",
    };
    await api.post("/api/users").send(newUser).expect(400);

    const updatedUsers = await api.get("/api/users").timeout(5000).expect(200);
    assert.strictEqual(updatedUsers.body.length, originalUsers.body.length);
  });
  test("cannot be created with existing username", async () => {
    const newUser = {
      username: "duplicateuser" + Math.round(Math.random() * 100000),
      password: "testpassword",
    };
    await api.post("/api/users").send(newUser).expect(201);

    const originalUsers = await api.get("/api/users").timeout(5000).expect(200);

    await api.post("/api/users").send(newUser).expect(400);

    const updatedUsers = await api.get("/api/users").timeout(5000).expect(200);
    assert.strictEqual(updatedUsers.body.length, originalUsers.body.length);
  });
  test("cannot be created with a short password", async () => {
    const originalUsers = await api.get("/api/users").timeout(5000).expect(200);
    const newUser = {
      username: "duplicateuser" + Math.round(Math.random() * 100000),
      password: "te",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const updatedUsers = await api.get("/api/users").timeout(5000).expect(200);
    assert.strictEqual(updatedUsers.body.length, originalUsers.body.length);
  });

  test("can be created with a min length password", async () => {
    const originalUsers = await api.get("/api/users").timeout(5000).expect(200);
    const newUser = {
      username: "testuser" + Math.round(Math.random() * 10),
      password: "tes",
    };
    await api.post("/api/users").send(newUser).expect(201);

    const updatedUsers = await api.get("/api/users").timeout(5000).expect(200);
    assert.strictEqual(updatedUsers.body.length, originalUsers.body.length + 1);
  });
  test("cannot be created with a short username", async () => {
    const originalUsers = await api.get("/api/users").timeout(5000).expect(200);
    const newUser = {
      username: "us",
      password: "testpassword",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const updatedUsers = await api.get("/api/users").timeout(5000).expect(200);
    assert.strictEqual(updatedUsers.body.length, originalUsers.body.length);
  });

  test("can be created with a min length username", async () => {
    const originalUsers = await api.get("/api/users").timeout(5000).expect(200);
    const newUser = {
      username: "tes",
      password: "testpassword",
    };
    await api.post("/api/users").send(newUser).expect(201);

    const updatedUsers = await api.get("/api/users").timeout(5000).expect(200);
    assert.strictEqual(updatedUsers.body.length, originalUsers.body.length + 1);
  });
  test("password is hashed", async () => {
    const password = "testpassword";
    let newUser = {
      username: "testuser" + Math.round(Math.random() * 1000000),
      name: "Test User",
      password,
    };
    newUser = await api.post("/api/users").send(newUser).expect(201);
    newUser = newUser.body;

    const userInDb = await User.findOne({ _id: newUser.id });

    assert.strictEqual(await bcrypt.compare(password, userInDb.password), true);
  });
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
