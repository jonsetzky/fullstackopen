import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("renders also url and likes when expanded", async () => {
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

  const evt = userEvent.setup();
  const button = screen.getByText("expand");
  await evt.click(button);

  expect(screen.queryAllByText("test blog", { exact: false }).length).toEqual(
    2,
  );
  expect(screen.queryAllByText("tester", { exact: false }).length).toEqual(2);
  expect(
    screen.queryByText("http://testblog.com", { exact: false }),
  ).toBeDefined();
  expect(screen.queryByText("5", { exact: false })).toBeDefined();
});
