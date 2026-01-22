const { test, after, describe, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");

const api = supertest(app);

describe("blogs", () => {
  before(async () => {
    await api
      .post("/api/users")
      .send({
        username: "testuser1" + Math.round(Math.random() * 1000),
        name: "Test User",
        password: "testpassword",
      })
      .expect(201);
  });
  test("are returned as json", async () => {
    await api
      .get("/api/blogs")
      .timeout(5000)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs").timeout(5000).expect(200);

    assert.strictEqual(response.body.length, (await Blog.find({})).length);
  });
  test("have author field", async () => {
    const response = await api.get("/api/blogs").timeout(5000).expect(200);

    for (const blog of response.body) {
      assert("author" in blog);
    }
  });
  test("have id field", async () => {
    const response = await api.get("/api/blogs").timeout(5000).expect(200);

    for (const blog of response.body) {
      assert("id" in blog);
    }
  });
  test("can be added to the db", async () => {
    const originalCount = (await Blog.find({})).length;

    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
      likes: originalCount + 1,
    };

    const { user, ...newBlog } = (
      await api.post("/api/blogs").send(blog).timeout(5000).expect(201)
    ).body;

    assert.strictEqual((await Blog.find({})).length, originalCount + 1);
    assert.deepEqual(newBlog, { ...blog, id: newBlog.id });
  });

  test("can be added to the db without providing likes", async () => {
    const originalCount = (await Blog.find({})).length;

    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
    };

    const { user, ...newBlog } = (
      await api.post("/api/blogs").send(blog).timeout(5000).expect(201)
    ).body;

    assert.deepEqual(newBlog, { ...blog, id: newBlog.id, likes: 0 });
  });

  test("fail with 400 and are not created if title is missing", async () => {
    const originalCount = (await Blog.find({})).length;
    const blog = {
      author: `Test Author ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
    };

    await api.post("/api/blogs").send(blog).timeout(5000).expect(400);
    assert.strictEqual((await Blog.find({})).length, originalCount);
  });
  test("fail with 400 and are not created if url is missing", async () => {
    const originalCount = (await Blog.find({})).length;
    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
    };

    await api.post("/api/blogs").send(blog).timeout(5000).expect(400);
    assert.strictEqual((await Blog.find({})).length, originalCount);
  });
  test("fail with 400 and are not created if url and title are missing", async () => {
    const originalCount = (await Blog.find({})).length;
    const blog = {
      author: `Test Author ${originalCount + 1}`,
    };

    await api.post("/api/blogs").send(blog).timeout(5000).expect(400);
    assert.strictEqual((await Blog.find({})).length, originalCount);
  });

  test("can be deleted", async () => {
    const originalCount = (await Blog.find({})).length;
    const blogToDelete = await Blog.findOne({});

    await api.delete(`/api/blogs/${blogToDelete.id}`).timeout(5000).expect(204);

    assert.strictEqual((await Blog.find({})).length, originalCount - 1);
    assert.strictEqual((await Blog.find({ _id: blogToDelete.id })).length, 0);
  });

  test("likes can be updated", async () => {
    const blogToUpdate = await Blog.findOne({});
    const oldLikes = blogToUpdate.likes;
    const newLikes = oldLikes + 1;

    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: newLikes,
    };
    await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(newBlog)
      .timeout(5000)
      .expect(200);

    const updatedBlog = await Blog.findById(blogToUpdate.id);
    assert.strictEqual(updatedBlog.likes, newLikes);
  });

  test("are assigned a user when created", async () => {
    const originalCount = (await Blog.find({})).length;

    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
      likes: originalCount + 1,
    };

    const newBlog = (
      await api.post("/api/blogs").send(blog).timeout(5000).expect(201)
    ).body;

    const newBlogFromDb = await Blog.findOne({ _id: newBlog.id }).populate(
      "user",
    );
    assert("user" in newBlogFromDb);

    const user = newBlogFromDb.user;
    assert("username" in user);
    assert("id" in user);
  });
  test("can be found when listing all users", async () => {
    const originalCount = (await Blog.find({})).length;

    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
      likes: originalCount + 1,
    };

    const newBlog = (
      await api.post("/api/blogs").send(blog).timeout(5000).expect(201)
    ).body;

    const newBlogFromDb = await Blog.findOne({ _id: newBlog.id });
    const userId = newBlogFromDb.user;
    assert.ok(userId);

    const allUsers = await api.get("/api/users").timeout(5000).expect(200);
    const user = allUsers.body.find((u) => u.id == userId);

    const usersBlog = user.blogs.find((b) => b.id === newBlog.id);
    assert.deepStrictEqual(usersBlog, newBlog);
  });
});

after(async () => {
  await mongoose.connection.close();
});
