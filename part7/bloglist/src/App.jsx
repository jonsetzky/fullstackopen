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
import { login, reloadSession } from "./reducers/localUserReducer";
import { Link, Route, Routes } from "react-router-dom";
import { Blogs } from "./components/routes/Blogs";
import { initializeUsers } from "./reducers/usersReducer";
import { Users } from "./components/routes/Users";
import { UserDetails } from "./components/routes/UserDetails";
import { BlogDetails } from "./components/routes/BlogDetails";
import { Navigation } from "./components/Navigation";

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

  if (!localUser) {
    return (
      <div className="flex w-screen h-screen justify-center place-content-center">
        <div className="flex-1" />
        <div className="flex flex-col">
          <Notification />
          <div className="flex-1" />
          <h1 className="text-3xl">log in to application</h1>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                className="border"
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
                className="border"
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button className="border" type="submit">
              login
            </button>
          </form>

          <div className="flex-1" />
        </div>
        <div className="flex-1" />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <Notification />
      <h2>blogs</h2>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

export default App;
