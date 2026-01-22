const { test, after, describe, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

let user1 = null;
let user2 = null;

const createUserAndAuth = async () => {
  const username = "testuser1" + Math.round(Math.random() * 100000000);
  const user = (
    await api
      .post("/api/users")
      .send({
        username,
        name: "Test User",
        password: "testpassword",
      })
      .expect(201)
  ).body;
  const token = (
    await api
      .post("/api/login")
      .send({
        username,
        password: "testpassword",
      })
      .expect(200)
  ).body.token;
  return {
    auth: { Authorization: `Bearer ${token}` },
    id: user.id,
    username: user.username,
  };
};

describe("blogs", () => {
  before(async () => {
    await User.deleteMany({});
    user1 = await createUserAndAuth();
    user2 = await createUserAndAuth();
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

  test("can be created when authorized", async () => {
    const originalCount = (await Blog.find({})).length;

    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
      likes: originalCount + 1,
    };

    const newBlog = (
      await api
        .post("/api/blogs")
        .set(user1.auth)
        .send(blog)
        .timeout(5000)
        .expect(201)
    ).body;

    assert.strictEqual((await Blog.find({})).length, originalCount + 1);
    assert.deepEqual(newBlog, { ...blog, id: newBlog.id, user: user1.id });
  });

  test("cannot be created when not authorized", async () => {
    const originalCount = (await Blog.find({})).length;

    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
      likes: originalCount + 1,
    };

    await api.post("/api/blogs").send(blog).timeout(5000).expect(401);

    assert.strictEqual((await Blog.find({})).length, originalCount);
  });

  test("can be created without providing likes", async () => {
    const originalCount = (await Blog.find({})).length;

    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
    };

    const { user, ...newBlog } = (
      await api
        .post("/api/blogs")
        .set(user1.auth)
        .send(blog)
        .timeout(5000)
        .expect(201)
    ).body;

    assert.deepEqual(newBlog, { ...blog, id: newBlog.id, likes: 0 });
  });

  test("fail with 400 and are not created if title is missing", async () => {
    const originalCount = (await Blog.find({})).length;
    const blog = {
      author: `Test Author ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
    };

    await api
      .post("/api/blogs")
      .set(user1.auth)
      .send(blog)
      .timeout(5000)
      .expect(400);
    assert.strictEqual((await Blog.find({})).length, originalCount);
  });

  test("fail with 400 and are not created if url is missing", async () => {
    const originalCount = (await Blog.find({})).length;
    const blog = {
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
    };

    await api
      .post("/api/blogs")
      .set(user1.auth)
      .send(blog)
      .timeout(5000)
      .expect(400);
    assert.strictEqual((await Blog.find({})).length, originalCount);
  });

  test("fail with 400 and are not created if url and title are missing", async () => {
    const originalCount = (await Blog.find({})).length;
    const blog = {
      author: `Test Author ${originalCount + 1}`,
    };

    await api
      .post("/api/blogs")
      .set(user1.auth)
      .send(blog)
      .timeout(5000)
      .expect(400);
    assert.strictEqual((await Blog.find({})).length, originalCount);
  });

  test("cannot be deleted when not authorized", async () => {
    const originalCount = (await Blog.find({})).length;
    const blogToDelete = await Blog.findOne({ user: user1.id });
    assert.ok(blogToDelete);

    await api.delete(`/api/blogs/${blogToDelete.id}`).timeout(5000).expect(401);

    assert.strictEqual((await Blog.find({})).length, originalCount);
    assert.strictEqual((await Blog.find({ _id: blogToDelete.id })).length, 1);
  });

  test("cannot be deleted when authorized as different user", async () => {
    const originalCount = (await Blog.find({})).length;
    const blogToDelete = await new Blog({
      author: `Test Author ${originalCount + 1}`,
      title: `Test Title ${originalCount + 1}`,
      url: `http://testurl${originalCount + 1}.com`,
      user: user1.id,
    }).save();
    assert.ok(blogToDelete);

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set(user2.auth)
      .timeout(5000)
      .expect(403);

    assert.strictEqual((await Blog.find({})).length, originalCount + 1);
    assert.strictEqual((await Blog.find({ _id: blogToDelete._id })).length, 1);
  });

  test("can be deleted when authorized", async () => {
    const originalCount = (await Blog.find({})).length;
    const blogToDelete = await Blog.findOne({ user: user1.id });

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(user1.auth)
      .timeout(5000)
      .expect(204);

    assert.strictEqual((await Blog.find({})).length, originalCount - 1);
    assert.strictEqual((await Blog.find({ _id: blogToDelete.id })).length, 0);
  });

  test("likes can be updated when authorized", async () => {
    const blogToUpdate = await Blog.findOne({ user: user1.id });
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
      .set(user1.auth)
      .send(newBlog)
      .timeout(5000)
      .expect(200);

    const updatedBlog = await Blog.findById(blogToUpdate.id);
    assert.strictEqual(updatedBlog.likes, newLikes);
  });
  test("likes of different users can be updated", async () => {
    const blogToUpdate = await new Blog({
      author: `Test Author diflikeupdate`,
      title: `Test Title diflikeupdate`,
      url: `http://testurldiflikeupdate.com`,
      user: user1.id,
    }).save();
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
      .set(user2.auth)
      .send(newBlog)
      .timeout(5000)
      .expect(200);

    const updatedBlog = await Blog.findById(blogToUpdate.id);
    assert.strictEqual(updatedBlog.likes, newLikes);
  });
  test("likes cannot be updated when not authorized", async () => {
    const blogToUpdate = await Blog.findOne({ user: user1.id });
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
      .expect(401);

    const updatedBlog = await Blog.findById(blogToUpdate.id);
    assert.notStrictEqual(updatedBlog.likes, newLikes);
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
      await api
        .post("/api/blogs")
        .set(user1.auth)
        .send(blog)
        .timeout(5000)
        .expect(201)
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
      await api
        .post("/api/blogs")
        .set(user1.auth)
        .send(blog)
        .timeout(5000)
        .expect(201)
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
