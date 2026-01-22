import { useState } from "react";

const Blog = ({ blog }) => {
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
                <button>like</button>
              </td>
            </tr>
            <tr>
              <td>user</td>
              <td>{blog.user?.name || blog.user?.username || "n/a"}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Blog;
