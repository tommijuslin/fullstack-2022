import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logout } from "./reducers/userReducer";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";

// import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(
        setNotification(
          { text: "wrong username or password", type: "error" },
          5
        )
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const blogFormRef = useRef();

  if (user === null) {
    return (
      <div>
        <Notification />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Notification />

      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggleable>

      <br />

      <BlogList />
    </div>
  );
};

export default App;
