import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={blogStyle}>
      <i>{blog.title}</i> by {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "collapse" : "expand"}
      </button>
      {showDetails && (
        <>
          <table>
            <tbody>
              <tr>
                <td>title</td>
                <td>{blog.title}</td>
              </tr>
              <tr>
                <td>author</td>
                <td>{blog.author}</td>
              </tr>
              <tr>
                <td>url</td>
                <td>{blog.url}</td>
              </tr>
              <tr>
                <td>likes</td>
                <td>{blog.likes}</td>
                <td>
                  <button
                    onClick={async () => {
                      const updatedBlog = { ...blog, likes: blog.likes + 1 };
                      const newBlog = await blogService.update(blog.id, {
                        ...updatedBlog,
                        user: blog.user.id,
                      });
                      updateBlog({ ...blog, likes: newBlog.likes });
                      // setLikes(newBlog.likes);
                    }}
                  >
                    like
                  </button>
                </td>
              </tr>
              <tr>
                <td>user</td>
                <td>{blog.user?.name || blog.user?.username || "n/a"}</td>
              </tr>
            </tbody>
          </table>
          {blog.user !== undefined &&
          blog.user.id.toString() === user.id.toString() ? (
            <button
              onClick={async () => {
                if (
                  window.confirm(
                    `remove blog "${blog.title}" by ${blog.author}?`,
                  )
                ) {
                  await blogService.remove(blog.id);
                  updateBlog({ id: blog.id, remove: true });
                }
              }}
            >
              remove
            </button>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
