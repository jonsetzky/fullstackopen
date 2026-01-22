const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.request.post("http://localhost:5173/api/testing/reset");

    await page.request.post("http://localhost:5173/api/users", {
      data: {
        username: "testuser",
        password: "testpassword",
      },
    });
  });

  const createDummyUser = async (page) => {
    await page.request.post("http://localhost:5173/api/users", {
      data: {
        username: "dummyuser",
        password: "testpassword",
      },
    });

    const response = await page.request.post(
      "http://localhost:5173/api/login",
      {
        data: {
          username: "dummyuser",
          password: "testpassword",
        },
      },
    );
    return await response.json();
  };

  test("login form is shown", async ({ page }) => {
    await expect(
      page.getByText("log in to application", { exact: false }),
    ).toBeVisible();
    await expect(page.getByText("username", { exact: false })).toBeVisible();
    await expect(page.getByText("password", { exact: false })).toBeVisible();
  });

  describe("login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.locator("#username").fill("testuser");
      await page.locator("#password").fill("testpassword");
      await page.getByText("login").click();

      await expect(page.getByText("blogs")).toBeVisible();
      await expect(page.getByText("testuser logged in")).toBeVisible();
    });
    test("fails with incorrect credentials", async ({ page }) => {
      await page.locator("#username").fill("testuser");
      await page.locator("#password").fill("wrongpassword");
      await page.getByText("login").click();

      await expect(
        page.getByText("log in to application", { exact: false }),
      ).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.goto("http://localhost:5173");

      await page.request.post("http://localhost:5173/api/testing/reset");

      await page.request.post("http://localhost:5173/api/users", {
        data: {
          username: "testuser",
          password: "testpassword",
        },
      });

      await page.locator("#username").fill("testuser");
      await page.locator("#password").fill("testpassword");
      await page.getByText("login").click();
    });

    test("a new blog can be created", async ({ page }) => {
      const title = "Test Blog Title";
      const author = "Test Author";

      await page.getByText("create new blog").click();
      await page.locator("#blog-title").fill(title);
      await page.locator("#blog-author").fill(author);
      await page.locator("#blog-url").fill("http://testblog.com");
      await page.getByRole("button", { name: "create" }).click();

      await expect(page.getByText(`${title}`, { exact: true })).toBeVisible();
      await expect(
        page.getByText("http://testblog.com", { exact: false }),
      ).not.toBeVisible();
    });

    test("user can like a blog", async ({ page }) => {
      const title = "Test Blog Title";
      const author = "Test Author";

      await page.getByText("create new blog").click();
      await page.locator("#blog-title").fill(title);
      await page.locator("#blog-author").fill(author);
      await page.locator("#blog-url").fill("http://testblog.com");
      await page.getByRole("button", { name: "create" }).click();

      await page.getByText("expand").last().click();
      await page.getByRole("button", { name: "like" }).click();

      await page.waitForResponse(
        (resp) => resp.url().includes("/api/blogs") && resp.status() === 200,
      );

      await expect(
        page.locator('tr:has-text("likes") td:nth-child(1)'),
      ).toBeVisible();
    });

    test("user can delete their blog", async ({ page }) => {
      const title = "Test Blog Title";
      const author = "Test Author";

      await page.getByText("create new blog").click();
      await page.locator("#blog-title").fill(title);
      await page.locator("#blog-author").fill(author);
      await page.locator("#blog-url").fill("http://testblog.com");
      await page.getByRole("button", { name: "create" }).click();

      await page.getByText("expand").last().click();

      const deleteButton = await page.getByRole("button", { name: "remove" });

      expect(deleteButton).toBeVisible();

      page.on("dialog", (dialog) => dialog.accept());
      await deleteButton.click();

      await page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/blogs") &&
          resp.status().toString().startsWith("2"),
      );

      await expect(
        page.getByText(`${title}`, { exact: true }),
      ).not.toBeVisible();
    });
    test("user cannot see remove button on others' blogs", async ({ page }) => {
      const dummyUser = await createDummyUser(page);
      const title = "Test Blog Title";
      const author = "Test Author";

      await page.request.post("http://localhost:5173/api/blogs", {
        data: {
          title,
          author,
          url: "http://testblog.com",
        },
        headers: { Authorization: `Bearer ${dummyUser.token}` },
      });

      await page.reload();

      await page.getByText("expand").last().click();
      await page.getByRole("button", { name: "like" }).click();

      await page.waitForResponse(
        (resp) => resp.url().includes("/api/blogs") && resp.status() === 200,
      );

      const deleteButton = await page.getByRole("button", { name: "remove" });

      expect(deleteButton).not.toBeVisible();
    });

    test("blogs are correctly sorted by likes", async ({ page }) => {
      const blogs = [
        {
          title: "Least Liked Blog",
          author: "Author A",
          url: "http://leastliked.com",
          likes: 1,
        },
        {
          title: "Most Liked Blog",
          author: "Author C",
          url: "http://mostliked.com",
          likes: 10,
        },
        {
          title: "Moderately Liked Blog",
          author: "Author B",
          url: "http://moderatelyliked.com",
          likes: 5,
        },
      ];

      const dummyUser = await createDummyUser(page);
      const createBlog = async (blog) => {
        return await page.request.post("http://localhost:5173/api/blogs", {
          data: blog,
          headers: { Authorization: `Bearer ${dummyUser.token}` },
        });
      };

      for (const blog of blogs) await createBlog(blog);

      await page.reload();

      await page.waitForResponse(
        (resp) => resp.url().includes("/api/blogs") && resp.status() === 200,
      );

      const blogBoxes = await page.locator(".blog").all();

      expect(await blogBoxes[0].innerText()).toContain("Most Liked Blog");
      expect(await blogBoxes[1].innerText()).toContain("Moderately Liked Blog");
      expect(await blogBoxes[2].innerText()).toContain("Least Liked Blog");
    });
  });
});
