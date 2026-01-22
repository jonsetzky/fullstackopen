const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });
  test("login form is shown", async ({ page }) => {
    await expect(
      page.getByText("log in to application", { exact: false }),
    ).toBeVisible();
    await expect(page.getByText("username", { exact: false })).toBeVisible();
    await expect(page.getByText("password", { exact: false })).toBeVisible();
  });
});
