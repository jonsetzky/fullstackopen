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
});
