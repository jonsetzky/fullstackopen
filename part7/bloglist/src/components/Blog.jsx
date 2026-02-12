import { useState } from "react";

import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/bloglistReducer";

/*


            updateBlog={(updatedBlog) => {
              if (updatedBlog.remove) {
                setBlogs(blogs.filter((b) => b.id !== updatedBlog.id));
                return;
              }
              setBlogs(
                blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
              );
            }}*/

const Blog = ({ blog, user }) => {
  let dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="blog" style={blogStyle}>
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
                      dispatch(likeBlog(blog.id));
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
                  dispatch(removeBlog(blog.id));
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
