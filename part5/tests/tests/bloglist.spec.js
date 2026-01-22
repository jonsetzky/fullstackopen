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
  });
});
