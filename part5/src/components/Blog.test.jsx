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

test("clicking like twice calls update handler twice", async () => {
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

  vi.mock("../services/blogs", () => {
    return {
      default: {
        update: vi.fn(() => ({
          title: "test blog",
          author: "tester",
          url: "http://testblog.com",
          likes: 5,
          user: {
            id: "user123",
            name: "Test User",
            username: "testuser",
          },
        })),
      },
    };
  });

  const mockHandler = vi.fn();

  render(<Blog blog={blog} user={user} updateBlog={mockHandler} />);

  const usr = userEvent.setup();
  const button = screen.getByText("expand");
  await usr.click(button);

  const likeButton = screen.getByText("like");
  await usr.click(likeButton);
  await usr.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
