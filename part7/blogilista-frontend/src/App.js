import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logout } from "./reducers/loggedUserReducer";
import { initializeUsers } from "./reducers/userReducer";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import User from "./components/User";

import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
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

  const match = useMatch("users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (loggedUser === null) {
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
        {loggedUser.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Toggleable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
              </Toggleable>
              <br />
              <BlogList />
            </>
          }
        />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
