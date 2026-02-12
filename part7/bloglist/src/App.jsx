import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";
import { AxiosError } from "axios";
import Notification from "./components/Notification";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      if (exception instanceof AxiosError) {
        if (exception.response) {
          dispatch(setNotification(exception.response.data.error, 5000, true));
          return;
        }
      }
      console.log("error logging in", exception);
    }
  };

  const logOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  if (!user) {
    return (
      <div>
        <Notification />
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name || user.username} logged in
        <button onClick={logOut}>logout</button>
      </p>
      <div>
        {showNewBlogForm ? (
          <CreateBlog
            onAddBlog={(newBlog) => {
              setBlogs(blogs.concat(newBlog));
              setShowNewBlogForm(false);
            }}
            user={user}
          />
        ) : (
          <></>
        )}
        <button onClick={() => setShowNewBlogForm(!showNewBlogForm)}>
          {showNewBlogForm ? "cancel" : "create new blog"}
        </button>
      </div>
      <div />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            updateBlog={(updatedBlog) => {
              if (updatedBlog.remove) {
                setBlogs(blogs.filter((b) => b.id !== updatedBlog.id));
                return;
              }
              setBlogs(
                blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
              );
            }}
          />
        ))}
    </div>
  );
};

export default App;
