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
import TextInput from "./components/TextInput";

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
        <Notification />
        <div className="flex flex-col ">
          <div className="flex-1 " />
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl">Log In</h1>
              <div
                className="flex flex-col gap-0
              "
              >
                <TextInput
                  labelClassName="w-20"
                  id="username"
                  label="username"
                  value={username}
                  setValue={setUsername}
                />
                <TextInput
                  labelClassName="w-20"
                  id="password"
                  type="password"
                  label="password"
                  value={password}
                  setValue={setPassword}
                />
              </div>
              <button type="submit">Log In</button>
            </div>
          </form>
          <div className="flex-1" />
        </div>
        <div className="flex-1" />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <Navigation />
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
