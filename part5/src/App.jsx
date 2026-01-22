import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";
import { AxiosError } from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
          showNotification(exception.response.data.error, true);
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

  const showNotification = (message, isError = false) => {
    const NOTIFICATION_TIMEOUT = 5000;

    clearTimeout(notification?.lastTimeout);
    const lastTimeout = setTimeout(
      () => setNotification(null),
      NOTIFICATION_TIMEOUT,
    );

    setNotification({ message, isError, lastTimeout });
  };

  if (!user) {
    return (
      <div>
        <Notification
          message={notification?.message}
          isError={notification?.isError}
        />
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
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
      <Notification
        message={notification?.message}
        isError={notification?.isError}
      />
      <h2>blogs</h2>
      <p>
        {user.name || user.username} logged in
        <button onClick={logOut}>logout</button>
      </p>
      <CreateBlog
        onAddBlog={(newBlog) => {
          setBlogs(blogs.concat(newBlog));
        }}
        showNotification={showNotification}
      />
      <div />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
