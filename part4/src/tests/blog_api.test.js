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
    await api
      .get("/api/blogs")
      .timeout(5000)
      .expect(200)
      .then((response) => {
        assert.strictEqual(response.body.length, 2);
      });
  });
  test("have author field", async () => {
    await api
      .get("/api/blogs")
      .timeout(5000)
      .expect(200)
      .then((response) => {
        for (const blog of response.body) {
          assert("author" in blog);
        }
      });
  });
  test("have id field", async () => {
    await api
      .get("/api/blogs")
      .timeout(5000)
      .expect(200)
      .then((response) => {
        for (const blog of response.body) {
          assert("id" in blog);
        }
      });
  });
});

after(async () => {
  await mongoose.connection.close();
});
