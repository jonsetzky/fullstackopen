import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders only title and author", () => {
  const user = {
    id: "user123",
    name: "Test User",
    username: "testuser",
  };
  const blog = {
    title: "test blog",
    author: "tester",
    url: "http://testblog.com",
    likes: 5,
    user,
  };

  render(<Blog blog={blog} user={user} updateBlog={() => {}} />);

  expect(screen.queryByText("test blog", { exact: false })).toBeDefined();
  expect(screen.queryByText("tester", { exact: false })).toBeDefined();
  expect(
    screen.queryByText("http://testblog.com", { exact: false }),
  ).toBeNull();
  expect(screen.queryByText("5", { exact: false })).toBeNull();
});
