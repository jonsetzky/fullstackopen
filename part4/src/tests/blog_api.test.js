const { test, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");

const api = supertest(app);

describe("blogs", () => {
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

    const newBlog = (
      await api.post("/api/blogs").send(blog).timeout(5000).expect(201)
    ).body;

    assert.strictEqual((await Blog.find({})).length, originalCount + 1);
    assert.deepStrictEqual(newBlog, { ...blog, id: newBlog.id });
  });

  test("can be added to the db without providing likes", async () => {
    const originalCount = (await Blog.find({})).length;

    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
    };

    const newBlog = (
      await api.post("/api/blogs").send(blog).timeout(5000).expect(201)
    ).body;

    assert.deepStrictEqual(newBlog, { ...blog, id: newBlog.id, likes: 0 });
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
    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
    };

    await api.post("/api/blogs").send(blog).timeout(5000).expect(400);
    assert.strictEqual((await Blog.find({})).length, originalCount);
  });
  test("fail with 400 and are not created if url and title are missing", async () => {
    const blog = {
      author: `Test Author ${originalCount + 1}`,
    };

    await api.post("/api/blogs").send(blog).timeout(5000).expect(400);
    assert.strictEqual((await Blog.find({})).length, originalCount);
  });
});

after(async () => {
  await mongoose.connection.close();
});
