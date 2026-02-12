import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

test("calls blog update callback with correct details", async () => {
  const blogDetails = {
    title: "test blog",
    author: "tester",
    url: "http://testblog.com",
  };
  const user = {
    id: "user123",
    name: "Test User",
    username: "testuser",
  };

  vi.mock("../services/blogs", () => ({
    default: {
      create: vi.fn(() => ({
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
  }));

  const mockHandler = vi.fn();

  const { container } = render(
    <CreateBlog
      onAddBlog={mockHandler}
      user={user}
      showNotification={() => {}}
    />,
  );

  const usr = userEvent.setup();
  const button = screen.getByText("create new blog");
  await usr.click(button);

  const titleInput = container.querySelector("#blog-title");
  const authorInput = container.querySelector("#blog-author");
  const urlInput = container.querySelector("#blog-url");

  await usr.type(titleInput, blogDetails.title);
  await usr.type(authorInput, blogDetails.author);
  await usr.type(urlInput, blogDetails.url);

  const createButton = screen.getByText("create");
  await usr.click(createButton);

  expect(mockHandler).toHaveBeenCalledWith({
    title: "test blog",
    author: "tester",
    url: "http://testblog.com",
    likes: 5,
    user,
  });
});
