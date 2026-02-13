import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import CreateBlog from "./components/CreateBlog";
import { AxiosError } from "axios";
import Notification from "./components/Notification";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/bloglistReducer";
import { BlogList } from "./components/BlogList";
import { useSelector } from "react-redux";
import { login, logout, reloadSession } from "./reducers/localUserReducer";
import { Route, Routes } from "react-router-dom";
import { Blogs } from "./components/routes/Blogs";
import { initializeUsers } from "./reducers/usersReducer";
import { Users } from "./components/routes/Users";

const App = () => {
  const dispatch = useDispatch();
  const localUser = useSelector((state) => state.localUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(reloadSession());
  }, []);

  useEffect(() => {
    if (localUser) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
      blogService.setToken(localUser.token);
    }
  }, [localUser]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login(username, password));
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
    dispatch(logout(username, password));
  };

  if (!localUser) {
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
        {localUser.name || localUser.username} logged in
        <button onClick={logOut}>logout</button>
      </p>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
